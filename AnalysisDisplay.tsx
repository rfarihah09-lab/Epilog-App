
import React from 'react';
import { SkinAnalysis } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisDisplayProps {
  analysis: SkinAnalysis;
  image: string;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, image }) => {
  const chartData = [
    { name: 'Hydration', value: analysis.hydration },
    { name: 'Clarity', value: analysis.clarity },
    { name: 'Texture', value: analysis.texture },
    { name: 'Tone', value: analysis.tone },
  ];

  const COLORS = ['#fb7185', '#fda4af', '#f43f5e', '#e11d48'];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Analysis Overview */}
        <div className="glass rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light text-slate-800">Analysis <span className="text-rose-500 font-semibold">Report</span></h2>
              <p className="text-slate-500 text-sm">Automated Dermatological Intelligence</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-rose-500 flex flex-col items-center justify-center bg-rose-50">
              <span className="text-2xl font-bold text-rose-600">{analysis.overallScore}</span>
              <span className="text-[10px] text-rose-400 uppercase tracking-widest font-bold">Health</span>
            </div>
          </div>

          <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '12px', fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#fff1f2' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Clinical Observations</h4>
            <ul className="space-y-3">
              {analysis.observations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  {obs}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Capture Display */}
        <div className="glass rounded-3xl p-4 shadow-sm h-full flex flex-col">
          <div className="relative rounded-2xl overflow-hidden aspect-square border-8 border-white shadow-inner">
            <img src={image} alt="Skin Capture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Primary Focus</p>
                <h4 className="text-xl font-light">{analysis.primaryConcern}</h4>
              </div>
            </div>
          </div>
          <div className="mt-6 p-6 bg-slate-900 rounded-2xl text-white">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Diagnostic Summary</p>
            <p className="italic text-slate-300 text-sm">"The analysis identifies {analysis.primaryConcern.toLowerCase()} as the focal point for improvement. A specialized routine focusing on {analysis.texture < 70 ? 'exfoliation' : 'barrier repair'} is advised."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
