
import React from 'react';
import { JournalEntry } from '../types';

interface JournalViewProps {
  history: JournalEntry[];
  onCompareSelect: (id: string) => void;
  selectedIds: (string | null)[];
  onViewDetails: (entry: JournalEntry) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ history, onCompareSelect, selectedIds, onViewDetails }) => {
  const selectedCount = selectedIds.filter(Boolean).length;

  if (history.length === 0) {
    return (
      <div className="text-center py-24 glass rounded-[3rem] border-2 border-dashed border-rose-200 animate-in fade-in zoom-in-95 duration-700 max-w-4xl mx-auto">
        <div className="text-rose-300 mb-6 bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-light text-slate-800">Your Skin History Starts Here</h3>
        <p className="text-slate-500 mt-2 max-w-xs mx-auto">Upload your first scan to begin tracking your dermatological transformation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-100 pb-8">
        <div>
          <h2 className="text-5xl font-light text-slate-800 tracking-tight">Personal <span className="text-rose-500 font-semibold">Archives</span></h2>
          <p className="text-slate-500 mt-2 text-lg">Select two scans to see your skin's evolution.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${selectedCount === 2 ? 'bg-emerald-500 text-white animate-bounce' : 'bg-rose-100 text-rose-600'}`}>
            {selectedCount === 2 ? 'Ready to Compare' : `${selectedCount}/2 Selected`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {history.map((entry) => {
          const isSelected = selectedIds.includes(entry.id);
          return (
            <div 
              key={entry.id} 
              className={`group glass rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${
                isSelected 
                  ? 'border-rose-500 ring-8 ring-rose-500/10 scale-[1.03] shadow-2xl' 
                  : 'border-transparent hover:border-rose-200 hover:shadow-xl bg-white/40'
              }`}
            >
              <div className="relative aspect-[4/5] cursor-pointer overflow-hidden" onClick={() => onCompareSelect(entry.id)}>
                <img src={entry.image} alt="Journal entry" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                
                {/* Visual Metadata Overlays */}
                <div className="absolute inset-x-0 top-0 p-5 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-600">
                      {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="bg-rose-500 px-4 py-1.5 rounded-full shadow-lg border border-rose-400">
                    <span className="text-xs font-black text-white">{entry.analysis.overallScore}</span>
                  </div>
                </div>

                {/* Primary Concern Badge (Quick Visual Cue) */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <p className="text-[9px] text-rose-300 font-black uppercase tracking-widest mb-0.5">Primary Concern</p>
                     <p className="text-white text-xs font-medium truncate">{entry.analysis.primaryConcern}</p>
                  </div>
                </div>

                {/* Selection State Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-rose-500/30 flex items-center justify-center backdrop-blur-[1px] animate-in fade-in zoom-in-75">
                    <div className="bg-white text-rose-500 p-5 rounded-full shadow-2xl scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Focus</span>
                  <span className="text-xs font-bold text-rose-500 px-3 py-1 bg-rose-50 rounded-lg max-w-[120px] truncate">{entry.analysis.primaryConcern}</span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewDetails(entry); }}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  >
                    Details
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onCompareSelect(entry.id); }}
                    className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-rose-500 border-rose-500 text-white shadow-rose-200 shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-rose-200'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JournalView;
