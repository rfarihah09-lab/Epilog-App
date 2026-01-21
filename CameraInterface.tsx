
import React, { useRef, useState } from 'react';

interface CameraInterfaceProps {
  onCapture: (imageData: string) => void;
}

const CameraInterface: React.FC<CameraInterfaceProps> = ({ onCapture }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onCapture(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 glass rounded-3xl border border-rose-100 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-light text-slate-800">Dermatological Capture</h3>
        <p className="text-slate-500 text-sm mt-2">Upload a high-resolution selfie for precise AI analysis.</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all ${
          dragActive ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 bg-white/50 hover:border-rose-400 hover:bg-rose-50/20'
        }`}
      >
        <div className="p-6 bg-rose-100 rounded-full mb-4 text-rose-500 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">Click or Drag to Upload Image</p>
        <p className="text-slate-400 text-xs mt-2">Supports JPG, PNG (Max 10MB)</p>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          capture="user"
          className="hidden" 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default CameraInterface;
