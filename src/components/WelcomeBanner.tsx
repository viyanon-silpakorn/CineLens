import React from 'react';
import { ActiveTab } from './Sidebar';
import { CINEMA_ASSETS, PUBLIC_FALLBACK_IMAGES } from '../assets/images';
import { CinematicImage } from './CinematicImage';
import { 
  Play, 
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Sliders,
  ChevronRight,
  RotateCcw,
  Camera,
  Info
} from 'lucide-react';

interface WelcomeBannerProps {
  setActiveTab: (tab: ActiveTab) => void;
  overallProgress: number;
  completedSections: Record<string, boolean>;
  onResetProgress: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  setActiveTab,
  overallProgress,
  completedSections,
  onResetProgress
}) => {
  const getRank = (progress: number) => {
    if (progress >= 100) return { title: 'ผู้กำกับภาพมืออาชีพ (Director of Photography)', level: 'Master' };
    if (progress >= 70) return { title: 'ผู้ควบคุมกล้องอาวุโส (Senior Camera Operator)', level: 'Senior' };
    if (progress >= 40) return { title: 'ผู้ช่วยตากล้อง (1st Assistant Camera)', level: 'Skilled' };
    return { title: 'ผู้ช่วยฝึกหัดสตูดิโอ (Clapper Loader Apprentice)', level: 'Junior' };
  };

  const rank = getRank(overallProgress);

  return (
    <div className="space-y-6">
      {/* Studio Front Cover Hero Card with Cinema Camera */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#16161d] shadow-2xl">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121217] via-[#16161d] to-[#121217]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Responsive Layout: Text & CTA (Left) + Cinema Camera Cover (Right) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 lg:p-10">
          {/* Left Column: Text & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Studio Clapper Kicker */}
            <div className="flex items-center gap-2.5 text-xs text-rose-400 font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/80 animate-pulse" />
              <span>CINEMATIC MULTIMEDIA LEARNING LAB</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">SILPAKORN UNIVERSITY</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              ยินดีต้อนรับสู่ <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">CineLens Interactive</span>
            </h1>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
              ศูนย์การเรียนรู้เชิงปฏิสัมพันธ์ด้านศาสตร์แห่งภาพยนตร์ ถอดรหัสภาษาภาพ การจัดขนาดภาพ 6 ระยะหลัก (ELS ถึง ECU) ผังสัดส่วนสรีระมนุษย์ กฎองค์ประกอบภาพระดับมาสเตอร์ และห้องปฏิบัติการมุมกล้องเสมือนจริง
            </p>

            {/* Camera Spec Micro-Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 text-[11px] font-mono text-zinc-400">
              <span className="bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 text-rose-300">
                ARRI ALEXA 35 READY
              </span>
              <span className="bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 text-pink-300">
                MASTER ANAMORPHIC 40MM
              </span>
              <span className="bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 text-purple-300">
                2.39:1 CINEMASCOPE
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setActiveTab('shot-library')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-600/25 flex items-center gap-2"
              >
                <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                <span>เริ่มสำรวจคลังระยะภาพ (ELS-ECU)</span>
              </button>
              <button
                onClick={() => setActiveTab('angles-movement')}
                className="px-5 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-750 text-zinc-200 font-medium text-sm border border-zinc-700/80 transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-pink-400" />
                <span>เข้าห้องแล็บมุมกล้อง & การเคลื่อนไหว</span>
              </button>
            </div>
          </div>

          {/* Right Column: Cinema Camera Cover Showcase (5 cols) */}
          <div className="lg:col-span-5 relative group select-none">
            <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-zinc-700/80 shadow-2xl ring-1 ring-rose-500/20">
              {/* Cinema Camera Cover Photo */}
              <CinematicImage 
                src={CINEMA_ASSETS.coverCamera} 
                fallbackSrc={PUBLIC_FALLBACK_IMAGES.coverCamera}
                alt="ARRI Cinema Camera Studio Rig" 
                aspectRatioClass="aspect-[16/9] lg:aspect-[4/3]"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
              />

              {/* Viewfinder Scrim & Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top Camera Status HUD */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                <span className="bg-black/80 backdrop-blur-sm text-red-400 px-2 py-0.5 rounded font-bold flex items-center gap-1.5 border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>● TALLY ON</span>
                </span>
                <span className="bg-black/80 backdrop-blur-sm text-zinc-300 px-2 py-0.5 rounded border border-zinc-800">
                  PRODUCTION RIG
                </span>
              </div>

              {/* Bottom Camera Metadata */}
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-zinc-200 pointer-events-none">
                <div className="bg-black/85 backdrop-blur-md p-2.5 rounded-xl border border-zinc-800/80 space-y-0.5">
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>ARRI ALEXA 35 CINEMA RIG</span>
                    <span className="text-rose-400 text-[10px]">T1.9 · 40MM</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate">
                    อุปกรณ์กล้องภาพยนตร์ระดับสตูดิโอพร้อม Matte Box & Follow Focus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Learning Progress Deck */}
      <div className="rounded-2xl border border-zinc-800 bg-[#16161d] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
              แถบติดตามความก้าวหน้าการเรียนรู้แบบโต้ตอบ
            </div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-lg font-bold text-white tracking-tight">
                สถานะของคุณ: <span className="text-pink-400 font-semibold">{rank.title}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-rose-400 tabular-nums">
                {overallProgress}%
              </div>
              <div className="text-[11px] text-zinc-400">ความสำเร็จในหลักสูตร</div>
            </div>

            <button
              onClick={onResetProgress}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
              title="รีเซ็ตความก้าวหน้าเพื่อฝึกฝนใหม่"
              aria-label="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="py-5">
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-700/60">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full transition-all duration-700 shadow-sm shadow-rose-500/50"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Milestone markers */}
          <div className="grid grid-cols-4 gap-2 pt-3 text-[11px] font-mono text-zinc-400">
            <div className={`flex items-center gap-1.5 ${overallProgress >= 25 ? 'text-rose-400 font-semibold' : ''}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${overallProgress >= 25 ? 'text-rose-400' : 'text-zinc-600'}`} />
              <span>1. ทฤษฎี</span>
            </div>
            <div className={`flex items-center gap-1.5 ${overallProgress >= 50 ? 'text-pink-400 font-semibold' : ''}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${overallProgress >= 50 ? 'text-pink-400' : 'text-zinc-600'}`} />
              <span>2. ขนาดภาพ ELS-ECU</span>
            </div>
            <div className={`flex items-center gap-1.5 ${overallProgress >= 75 ? 'text-purple-400 font-semibold' : ''}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${overallProgress >= 75 ? 'text-purple-400' : 'text-zinc-600'}`} />
              <span>3. องค์ประกอบภาพ</span>
            </div>
            <div className={`flex items-center gap-1.5 ${overallProgress >= 100 ? 'text-rose-400 font-semibold' : ''}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${overallProgress >= 100 ? 'text-rose-400' : 'text-zinc-600'}`} />
              <span>4. แบบทดสอบผ่านเกณฑ์</span>
            </div>
          </div>
        </div>

        {/* 4 Quick Module Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => setActiveTab('theory')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              completedSections.theory 
                ? 'bg-rose-950/20 border-rose-500/40 text-zinc-200' 
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white">1. ทฤษฎีเบื้องต้น</span>
              {completedSections.theory ? (
                <span className="text-[10px] font-mono text-rose-400">สำรวจแล้ว</span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-500">รอสำรวจ</span>
              )}
            </div>
            <p className="text-[12px] text-zinc-400 line-clamp-1">
              ระบบไฟ 3 จุด & รูรับแสง DoF
            </p>
          </button>

          <button
            onClick={() => setActiveTab('shot-library')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              completedSections.shots 
                ? 'bg-pink-950/20 border-pink-500/40 text-zinc-200' 
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white">2. คลังระยะภาพ (6 ระยะ)</span>
              {completedSections.shots ? (
                <span className="text-[10px] font-mono text-pink-400">สำรวจแล้ว</span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-500">รอสำรวจ</span>
              )}
            </div>
            <p className="text-[12px] text-zinc-400 line-clamp-1">
              ผังเปรียบเทียบสเกลสรีระร่างกาย
            </p>
          </button>

          <button
            onClick={() => setActiveTab('angles-movement')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              completedSections.angles 
                ? 'bg-purple-950/20 border-purple-500/40 text-zinc-200' 
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white">3. มุมกล้อง & การเคลื่อนไหว</span>
              {completedSections.angles ? (
                <span className="text-[10px] font-mono text-purple-400">สำรวจแล้ว</span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-500">รอสำรวจ</span>
              )}
            </div>
            <p className="text-[12px] text-zinc-400 line-clamp-1">
              Low/High/POV Angle & Rigs
            </p>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              completedSections.quiz 
                ? 'bg-rose-950/20 border-rose-500/40 text-zinc-200' 
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white">4. แบบทดสอบความรู้</span>
              {completedSections.quiz ? (
                <span className="text-[10px] font-mono text-rose-400">ผ่านแล้ว</span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-500">รอทำแบบทดสอบ</span>
              )}
            </div>
            <p className="text-[12px] text-zinc-400 line-clamp-1">
              วัดผลและรับเกียรติบัตรสตูดิโอ
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
