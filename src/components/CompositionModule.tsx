import React, { useState } from 'react';
import { COMPOSITION_PRINCIPLES } from '../data/cinemaData';
import { 
  Grid, 
  Move, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Sliders,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface CompositionModuleProps {
  onMarkExplored: () => void;
}

export const CompositionModule: React.FC<CompositionModuleProps> = ({
  onMarkExplored
}) => {
  // Rule of thirds state
  const [activeThirdPoint, setActiveThirdPoint] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'>('top-right');
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);

  // Headroom state (0 to 100, ideal is around 40-50)
  const [headroomValue, setHeadroomValue] = useState<number>(45);

  // Looking room state
  const [gazeDirection, setGazeDirection] = useState<'left' | 'right'>('left');
  const [leadRoomMode, setLeadRoomMode] = useState<'balanced' | 'cramped'>('balanced');

  // Evaluate Headroom
  const getHeadroomAnalysis = (val: number) => {
    if (val < 30) {
      return {
        status: 'danger',
        label: 'ตัดขอบชิดศีรษะเกินไป (Head Cutoff / Too Tight)',
        desc: 'ขอบบนของภาพตัดเฉือนกะโหลกศีรษะหรือชิดกระหม่อมจนไม่มีพื้นที่หายใจ ทำให้รู้สึกอึดอัดคับแคบ (เว้นแต่จะเป็นระยะ CU/ECU โดยเจตนา)',
        color: 'text-red-400 bg-red-950/40 border-red-500/40'
      };
    }
    if (val > 65) {
      return {
        status: 'warning',
        label: 'พื้นที่ว่างบนเพดานมากเกินไป (Excessive Headroom)',
        desc: 'ปล่อยให้มีเพดานว่างมากเกินไป ตัวละครจมลงไปอยู่ที่ก้นเฟรม ทำให้ภาพดูหนักด้านล่างและผู้แสดงดูไร้น้ำหนัก',
        color: 'text-purple-400 bg-purple-950/40 border-purple-500/40'
      };
    }
    return {
      status: 'success',
      label: 'ระยะขอบบนศีรษะสมบูรณ์แบบ (Ideal Cinematic Headroom)',
      desc: 'เว้นระยะห่างระหว่างกระหม่อมกับขอบบนภาพประมาณ 10-15% สัดส่วนลงตัว ระดับสายตาพาดผ่านเส้น 1 ใน 3 ด้านบนอย่างงดงาม',
      color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
    };
  };

  const headroomAnalysis = getHeadroomAnalysis(headroomValue);

  return (
    <div className="space-y-8">
      {/* Module Title Kicker */}
      <div className="pb-2">
        <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
          SPECIAL MASTERCLASS ON COMPOSITION
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          หลักการจัดองค์ประกอบภาพในภาพยนตร์ (Composition Principles)
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed font-sans">
          องค์ประกอบภาพคือศิลปะแห่งการจัดวางพื้นที่ว่าง เส้นสาย และน้ำหนักสายตา เพื่อส่งผ่านสารทางอารมณ์และเรื่องราวไปยังผู้ชมอย่างทรงพลัง
        </p>
      </div>

      {/* Principle 1: กฎสามส่วน (Rule of Thirds) Interactive Sandbox */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
              <Grid className="w-4 h-4" />
              <span>PRINCIPLE 01</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              กฎสามส่วน (Rule of Thirds) & จุดตัด 9 ช่อง
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl font-sans">
              การวางจุดสำคัญไว้บน 4 จุดตัดทองคำ (Power Points) ดึงดูดสายตาและสร้างสมดุลทางพลวัตได้ดีกว่าการวางตรงกลาง
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowGridOverlay(!showGridOverlay);
                onMarkExplored();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                showGridOverlay
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold border-rose-400 shadow-sm'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{showGridOverlay ? 'ซ่อนเส้นกริด 3x3' : 'แสดงเส้นกริด 3x3'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Visual Canvas (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-700 shadow-inner group select-none">
            <img
              src="/src/assets/images/cinematic_composition_rule_thirds_1792596378308.jpg"
              alt="Rule of thirds demonstration"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Viewfinder Scrim */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Rule of Thirds 3x3 Grid Overlay in Rose/Purple */}
            {showGridOverlay && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                {/* Row 1 */}
                <div className="border-r border-b border-rose-500/60" />
                <div className="border-r border-b border-rose-500/60" />
                <div className="border-b border-rose-500/60" />
                {/* Row 2 */}
                <div className="border-r border-b border-rose-500/60" />
                <div className="border-r border-b border-rose-500/60" />
                <div className="border-b border-rose-500/60" />
                {/* Row 3 */}
                <div className="border-r border-b border-rose-500/60" />
                <div className="border-r border-b border-rose-500/60" />
                <div />
              </div>
            )}

            {/* Interactive 4 Power Points + Center */}
            <div className="absolute inset-0 pointer-events-auto">
              {/* Point 1: Top-Left (33%, 33%) */}
              <button
                onClick={() => {
                  setActiveThirdPoint('top-left');
                  onMarkExplored();
                }}
                className={`absolute top-[33.33%] left-[33.33%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform ${
                  activeThirdPoint === 'top-left' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                title="จุดตัดบนซ้าย (Top-Left Power Point)"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  activeThirdPoint === 'top-left' 
                    ? 'bg-rose-500 ring-4 ring-rose-400/50 shadow-lg shadow-rose-500/80' 
                    : 'bg-white/70 hover:bg-rose-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                </div>
              </button>

              {/* Point 2: Top-Right (66.66%, 33%) */}
              <button
                onClick={() => {
                  setActiveThirdPoint('top-right');
                  onMarkExplored();
                }}
                className={`absolute top-[33.33%] left-[66.66%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform ${
                  activeThirdPoint === 'top-right' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                title="จุดตัดบนขวา (Top-Right Power Point - สายตาตัวละคร)"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  activeThirdPoint === 'top-right' 
                    ? 'bg-rose-500 ring-4 ring-rose-400/50 shadow-lg shadow-rose-500/80' 
                    : 'bg-white/70 hover:bg-rose-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                </div>
              </button>

              {/* Point 3: Bottom-Left (33%, 66.66%) */}
              <button
                onClick={() => {
                  setActiveThirdPoint('bottom-left');
                  onMarkExplored();
                }}
                className={`absolute top-[66.66%] left-[33.33%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform ${
                  activeThirdPoint === 'bottom-left' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                title="จุดตัดล่างซ้าย (Bottom-Left Power Point)"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  activeThirdPoint === 'bottom-left' 
                    ? 'bg-rose-500 ring-4 ring-rose-400/50 shadow-lg shadow-rose-500/80' 
                    : 'bg-white/70 hover:bg-rose-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                </div>
              </button>

              {/* Point 4: Bottom-Right (66.66%, 66.66%) */}
              <button
                onClick={() => {
                  setActiveThirdPoint('bottom-right');
                  onMarkExplored();
                }}
                className={`absolute top-[66.66%] left-[66.66%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform ${
                  activeThirdPoint === 'bottom-right' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                title="จุดตัดล่างขวา (Bottom-Right Power Point)"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  activeThirdPoint === 'bottom-right' 
                    ? 'bg-rose-500 ring-4 ring-rose-400/50 shadow-lg shadow-rose-500/80' 
                    : 'bg-white/70 hover:bg-rose-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                </div>
              </button>

              {/* Dead Center Point */}
              <button
                onClick={() => {
                  setActiveThirdPoint('center');
                  onMarkExplored();
                }}
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform ${
                  activeThirdPoint === 'center' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                title="จุดกึ่งกลางภาพ (Dead Center)"
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  activeThirdPoint === 'center' 
                    ? 'bg-purple-400 ring-4 ring-purple-500/40' 
                    : 'bg-zinc-500/50 hover:bg-zinc-400'
                }`}>
                  <span className="w-1 h-1 rounded-full bg-zinc-950" />
                </div>
              </button>
            </div>

            {/* Bottom HUD indicator */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-pink-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
              CLICK INTERACTIVE NODES TO ANALYZE FRAMING
            </div>
          </div>

          {/* Explanation Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">
                การวิเคราะห์ตำแหน่ง: {activeThirdPoint.toUpperCase()}
              </div>

              {activeThirdPoint === 'top-right' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-lg bg-pink-950/30 border border-pink-500/40 text-xs text-pink-200">
                    <div className="font-semibold text-pink-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>จุดตัดทองคำบนขวา (Golden Power Point)</span>
                    </div>
                    ในภาพนี้ ใบหน้าและระดับสายตาของหญิงสาวถูกวางไว้ที่จุดตัดบนขวาอย่างแม่นยำ พร้อมทั้งสายตาเหม่อมองไปทางซ้ายที่มีพื้นที่กว้างขวาง เป็นตัวอย่างการจัดภาพระดับมาสเตอร์พีซ
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                    <li><strong className="text-white">พลังสายตา:</strong> ผู้ชมจะโฟกัสไปที่ดวงตาทันทีตั้งแต่เสี้ยววินาทีแรก</li>
                    <li><strong className="text-white">ความลึกของสถาปัตยกรรม:</strong> ปล่อยให้ห้องสมุดทางซ้ายเล่าเรื่องราวความโอ่อ่า</li>
                  </ul>
                </div>
              )}

              {activeThirdPoint === 'top-left' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200">
                    <div className="font-semibold text-purple-400 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>จุดตัดบนซ้าย (Top-Left Power Point)</span>
                    </div>
                    มักใช้เป็นจุดตกกระทบสายตาสำหรับการเริ่มต้นอ่านภาพจากซ้ายไปขวา เหมาะอย่างยิ่งสำหรับวัตถุเป้าหมาย โคมไฟ หรือตัวละครที่มองไปทางขวา
                  </div>
                  <p className="text-xs text-zinc-300">
                    หากตัวละครในภาพนี้ถูกย้ายมาอยู่บนซ้ายแต่ยังมองไปทางซ้าย จะกลายเป็นข้อผิดพลาดเพราะไม่มีพื้นที่ Looking Room
                  </p>
                </div>
              )}

              {(activeThirdPoint === 'bottom-left' || activeThirdPoint === 'bottom-right') && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-lg bg-zinc-850 border border-zinc-750 text-xs text-zinc-300">
                    <div className="font-semibold text-white mb-1">จุดตัดระนาบล่าง (Lower Power Points)</div>
                    เหมาะสำหรับวางหนังสือ สิ่งของสำคัญ อาวุธ หรือจุดที่มือของตัวละครกำลังถืออยู่ ซึ่งจะสร้างเส้นนำสายตารอง (Secondary Focal Point)
                  </div>
                </div>
              )}

              {activeThirdPoint === 'center' && (
                <div className="space-y-3 font-sans">
                  <div className="p-3 rounded-lg bg-zinc-850 border border-zinc-750 text-xs text-zinc-300">
                    <div className="font-semibold text-white mb-1">จุดกึ่งกลางภาพ (Symmetrical / Center)</div>
                    การวางตรงกลางสร้างความสงบนิ่ง เป็นทางการ หรือความเข้มงวด (เช่น สไตล์ Wes Anderson หรือ Kubrick) แต่หากใช้ผิดจังหวะอาจทำให้ภาพดูเรียบและขาดพลวัต
                  </div>
                </div>
              )}
            </div>

            {/* Quick Button Selector */}
            <div className="pt-3 border-t border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 block mb-2">เลือกจำลองจุดตัด:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setActiveThirdPoint('top-left')}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-colors ${
                    activeThirdPoint === 'top-left' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  บนซ้าย
                </button>
                <button
                  onClick={() => setActiveThirdPoint('top-right')}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-colors ${
                    activeThirdPoint === 'top-right' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  บนขวา (แนะนำ)
                </button>
                <button
                  onClick={() => setActiveThirdPoint('center')}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-colors ${
                    activeThirdPoint === 'center' ? 'bg-purple-600 text-white font-bold' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  กึ่งกลาง
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principle 2: ระยะขอบบนศีรษะ (Headroom) Interactive Slider */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
            <Sliders className="w-4 h-4" />
            <span>PRINCIPLE 02</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            ระยะขอบบนศีรษะ (Headroom Simulator)
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans">
            ลากสไลเดอร์เพื่อปรับระดับความสูงของศีรษะในเฟรมภาพ และสังเกตผลกระทบต่อความรู้สึกของผู้ชม
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Simulation Frame (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-700 shadow-inner select-none flex items-center justify-center">
            {/* Background Studio Wall in charcoal */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c24] to-[#0f0f14]" />
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

            {/* Ceiling guideline indicator */}
            <div className="absolute top-[12%] left-0 right-0 border-b border-dashed border-rose-500/40 flex items-center justify-end px-3">
              <span className="text-[10px] font-mono text-rose-400/90 bg-black/60 px-1 rounded">
                ขอบเขต Headroom มาตรฐาน (~12%)
              </span>
            </div>

            {/* Simulated Character Portrait that moves vertically based on slider */}
            <div 
              className="relative w-40 transition-transform duration-200 ease-out text-center"
              style={{
                transform: `translateY(${headroomValue - 45}px)`
              }}
            >
              {/* Head & Bust Vector */}
              <div className="relative mx-auto w-24 h-28 rounded-full bg-gradient-to-b from-rose-200 via-pink-300 to-purple-400 border-2 border-zinc-900 shadow-xl flex items-center justify-center">
                {/* Hair */}
                <div className="absolute -top-1 w-24 h-10 bg-zinc-900 rounded-t-full" />
                {/* Eyes */}
                <div className="w-14 flex items-center justify-between z-10 pt-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                </div>
              </div>
              {/* Shoulders */}
              <div className="w-40 h-20 -mt-4 mx-auto rounded-t-3xl bg-zinc-750 bg-zinc-700 border-t border-zinc-600" />
            </div>

            {/* Viewfinder Aspect overlay */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 rounded">
              HEADROOM OFFSET: {headroomValue - 45}px
            </div>
          </div>

          {/* Interactive Controls & Real-time Analysis (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-300">ปรับระดับความสูงของตัวละคร (Vertical Framing Slider):</span>
                <span className="text-rose-400 font-bold">{headroomValue}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                value={headroomValue}
                onChange={(e) => {
                  setHeadroomValue(Number(e.target.value));
                  onMarkExplored();
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>ชิดขอบบน (Too Tight)</span>
                <span className="text-pink-400 font-semibold">สมดุล (Ideal ~45%)</span>
                <span>จมก้นจอ (Too Much)</span>
              </div>
            </div>

            {/* Dynamic Analysis Callout */}
            <div className={`p-4 rounded-xl border ${headroomAnalysis.color} space-y-1.5 transition-all duration-300`}>
              <div className="font-semibold text-sm flex items-center gap-2">
                {headroomAnalysis.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {headroomAnalysis.status === 'warning' && <AlertCircle className="w-4 h-4 text-purple-400" />}
                {headroomAnalysis.status === 'danger' && <AlertCircle className="w-4 h-4 text-red-400" />}
                <span>{headroomAnalysis.label}</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                {headroomAnalysis.desc}
              </p>
            </div>

            {/* Preset Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-mono text-zinc-400">ค่าตัวอย่าง:</span>
              <button
                onClick={() => setHeadroomValue(20)}
                className="px-2.5 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:text-white"
              >
                หัวติดขอบ (20%)
              </button>
              <button
                onClick={() => setHeadroomValue(45)}
                className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300 font-semibold"
              >
                มาตรฐานแนะนำ (45%)
              </button>
              <button
                onClick={() => setHeadroomValue(75)}
                className="px-2.5 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:text-white"
              >
                เพดานลอย (75%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Principle 3: ระยะทิศทางการมอง (Looking Room / Lead Room / Nose Room) */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
            <Eye className="w-4 h-4" />
            <span>PRINCIPLE 03</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            ระยะทิศทางการมอง (Looking Room / Lead Room / Nose Room)
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans">
            เว้นพื้นที่ว่างในทิศทางที่สายตาของตัวละครมองไป เพื่อให้ภาพหายใจได้และนำสายตาผู้ชมอย่างราบรื่น
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Visual Canvas (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-700 shadow-inner flex items-center justify-between select-none p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14141b] via-[#1c1c27] to-[#14141b]" />

            {/* Lead Room Guides */}
            <div className="absolute inset-0 flex pointer-events-none">
              <div className="w-1/3 border-r border-zinc-700/40 h-full flex items-center justify-center">
                <span className="text-[10px] font-mono text-zinc-500">ZONE 1 (1/3)</span>
              </div>
              <div className="w-1/3 border-r border-zinc-700/40 h-full flex items-center justify-center">
                <span className="text-[10px] font-mono text-zinc-500">ZONE 2 (2/3)</span>
              </div>
              <div className="w-1/3 h-full flex items-center justify-center">
                <span className="text-[10px] font-mono text-zinc-500">ZONE 3 (3/3)</span>
              </div>
            </div>

            {/* Dynamic Character Placement */}
            <div 
              className={`relative z-10 w-28 transition-all duration-500 ease-out ${
                leadRoomMode === 'balanced'
                  ? gazeDirection === 'left' ? 'ml-auto mr-12' : 'mr-auto ml-12'
                  : gazeDirection === 'left' ? 'mr-auto ml-4' : 'ml-auto mr-4'
              }`}
            >
              {/* Profile Head in Rose/Pink */}
              <div className="relative w-20 h-24 rounded-2xl bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 border border-pink-300 shadow-xl flex items-center justify-center">
                {/* Nose indicating direction */}
                <div 
                  className={`absolute top-10 w-3 h-3 bg-pink-400 rotate-45 border-t border-r border-pink-300 ${
                    gazeDirection === 'left' ? '-left-1.5' : '-right-1.5'
                  }`} 
                />
                {/* Eye */}
                <div className={`w-2.5 h-2.5 rounded-full bg-zinc-950 ${gazeDirection === 'left' ? '-ml-6' : 'ml-6'}`} />
              </div>
              {/* Torso */}
              <div className="w-24 h-16 -mt-2 -ml-2 rounded-t-2xl bg-zinc-700" />
            </div>

            {/* Directional Vision Ray Vector in Pink/Rose */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2 transition-all duration-500 ${
                leadRoomMode === 'balanced'
                  ? gazeDirection === 'left' ? 'right-48 left-8 flex-row-reverse' : 'left-48 right-8 flex-row'
                  : gazeDirection === 'left' ? 'left-2 right-auto w-8' : 'right-2 left-auto w-8'
              }`}
            >
              <div className="flex-1 h-0.5 bg-gradient-to-r from-rose-400 to-transparent" />
              <ArrowRight className={`w-4 h-4 text-rose-400 shrink-0 ${gazeDirection === 'left' ? 'rotate-180' : ''}`} />
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
              MODE: {leadRoomMode.toUpperCase()} · GAZE: {gazeDirection.toUpperCase()}
            </div>
          </div>

          {/* Controls & Principle Explanation (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4 font-sans">
              {/* Direction selector */}
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1.5">
                  1. เลือกทิศทางที่ตัวละครมอง:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setGazeDirection('left');
                      onMarkExplored();
                    }}
                    className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                      gazeDirection === 'left'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    มองไปทางซ้าย ←
                  </button>
                  <button
                    onClick={() => {
                      setGazeDirection('right');
                      onMarkExplored();
                    }}
                    className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                      gazeDirection === 'right'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    มองไปทางขวา →
                  </button>
                </div>
              </div>

              {/* Mode Selector */}
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1.5">
                  2. เลือกรูปแบบการจัดกรอบภาพ:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setLeadRoomMode('balanced');
                      onMarkExplored();
                    }}
                    className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                      leadRoomMode === 'balanced'
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    สมดุลตามกฎ (เว้น 2/3)
                  </button>
                  <button
                    onClick={() => {
                      setLeadRoomMode('cramped');
                      onMarkExplored();
                    }}
                    className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                      leadRoomMode === 'cramped'
                        ? 'bg-red-600 text-white font-semibold'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    ชิดขอบ (จ้องกำแพง)
                  </button>
                </div>
              </div>

              {/* Dynamic Analysis Text */}
              {leadRoomMode === 'balanced' ? (
                <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>การจัดเฟรมถูกต้องตามหลักการ (Balanced Looking Room)</span>
                  </div>
                  <p className="leading-relaxed">
                    ตัวละครอยู่ฝั่งตรงข้ามกับทิศทางที่มอง ทำให้มีพื้นที่ว่างด้านหน้าสายตาประมาณ 2 ใน 3 ผู้ชมรู้สึกผ่อนคลายและมองเห็นสิ่งที่ตัวละครกำลังจดจ่อ
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/30 text-xs text-red-200 space-y-1">
                  <div className="font-semibold text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>ข้อผิดพลาด: จ้องกำแพง (Dead Wall / Negative Room)</span>
                  </div>
                  <p className="leading-relaxed">
                    ตัวละครมองไปทางขอบภาพที่ชิดเกินไป ทำให้สายตาชนขอบจอ ดูคับแคบ อึดอัด หากไม่ได้ตั้งใจสื่อถึงความติดกับดักหรือถูกกักขัง ถือเป็นข้อผิดพลาดร้ายแรง
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
