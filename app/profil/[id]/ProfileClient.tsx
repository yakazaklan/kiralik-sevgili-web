"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { db, auth, storage } from "../../../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

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
  isElite: boolean;
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
  const id = typeof params?.id === "string" ? params.id : "";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [requestStatus, setRequestStatus] = useState<"none" | "pending" | "accepted">("none");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  useEffect(() => {
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
    async function checkExistingRequest() {
      if (!currentUser || !id || currentUser.uid === id) return;

      const sId = currentUser.uid;
      const rId = id;
      const chatId = [sId, rId].sort().join("_");

      const docRef = doc(db, "message_requests", chatId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setRequestStatus(snap.data().status as any);
      } else {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          setRequestStatus(chatSnap.data().requestStatus === "accepted" ? "accepted" : "pending");
        }
      }
    }
    checkExistingRequest();
  }, [currentUser, id]);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;
      try {
        const docRef = doc(db, "users", id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }

        const raw = snapshot.data();
        const isVerified = raw.isIdVerified === true;
        const isApproved = raw.isApproved === true || raw.status === "approved";
        const nested = raw.profile && typeof raw.profile === "object" ? raw.profile : {};
        const data = { ...raw, ...nested };

        const meetingCount = Number(data.meetingCount || 0);
        const isElite = isVerified && isApproved && (data.isElite === true || meetingCount > 20);

        let photos: string[] = [];
        if (Array.isArray(data.photoUrls)) photos = data.photoUrls;
        else if (Array.isArray(data.photos)) photos = data.photos;

        const mainPhoto = data.profileImageUrl || data.photoUrl || data.image;
        if (mainPhoto && !photos.includes(mainPhoto)) photos.unshift(mainPhoto);

        setProfile({
          id,
          name: data.name || data.displayName || "Kullanıcı",
          name2: data.name2 || data.displayName2,
          age: String(data.age || ""),
          age2: data.age2 ? String(data.age2) : undefined,
          gender: data.gender || data.cinsiyet || "Belirtilmemiş",
          city: data.city || data.sehir || "Türkiye",
          district: data.district || data.ilce || "",
          bio: data.bio || "",
          description: data.description || data.hakkinda || "",
          photos: photos.filter(p => typeof p === "string"),
          isVerified,
          isApproved,
          isElite,
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

  const handleConnect = async () => {
    if (!currentUser) {
      alert("Lütfen önce giriş yapın.");
      router.push("/login");
      return;
    }

    if (currentUser.uid === id) return;

    setSendingRequest(true);
    try {
      const sId = currentUser.uid;
      const rId = id;
      const chatId = [sId, rId].sort().join("_");

      // Get sender info
      const senderSnap = await getDoc(doc(db, "users", sId));
      const senderData = senderSnap.data() || {};
      const senderName = senderData.name || senderData.displayName || "Bir Üye";
      let senderPhoto = senderData.profileImageUrl || senderData.photoUrl || senderData.image;
      if (!senderPhoto && Array.isArray(senderData.photos) && senderData.photos.length > 0) {
        senderPhoto = senderData.photos[0];
      }

      // 1. Create message request
      await setDoc(doc(db, "message_requests", chatId), {
        id: chatId,
        senderId: sId,
        senderName,
        senderPhoto: senderPhoto || null,
        receiverId: rId,
        initialMessage: "Sizinle bağlantı kurmak istiyor.",
        status: "pending",
        isRead: false,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });

      // 2. Create/Update chat metadata
      await setDoc(doc(db, "chats", chatId), {
        chatId: chatId,
        participants: [sId, rId],
        lastMessage: "Yeni bir bağlantı isteği gönderildi.",
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: sId,
        receiverId: rId,
        isActive: false,
        requestStatus: "pending",
        updatedAt: serverTimestamp(),
        [`unreadCount.${rId}`]: 1,
        [`unreadCount.${sId}`]: 0,
      }, { merge: true });

      setRequestStatus("pending");
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
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ff2d55] border-t-transparent"></div>
    </div>
  );

  if (!profile) return <div className="flex min-h-screen items-center justify-center bg-black text-white">Profil bulunamadı.</div>;

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5 p-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <div className="flex-1 px-4">
          <h2 className="font-bold truncate">{profile.name}</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{profile.city}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex gap-2">
              {profile.isElite && <span className="text-[8px] bg-[#00B2FF]/20 text-[#00B2FF] border border-[#00B2FF]/30 px-2 py-1 rounded-full font-black">ELITE</span>}
              {profile.isVerified && profile.isApproved && <span className="text-[8px] bg-green-500/20 text-green-500 border border-green-500/30 px-2 py-1 rounded-full font-black">ONAYLI</span>}
           </div>

           {!isOwner && (
             <div className="relative">
                <button
                  onClick={() => setShowReportMenu(!showReportMenu)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>

                {showReportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#222] rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-2 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#222]">Profili Şikayet Et</div>
                    <button
                      onClick={() => handleReport('Uygunsuz Profil')}
                      disabled={isReporting}
                      className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                    >
                      Uygunsuz Profil
                    </button>
                    <button
                      onClick={() => handleReport('Sahte Hesap')}
                      disabled={isReporting}
                      className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                    >
                      Sahte Hesap
                    </button>
                    <button
                      onClick={() => handleReport('Dolandırıcılık Şüphesi')}
                      disabled={isReporting}
                      className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                    >
                      Dolandırıcılık Şüphesi
                    </button>
                  </div>
                )}
             </div>
           )}
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl">
        {/* Photo Gallery - RESTRICTED ON WEB */}
        <div className="grid grid-cols-1 gap-1">
          {profile.photos.length > 0 ? (
            <div className="aspect-[4/5] relative overflow-hidden">
               <img src={profile.photos[0]} className="w-full h-full object-cover" alt={profile.name} />
            </div>
          ) : (
            <div className="aspect-[4/5] bg-[#111] flex items-center justify-center text-6xl opacity-10">👤</div>
          )}

          <div className="grid grid-cols-3 gap-1 mt-1">
             {profile.photos.slice(1, 3).map((p, i) => (
               <div key={i} className="aspect-square overflow-hidden bg-[#111]">
                 <img src={p} className="w-full h-full object-cover" alt="" />
               </div>
             ))}
             {profile.photos.length > 3 && (
               <a
                 href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-black flex flex-col items-center justify-center text-center p-2 border border-[#ff2d55]/20 hover:border-[#ff2d55]/50 transition-all group"
               >
                 <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📸</span>
                 <span className="text-[8px] font-black text-[#ff2d55] uppercase tracking-widest leading-tight">
                   Tüm Fotoğrafları Uygulamada Gör
                 </span>
               </a>
             )}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter">
                {profile.name}
                <span className="text-[#ff2d55] ml-2">{profile.age}</span>
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <span className="text-[#ff2d55]">📍</span>
                {profile.city}, {profile.district}
              </p>
            </div>
            <div className="text-right">
               <div className="text-2xl font-black text-white">₺{profile.prices.hourly || "???"}</div>
               <div className="text-[10px] text-gray-500 uppercase font-bold">Saatlik Ücret</div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwner && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requestStatus === "none" ? (
                <button
                  onClick={handleConnect}
                  disabled={sendingRequest}
                  className="bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  {sendingRequest ? "GÖNDERİLİYOR..." : "BAĞLANTI KUR"}
                </button>
              ) : requestStatus === "pending" ? (
                <button className="bg-gray-800 text-gray-400 font-black py-4 rounded-2xl cursor-default" disabled>
                  İSTEK BEKLEMEDE
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/chat/${[currentUser?.uid, id].sort().join("_")}`)}
                  className="bg-[#ff2d55] text-white font-black py-4 rounded-2xl hover:bg-[#ff2d55]/90 transition-all"
                >
                  MESAJ GÖNDER
                </button>
              )}

              {profile.whatsappContactEnabled && profile.whatsappNumber ? (
                <a
                  href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-black py-4 rounded-2xl hover:bg-[#25D366]/90 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.632 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WHATSAPP'TAN YAZ
                </a>
              ) : (
                <button
                  className="bg-[#111] text-white font-black py-4 rounded-2xl border border-white/5 hover:bg-[#1a1a1a] transition-all"
                  onClick={() => {
                    if (requestStatus === "accepted") {
                      router.push(`/chat/${[currentUser?.uid, id].sort().join("_")}`);
                    } else {
                      alert("Mesaj yazabilmek için önce bağlantı kurmanız gerekmektedir.");
                    }
                  }}
                >
                  MESAJ YAZ
                </button>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
            <div className="text-center">
              <div className="text-xl font-bold">{profile.meetingCount}</div>
              <div className="text-[10px] text-gray-500 uppercase font-black">Randevu</div>
            </div>
            <div className="text-center border-x border-white/5">
              <div className="text-xl font-bold">{profile.gender === "Kadın" ? "♀️" : profile.gender === "Erkek" ? "♂️" : "👥"}</div>
              <div className="text-[10px] text-gray-500 uppercase font-black">{profile.gender}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">10/10</div>
              <div className="text-[10px] text-gray-500 uppercase font-black">Puan</div>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
             <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Hakkında</h3>
             <p className="text-xl text-gray-300 italic leading-relaxed">
               "{profile.bio}"
             </p>
             <div className="text-gray-400 leading-relaxed bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 whitespace-pre-line">
               {profile.description || "Bu kullanıcı henüz detaylı bir açıklama eklememiş."}
             </div>
          </div>

          {/* Prices Detail */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Ücretlendirme</h3>
               <span className="text-[9px] font-black text-[#ff2d55] animate-pulse">MOBİL ÖDEME AKTİF</span>
             </div>
             <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between p-4 bg-[#0a0a0a] rounded-2xl border border-white/5">
                   <span className="text-gray-400">Saatlik Eşlik</span>
                   <span className="font-bold">₺{profile.prices.hourly || "Görüşülür"}</span>
                </div>
                <div className="flex justify-between p-4 bg-[#0a0a0a] rounded-2xl border border-white/5">
                   <span className="text-gray-400">Günlük Eşlik</span>
                   <span className="font-bold">₺{profile.prices.daily || "Görüşülür"}</span>
                </div>
                {/* Restricted on Web */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between p-4 bg-gradient-to-r from-black to-[#050505] rounded-2xl border border-dashed border-white/10 hover:border-[#ff2d55]/30 transition-all group"
                >
                   <span className="text-gray-600 group-hover:text-gray-400 transition-colors">Diğer Paketler ve Rezervasyon</span>
                   <span className="font-black text-[#ff2d55] text-[10px] uppercase tracking-tighter">Uygulamayı İndir →</span>
                </a>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

