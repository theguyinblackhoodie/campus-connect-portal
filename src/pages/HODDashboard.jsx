import React from 'react';
import { useData } from '../context/DataContext';
import { AlertTriangle, TrendingUp, Users, CheckCircle, FileText, Code, Clock, MapPin, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HODDashboard() {
  const { currentUser, requests, getPendingRequests, approveRequest } = useData();
  const navigate = useNavigate();
  // HOD will see all non-canteen resource requests (Library, Lab, Sports)
  const pendingRequests = getPendingRequests().filter(req => req.type !== 'canteen');

  // Mock data for departmental oversight
  const departmentStats = {
    totalStudents: 320,
    avgAttendance: 81,
    passRate: 92,
    activeFaculty: 12,
    researchPublications: 45 // High-impact metric
  };

  const mockFacultyClasses = [
    { name: "Dr. Sharma", classes: 2, students: 65, status: "Grading Pending" },
    { name: "Prof. Gupta", classes: 3, students: 90, status: "Active" },
    { name: "Ms. Priya", classes: 1, students: 30, status: "Active" },
    { name: "Mr. Vishal", classes: 2, students: 50, status: "Active" },
  ];

  if (!currentUser) return <div className="text-center p-10">Please login.</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800">
        Department Head Console — {currentUser.name}
      </h1>
      <p className="text-slate-500">Oversight and Management Dashboard.</p>

      {/* Stats Grid for HOD (Oversight Focus) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* 1. Pending Approvals Card (Actionable) */}
        <div 
          className={`rounded-2xl p-6 shadow-xl cursor-pointer transition-transform hover:scale-[1.02] ${
            pendingRequests.length > 0 ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white border text-slate-700'
          }`}
          onClick={() => pendingRequests.length > 0 ? navigate('/reservations') : null} 
        >
          <div className="text-4xl font-bold">{pendingRequests.length}</div>
          <p className="font-medium text-sm mt-1">Approvals Needed</p>
          <AlertTriangle size={48} className="absolute right-4 top-4 opacity-30"/>
        </div>

        {/* 2. Avg Attendance */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-green-600">{departmentStats.avgAttendance}%</div>
          <p className="text-sm text-slate-500">Dept. Avg. Attendance</p>
          <TrendingUp size={18} className="text-green-500 mt-2"/>
        </div>

        {/* 3. Research Output (High-Impact Metric) */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{departmentStats.researchPublications}</div>
          <p className="text-sm text-slate-500">Research Publications</p>
          <Code size={18} className="text-blue-500 mt-2"/>
        </div>
        
        {/* 4. Total Students */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="text-3xl font-bold text-slate-800">{departmentStats.totalStudents}</div>
          <p className="text-sm text-slate-500">Total Students</p>
          <Users size={18} className="text-slate-500 mt-2"/>
        </div>
      </div>

      {/* Approvals & Faculty List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Detailed Approvals List */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-red-500"/> Approval Queue (Resources)</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {pendingRequests.length > 0 ? (
                pendingRequests.slice(0, 5).map(req => (
                  <div key={req.id} className="flex justify-between items-center p-3 border rounded-lg bg-red-50/50">
                    <div>
                      <p className="font-medium text-sm text-slate-800">{req.requestedBy} requested {req.name}</p>
                      <p className="text-xs text-red-500">{req.date} • {req.type}</p>
                    </div>
                    <button onClick={() => approveRequest(req.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600">
                      Approve
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-4">No pending resource requests.</div>
              )}
            </div>
            {pendingRequests.length > 5 && (
              <p className="text-sm text-center pt-2 text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/reservations')}>
                  View All Requests →
              </p>
            )}
        </div>

        {/* Faculty Oversight List */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><UserIcon size={20}/> Faculty Activity Overview</h3>
          <div className="space-y-3">
            {mockFacultyClasses.map((fac, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <p className="font-medium text-sm text-slate-800">{fac.name} ({fac.classes} Classes)</p>
                <div className={`text-xs px-2 py-1 rounded ${fac.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{fac.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}