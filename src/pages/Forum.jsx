import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Send, Search, Terminal, MessageSquare, Plus, User, Bot, Users, Loader, X } from 'lucide-react';

export default function Forum() {
  const { chatHistory, addChatMessage, forumThreads, lostFoundItems, addLostItem } = useData();
  const [activeTab, setActiveTab] = useState('echo');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, activeTab, isLoading]);

  // -------------------------------------------------------------
  // 💎 REAL GEMINI 2.0 FLASH INTEGRATION
  // -------------------------------------------------------------
  const handleChat = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. User Message UI mein add karo
    addChatMessage(input, 'user');
    const userMessage = input;
    setInput('');
    setIsLoading(true);

    try {
      // 👇 TERI DETAILS (GEMINI 2.0 FLASH)
      const API_KEY = "Don't be sneaky"; 
      const BASE_URL = "I know, you won't get this.";
      
      // URL mein Key append karni padti hai Gemini ke liye
      const API_URL = `${BASE_URL}?key=${API_KEY}`;

      // 2. Request Bhejo
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userMessage }]
          }]
        })
      });

      const data = await response.json();
      
      // 3. Jawab Nikalo
      // Gemini ka response structure thoda deep hota hai
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini Error: No response generated.";

      addChatMessage(botReply, 'bot');

    } catch (error) {
      console.error("Gemini Error:", error);
      addChatMessage("Error: Could not connect to Gemini. Check Console.", 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  // --- LOCAL STATE FOR ADDING ITEMS (Demo Logic) ---
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', desc: '', tag: '' });
  const [localThreads, setLocalThreads] = useState(forumThreads);
  const [localGroups, setLocalGroups] = useState([
    { id: 1, name: "CSE 3rd Year Official", type: "Class GC", members: 120 },
    { id: 2, name: "Hackathon Team Alpha", type: "Custom", members: 4 }
  ]);

  const handleCreate = () => {
    if (!newItem.title) return alert("Please enter details");
    if (activeTab === 'discuss') {
      const thread = { id: Date.now(), title: newItem.title, author: "You", replies: 0, tag: newItem.tag || 'General' };
      setLocalThreads([thread, ...localThreads]);
    } else if (activeTab === 'groups') {
      const group = { id: Date.now(), name: newItem.title, type: newItem.tag || 'Custom', members: 1 };
      setLocalGroups([group, ...localGroups]);
    } else if (activeTab === 'lost') {
      addLostItem({ itemName: newItem.title, desc: newItem.desc });
    }
    setShowModal(false);
    setNewItem({ title: '', desc: '', tag: '' });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 relative">
      
      {/* TABS */}
      <div className="flex justify-between items-center bg-white p-2 rounded-xl border shadow-sm">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['echo', 'discuss', 'groups', 'lost'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)} 
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize flex items-center gap-2 ${activeTab === t ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {t === 'echo' && <Terminal size={14}/>}
              {t === 'discuss' && <MessageSquare size={14}/>}
              {t === 'groups' && <Users size={14}/>}
              {t === 'lost' && <Search size={14}/>}
              {t === 'echo' ? 'AI Terminal' : t}
            </button>
          ))}
        </div>
        {activeTab !== 'echo' && (
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-bold px-3">
            <Plus size={18}/> <span className="hidden sm:inline">New</span>
          </button>
        )}
      </div>

      {/* 🤖 GEMINI TERMINAL */}
      {activeTab === 'echo' && (
        <div className="flex-1 bg-black rounded-xl flex flex-col font-mono border border-slate-700 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 px-4 py-2 text-xs text-green-500 border-b border-slate-800 flex justify-between">
            <span>root@campus-connect:~/gemini-2.0-flash</span>
            <span className={isLoading ? "animate-pulse text-yellow-400" : "text-green-400"}>{isLoading ? "PROCESSING..." : "ONLINE"}</span>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-blue-900 text-blue-200 border border-blue-700' : 'text-green-400 font-bold'}`}>
                  <span className="opacity-50 mr-2 select-none">{msg.sender === 'user' ? '>' : '#'}</span>{msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-green-500/50 text-sm pl-2 flex items-center gap-2"><Loader size={14} className="animate-spin"/> Gemini is thinking...</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleChat} className="bg-slate-900 p-2 flex gap-2 border-t border-slate-800">
            <input value={input} onChange={e => setInput(e.target.value)} disabled={isLoading} className="flex-1 bg-transparent text-green-400 outline-none px-2 placeholder-slate-600" placeholder="Ask Gemini..." autoFocus />
            <button type="submit" disabled={isLoading || !input.trim()} className="text-slate-400 hover:text-white disabled:opacity-30"><Send size={18}/></button>
          </form>
        </div>
      )}

      {/* DISCUSSIONS TAB */}
      {activeTab === 'discuss' && (
        <div className="flex-1 space-y-3 overflow-auto">
           {localThreads.map((t, i) => (
             <div key={i} className="bg-white p-4 rounded-xl border hover:shadow-md cursor-pointer">
               <h3 className="font-bold text-blue-900">{t.title}</h3>
               <div className="text-xs text-slate-500 mt-1 flex justify-between">
                 <span>{t.author} • {t.replies} Replies</span>
                 <span className="bg-slate-100 px-2 rounded text-slate-600">{t.tag}</span>
               </div>
             </div>
           ))}
        </div>
      )}

      {/* GROUPS TAB */}
      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {localGroups.map((g, i) => (
             <div key={i} className="bg-white p-4 rounded-xl border flex justify-between items-center hover:shadow-md cursor-pointer">
               <div className="flex items-center gap-3">
                 <div className="bg-blue-50 p-2 rounded-full text-blue-600"><Users size={20}/></div>
                 <div><h3 className="font-bold">{g.name}</h3><p className="text-xs text-slate-500">{g.members} Members</p></div>
               </div>
               <button className="text-xs bg-slate-900 text-white px-3 py-1 rounded">Open</button>
             </div>
           ))}
        </div>
      )}

      {/* LOST & FOUND TAB */}
      {activeTab === 'lost' && (
        <div className="flex-1 overflow-auto">
          {lostFoundItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400"><Search size={40} className="mb-2 opacity-50"/><p>No items reported.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lostFoundItems.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex justify-between items-center">
                  <div><h3 className="font-bold text-slate-800">{item.itemName || item.name}</h3><p className="text-xs text-slate-500">{item.desc || 'No description'}</p></div>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">LOST</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL FOR NEW ITEM */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Create New</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <div className="space-y-3">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Title / Name</label><input className="w-full border p-2 rounded outline-none" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} autoFocus /></div>
              {activeTab !== 'lost' && <div><label className="text-xs font-bold text-slate-500 uppercase">Tag / Type</label><input className="w-full border p-2 rounded outline-none" placeholder="e.g. Doubts" value={newItem.tag} onChange={e => setNewItem({...newItem, tag: e.target.value})}/></div>}
              {activeTab === 'lost' && <div><label className="text-xs font-bold text-slate-500 uppercase">Description</label><textarea className="w-full border p-2 rounded outline-none" placeholder="Details..." value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})}/></div>}
              <button onClick={handleCreate} className="w-full bg-blue-900 text-white py-2 rounded font-bold mt-2">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
