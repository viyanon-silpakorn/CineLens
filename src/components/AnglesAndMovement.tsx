import React, { useState, useEffect } from 'react';
import { 
  CAMERA_ANGLES, 
  CAMERA_MOVEMENTS_EXPANDED, 
  CameraAngle, 
  CameraMovementItem 
} from '../data/cinemaData';
import { 
  Compass, 
  Play, 
  RotateCcw, 
  Sliders, 
  Film, 
  Sparkles, 
  Video, 
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  Tv,
  Radio,
  Maximize2,
  Zap,
  Info,
  Scale
} from 'lucide-react';

interface AnglesAndMovementProps {
  onMarkExplored: () => void;
}

export const AnglesAndMovement: React.FC<AnglesAndMovementProps> = ({
  onMarkExplored
}) => {
  // Angle selector state
  const [selectedAngleId, setSelectedAngleId] = useState<string>('low-angle');
  
  // Movement selector state
  const [selectedMovementId, setSelectedMovementId] = useState<string>('dolly');
  const [movementCategory, setMovementCategory] = useState<'all' | 'stationary' | 'rig'>('all');
  
  // Interactive Live Animation Simulation state
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(false);
  const [motionProgress, setMotionProgress] = useState<number>(0);

  // Dedicated Dolly vs Zoom comparison sandbox mode
  const [comparisonMode, setComparisonMode] = useState<'dolly' | 'zoom' | 'vertigo'>('dolly');

  const selectedAngle = CAMERA_ANGLES.find(a => a.id === selectedAngleId) || CAMERA_ANGLES[1];
  const selectedMovement = CAMERA_MOVEMENTS_EXPANDED.find(m => m.id === selectedMovementId) || CAMERA_MOVEMENTS_EXPANDED[3];

  // Filter movements
  const filteredMovements = CAMERA_MOVEMENTS_EXPANDED.filter(m => {
    if (movementCategory === 'all') return true;
    return m.category === movementCategory;
  });

  // Handle live animation simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingMotion) {
      setMotionProgress(0);
      let step = 0;
      interval = setInterval(() => {
        step += 1.5;
        if (step <= 100) {
          setMotionProgress(step);
        } else {
          setIsPlayingMotion(false);
          setMotionProgress(100);
          if (interval) clearInterval(interval);
        }
      }, 35);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingMotion]);

  const handleStartMotion = () => {
    setIsPlayingMotion(true);
    onMarkExplored();
  };

  const handleResetMotion = () => {
    setIsPlayingMotion(false);
    setMotionProgress(0);
  };

  // 3D Perspective calculation for Camera Angles
  const getAngleTransform = (id: string) => {
    switch (id) {
      case 'low-angle':
        return { 
          transform: 'perspective(700px) rotateX(-22deg) scale(1.15)',
          title: 'มุมต่ำ (Low Angle)',
          powerBadge: 'อำนาจ & ความน่าเกรงขาม',
          desc: 'วางกล้องต่ำกว่าระดับสายตาแหงนขึ้นมอง ทำให้บุคคลดูสง่างาม มีอิทธิพล และอยู่เหนือกว่าผู้ชม'
        };
      case 'high-angle':
        return { 
          transform: 'perspective(700px) rotateX(24deg) scale(0.9)',
          title: 'มุมสูง (High Angle)',
          powerBadge: 'ความเปราะบาง & ไร้อำนาจ',
          desc: 'วางกล้องสูงกว่าระดับสายตาก้มมองลงมา ทำให้บุคคลดูตัวเล็ก สับสน สิ้นหวัง หรือตกเป็นเหยื่อ'
        };
      case 'dutch-angle':
        return { 
          transform: 'perspective(700px) rotateZ(-15deg) scale(1.08)',
          title: 'มุมเอียง (Dutch / Canted Angle)',
          powerBadge: 'ความสับสน & โลกเสียสมดุล',
          desc: 'หมุนระนาบขอบฟ้าให้เอียง สะท้อนสภาวะจิตใจที่ไม่มั่นคง ความบ้าคลั่ง หรือสถานการณ์กำลังวิกฤต'
        };
      case 'birds-eye':
        return { 
          transform: 'perspective(700px) rotateX(55deg) scale(0.85)',
          title: 'มุมมองนก / เพดาน 90° (Bird’s-Eye View)',
          powerBadge: 'มุมมองพระเจ้า (God’s Perspective)',
          desc: 'ส่องลงมาจากฟากฟ้าแนวตั้งฉาก ละทิ้งความรู้สึกส่วนตัวเพื่อมองเห็นระเบียบโครงสร้างและชะตากรรม'
        };
      case 'pov':
        return { 
          transform: 'perspective(700px) translateZ(30px) scale(1.05)',
          title: 'มุมมองแทนสายตา (Point of View - POV)',
          powerBadge: 'ดึงดูดอารมณ์ร่วมขั้นสูงสุด (Subjective Camera)',
          desc: 'กล้องกลายเป็นดวงตาของตัวละคร ให้ผู้ชมสัมผัสและมองเห็นสิ่งที่ตัวละครกำลังเผชิญแบบบุคคลที่หนึ่ง'
        };
      case 'eye-level':
      default:
        return { 
          transform: 'perspective(700px) rotateX(0deg) rotateZ(0deg)',
          title: 'ระดับสายตา (Eye-Level Angle)',
          powerBadge: 'ความเสมอภาค & ความสมจริง',
          desc: 'กล้องอยู่ในระดับเดียวกับสายตามนุษย์ สร้างความรู้สึกเป็นกลาง เข้าถึงง่าย และสมจริงที่สุด'
        };
    }
  };

  const angleTransform = getAngleTransform(selectedAngleId);

  // REALISTIC CINEMATOGRAPHY MULTI-PLANE SIMULATION
  // Calculates distinct physical vs optical behavior for each technique
  const getPhysicsBasedTelemetry = (type: string, progress: number) => {
    const p = progress / 100;
    
    switch (type) {
      case 'dolly':
        return {
          cameraPosition: `รางเลื่อนพิกัด Z: -${(4.5 * (1 - p)).toFixed(1)}m (เดินหน้าเข้าหาตัวละคร)`,
          optics: 'เลนส์ทางยาวโฟกัสคงที่: 35mm Prime (ไม่มีการซูม)',
          parallax: 'Parallax สูงมาก: ฉากหน้ารูดผ่านขอบจออย่างรวดเร็ว ตัวละครขยายใหญ่ขึ้น ขณะที่ฉากหลังระยะไกลแทบไม่เปลี่ยนขนาด',
          fov: 'องศารับภาพคงที่: 63.4° (FOV คงเดิม)',
          // Multi-plane styling
          bgTransform: `scale(${1 + p * 0.08})`, // Background barely scales!
          subjectTransform: `scale(${1 + p * 0.75}) translateY(${p * 6}px)`, // Subject grows significantly
          fgTransform: `scale(${1 + p * 1.8}) translateX(${-p * 120}px) opacity(${1 - p * 0.8})`, // Foreground rushes past & exits!
          hudBadge: 'PHYSICAL DOLLY IN (รางเลื่อน 3 มิติ)',
          schematic: 'กล้องบนล้อเลื่อนวิ่งเข้าหาตัวละครบนรางเลื่อนตามแนวแกนลึก'
        };

      case 'zoom':
        const currentMm = Math.round(24 + p * 111); // 24mm to 135mm
        const currentFov = (84 - p * 66).toFixed(1); // 84 deg to 18 deg
        return {
          cameraPosition: 'ตำแหน่งกล้อง: ตรึงแน่นบนขาตั้ง Tripod (พิกัด X, Y, Z = 0m คงที่ 100%)',
          optics: `ทางยาวโฟกัสชิ้นเลนส์: ${currentMm}mm (Optical Focal Shift)`,
          parallax: 'ไม่มี Parallax (Zero Parallax): ขยายทุกระนาบในสัดส่วนเท่ากันทั้งหมด ฉากหลังถูกบีบอัดแบนราบ (Flat Compression)',
          fov: `องศารับภาพแคบลง: ${currentFov}°`,
          // Multi-plane styling: ALL LAYERS SCALE AT THE EXACT SAME OPTICAL RATIO
          bgTransform: `scale(${1 + p * 0.85})`, 
          subjectTransform: `scale(${1 + p * 0.85})`, 
          fgTransform: `scale(${1 + p * 0.85})`, 
          hudBadge: 'OPTICAL ZOOM (เลนส์เปลี่ยนโฟกัส กล้องอยู่กับที่)',
          schematic: 'กล้องตรึงนิ่ง ขาตั้งไม่ขยับ ชิ้นแก้วเลนส์ภายในเลื่อนเปลี่ยนองศารับภาพ'
        };

      case 'pan':
        const panAngle = Math.round(-35 + p * 70); // -35 to +35 degrees
        return {
          cameraPosition: 'ตำแหน่งกล้อง: ตรึงแน่นบนจุดกึ่งกลาง (หมุนเฉพาะหัวกล้อง Fluid Head แนวนอน)',
          optics: 'เลนส์ 35mm Cinema Prime',
          parallax: 'ไม่มี Parallax ตำแหน่ง: วัตถุกวาดผ่านจอเป็นวงรัศมีตามการกวาดสายตา',
          fov: `มุมหมุนระนาบกวาด: ${panAngle > 0 ? `+${panAngle}` : panAngle}° แพน${panAngle < 0 ? 'ซ้าย' : 'ขวา'}`,
          bgTransform: `translateX(${-panAngle * 3}px) scale(1.15)`,
          subjectTransform: `translateX(${-panAngle * 4.5}px) scale(1.15)`,
          fgTransform: `translateX(${-panAngle * 6}px) scale(1.15)`,
          hudBadge: `PANNING ${panAngle < 0 ? 'LEFT' : 'RIGHT'} (${panAngle}°)`,
          schematic: 'ขาตั้งกล้องอยู่กับที่ ช่างกล้องหมุนด้าม Pan Bar ในแนวนอน'
        };

      case 'tracking':
        const trackMeters = (p * 5.5).toFixed(1);
        return {
          cameraPosition: `ตำแหน่งกล้อง: เคลื่อนที่ขนานข้างไปบนราง ${trackMeters} เมตร`,
          optics: 'เลนส์ 50mm Prime (ขนานข้างตามตัวละคร)',
          parallax: 'Parallax ด้านข้างสมบูรณ์: ฉากหน้าพุ่งผ่านด้านข้างอย่างเร็ว ตัวละครถูกตรึงนิ่งกลางจอ ฉากหลังเลื่อนช้าๆ',
          fov: 'องศารับภาพคงที่: 46.8°',
          bgTransform: `translateX(${-p * 45}px) scale(1.1)`,
          subjectTransform: `translateX(${Math.sin(p * Math.PI * 6) * 3}px)`, // Character stays centered, walking cadence
          fgTransform: `translateX(${100 - p * 260}px) scale(1.2)`, // Foreground objects pass by continuously
          hudBadge: `LATERAL TRUCK SHOT (${trackMeters}m)`,
          schematic: 'กล้องวางบนรางเลื่อนยาว เคลื่อนที่ไปด้านข้างขนานกับทิศทางการเดินของตัวละคร'
        };

      case 'crane':
        const craneHeight = (1.2 + p * 6.8).toFixed(1);
        return {
          cameraPosition: `ระดับความสูงกล้อง: ${craneHeight} เมตร เหนือพื้นดิน (แขนเครน Technocrane ยกขึ้น)`,
          optics: 'เลนส์มุมกว้าง 28mm บนหัว Remote Head',
          parallax: 'Parallax แนวดิ่งและมุมมองเปิดกว้าง: ขอบฟ้าเลื่อนต่ำลง เผยให้เห็นสิ่งที่ซ่อนอยู่หลังสิ่งกีดขวาง',
          fov: 'องศารับภาพคงที่: 75.4° (เปลี่ยนความสูงและมุมก้มสด)',
          bgTransform: `translateY(${p * 45}px) scale(${1 + p * 0.15})`, // Horizon drops down
          subjectTransform: `translateY(${p * 65}px) scale(${1 - p * 0.25}) rotateX(${p * 25}deg)`, // Looking down at subject
          fgTransform: `translateY(${p * 140}px) opacity(${1 - p * 0.7})`, // Ground and foreground drop away
          hudBadge: `CRANE BOOM ELEVATION (+${craneHeight}m)`,
          schematic: 'แขนกลเครนไฮดรอลิกยกระดับกล้องลอยขึ้นสู่อากาศจากระดับพื้นสู่มุมมอง Bird’s-Eye'
        };

      case 'tilt':
        const tiltAngle = Math.round(-25 + p * 50);
        return {
          cameraPosition: 'ตำแหน่งกล้อง: อยู่กับที่ (ก้ม-เงยเฉพาะแกนตั้ง Vertical Tilt)',
          optics: 'เลนส์ 40mm Cinema Prime',
          parallax: 'ไม่มี Parallax ตำแหน่ง: เส้นเปอร์สเปกทีฟเอียงสอบเข้าหากัน (Keystoning)',
          fov: `มุมทิลต์: ${tiltAngle > 0 ? `+${tiltAngle}° (เงยขึ้น)` : `${tiltAngle}° (ก้มลง)`}`,
          bgTransform: `translateY(${tiltAngle * 3}px) scale(1.1)`,
          subjectTransform: `translateY(${tiltAngle * 4}px) scale(1.1)`,
          fgTransform: `translateY(${tiltAngle * 5}px) scale(1.1)`,
          hudBadge: `TILTING VERTICAL (${tiltAngle}°)`,
          schematic: 'ขาตั้งกล้องอยู่กับที่ ช่างกล้องคลายล็อกหัวกล้องแล้วก้ม-เงยในแนวดิ่ง'
        };

      case 'gimbal':
        const bobX = Math.sin(p * Math.PI * 4) * 8;
        const bobY = Math.cos(p * Math.PI * 8) * 4;
        return {
          cameraPosition: 'ตำแหน่งกล้อง: ตากล้องถือเคลื่อนไหวอิสระ (3-Axis Electronic Steadicam)',
          optics: 'เลนส์ 35mm Prime มีมอเตอร์กันสั่นลดแรงสะเทือนฝีเท้า',
          parallax: 'Parallax ไดนามิกแบบก้าวย่าง: ภาพนิ่งสนิทไร้รอยสั่นไหว แต่สัมผัสได้ถึงมิติการเดินทะลุผ่านพื้นที่',
          fov: 'องศารับภาพคงที่: 63.4°',
          bgTransform: `translate(${bobX * 0.4}px, ${bobY * 0.4}px) scale(1.08)`,
          subjectTransform: `translate(${bobX}px, ${bobY}px) scale(1.08)`,
          fgTransform: `translate(${bobX * 1.5}px, ${bobY * 1.5}px) scale(1.15)`,
          hudBadge: 'GIMBAL 3-AXIS STABILIZATION',
          schematic: 'ตากล้องถือกล้องพร้อมชุดกันสั่นเดินตามตัวละครอย่างนุ่มนวล'
        };

      case 'drone':
        return {
          cameraPosition: `พิกัดโดรน: บินไต่ระดับเพดานบิน ${Math.round(40 + p * 280)}m ASL ความเร็ว 45 km/h`,
          optics: 'เซนเซอร์ฟูลเฟรม 8K พร้อมเลนส์ Ultra-Wide 18mm',
          parallax: 'Parallax ภูมิประเทศสเกลมหึมา: หมุนเลี้ยวและเอียงแบบอากาศยานสามมิติ (Roll, Pitch, Yaw)',
          fov: 'องศารับภาพกว้างพิเศษ: 100°',
          bgTransform: `scale(${1 + p * 0.4}) rotate(${p * 5}deg) translateY(${-p * 20}px)`,
          subjectTransform: `scale(${1 - p * 0.5}) translateY(${p * 30}px)`,
          fgTransform: `scale(${1 + p * 0.6}) opacity(${1 - p})`,
          hudBadge: 'AERIAL DRONE QUADCRAFT',
          schematic: 'อากาศยานไร้คนขับบินโฉบกลางเวหาด้วยระบบ GPS และกิมบอล 3 แกน'
        };

      default:
        return {
          cameraPosition: 'STANDBY',
          optics: 'STANDBY',
          parallax: 'STANDBY',
          fov: 'STANDBY',
          bgTransform: 'none',
          subjectTransform: 'none',
          fgTransform: 'none',
          hudBadge: 'READY',
          schematic: ''
        };
    }
  };

  const telemetry = getPhysicsBasedTelemetry(selectedMovement.animationType, motionProgress);

  return (
    <div className="space-y-10 font-sans">
      {/* Module Title Kicker */}
      <div className="pb-2">
        <div className="text-xs font-mono text-rose-400 tracking-wider uppercase mb-1">
          SPECIALIZED CINEMATOGRAPHY LABORATORY
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          ห้องปฏิบัติการมุมกล้องและการเคลื่อนไหว (Camera Angles & Rig Movement Lab)
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed font-sans">
          ศูนย์เรียนรู้เฉพาะทางเพื่อทดลองและเข้าใจจิตวิทยาการมองผ่านมุมกล้องหลากมิติ พร้อมระบบจำลองการทำงานของอุปกรณ์เคลื่อนกล้องระดับสตูดิโอฮอลลีวูดที่มีความถูกต้องทางฟิสิกส์และทัศนศาสตร์
        </p>
      </div>

      {/* SECTION 1: Camera Angles & Visual Psychology */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>LAB SECTION 01</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              จิตวิทยามุมกล้อง (Camera Angles Psychology)
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-sans">
              มุมกล้องทำหน้าที่สร้างความสัมพันธ์เชิงอำนาจ (Power Dynamic) และสภาวะทางอารมณ์ให้แก่ตัวละคร
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-pink-400 bg-pink-950/40 border border-pink-500/30 px-2.5 py-1 rounded-lg">
              3D PERSPECTIVE SIMULATOR
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Visual 3D Viewport (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-700 shadow-inner flex items-center justify-center p-6 select-none">
            {/* 3D Container */}
            <div 
              className="w-full h-full relative transition-all duration-700 ease-out flex items-center justify-center rounded-lg overflow-hidden shadow-2xl"
              style={{
                transform: angleTransform.transform
              }}
            >
              <img
                src={selectedAngle.previewImage}
                alt={selectedAngle.nameTh}
                className="w-full h-full object-cover filter contrast-110"
                referrerPolicy="no-referrer"
              />
              {/* Studio Reticle Overlay */}
              <div className="absolute inset-0 border-2 border-rose-400/40 rounded-lg pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Viewfinder Angle Badge */}
            <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-xs font-mono text-rose-400 border border-zinc-800 backdrop-blur-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>ANGLE: {selectedAngle.nameEn.toUpperCase()}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-200">
              <span className="bg-black/80 px-2 py-0.5 rounded border border-zinc-800 text-pink-300">
                {angleTransform.powerBadge}
              </span>
              <span className="bg-black/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                CODE: {selectedAngle.code}
              </span>
            </div>
          </div>

          {/* Interactive Angles Selector (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-3 font-sans">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              เลือกจำลองมุมมองกล้อง (Click to Explore)
            </span>

            <div className="space-y-1.5">
              {CAMERA_ANGLES.map((angle) => {
                const isSelected = selectedAngleId === angle.id;
                return (
                  <button
                    key={angle.id}
                    onClick={() => {
                      setSelectedAngleId(angle.id);
                      onMarkExplored();
                    }}
                    className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500/60 text-white shadow-sm ring-1 ring-rose-500/30'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {angle.code}
                      </span>
                      <div>
                        <div className={`text-xs font-bold transition-colors ${isSelected ? 'text-pink-400' : 'text-zinc-200 group-hover:text-white'}`}>
                          {angle.nameTh}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[200px]">
                          {angle.nameEn}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                      {isSelected ? '● กำลังดู' : 'เลือก'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Angle Context Callout */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-white font-semibold">
                <span>ความหมายทางจิตวิทยา:</span>
                <span className="text-[10px] font-mono text-pink-400">{selectedAngle.nameTh}</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                {selectedAngle.psychologicalEffect}
              </p>
              <div className="text-[10px] text-pink-300/90 pt-1 border-t border-zinc-800/80">
                <strong>หน้าที่ทางภาพยนตร์:</strong> {selectedAngle.cinematicPurpose}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Realistic Camera Movement Simulation (ดอลลี่, ซูม, เครน, แทร็กกิ้ง, แพน) */}
      <div className="rounded-2xl border border-zinc-800 bg-[#15151c] p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase mb-1">
              <Video className="w-4 h-4" />
              <span>LAB SECTION 02: REAL-WORLD MOTION PHYSICS</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              การสาธิตการเคลื่อนกล้องจริง (Parallax & Optics Simulator)
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-sans">
              จำลองความแตกต่างอย่างแท้จริงระหว่างการเคลื่อนกล้องทางกายภาพ 3 มิติ (ดอลลี่, แทร็กกิ้ง, เครน) กับการปรับบนแกนขาตั้ง (ซูม, แพน, ทิลต์)
            </p>
          </div>

          {/* Filter between Stationary vs Rig Equipment */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setMovementCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                movementCategory === 'all'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ทั้งหมด (8 เทคนิค)
            </button>
            <button
              onClick={() => setMovementCategory('stationary')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                movementCategory === 'stationary'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              อยู่กับที่ (Tripod / Pan / Zoom)
            </button>
            <button
              onClick={() => setMovementCategory('rig')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                movementCategory === 'rig'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              รางเลื่อน & อุปกรณ์ (Dolly / Track / Crane)
            </button>
          </div>
        </div>

        {/* Live Multi-Plane Physics Demonstration Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Animated Multi-Plane Viewfinder Monitor (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlayingMotion ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="font-semibold text-white">REALISTIC PARALLAX STAGE (2.39:1)</span>
              </span>
              <span className="text-pink-400 font-bold">
                {telemetry.hudBadge}
              </span>
            </div>

            {/* Viewfinder Multi-Plane Canvas: Separate Background, Subject, and Foreground Layers */}
            <div className="relative aspect-[16/9] w-full bg-[#050508] rounded-lg overflow-hidden border border-zinc-700 shadow-2xl select-none">
              
              {/* LAYER 1: Deep Background Layer (Mountains, Sky, Architecture) */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
                style={{
                  transform: telemetry.bgTransform
                }}
              >
                <img
                  src={
                    selectedMovement.animationType === 'drone'
                      ? '/src/assets/images/cinematic_drone_aerial_1792597055982.jpg'
                      : '/src/assets/images/cinematic_composition_rule_thirds_1792596378308.jpg'
                  }
                  alt="Background plane"
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Atmospheric Depth Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* LAYER 2: Middle-ground Subject Layer (Actor / Subject) */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
                style={{
                  transform: telemetry.subjectTransform
                }}
              >
                {/* Visual Actor Silhouette with Rim Lighting */}
                <div className="relative flex flex-col items-center">
                  <div className="w-20 h-24 rounded-full bg-gradient-to-b from-rose-300 via-pink-400 to-purple-500 shadow-[0_0_25px_rgba(244,63,94,0.4)] border border-pink-300/60 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-zinc-950 font-bold bg-white/80 px-1 rounded">
                      ACTOR
                    </span>
                  </div>
                  <div className="w-28 h-24 -mt-3 rounded-t-3xl bg-zinc-800 border-t border-zinc-600 shadow-xl" />
                </div>
              </div>

              {/* LAYER 3: Foreground Parallax Element (Doorway / Studio Pillar / Streetlamp) */}
              {/* This layer proves whether movement is DOLLY (rushes past) vs ZOOM (scales equally) vs TRACK (moves sideways)! */}
              <div 
                className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none transition-transform duration-75 ease-out"
                style={{
                  transform: telemetry.fgTransform
                }}
              >
                {/* Foreground Left Column */}
                <div className="w-16 h-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-transparent border-r border-zinc-800/80 shadow-2xl flex flex-col justify-end p-2 opacity-90">
                  <span className="text-[8px] font-mono text-zinc-500 rotate-90 origin-bottom-left uppercase">
                    FOREGROUND PILLAR
                  </span>
                </div>
                {/* Foreground Right Element */}
                <div className="w-10 h-3/4 self-end bg-gradient-to-l from-zinc-950 via-zinc-900 to-transparent border-l border-zinc-800/80" />
              </div>

              {/* Live HUD Telemetry Overlays */}
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono text-rose-400 bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-zinc-800">
                  <span className="font-bold">{telemetry.optics}</span>
                  <span className="text-zinc-300">{telemetry.fov}</span>
                </div>

                {/* Center Parallax Physics Callout */}
                <div className="self-center bg-black/85 border border-pink-500/50 px-3.5 py-1.5 rounded-full text-xs font-mono text-pink-300 shadow-xl backdrop-blur-md">
                  {isPlayingMotion ? `RECORDING: ${motionProgress}% COMPLETE` : 'กดเริ่มสาธิตเพื่อสังเกตการเคลื่อนที่จริง'}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-zinc-800">
                  <span className="text-emerald-400 font-bold">{telemetry.cameraPosition}</span>
                  <span>24.00 FPS · 35MM SENSOR</span>
                </div>
              </div>
            </div>

            {/* Live Play Simulation Controls & Physical Progress */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartMotion}
                    disabled={isPlayingMotion}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 active:opacity-90 disabled:opacity-50 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-rose-600/30"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isPlayingMotion ? 'กำลังบันทึกและเลื่อนกล้องจริง...' : `สาธิตการเคลื่อนที่: ${selectedMovement.nameTh}`}</span>
                  </button>

                  <button
                    onClick={handleResetMotion}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="รีเซ็ตตำแหน่งกลับจุดเริ่มต้น"
                    aria-label="Reset motion"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-mono text-rose-400 font-bold">
                  ความคืบหน้า: {motionProgress}%
                </span>
              </div>

              {/* Progress Track Bar */}
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 transition-all duration-75"
                  style={{ width: `${motionProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Physics Reality & Technical Breakdown (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0f0f14] border border-zinc-800 p-5 flex flex-col justify-between space-y-4 font-sans">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-rose-400 font-bold">
                  {selectedMovement.nameEn}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-pink-300 border border-zinc-700">
                  {selectedMovement.category === 'stationary' ? 'ขาตั้งกล้องอยู่กับที่' : 'อุปกรณ์เคลื่อนตำแหน่ง 3 มิติ'}
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-2">
                {selectedMovement.nameTh}
              </h4>

              {/* Scientific Parallax Reality Callout */}
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 mb-3 space-y-1.5">
                <div className="font-semibold text-pink-400 flex items-center gap-1.5 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5 text-rose-400" />
                  <span>หลักการทางทัศนศาสตร์และความจริง (Physical Reality):</span>
                </div>
                <p className="leading-relaxed text-[11px] text-zinc-300">
                  {telemetry.parallax}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <strong className="text-white block mb-0.5 text-[11px]">ผังการทำงานของอุปกรณ์ (How It Works):</strong>
                  <span className="text-zinc-300 text-[11px] leading-relaxed">
                    {telemetry.schematic}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <strong className="text-white block mb-0.5 text-[11px]">ความรู้สึกของผู้ชม (Psychological Impact):</strong>
                  <span className="text-zinc-300 text-[11px] leading-relaxed">
                    {selectedMovement.psychologicalImpact}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <strong className="text-white block mb-0.5 text-[11px]">อุปกรณ์ถ่ายทำจริง:</strong>
                  <span className="text-pink-300 font-mono text-[11px]">
                    {selectedMovement.gearType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON SANDBOX: DOLLY VS ZOOM PARALLAX SHOWCASE */}
        <div className="mt-6 p-5 rounded-xl bg-[#0c0c11] border border-pink-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400 font-bold">
                <Scale className="w-4 h-4 text-rose-400" />
                <span>โหมดเปรียบเทียบคู่สำคัญในประวัติศาสตร์ภาพยนตร์: DOLLY VS ZOOM</span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                คลิกสลับเพื่อดูว่าทำไม "การซูม" จึงแตกต่างจาก "การดอลลี่" อย่างสิ้นเชิง
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedMovementId('dolly');
                  setIsPlayingMotion(true);
                  onMarkExplored();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedMovementId === 'dolly'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                1. ดูดอลลี่ (เคลื่อนที่จริง)
              </button>
              <button
                onClick={() => {
                  setSelectedMovementId('zoom');
                  setIsPlayingMotion(true);
                  onMarkExplored();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedMovementId === 'zoom'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                2. ดูซูม (เลนส์ขยาย)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-xl border transition-all ${selectedMovementId === 'dolly' ? 'bg-rose-950/20 border-rose-500/50' : 'bg-zinc-900/60 border-zinc-800'}`}>
              <div className="font-bold text-rose-400 text-sm mb-1">
                การดอลลี่ (Dolly In / Out) — เคลื่อนที่ทางกายภาพ
              </div>
              <ul className="text-zinc-300 text-[11px] space-y-1.5 list-disc list-inside">
                <li>กล้องเคลื่อนย้ายพิกัด 3 มิติเข้าหาตัวละครจริงๆ</li>
                <li><strong className="text-white">เกิดปรากฏการณ์ Parallax:</strong> เสาฉากหน้าพุ่งผ่านเลนส์หลุดออกไป ขณะที่ฉากหลังยังอยู่ไกลเท่าเดิม</li>
                <li>ทำให้ผู้ชมรู้สึกเหมือน "ก้าวเท้าเข้าไปในห้อง" สัมผัสถึงความลึกจริง</li>
              </ul>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${selectedMovementId === 'zoom' ? 'bg-purple-950/20 border-purple-500/50' : 'bg-zinc-900/60 border-zinc-800'}`}>
              <div className="font-bold text-purple-400 text-sm mb-1">
                การซูม (Zoom In / Out) — เลนส์เปลี่ยนทางยาวโฟกัส
              </div>
              <ul className="text-zinc-300 text-[11px] space-y-1.5 list-disc list-inside">
                <li>กล้องตรึงนิ่งอยู่บนขาตั้ง ณ จุดเดิม ไม่ได้เคลื่อนที่แม้แต่เซนติเมตรเดียว</li>
                <li><strong className="text-white">ไม่มี Parallax (Zero Parallax):</strong> ภาพถูกครอปขยายพร้อมกันทุกระนาบ</li>
                <li>ฉากหลังจะถูกบีบอัดเข้าหาตัวละคร (Background Compression) ให้ความรู้สึกเหมือนมองผ่านกล้องส่องทางไกล</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Grid of All 8 Movements */}
        <div className="space-y-3 pt-4 border-t border-zinc-800 font-sans">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              เลือกเทคนิคการเคลื่อนไหวเพื่อทดลองสาธิต:
            </span>
            <span className="text-xs font-mono text-pink-400">
              คลิกเพื่อสลับและดูความต่างจริง
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredMovements.map((move) => {
              const isSelected = selectedMovementId === move.id;
              return (
                <button
                  key={move.id}
                  onClick={() => {
                    setSelectedMovementId(move.id);
                    setIsPlayingMotion(false);
                    setMotionProgress(0);
                    onMarkExplored();
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500 text-white shadow-md ring-1 ring-rose-500/40'
                      : 'bg-[#0f0f14] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-pink-400">{move.nameTh.split(' ')[0]}</span>
                    <span className="text-[9px] font-mono text-zinc-500">{move.category === 'stationary' ? 'FIXED' : 'RIG'}</span>
                  </div>
                  <div className="text-[11px] text-zinc-300 truncate font-medium">
                    {move.nameEn.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate mt-1">
                    {move.gearType.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
