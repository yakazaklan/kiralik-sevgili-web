"use client";

import React, { useEffect, useState, useRef } from 'react';
import { collection, query, where, onSnapshot, doc, getDoc, Timestamp, addDoc, serverTimestamp, orderBy, limit, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  type: string;
};

type Chat = {
  id: string;
  lastMessage: string;
  lastMessageTime: any;
  participants: string[];
  unreadCount: Record<string, number>;
  requestStatus?: string;
  isActive?: boolean;
  isRequest?: boolean;
  otherUser?: {
    id: string;
    name: string;
    image: string;
  };
};

export default function MesajlarPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const qChats = query(collection(db, 'chats'), where('participants', 'array-contains', user.uid));
    const qRequests = query(collection(db, 'message_requests'), where('receiverId', '==', user.uid), where('status', '==', 'pending'));

    const unsubChats = onSnapshot(qChats, async (snap) => {
      const chatData = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Chat[];

      const unsubReqs = onSnapshot(qRequests, async (reqSnap) => {
        const reqData = reqSnap.docs.map(d => ({
          id: d.id,
          lastMessage: d.data().initialMessage || "Yeni Mesaj İsteği",
          lastMessageTime: d.data().createdAt,
          participants: [d.data().senderId, d.data().receiverId],
          requestStatus: 'pending',
          isRequest: true,
          ...d.data()
        })) as any[];

        const allRaw = [...chatData, ...reqData];
        const map = new Map();
        allRaw.forEach(item => {
          const isAccepted = item.requestStatus === 'accepted';
          const isPending = item.requestStatus === 'pending';
          const isLegacy = !item.requestStatus && item.isActive !== false;
          if (isAccepted || isPending || isLegacy) map.set(item.id, item);
        });

        const filtered = Array.from(map.values());
        filtered.sort((a, b) => {
          const aT = a.lastMessageTime instanceof Timestamp ? a.lastMessageTime.toMillis() : 0;
          const bT = b.lastMessageTime instanceof Timestamp ? b.lastMessageTime.toMillis() : 0;
          return bT - aT;
        });

        const detailed = await Promise.all(filtered.map(async (c) => {
          const otherId = c.participants.find((p: string) => p !== user.uid);
          if (!otherId) return c;
          const uSnap = await getDoc(doc(db, 'users', otherId));
          if (uSnap.exists()) {
            const d = uSnap.data();
            return { ...c, otherUser: { id: otherId, name: d.name || "Kullanıcı", image: d.profileImageUrl || d.photoUrl || "" } };
          }
          return c;
        }));

        setChats(detailed);
        setLoading(false);
      });
      return () => unsubReqs();
    });

    return () => unsubChats();
  }, [user]);

  useEffect(() => {
    if (!activeChat || activeChat.isRequest || !user) {
      setMessages([]);
      return;
    }
    const msgsQ = query(collection(db, 'chats', activeChat.id, 'messages'), orderBy('timestamp', 'asc'), limit(50));
    const unsub = onSnapshot(msgsQ, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Message[]);
      if (activeChat.unreadCount?.[user.uid] > 0) {
        updateDoc(doc(db, 'chats', activeChat.id), { [`unreadCount.${user.uid}`]: 0 });
      }
    });
    return () => unsub();
  }, [activeChat, user]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !user || activeChat.isRequest) return;
    const txt = newMessage;
    setNewMessage("");
    try {
      await addDoc(collection(db, 'chats', activeChat.id, 'messages'), { senderId: user.uid, text: txt, timestamp: serverTimestamp(), type: 'text' });
      await updateDoc(doc(db, 'chats', activeChat.id), { lastMessage: txt, lastMessageTime: serverTimestamp(), lastMessageSenderId: user.uid });
    } catch (e) { console.error(e); }
  };

  const acceptRequest = async (chat: Chat) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'message_requests', chat.id), { status: 'accepted', updatedAt: serverTimestamp() });
      await setDoc(doc(db, 'chats', chat.id), {
        chatId: chat.id,
        participants: chat.participants,
        requestStatus: 'accepted',
        isActive: true,
        lastMessage: chat.lastMessage,
        lastMessageTime: serverTimestamp(),
        unreadCount: { [chat.participants[0]]: 1, [chat.participants[1]]: 0 }
      }, { merge: true });
      setActiveChat({ ...chat, isRequest: false, requestStatus: 'accepted' });
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div></div>;

  if (!user) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8 text-4xl opacity-20">💬</div>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">GİRİŞ GEREKLİ</h1>
      <p className="text-gray-500 max-w-xs mx-auto mb-10 text-sm font-medium">Mesajlarınıza erişmek ve sosyal ağa katılmak için giriş yapmalısınız.</p>
      <a href="/" className="px-10 py-4 bg-[#ff2d55] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-[#ff2d55]/20">ANA SAYFAYA DÖN</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ff2d55]/30">
      <div className="max-w-6xl mx-auto px-4 py-8 h-[90vh] flex gap-6">
        {/* SOL: SOHBET LİSTESİ */}
        <div className={`flex-col ${activeChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-[400px] bg-[#0a0a0a] rounded-[2.5rem] border border-[#1a1a1a] overflow-hidden shadow-2xl`}>
          <div className="p-8 border-b border-[#1a1a1a] flex justify-between items-center bg-gradient-to-b from-white/[0.02] to-transparent">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">MESAJLAR</h1>
            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px] text-gray-500 font-black">{chats.length}</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {chats.length === 0 ? (
              <div className="py-20 text-center opacity-20 space-y-4">
                <div className="text-5xl">📭</div>
                <p className="text-[10px] font-black uppercase tracking-widest">Henüz mesaj yok</p>
              </div>
            ) : (
              chats.map(c => (
                <div
                  key={c.id}
                  onClick={() => setActiveChat(c)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all border flex items-center gap-4 ${
                    activeChat?.id === c.id
                      ? 'bg-[#ff2d55]/10 border-[#ff2d55]/30 shadow-lg shadow-[#ff2d55]/5'
                      : 'bg-[#111]/40 border-transparent hover:bg-[#111] hover:border-white/5'
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-2xl bg-[#050505] border border-white/5 overflow-hidden flex-shrink-0">
                    {c.otherUser?.image ? <img src={c.otherUser.image} className="w-full h-full object-cover" /> : <span className="m-auto opacity-10 text-3xl flex h-full items-center justify-center">👤</span>}
                    {c.isRequest && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border-[3px] border-black" title="Yeni İstek"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[11px] font-black text-white truncate uppercase tracking-tight">{c.otherUser?.name}</h3>
                      <span className="text-[8px] text-gray-600 font-bold">{c.lastMessageTime instanceof Timestamp ? new Date(c.lastMessageTime.toMillis()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}</span>
                    </div>
                    <p className={`text-[10px] truncate leading-relaxed ${c.unreadCount?.[user.uid] > 0 ? 'text-white font-black' : 'text-gray-500 font-medium'}`}>{c.lastMessage}</p>
                  </div>
                  {c.unreadCount?.[user.uid] > 0 && <div className="w-5 h-5 bg-[#ff2d55] rounded-full text-[9px] font-black text-white flex items-center justify-center animate-pulse">{c.unreadCount[user.uid]}</div>}
                </div>
              ))
            )}
          </div>
        </div>

        {/* SAĞ: SOHBET EKRANI */}
        <div className={`flex-1 flex flex-col bg-[#0a0a0a] rounded-[2.5rem] border border-[#1a1a1a] overflow-hidden shadow-2xl relative ${!activeChat ? 'hidden lg:flex items-center justify-center' : ''}`}>
          {!activeChat ? (
            <div className="text-center space-y-6">
               <div className="text-8xl mb-4 opacity-5 drop-shadow-2xl">💬</div>
               <div className="space-y-2">
                 <p className="font-black tracking-[0.3em] uppercase text-white/40 text-xs">MESAJLAŞMAYA BAŞLAYIN</p>
                 <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Soldan bir sohbet seçin veya profil keşfedin</p>
               </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveChat(null)} className="lg:hidden text-2xl p-2 -ml-2 hover:text-[#ff2d55] transition-colors">←</button>
                  <div className="w-12 h-12 rounded-2xl bg-[#050505] border border-white/5 overflow-hidden">
                    {activeChat.otherUser?.image ? <img src={activeChat.otherUser.image} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full opacity-20">👤</span>}
                  </div>
                  <div>
                    <h2 className="font-black text-white uppercase tracking-tight text-sm">{activeChat.otherUser?.name}</h2>
                    <span className="text-[9px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Çevrimiçi
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">⋮</button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed opacity-95">
                {activeChat.isRequest ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-10 bg-amber-500/5 rounded-[3rem] border border-amber-500/20 max-w-sm backdrop-blur-xl">
                      <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-2xl text-amber-500 mx-auto mb-6">✉️</div>
                      <h3 className="text-amber-500 font-black mb-2 uppercase tracking-tighter text-lg">YENİ MESAJ İSTEĞİ</h3>
                      <p className="text-[11px] text-gray-500 mb-8 font-medium leading-relaxed">Bu kullanıcı sizinle sosyal bir etkinlik veya refakat planı için iletişime geçmek istiyor.</p>
                      <div className="bg-black/60 p-5 rounded-2xl text-white italic text-xs mb-10 border border-white/5 shadow-inner leading-relaxed">"{activeChat.lastMessage}"</div>
                      <button
                        onClick={() => acceptRequest(activeChat)}
                        className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/20 uppercase text-[10px] tracking-widest"
                      >
                        İSTEĞİ KABUL ET VE YAZIŞ
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.length === 0 && (
                      <div className="text-center py-10 opacity-20">
                        <p className="text-[10px] font-black uppercase tracking-widest">Sohbetin başlangıcı</p>
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] group`}>
                          <div className={`p-4 rounded-[1.8rem] text-xs font-medium shadow-2xl relative ${
                            m.senderId === user.uid
                              ? 'bg-[#ff2d55] text-white rounded-tr-none shadow-[#ff2d55]/10'
                              : 'bg-[#1a1a1a] text-gray-200 rounded-tl-none border border-white/5'
                          }`}>
                            {m.text}
                          </div>
                          <div className={`text-[8px] font-black text-gray-600 mt-2 uppercase tracking-widest ${m.senderId === user.uid ? 'text-right' : 'text-left'}`}>
                            {m.timestamp instanceof Timestamp ? new Date(m.timestamp.toMillis()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : 'Gönderiliyor...'}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={scrollRef} />
                  </>
                )}
              </div>

              {/* Chat Input */}
              {!activeChat.isRequest && (
                <div className="p-6 border-t border-[#1a1a1a] bg-gradient-to-t from-white/[0.02] to-transparent">
                  <div className="flex gap-4 mb-4 overflow-x-auto pb-2 no-scrollbar">
                    <a href="https://play.google.com/store" target="_blank" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 hover:text-white hover:bg-[#ff2d55]/20 hover:border-[#ff2d55]/30 transition-all uppercase tracking-widest">
                      🎤 Sesli Mesaj
                    </a>
                    <a href="https://play.google.com/store" target="_blank" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all uppercase tracking-widest">
                      📍 Konum Paylaş
                    </a>
                    <a href="https://play.google.com/store" target="_blank" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 hover:text-white hover:bg-amber-500/20 hover:border-amber-500/30 transition-all uppercase tracking-widest">
                      🎁 Hediye
                    </a>
                  </div>

                  <div className="flex gap-3 bg-[#111] border border-[#222] rounded-[1.5rem] p-1.5 focus-within:border-[#ff2d55]/50 transition-colors shadow-inner">
                    <input
                      type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                      placeholder="Mesajınızı buraya yazın..."
                      className="flex-1 bg-transparent px-6 py-4 text-xs font-medium text-white outline-none placeholder:text-gray-700"
                    />
                    <button
                      onClick={sendMessage}
                      className="w-14 h-14 bg-[#ff2d55] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ff2d55]/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
