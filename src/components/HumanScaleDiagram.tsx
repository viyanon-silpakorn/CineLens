import React, { useState } from 'react';
import { SHOT_SIZES, ShotSizeItem } from '../data/cinemaData';
import { Eye, Info, AlertTriangle, CheckCircle, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface HumanScaleDiagramProps {
  selectedShotId: string;
  onSelectShot: (shotId: string) => void;
}

export const HumanScaleDiagram: React.FC<HumanScaleDiagramProps> = ({
  selectedShotId,
  onSelectShot
}) => {
  const currentShot = SHOT_SIZES.find(s => s.id === selectedShotId) || SHOT_SIZES[2]; // default MS

  // Define cut lines relative to human height (top = 0% of figure, bottom = 100% of figure)
  const cutLines = [
    { id: 'ecu', label: 'ECU (ใกล้สุดขีด)', cutDesc: 'ดวงตา / ริมฝีปาก', yPercent: 12, color: '#ec4899', isJoint: false },
    { id: 'cu', label: 'CU (ระยะใกล้)', cutDesc: 'ใต้คาง / ลำคอส่วนบน', yPercent: 20, color: '#f43f5e', isJoint: false },
    { id: 'mcu', label: 'MCU (ใกล้ปานกลาง)', cutDesc: 'ระดับกลางหน้าอก', yPercent: 33, color: '#fb7185', isJoint: false },
    { id: 'ms', label: 'MS (ระยะปานกลาง)', cutDesc: 'ระดับเอว (Waist)', yPercent: 50, color: '#c084fc', isJoint: false },
    { id: 'ls', label: 'LS (เต็มตัว)', cutDesc: 'ใต้ฝ่าเท้าจรดเหนือศีรษะ', yPercent: 96, color: '#a855f7', isJoint: false },
    { id: 'els', label: 'ELS (ไกลสุดขีด)', cutDesc: 'สัดส่วนตัวคน < 10% ของฉาก', yPercent: 100, color: '#7c3aed', isJoint: false },
  ];

  // Danger cut points (Joints that should NOT be cut)
  const dangerJoints = [
    { label: 'ลำคอ (Neck)', yPercent: 17, tip: 'ศีรษะจะดูลอยเคว้ง' },
    { label: 'ข้อศอก (Elbows)', yPercent: 42, tip: 'แขนดูขาดด้วน' },
    { label: 'ข้อมือ (Wrists)', yPercent: 58, tip: 'มือดูเหมือนถูกตัด' },
    { label: 'หัวเข่า (Knees)', yPercent: 72, tip: 'ช่วงขาลีบแบนผิดส่วน' },
    { label: 'ข้อเท้า (Ankles)', yPercent: 92, tip: 'คนดูลอย ไม่ติดพื้น' },
  ];

  const [showDangerJoints, setShowDangerJoints] = useState<boolean>(true);

  // Dynamic zoom calculation for camera viewfinder preview
  const getCameraTransform = (shotId: string) => {
    switch (shotId) {
      case 'ecu':
        return { scale: 4.8, translateY: '35%', translateX: '0%' };
      case 'cu':
        return { scale: 3.2, translateY: '27%', translateX: '0%' };
      case 'mcu':
        return { scale: 2.1, translateY: '18%', translateX: '0%' };
      case 'ms':
        return { scale: 1.5, translateY: '8%', translateX: '0%' };
      case 'ls':
        return { scale: 1.05, translateY: '0%', translateX: '0%' };
      case 'els':
      default:
        return { scale: 0.65, translateY: '-5%', translateX: '0%' };
    }
  };

  const transform = getCameraTransform(selectedShotId);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
            HUMAN ANATOMY FRAMING GUIDE
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            ผังเปรียบเทียบสเกลบนสัดส่วนร่างกายมนุษย์
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            คลิกที่เส้นระดับหรือเลือกขนาดภาพเพื่อดูการครอปตัดช่องมองภาพสดแบบไดนามิก
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDangerJoints(!showDangerJoints)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
              showDangerJoints
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>{showDangerJoints ? 'ซ่อนจุดห้ามตัดที่ข้อต่อ' : 'แสดงจุดห้ามตัดที่ข้อต่อ'}</span>
          </button>
        </div>
      </div>

      {/* Main Split: Human Anatomy Scale (Left) + Real-time Cinema Viewfinder (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Human Silhouette Diagram with Interactive Cut Lines (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              เส้นกำหนดระนาบการตัดภาพ (Framing Cutoffs)
            </span>
            <span className="text-xs text-pink-400 font-mono">
              กำลังดู: {currentShot.code} ({currentShot.nameTh})
            </span>
          </div>

          <div className="relative h-[480px] w-full flex items-center justify-center select-none overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900/40 via-zinc-950/70 to-zinc-900/40">
            {/* Background grid lines in subtle purple-rose tint */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Human Body SVG Silhouette */}
            <div className="relative h-[420px] w-[140px] flex items-center justify-center">
              <svg 
                viewBox="0 0 100 240" 
                className="h-full w-auto text-zinc-600 transition-colors duration-300 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                fill="currentColor"
              >
                {/* Stylized Human Anatomy Silhouette */}
                {/* Head */}
                <ellipse cx="50" cy="24" rx="14" ry="17" className="fill-zinc-400" />
                {/* Neck */}
                <path d="M46 40 L54 40 L55 48 L45 48 Z" className="fill-zinc-500" />
                {/* Torso & Shoulders */}
                <path d="M28 48 C32 45, 68 45, 72 48 L76 75 L70 120 L30 120 L24 75 Z" className="fill-zinc-400" />
                {/* Arms */}
                <path d="M26 48 L18 85 L14 125 L21 126 L26 88 L30 52 Z" className="fill-zinc-500" />
                <path d="M74 48 L82 85 L86 125 L79 126 L74 88 L70 52 Z" className="fill-zinc-500" />
                {/* Hands */}
                <ellipse cx="17" cy="132" rx="4" ry="7" className="fill-zinc-500" />
                <ellipse cx="83" cy="132" rx="4" ry="7" className="fill-zinc-500" />
                {/* Pelvis & Hips */}
                <path d="M30 120 L70 120 L66 142 L34 142 Z" className="fill-zinc-400" />
                {/* Legs */}
                <path d="M34 142 L48 142 L46 195 L34 195 Z" className="fill-zinc-400" />
                <path d="M52 142 L66 142 L66 195 L54 195 Z" className="fill-zinc-400" />
                {/* Calves & Feet */}
                <path d="M34 195 L46 195 L43 234 L32 234 Z" className="fill-zinc-400" />
                <path d="M54 195 L66 195 L68 234 L57 234 Z" className="fill-zinc-400" />
                {/* Shoes */}
                <path d="M30 234 L45 234 L47 240 L28 240 Z" className="fill-zinc-500" />
                <path d="M55 234 L70 234 L72 240 L53 240 Z" className="fill-zinc-500" />
              </svg>

              {/* Dangerous Joint Cut Warnings */}
              {showDangerJoints && dangerJoints.map((joint, idx) => (
                <div
                  key={idx}
                  className="absolute left-0 right-0 pointer-events-none flex items-center justify-between"
                  style={{ top: `${joint.yPercent}%` }}
                >
                  <div className="w-8 h-[1px] bg-red-500/70" />
                  <span className="text-[9px] font-mono font-medium text-red-300 bg-red-950/90 border border-red-500/30 px-1 py-0.5 rounded shadow">
                    ✕ เลี่ยงตัดที่{joint.label}
                  </span>
                  <div className="w-8 h-[1px] bg-red-500/70" />
                </div>
              ))}
            </div>

            {/* Interactive Cutoff Lines Overlay across diagram */}
            <div className="absolute inset-0 pointer-events-auto">
              {cutLines.map((line) => {
                const isSelected = selectedShotId === line.id;
                return (
                  <button
                    key={line.id}
                    onClick={() => onSelectShot(line.id)}
                    className={`group absolute left-2 right-2 flex items-center justify-between py-1 transition-all -translate-y-1/2 ${
                      isSelected ? 'z-20' : 'z-10 hover:z-20'
                    }`}
                    style={{ top: `${line.yPercent}%` }}
                  >
                    {/* Left Tag Button */}
                    <div 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all shadow-md ${
                        isSelected 
                          ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white scale-105 ring-2 ring-pink-400' 
                          : 'bg-zinc-900/95 text-zinc-300 border border-zinc-700 hover:border-pink-500 hover:text-white'
                      }`}
                    >
                      <span>{line.label}</span>
                    </div>

                    {/* Connecting Line */}
                    <div 
                      className={`flex-1 mx-3 h-[2px] transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' 
                          : 'bg-zinc-700/80 group-hover:bg-rose-500/50'
                      }`} 
                    />

                    {/* Right Anatomical Description */}
                    <div 
                      className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all hidden sm:block ${
                        isSelected 
                          ? 'text-pink-300 bg-pink-950/80 border border-pink-500/30' 
                          : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    >
                      {line.cutDesc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Golden Rule Tip Footer */}
          <div className="mt-4 p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200/90 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-rose-300">กฎทองการตัดกรอบภาพ (Cinematography Joint Rule):</span>
              {' '}ห้ามตัดขอบภาพคร่อมรอยต่อข้อต่อ (Joints) เช่น ข้อศอก หัวเข่า ข้อเท้า หรือคอ เพราะจะทำให้สัดส่วนร่างกายดูพิการ ให้ตัด "เหนือ" หรือ "ใต้" ข้อต่อเสมอ
            </div>
          </div>
        </div>

        {/* Right: Live Viewfinder Camera Simulation (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>VIEWFINDER MONITOR (2.39:1)</span>
              </span>
              <span className="text-xs font-mono text-pink-400">
                {currentShot.recommendedLens}
              </span>
            </div>

            {/* Camera Viewfinder Screen */}
            <div className="relative aspect-[16/9] w-full bg-black rounded-lg overflow-hidden border border-zinc-700 shadow-inner group">
              {/* Scalable Cinematic Scene Subject */}
              <div 
                className="w-full h-full transition-transform duration-500 ease-out origin-center"
                style={{
                  transform: `scale(${transform.scale}) translateY(${transform.translateY}) translateX(${transform.translateX})`
                }}
              >
                <img 
                  src={currentShot.image} 
                  alt={currentShot.nameTh}
                  className="w-full h-full object-cover object-center filter contrast-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Viewfinder HUD Overlays */}
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                {/* Top HUD */}
                <div className="flex items-center justify-between text-[10px] font-mono text-rose-400/90">
                  <div className="flex items-center gap-2 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    <span className="text-red-400 font-bold">● REC</span>
                    <span>24.00 FPS</span>
                  </div>
                  <div className="bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm text-pink-300">
                    <span>{currentShot.code} FRAME</span>
                  </div>
                </div>

                {/* Center Crosshairs & Rule of Thirds subtle lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border border-pink-500/40 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                  </div>
                  {/* Subtle 3x3 Grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                    <div className="border-r border-b border-pink-400" />
                    <div className="border-r border-b border-pink-400" />
                    <div className="border-b border-pink-400" />
                    <div className="border-r border-b border-pink-400" />
                    <div className="border-r border-b border-pink-400" />
                    <div className="border-b border-pink-400" />
                    <div className="border-r border-b border-pink-400" />
                    <div className="border-r border-b border-pink-400" />
                    <div />
                  </div>
                </div>

                {/* Bottom HUD */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <div className="bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm text-pink-300">
                    <span>ISO 800 · 1/48s · f/2.8</span>
                  </div>
                  <div className="bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm text-purple-300">
                    <span>5600K RAW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shot Selection Tabs */}
          <div className="mt-4 space-y-3">
            <div className="text-[11px] font-mono text-zinc-400">เลือกระยะภาพเพื่อจำลอง:</div>
            <div className="grid grid-cols-6 gap-1.5">
              {SHOT_SIZES.map((shot) => {
                const isSelected = selectedShotId === shot.id;
                return (
                  <button
                    key={shot.id}
                    onClick={() => onSelectShot(shot.id)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/30 ring-1 ring-pink-400'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {shot.code}
                  </button>
                );
              })}
            </div>

            {/* Current Shot Context Badge */}
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs space-y-1">
              <div className="font-semibold text-white flex items-center justify-between">
                <span>{currentShot.nameTh} ({currentShot.nameEn})</span>
                <span className="font-mono text-pink-400 text-[11px]">{currentShot.code}</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {currentShot.summary}
              </p>
              <div className="text-[10px] font-mono text-rose-300/90 pt-1">
                จุดตัดบนร่างกาย: {currentShot.humanCutPoint}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
