import React, { useState } from 'react';
import { useData } from '../context/DataContext';
export default function Ebooks() {
  const { ebooks } = useData();
  const [year, setYear] = useState(null);
  return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold">E-Books</h1>
        {!year ? (
            <div className="grid grid-cols-2 gap-4">{['1st','2nd','3rd','4th'].map(y=>(<button key={y} onClick={()=>setYear(y)} className="bg-white p-8 rounded border text-xl font-bold hover:border-blue-500">{y} Year</button>))}</div>
        ) : (
            <div>
                <button onClick={()=>setYear(null)} className="text-blue-600 underline mb-4">Back</button>
                <div className="grid grid-cols-3 gap-4">{ebooks.filter(b=>b.year===year).map(b=>(<div key={b.id} className="bg-white p-4 rounded border"><div className="h-32 bg-slate-200 rounded mb-2"></div><h3 className="font-bold">{b.title}</h3><div className="text-xs text-slate-500">{b.tags.join(', ')}</div></div>))}</div>
            </div>
        )}
    </div>
  );
}