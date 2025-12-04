import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Clock, BookOpen, AlertCircle, TrendingUp, CheckCircle, MapPin, Calendar, Zap, Activity, ArrowRight } from 'lucide-react';

// Pro Circular Progress Component
const CircularProgress = ({ percent = 0, size = 80 }) => {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 75 ? "#10B981" : "#EF4444"; 

  return (
    <svg width={size} height={size} className="block transform -rotate-90">
      <circle r={radius} cx={size/2} cy={size/2} stroke="rgba(255,255,255,0.2)" strokeWidth={stroke} fill="transparent" />
      <circle r={radius} cx={size/2} cy={size/2} stroke={color} strokeWidth={stroke} fill="transparent" strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="18" fontWeight="bold" fill="white" transform="rotate(90, 40, 40)">{percent}%</text>
    </svg>
  );
};

export default function StudentDashboard() {
  const { studentStats, todaysLectures, notices } = useData();
  const [marked, setMarked] = useState(false);
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const isOpen = currentTime >= 510 && currentTime <= 540; 

  if (!studentStats) return <div className="p-10 text-center animate-pulse text-slate-500">Loading Dashboard...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Arjun! You have 2 pending tasks.</p>
        </div>
        
        <div className="flex gap-3">
           {/* Attendance Button */}
           <button 
              onClick={() => { if(isOpen) { setMarked(true); alert("Marked!"); } else alert("Window Closed! Try 8:30-9:00 AM"); }}
              disabled={!isOpen}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${isOpen ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30' : 'bg-white border text-slate-400 cursor-not-allowed'}`}
           >
              <MapPin size={18}/> {marked ? "Marked Today" : (isOpen ? "Mark Attendance" : "Attendance Closed")}
           </button>
        </div>
      </div>
      
      {/* 2. Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hero Card: Attendance */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700"><Activity size={120}/></div>
          <div className="relative z-10 flex justify-between items-center h-full">
            <div>
              <p className="text-slate-300 font-medium mb-1">Total Attendance</p>
              <h2 className="text-4xl font-bold mb-2">{studentStats.attendancePercentage}%</h2>
              <div className="flex gap-2">
                 <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded text-xs border border-green-500/30">Safe</span>
                 <span className="text-slate-400 text-xs self-center">+2% this week</span>
              </div>
            </div>
            <CircularProgress percent={studentStats.attendancePercentage} />
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors"><BookOpen size={24}/></div>
            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">URGENT</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-800">{studentStats.assignments.pending}</span>
            <span className="text-sm text-slate-500">Pending Submissions</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
             <div className="bg-orange-500 h-1.5 rounded-full" style={{width: '60%'}}></div>
          </div>
        </div>

        {/* Syllabus */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><TrendingUp size={24}/></div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">SEM 3</span>
          </div>
           <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-800">{studentStats.syllabusCompletion}%</span>
            <span className="text-sm text-slate-500">Syllabus Covered</span>
          </div>
           <div className="w-full bg-slate-100 h-1.5 mt-4 rounded-full overflow-hidden">
             <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${studentStats.syllabusCompletion}%` }}></div>
           </div>
        </div>
      </div>

      {/* 3. Schedule & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Clock className="text-blue-600"/> Today's Timeline</h3>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
            {todaysLectures.map((lec, i) => (
              <div key={i} className="min-w-[220px] bg-slate-50 p-4 rounded-xl border border-slate-100 snap-start hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2 py-1 rounded border">{lec.time}</span>
                  <div className={`h-2 w-2 rounded-full ${i===0 ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                </div>
                <div className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors truncate">{lec.subject}</div>
                <div className="text-sm text-slate-500 mt-1 flex items-center gap-1"><MapPin size={14}/> {lec.room}</div>
              </div>
            ))}
            <div className="min-w-[140px] flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
              <Calendar size={24} className="mb-2"/>
              <span>View Full Week</span>
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><AlertCircle className="text-orange-500"/> Notice Board</h3>
          <div className="space-y-3 flex-1">
              {notices.map(n => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${n.type === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{n.type}</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-tight group-hover:text-blue-900">{n.title}</p>
                </div>
              ))}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-slate-500 font-medium hover:text-blue-600 flex items-center justify-center gap-1 transition-colors">
            View All <ArrowRight size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}