import React from 'react';
import { useData } from '../context/DataContext';
import { Settings, Users, Database, Globe, AlertTriangle, Cpu, FileText, Plus, ListChecks, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { currentUser, requests, lostFoundItems } = useData();
  const navigate = useNavigate();
  
  // Mock data for Admin Console
  const systemMetrics = {
    totalUsers: 4500, // Students + Faculty + Admin
    activeSessions: 312,
    databaseStatus: "Online",
    uptime: "99.9%",
    totalResourceRequests: requests.length,
    pendingIncidents: lostFoundItems.filter(item => item.status === 'Pending').length,
    softwareVersion: "v2.1.0"
  };

  const userCounts = {
    student: 5000, // Mocked total users for clarity
    faculty: 300,
    admin: 20
  };

  if (!currentUser) return <div className="text-center p-10">Please login.</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800">
        Platform Administrator Console
      </h1>
      <p className="text-slate-500">Global Oversight and System Health - Version {systemMetrics.softwareVersion}</p>

      {/* 1. System Health Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Database Status */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg">
          <Database size={24} className="text-green-400 mb-2"/>
          <p className="text-3xl font-bold">{systemMetrics.databaseStatus}</p>
          <p className="text-sm text-slate-300">Database Status</p>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <Globe size={24} className="text-blue-600 mb-2"/>
          <p className="text-3xl font-bold">{systemMetrics.activeSessions}</p>
          <p className="text-sm text-slate-500">Active Sessions</p>
        </div>

        {/* Audit / Pending Incidents */}
        <div 
          className={`rounded-2xl p-5 shadow-sm cursor-pointer ${
            systemMetrics.pendingIncidents > 0 ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white border text-slate-700'
          }`}
          onClick={() => navigate('/forum')} // Navigate to Lost & Found/Audit
        >
          <AlertTriangle size={24} className="text-white mb-2"/>
          <p className="text-3xl font-bold">{systemMetrics.pendingIncidents}</p>
          <p className="text-sm">Pending Incidents</p>
        </div>
        
        {/* Total Requests Processed (Audit Metric) */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <ListChecks size={24} className="text-orange-600 mb-2"/>
          <p className="text-3xl font-bold">{systemMetrics.totalResourceRequests}</p>
          <p className="text-sm text-slate-500">Total Resource Requests</p>
        </div>
      </div>
      
      {/* 2. User Breakdown & Config */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User Breakdown */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm lg:col-span-2">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><Users size={20}/> User Role Breakdown</h3>
          <div className="grid grid-cols-3 gap-4">
             <div className="p-4 bg-blue-50 rounded-xl text-center"><p className="text-3xl font-bold text-blue-800">{userCounts.student}</p><p className="text-xs text-slate-600 mt-1">Students</p></div>
             <div className="p-4 bg-orange-50 rounded-xl text-center"><p className="text-3xl font-bold text-orange-800">{userCounts.faculty}</p><p className="text-xs text-slate-600 mt-1">Faculty</p></div>
             <div className="p-4 bg-red-50 rounded-xl text-center"><p className="text-3xl font-bold text-red-800">{userCounts.admin}</p><p className="text-xs text-slate-600 mt-1">Admins</p></div>
          </div>
          <p className="text-sm text-center mt-4 pt-4 border-t text-slate-500 hover:text-blue-600 cursor-pointer">View User Management Panel <ArrowRight size={14} className="inline ml-1"/></p>
        </div>
        
        {/* Global Configuration */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><Settings size={20}/> Global Configuration</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200">Set Attendance Window (Mock)</button>
            <button className="w-full py-3 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200">Manage E-book Catalog</button>
            <button className="w-full py-3 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">System Maintenance Log</button>
          </div>
        </div>
      </div>
    </div>
  );
}