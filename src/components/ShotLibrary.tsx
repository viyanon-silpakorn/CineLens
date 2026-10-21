import React, { useState } from 'react';
import { SHOT_SIZES, ShotSizeItem } from '../data/cinemaData';
import { HumanScaleDiagram } from './HumanScaleDiagram';
import { CinematicImage } from './CinematicImage';
import { 
  Maximize2, 
  Camera, 
  Sparkles, 
  Compass, 
  Eye, 
  Film, 
  Check, 
  AlertTriangle,
  X
} from 'lucide-react';

interface ShotLibraryProps {
  onMarkShotExplored: (shotId: string) => void;
  exploredShots: string[];
}

export const ShotLibrary: React.FC<ShotLibraryProps> = ({
  onMarkShotExplored,
  exploredShots
}) => {
  const [selectedShotId, setSelectedShotId] = useState<string>('ms');
  const [filterCategory, setFilterCategory] = useState<'all' | 'wide' | 'medium' | 'close'>('all');
  const [inspectorShot, setInspectorShot] = useState<ShotSizeItem | null>(null);

  const filteredShots = SHOT_SIZES.filter(shot => {
    if (filterCategory === 'all') return true;
    return shot.category === filterCategory;
  });

  const handleSelectShot = (shotId: string) => {
    setSelectedShotId(shotId);
    onMarkShotExplored(shotId);
  };

  const openInspector = (shot: ShotSizeItem) => {
    setInspectorShot(shot);
    onMarkShotExplored(shot.id);
  };

  return (
    <div className="space-y-8">
      {/* Module Title Kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
            CINEMATIC FRAMING & SHOT SCALE MODULE
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            คลังขนาดภาพและระยะการถ่ายทำ (Shot Sizes)
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed font-sans">
            ขนาดภาพเปรียบเสมือนขนาดตัวอักษรและน้ำหนักเสียงในการเล่าเรื่อง การเลือกขนาดภาพที่ถูกต้องช่วยนำพาอารมณ์และสมาธิของผู้ชมไปยังจุดที่ผู้กำกับต้องการ
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ทั้งหมด (6 ระยะ)
          </button>
          <button
            onClick={() => setFilterCategory('wide')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'wide'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ภาพกว้าง (ELS, LS)
          </button>
          <button
            onClick={() => setFilterCategory('medium')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'medium'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ภาพปานกลาง (MS, MCU)
          </button>
          <button
            onClick={() => setFilterCategory('close')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'close'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ภาพระยะใกล้ (CU, ECU)
          </button>
        </div>
      </div>

      {/* Part 1: Interactive Human Scale Diagram (Human Anatomy Comparison) */}
      <HumanScaleDiagram 
        selectedShotId={selectedShotId} 
        onSelectShot={handleSelectShot} 
      />

      {/* Part 2: Dynamic Grid of Detailed Shot Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>การ์ดข้อมูลและตัวอย่างระยะภาพหลัก</span>
            <span className="text-xs font-mono text-zinc-400 font-normal">
              (สำรวจแล้ว {exploredShots.length}/6 ระยะ)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShots.map((shot) => {
            const isExplored = exploredShots.includes(shot.id);
            const isSelected = selectedShotId === shot.id;

            return (
              <div
                key={shot.id}
                onClick={() => handleSelectShot(shot.id)}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-[#181822] border-pink-500 ring-1 ring-pink-500/50 shadow-xl'
                    : 'bg-[#14141b] border-zinc-800/90 hover:border-zinc-700 hover:bg-[#16161f]'
                }`}
              >
                {/* Visual Preview Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <CinematicImage
                    src={shot.image}
                    fallbackSrc={shot.fallbackImage}
                    alt={shot.nameTh}
                    shotCode={shot.code}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  {/* Subtle cinema scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141b] via-transparent to-black/40" />

                  {/* Header badges inside frame */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow">
                      {shot.code}
                    </span>
                    {isExplored ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-sm">
                        <Check className="w-3 h-3" /> สำรวจแล้ว
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/60 text-zinc-300 backdrop-blur-sm">
                        คลิกเพื่อเรียนรู้
                      </span>
                    )}
                  </div>

                  {/* Anatomical Cut Highlight at bottom of image */}
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-zinc-300 flex items-center justify-between">
                    <span className="truncate">{shot.nameEn}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h4 className="font-display text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                        {shot.nameTh}
                      </h4>
                      <span className="text-xs font-mono text-zinc-400">
                        {shot.category.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                      {shot.summary}
                    </p>
                  </div>

                  {/* Key specs strip */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800 text-[11px]">
                    <div className="flex items-start gap-1.5 text-zinc-400">
                      <Camera className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 truncate">
                        <strong className="text-zinc-400 font-normal">เลนส์:</strong> {shot.recommendedLens}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-zinc-400">
                      <Eye className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 line-clamp-1">
                        <strong className="text-zinc-400 font-normal">จุดตัด:</strong> {shot.humanCutPoint}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openInspector(shot);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-medium text-zinc-200 bg-zinc-800/80 hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-600 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-zinc-700/60"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>เจาะลึกรายละเอียด & ภาษาภาพยนตร์</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspector Modal / Deep-Dive Slide-Over */}
      {inspectorShot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#14141c] border border-zinc-700 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setInspectorShot(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-1">
                <span className="px-2 py-0.5 rounded bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold">
                  {inspectorShot.code}
                </span>
                <span>{inspectorShot.nameEn}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {inspectorShot.nameTh}
              </h3>
            </div>

            {/* Viewfinder Preview with Cinema Marks */}
            <div className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden border border-zinc-700">
              <CinematicImage
                src={inspectorShot.image}
                fallbackSrc={inspectorShot.fallbackImage}
                alt={inspectorShot.nameTh}
                shotCode={inspectorShot.code}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-rose-500/20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs font-mono text-pink-400">
                LENS: {inspectorShot.recommendedLens}
              </div>
            </div>

            {/* Narrative & Emotional Impact Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-4 h-4" />
                  <span>หน้าที่ทางภาษาภาพยนตร์</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {inspectorShot.storytellingPurpose}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>ผลกระทบทางจิตวิทยาต่อผู้ชม</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {inspectorShot.emotionalImpact}
                </p>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2 text-xs text-zinc-300 leading-relaxed">
              <span className="font-semibold text-white block text-sm">คำอธิบายฉบับสมบูรณ์:</span>
              <p className="font-sans">{inspectorShot.description}</p>
            </div>

            {/* Anatomy Cut Point & Warning */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-red-200 space-y-1.5">
              <div className="font-semibold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>ข้อควรระวังในการตัดขอบภาพ (Joints Warning)</span>
              </div>
              <p className="text-zinc-300 leading-relaxed font-sans">
                {inspectorShot.jointWarning}
              </p>
            </div>

            {/* Modal Footer CTA */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectorShot(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-semibold text-xs transition-colors shadow-md"
              >
                เข้าใจแล้ว ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
