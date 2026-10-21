import React, { useState } from 'react';
import { 
  BookOpen, 
  Mail, 
  User, 
  GraduationCap, 
  ExternalLink, 
  Copy, 
  Check, 
  Film, 
  Building2, 
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const ReferencesAndContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const developerEmail = 'muangon_w@silpakorn.edu';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const references = [
    {
      author: 'Brown, Blain',
      year: '2021',
      title: 'Cinematography: Theory and Practice: For Cinematographers and Directors (4th Edition)',
      publisher: 'Routledge / Focal Press',
      category: 'ตำรามาตรฐานการจัดแสงและขนาดภาพระดับสากล'
    },
    {
      author: 'Mercado, Gustavo',
      year: '2010',
      title: "The Filmmaker's Eye: Learning (and Breaking) the Rules of Cinematic Composition",
      publisher: 'Focal Press',
      category: 'หลักการจัดองค์ประกอบภาพ กฎสามส่วน และระยะ Looking Room'
    },
    {
      author: 'Mascelli, Joseph V.',
      year: '1998',
      title: "The Five C's of Cinematography: Motion Picture Filming Techniques",
      publisher: 'Silman-James Press',
      category: 'คลาสสิก Camera Angles, Continuity, Cutting, Close-ups, Composition'
    },
    {
      author: 'American Society of Cinematographers (ASC)',
      year: '2020',
      title: 'American Cinematographer Manual (10th Edition)',
      publisher: 'ASC Press, Hollywood, California',
      category: 'คู่มือเทคนิคและเลนส์ภาพยนตร์ระดับฮอลลีวูด'
    },
    {
      author: 'Bordwell, David, & Thompson, Kristin',
      year: '2019',
      title: 'Film Art: An Introduction (12th Edition)',
      publisher: 'McGraw-Hill Education',
      category: 'ทฤษฎีภาษาภาพยนตร์และจิตวิทยาการเล่าเรื่องผ่านมุมมองกล้อง'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Title */}
      <div className="pb-2">
        <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
          ACADEMIC REFERENCES & DEVELOPER INFORMATION
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          แหล่งอ้างอิงทางวิชาการและข้อมูลติดต่อผู้พัฒนา
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed">
          เนื้อหาและมาตรฐานการจำลองใน CineLens Interactive ได้รับการอ้างอิงจากตำราภาพยนตร์ระดับสากลและพัฒนาโดยบุคลากรมหาวิทยาลัยศิลปากร
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Contact Developer Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider block">
                DEVELOPER CONTACT
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                ข้อมูลผู้พัฒนาแอปพลิเคชัน
              </h3>
            </div>
          </div>

          {/* Developer Details */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#0f0f14] border border-zinc-800 space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-zinc-400">หน่วยงาน / สถาบัน:</div>
                  <div className="text-sm font-semibold text-white">มหาวิทยาลัยศิลปากร (Silpakorn University)</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Faculty of Information and Communication Technology</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-zinc-800/80">
                <User className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-zinc-400">ผู้พัฒนาและรับผิดชอบโครงการ:</div>
                  <div className="text-sm font-semibold text-white">ทีมวิจัยและพัฒนานวัตกรรมสื่อภาพยนตร์</div>
                  <div className="text-xs text-rose-300/90 font-mono mt-0.5">CineLens Interactive Project Lead</div>
                </div>
              </div>

              {/* Explicit Email Box */}
              <div className="pt-3 border-t border-zinc-800/80">
                <div className="text-xs text-zinc-400 mb-1.5 flex items-center justify-between">
                  <span>อีเมลติดต่อผู้พัฒนาโดยตรง:</span>
                  <span className="text-[10px] font-mono text-emerald-400">OFFICIAL CONTACT</span>
                </div>
                
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-900 border border-pink-500/30 group">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    <a 
                      href={`mailto:${developerEmail}`}
                      className="text-sm font-mono font-bold text-white hover:text-pink-400 transition-colors truncate"
                      title="คลิกเพื่อส่งอีเมล"
                    >
                      {developerEmail}
                    </a>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                    title="คัดลอกอีเมล"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="font-mono text-zinc-400">คัดลอก</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Mailto Button */}
            <a
              href={`mailto:${developerEmail}?subject=ติดต่อสอบถามเกี่ยวกับ%20CineLens%20Interactive`}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25"
            >
              <Mail className="w-4 h-4" />
              <span>ส่งอีเมลติดต่อ: {developerEmail}</span>
            </a>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300 block mb-0.5">วัตถุประสงค์ของการพัฒนา:</strong>
              เว็บแอปพลิเคชันนี้สร้างขึ้นเพื่อเป็นสื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive Educational Tool) สำหรับนักศึกษาและผู้สนใจศาสตร์ภาพยนตร์ มัลติมีเดีย และการกำกับภาพ โดยไม่มีค่าใช้จ่าย
            </div>
          </div>
        </div>

        {/* Academic References List (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-pink-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-pink-400 uppercase tracking-wider block">
                BIBLIOGRAPHY & TEXTBOOKS
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                เอกสารและตำราวิชาการอ้างอิง
              </h3>
            </div>
          </div>

          <div className="space-y-3.5">
            {references.map((ref, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#0f0f14] border border-zinc-800 hover:border-zinc-700 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-rose-400 font-semibold">
                    [{idx + 1}] {ref.author} ({ref.year})
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    ACADEMIC
                  </span>
                </div>

                <div className="text-sm font-semibold text-white leading-snug">
                  {ref.title}
                </div>

                <div className="text-xs text-zinc-400 flex items-center justify-between pt-1">
                  <span>สำนักพิมพ์: {ref.publisher}</span>
                </div>

                <div className="text-[11px] font-mono text-pink-400/90 pt-1 border-t border-zinc-800/60">
                  ขอบเขตเนื้อหา: {ref.category}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200/90 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-purple-300">การรับรองความถูกต้องของเนื้อหา:</span>
              {' '}คำจำกัดความของขนาดภาพ (ELS-ECU) สัดส่วนการตัดเฟรมบนร่างกาย และกฎมุมกล้อง ได้รับการตรวจสอบและเทียบเคียงกับหลักสูตรภาพยนตร์สากลของสมาคมผู้กำกับภาพแห่งอเมริกา (ASC)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
