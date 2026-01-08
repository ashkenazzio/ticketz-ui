import { useState } from 'react';
import { Scan, Flashlight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Scanner() {
  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);

  // Simulate scanning success
  const triggerScan = () => {
    setScanning(false);
    setSuccess(true);
    setTimeout(() => {
        setSuccess(false);
        setScanning(true);
    }, 2000);
  };

  return (
    <div className="bg-black h-screen w-screen overflow-hidden relative flex flex-col font-sans">
        
        {/* Camera Viewfinder Mock */}
        <div className="absolute inset-0 z-0">
             {/* Simulating camera feed with a blurred image or just dark gray */}
             <div className="w-full h-full bg-gray-900 relative">
                 <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 blur-sm" alt="Camera Feed" />
             </div>
        </div>

        {/* UI Overlay */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-6">
            
            {/* Header */}
            <div className="flex justify-between items-start">
                <Link to="/dashboard" className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex flex-col items-end">
                    <span className="text-white font-display uppercase tracking-wider text-sm bg-black/50 px-3 py-1 rounded-sm backdrop-blur-md border border-white/10">Electric Garden</span>
                    <span className="text-lime text-xs font-mono mt-1">Door 1 • General Admission</span>
                </div>
            </div>

            {/* Reticle Area */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64" onClick={triggerScan}>
                {/* Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-lime rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-lime rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-lime rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-lime rounded-br-sm"></div>
                
                {/* Scanning Line Animation */}
                {scanning && (
                    <div className="absolute left-0 right-0 h-0.5 bg-lime/80 shadow-[0_0_15px_rgba(187,223,50,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                )}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-8 pb-8">
                <button className="text-white opacity-70 hover:opacity-100 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <Flashlight className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-wider">Light</span>
                </button>
                <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm" onClick={triggerScan}>
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                </div>
                 <button className="text-white opacity-70 hover:opacity-100 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-wider">Manual</span>
                </button>
            </div>
        </div>

        {/* Success Overlay (Green Flash) */}
        {success && (
            <div className="absolute inset-0 z-50 bg-green-500/90 flex flex-col items-center justify-center animate-in fade-in duration-100">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="font-display text-5xl font-semibold uppercase text-white tracking-tighter">Valid Ticket</h1>
                <p className="text-white/90 text-xl font-medium mt-2">Alex Moran</p>
                <p className="text-white/80 font-mono mt-1 uppercase text-sm">General Admission</p>
            </div>
        )}

        <style>{`
            @keyframes scan {
                0% { top: 10%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 90%; opacity: 0; }
            }
        `}</style>
    </div>
  );
}
