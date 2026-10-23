"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, addDoc, onSnapshot, runTransaction, increment } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { db, auth, storage } from "../../../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { SecurityHelper } from "../../../lib/security";

type Profile = {
  id: string;
  name: string;
  name2?: string;
  age: string;
  age2?: string;
  gender: string;
  city: string;
  district: string;
  bio: string;
  description: string;
  photos: string[];
  isVerified: boolean;
  isApproved: boolean;
  isActive: boolean;
  hasProfile: boolean;
  isElite: boolean;
  isOrange?: boolean;
  level: 'diamond' | 'vip' | 'gold';
  meetingCount: number;
  whatsappNumber?: string;
  whatsappContactEnabled?: boolean;
  prices: {
    hourly?: string;
    daily?: string;
    weekly?: string;
    general?: string;
  };
  details: Record<string, any>;
};

export default function ProfileClient() {
  const params = useParams();
  const router = useRouter();

  // Static export rewrite handle: Extract ID from URL if params.id is the static placeholder
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawId = typeof params?.id === "string" ? params.id : "";

    // In static export, params.id might be the placeholder 'ilan-detay'
    // We extract the real ID from the URL: /profil/REAL_ID/
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const profilIndex = parts.indexOf('profil');

    if (profilIndex !== -1 && parts[profilIndex + 1] && parts[profilIndex + 1] !== 'ilan-detay') {
      setId(parts[profilIndex + 1]);
    } else {
      setId(rawId);
    }
  }, [params]);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [requestStatus, setRequestStatus] = useState<string>("none");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState("");

  useEffect(() => {
    if (!id || id === "ilan-detay") return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.uid === id) setIsOwner(true);
      else setIsOwner(false);
    });
    return () => unsubscribe();
  }, [id]);

  const handleReport = async (reason: string) => {
    if (!currentUser) {
      alert("Şikayet etmek için giriş yapmalısınız.");
      return;
    }

    setIsReporting(true);
    try {
      await addDoc(collection(db, 'reports'), {
        type: 'profile',
        targetId: id,
        reportedUserId: id,
        reportedUserName: profile?.name || "Bilinmeyen Kullanıcı",
        reporterId: currentUser.uid,
        reason: reason,
        status: 'pending',
        timestamp: serverTimestamp(),
        resolved: false,
      });
      alert("Şikayetiniz yöneticiye iletildi.");
      setShowReportMenu(false);
    } catch (error) {
      console.error("Report error:", error);
      alert("Şikayet gönderilirken bir hata oluştu.");
    } finally {
      setIsReporting(false);
    }
  };

  useEffect(() => {
    if (!currentUser || !id || id === "ilan-detay" || currentUser.uid === id) return;

    const sId = currentUser.uid;
    const rId = id;
    const chatId = [sId, rId].sort().join("_");

    // Real-time listener for connection status
    const unsub = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const status = data.requestStatus || "none";

        // If it was deleted by the other person or globally, we might want to allow re-connecting
        // But for the UI state, we show what's in the doc
        setRequestStatus(status as any);
      } else {
        // Fallback to message_requests if chat doc doesn't exist (legacy or mid-process)
        getDoc(doc(db, "message_requests", chatId)).then(snap => {
          if (snap.exists()) {
            setRequestStatus(snap.data().status as any);
          } else {
            setRequestStatus("none");
          }
        });
      }
    });

    return () => unsub();
  }, [currentUser, id]);

  useEffect(() => {
    async function loadProfile() {
      if (!id || id === "ilan-detay") {
        return;
      }
      try {
        setLoading(true); // Ensure loading is true when ID changes
        const docRef = doc(db, "users", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          console.error("Profile not found in Firestore for ID:", id);
          setProfile(null);
          setLoading(false);
          return;
        }

        const raw = snapshot.data();
        const nested = raw.profile && typeof raw.profile === "object" ? raw.profile : {};
        // Android Parity: Root fields (raw) have priority over nested 'profile' object
        const data = { ...nested, ...raw };

        const rStatus = String(raw.status || "").toLowerCase().trim();
        const nStatus = String(nested.status || "").toLowerCase().trim();

        const rawVerified = data.isIdVerified ?? data.verified ?? data.isVerified ?? data.idVerified;
        const isVerified = rawVerified === true ||
                           String(rawVerified) === "true" ||
                           String(data.verificationStatus || "").toLowerCase() === "verified" ||
                           String(data.verificationStatus || "").toLowerCase() === "approved";

        // Android Parity: Listing approval and Identity verification are separate.
        const isApproved = raw.isApproved === true || String(raw.isApproved) === "true" ||
                          nested.isApproved === true || String(nested.isApproved) === "true" ||
                          rStatus === "approved" || nStatus === "approved";

        // Sadece açıkça false ise pasif say, undefined ise aktif kabul et
        const isExplicitlyPassive = raw.isActive === false || String(raw.isActive) === "false" ||
                                   data.isActive === false || String(data.isActive) === "false" ||
                                   ["rejected", "blocked", "banned"].includes(rStatus) ||
                                   ["rejected", "blocked", "banned"].includes(nStatus);

        const isInvisible = data.isInvisible === true || String(data.isInvisible) === "true";
        const isBusy = data.isBusy === true || String(data.isBusy) === "true" ||
                       data.isAvailableNow === false || String(data.isAvailableNow) === "false";
        const role = String(data.role || nested.role || "").toLowerCase();

        let photos: string[] = [];

        // 1. Birincil kaynak: Android uygulamasının yazdığı 'photos' dizisi
        if (Array.isArray(data.photos)) {
          for (const item of data.photos) {
            if (typeof item === 'string' && item.trim().startsWith('http')) {
              const url = item.trim();
              if (!photos.includes(url)) photos.push(url);
            }
          }
        }

        // 2. İkinci birincil kaynak: 'profilePhoto' alanı
        if (data.profilePhoto && typeof data.profilePhoto === 'string' && data.profilePhoto.trim().startsWith('http')) {
          const url = data.profilePhoto.trim();
          if (!photos.includes(url)) {
            photos.unshift(url);
          } else {
            const idx = photos.indexOf(url);
            if (idx > 0) {
              photos.splice(idx, 1);
              photos.unshift(url);
            }
          }
        }

        const candidates = [
          data.profileImageUrl,
          data.photoUrl,
          data.photoURL,
          data.image,
          data.photo,
          data.profileImage,
          data.avatar,
          data.profile_image
        ];

        for (const val of candidates) {
          if (val && typeof val === 'string' && val.trim().startsWith('http')) {
            const url = val.trim();
            if (!photos.includes(url)) photos.push(url);
          }
        }

        const arrays = [data.photoUrls];
        for (const arr of arrays) {
          if (Array.isArray(arr)) {
            for (const item of arr) {
              if (typeof item === 'string' && item.trim().startsWith('http')) {
                const url = item.trim();
                if (!photos.includes(url)) photos.push(url);
              }
            }
          }
        }

        // hasProfile alanı eksikse, profil verisi veya ismi varsa var kabul et
        const hasProfile = raw.hasProfile === true || String(raw.hasProfile) === "true" ||
                          data.hasProfile === true || String(data.hasProfile) === "true" ||
                          (data.name && data.bio) || (photos.length > 0);

        // Rol Filtresi: RealProfiles.tsx ile senkronize edildi
        const validRoles = ['companion', 'provider', 'model', 'escort', 'refakatçi', 'refakatci', 'refakat', 'agent', 'agency'];

        // 'user' rolündekiler kesinlikle gösterilmez
        if (role === 'user' || role === 'seeker') {
           console.error("Profile not visible: user/seeker role restricted");
           setProfile(null);
           setLoading(false);
           return;
        }

        const isCompanion = !role || role === "" || validRoles.some(r => role.includes(r));

        const isListingPendingApproval = raw.isListingPendingApproval === true || nested.isListingPendingApproval === true || data.isListingPendingApproval === true;

        // GÖRÜNME ŞARTI: RealProfiles.tsx ile senkronize edildi.
        // Android Parity: Hem yönetici onayı (isApproved) hem de kimlik onayı (isVerified) ŞARTTIR.
        if (isBusy || isInvisible || raw.deletedAt || isExplicitlyPassive || !isApproved || !isVerified || !hasProfile || !isCompanion || isListingPendingApproval) {
          console.error("Profile not visible (restricted):", { id, isBusy, deletedAt: raw.deletedAt, isInvisible, isExplicitlyPassive, isApproved, isVerified, hasProfile, isCompanion, isListingPendingApproval });
          setProfile(null);
          setLoading(false);
          return;
        }

        const isActive = isApproved && !isExplicitlyPassive;
        const meetingCount = Number(data.completedMeetingsCount ?? data.meetingCount ?? 0);

        // Tier Mantığı - RealProfiles ile tam senkronize
        let level: 'diamond' | 'vip' | 'gold' = 'gold';
        const rawLevel = String(data.level || data.listingTier || "").toLowerCase();
        if (rawLevel === 'diamond') level = 'diamond';
        else if (rawLevel === 'vip') level = 'vip';

        const isElite = (level === 'diamond' || level === 'vip') && isVerified;
        const isOrange = isApproved && !isVerified;

        setProfile({
          id,
          name: data.name || data.displayName || "Kullanıcı",
          name2: data.name2 || data.displayName2,
          age: String(data.age || "20"),
          age2: data.age2 ? String(data.age2) : undefined,
          gender: data.gender || data.cinsiyet || "Kadın",
          city: data.city || data.sehir || "Türkiye",
          district: data.district || data.ilce || "",
          bio: data.bio || data.description || "Sosyal refakat ilanı.",
          description: data.description || data.hakkinda || data.bio || "Detaylı açıklama bulunmuyor.",
          photos: photos.length > 0 ? photos : ["/placeholder.jpg"],
          isVerified,
          isApproved,
          isActive,
          hasProfile: data.hasProfile !== false,
          isElite,
          isOrange,
          level,
          meetingCount,
          whatsappNumber: data.whatsappNumber,
          whatsappContactEnabled: data.whatsappContactEnabled === true,
          prices: {
            hourly: data.price || data.hourlyPrice || data.saatlikFiyat,
            daily: data.priceDaily || data.dailyPrice || data.gunlukFiyat,
            weekly: data.priceWeekly || data.weeklyPrice || data.haftalikFiyat,
            general: data.price || data.ucret
          },
          details: data
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  useEffect(() => {
    if (profile && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_profile', {
        'event_category': 'engagement',
        'event_label': profile.name,
        'profile_id': id,
        'city': profile.city
      });
    }
  }, [profile, id]);

  const handleConnect = async () => {
    if (!currentUser) {
      alert("Lütfen önce giriş yapın.");
      router.push("/login");
      return;
    }

    if (currentUser.uid === id) return;

    const message = connectMessage.trim();
    if (!message) {
      alert("Bağlantı isteği göndermek için bir mesaj yazmalısınız.");
      return;
    }

    setSendingRequest(true);
    try {
      const sanitizedMessage = SecurityHelper.sanitizeMessage(message);
      const sId = currentUser.uid;
      const rId = id;
      const chatId = [sId, rId].sort().join("_");

      // Get sender info
      const senderSnap = await getDoc(doc(db, "users", sId));
      const senderData = senderSnap.data() || {};
      const senderName = senderData.name || senderData.displayName || senderData.full_name || currentUser.displayName || "Bir Üye";
      const nested = senderData.profile || {};
      const combined = { ...senderData, ...nested };
      const senderPhoto = combined.profileImageUrl || combined.photoUrl || combined.profilePhoto || combined.photoURL || combined.image || (combined.photos && combined.photos[0]) || (combined.photoUrls && combined.photoUrls[0]) || currentUser.photoURL;

      await runTransaction(db, async (transaction) => {
        const requestRef = doc(db, "message_requests", chatId);
        const chatRef = doc(db, "chats", chatId);

        const requestSnap = await transaction.get(requestRef);
        const chatSnap = await transaction.get(chatRef);

        // Data Integrity: Check for existing pending request (matches Android logic)
        if (requestSnap.exists()) {
          const data = requestSnap.data() as any;
          if (data.status === 'pending') {
            throw new Error('Zaten bekleyen bir bağlantı isteğiniz bulunuyor.');
          }

          if (data.status === 'rejected') {
            const updatedAt = data.updatedAt?.toDate() || new Date();
            const now = new Date();
            const diffDays = (now.getTime() - updatedAt.getTime()) / (1000 * 3600 * 24);
            if (diffDays < 7) {
              throw new Error('Bu kullanıcı isteğinizi reddetti. Lütfen bir süre sonra tekrar deneyin.');
            }
          }
        }

        // 1. message_requests update
        const requestData: any = {
          id: chatId,
          senderId: sId,
          senderName,
          senderPhoto: senderPhoto || null,
          receiverId: rId,
          initialMessage: sanitizedMessage,
          status: "pending",
          isRead: false,
          updatedAt: serverTimestamp(),
          deletedBy: {
            [rId]: false,
            [sId]: false,
          },
        };
        if (!requestSnap.exists()) {
          requestData.createdAt = serverTimestamp();
        }
        transaction.set(requestRef, requestData, { merge: true });

        // 2. chats update
        const chatExists = chatSnap.exists();
        const existingChatData = chatSnap.data();
        const isAlreadyAccepted = chatExists && existingChatData?.requestStatus === 'accepted';

        if (!isAlreadyAccepted) {
          const participants = [sId, rId];
          transaction.set(chatRef, {
            chatId: chatId,
            participants: participants,
            users: participants, // Security rules requirement
            lastMessage: sanitizedMessage,
            lastMessageTime: serverTimestamp(),
            lastMessageSenderId: sId,
            senderName: senderName,
            senderPhoto: senderPhoto || null,
            receiverId: rId,
            isActive: false,
            requestStatus: "pending",
            updatedAt: serverTimestamp(),
            deletedBy: { [sId]: false, [rId]: false },
            [`unreadCount.${rId}`]: increment(1),
            [`unreadCount.${sId}`]: 0,
          }, { merge: true });
        } else {
          // If already accepted, just update last message and increment unread
          transaction.update(chatRef, {
            lastMessage: sanitizedMessage,
            lastMessageTime: serverTimestamp(),
            lastMessageSenderId: sId,
            [`unreadCount.${rId}`]: increment(1),
            updatedAt: serverTimestamp(),
          });
        }
      });

      // 3. Send Notification for mobile
      const title = 'Yeni Bağlantı İsteği';
      const body = `${senderName} sizinle bağlantı kurmak istiyor.`;

      const notifData = {
        recipientId: rId,
        receiverId: rId,
        senderId: sId,
        senderName: senderName,
        senderPhoto: senderPhoto || null,
        type: 'message_request',
        title: title,
        body: body,
        chatId: chatId,
        timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
        read: false,
        isRead: false,
        data: {
          screen: 'requests',
          chatId: chatId,
          senderId: sId,
          senderName: senderName,
          senderPhoto: senderPhoto || null,
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
          status: 'done',
        },
      };

      // 1. Uygulama içi bildirim (Firestore listesi)
      await addDoc(collection(db, 'notifications'), notifData);

      // 2. Push notification (FCM Cloud Function tetikleyici)
      await addDoc(collection(db, 'push_notifications'), {
        ...notifData,
        priority: 'high',
        visibility: 'public',
        content_available: true,
        notification: {
          title: title,
          body: body,
          sound: 'default',
          badge: '1',
        },
        android: {
          priority: 'high',
          notification: {
            channel_id: 'high_importance_channel_v3',
            sound: 'default',
            visibility: 'public',
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
          }
        }
      });

      setRequestStatus("pending");
      setShowConnectModal(false);
      setConnectMessage("");
      alert("Bağlantı isteği gönderildi!");
    } catch (error) {
      console.error("Request error:", error);
      alert("Bir hata oluştu.");
    } finally {
      setSendingRequest(false);
    }
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#d4af37] border-t-transparent"></div>
        <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.5em] animate-pulse leading-relaxed">LÜKS DENEYİM YÜKLENİYOR</p>
      </div>
    </div>
  );

  if (!profile && !loading) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-4xl mb-8 border border-[#d4af37]/20 text-[#d4af37] animate-pulse">!</div>
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">Profil Bulunamadı</h2>
      <p className="text-gray-500 max-w-xs mb-8 font-medium">Aradığınız seçkin profil yayından kaldırılmış veya henüz doğrulanmamış olabilir.</p>
      <button
        onClick={() => router.push("/")}
        className="px-10 py-5 bg-[#d4af37] text-black font-black rounded-2xl uppercase text-[11px] tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
      >
        KEŞFETMEYE DEVAM ET
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white pb-32 selection:bg-[#d4af37]/30">
      <div className="mx-auto max-w-4xl">
        {/* Sticky Header - ULTRA PREMIUM */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5 p-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex-1 px-4 text-center">
            <h2 className="font-black text-base tracking-tight truncate uppercase leading-relaxed">{profile?.name}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#d4af37] animate-pulse"></span>
              <p className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-black leading-relaxed">{profile?.city} • {profile?.district}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {!isOwner && (
               <div className="relative">
                  <button
                    onClick={() => setShowReportMenu(!showReportMenu)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>

                  {showReportMenu && (
                    <div className="absolute right-0 mt-4 w-64 bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-2xl">
                      <div className="p-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5">Profili Şikayet Et</div>
                      <div className="p-2">
                        <button onClick={() => handleReport('Uygunsuz Profil')} disabled={isReporting} className="w-full text-left px-5 py-4 text-xs font-bold text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors">Uygunsuz Profil</button>
                        <button onClick={() => handleReport('Sahte Hesap')} disabled={isReporting} className="w-full text-left px-5 py-4 text-xs font-bold text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors">Sahte Hesap</button>
                        <button onClick={() => handleReport('Dolandırıcılık Şüphesi')} disabled={isReporting} className="w-full text-left px-5 py-4 text-xs font-bold text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors">Dolandırıcılık Şüphesi</button>
                      </div>
                    </div>
                  )}
               </div>
             )}
          </div>
        </header>

        {/* Hero Gallery */}
        <div className="relative group px-4 pt-4">
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
             {profile && profile.photos && profile.photos.length > 0 ? (
               <img src={profile.photos[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={profile.name} referrerPolicy="no-referrer" />
             ) : (
               <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-8xl opacity-10">👤</div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

             {/* Floating Badges */}
             <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                {profile?.isElite ? (
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[9px] font-black px-4 py-2 rounded-full tracking-[0.2em] shadow-2xl">ELİT PROFİL</span>
                ) : profile?.isVerified ? (
                  <span className="bg-emerald-500 text-white text-[9px] font-black px-4 py-2 rounded-full tracking-[0.2em] shadow-2xl">ONAYLI</span>
                ) : (
                  <span className="bg-orange-500 text-white text-[9px] font-black px-4 py-2 rounded-full tracking-[0.2em] shadow-2xl">ONAYSIZ</span>
                )}
             </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4 px-2">
             {profile?.photos?.slice(1, 4).map((p, i) => (
               <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10">
                 <img src={p} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
               </div>
             ))}
             {profile && profile.photos && profile.photos.length > 4 ? (
               <a
                 href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="aspect-square bg-gradient-to-br from-[#1a1608] to-black rounded-2xl flex flex-col items-center justify-center text-center p-3 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all group"
               >
                 <span className="text-xl mb-1 group-hover:scale-110 transition-transform">✨</span>
                 <span className="text-[8px] font-black text-[#d4af37] uppercase tracking-tighter leading-relaxed">
                   TÜM FOTOĞRAFLARI GÖR
                 </span>
               </a>
             ) : (
               <div className="aspect-square bg-white/5 rounded-2xl border border-dashed border-white/10" />
             )}
          </div>
        </div>

        {/* Detailed Info */}
        <div className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
                Profil Detayları
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-tight">
                {profile?.name}
                <span className="text-[#d4af37] ml-3 font-medium italic">{profile?.age}</span>
              </h1>
              <p className="text-base text-gray-500 font-bold tracking-wide flex items-center gap-2">
                <span className="text-[#d4af37]">📍</span>
                {profile?.city?.toUpperCase()}, {profile?.district?.toUpperCase()}
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-[#d4af37]/20 shadow-2xl min-w-[180px] text-center md:text-right relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-[#d4af37]/10 transition-all"></div>
               <div className="relative z-10">
                 <div className="text-3xl font-black text-[#d4af37] tracking-tighter mb-0.5">₺{profile?.prices?.hourly || "???"}</div>
                 <div className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">SAATLİK ÜCRET</div>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwner && profile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!profile.isVerified ? (
                <div className="col-span-full p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 text-amber-500 text-center space-y-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                    BU PROFİLİN KİMLİK ONAYI HENÜZ TAMAMLANMAMIŞTIR.<br/>GÜVENLİK PROSEDÜRLERİ GEREĞİ İLETİŞİM KISITLIDIR.
                  </div>
                  <a href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili" className="inline-block text-[9px] underline font-black tracking-widest mt-1">Detaylar İçin Uygulamayı İndirin</a>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    {(requestStatus === "none" || requestStatus === "deleted" || requestStatus === "rejected") ? (
                      <button
                        onClick={() => setShowConnectModal(true)}
                        disabled={sendingRequest}
                        className="w-full bg-white text-black font-black py-5 rounded-[1.5rem] hover:bg-[#d4af37] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 text-xs tracking-widest"
                      >
                        {sendingRequest ? "İSTEK GÖNDERİLİYOR..." : "BAĞLANTI İSTEĞİ GÖNDER"}
                      </button>
                    ) : requestStatus === "pending" ? (
                      <button className="w-full bg-white/5 text-gray-500 font-black py-5 rounded-[1.5rem] border border-white/5 cursor-default text-xs tracking-widest" disabled>
                        İSTEK BEKLEMEDE
                      </button>
                    ) : (
                      <div className="w-full bg-emerald-500/10 text-emerald-500 font-black py-5 rounded-[1.5rem] border border-emerald-500/20 text-center text-xs tracking-widest uppercase">
                        BAĞLANTI KURULDU
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {requestStatus === "accepted" ? (
                      <button
                        onClick={() => router.push("/mesajlar")}
                        className="w-full bg-[#d4af37] text-black font-black py-5 rounded-[1.5rem] hover:scale-105 transition-all shadow-2xl text-xs tracking-widest uppercase"
                      >
                        MESAJ GÖNDER
                      </button>
                    ) : (
                      <div className="relative group">
                        <button
                          disabled
                          className="w-full bg-white/5 text-gray-600 font-black py-5 rounded-[1.5rem] border border-white/5 cursor-not-allowed text-xs tracking-widest uppercase"
                        >
                          MESAJ GÖNDER
                        </button>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[8px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none uppercase font-black tracking-widest">
                          {requestStatus === "pending" ? "Bağlantı isteği kabul edildiğinde mesaj gönderebilirsiniz." : "Mesaj göndermek için önce bağlantı isteği gönderin."}
                        </div>
                      </div>
                    )}
                  </div>

                  {profile.whatsappContactEnabled && profile.whatsappNumber && (
                    <div className="col-span-full mt-1">
                      <a
                        href={`https://wa.me/${profile.whatsappNumber.split("").filter(c => c >= "0" && c <= "9").join("")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] text-white font-black py-5 rounded-[1.5rem] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 text-xs tracking-widest"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.632 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WHATSAPP İLE YAZ
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5">
            <div className="text-center group">
              <div className="text-2xl font-black text-white mb-0.5 group-hover:scale-110 transition-transform">{profile?.meetingCount}</div>
              <div className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] leading-relaxed">Randevu</div>
            </div>
            <div className="text-center border-x border-white/5 group">
              <div className="text-2xl font-black text-white mb-0.5 group-hover:scale-110 transition-transform">{profile?.gender === "Kadın" ? "♀️" : profile?.gender === "Erkek" ? "♂️" : "⚤"}</div>
              <div className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] leading-relaxed">{profile?.gender}</div>
            </div>
            <div className="text-center group">
              <div className={`text-sm md:text-base font-bold mb-1 tracking-[0.3em] leading-loose group-hover:scale-105 transition-transform ${
                profile?.level === 'diamond' ? 'text-[#d4af37]' :
                profile?.level === 'vip' ? 'text-blue-400' : 'text-emerald-400'
              }`}>
                {profile?.level === 'diamond' ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#d4af37]/20 text-[#d4af37] font-black text-xs tracking-normal">D</span>
                ) :
                 profile?.level === 'vip' ? 'VIP İLAN' : 'STANDART İLAN'}
              </div>
              <div className="text-[8px] text-gray-500 uppercase font-medium tracking-[0.3em] leading-loose">Statü</div>
            </div>
          </div>

          {/* About / Bio */}
          <div className="space-y-6">
             <div className="flex items-center gap-4">
               <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] leading-relaxed">Hakkında</h3>
               <div className="h-[1px] flex-1 bg-white/5"></div>
             </div>
             <p className="text-2xl text-white font-medium italic leading-tight tracking-tight">
               "{profile?.bio}"
             </p>
             <div className="text-gray-400 text-base leading-relaxed bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 whitespace-pre-line shadow-inner">
               {profile?.description || "Bu seçkin üye henüz detaylı bir açıklama eklememiş."}
             </div>
          </div>

          {/* Prices Detail */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
               <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em] leading-loose">Ücretlendirme</h3>
               <span className="text-[7px] font-bold text-[#d4af37] animate-pulse tracking-[0.3em] leading-loose uppercase py-1 px-3 border border-[#d4af37]/20 rounded-full">
                 PLATİN ÖDEME AKTİF
               </span>
             </div>
             <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-5 bg-white/[0.02] rounded-[1.5rem] border border-white/5 hover:border-[#d4af37]/30 transition-all group">
                   <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Saatlik Eşlik</span>
                   <span className="text-lg font-black text-white group-hover:text-[#d4af37] transition-colors">₺{profile?.prices?.hourly || "Görüşülür"}</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-white/[0.02] rounded-[1.5rem] border border-white/5 hover:border-[#d4af37]/30 transition-all group">
                   <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Günlük Eşlik</span>
                   <span className="text-lg font-black text-white group-hover:text-[#d4af37] transition-colors">₺{profile?.prices?.daily || "Görüşülür"}</span>
                </div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-6 bg-gradient-to-r from-black to-[#0f0f0f] rounded-[2rem] border border-dashed border-white/10 hover:border-[#d4af37]/50 transition-all group"
                >
                   <div className="flex flex-col">
                     <span className="text-white font-black uppercase text-[10px] tracking-widest mb-1">Daha Fazla Seçenek</span>
                     <span className="text-gray-600 text-[9px] font-medium">Uygulamaya özel paketleri ve fırsatları keşfedin</span>
                   </div>
                   <span className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7"/></svg>
                   </span>
                </a>
             </div>
          </div>
        </div>

        {/* Connect Message Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-gradient-to-br from-[#d4af37]/10 to-transparent flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Bağlantı İsteği</h3>
                  <p className="text-[9px] text-[#d4af37] font-bold tracking-widest uppercase mt-0.5">{profile?.name} ile tanışın</p>
                </div>
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Mesajınız (Zorunlu)</label>
                  <textarea
                    value={connectMessage}
                    onChange={(e) => setConnectMessage(e.target.value)}
                    placeholder="Merhaba, sizinle tanışmak istiyorum..."
                    className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-gray-700 outline-none focus:border-[#d4af37]/50 transition-all resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                      {connectMessage.trim().length > 0 ? `${connectMessage.length} karakter` : "Mesaj yazılması zorunludur"}
                    </p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Maks 500</p>
                  </div>
                </div>

                <button
                  onClick={handleConnect}
                  disabled={sendingRequest || !connectMessage.trim()}
                  className="w-full bg-[#d4af37] text-black font-black py-5 rounded-[1.5rem] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {sendingRequest ? "GÖNDERİLİYOR..." : "İSTEĞİ GÖNDER"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

