"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, onSnapshot, getDoc, doc, orderBy, limit, addDoc, serverTimestamp, updateDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function QuickChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      let totalUnread = 0;

      const chatPromises = snapshot.docs.map(async (chatDoc) => {
        const data = chatDoc.data() as any;
        const unread = data.unreadCount?.[user.uid] || 0;
        totalUnread += unread;

        const otherId = data.participants?.find((p: string) => p !== user.uid);
        let otherUser = { id: otherId, name: "Kullanıcı", image: "" };

        if (otherId) {
          const uSnap = await getDoc(doc(db, "users", otherId));
          if (uSnap.exists()) {
            const uData = uSnap.data();
            otherUser = {
              id: otherId,
              name: uData.name || "Kullanıcı",
              image: uData.profileImageUrl || uData.photoUrl || ""
            };
          }
        }

        return {
          id: chatDoc.id,
          ...data,
          otherUser
        };
      });

      const chats = await Promise.all(chatPromises);

      // Tüm sohbetleri göster ama okunmamışları başa al
      chats.sort((a: any, b: any) => {
        const unreadA = a.unreadCount?.[user.uid] || 0;
        const unreadB = b.unreadCount?.[user.uid] || 0;
        if (unreadB !== unreadA) return unreadB - unreadA;

        const timeA = a.lastMessageTime?.toMillis?.() || 0;
        const timeB = b.lastMessageTime?.toMillis?.() || 0;
        return timeB - timeA;
      });

      setRecentChats(chats);
      setUnreadCount(totalUnread);
    });

    return () => unsubscribe();
  }, [user]);

  // Aktif sohbet mesajlarını dinle
  useEffect(() => {
    if (!activeChat || !user) {
      setMessages([]);
      return;
    }

    const msgsQ = query(
      collection(db, 'chats', activeChat.id, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsub = onSnapshot(msgsQ, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Okundu bilgisi
      if (activeChat.unreadCount?.[user.uid] > 0) {
        updateDoc(doc(db, 'chats', activeChat.id), {
          [`unreadCount.${user.uid}`]: 0
        });
      }
    });

    return () => unsub();
  }, [activeChat, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !user) return;
    const txt = newMessage;
    setNewMessage("");

    try {
      const messageData = {
        senderId: user.uid,
        text: txt,
        message: txt, // Mobil uyumluluk
        timestamp: serverTimestamp(),
        createdAt: serverTimestamp(), // Mobil uyumluluk
        type: 'text',
        isRead: false
      };

      await addDoc(collection(db, 'chats', activeChat.id, 'messages'), messageData);

      // Ana sohbet belgesini güncelle
      await updateDoc(doc(db, 'chats', activeChat.id), {
        lastMessage: txt,
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: user.uid,
        [`unreadCount.${activeChat.otherUser?.id}`]: (activeChat.unreadCount?.[activeChat.otherUser?.id] || 0) + 1
      });

      // Bildirim gönder
      if (activeChat.otherUser?.id) {
        await addDoc(collection(db, 'notifications'), {
          receiverId: activeChat.otherUser.id,
          senderId: user.uid,
          senderName: user.displayName || "Bir Üye",
          senderPhoto: user.photoURL || null,
          type: 'message',
          title: 'Yeni Mesaj',
          body: txt,
          message: txt,
          chatId: activeChat.id,
          createdAt: serverTimestamp(),
          isRead: false
        });
      }
    } catch (e) {
      console.error("Mesaj gönderilemedi:", e);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[110] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-[#0a0a0a]/98 backdrop-blur-3xl border border-[#d4af37]/40 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">

          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-gradient-to-br from-[#d4af37]/20 to-transparent flex justify-between items-center">
            {activeChat ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#d4af37]/40">
                  {activeChat.otherUser?.image ? <img src={activeChat.otherUser.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-xl">👤</div>}
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase truncate w-32">{activeChat.otherUser?.name}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Çevrimiçi</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">HIZLI MESAJ</h3>
                <p className="text-[9px] text-[#d4af37] font-bold tracking-widest uppercase mt-0.5">SOHBETLERİNİZ</p>
              </div>
            )}
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all hover:rotate-90">✕</button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {!activeChat ? (
              <div className="p-4 space-y-3">
                {recentChats.length === 0 ? (
                  <div className="h-[400px] flex flex-col items-center justify-center opacity-20 text-center px-10">
                    <span className="text-5xl mb-4">💬</span>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Henüz bir mesajınız yok.</p>
                  </div>
                ) : (
                  recentChats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all cursor-pointer group"
                    >
                      <div className="relative w-12 h-12 rounded-xl bg-[#1a1a1a] flex-shrink-0 overflow-hidden border border-white/10 group-hover:border-[#d4af37]/40 transition-all">
                        {chat.otherUser?.image ? <img src={chat.otherUser.image} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-xl opacity-20">👤</span>}
                        {(chat.unreadCount?.[user.uid] > 0) && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#d4af37] rounded-full border-2 border-black animate-pulse"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <p className="text-[11px] font-black text-white truncate uppercase tracking-tight">{chat.otherUser?.name}</p>
                          <span className="text-[8px] text-gray-500">{chat.lastMessageTime instanceof Timestamp ? new Date(chat.lastMessageTime.toMillis()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}</span>
                        </div>
                        <p className={`text-[10px] truncate ${chat.unreadCount?.[user.uid] > 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {chat.lastMessage || "Mesaj gönderildi"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="p-5 space-y-4 min-h-full flex flex-col justify-end">
                {messages.length === 0 && (
                  <div className="text-center py-10 opacity-20">
                    <p className="text-[8px] font-black uppercase tracking-widest">Sohbet Başladı</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${m.senderId === user.uid ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-[11px] font-medium ${
                        m.senderId === user.uid
                          ? 'bg-[#d4af37] text-black rounded-tr-none'
                          : 'bg-[#1a1a1a] text-gray-200 rounded-tl-none border border-white/5'
                      }`}>
                        {m.text || m.message}
                      </div>
                      <span className="text-[7px] text-gray-600 mt-1 uppercase font-bold tracking-widest">
                        {m.timestamp instanceof Timestamp ? new Date(m.timestamp.toMillis()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '...'}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            )}
          </div>

          {/* Footer Input */}
          {activeChat && (
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2 bg-[#111] border border-white/10 rounded-2xl p-1 focus-within:border-[#d4af37]/50 transition-all">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Mesaj yazın..."
                  className="flex-1 bg-transparent px-4 py-2 text-[11px] text-white outline-none placeholder:text-gray-700"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-110 active:scale-90 ${
          isOpen ? 'bg-white text-black' : 'bg-[#d4af37] text-black border-2 border-white/20'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" /></svg>
        ) : (
          <div className="relative">
             <span>💬</span>
             {unreadCount > 0 && (
               <div className="absolute -top-6 -right-6 w-7 h-7 bg-red-600 text-white text-[10px] font-black rounded-full border-[3px] border-black flex items-center justify-center animate-bounce shadow-2xl">
                 {unreadCount}
               </div>
             )}
          </div>
        )}
      </button>
    </div>
  );
}
