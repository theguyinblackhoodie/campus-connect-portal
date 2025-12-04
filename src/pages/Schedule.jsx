import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar as CalendarIcon, Clock, FileText, AlertTriangle, MapPin, Download, RefreshCw, Check, CheckCircle } from 'lucide-react';

export default function Schedule() {
  const { isCalendarSynced, syncGoogleCalendar, googleEvents } = useData();
  const [loading, setLoading] = useState(false);

  // Local Mock Exams
  const exams = [
    { date: "10 Dec", subject: "Data Structures", time: "10:00 AM", room: "Hall A" },
    { date: "12 Dec", subject: "Operating Systems", time: "10:00 AM", room: "Hall B" }
  ];

  const handleSync = async () => {
    setLoading(true);
    await syncGoogleCalendar();
    setLoading(false);
    alert("Google Calendar Synced Successfully!");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Academic Schedule</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            {isCalendarSynced ? <span className="text-green-600 flex items-center gap-1"><CheckCircle size={14}/> Synced with Google Calendar</span> : "Manage your exams & deadlines."}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSync}
            disabled={isCalendarSynced || loading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm border ${
              isCalendarSynced 
              ? 'bg-green-50 text-green-700 border-green-200 cursor-default' 
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
            }`}
          >
            {loading ? <RefreshCw size={16} className="animate-spin"/> : (isCalendarSynced ? <Check size={16}/> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-4 h-4" alt="G"/>)}
            {loading ? "Syncing..." : (isCalendarSynced ? "Synced" : "Sync Google Calendar")}
          </button>
          
          <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 shadow-sm">
            <Download size={16}/> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exams Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-800">
            <AlertTriangle className="text-red-500" size={22}/> Exams & Events
          </h3>
          
          <div className="space-y-4">
            {/* Standard Exams */}
            {exams.map((e, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-red-50/50 rounded-xl border border-red-100 hover:bg-white hover:shadow-md transition">
                <div className="bg-white px-4 py-2 rounded-lg text-center border border-red-100 shadow-sm">
                  <div className="text-xs text-red-400 font-bold uppercase">{e.date.split(' ')[1]}</div>
                  <div className="text-2xl font-black text-red-600">{e.date.split(' ')[0]}</div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-slate-800 text-lg">{e.subject}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><Clock size={12}/> {e.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {e.room}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Google Calendar Events (Only visible after Sync) */}
            {isCalendarSynced && googleEvents.map((g, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-white hover:shadow-md transition animate-fade-in">
                <div className="bg-white px-4 py-2 rounded-lg text-center border border-blue-100 shadow-sm">
                  <div className="text-xs text-blue-400 font-bold uppercase">{g.date.split(' ')[1]}</div>
                  <div className="text-2xl font-black text-blue-600">{g.date.split(' ')[0]}</div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    {g.title} 
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-3 h-3" alt="G"/>
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><Clock size={12}/> {g.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {g.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <CalendarIcon className="text-blue-600"/> December 2025
              </h3>
           </div>
           <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="font-bold text-slate-400 py-3 uppercase text-xs tracking-widest">{d}</div>)}
              {[...Array(31)].map((_, i) => {
                 const day = i + 1;
                 const isExam = day === 10 || day === 12;
                 const isGoogle = isCalendarSynced && (day === 15 || day === 18); // Show dots only if synced
                 const isToday = day === 1;

                 return (
                   <div key={i} className={`min-h-[60px] flex flex-col items-center justify-start py-2 rounded-xl border transition-all ${isToday ? 'bg-blue-50 border-blue-200 font-bold text-blue-700' : 'border-transparent hover:bg-slate-50'}`}>
                     <span>{day}</span>
                     <div className="flex gap-1 mt-1">
                       {isExam && <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>}
                       {isGoogle && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
                     </div>
                   </div>
                 );
              })}
           </div>
        </div>
      </div>
    </div>
  );
}