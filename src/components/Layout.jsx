import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, BookOpen, Calendar, User, LogOut, MessageSquare, Code, ShoppingBag, Bell, Bot, X } from 'lucide-react';

export default function Layout({ children }) {
  const { currentUser, logout, getPendingRequests, notices } = useData();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  
  // Calculate Pending Requests (Only visible to non-students)
  const pendingCount = currentUser?.role !== 'student' && getPendingRequests ? getPendingRequests().length : 0;

  const handleLogout = () => { logout(); navigate('/'); };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Home size={20}/> },
    { label: 'Schedule', path: '/schedule', icon: <Calendar size={20}/> },
    { label: 'Reservations', path: '/reservations', icon: <ShoppingBag size={20}/>}, // <-- MISSING COMMA THA YAHAN
    { label: 'Events', path: '/events', icon: <Calendar size={20}/> },
    { label: 'E-Books', path: '/ebooks', icon: <BookOpen size={20}/> },
    { label: 'Forum', path: '/forum', icon: <MessageSquare size={20}/> },
    { label: 'Playground', path: '/playground', icon: <Code size={20}/> },
    { label: 'Profile', path: '/profile', icon: <User size={20}/> },
  ];
  
  // CRITICAL: Filter Logic to hide E-books/Playground from HOD/Admin
  const isManagement = currentUser?.role === 'hod' || currentUser?.role === 'admin';
  const featuresToHide = ['/ebooks', '/playground'];

  const filteredNavItems = navItems.filter(item => {
    // If user is HOD/Admin, hide E-Books and Playground links
    if (isManagement && featuresToHide.includes(item.path)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen border-r fixed lg:static transition-transform z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b font-bold text-xl text-blue-900 flex items-center gap-2">
          <img src="/vite.svg" className="w-8 h-8" alt="Logo"/> Campus Connect
        </div>
        <nav className="p-4 space-y-2">
          {filteredNavItems.map(item => (
            <Link key={item.label} to={item.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded text-slate-700 font-medium">
              {item.icon} {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full text-left text-red-600 mt-10 hover:bg-red-50">
            <LogOut size={20}/> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white p-4 border-b flex justify-between items-center z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden"><Menu/></button>
            <span className="font-bold">Welcome, {currentUser?.name}</span>
          </div>

          <div className="flex gap-4 items-center relative">
            {/* AI Button in Navbar */}
            <Link to="/forum" className="flex items-center gap-2 bg-slate-900 text-green-400 px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-slate-800 transition">
              <Bot size={14}/> Ask AI
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 hover:bg-slate-100 rounded-full">
                <Bell size={20} className="text-slate-600"/>
                {notices.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>

              {/* Notification Dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                  <div className="p-3 border-b flex justify-between items-center bg-slate-50 rounded-t-xl">
                    <span className="font-bold text-sm">Notifications</span>
                    <button onClick={() => setShowNotifs(false)}><X size={14}/></button>
                  </div>
                  <div className="max-h-64 overflow-auto p-2">
                    {notices.map(n => (
                      <div key={n.id} className="p-2 hover:bg-slate-50 rounded mb-1 border-b border-slate-100 last:border-0">
                        <div className="text-xs font-bold text-blue-600 mb-0.5">{n.title}</div>
                        <div className="text-[10px] text-slate-500 flex justify-between">
                          <span>{n.type}</span> <span>{n.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {currentUser?.name[0]}
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}