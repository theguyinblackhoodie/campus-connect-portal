import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ShoppingCart, X, Plus, Filter, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Reservations() {
  const { inventory, addToCart, cart, removeFromCart, completeBooking, currentUser } = useData();
  const navigate = useNavigate();
  const [category, setCategory] = useState('library');
  const [subCategory, setSubCategory] = useState('books');

  const isStudent = currentUser?.role === 'student';
  const isApprover = currentUser?.role === 'faculty' || currentUser?.role === 'hod' || currentUser?.role === 'admin';

  // Logic to change category and reset sub-category automatically
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    // Set default sub-category based on main category
    if(cat === 'library') setSubCategory('books');
    else if(cat === 'lab') setSubCategory('mechanics');
    else if(cat === 'canteen') setSubCategory('food');
    else setSubCategory('gear');
  };

  // Safe Access: Ensure the current data is available
  const currentItems = inventory?.[category]?.[subCategory] || [];

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Resource Booking</h1>
          <p className="text-slate-500 mt-1">{isApprover ? 'Manage pending student requests.' : 'Book lab equipment, library resources, or order food.'}</p>
        </div>
        {isApprover && (
          <button onClick={() => navigate('/dashboard')} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-red-600 transition">
             View Approval Queue
          </button>
        )}
      </div>

      {/* 1. Main Categories (Big Buttons) */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b">
        {Object.keys(inventory).map(cat => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)} 
            className={`px-5 py-2 rounded-t-lg font-medium capitalize transition-all whitespace-nowrap ${
              category === cat 
              ? 'bg-blue-900 text-white border-b-4 border-orange-500' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Sub Categories (Pills) */}
      <div className="flex gap-2 overflow-x-auto">
        {inventory?.[category] && Object.keys(inventory[category]).map(sub => (
          <button 
            key={sub} 
            onClick={() => setSubCategory(sub)} 
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize border transition-all ${
              subCategory === sub 
              ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-100' 
              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 3. Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
            
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-1">{item.name}</h3>
            
            <div className="mt-1 text-sm font-medium">
              {item.price ? (
                <span className="text-lg font-bold text-green-600">₹{item.price}</span>
              ) : (
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${item.stock > 0 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                  {item.stock > 0 ? `${item.stock} In Stock` : 'Out of Stock'}
                </span>
              )}
            </div>
            
            {isStudent ? (
              <button 
                onClick={() => addToCart(item, category)} 
                disabled={!item.price && item.stock === 0}
                className={`mt-5 w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  !item.price && item.stock === 0 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}
              >
                <Plus size={18} className="inline mr-1"/> {item.price ? 'Add to Cart' : 'Request Now'}
              </button>
            ) : (
              <div className="mt-5 w-full py-2.5 rounded-xl border border-orange-300 bg-orange-50 text-orange-700 text-sm font-bold flex items-center justify-center gap-2">
                <Users size={16}/> Manager View
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. Cart Fixed Bottom Bar (Only for Students) */}
      {isStudent && cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl z-50 border border-slate-700 animate-slide-up">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg text-black"><ShoppingCart size={20}/></div>
              <div>
                <p className="font-bold text-sm">{cart.length} Items Selected</p>
                <p className="text-xs text-slate-400">Total: ₹{cart.reduce((sum, i) => sum + (i.price || 0), 0)}</p>
              </div>
            </div>
            <button onClick={() => { if(completeBooking()) alert("Request Sent!"); }} className="bg-white text-slate-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition">
              Confirm Request
            </button>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-2 custom-scrollbar pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs bg-white/10 p-2 rounded">
                <span>{item.icon} {item.name}</span>
                <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-300"><X size={14}/></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}