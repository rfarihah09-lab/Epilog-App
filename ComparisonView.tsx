
import React from 'react';
import { JournalEntry } from '../types';

interface ComparisonViewProps {
  entries: [JournalEntry, JournalEntry];
  onClose: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ entries, onClose }) => {
  const [a, b] = entries;

  const MetricRow = ({ label, valA, valB }: { label: string, valA: number, valB: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
        <span>{label}</span>
        <span className={valB >= valA ? 'text-emerald-500' : 'text-rose-500'}>
          {valB > valA ? `+${valB - valA}% Improvement` : valB < valA ? `${valB - valA}% Decrease` : 'No Change'}
        </span>
      </div>
      <div className="h-4 bg-slate-100 rounded-full flex overflow-hidden">
        <div className="h-full bg-slate-300" style={{ width: `${valA}%` }} />
        <div className={`h-full ${valB >= valA ? 'bg-emerald-400' : 'bg-rose-400'}`} style={{ width: `${valB}%`, marginLeft: `-${Math.min(valA, valB)}%` }} />
      </div>
      <div className="flex justify-between text-sm font-medium">
        <span className="text-slate-400">{valA}%</span>
        <span className="text-slate-800">{valB}%</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-rose-100 flex justify-between items-center bg-white/50">
          <h2 className="text-2xl font-light">Skin <span className="text-rose-500 font-semibold">Progress Comparison</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-rose-50 rounded-full text-slate-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border-4 border-white">
                <img src={a.image} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">Baseline</p>
                <p className="text-lg font-medium text-slate-800">{new Date(a.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border-4 border-white">
                <img src={b.image} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Current</p>
                <p className="text-lg font-medium text-slate-800">{new Date(b.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-6 bg-slate-50/50">
            <MetricRow label="Overall Health Score" valA={a.analysis.overallScore} valB={b.analysis.overallScore} />
            <MetricRow label="Hydration Levels" valA={a.analysis.hydration} valB={b.analysis.hydration} />
            <MetricRow label="Skin Clarity" valA={a.analysis.clarity} valB={b.analysis.clarity} />
            <MetricRow label="Surface Texture" valA={a.analysis.texture} valB={b.analysis.texture} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
