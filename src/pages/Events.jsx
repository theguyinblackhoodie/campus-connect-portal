import React from 'react';
import { useData } from '../context/DataContext';
export default function Events() {
  const { events } = useData();
  return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map(e=>(<div key={e.id} className="bg-white p-4 rounded border shadow-sm"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{e.type}</span><h3 className="font-bold mt-2">{e.title}</h3><p className="text-slate-500 text-sm">{e.date}</p><button className="mt-3 w-full border border-blue-900 text-blue-900 rounded py-1 hover:bg-blue-50">Register</button></div>))}
        </div>
    </div>
  );
}