import React, { useState } from 'react';
import { 
  Sun, 
  Lightbulb, 
  Sliders, 
  Layers, 
  Maximize, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';

interface TheoryModuleProps {
  onMarkExplored: () => void;
}

export const TheoryModule: React.FC<TheoryModuleProps> = ({
  onMarkExplored
}) => {
  // 3-Point Lighting interactive states
  const [keyLight, setKeyLight] = useState<boolean>(true);
  const [fillLight, setFillLight] = useState<boolean>(true);
  const [backLight, setBackLight] = useState<boolean>(true);

  // Aperture DoF slider (1 to 5, 1=f/1.4, 3=f/4, 5=f/16)
  const [apertureStep, setApertureStep] = useState<number>(1);

  const getApertureData = (step: number) => {
    switch (step) {
      case 1:
        return { fStop: 'f/1.4', dof: 'ตื้นมาก (Shallow DoF)', blur: 'blur-md', desc: 'ละลายฉากหลังอย่างนุ่มนวล เน้นตัวละครให้โดดเด่นตัดจากสภาพแวดล้อม' };
      case 2:
        return { fStop: 'f/2.8', dof: 'ตื้นปานกลาง (Cinematic Standard)', blur: 'blur-sm', desc: 'ระยะชัดลึกมาตรฐานภาพยนตร์ รักษารายละเอียดใบหน้าครบถ้วน' };
      case 3:
        return { fStop: 'f/5.6', dof: 'ปานกลาง (Balanced Focus)', blur: 'blur-[2px]', desc: 'ฉากหลังเริ่มมองเห็นรายละเอียดโครงสร้างและทัศนียภาพ' };
      case 4:
        return { fStop: 'f/8.0', dof: 'ลึก (Deep Focus)', blur: 'blur-[1px]', desc: 'เห็นรายละเอียดตัวละครและฉากหลังคมชัดเกือบทั้งหมด' };
      case 5:
      default:
        return { fStop: 'f/16', dof: 'ลึกสูงสุด (All in Focus)', blur: 'blur-0', desc: 'ทุกองค์ประกอบตั้งแต่หน้ากล้องจรดเส้นขอบฟ้าคมชัดชัดเจน (Deep Staging)' };
    }
  };

  const apertureInfo = getApertureData(apertureStep);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="pb-2">
        <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
          CINEMATOGRAPHY FUNDAMENTALS & CRAFT
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          ทฤษฎีเบื้องต้น: การจัดแสง, ความชัดลึก และมิติภาพยนตร์
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed font-sans">
          รากฐานสำคัญของงานภาพยนตร์ที่ควบคุมมิติ ความลึก และอารมณ์ของทุกช็อต
        </p>
      </div>

      {/* Section 1: 3-Point Lighting Studio Simulator */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
              <Sun className="w-4 h-4" />
              <span>LIGHTING SETUP 01</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              การจัดแสง 3 ทิศทางมาตรฐาน (3-Point Lighting Simulator)
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-sans">
              กดเปิด-ปิดสวิตช์ไฟแต่ละดวงเพื่อสังเกตบทบาทของ Key Light, Fill Light และ Back Light
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-pink-400 bg-pink-950/40 border border-pink-500/30 px-2.5 py-1 rounded-lg">
              โหมดสตูดิโอจำลองสด
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Visual Lighting Stage (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0a0a0f] border border-zinc-700 shadow-inner flex items-center justify-center select-none">
            {/* Stage Floor & Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

            {/* Back Light / Rim Light Flare in pink/rose */}
            {backLight && (
              <div className="absolute -top-10 inset-x-1/4 h-36 bg-gradient-to-b from-pink-300/40 via-purple-500/20 to-transparent blur-xl pointer-events-none transition-opacity duration-300" />
            )}

            {/* Key Light Glow from 45-deg Left in Crimson/Rose */}
            {keyLight && (
              <div className="absolute -left-10 top-1/4 w-72 h-72 bg-gradient-to-r from-rose-500/35 via-pink-400/20 to-transparent rounded-full blur-2xl pointer-events-none transition-opacity duration-300" />
            )}

            {/* Fill Light Glow from 45-deg Right in Purple/Violet */}
            {fillLight && (
              <div className="absolute -right-10 top-1/3 w-64 h-64 bg-gradient-to-l from-purple-500/30 via-pink-300/10 to-transparent rounded-full blur-2xl pointer-events-none transition-opacity duration-300" />
            )}

            {/* Simulated Actor Portrait Head */}
            <div className="relative z-10 w-32 flex flex-col items-center">
              <div 
                className={`relative w-28 h-36 rounded-full border border-zinc-700/60 transition-all duration-300 shadow-2xl flex items-center justify-center ${
                  keyLight && fillLight && backLight
                    ? 'bg-gradient-to-r from-rose-200 via-pink-300 to-purple-300 shadow-[0_0_35px_rgba(244,63,94,0.35)]'
                    : keyLight && !fillLight && !backLight
                    ? 'bg-gradient-to-r from-rose-400 via-zinc-700 to-zinc-950'
                    : !keyLight && fillLight && !backLight
                    ? 'bg-gradient-to-l from-purple-400 via-zinc-600 to-zinc-950'
                    : !keyLight && !fillLight && backLight
                    ? 'bg-zinc-950 shadow-[0_-5px_20px_rgba(236,72,153,0.7)] border-t-2 border-pink-300'
                    : keyLight && !fillLight && backLight
                    ? 'bg-gradient-to-r from-rose-400 to-zinc-950 shadow-[0_-5px_20px_rgba(236,72,153,0.7)]'
                    : !keyLight && !fillLight && !backLight
                    ? 'bg-zinc-950 border-zinc-900'
                    : 'bg-zinc-800'
                }`}
              >
                {/* Facial features */}
                <div className="w-16 flex items-center justify-between opacity-50">
                  <div className="w-2 h-2 rounded-full bg-zinc-950" />
                  <div className="w-2 h-2 rounded-full bg-zinc-950" />
                </div>
              </div>
              <div className="w-40 h-16 -mt-3 rounded-t-3xl bg-zinc-800 border-t border-zinc-700" />
            </div>

            {/* Light Sources Labels Overlay */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-rose-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${keyLight ? 'bg-rose-400' : 'bg-zinc-600'}`} />
              <span>KEY LIGHT: {keyLight ? 'ON (100%)' : 'OFF'}</span>
            </div>

            <div className="absolute top-3 right-3 text-[10px] font-mono text-purple-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${fillLight ? 'bg-purple-400' : 'bg-zinc-600'}`} />
              <span>FILL LIGHT: {fillLight ? 'ON (50%)' : 'OFF'}</span>
            </div>

            <div className="absolute bottom-3 inset-x-0 mx-auto w-fit text-[10px] font-mono text-pink-300 bg-black/70 px-2.5 py-0.5 rounded backdrop-blur-sm flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${backLight ? 'bg-pink-400' : 'bg-zinc-600'}`} />
              <span>BACK / RIM LIGHT: {backLight ? 'ON (แยกตัวละครจากฉาก)' : 'OFF'}</span>
            </div>
          </div>

          {/* Interactive Light Controls (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-3 font-sans">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              แผงควบคุมสวิตช์ไฟสตูดิโอ (Lighting Console)
            </span>

            {/* Toggle 1: Key Light */}
            <button
              onClick={() => {
                setKeyLight(!keyLight);
                onMarkExplored();
              }}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                keyLight
                  ? 'bg-rose-950/30 border-rose-500/50 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <div>
                <div className="font-semibold text-xs text-rose-400">1. ไฟหลัก (Key Light - 45° ซ้าย)</div>
                <div className="text-[11px] text-zinc-300">เป็นแหล่งกำเนิดแสงสว่างหลัก ให้เงาและทิศทางแสง</div>
              </div>
              <div className={`w-8 h-4 rounded-full transition-colors relative ${keyLight ? 'bg-gradient-to-r from-rose-500 to-pink-600' : 'bg-zinc-700'}`}>
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${keyLight ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Toggle 2: Fill Light */}
            <button
              onClick={() => {
                setFillLight(!fillLight);
                onMarkExplored();
              }}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                fillLight
                  ? 'bg-purple-950/30 border-purple-500/50 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <div>
                <div className="font-semibold text-xs text-purple-400">2. ไฟเสริมลบเงา (Fill Light - 45° ขวา)</div>
                <div className="text-[11px] text-zinc-300">ความสว่าง 50% ของ Key Light เพื่อเปิดเงาไม่ให้มืดทึบ</div>
              </div>
              <div className={`w-8 h-4 rounded-full transition-colors relative ${fillLight ? 'bg-purple-500' : 'bg-zinc-700'}`}>
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${fillLight ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Toggle 3: Back Light */}
            <button
              onClick={() => {
                setBackLight(!backLight);
                onMarkExplored();
              }}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                backLight
                  ? 'bg-pink-950/30 border-pink-400/50 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <div>
                <div className="font-semibold text-xs text-pink-300">3. ไฟส่องหลัง / ริมไลต์ (Back / Hair Light)</div>
                <div className="text-[11px] text-zinc-300">สร้างเส้นขอบแสงประกายบนเส้นผม เพื่อแยกตัวละครออกจากฉากหลัง</div>
              </div>
              <div className={`w-8 h-4 rounded-full transition-colors relative ${backLight ? 'bg-pink-500' : 'bg-zinc-700'}`}>
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${backLight ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Depth of Field & Aperture Slider */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>OPTICS & FOCUS</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            รูรับแสงและความชัดลึก (Aperture & Depth of Field - DoF)
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans">
            ปรับค่า f-stop เพื่อควบคุมระยะชัดลึกและสมาธิการมองของผู้ชม
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Frame with dynamic blur */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-700 shadow-inner">
            <img 
              src="/src/assets/images/cinematic_composition_rule_thirds_1792596378308.jpg" 
              alt="Depth of field demo" 
              className={`w-full h-full object-cover transition-all duration-300 ${apertureInfo.blur}`}
              referrerPolicy="no-referrer"
            />
            {/* Crisp focused foreground subject reticle in rose */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border-2 border-rose-400 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-1 rounded">
                  FOCUSED
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded text-xs font-mono text-pink-300">
              APERTURE: {apertureInfo.fStop} · {apertureInfo.dof}
            </div>
          </div>

          {/* Slider & Explanation */}
          <div className="lg:col-span-5 space-y-4 font-sans">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">ขนาดรูรับแสง (f-stop):</span>
                <span className="text-rose-400 font-bold text-base">{apertureInfo.fStop}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={apertureStep}
                onChange={(e) => {
                  setApertureStep(Number(e.target.value));
                  onMarkExplored();
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>f/1.4 (ละลายหลัง)</span>
                <span>f/4.0</span>
                <span>f/16 (ชัดทั้งภาพ)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs text-zinc-300">
              <div className="font-semibold text-white">ผลลัพธ์ทางภาพยนตร์:</div>
              <p className="leading-relaxed">{apertureInfo.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
