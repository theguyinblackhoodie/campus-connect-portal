import React, { createContext, useContext, useState } from 'react';
import { 
  mockUsers, inventory, studentStats, todaysLectures, notices, badges, events, ebooks, forumThreads, googleEvents
} from '../data/mockData';

const DataContext = createContext();
const welcomeMessage = [{ sender: 'bot', text: 'Echo Terminal v1.0. Ready.' }];
const initialFacultyAttendance = [ // Mock data for Faculty attendance tracking
    { name: "Prof. Sharma", present: 22, total: 25 },
    { name: "Prof. Verma", present: 18, total: 20 }
];

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userBadges] = useState(badges); 
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [lostFoundItems, setLostFoundItems] = useState([]);
  const [chatHistory, setChatHistory] = useState(welcomeMessage);
  const [isCalendarSynced, setIsCalendarSynced] = useState(false); 
  
  // New State for Attendance Tracking
  const [facultyAttendance, setFacultyAttendance] = useState(initialFacultyAttendance);


  const login = (id, pass) => {
    const user = mockUsers.find(u => u.id === id && u.pass === pass);
    if (user) { setCurrentUser(user); setChatHistory(welcomeMessage); return { success: true }; }
    return { success: false, message: 'Invalid Credentials' };
  };
  const logout = () => { setCurrentUser(null); setChatHistory(welcomeMessage); };

  const addToCart = (item, type) => setCart(prev => [...prev, { ...item, type }]);
  const removeFromCart = (idx) => setCart(prev => prev.filter((_, i) => i !== idx));
  
  const completeBooking = () => {
    if (cart.length === 0) return false;
    const newReqs = cart.map(i => ({ ...i, status: i.price ? 'Ordered' : 'Pending Approval', requestedBy: currentUser?.name }));
    setRequests(prev => [...prev, ...newReqs]);
    setCart([]);
    return true;
  };

  const getPendingRequests = () => requests.filter(r => r.status === 'Pending Approval');
  const approveRequest = (id) => { setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req)); };
  const saveSnippet = (code, lang) => setSavedSnippets(prev => [...prev, { id: Date.now(), code, language: lang, date: new Date().toLocaleDateString() }]);
  const addLostItem = (item) => setLostFoundItems(prev => [...prev, { ...item, id: Date.now(), status: 'Pending' }]);
  const addChatMessage = (msg, sender) => setChatHistory(prev => [...prev, { sender, text: msg }]);
  const syncGoogleCalendar = () => { return new Promise((resolve) => { setTimeout(() => { setIsCalendarSynced(true); resolve(true); }, 1500); }); };

  return (
    <DataContext.Provider value={{
      currentUser, login, logout,
      cart, addToCart, removeFromCart, completeBooking,
      requests, getPendingRequests, approveRequest,
      userBadges, savedSnippets, saveSnippet,
      lostFoundItems, addLostItem,
      chatHistory, addChatMessage,
      isCalendarSynced, syncGoogleCalendar, googleEvents,
      // New Data Exports
      facultyAttendance, // For HOD dashboard
      inventory, studentStats, todaysLectures, events, ebooks, forumThreads, notices
    }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
