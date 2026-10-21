export interface ShotSizeItem {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  summary: string;
  description: string;
  storytellingPurpose: string;
  emotionalImpact: string;
  recommendedLens: string;
  humanCutPoint: string;
  jointWarning: string;
  category: 'wide' | 'medium' | 'close';
  image: string;
  scaleHeightPercent: number; // Viewfinder crop height percentage (100 = full scene ELS, down to 10 = ECU)
  scaleCenterY: number; // Viewfinder center Y percentage (0 = top, 100 = bottom)
  colorCode: string;
}

export const SHOT_SIZES: ShotSizeItem[] = [
  {
    id: 'els',
    code: 'ELS',
    nameTh: 'ภาพไกลสุดขีด',
    nameEn: 'Extreme Long Shot (Extreme Wide Shot)',
    summary: 'เน้นสภาพแวดล้อมรอบตัวขนาดมหึมา บุคคลมีขนาดเล็กมากในเฟรมภาพ',
    description: 'ภาพในระยะนี้ถูกถ่ายจากระยะไกลมาก โดยเน้นการแสดงภูมิทัศน์ โครงสร้างสถาปัตยกรรม หรือบรรยากาศของสถานที่ ตัวละครหรือบุคคลจะปรากฏเป็นสัดส่วนเล็กๆ ไม่เกิน 5-10% ของเฟรมภาพ นิยมใช้เป็น Establishing Shot ตอนเปิดฉากเพื่อบอกว่าเหตุการณ์เกิดขึ้นที่ไหนและเวลาใด',
    storytellingPurpose: 'บอกบริบทสถานที่และเวลา (Establishing Shot), แสดงความยิ่งใหญ่ของธรรมชาติเทียบกับมนุษย์ หรือแสดงการเดินทางข้ามแดนไกล',
    emotionalImpact: 'สร้างความรู้สึกโดดเดี่ยว อ้างว้าง ไร้พลัง หรือความแปลกแยกจากสิ่งแวดล้อมรอบกาย',
    recommendedLens: 'เลนส์มุมกว้าง 14mm – 24mm (Ultra-Wide Lens) เพื่อเก็บขอบเขตพื้นที่ให้กว้างที่สุด',
    humanCutPoint: 'มองเห็นร่างกายมนุษย์ครบทั้งตัวในสเกลที่เล็กมาก เท้าแตะพื้นโดยมีพื้นที่ภูมิประเทศแวดล้อมกว้างขวางรอบตัว',
    jointWarning: 'เนื่องจากสเกลตัวคนเล็กมาก ไม่ควรมีสิ่งกีดขวางระดับสายตาที่บังลำตัวคนจนกลายเป็นจุดรบกวน',
    category: 'wide',
    image: '/src/assets/images/cinematic_shot_els_1792596378390.jpg',
    scaleHeightPercent: 100,
    scaleCenterY: 55,
    colorCode: '#0284c7'
  },
  {
    id: 'ls',
    code: 'LS',
    nameTh: 'ภาพระยะไกล / เต็มตัว',
    nameEn: 'Long Shot / Wide Shot (Full Shot)',
    summary: 'มองเห็นร่างกายมนุษย์ตั้งแต่ศีรษะจรดปลายเท้าอย่างสมบูรณ์แบบ',
    description: 'ภาพระยะไกลหรือภาพเต็มตัว (Full Shot) เป็นระยะที่บุคคลปรากฏเต็มความสูงของเฟรมภาพตั้งแต่ปลายเท้าจนถึงศีรษะ โดยยังคงมีพื้นที่ Headroom ด้านบนและพื้นดินด้านล่าง ให้ผู้ชมได้เห็นกิริยาท่าทาง เครื่องแต่งกาย และความสัมพันธ์เบื้องต้นระหว่างบุคคลกับสิ่งรอบข้าง',
    storytellingPurpose: 'แสดงภาษากาย กิจกรรม การเดิน การต่อสู้ หรือความสัมพันธ์เชิงพื้นที่ระหว่างตัวละครหลายตัว',
    emotionalImpact: 'ให้ความรู้สึกเป็นกลาง ผู้ชมเป็นผู้สังเกตการณ์ที่มองเห็นการกระทำทั้งหมดอย่างเป็นรูปธรรม',
    recommendedLens: '28mm – 35mm (Standard Wide Lens) สัดส่วนภาพดูเป็นธรรมชาติโดยไม่บิดเบี้ยว',
    humanCutPoint: 'ตัดขอบล่างที่ใต้ฝ่าเท้า และมี Headroom พอเหมาะเหนือศีรษะ ไม่ตัดเฉือนอวัยวะใดๆ',
    jointWarning: 'ห้ามตัดขอบเฟรมตรงข้อเท้า (Ankles) หรือปลายนิ้วเท้า เพราะจะทำให้ตัวละครดูเหมือนลอยเคว้งหรือไม่สมส่วน',
    category: 'wide',
    image: '/src/assets/images/cinematic_composition_rule_thirds_1792596378308.jpg',
    scaleHeightPercent: 78,
    scaleCenterY: 50,
    colorCode: '#0ea5e9'
  },
  {
    id: 'ms',
    code: 'MS',
    nameTh: 'ภาพระยะปานกลาง',
    nameEn: 'Medium Shot (Waist Shot)',
    summary: 'ตัดขอบภาพบริเวณเอวขึ้นไปถึงศีรษะ เป็นระยะภาพที่พบมากที่สุดในภาพยนตร์',
    description: 'ภาพระยะปานกลางครอบคลุมร่างกายตั้งแต่เอว (Waist) ขึ้นไปจนถึงศีรษะ เป็นระยะการมองเห็นที่ใกล้เคียงกับการสนทนาระหว่างบุคคลในชีวิตประจำวัน ช่วยให้ผู้ชมเห็นทั้งสีหน้า การขยับมือ และพื้นที่ข้างเคียงได้อย่างลงตัว',
    storytellingPurpose: 'ใช้ในฉากสนทนา (Dialogue Scene), การเคลื่อนไหวมือ และการแสดงออกที่ต้องการความสมดุลระหว่างการกระทำกับอารมณ์',
    emotionalImpact: 'สร้างความเป็นมิตร ความเข้าถึงง่าย และความรู้สึกคุ้นเคยเหมือนยืนคุยอยู่ข้างๆ ตัวละคร',
    recommendedLens: '35mm – 50mm (Standard Prime Lens) มอบมิติและมุมมองที่ใกล้เคียงสายตามนุษย์มากที่สุด',
    humanCutPoint: 'ตัดขอบล่างที่บริเวณระดับเอว (เหนือสะโพกเล็กน้อย) ไม่ตัดตรงหัวเหน่าหรือข้อสะโพก',
    jointWarning: 'ห้ามตัดผ่านข้อมือหรือข้อศอก หากตัวละครปล่อยแขนลง ให้ตัดเหนือหรือใต้จุดข้อศอกเล็กน้อย',
    category: 'medium',
    image: '/src/assets/images/hero_cinestudio_directing_1792596377688.jpg',
    scaleHeightPercent: 52,
    scaleCenterY: 38,
    colorCode: '#f59e0b'
  },
  {
    id: 'mcu',
    code: 'MCU',
    nameTh: 'ภาพใกล้ปานกลาง',
    nameEn: 'Medium Close-Up (Bust Shot)',
    summary: 'ตัดขอบภาพบริเวณระดับหน้าอกหรือหัวไหล่ขึ้นไปถึงศีรษะ เน้นสีหน้าควบคู่กับไหล่',
    description: 'ภาพระดับหน้าอกหรือช่วงบนของลำตัว (Bust Shot) เป็นการขยับกล้องเข้ามาใกล้เพื่อลดการรบกวนของสภาพแวดล้อม และดึงความสนใจของผู้ชมไปที่สีหน้า แววตา และการถ่ายทอดคำพูด เป็นระยะภาพมาตรฐานสำหรับการสัมภาษณ์และบทสนทนาเข้มข้น',
    storytellingPurpose: 'ใช้เน้นการสนทนาที่จริงจัง ถ่ายทอดปฏิกิริยาตอบรับ (Reaction Shot) หรือการนำเสนอข่าว/สารคดี',
    emotionalImpact: 'เพิ่มระดับความผูกพันและการมีส่วนร่วมทางอารมณ์ ผู้ชมเริ่มสัมผัสได้ถึงความรู้สึกภายในของตัวละคร',
    recommendedLens: '50mm – 85mm (Portrait Lens) เพื่อละลายฉากหลังเบาๆ และรักษาสัดส่วนใบหน้าให้สวยงาม',
    humanCutPoint: 'ตัดขอบล่างที่ระดับราวนมหรือรักแร้ (Mid-Chest / Upper Torso)',
    jointWarning: 'ระวังอย่าตัดขอบล่างตรงกระดูกไหปลาร้าหรือลำคอ เพราะจะทำให้ศีรษะดูเหมือนขาดลอย',
    category: 'medium',
    image: '/src/assets/images/cinematic_shot_cu_1792596378215.jpg',
    scaleHeightPercent: 36,
    scaleCenterY: 28,
    colorCode: '#f97316'
  },
  {
    id: 'cu',
    code: 'CU',
    nameTh: 'ภาพระยะใกล้',
    nameEn: 'Close-Up Shot (Head Shot)',
    summary: 'เน้นใบหน้าของตัวละครตั้งแต่คางจรดศีรษะ ถ่ายทอดอารมณ์ความรู้สึกอย่างลึกซึ้ง',
    description: 'ภาพระยะใกล้จัดวางใบหน้าของตัวละครให้ครองพื้นที่ส่วนใหญ่ของเฟรมภาพ ตั้งแต่คาง ลำคอส่วนบน ไปจนถึงทรงผม ทำให้ผู้ชมสังเกตเห็นการเปลี่ยนแปลงทางอารมณ์ที่ละเอียดอ่อน เช่น น้ำตาคลอ การกระตุกของมุมปาก หรือแววตาที่สับสน',
    storytellingPurpose: 'ช่วงเวลาสำคัญของเนื้อเรื่อง (Dramatic Climax), การเปิดเผยความลับในใจ หรือการตัดสินใจที่เด็ดขาด',
    emotionalImpact: 'ดึงดูดความรู้สึกร่วมอย่างสูงสุด (High Empathy), สร้างความใกล้ชิด ความตึงเครียด หรือความกดดัน',
    recommendedLens: '85mm – 105mm (Telephoto Prime Lens) ช่วยให้สัดส่วนใบหน้าถูกต้อง ละลายฉากหลังคมชัด',
    humanCutPoint: 'ตัดขอบล่างใต้คางเล็กน้อย (ระดับลูกกระเดือกหรือคอเสื้อ) และตัดขอบบนเหนือศีรษะหรือเล็มขอบผมเล็กน้อย',
    jointWarning: 'ห้ามตัดขอบภาพที่รอยต่อลำคอพอดี (Neckline Cut) จนแลดูผิดธรรมชาติ',
    category: 'close',
    image: '/src/assets/images/cinematic_shot_cu_1792596378215.jpg',
    scaleHeightPercent: 24,
    scaleCenterY: 20,
    colorCode: '#ef4444'
  },
  {
    id: 'ecu',
    code: 'ECU',
    nameTh: 'ภาพใกล้สุดขีด',
    nameEn: 'Extreme Close-Up (Detail Shot / Macro)',
    summary: 'เจาะจงเฉพาะส่วนใดส่วนหนึ่ง เช่น ดวงตา ริมฝีปาก กุญแจ หรือหยดน้ำตา',
    description: 'ภาพระยะใกล้ที่สุดในศาสตร์ภาพยนตร์ โดยซูมเข้าไปยังรายละเอียดเฉพาะเจาะจงเพียงชิ้นเดียว เช่น ดวงตาที่เบิกกว้าง นิ้วมือที่กดชนวนระเบิด หรือตัวหนังสือในจดหมายลับ ตัดสิ่งอื่นในฉากออกไปทั้งหมดเพื่อให้เกิดสมาธิขั้นสูงสุด',
    storytellingPurpose: 'ชี้เบาะแสสำคัญ (Plot Point Reveal), สร้างความตื่นเต้นระทึกขวัญ (Suspense), หรือเน้นสัญญะทางจิตวิทยา',
    emotionalImpact: 'สร้างความอึดอัด ตื่นเต้น หวาดระแวง และรู้สึกเหมือนกำลังส่องเข้าไปในจิตใต้สำนึกของตัวละคร',
    recommendedLens: '100mm – 135mm Macro Lens สำหรับการโฟกัสระยะประชิดและการแยกแยะวัตถุคมชัดสูงสุด',
    humanCutPoint: 'เจาะเฉพาะดวงตาสองข้าง คิ้ว หรือริมฝีปาก กรอบภาพตัดผ่านหน้าผากและแก้มโดยตรง',
    jointWarning: 'การจัดแสงและการโฟกัสต้องแม่นยำระดับมิลลิเมตร หากหลุดโฟกัสเพียงเล็กน้อยภาพจะไม่สามารถใช้งานได้',
    category: 'close',
    image: '/src/assets/images/cinematic_shot_cu_1792596378215.jpg',
    scaleHeightPercent: 12,
    scaleCenterY: 18,
    colorCode: '#ec4899'
  }
];

