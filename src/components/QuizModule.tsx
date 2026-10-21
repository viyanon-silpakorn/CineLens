import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/cinemaData';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Clapperboard,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface QuizModuleProps {
  onCompleteQuiz: (score: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  onCompleteQuiz
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showReviewList, setShowReviewList] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const userSelectedOptionIndex = selectedAnswers[currentQ.id];

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach(q => {
        const pickedIdx = selectedAnswers[q.id];
        if (pickedIdx !== undefined && q.options[pickedIdx].isCorrect) {
          correctCount++;
        }
      });
      onCompleteQuiz(correctCount);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizFinished(false);
    setShowReviewList(false);
  };

  const correctCount = QUIZ_QUESTIONS.filter(q => {
    const pickedIdx = selectedAnswers[q.id];
    return pickedIdx !== undefined && q.options[pickedIdx].isCorrect;
  }).length;

  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      {/* Title */}
      <div className="pb-2">
        <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
          KNOWLEDGE EVALUATION SYSTEM
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          แบบทดสอบวัดความรู้ภาพยนตร์และการจัดเฟรม (5 ข้อประเมินผล)
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed">
          ทดสอบความเข้าใจเชิงลึกเกี่ยวกับขนาดภาพ (Shot Sizes) และมุมกล้อง (Camera Angles) พร้อมระบบประมวลผลคำตอบอัตโนมัติและเฉลยเหตุผลทันที
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 md:p-8 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-400 font-semibold">
                ข้อที่ {currentQuestionIndex + 1} จาก {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs text-zinc-500">·</span>
              <span className="text-xs font-mono text-zinc-400">
                คะแนนปัจจุบัน: {correctCount}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
              </span>
            </div>

            <div className="flex gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentQuestionIndex
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 w-8'
                      : idx < currentQuestionIndex
                      ? selectedAnswers[QUIZ_QUESTIONS[idx].id] !== undefined && QUIZ_QUESTIONS[idx].options[selectedAnswers[QUIZ_QUESTIONS[idx].id]].isCorrect
                        ? 'bg-emerald-500 w-4'
                        : 'bg-red-500 w-4'
                      : 'bg-zinc-800 w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Context & Prompt */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-pink-400 tracking-wider uppercase block">
              {currentQ.context}
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options with Instant Feedback */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = userSelectedOptionIndex === idx;
              const isRevealed = showExplanation;
              const isCorrectOption = option.isCorrect;

              let style = 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-750 hover:text-white';
              if (isRevealed) {
                if (isCorrectOption) {
                  style = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/60 shadow-lg shadow-emerald-950/50';
                } else if (isSelected && !isCorrectOption) {
                  style = 'bg-red-950/50 border-red-500 text-red-200 ring-1 ring-red-500/60';
                } else {
                  style = 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500 opacity-50';
                }
              } else if (isSelected) {
                style = 'bg-rose-950/40 border-rose-500 text-white';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3.5 group ${style}`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isRevealed && isCorrectOption
                      ? 'bg-emerald-500 text-zinc-950'
                      : isRevealed && isSelected && !isCorrectOption
                      ? 'bg-red-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>

                  <div className="flex-1 text-sm font-medium leading-relaxed">
                    {option.text}
                  </div>

                  {isRevealed && isCorrectOption && (
                    <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="hidden sm:inline">ถูกต้อง</span>
                    </div>
                  )}
                  {isRevealed && isSelected && !isCorrectOption && (
                    <div className="flex items-center gap-1 text-xs font-mono text-red-400 font-bold shrink-0 mt-0.5">
                      <XCircle className="w-5 h-5" />
                      <span className="hidden sm:inline">ไม่ถูกต้อง</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation Callout */}
          {showExplanation && (
            <div className={`p-5 rounded-xl border space-y-2 animate-in fade-in duration-300 ${
              currentQ.options[userSelectedOptionIndex].isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}>
              <div className="font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
                {currentQ.options[userSelectedOptionIndex].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">เฉลยเหตุผล: คำตอบของคุณถูกต้องยอดเยี่ยม</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">เฉลยเหตุผล: ตัวเลือกที่คุณเลือกยังไม่ตรงกับหลักการภาพยนตร์</span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                {currentQ.options[userSelectedOptionIndex].explanation}
              </p>
              {!currentQ.options[userSelectedOptionIndex].isCorrect && (
                <div className="mt-2 pt-2 border-t border-red-500/20 text-xs text-zinc-300">
                  <strong className="text-emerald-400">คำตอบที่ถูกต้องคือ:</strong>{' '}
                  {currentQ.options.find(o => o.isCorrect)?.text}
                </div>
              )}
            </div>
          )}

          {/* Next / Submit Button */}
          {showExplanation && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-rose-600/25"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'ข้อถัดไป' : 'คำนวณและสรุปผลคะแนนรวม'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Summary Screen in dark charcoal with rose/purple */
        <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-8 md:p-12 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-purple-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-xl shadow-rose-500/10">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase">
              CINELENS EVALUATION REPORT
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              {correctCount >= 4 ? 'ยินดีด้วย! คุณผ่านเกณฑ์การประเมินระดับสตูดิโอ' : 'สรุปผลคะแนนการทดสอบความรู้'}
            </h3>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
              คุณทำคะแนนได้ <strong className="text-pink-400 font-mono text-xl">{correctCount}</strong> จาก <strong className="text-white font-mono text-xl">{QUIZ_QUESTIONS.length}</strong> ข้อ ({scorePercentage}%)
            </p>
          </div>

          {/* Summary Scorecard Badge */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#0f0f14] border border-pink-500/40 relative overflow-hidden text-left shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                  CINELENS OFFICIAL CERTIFICATE
                </div>
                <div className="font-display font-bold text-base text-white">
                  {correctCount === 5 
                    ? 'Director of Photography (DoP) — ระดับดีเลิศ' 
                    : correctCount >= 3 
                    ? 'Certified Camera Operator — ระดับผ่านเกณฑ์' 
                    : 'Studio Apprentice — แนะนำให้ทบทวนเพิ่มเติม'}
                </div>
              </div>
              <div className="text-2xl font-mono font-bold text-pink-400">
                {scorePercentage}%
              </div>
            </div>

            <div className="text-xs text-zinc-400 space-y-1">
              <div>หลักสูตร: ขนาดภาพ (ELS-ECU), ผังสัดส่วนมนุษย์ และมุมกล้อง</div>
              <div>สถานะ: ผ่านการประเมินผลระบบเรียบร้อยแล้ว</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowReviewList(!showReviewList)}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-pink-400" />
              <span>{showReviewList ? 'ซ่อนการทบทวนข้อสอบ' : 'ดูเฉลยและทบทวนเหตุผลทุกข้อ (5 ข้อ)'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-rose-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
          </div>

          {/* Full Review List */}
          {showReviewList && (
            <div className="text-left space-y-4 pt-6 border-t border-zinc-800">
              <h4 className="font-display text-lg font-bold text-white mb-4">
                สรุปเฉลยและคำอธิบายโดยละเอียดทั้ง 5 ข้อ:
              </h4>

              {QUIZ_QUESTIONS.map((q, idx) => {
                const pickedIdx = selectedAnswers[q.id];
                const isUserCorrect = pickedIdx !== undefined && q.options[pickedIdx].isCorrect;

                return (
                  <div key={q.id} className="p-5 rounded-xl bg-[#0f0f14] border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-pink-400">ข้อที่ {idx + 1}: {q.context}</span>
                      <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                        isUserCorrect ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-500/40'
                      }`}>
                        {isUserCorrect ? '✓ ตอบถูก' : '✗ ตอบผิด'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white">{q.question}</p>

                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                      <div>
                        <strong className="text-emerald-400">คำตอบที่ถูกต้อง:</strong>{' '}
                        {q.options.find(o => o.isCorrect)?.text}
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed pt-1">
                        <strong>เหตุผล:</strong> {q.options.find(o => o.isCorrect)?.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
