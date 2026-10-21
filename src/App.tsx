/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { ShotLibrary } from './components/ShotLibrary';
import { CompositionModule } from './components/CompositionModule';
import { TheoryModule } from './components/TheoryModule';
import { AnglesAndMovement } from './components/AnglesAndMovement';
import { QuizModule } from './components/QuizModule';
import { ReferencesAndContact } from './components/ReferencesAndContact';
import { SHOT_SIZES } from './data/cinemaData';
import { Mail, GraduationCap, ArrowRight, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Learning progress tracker state
  const [exploredShots, setExploredShots] = useState<string[]>(['ms']); // default explored ms
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    theory: false,
    shots: false,
    composition: false,
    angles: false,
    quiz: false,
  });
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMarkShotExplored = (shotId: string) => {
    setExploredShots((prev) => {
      if (!prev.includes(shotId)) {
        const next = [...prev, shotId];
        if (next.length >= 4) {
          setCompletedSections((s) => ({ ...s, shots: true }));
        }
        return next;
      }
      return prev;
    });
  };

  const handleMarkTheoryExplored = () => {
    setCompletedSections((s) => ({ ...s, theory: true }));
  };

  const handleMarkCompositionExplored = () => {
    setCompletedSections((s) => ({ ...s, composition: true }));
  };

  const handleMarkAnglesExplored = () => {
    setCompletedSections((s) => ({ ...s, angles: true }));
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
    setCompletedSections((s) => ({ ...s, quiz: true }));
  };

  const handleResetProgress = () => {
    setExploredShots(['ms']);
    setCompletedSections({
      theory: false,
      shots: false,
      composition: false,
      angles: false,
      quiz: false,
    });
    setQuizScore(null);
  };

  // Calculate overall percentage progress (0 - 100%)
  const calculateOverallProgress = (): number => {
    let score = 0;
    // Theory weight: 20%
    if (completedSections.theory) score += 20;
    // Shot library weight: 25% (proportional to shots explored)
    score += Math.round((exploredShots.length / SHOT_SIZES.length) * 25);
    // Composition principles weight: 20%
    if (completedSections.composition) score += 20;
    // Angles & movements weight: 15%
    if (completedSections.angles) score += 15;
    // Quiz completion weight: 20%
    if (completedSections.quiz) score += 20;

    return Math.min(100, score);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0e0e13] text-zinc-100 font-sans">
      {/* 1. Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        overallProgress={overallProgress}
      />

      {/* 2. Main Studio Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header conforming to 3-zone Top Bar Contract */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          overallProgress={overallProgress}
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Scrollable Content Pane */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 py-8 space-y-10">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* View 1: System Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <WelcomeBanner
                  setActiveTab={setActiveTab}
                  overallProgress={overallProgress}
                  completedSections={completedSections}
                  onResetProgress={handleResetProgress}
                />

                {/* Quick Interactive Peek at Shot Scales */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-rose-400 tracking-wider uppercase">
                        QUICK PREVIEW
                      </div>
                      <h3 className="font-display text-xl font-bold text-white">
                        ระยะภาพหลัก 6 ระยะที่ต้องรู้
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('shot-library')}
                      className="text-xs font-mono text-pink-400 hover:text-pink-300 underline underline-offset-4"
                    >
                      ดูคลังเต็มรูปแบบและผังสรีระ →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {SHOT_SIZES.map((shot) => (
                      <button
                        key={shot.id}
                        onClick={() => {
                          handleMarkShotExplored(shot.id);
                          setActiveTab('shot-library');
                        }}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/60 transition-all text-left group"
                      >
                        <div className="text-xs font-mono font-bold text-rose-400 group-hover:text-pink-300">
                          {shot.code}
                        </div>
                        <div className="text-sm font-semibold text-white truncate mt-1">
                          {shot.nameTh}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {shot.nameEn}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Composition Principle Preview */}
                <CompositionModule onMarkExplored={handleMarkCompositionExplored} />

                {/* Developer & Reference Shortcut Banner */}
                <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>SILPAKORN UNIVERSITY ACADEMIC RESOURCE</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      แหล่งอ้างอิงวิชาการภาพยนตร์และข้อมูลผู้พัฒนา
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      อ้างอิงจากตำราภาพยนตร์สากล ASC, Routledge, Focal Press โดยทีมพัฒนา มหาวิทยาลัยศิลปากร (ติดต่อ: <span className="text-rose-400 font-mono">muangon_w@silpakorn.edu</span>)
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('references')}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs border border-zinc-700/80 transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
                  >
                    <span>ดูเอกสารอ้างอิง & ช่องทางติดต่อ</span>
                    <ArrowRight className="w-4 h-4 text-pink-400" />
                  </button>
                </div>
              </div>
            )}

            {/* View 2: Cinematography Fundamentals (Theory) */}
            {activeTab === 'theory' && (
              <div className="animate-in fade-in duration-300">
                <TheoryModule onMarkExplored={handleMarkTheoryExplored} />
              </div>
            )}

            {/* View 3: Shot Library & Composition */}
            {activeTab === 'shot-library' && (
              <div className="space-y-12 animate-in fade-in duration-300">
                <ShotLibrary
                  onMarkShotExplored={handleMarkShotExplored}
                  exploredShots={exploredShots}
                />

                {/* Dedicated Composition Section */}
                <div className="pt-6 border-t border-zinc-800">
                  <CompositionModule onMarkExplored={handleMarkCompositionExplored} />
                </div>
              </div>
            )}

            {/* View 4: Camera Angles and Movements */}
            {activeTab === 'angles-movement' && (
              <div className="animate-in fade-in duration-300">
                <AnglesAndMovement onMarkExplored={handleMarkAnglesExplored} />
              </div>
            )}

            {/* View 5: Interactive Knowledge Quiz */}
            {activeTab === 'quiz' && (
              <div className="animate-in fade-in duration-300">
                <QuizModule onCompleteQuiz={handleCompleteQuiz} />
              </div>
            )}

            {/* View 6: References and Developer Contact */}
            {activeTab === 'references' && (
              <div className="animate-in fade-in duration-300">
                <ReferencesAndContact />
              </div>
            )}

            {/* Universal Studio Footer */}
            <footer className="pt-10 pb-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-400">CineLens Interactive</span>
                <span>·</span>
                <span>สื่อการเรียนรู้ภาพยนตร์และขนาดภาพ</span>
              </div>

              <div className="flex items-center gap-2 text-center sm:text-right">
                <span>ผู้พัฒนา:</span>
                <a 
                  href="mailto:muangon_w@silpakorn.edu" 
                  className="font-mono text-rose-400 hover:text-pink-300 underline underline-offset-2"
                >
                  muangon_w@silpakorn.edu
                </a>
                <span>(มหาวิทยาลัยศิลปากร)</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