export interface CompositionPrinciple {
  id: string;
  nameTh: string;
  nameEn: string;
  headline: string;
  explanation: string;
  keyRule: string;
  mistakeToAvoid: string;
  proTip: string;
}

export const COMPOSITION_PRINCIPLES: CompositionPrinciple[] = [
  {
    id: 'rule-of-thirds',
    nameTh: 'กฎสามส่วน',
    nameEn: 'Rule of Thirds',
    headline: 'การวางจุดสนใจ ณ จุดตัด 9 ช่อง เพื่อสร้างพลังและทิศทางสายตา',
    explanation: 'แบ่งเฟรมภาพออกเป็น 9 ช่องเท่าๆ กันด้วยเส้นแนวนอน 2 เส้น และเส้นแนวตั้ง 2 เส้น จุดที่เส้นตัดกัน 4 จุด เรียกว่า "จุดตัดทองคำ (Power Points)" การวางสายตา ใบหน้า หรือวัตถุสำคัญไว้บนเส้นหรือจุดตัดเหล่านี้ ทำให้ภาพดูมีชีวิตชีวาและน่าดึงดูดใจมากกว่าการวางตรงกลางอย่างเรียบง่าย',
    keyRule: 'วางระดับสายตาตัวละครไว้ที่เส้นแนวนอนบนสุด (Upper Third Line) และวางแกนลำตัวไว้ที่เส้นแนวตั้งซ้ายหรือขวา',
    mistakeToAvoid: 'อย่าวางเส้นขอบฟ้าผ่ากลางภาพครึ่งต่อครึ่ง หรือวางศีรษะไว้ตรงกลางจุดกึ่งกลางแบบตายตัว (Dead Center)',
    proTip: 'ใช้จุดตัดบนซ้ายหรือบนขวาสำหรับดวงตาของตัวละครเพื่อเชื่อมต่ออารมณ์กับผู้ชมอย่างทรงพลังที่สุด'
  },
  {
    id: 'headroom',
    nameTh: 'ระยะขอบบนศีรษะ',
    nameEn: 'Headroom',
    headline: 'พื้นที่ว่างระหว่างยอดศีรษะตัวละครกับขอบบนของเฟรมภาพ',
    explanation: 'Headroom คือช่องว่างด้านบนที่ทำให้ตัวละครดูมีอากาศหายใจอย่างเหมาะสม ไม่รู้สึกอึดอัด หากเว้นมากเกินไป ลำตัวตัวละครจะตกไปอยู่ก้นจอจนดูไร้น้ำหนัก แต่หากเว้นน้อยเกินไปหรือตัดโดนกระหม่อมในระยะที่ไม่เหมาะสม จะทำให้ภาพดูอึดอัดจนเกินไป',
    keyRule: 'ในภาพระยะปานกลาง (MS/MCU) ควรเว้นช่องว่างประมาณ 10-15% ของความสูงภาพ หากเป็นระยะใกล้มาก (CU/ECU) สามารถตัดเล็มปลายผมได้โดยเจตนา',
    mistakeToAvoid: 'อย่าปล่อยให้มีช่องว่างบนเพดานมากเกินไป (Excessive Headroom) ซึ่งมักเป็นข้อผิดพลาดของมือใหม่',
    proTip: 'สังเกตระดับสายตา (Eye Line) เป็นหลัก ถ้าระดับสายตาอยู่ที่เส้น 1 ใน 3 ด้านบน Headroom จะลงตัวโดยอัตโนมัติ'
  },
  {
    id: 'looking-room',
    nameTh: 'ระยะทิศทางการมอง / ระยะนำสายตา',
    nameEn: 'Looking Room / Lead Room / Nose Room',
    headline: 'พื้นที่ว่างในทิศทางที่ตัวละครกำลังมองหรือกำลังเคลื่อนที่ไป',
    explanation: 'เมื่อตัวละครหันหน้าหรือมองไปทางซ้าย ควรจัดวางตัวละครไว้ทางฝั่งขวาของเฟรมภาพ เพื่อเว้นพื้นที่ว่างทางซ้ายให้สายตาสามารถมองทะลุออกไปได้ พื้นที่ว่างนี้เรียกว่า Looking Room หรือ Nose Room ช่วยให้ผู้ชมสัมผัสได้ถึงความคิด สิ่งที่มอง หรือสิ่งที่กำลังจะเกิดขึ้นข้างหน้า',
    keyRule: 'เว้นสัดส่วนพื้นที่ว่างด้านหน้าสายตาประมาณ 2 ใน 3 ของความกว้าง และให้ด้านหลังศีรษะมีพื้นที่ 1 ใน 3',
    mistakeToAvoid: 'อย่าวางตัวละครชิดขอบภาพในทิศทางที่กำลังมอง เพราะจะทำให้ดูเหมือนกำลังจ้องกำแพง (Dead Wall Trapping)',
    proTip: 'การจงใจตัด Looking Room ออก (Negative Lead Room) นิยมใช้เมื่อต้องการสื่อถึงความรู้สึกอับจนหนทาง ติดกับดัก หรือกำลังถูกสะกดรอยตาม'
  }
];

