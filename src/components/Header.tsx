import React from 'react';
import { ActiveTab } from './Sidebar';
import { Sparkles, Clapperboard, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  overallProgress: number;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  overallProgress,
  onToggleSidebar
}) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 px-4 md:px-6 py-4 border-b border-zinc-800/90 bg-[#101015]/95 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark (Single text element in display face, one line) with mobile menu button */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors lg:hidden"
            title="เปิด/ปิดเมนู"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <button 
          onClick={() => setActiveTab('overview')}
          className="font-display text-lg font-bold tracking-tight text-white hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 text-left"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/70" />
          <span>CineLens Interactive</span>
        </button>
      </div>

      {/* Zone 2: 4-5 Single-line Nav Links with subtle hover states */}
      <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-zinc-400">
        <button
          onClick={() => setActiveTab('overview')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'overview' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          ภาพรวม
        </button>
        <button
          onClick={() => setActiveTab('theory')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'theory' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          ทฤษฎีเบื้องต้น
        </button>
        <button
          onClick={() => setActiveTab('shot-library')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'shot-library' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          คลังระยะภาพ
        </button>
        <button
          onClick={() => setActiveTab('angles-movement')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'angles-movement' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          มุมกล้อง
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'quiz' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          แบบทดสอบ
        </button>
        <button
          onClick={() => setActiveTab('references')}
          className={`hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'references' ? 'text-rose-400 font-semibold' : ''
          }`}
        >
          แหล่งอ้างอิง & ผู้พัฒนา
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => setActiveTab('shot-library')}
          className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 active:from-rose-700 active:to-purple-700 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-md shadow-rose-600/25 flex items-center gap-2"
        >
          <Clapperboard className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>จำลองช่องมองภาพ</span>
        </button>
      </div>
    </header>
  );
};
