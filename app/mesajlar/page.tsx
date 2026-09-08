"use client";

import React, { useEffect, useState, useRef } from 'react';
import { collection, query, where, onSnapshot, doc, getDoc, Timestamp, addDoc, serverTimestamp, orderBy, limit, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

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
  isRequest?: boolean; // İstek olduğunu belirtmek için
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

  // SOHBETLERİ VE İSTEKLERİ ÇEK
  useEffect(() => {
    if (!user) return;

    // 1. Aktif Sohbetler Sorgusu
    const qChats = query(collection(db, 'chats'), where('participants', 'array-contains', user.uid));

    // 2. Mesaj İstekleri Sorgusu (Gelen Kutusu)
    const qRequests = query(collection(db, 'message_requests'), where('receiverId', '==', user.uid), where('status', '==', 'pending'));

    const unsubChats = onSnapshot(qChats, async (snap) => {
      const chatData = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Chat[];

      // İstekler için ayrı bir snapshot (opsiyonel ama biz birleştirelim)
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

        // Filtreleme & Tekilleştirme
        const map = new Map();
        allRaw.forEach(item => {
          const isAccepted = item.requestStatus === 'accepted';
          const isPending = item.requestStatus === 'pending';
          const isLegacy = !item.requestStatus && item.isActive !== false;

          if (isAccepted || isPending || isLegacy) {
            map.set(item.id, item);
          }
        });

        const filtered = Array.from(map.values());

        // Sıralama
        filtered.sort((a, b) => {
          const aT = a.lastMessageTime instanceof Timestamp ? a.lastMessageTime.toMillis() : 0;
          const bT = b.lastMessageTime instanceof Timestamp ? b.lastMessageTime.toMillis() : 0;
          return bT - aT;
        });

        // Detayları Doldur
        const detailed = await Promise.all(filtered.map(async (c) => {
          const otherId = c.participants.find((p: string) => p !== user.uid);
          if (!otherId) return c;
          const uSnap = await getDoc(doc(db, 'users', otherId));
          if (uSnap.exists()) {
            const d = uSnap.data();
            return { ...c, otherUser: { id: otherId, name: d.name || d.displayName || "Kullanıcı", image: d.profileImageUrl || d.photoUrl || "" } };
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

  // MESAJLARI ÇEK
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

  if (!user && !loading) return <div className="p-20 text-center text-white font-bold">Lütfen Giriş Yapın</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[85vh] flex gap-4">
      {/* SOL: SOHBET LİSTESİ */}
      <div className={`flex-col ${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-96 bg-[#0a0a0a] rounded-[2.5rem] border border-[#1a1a1a] overflow-hidden`}>
        <div className="p-6 border-b border-[#1a1a1a] flex justify-between items-center">
          <h1 className="text-xl font-black text-white tracking-tighter">MESAJLAR</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center gap-4 ${
                activeChat?.id === c.id ? 'bg-[#ff2d55]/10 border-[#ff2d55]/30' : 'bg-[#111]/40 border-transparent hover:bg-[#111]'
              }`}
            >
              <div className="relative w-14 h-14 rounded-2xl bg-black border border-white/5 overflow-hidden flex-shrink-0">
                {c.otherUser?.image ? <img src={c.otherUser.image} className="w-full h-full object-cover" /> : <span className="m-auto opacity-20 text-2xl">👤</span>}
                {c.isRequest && <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500 rounded-full border-2 border-black" title="İstek"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate uppercase">{c.otherUser?.name}</h3>
                <p className={`text-xs truncate ${c.unreadCount?.[user.uid] > 0 ? 'text-white font-bold' : 'text-gray-500'}`}>{c.lastMessage}</p>
              </div>
              {c.unreadCount?.[user.uid] > 0 && <div className="w-6 h-6 bg-[#ff2d55] rounded-full text-[10px] font-black text-white flex items-center justify-center animate-pulse">{c.unreadCount[user.uid]}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ: SOHBET EKRANI */}
      <div className={`flex-1 flex flex-col bg-[#0a0a0a] rounded-[2.5rem] border border-[#1a1a1a] overflow-hidden ${!activeChat ? 'hidden md:flex items-center justify-center' : ''}`}>
        {!activeChat ? (
          <div className="text-center opacity-20">
             <div className="text-8xl mb-4">💬</div>
             <p className="font-black tracking-widest uppercase">Bir sohbet seçin</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-[#1a1a1a] flex items-center gap-4">
              <button onClick={() => setActiveChat(null)} className="md:hidden text-2xl">←</button>
              <div className="w-12 h-12 rounded-2xl bg-[#111] overflow-hidden">
                {activeChat.otherUser?.image && <img src={activeChat.otherUser.image} className="w-full h-full object-cover" />}
              </div>
              <h2 className="font-black text-white uppercase">{activeChat.otherUser?.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeChat.isRequest ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-8 bg-amber-500/10 rounded-[2rem] border border-amber-500/20 max-w-sm">
                    <h3 className="text-amber-500 font-black mb-2 uppercase">MESAJ İSTEĞİ</h3>
                    <p className="text-sm text-gray-400 mb-6">Bu kullanıcı sizinle iletişime geçmek istiyor.</p>
                    <div className="bg-black/40 p-4 rounded-xl text-white italic mb-8">"{activeChat.lastMessage}"</div>
                    <button onClick={() => acceptRequest(activeChat)} className="w-full py-4 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all">İSTEĞİ KABUL ET</button>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-4 rounded-[1.5rem] text-sm shadow-xl ${m.senderId === user.uid ? 'bg-[#ff2d55] text-white rounded-tr-none' : 'bg-[#1a1a1a] text-gray-300 rounded-tl-none'}`}>
                        {m.text}
                        <div className="text-[8px] opacity-40 mt-1 text-right">{m.timestamp instanceof Timestamp ? m.timestamp.toDate().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </>
              )}
            </div>

            {!activeChat.isRequest && (
              <div className="p-6 border-t border-[#1a1a1a] bg-black/20">
                <div className="flex gap-3">
                  <input
                    type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Mesajınızı buraya yazın..."
                    className="flex-1 bg-[#111] border border-[#222] rounded-2xl px-6 py-4 text-white outline-none focus:border-[#ff2d55]/50"
                  />
                  <button onClick={sendMessage} className="w-14 h-14 bg-[#ff2d55] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ff2d55]/20">➔</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