export interface CameraAngle {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  psychologicalEffect: string;
  cinematicPurpose: string;
  cinemaExample: string;
  previewImage: string;
}

export const CAMERA_ANGLES: CameraAngle[] = [
  {
    id: 'eye-level',
    code: 'EYE',
    nameTh: 'ระดับสายตา',
    nameEn: 'Eye-Level Angle (Neutral View)',
    psychologicalEffect: 'สร้างความรู้สึกสมจริง เป็นกลาง เสมอภาค และเป็นธรรมชาติ ดึงให้ผู้ชมรู้สึกเหมือนยืนอยู่ต่อหน้าตัวละครอย่างเท่าเทียม',
    cinematicPurpose: 'ใช้ในฉากสนทนาทั่วไป การสร้างความผูกพัน และการนำเสนอเรื่องราวที่เป็นรูปธรรมและเข้าถึงง่าย',
    cinemaExample: 'ฉากพูดคุยในโต๊ะอาหาร ละครแนวดราม่าชีวิต และสารคดีเชิงลึก',
    previewImage: '/src/assets/images/cinematic_shot_cu_1792596378215.jpg'
  },
  {
    id: 'low-angle',
    code: 'LOW',
    nameTh: 'มุมต่ำ (แหงนมอง)',
    nameEn: 'Low Angle (Dominance & Power)',
    psychologicalEffect: 'ทำให้ตัวละครดูมีอำนาจ ทรงพลัง น่าเกรงขาม คุกคาม หรือดูเป็นวีรบุรุษผู้ยิ่งใหญ่ที่ยืนเหนือสถานการณ์',
    cinematicPurpose: 'เสริมสร้างบารมีของผู้นำ การเปิดตัวศัตรูตัวฉกาจ หรือแสดงชัยชนะในจุดพลิกผันของเรื่อง',
    cinemaExample: 'ฉากเปิดตัว Batman ยืนตระหง่านบนยอดตึก หรือผู้บริหารในภาพยนตร์การเมือง',
    previewImage: '/src/assets/images/hero_cinestudio_directing_1792596377688.jpg'
  },
  {
    id: 'high-angle',
    code: 'HIGH',
    nameTh: 'มุมสูง (ก้มมอง)',
    nameEn: 'High Angle (Vulnerability & Weakness)',
    psychologicalEffect: 'ทำให้ตัวละครดูตัวเล็กลง เปราะบาง ไร้อำนาจ ไร้ทางสู้ สับสน หรือตกเป็นเหยื่อของการถูกคุกคาม',
    cinematicPurpose: 'ลดทอนอำนาจของตัวละคร เน้นย้ำความสูญเสีย ความสิ้นหวัง หรือการติดกับดักในพื้นที่จำกัด',
    cinemaExample: 'ฉากตัวละครนั่งกอดเข่าร้องไห้คนเดียว หรือฉากผู้ต้องหาถูกสอบสวนอย่างหนักหน่วง',
    previewImage: '/src/assets/images/cinematic_composition_rule_thirds_1792596378308.jpg'
  },
  {
    id: 'birds-eye',
    code: 'BIRD',
    nameTh: 'มุมมองจากฟากฟ้า (ตามองนก)',
    nameEn: "Bird's-Eye View / Overhead (God's Perspective)",
    psychologicalEffect: 'ให้มุมมองแบบพระเจ้า (God’s View) ผู้ชมมองเห็นภาพรวมทางภูมิศาสตร์ ชะตากรรม และการเคลื่อนที่ราวกับหมากบนกระดาน',
    cinematicPurpose: 'แสดงโครงสร้างเรขาคณิตของฉาก การค้นพบร่องรอย หรือแสดงชะตากรรมที่ไม่อาจหลีกเลี่ยงได้',
    cinemaExample: 'ฉากตรวจสถานที่เกิดเหตุจากเพดาน 90° หรือการเดินในเขาวงกตขนาดยักษ์',
    previewImage: '/src/assets/images/cinematic_drone_aerial_1792597055982.jpg'
  },
  {
    id: 'pov',
    code: 'POV',
    nameTh: 'มุมมองแทนสายตา (มุมมองบุคคลที่หนึ่ง)',
    nameEn: 'POV Shot (Point of View / Subjective Camera)',
    psychologicalEffect: 'ดึงให้ผู้ชมสวมวิญญาณเป็นตัวละครโดยตรง สัมผัสสิ่งที่ตัวละครเห็นและรู้สึกแบบเรียลไทม์ (High Immersion)',
    cinematicPurpose: 'สร้างความระทึกขวัญ ประสบการณ์เฉียดตาย การส่องผ่านกล้องส่องทางไกล หรืออาการตามัว/เมาสุรา',
    cinemaExample: 'ฉากตัวละครยื่นมือเปิดประตูในความมืด, มุมมองผ่านหน้ากาก Iron Man หรือมุมมองสไนเปอร์',
    previewImage: '/src/assets/images/cinematic_pov_shot_1792597055563.jpg'
  },
  {
    id: 'dutch-angle',
    code: 'DUTCH',
    nameTh: 'มุมเอียง / มุมดัตช์',
    nameEn: 'Dutch Angle (Canted / Instability)',
    psychologicalEffect: 'สร้างความรู้สึกไม่มั่นคง สับสน วิตกกังวล จิตใจปั่นป่วน หรือโลกกำลังสูญเสียสมดุลทางตรรกะ',
    cinematicPurpose: 'สื่อถึงความวิกลจริต อาการมึนเมา การถูกทรยศ หรืออันตรายที่กำลังคืบคลานเข้ามา',
    cinemaExample: 'ฉาก Joker วางแผนการร้ายใน Gotham หรือภาพยนตร์แนวจิตวิทยา สืบสวนสอบสวน',
    previewImage: '/src/assets/images/cinematic_shot_cu_1792596378215.jpg'
  }
];

