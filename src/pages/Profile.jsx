import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Award, Code, Linkedin, Upload, Mail, Phone, MapPin, Github, Camera, Save, X, FileText, Trash2 } from 'lucide-react';

export default function Profile() {
  const { currentUser, userBadges, savedSnippets } = useData();
  
  // --- LOCAL STATE FOR EDITING ---
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || "Arjun Verma",
    role: currentUser?.role || "Student",
    details: currentUser?.details || "B.Tech CSE - 3rd Year",
    email: "arjun.v@svvv.edu.in",
    phone: "+91 98765 43210",
    linkedin: "linkedin.com/in/arjun",
    github: "github.com/arjun-code"
  });

  // --- CERTIFICATE UPLOAD LOGIC (SIMULATION) ---
  const [certificates, setCertificates] = useState([
    { id: 1, name: "Python Bootcamp.pdf", date: "10 Oct 2025" }
  ]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificates([...certificates, {
        id: Date.now(),
        name: file.name,
        date: new Date().toLocaleDateString()
      }]);
    }
  };

  const deleteCert = (id) => {
    setCertificates(certificates.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in">
      
      {/* 1. HERO PROFILE CARD (Editable) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
        <div className="h-40 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-600"></div>
        
        {/* Edit Button */}
        <div className="absolute top-4 right-4">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-blue-900 transition flex items-center gap-2"
            >
              <Camera size={16}/> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"><X size={18}/></button>
              <button onClick={() => setIsEditing(false)} className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-600"><Save size={18}/> Save</button>
            </div>
          )}
        </div>

        <div className="px-8 pb-8 flex flex-col md:flex-row gap-6 relative">
          {/* Avatar Area */}
          <div className="-mt-16 relative">
            <div className="h-32 w-32 bg-white rounded-full p-1.5 shadow-lg">
               <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-900 border-4 border-white">
                 {profile.name[0]}
               </div>
            </div>
          </div>
          
          {/* Details Area */}
          <div className="mt-2 flex-1 space-y-2">
             <div className="w-full">
                 {isEditing ? (
                   <input 
                     className="text-3xl font-bold text-slate-800 border-b-2 border-blue-500 outline-none bg-transparent w-full mb-2" 
                     value={profile.name} 
                     onChange={e => setProfile({...profile, name: e.target.value})}
                   />
                 ) : (
                   <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
                 )}
                 
                 {isEditing ? (
                   <input 
                     className="text-slate-500 font-medium text-lg border-b border-slate-300 outline-none bg-transparent w-full" 
                     value={profile.details}
                     onChange={e => setProfile({...profile, details: e.target.value})}
                   />
                 ) : (
                   <p className="text-slate-500 font-medium text-lg">{profile.details}</p>
                 )}
               </div>
             
             {/* Contact Info Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Mail size={16} className="text-blue-500"/> 
                   {isEditing ? <input className="border rounded px-2 py-1 w-full" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}/> : profile.email}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Phone size={16} className="text-green-500"/> 
                   {isEditing ? <input className="border rounded px-2 py-1 w-full" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}/> : profile.phone}
                 </div>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Linkedin size={16} className="text-[#0077b5]"/> 
                   {isEditing ? <input className="border rounded px-2 py-1 w-full" value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})}/> : <a href={profile.linkedin} target="_blank" className="hover:text-blue-700 hover:underline">{profile.linkedin}</a>}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                   <Github size={16} className="text-slate-800"/> 
                   {isEditing ? <input className="border rounded px-2 py-1 w-full" value={profile.github} onChange={e => setProfile({...profile, github: e.target.value})}/> : <a href="#" className="hover:text-blue-700 hover:underline">{profile.github}</a>}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. BADGES (Gamification) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Award className="text-orange-500"/> Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {userBadges.map(b => (
               <div key={b.id} className={`group p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${b.unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 opacity-60 grayscale'}`}>
                  <div className="text-4xl mb-3 drop-shadow-sm group-hover:scale-110 transition-transform">{b.icon}</div>
                  <div className="text-xs font-bold text-slate-700">{b.label}</div>
                  <div className={`text-[10px] mt-2 px-2 py-0.5 rounded-full font-bold uppercase ${b.unlocked ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>{b.unlocked ? 'Unlocked' : 'Locked'}</div>
               </div>
             ))}
          </div>
        </div>

        {/* 3. CERTIFICATES & UPLOAD */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600"><FileText className="text-blue-600"/> Certificates</h3>
          
          <div className="flex-1 space-y-3 mb-4 max-h-56 overflow-y-auto">
            {certificates.map(cert => (
              <div key={cert.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-red-100 p-2 rounded text-red-500"><FileText size={16}/></div>
                  <div className="truncate">
                    <div className="text-sm font-bold text-slate-700 truncate">{cert.name}</div>
                    <div className="text-[10px] text-slate-400">{cert.date}</div>
                  </div>
                </div>
                <button onClick={() => deleteCert(cert.id)} className="text-slate-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>

          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.png,.jpg"/>
          <button 
            onClick={() => fileInputRef.current.click()}
            className="w-full border-2 border-dashed border-blue-200 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-100 transition flex items-center justify-center gap-2"
          >
            <Upload size={18}/> Upload Certificate
          </button>
        </div>
      </div>
      
      {/* 4. SAVED SNIPPETS */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
         <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Code className="text-blue-600"/> Saved Code Snippets</h3>
         {savedSnippets.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed text-slate-400">No snippets saved.</div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {savedSnippets.map(s => (
                  <div key={s.id} className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-slate-300 font-mono text-xs relative overflow-hidden">
                     <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700">
                        <span className="text-green-400 font-bold uppercase">{s.language}</span>
                        <span className="text-slate-500">{s.date}</span>
                     </div>
                     <div className="h-16 overflow-hidden">{s.code}</div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}