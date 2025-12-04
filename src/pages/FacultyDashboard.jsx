import React from 'react';
import { useData } from '../context/DataContext';
import { AlertTriangle, Users, CheckCircle, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FacultyDashboard() {
  const { currentUser, requests, getPendingRequests, approveRequest } = useData();
  const navigate = useNavigate();
  // Faculty sirf non-canteen resource requests dekhenge
  const pendingRequests = getPendingRequests().filter(req => req.type !== 'canteen');

  // Mock data for classes taught by this faculty member
  const classesTaught = [
    { subject: "Data Structures (CS-301)", students: 65, status: "Active" },
    { subject: "Software Engineering", students: 70, status: "Active" },
    { subject: "Operating Systems Lab", students: 30, status: "Active" },
  ];

  if (!currentUser) return <div className="text-center p-10">Please login.</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome, {currentUser.name} 
      </h1>
      <p className="text-slate-500">Academic Control Panel - {currentUser.details}</p>

      {/* Stats Grid for Faculty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Pending Approvals Card (Actionable) */}
        <div 
          className={`rounded-2xl p-6 shadow-xl cursor-pointer transition-transform hover:scale-[1.02] ${
            pendingRequests.length > 0 ? 'bg-orange-500 text-white shadow-orange-500/30' : 'bg-white border text-slate-700'
          }`}
          onClick={() => pendingRequests.length > 0 ? navigate('/reservations') : null} 
        >
          <div className="text-4xl font-bold">{pendingRequests.length}</div>
          <p className="font-medium text-sm mt-1">Pending Resource Requests</p>
          <AlertTriangle size={48} className="absolute right-4 top-4 opacity-30"/>
        </div>

        {/* 2. Total Classes */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><BookOpen size={24}/></div>
          <div>
            <div className="text-3xl font-bold">{classesTaught.length}</div>
            <p className="text-sm text-slate-500">Classes Under Supervision</p>
          </div>
        </div>

        {/* 3. Quick Action */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><CheckCircle size={18}/> Quick Action</h3>
          <button className="bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">Submit Final Grades (Mock)</button>
        </div>
      </div>

      {/* Approvals List & Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Approvals List (Visible only if items are pending) */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-lg text-red-600 mb-4 flex items-center gap-2"><AlertTriangle size={20}/> Approval Queue</h3>
            <div className="space-y-3">
              {pendingRequests.length > 0 ? (
                pendingRequests.slice(0, 3).map(req => (
                  <div key={req.id} className="flex justify-between items-center p-3 border rounded-lg bg-red-50">
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
                <div className="text-center text-slate-500 py-4">No pending requests.</div>
              )}
              {pendingRequests.length > 3 && (
                <p className="text-sm text-center pt-2 text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/reservations')}>
                    View All {pendingRequests.length} Requests →
                </p>
              )}
            </div>
        </div>

        {/* My Classes List */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><BookOpen size={20}/> My Classes</h3>
          <div className="space-y-3">
            {classesTaught.map((cls, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <p className="font-medium text-sm text-slate-800">{cls.subject}</p>
                <div className="text-xs text-green-600 flex items-center gap-1"><Clock size={12}/> Active</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}