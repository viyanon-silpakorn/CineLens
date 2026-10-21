import React from 'react';
import { 
  Film, 
  BookOpen, 
  Maximize2, 
  Compass, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Clapperboard,
  Camera,
  GraduationCap
} from 'lucide-react';

export type ActiveTab = 'overview' | 'theory' | 'shot-library' | 'angles-movement' | 'quiz' | 'references';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  overallProgress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  overallProgress
}) => {
  const menuItems = [
    {
      id: 'overview' as ActiveTab,
      labelTh: 'ภาพรวมระบบ',
      labelEn: 'System Overview',
      icon: Film,
      badge: 'Start'
    },
    {
      id: 'theory' as ActiveTab,
      labelTh: 'ทฤษฎีเบื้องต้น',
      labelEn: 'Fundamentals',
      icon: BookOpen,
      badge: 'Lighting & DoF'
    },
    {
      id: 'shot-library' as ActiveTab,
      labelTh: 'คลังระยะภาพ',
      labelEn: 'Shot Scale Library',
      icon: Maximize2,
      badge: '6 Core Sizes'
    },
    {
      id: 'angles-movement' as ActiveTab,
      labelTh: 'มุมกล้องและการเคลื่อนไหว',
      labelEn: 'Angles & Movement',
      icon: Compass,
      badge: 'Cinematography'
    },
    {
      id: 'quiz' as ActiveTab,
      labelTh: 'แบบทดสอบความรู้',
      labelEn: 'Knowledge Quiz',
      icon: Award,
      badge: '5 Questions'
    },
    {
      id: 'references' as ActiveTab,
      labelTh: 'แหล่งอ้างอิง & ผู้พัฒนา',
      labelEn: 'References & Contact',
      icon: GraduationCap,
      badge: 'Academic'
    }
  ];

  return (
    <aside 
      className={`relative z-30 flex flex-col border-r border-zinc-800/80 bg-[#121217] transition-all duration-300 ease-in-out shrink-0 select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Studio Header Brand */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-zinc-800/80 bg-[#0f0f14]">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 shrink-0">
              <Clapperboard className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-base tracking-tight text-white truncate">
                CineLens
              </span>
              <span className="text-[11px] font-mono tracking-wider text-rose-400 uppercase truncate">
                STUDIO INTERACTIVE
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
            <Clapperboard className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title={isCollapsed ? 'ขยายเมนู' : 'พับเก็บเมนู'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* When collapsed, a floating toggle button */}
      {isCollapsed && (
        <div className="pt-3 pb-1 flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            title="ขยายเมนูบาร์"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      )}

      {/* Navigation Menu List */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            สารบัญบทเรียนสตูดิโอ
          </div>
        )}

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500/15 via-pink-500/10 to-transparent text-rose-300 border border-rose-500/35 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
              title={isCollapsed ? item.labelTh : undefined}
            >
              <div 
                className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold shadow-md shadow-rose-500/30' 
                    : 'bg-zinc-800/80 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium tracking-tight truncate ${isActive ? 'text-rose-300 font-semibold' : 'text-zinc-300'}`}>
                    {item.labelTh}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 truncate">
                    {item.labelEn}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Progress Box in Sidebar */}
      <div className="p-3 border-t border-zinc-800/80 bg-[#0c0c10]">
        {!isCollapsed ? (
          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-zinc-400 font-medium">ความก้าวหน้ารวม</span>
              <span className="font-mono font-bold text-rose-400 tabular-nums">{overallProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full transition-all duration-500 shadow-sm shadow-rose-500/50"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-rose-400" />
                <span>Cinematographer</span>
              </span>
              <span className="font-mono text-zinc-400">STAGE 01</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2" title={`ความก้าวหน้ารวม: ${overallProgress}%`}>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 rounded-full border-2 border-rose-500 transition-all duration-500"
                style={{ 
                  clipPath: `polygon(50% 50%, -50% -50%, ${overallProgress * 2}% -50%)`
                }}
              />
              <span className="text-[10px] font-mono font-bold text-rose-400 tabular-nums">
                {overallProgress}%
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