export interface CameraMovementItem {
  id: string;
  nameTh: string;
  nameEn: string;
  category: 'stationary' | 'rig';
  gearType: string;
  description: string;
  psychologicalImpact: string;
  useCase: string;
  animationType: 'pan' | 'tilt' | 'zoom' | 'dolly' | 'tracking' | 'crane' | 'gimbal' | 'drone';
}

export const CAMERA_MOVEMENTS_EXPANDED: CameraMovementItem[] = [
  // 1. การเคลื่อนกล้องแบบอยู่กับที่ (Stationary)
  {
    id: 'pan',
    nameTh: 'แพน (กวาดซ้าย-ขวา)',
    nameEn: 'Pan (Horizontal Sweep)',
    category: 'stationary',
    gearType: 'หัวขาตั้งกล้อง (Fluid Tripod Head)',
    description: 'ตัวขาตั้งกล้องตั้งอยู่กับที่ หมุนเฉพาะส่วนหัวกล้องไปในแนวนอนจากซ้ายไปขวา (Pan Right) หรือขวาไปซ้าย (Pan Left)',
    psychologicalImpact: 'เลียนแบบการหันศีรษะของมนุษย์ เพื่อสำรวจสิ่งแวดล้อมหรือเชื่อมโยงความสัมพันธ์ระหว่างสองสิ่งที่อยู่ห่างกัน',
    useCase: 'ติดตามบุคคลที่กำลังเดินผ่าน หรือกวาดสายตาชมทัศนียภาพกว้างใหญ่',
    animationType: 'pan'
  },
  {
    id: 'tilt',
    nameTh: 'ทิลต์ (ก้ม-เงย)',
    nameEn: 'Tilt (Vertical Sweep)',
    category: 'stationary',
    gearType: 'หัวขาตั้งกล้อง (Fluid Tripod Head)',
    description: 'ตัวขาตั้งกล้องอยู่กับที่ หมุนส่วนหัวกล้องขึ้นด้านบน (Tilt Up) หรือก้มลงด้านล่าง (Tilt Down)',
    psychologicalImpact: 'สร้างความรู้สึกตื่นตาตื่นใจต่อความสูง หรือเปิดเผยความลับของตัวละครจากล่างขึ้นบน',
    useCase: 'สำรวจความสูงตระหง่านของตึกระฟ้า หรือเปิดตัวตัวละครเริ่มจากรองเท้าขึ้นไปจนถึงสายตา',
    animationType: 'tilt'
  },
  {
    id: 'zoom',
    nameTh: 'ซูม (ปรับทางยาวโฟกัส)',
    nameEn: 'Zoom (Optical Focal Shift)',
    category: 'stationary',
    gearType: 'เลนส์ซูมปรับระยะ (Cinema Zoom Lens)',
    description: 'กล้องอยู่กับที่ ชิ้นเลนส์ภายในเคลื่อนที่เปลี่ยนทางยาวโฟกัสเพื่อดึงภาพเข้ามาใกล้ (Zoom In) หรือดันภาพออกไปกว้าง (Zoom Out)',
    psychologicalImpact: 'เน้นจุดสนใจอย่างฉับพลัน (Crash Zoom) หรือทำให้ผู้ชมรู้สึกเหมือนกำลังเพ่งสมาธิไปยังวัตถุชิ้นเดียว',
    useCase: 'การค้นพบหลักฐานช็อคความรู้สึก หรือใช้ร่วมกับดอลลี่ทำเทคนิค Dolly Zoom (Vertigo Effect)',
    animationType: 'zoom'
  },

  // 2. การใช้อุปกรณ์เคลื่อนตำแหน่งกล้อง (Rig / Dynamic Gear)
  {
    id: 'dolly',
    nameTh: 'ดอลลี่ (เคลื่อนเข้า-ออกบนราง)',
    nameEn: 'Dolly Shot (Track & Platform)',
    category: 'rig',
    gearType: 'รถดอลลี่และรางเลื่อน (Dolly Track & Wheels)',
    description: 'เคลื่อนย้ายตัวกล้องทั้งหมดทางกายภาพบนรางล้อเลื่อน เดินหน้าเข้าหาตัวละคร (Dolly In) หรือถอยหลังออกจากตัวละคร (Dolly Out)',
    psychologicalImpact: 'ดึงอารมณ์ร่วมให้ผู้ชมเข้าไปใกล้ชิดกับความคิดและโลกภายในของตัวละครอย่างนุ่มนวลและเป็นธรรมชาติ',
    useCase: 'ช่วงเวลาที่ตัวละครกำลังตัดสินใจครั้งสำคัญ หรือการค่อยๆ ถอยห่างเพื่อสื่อถึงความโดดเดี่ยว',
    animationType: 'dolly'
  },
  {
    id: 'tracking',
    nameTh: 'แทร็กกิ้ง / ทรัค (เคลื่อนขนานด้านข้าง)',
    nameEn: 'Tracking / Truck Shot',
    category: 'rig',
    gearType: 'รางสไลเดอร์ / รถเลื่อน (Slider / Track Rig)',
    description: 'เคลื่อนย้ายตัวกล้องไปด้านข้างในระนาบขนานไปกับทิศทางการเดินหรือการเคลื่อนที่ของตัวละคร',
    psychologicalImpact: 'ให้ความรู้สึกว่าผู้ชมกำลังก้าวเดินเคียงข้างไปกับตัวละครตลอดการเดินทาง',
    useCase: 'ฉากเดินสนทนายาวๆ (Walk and Talk Scene) หรือฉากวิ่งไล่ล่าบนทางเท้า',
    animationType: 'tracking'
  },
  {
    id: 'crane',
    nameTh: 'เครน / จิ๊บ (ยกระดับกลางอากาศ)',
    nameEn: 'Crane / Jib / Boom Shot',
    category: 'rig',
    gearType: 'แขนกลยึดกล้องไฮดรอลิก (Technocrane & Jib Arm)',
    description: 'ติดตั้งกล้องไว้ที่ปลายแขนเครนขนาดยาว สามารถยกกล้องลอยขึ้นสูงในแนวดิ่งหรือร่อนผ่านอุปสรรคได้อย่างอิสระ',
    psychologicalImpact: 'สร้างความยิ่งใหญ่อลังการ ยกระดับอารมณ์สู่ความประทับใจขั้นสุด หรือเผยให้เห็นความกว้างใหญ่ของสมรภูมิ',
    useCase: 'ฉากเปิดหรือปิดภาพยนตร์ที่ค่อยๆ ลอยขึ้นจากใบหน้าสู่ผืนฟ้ากว้างใหญ่ หรือข้ามกำแพงสูง',
    animationType: 'crane'
  },
  {
    id: 'gimbal',
    nameTh: 'กิมบอล / สเตดี้แคม (กันสั่นเคลื่อนไหวอิสระ)',
    nameEn: 'Gimbal / Steadicam (Fluid Free-Roam)',
    category: 'rig',
    gearType: 'อุปกรณ์ลดแรงสั่นสะเทือน 3 แกน (3-Axis Electronic Gimbal / Vest)',
    description: 'ตากล้องถือกล้องเดิน วิ่ง หรือเคลื่อนที่ผ่านตรอกแคบ บันได หรือพื้นที่ขรุขระ โดยที่ภาพยังคงนิ่งสนิทและลื่นไหลไร้รอยกระตุก',
    psychologicalImpact: 'สร้างความลื่นไหล คล่องตัว และความรู้สึกสมจริงของการก้าวเดินแบบไร้รอยต่อ',
    useCase: 'ฉาก One-Shot เคลื่อนที่ยาวๆ ในงานปาร์ตี้ หรือฉากต่อสู้วิ่งตามตัวละครอย่างประชิด',
    animationType: 'gimbal'
  },
  {
    id: 'drone',
    nameTh: 'โดรนถ่ายทำ (มุมมองอากาศยานไร้คนขับ)',
    nameEn: 'Drone / Aerial Cinematography',
    category: 'rig',
    gearType: 'อากาศยานไร้คนขับติดกล้อง 4K/8K (Cinematic Drone Quadcopter)',
    description: 'บินถ่ายทำจากมุมสูงกลางอากาศ สามารถบินโฉบตามรถยนต์ ลอยข้ามยอดเขา หรือบินลอดผ่านช่องแคบได้อย่างไร้ขีดจำกัด',
    psychologicalImpact: 'มอบมุมมองที่เหนือธรรมชาติ เปิดโลกทัศน์ให้เห็นสเกลของจักรวาลและภูมิประเทศอันน่าเกรงขาม',
    useCase: 'ฉากขับรถลัดเลาะตามแนวเขาเปิดเรื่อง, ฉากสำรวจเกาะร้าง หรือทิวทัศน์เมืองยามค่ำคืน',
    animationType: 'drone'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'หากคุณเป็นผู้กำกับภาพ ต้องการถ่ายทอดฉากที่ตัวละครกำลังเผชิญหน้ากับความ "โดดเดี่ยว อ้างว้าง และไร้หนทางสู้ท่ามกลางธรรมชาติอันกว้างใหญ่" ควรเลือกระยะภาพใดเพื่อสร้างพลังทางอารมณ์ได้ดีที่สุด?',
    context: 'หมวดที่ 1: ขนาดภาพและการเล่าเรื่อง (Shot Sizes & Storytelling)',
    options: [
      {
        text: 'ภาพใกล้สุดขีด (Extreme Close-Up - ECU)',
        isCorrect: false,
        explanation: 'ECU ทำหน้าที่เสมือนแว่นขยายเจาะจงเฉพาะวัตถุหรือดวงตา แต่ไม่สามารถสื่อสารความยิ่งใหญ่ของสภาพแวดล้อมรอบตัวได้'
      },
      {
        text: 'ภาพไกลสุดขีด (Extreme Long Shot - ELS)',
        isCorrect: true,
        explanation: 'ถูกต้อง! ภาพไกลสุดขีด (ELS) จัดวางให้ตัวละครมีสัดส่วนเล็กมากในเฟรม (น้อยกว่า 10%) เทียบกับทิวทัศน์อันกว้างใหญ่ สื่อสารความโดดเดี่ยว ไร้พลัง และความแปลกแยกได้อย่างทรงพลัง'
      },
      {
        text: 'ภาพระยะปานกลาง (Medium Shot - MS)',
        isCorrect: false,
        explanation: 'MS แสดงตั้งแต่เอวขึ้นไป เหมาะกับบทสนทนา แต่ไม่เน้นทัศนียภาพกว้างใหญ่'
      },
      {
        text: 'ภาพใกล้ปานกลาง (Medium Close-Up - MCU)',
        isCorrect: false,
        explanation: 'MCU เน้นสีหน้าและการแสดงอารมณ์ร่วม ไม่ตอบโจทย์ความอ้างว้างของสภาพแวดล้อม'
      }
    ]
  },
  {
    id: 2,
    question: 'ตามหลักการตัดขอบภาพบนสรีระร่างกายมนุษย์ (Framing Joints Rule) ข้อใดคือ "ข้อห้ามสำคัญที่สุด" ที่ตากล้องมืออาชีพต้องหลีกเลี่ยง?',
    context: 'หมวดที่ 2: ผังสัดส่วนมนุษย์และจุดตัดภาพ (Human Anatomy Framing Rule)',
    options: [
      {
        text: 'ตัดขอบล่างของภาพผ่านระดับกลางหน้าอก (Mid-Chest)',
        isCorrect: false,
        explanation: 'การตัดที่ระดับกลางหน้าอกคือระยะ MCU (Bust Shot) ซึ่งเป็นระยะมาตรฐานที่ถูกต้อง'
      },
      {
        text: 'ตัดขอบล่างของภาพผ่านตำแหน่งข้อต่อ เช่น ข้อศอก หัวเข่า คอ หรือข้อเท้าพอดี',
        isCorrect: true,
        explanation: 'ถูกต้อง! การตัดขอบภาพคร่อมตำแหน่งข้อต่อ (Joints) จะทำให้ร่างกายดูผิดธรรมชาติ เหมือนอวัยวะถูกเฉือนขาดหรือตัวละครลอยเคว้ง กฎภาพยนตร์จึงกำหนดให้ตัด "เหนือ" หรือ "ใต้" ข้อต่อเสมอ'
      },
      {
        text: 'ตัดขอบล่างของภาพผ่านระดับเหนือสะโพกหรือเอว',
        isCorrect: false,
        explanation: 'การตัดที่ระดับเอวคือระยะ Medium Shot (MS) ที่ใช้ทั่วไปอย่างถูกต้อง'
      },
      {
        text: 'ตัดเล็มขอบผมส่วนบนในระยะภาพใกล้มาก (Close-Up)',
        isCorrect: false,
        explanation: 'การตัดเล็มปลายผมส่วนบนในระยะ CU เป็นเทคนิคเจตนา (Intentional Crop) เพื่อเน้นดวงตา ไม่ใช่ข้อผิดพลาด'
      }
    ]
  },
  {
    id: 3,
    question: 'เมื่อต้องการถ่ายฉากเปิดตัวตัวร้ายหรือผู้นำกองทัพเพื่อให้ผู้ชมรู้สึกถึง "อำนาจ ความน่าเกรงขาม และความยิ่งใหญ่ข่มขวัญ" ควรเลือกใช้มุมกล้องแบบใด?',
    context: 'หมวดที่ 3: จิตวิทยามุมกล้อง (Camera Angle Psychology)',
    options: [
      {
        text: 'มุมต่ำ (Low Angle)',
        isCorrect: true,
        explanation: 'ถูกต้อง! มุมต่ำ (Low Angle) วางกล้องต่ำกว่าระดับสายตาและแหงนขึ้นมอง ทำให้ตัวละครดูสูงตระหง่าน บดบังท้องฟ้าและฉากหลัง ส่งพลังทางจิตวิทยาถึงความมีอำนาจและน่าเกรงขาม'
      },
      {
        text: 'มุมสูง (High Angle)',
        isCorrect: false,
        explanation: 'มุมสูงก้มมองลงมา จะทำให้ตัวละครดูตัวเล็กลง เปราะบาง ไร้อำนาจ และตกเป็นเหยื่อ'
      },
      {
        text: 'มุมระดับสายตา (Eye-Level Angle)',
        isCorrect: false,
        explanation: 'มุมระดับสายตาให้ความรู้สึกเป็นกลาง เสมอภาค และเป็นธรรมชาติ ไม่ได้ขับเน้นอำนาจพิเศษ'
      },
      {
        text: 'มุมมองแทนสายตา (POV Shot)',
        isCorrect: false,
        explanation: 'มุม POV ใช้แทนสายตาบุคคลที่หนึ่ง ไม่ได้ทำหน้าที่สร้างภาพลักษณ์ความน่าเกรงขามให้แก่ตัวละครที่ยืนอยู่ตรงหน้า'
      }
    ]
  },
  {
    id: 4,
    question: 'เทคนิคการถ่ายภาพแบบ "มุมมองแทนสายตา" (Point of View - POV Shot) มีจุดประสงค์ทางภาษาภาพยนตร์ที่โดดเด่นอย่างไร?',
    context: 'หมวดที่ 4: มุมมองภาพยนตร์พิเศษ (Special Perspective & Immersion)',
    options: [
      {
        text: 'ทำให้เห็นแผนที่และพิกัดภูมิศาสตร์ในมุมมอง 90 องศาแบบพระเจ้า',
        isCorrect: false,
        explanation: 'นี่คือบทบาทของ Bird’s-Eye View (Overhead Shot) ไม่ใช่ POV'
      },
      {
        text: 'ดึงผู้ชมให้สวมวิญญาณเป็นตัวละคร และสัมผัสประสบการณ์เสมือนมองผ่านดวงตาคู่นั้นจริง',
        isCorrect: true,
        explanation: 'ถูกต้อง! มุม POV (Subjective Camera) จัดตำแหน่งกล้องแทนที่ดวงตาของตัวละคร เช่น การยื่นมือจับลูกบิดประตู หรือการมองผ่านกล้องส่องทางไกล สร้างความผูกพันและการมีส่วนร่วมทางอารมณ์ขั้นสูงสุด'
      },
      {
        text: 'ทำให้เส้นขอบฟ้าเอียงเพื่อสื่อถึงอาการมึนเมาหรือจิตหลอน',
        isCorrect: false,
        explanation: 'นี่คือบทบาทของมุมดัตช์ (Dutch Angle) ไม่ใช่ POV'
      },
      {
        text: 'รักษาความคมชัดของฉากหลังและฉากหน้าให้เท่ากันทั้งหมด',
        isCorrect: false,
        explanation: 'นี่คือเรื่องของระยะชัดลึก (Deep Focus) ทางทฤษฎีเลนส์'
      }
    ]
  },
  {
    id: 5,
    question: 'หากผู้กำกับต้องการถ่ายฉากตัวละครเดินคุยกันบนทางเท้ายาว 200 เมตร โดยให้ภาพ "ลื่นไหล นิ่งสนิท และกล้องเคลื่อนที่ติดตามไปข้างๆ ขนานกับตัวละคร" ควรเลือกใช้อุปกรณ์และเทคนิคใด?',
    context: 'หมวดที่ 5: การเคลื่อนไหวกล้องและอุปกรณ์ (Camera Movement & Gear)',
    options: [
      {
        text: 'การแพนกล้องบนขาตั้งกล้องอยู่กับที่ (Pan on Stationary Tripod)',
        isCorrect: false,
        explanation: 'การแพนหมุนได้เฉพาะหัวกล้องอยู่กับที่ หากตัวละครเดินไกล 200 เมตร จะหลุดระยะและมุมมองเปลี่ยนไป ไม่ขนานข้าง'
      },
      {
        text: 'การแทร็กกิ้ง / การใช้กิมบอลเคลื่อนที่ขนานข้าง (Tracking Shot / Gimbal Rig)',
        isCorrect: true,
        explanation: 'ถูกต้อง! การ Tracking (หรือ Truck Shot) ควบคู่กับรางเลื่อนหรือระบบ Gimbal/Steadicam ช่วยให้ตัวกล้องเคลื่อนที่ไปพร้อมกับตัวละครในระนาบขนานอย่างลื่นไหลและรักษาขนาดภาพได้อย่างคงที่'
      },
      {
        text: 'การซูมเข้าและซูมออกอย่างรวดเร็ว (Crash Zoom)',
        isCorrect: false,
        explanation: 'การซูมเป็นการเปลี่ยนทางยาวโฟกัสของชิ้นเลนส์ ไม่ใช่การเคลื่อนย้ายตำแหน่งตัวกล้องทางกายภาพ'
      },
      {
        text: 'การทิลต์กล้องขึ้นลงแนวดิ่ง (Tilt Up & Down)',
        isCorrect: false,
        explanation: 'การทิลต์เป็นการก้ม-เงยกล้องในแนวดิ่ง ไม่สามารถติดตามการเดินขนานข้างได้'
      }
    ]
  }
];
