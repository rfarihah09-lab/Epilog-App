
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 25,
    skinType: 'Normal',
    concerns: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-8 glass rounded-3xl shadow-xl border border-rose-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-light text-slate-800 mb-2">Welcome to <span className="text-rose-500 font-semibold">Epilog</span></h2>
      <p className="text-slate-500 mb-8 font-light">Create your clinical profile to begin analysis.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all outline-none"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
          <input
            type="number"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all outline-none"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Skin Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({...formData, skinType: type})}
                className={`py-2 px-4 rounded-lg text-sm transition-all ${
                  formData.skinType === type 
                    ? 'bg-rose-500 text-white shadow-lg' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-rose-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium shadow-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Initialize Experience
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
