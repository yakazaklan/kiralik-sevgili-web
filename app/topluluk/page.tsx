"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Post = {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  text: string;
  imageUrl?: string;
  city: string;
  district: string;
  createdAt: any;
  likes: string[];
  commentCount: number;
  isElite: boolean;
  isAnonymous: boolean;
  isSecret: boolean;
  trustScore: number;
  boostedUntil?: any;
};

function PostCard({ post }: { post: Post }) {
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const isBoosted = post.boostedUntil && post.boostedUntil.toDate() > new Date();
  const displayName = post.isAnonymous ? 'Gizli Üye' : post.userName;

  const handleReport = async (reason: string) => {
    if (!auth.currentUser) {
      alert("Şikayet etmek için giriş yapmalısınız.");
      return;
    }

    setIsReporting(true);
    try {
      await addDoc(collection(db, 'reports'), {
        type: 'community_post',
        targetId: post.id,
        reportedUserId: post.userId,
        reportedUserName: post.userName,
        reporterId: auth.currentUser.uid,
        reason: reason,
        status: 'pending',
        timestamp: serverTimestamp(),
        resolved: false,
      });
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

  let dateStr = "";
  if (post.createdAt instanceof Timestamp) {
    dateStr = post.createdAt.toDate().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-[#1a1a1a] transition-all duration-500 hover:border-[#ff2d55]/30 ${
      isBoosted ? 'ring-2 ring-blue-500/50' : post.trustScore > 0 ? 'ring-2 ring-amber-500/50' : ''
    }`}>
      {isBoosted && (
        <div className="bg-blue-600 py-1.5 text-center">
          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">⚡ ŞEHİR MANŞETİ</span>
        </div>
      )}

      {post.trustScore > 0 && !isBoosted && (
        <div className="bg-gradient-to-r from-amber-600 to-amber-400 py-1.5 text-center">
          <span className="text-[9px] font-black text-black uppercase tracking-[0.2em]">✨ POPÜLER FISILTI</span>
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1a1a1a] border border-white/5">
            {post.isAnonymous ? (
              <div className="flex items-center justify-center h-full text-lg opacity-40">🎭</div>
            ) : post.userPhoto ? (
              <img src={post.userPhoto} alt={post.userName} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-lg opacity-20">👤</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-sm truncate ${post.isAnonymous ? 'text-gray-400 italic' : 'text-white'}`}>
                {displayName}
              </h3>
              {post.isElite && !post.isAnonymous && (
                <span className="text-blue-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 font-medium">
              {post.district}, {post.city} • {dateStr}
            </p>
          </div>

          {/* Report Button */}
          <div className="relative">
            <button
              onClick={() => setShowReportMenu(!showReportMenu)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {showReportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#222] rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-2 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-[#222]">Şikayet Et</div>
                <button
                  onClick={() => handleReport('Uygunsuz İçerik')}
                  disabled={isReporting}
                  className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                >
                  Uygunsuz İçerik
                </button>
                <button
                  onClick={() => handleReport('Spam/Reklam')}
                  disabled={isReporting}
                  className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                >
                  Spam/Reklam
                </button>
                <button
                  onClick={() => handleReport('Taciz/Saldırı')}
                  disabled={isReporting}
                  className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-colors"
                >
                  Taciz/Saldırı
                </button>
              </div>
            )}
          </div>
        </div>

        {post.text && (
          <p className="text-sm text-gray-300 leading-relaxed font-medium">
            {post.text}
          </p>
        )}

        {post.imageUrl && (
          <div className="relative aspect-square sm:aspect-video rounded-xl overflow-hidden bg-black border border-white/5">
            <img src={post.imageUrl} alt="Dedikodu Görseli" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className={`text-lg transition-transform group-hover:scale-110 ${post.likes?.length > 0 ? 'text-[#ff2d55]' : 'text-gray-600'}`}>
                {post.likes?.length > 0 ? '❤️' : '🤍'}
              </span>
              <span className="text-[11px] font-bold text-gray-500">{post.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-lg text-gray-600 transition-transform group-hover:scale-110">💬</span>
              <span className="text-[11px] font-bold text-gray-500">{post.commentCount || 0}</span>
            </div>
          </div>
          {/* CEVAPLA butonu kaldırıldı, etkileşim yorumlar üzerinden sağlanacak */}
        </div>
      </div>
    </div>
  );
}

export default function DedikoduPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      } else {
        setUserProfile(null);
      }
    });

    const q = query(
      collection(db, 'community_posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];

      const sorted = [...loadedPosts].sort((a, b) => {
        const aBoosted = a.boostedUntil && a.boostedUntil.toDate() > new Date();
        const bBoosted = b.boostedUntil && b.boostedUntil.toDate() > new Date();
        if (aBoosted && !bBoosted) return -1;
        if (!aBoosted && bBoosted) return 1;
        return (b.trustScore || 0) - (a.trustScore || 0);
      });

      setPosts(sorted);
      setLoading(false);
    });

    return () => {
      authUnsubscribe();
      unsubscribe();
    };
  }, []);

  const handleShare = async () => {
    if (!newPost.trim() || !userProfile) return;

    if (!userProfile.isApproved || !userProfile.isVerified) {
      alert("Sadece tam onaylı profiller dedikodu fısıldayabilir.");
      return;
    }

    setIsPosting(true);
    try {
      await addDoc(collection(db, 'community_posts'), {
        userId: auth.currentUser?.uid,
        userName: userProfile.name || userProfile.displayName || "Anonim",
        userPhoto: userProfile.profileImageUrl || userProfile.photoUrl || "",
        text: newPost,
        city: userProfile.city || "Türkiye",
        district: userProfile.district || "",
        createdAt: serverTimestamp(),
        likes: [],
        commentCount: 0,
        isElite: userProfile.isElite || false,
        isAnonymous: isAnonymous,
        isSecret: false,
        trustScore: 0
      });
      setNewPost("");
      setIsAnonymous(false);
    } catch (e) {
      console.error(e);
      alert("Paylaşım yapılamadı.");
    } finally {
      setIsPosting(false);
    }
  };

  const isFullyVerified = userProfile?.isApproved === true && userProfile?.isVerified === true;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-block px-6 py-2 bg-[#ff2d55]/10 border border-[#ff2d55]/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2d55] mb-4">
          DEDİKODU & FISILTILAR
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          ŞEHRİNDE <span className="text-[#ff2d55]">NELER OLUYOR?</span>
        </h1>
      </div>

      {/* FISILTI PAYLAŞMA ALANI */}
      <div className="mb-12 p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a]">
        {!userProfile ? (
          <p className="text-center text-gray-500 font-bold uppercase text-[10px] tracking-widest">
            Fısıltı paylaşmak için giriş yapmalısınız.
          </p>
        ) : !isFullyVerified ? (
          <div className="text-center space-y-2">
            <p className="text-amber-500 font-black uppercase text-[10px] tracking-widest">
              ⚠️ KİMLİK ONAYI EKSİK
            </p>
            <p className="text-gray-500 text-xs font-medium">
              Sadece tam onaylı profiller dedikodu fısıldayabilir.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Şehrine bir fısıltı bırak..."
              className="w-full bg-[#111] border border-[#222] rounded-2xl p-4 text-white text-sm focus:border-[#ff2d55]/50 outline-none min-h-[100px] transition-all"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                  isAnonymous ? 'bg-[#ff2d55]/10 border-[#ff2d55] text-[#ff2d55]' : 'bg-[#111] border-[#222] text-gray-500'
                }`}
              >
                {isAnonymous ? '🎭 ANONİM: AÇIK' : '👤 ANONİM: KAPALI'}
              </button>
              <button
                onClick={handleShare}
                disabled={isPosting || !newPost.trim()}
                className="px-8 py-3 bg-[#ff2d55] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff2d55]/80 disabled:opacity-50 transition-all shadow-lg shadow-[#ff2d55]/20"
              >
                {isPosting ? 'GÖNDERİLİYOR...' : 'FISILTIYI PAYLAŞ'}
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-20 p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] text-center">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] leading-loose">
          Dedikodu kurallarına aykırı paylaşımlar sistem tarafından otomatik olarak kaldırılır. <br/>
          Gizliliğinizi korumak için anonim paylaşım özelliğini kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}
