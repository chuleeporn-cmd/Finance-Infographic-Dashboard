import React, { useState, useMemo } from 'react';

// --- DATASET FROM PDF ---
const RAW_DATA = [
  { date: "01-10-2567", id: "723471", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723472", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723473", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723474", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723475", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723476", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723477", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723478", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "01-10-2567", id: "723469", customer: "กองพัฒนาดิจิทัลอุตสาหกรรม กรมส่งเสริมอุตสาหกรรม", description: "ค่าจ้างกิจกรรมวางแผนและจัดการข้อมูลการผลิตด้วยเทคโนโลยีดิจิทัล ประจำประงบประมาณ พ.ศ. 2567 งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 146400.00 },
  { date: "01-10-2567", id: "723470", customer: "องค์การบริหารส่วนตำบลเวียงเหนือ", description: "โครงการสำรวจความพึงพอใจของประชาชนต่อการให้บริการขององค์กรปกครองส่วนท้องถิ่น ประจำปี 2567", type: "รายได้", bank: "ออมสิน", amount: 19600.00 },
  { date: "01-10-2567", id: "723479", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723480", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723481", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723482", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723483", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723484", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "02-10-2567", id: "723485", customer: "ยกเลิกการออกเอกสาร", description: "ใบเสร็จยกเลิกในระบบควบคุมภายใน", type: "ยกเลิก", bank: "ไทยพาณิชย์", amount: 0.00 },
  { date: "03-10-2567", id: "723486", customer: "ยกเลิกการออกเอกสาร", description: "ใบเสร็จยกเลิกในระบบควบคุมภายใน", type: "ยกเลิก", bank: "ไทยพาณิชย์", amount: 0.00 },
  { date: "03-10-2567", id: "723487", customer: "สำนักงานจังหวัดเชียงใหม่", description: "ค่าจ้างเหมาจัดทำสื่อการเรียนรู้หลักสูตรการเพิ่มประสิทธิภาพบุคลากร ด้วยเทคโนโลยีปัญญาประดิษฐ์ (AI) เพื่อการบริหารงานจังหวัดในยุคดิจิทัล", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 40000.00 },
  { date: "03-10-2567", id: "723488", customer: "สำนักงานจังหวัดเชียงใหม่", description: "ค่าจ้างเหมาจัดทำสื่อการเรียนรู้หลักสูตรการเพิ่มประสิทธิภาพบุคลากรด้วย AI เพื่อการบริหารงานจังหวัด จำนวน 2 หลักสูตร", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 80000.00 },
  { date: "03-10-2567", id: "723489", customer: "อาจารย์ ดร.กลวัชร คล้ายนาค", description: "รับคืนเงินยืมรับรองการประชุมโครงการฯ เดือนกรกฎาคม 2567", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 6612.00 },
  { date: "03-10-2567", id: "723490", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "04-10-2567", id: "723491", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "04-10-2567", id: "723492", customer: "โครงการงานประชุมวิชาการระดับชาติ ครั้งที่ 6", description: "6th National Conference on Digital Innovation & Transformation (รายรับลงทะเบียน)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 890.00 },
  { date: "09-10-2567", id: "723493", customer: "สถาบันวิจัยและพัฒนาพลังงานนครพิงค์ มหาวิทยาลัยเชียงใหม่", description: "งานจ้างเหมาการพัฒนาระบบแสดงผลข้อมูลก๊าซเรือนกระจก ภายใต้โครงการวิจัย CMU Carbon Landscape", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 150000.00 },
  { date: "10-10-2567", id: "029/01401", customer: "บริษัท เทรด สแควร์ จำกัด (Trade Square Co.,LTD.)", description: "ค่าจ้างดำเนินโครงการพัฒนาระบบและสถาปัตยกรรมข้อมูล", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 21903.20 },
  { date: "11-10-2567", id: "723495", customer: "University of the West of Scotland (UWS)", description: "Expense for SUNSPACE project workshop organized on Wednesday, December 7, 2022", type: "รายได้", bank: "ไทยพาณิชย์", amount: 29773.24 },
  { date: "11-10-2567", id: "723494", customer: "อาจารย์มนัสวีร์ สันพะเยาว์", description: "รับคืนเงินยืมกิจกรรมนิเทศนักศึกษาสาขา DII รุ่น 4 (อ.มนัสวีร์ สันพะเยาว์) ย.152/67 ลว.10/9/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 1693.20 },
  { date: "11-10-2567", id: "Receipt RS463/2567", customer: "โครงการการสร้างกลไกสนับสนุนการพัฒนา SMEs", description: "รับเงินโครงการการสร้างกลไกสนับสนุนการพัฒนา SMEs ในพื้นที่ระเบียงเศรษฐกิจระดับภูมิภาคผ่าน ศูนย์บ่มเพาะการค้า โลจิสติกส์ และอีคอมเมิร์ซไทย-จีน งวดที่ 2", type: "รายได้", bank: "อื่น", amount: 151300.00 },
  { date: "16-10-2567", id: "2000/099954", customer: "ธนาคารออมสิน", description: "ค่าที่ปรึกษาด้านการบริหารระบบการจัดการความรู้ ตามกรอบมาตรฐาน ISO 30401: 2018 งวดที่ 1", type: "รายได้ค้างรับ", bank: "ออมสิน", amount: 142477.00 },
  { date: "16-10-2567", id: "723496", customer: "อาจารย์ ดร.จิรพิพัฒน์ ธัญพงษ์ภัทร", description: "รับคืนเงินยืมกิจกรรมนิเทศนักศึกษาสาขา DII รุ่นที่ 4 (อ.ตร.จิรพิพัฒน์ ธัญพงษ์ภัทร) งย.153/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 2318.11 },
  { date: "17-10-2567", id: "723497", customer: "ผู้ช่วยศาสตราจารย์ ดร. นภ คงดี", description: "รับคืนเงินยืมการเรียนรู้และฝึกใช้งานห้องปฏิบัติการ Virtual Production Studio และผลิตผลงาน 18.143/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 90000.00 },
  { date: "21-10-2567", id: "723498", customer: "ผู้ช่วยศาสตราจารย์ ดร.อัจฉรา คำอักษร", description: "รับคืนเงินยืมการดำเนินงาน เรื่อง การจัดทำเอกสารตามกรอบมาตรฐาน ISO 30401: 2018 จำนวน 6 ครั้ง", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 43476.08 },
  { date: "22-10-2567", id: "723499", customer: "สำนักงานสภานโยบายการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรมแห่งชาติ (สอวช.)", description: "ค่างจ้างที่ปรึกษาโครงการพัฒนาแพลตฟอร์มการใช้ประโยชน์กำลังคนที่มีศักยภาพสูงของประเทศ (Talent Utilization Platform) งวดที่ 1", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 84000.00 },
  { date: "22-10-2567", id: "723500", customer: "บริษัท คิด คิด จำกัด", description: "ค่าจ้างพัฒนาระบบการแรงจูงใจให้ใช้งานในรูปแบบการให้คะแนนและการแลกคะแนน เชื่อมต่อแอพพลิเคชั่น ECOLIFE", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 180000.00 },
  { date: "25-10-2567", id: "723501", customer: "ผู้ช่วยศาสตราจารย์ ดร.อัจฉรา คำอักษร", description: "รับคืนเงินยืมหลักสูตรที่ 1 การใช้ Chat GPT สำหรับฝ่ายบริหารจัดการและฝ่ายปฏิบัติการ ง8.5/68", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 28480.03 },
  { date: "25-10-2567", id: "745294", customer: "STEP CMU", description: "เงินสนับสนุนโครงการพัฒนาผู้ประกอบการและสตาร์ทอัพร่วมกับอุทยานวิทยาศาสตร์", type: "รายได้", bank: "ไทยพาณิชย์", amount: 150000.00 },
  { date: "28-10-2567", id: "723502", customer: "ผู้ช่วยศาสตราจารย์ ดร. นภ คงดี", description: "รับคืนเงินยืมการเรียนรู้และฝึกใช้งานห้องปฏิบัติการ Virtual Production Studio และผลิตผลงาน ง8.138/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 25882.95 },
  { date: "28-10-2567", id: "723503", customer: "ศูนย์ศรีพัฒน์ คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่", description: "ส่วนที่ 2 การฝึกอบรมเชิงปฏิบัติการ เรื่อง บทนำสู่มาตรฐาน ISO 30401: 2018 และ ISO 56002: 2019 รวม 12 ชั่วโมง", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 60858.00 },
  { date: "29-10-2567", id: "723504", customer: "โรงเรียนจักรคำคณาทร จังหวัดลำพูน", description: "ค่าลงทะเบียนอบรมเชิงปฏิบัติการ Unreal Engine สำหรับนักเรียนระดับชั้น ม.4 จำนวน 36 คน", type: "รายได้", bank: "ไทยพาณิชย์", amount: 28080.00 },
  { date: "29-10-2567", id: "723505", customer: "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่", description: "รับเงินโครงการวิจัย เรื่อง การประยุกต์ใช้เทคโนโลยีดิจิทัลเพื่อสร้างมูลค่าและคุณค่าแก่การท่องเที่ยวเชิงพักผ่อนล้านนา งวดที่ 3", type: "รายได้", bank: "ไทยพาณิชย์", amount: 644754.00 },
  { date: "29-10-2567", id: "723507", customer: "คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่", description: "รับเงินค่าจ้างพัฒนาเกมออกกำลังกายเพื่อป้องกันภาวะเปราะบางสำหรับผู้สูงอายุ ภายใต้โครงการสัญญาเลขที่ N84A670244 งวดที่ 2", type: "รายได้", bank: "ไทยพาณิชย์", amount: 250000.00 },
  { date: "31-10-2567", id: "2000/099955", customer: "กองคลัง มหาวิทยาลัยเชียงใหม่", description: "รับเงินโครงการการบริหารจัดการโลจิสติกส์ (ประยุกต์ใช้เทคโนโลยีสารสนเทศ) ปีงบประมาณ 2568", type: "รายได้", bank: "ออมสิน", amount: 1113734.81 },
  { date: "01-11-2567", id: "723508", customer: "ผู้ช่วยศาสตราจารย์ ดร.อรวิชย์ ถิ่นนุกูล", description: "รับคืนเงินยืมโครงการวิจัยและพัฒนาระบบสารสนเทศประยุกต์เพื่อการวินิจฉัยการเจ็บป่วยเบื้องต้น ครั้งที่ 2", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 150002.50 },
  { date: "04-11-2567", id: "RS421-1/งวดที่ 2", customer: "โครงการวิจัยสมรรถนะการบ่มเพาะธุรกิจ", description: "รับเงินโครงการวิจัยการพัฒนาระบบการประเมินและการพัฒนาสมรรถนะอย่างยั่งยืนของการบ่มเพาะธุรกิจในประเทศไทย งวดที่ 2", type: "รายได้", bank: "อื่น", amount: 520500.00 },
  { date: "06-11-2567", id: "723512", customer: "สำนักงานสภานโยบายการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรมแห่งชาติ (สอวช.)", description: "ค่าจ้างที่ปรึกษาโครงการระเบียงเศรษฐกิจนวัตกรรมภูมิภาคด้วยกลไกความร่วมมือระหว่างประเทศ งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 912000.00 },
  { date: "08-11-2567", id: "029/01402", customer: "บริษัท เทรด สแควร์ จำกัด (Trade Square Co.,LTD.)", description: "ค่าจ้างดำเนินโครงการและพัฒนาเทคโนโลยีสารสนเทศต่อเนื่อง งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 21903.20 },
  { date: "11-11-2567", id: "2000/099956", customer: "สถาบันระหว่างประเทศเพื่อการค้าและการพัฒนา (องค์การมหาชน)", description: "ค่าจ้างจัดกิจกรรมพัฒนาผู้ประกอบการ SMEs เพื่อการใช้ประโยชน์จาก Cross Border E-Commerce (CBEC) สู่ตลาดประเทศจีน งวดที่ 1", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 850000.00 },
  { date: "13-11-2567", id: "723515", customer: "ศูนย์ศรีพัฒน์ คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่", description: "ค่าจ้างดำเนินโครงการ Generative AI in Action ด้วย Chat GPT (ผู้เข้าร่วมอบรม ไม่เกิน 50 คน/ครั้ง) เดือนตุลาคม 2567 (2 ครั้ง)", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 87880.00 },
  { date: "15-11-2567", id: "723516", customer: "อาจารย์ ดร.กลวัชร คล้ายนาค", description: "รับคืนเงินยืมค่าใช้จ่ายกิจกรรมอบรมโครงการพัฒนากำลังคนสมรรถนะสูงด้านการสร้างเว็บตูน (Webtoon)", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 19195.00 },
  { date: "15-11-2567", id: "723518", customer: "อาจารย์ ดร.ดนัยธัญ พงษ์พัชราธรเทพ", description: "รับคืนเงินยืมจัดประชุมเชิงปฏิบัติการ (CBEC Service Design Workshop) งย 156/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 33633.00 },
  { date: "15-11-2567", id: "723519", customer: "นางสาวนฤมล กิติ", description: "รับคืนเงินยืมกิจกรรม Workshop คัดเลือกนักเรียนเข้าศึกษาต่อระดับปริญญาตรี ปีการศึกษา 2568 งย.154/67", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 63788.00 },
  { date: "18-11-2567", id: "723521", customer: "โรงเรียนมงฟอร์ตวิทยาลัย", description: "ค่าลงทะเบียนเรียนหลักสูตร M-JEDI ร.ร.มงฟอร์ตวิทยาลัย (วันที่ 10 มิถุนายน 2567 - 28 กันยายน 2567)", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 55000.00 },
  { date: "22-11-2567", id: "2000/099958", customer: "ธนาคารออมสิน", description: "ค่าที่ปรึกษาด้านการบริหารระบบการจัดการความรู้ ตามกรอบมาตรฐาน ISO 30401-2018 งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 237462.00 },
  { date: "22-11-2567", id: "2000/099959", customer: "โรงเรียนยุพราชวิทยาลัย", description: "ค่าลงทะเบียนค่าย STEM Smart YRC ม.1 วันที่ 30 พฤศจิกายน - 1 ธันวาคม 2567", type: "รายได้", bank: "ไทยพาณิชย์", amount: 109200.00 },
  { date: "27-11-2567", id: "723526", customer: "กองพัฒนานักศึกษา สำนักงานมหาวิทยาลัย มหาวิทยาลัยเชียงใหม่", description: "ค่าใช้จ่ายในการใช้บริการจัดทำระบบฐานการเรียนรู้เพื่อปฐมนิเทศนักศึกษาใหม่ ผ่านช่องทางออนไลน์ (ระยะที่ 2)", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 400000.00 },
  { date: "02-12-2567", id: "723532", customer: "Inha University (National Center of Software)", description: "K-CAMT 2024 Winter Program and Hackathon tuition fee", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 630000.00 },
  { date: "02-12-2567", id: "723532", customer: "Inha University (Exchange Gain)", description: "K-CAMT 2024 Winter Program and Hackathon - กำไรจากอัตราแลกเปลี่ยนเงินตราต่างประเทศ", type: "รายได้", bank: "ไทยพาณิชย์", amount: 15009.50 },
  { date: "02-12-2567", id: "723535", customer: "Sangmyung University", description: "K-CAMT 2024 Winter Program and Hackathon tuition fee", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 630000.00 },
  { date: "02-12-2567", id: "723535", customer: "Sangmyung University (Exchange Gain)", description: "K-CAMT 2024 Winter Program and Hackathon - กำไรจากอัตราแลกเปลี่ยนเงินตราต่างประเทศ", type: "รายได้", bank: "ไทยพาณิชย์", amount: 9127.25 },
  { date: "02-12-2567", id: "723536", customer: "ศูนย์ศรีพัฒน์ คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่", description: "ส่วนที่ 3 การฝึกอบรมเชิงปฏิบัติการ เรื่อง การจัดทำเอกสารตามกรอบมาตรฐาน ISO 30401: 2018 และ ISO 56002 :2019", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 182574.00 },
  { date: "03-12-2567", id: "723538", customer: "Chungbuk National University", description: "K-CAMT 2024 Winter Program and Hackathon tuition fee", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 504000.00 },
  { date: "11-12-2567", id: "723538", customer: "Chungbuk National University (Exchange Gain)", description: "K-CAMT Winter Program and Hackathon tuition fee - กำไรจากอัตราแลกเปลี่ยน", type: "รายได้", bank: "ไทยพาณิชย์", amount: 4114.10 },
  { date: "12-12-2567", id: "445/2567", customer: "โครงการพัฒนากลไก อววน. Creative Content & Soft Power", description: "เงินเดือนเจ้าหน้าที่ปณิตาและสุชาดา เพื่อสนับสนุนอุตสาหกรรมสร้างสรรค์และ Soft Power ของประเทศไทย", type: "รายได้อื่นๆ", bank: "อื่น", amount: 503750.00 },
  { date: "12-12-2567", id: "723544", customer: "สถาบันวิจัยและพัฒนาพื้นที่สูง (องค์การมหาชน)", description: "ค่าจ้างเหมาบริการวิชาการ อบรมหลักสูตร การใช้ GENERATIVE AI สำหรับช่วยทำงานวิจัย", type: "รายได้", bank: "ไทยพาณิชย์", amount: 55000.00 },
  { date: "12-12-2567", id: "2000/099960", customer: "บริษัท 2 บวก 3 เอ็กซิบิท จำกัด", description: "เงินหลักประกันสัญญาจ้างเหมาจัดสัมนาเพื่อนำเสนอองค์ความรู้ด้าน CBEC ระหว่างไทย-จีน ในรูปแบบผสมผสาน", type: "เงินประกันสัญญา", bank: "ไทยพาณิชย์", amount: 22470.00 },
  { date: "13-12-2567", id: "2000/099961", customer: "บริษัท เอ็มเอซีซี อิเล็คทรอนิคส์ (ประเทศไทย) จำกัด", description: "เงินหลักประกันสัญญาจ้างเหมาจัดหาและทดสอบ Storefront Smart Signage แสดงผลสื่อโฆษณา", type: "เงินประกันสัญญา", bank: "ไทยพาณิชย์", amount: 24950.00 },
  { date: "25-12-2567", id: "723572", customer: "Mr.Shubhodeep Das", description: "เงินบริจาคเพื่อสนับสนุนทุนและการพัฒนาการศึกษาของนักศึกษา", type: "รายได้", bank: "ไทยพาณิชย์", amount: 430000.00 },
  { date: "25-12-2567", id: "723573", customer: "นางสาว ณัฐกานต์ ขวัญคง", description: "เงินบริจาคเพื่อสนับสนุนพัฒนาห้องปฏิบัติการและการศึกษา", type: "รายได้", bank: "ไทยพาณิชย์", amount: 400000.00 },
  { date: "25-12-2567", id: "723574", customer: "บริษัท เอ เอ คอนสตรัคชั่น จำกัด", description: "เงินบริจาคสมทบทุนเพื่อการศึกษาและวิจัยด้านเทคโนโลยีดิจิทัล", type: "รายได้", bank: "ไทยพาณิชย์", amount: 200000.00 },
  { date: "25-12-2567", id: "723575", customer: "บริษัท ไฮไลฟ์ แอสเซท จำกัด", description: "เงินบริจาคสมทบทุนการศึกษาโครงการนวัตกรรมดิจิทัลเพื่อชุมชน", type: "รายได้", bank: "ไทยพาณิชย์", amount: 200000.00 },
  { date: "07-01-2568", id: "723577", customer: "ผู้ช่วยศาสตราจารย์ ดร.ภัทรพร คูวุฒยากร", description: "รับคืนเงินยืมการดำเนินกิจกรรมโครงการวิจัยและบริการวิชาการฯ (สะสมจาก เม.ย. 67)", type: "รับคืนเงินยืม", bank: "ไทยพาณิชย์", amount: 499990.00 },
  { date: "10-01-2568", id: "723588", customer: "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่", description: "โครงการ Bachelor of Science Program in Software Engineering (English Program) ภาคเรียนที่ 2", type: "รายได้", bank: "ออมสิน", amount: 2843106.14 },
  { date: "10-01-2568", id: "723589", customer: "บริษัท ไชเจ็น จำกัด", description: "ค่าสนับสนุนโครงการบูรณาการอุตสาหกรรมดิจิทัล (DII) รุ่นที่ 5 งวดที่ 2", type: "รายได้", bank: "ไทยพาณิชย์", amount: 210000.00 },
  { date: "24-01-2568", id: "723599", customer: "สำนักงานสภานโยบายอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรมแห่งชาติ (สอวช.)", description: "ค่าจ้างดำเนินโครงการพัฒนากลไก อววน เพื่อสนับสนุนอุตสาหกรรม Creative Content และส่งเสริม Soft Power ของประเทศไทย งวดที่ 2", type: "รายได้", bank: "ไทยพาณิชย์", amount: 2250000.00 },
  { date: "27-01-2568", id: "723602", customer: "บริษัท โปรเฟสชั่นนัล คอมพิวเตอร์ จำกัด", description: "ค่าสนับสนุนโครงการบูรณาการอุตสาหกรรมดิจิทัล (Digital Industry Integration : DII) รุ่นที่ 5 งวดที่ 2", type: "รายได้", bank: "ไทยพาณิชย์", amount: 280000.00 },
  { date: "29-01-2568", id: "723609", customer: "Erasmus+ Programme (Tourism-Zero)", description: "รับเงินโครงการ CURRICULUM DEVELOPMENT FOR ZERO WASTE MANAGEMENT IN HOSPITALITY AND TOURISM SECTOR งวดที่ 1", type: "รายได้", bank: "ออมสิน", amount: 2705185.66 },
  { date: "11-02-2568", id: "723616", customer: "บริษัท บลูบิค กรุ๊ป จำกัด (มหาชน)", description: "ค่าสนับสนุนโครงการบูรณาการอุตสาหกรรมดิจิทัล (Digital Industry Integration : DII) รุ่นที่ 5 งวดที่ 2", type: "รายได้", bank: "ไทยพาณิชย์", amount: 630000.00 },
  { date: "21-02-2568", id: "723617", customer: "สถาบันระหว่างประเทศเพื่อการค้าและการพัฒนา (องค์การมหาชน)", description: "ค่าจ้างจัดกิจกรรมพัฒนาศักยภาพผู้ประกอบการ SMEs เพื่อการใช้ประโยชน์จาก Cross Border E-Commerce (CBEC) งวดที่ 3", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 1700000.00 },
  { date: "03-03-2568", id: "723628", customer: "CAMT SUMMER COURSES 2025", description: "ค่าลงทะเบียนคอร์สอบรมฤดูร้อนสำหรับเยาวชนและนักศึกษา (ยอดรวมชำระจากผู้สมัครคอร์สพัฒนาเกมและหุ่นยนต์)", type: "รายได้", bank: "ไทยพาณิชย์", amount: 436410.00 },
  { date: "17-03-2568", id: "Receipt 5001", customer: "โครงการต่อยอดการยกระดับฯ", description: "รับเงินโครงการยกระดับความร่วมมือการสร้างกำลังคนและการบ่มเพาะวิสาหกิจดิจิทัล งวดที่ 1", type: "รายได้", bank: "อื่น", amount: 1400000.00 },
  { date: "19-03-2568", id: "N25A-01", customer: "โครงการความร่วมมือทางวิชาการและวิจัย", description: "รับเงินงวดที่ 1 ภายใต้โครงการระบบความปลอดภัยและเทคโนโลยีเกษตรอัจฉริยะล้านนา", type: "รายได้", bank: "อื่น", amount: 1654710.00 },
  { date: "17-04-2568", id: "723700", customer: "สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)", description: "โครงการส่งเสริมการเรียนรู้ทางเลือกผ่านห้องเรียนด้านอีสปอร์ต (e-Sports) และพัฒนาเป็นศูนย์ให้คำปรึกษาเพื่อสร้างความเข้าใจที่ถูกต้อง งวดที่ 3", type: "รายได้ค้างรับ", bank: "ออมสิน", amount: 2500000.00 },
  { date: "07-05-2568", id: "723712", customer: "ศูนย์ศรีพัฒน์ คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่", description: "ส่วนที่ 4 การฝึกอบรมเชิงปฏิบัติการหัวข้อ เรื่อง การตรวจสอบภายในและเตรียมความพร้อมก่อนการตรวจประเมินเพื่อขอรับรอง มาตรฐาน ISO", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 121716.00 },
  { date: "26-05-2568", id: "723727", customer: "Guangxi University", description: "รับเงินสนับสนุนโครงการแลกเปลี่ยนนักศึกษาและงานวิจัยเศรษฐศาสตร์ดิจิทัล GXU-CMU ECON Exchange Program 2025", type: "รายได้", bank: "ไทยพาณิชย์", amount: 1246619.13 },
  { date: "10-06-2568", id: "723730", customer: "บริษัท ดราคอนิค จำกัด (สำนักงานใหญ่)", description: "โครงการพัฒนา ออกแบบ และวิเคราะห์หลักสูตรอบรมเว็บตูนเชิงปฏิบัติการขั้นสูง (Advanced Webtoon Workshop) งวดที่ 1", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 624000.00 },
  { date: "16-06-2568", id: "N25A-02", customer: "โครงการความร่วมมือทางวิชาการและวิจัย", description: "รับเงินงวดที่ 2 ภายใต้โครงการระบบความปลอดภัยและเทคโนโลยีเกษตรอัจฉริยะล้านนา", type: "รายได้", bank: "อื่น", amount: 2206280.00 },
  { date: "02-07-2568", id: "723785", customer: "สำนักงานมหาวิทยาลัย มหาวิทยาลัยเชียงใหม่", description: "บริการจัดทำกระบวนการ Design thinking / Coaching ภายใต้โครงการ LeanAgile-Mindset Boosting งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 652000.00 },
  { date: "04-07-2568", id: "723815", customer: "สำนักงานสภานโยบายอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรมแห่งชาติ (สอวช.)", description: "โครงการพัฒนากลไก อววน เพื่อสนับสนุนอุตสาหกรรม Creative Content และส่งเสริม Soft Power ของประเทศไทย งวดที่ 3", type: "รายได้", bank: "ไทยพาณิชย์", amount: 700000.00 },
  { date: "09-07-2568", id: "723821", customer: "สถาบันวิจัยและพัฒนาพลังงานนครพิงค์ มหาวิทยาลัยเชียงใหม่", description: "ค่าจ้างพัฒนา Dashboard ระบบฐานข้อมูลเพื่อการจัดทำข้อมูลรายงานด้าน Carbon Footprint มช. งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 597000.00 },
  { date: "09-07-2568", id: "Receipt RS463/2567", customer: "โครงการการสร้างกลไกสนับสนุนการพัฒนา SMEs", description: "รับเงินโครงการส่งเสริมกลไกการพัฒนาศักยภาพผู้ประกอบการและการสร้างระบบอีคอมเมิร์ซไทย-จีน งวดที่ 3", type: "รายได้", bank: "อื่น", amount: 1442650.00 },
  { date: "18-07-2568", id: "723836", customer: "สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)", description: "โครงการการพัฒนาโครงสร้างพื้นฐานและบุคลากรสำหรับอุตสาหกรรม Animation และ Games ในภาคเหนือ งวดที่ 1", type: "รายได้", bank: "ไทยพาณิชย์", amount: 622500.00 },
  { date: "21-07-2568", id: "723845", customer: "โครงการ Tourism-Zero (Erasmus+)", description: "รับสนับสนุนค่าตอบแทนผู้วิจัยและเงินเดือนผู้ประสานงานโครงการวิจัยการจัดการขยะการท่องเที่ยวสีเขียว", type: "รายได้", bank: "ออมสิน", amount: 108450.00 },
  { date: "08-08-2568", id: "723878", customer: "กองพัฒนาดิจิทัลอุตสาหกรรม กรมส่งเสริมอุตสาหกรรม", description: "ค่าจ้างกิจกรรมการจัดทำระบบติดตามข้อมูลโรงงานอุตสาหกรรมและการตรวจสอบย้อนกลับ (DATA MANAGEMENT SYSTEM) งวดที่ 2", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 340200.00 },
  { date: "27-08-2568", id: "723909", customer: "สำนักงานสภานโยบายการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรมแห่งชาติ", description: "ค่าจ้างที่ปรึกษาโครงการระเบียงเศรษฐกิจนวัตกรรมภูมิภาคด้วยกลไกความร่วมมือระหว่างประเทศ งวดที่ 3", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 684000.00 },
  { date: "23-09-2568", id: "723962", customer: "การท่องเที่ยวแห่งประเทศไทย (ททท.)", description: "ค่าจ้างเหมาจัดทำเว็บแอปพลิเคชัน Coral College (ปะการังวิทยาลัย) แพลตฟอร์มการเรียนรู้และอนุรักษ์แนวปะการังไทย", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 400000.00 },
  { date: "24-09-2568", id: "723964", customer: "กองพัฒนาดิจิทัลอุตสาหกรรม กรมส่งเสริมอุตสาหกรรม กระทรวงอุตสาหกรรม", description: "ค่าจ้างกิจกรรมการจัดทำระบบติดตามข้อมูลโรงงานอุตสาหกรรมและการตรวจสอบย้อนกลับ งวดที่ 3", type: "รายได้ค้างรับ", bank: "ไทยพาณิชย์", amount: 226800.00 },
  { date: "26-09-2568", id: "5171/258511", customer: "สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)", description: "โครงการพัฒนาย่านนิมมานเหมินทร์ไปสู่เมืองอัจฉริยะเพื่อเป็นต้นแบบด้านเศรษฐกิจและความปลอดภัย งวดที่ 3", type: "รายได้", bank: "ออมสิน", amount: 907600.00 },
  { date: "30-09-2568", id: "723978", customer: "สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)", description: "โครงการส่งเสริมการเรียนรู้ทางเลือกผ่านห้องเรียนด้านอีสปอร์ต (e-Sports) และศูนย์ปรึกษาเพื่อสร้างความเข้าใจที่ถูกต้อง งวดที่ 4", type: "รายได้ค้างรับ", bank: "ออมสิน", amount: 450000.00 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const itemsPerPage = 8;

  // --- STATS CALCULATIONS ---
  const stats = useMemo(() => {
    let totalReceiptedVolume = 0;
    let actualRevenue = 0;
    let accruedRevenue = 0;
    let returnedLoans = 0;
    let securityDeposits = 0;
    let otherIncome = 0;
    let cancelledCount = 0;

    RAW_DATA.forEach(item => {
      const amt = item.amount || 0;
      if (item.type === 'ยกเลิก') {
        cancelledCount++;
        return; // skip calculations for cancelled
      }
      totalReceiptedVolume += amt;
      if (item.type === 'รายได้') actualRevenue += amt;
      else if (item.type === 'รายได้ค้างรับ') accruedRevenue += amt;
      else if (item.type === 'รับคืนเงินยืม') returnedLoans += amt;
      else if (item.type === 'เงินประกันสัญญา') securityDeposits += amt;
      else if (item.type === 'รายได้อื่นๆ' || item.type === 'รายใต้อื่นๆ') otherIncome += amt;
    });

    return {
      totalReceiptedVolume,
      actualRevenue,
      accruedRevenue,
      returnedLoans,
      securityDeposits,
      otherIncome,
      cancelledCount,
      netCollectedCash: actualRevenue + otherIncome + returnedLoans + securityDeposits
    };
  }, []);

  // --- FILTERS & SEARCH ---
  const filteredData = useMemo(() => {
    return RAW_DATA.filter(item => {
      const matchSearch = 
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery);
      
      const matchBank = selectedBank === 'All' || item.bank === selectedBank;
      const matchType = selectedType === 'All' || item.type === selectedType;
      
      let matchYear = true;
      if (selectedYear !== 'All') {
        const yearPart = item.date.split('-')[2]; // e.g. "2567" or "2568"
        matchYear = yearPart === selectedYear;
      }

      return matchSearch && matchBank && matchType && matchYear;
    });
  }, [searchQuery, selectedBank, selectedType, selectedYear]);

  // --- PAGINATION ---
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // --- BANK SHARE DATA ---
  const bankShare = useMemo(() => {
    const share = { "ไทยพาณิชย์": 0, "ออมสิน": 0, "อื่น": 0 };
    RAW_DATA.forEach(item => {
      if (item.type !== 'ยกเลิก') {
        if (share[item.bank] !== undefined) {
          share[item.bank] += item.amount;
        } else {
          share["อื่น"] += item.amount;
        }
      }
    });
    return share;
  }, []);

  // Format Helper
  const formatBaht = (num) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(num);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBank('All');
    setSelectedType('All');
    setSelectedYear('All');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-xl shadow-md text-slate-950">
              <svg className="w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493a3 3 0 11-1.62 1.62L19 3.5l-2.127.709A3 3 0 1115.253 2.62L15.5 3.5l-6 6M9 14.25l-2.22 2.22m0 0a3 3 0 104.24 4.24l2.22-2.22m-4.24-4.24L11.25 15" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                Onestop System Dashboard
              </h1>
              <p className="text-xs text-slate-400 font-medium">ศูนย์วิทยบริการและนวัตกรรมดิจิทัล | รายงานคุมใบเสร็จรับเงิน</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              ภาพรวมระบบ
            </button>
            <button 
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'ledger' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              ทะเบียนคุมใบเสร็จ
            </button>
            <button 
              onClick={() => setActiveTab('donations')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'donations' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              แหล่งทุน & เงินบริจาค
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Volume */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">มูลค่ารับเงินรวมทั้งหมด</p>
                    <h3 className="text-2xl font-bold mt-1 text-amber-300">{formatBaht(stats.totalReceiptedVolume)}</h3>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg text-amber-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-3">ครอบคลุมปีงบประมาณ BE 2567 - 2568</p>
              </div>

              {/* Real Revenue */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">รายได้จริงที่รับรู้แล้ว</p>
                    <h3 className="text-2xl font-bold mt-1 text-emerald-400">{formatBaht(stats.actualRevenue + stats.otherIncome)}</h3>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-3">รายได้สะสม + รายได้อื่นๆ ในระบบ</p>
              </div>

              {/* Accrued Revenue */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">ยอดรายได้ค้างรับ</p>
                    <h3 className="text-2xl font-bold mt-1 text-blue-400">{formatBaht(stats.accruedRevenue)}</h3>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg text-blue-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-3">ดำเนินการส่งมอบงานแล้ว อยู่ระหว่างรอรับเงิน</p>
              </div>

              {/* Returned Loans */}
              <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">รับคืนเงินยืมสำรอง</p>
                    <h3 className="text-2xl font-bold mt-1 text-purple-400">{formatBaht(stats.returnedLoans)}</h3>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg text-purple-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-3">เคลียร์วงเงินยืมทดรองจ่ายคณะ/โครงการ</p>
              </div>
            </div>

            {/* Sub Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/30 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">เงินประกันผลงาน/ประกันสัญญา</span>
                  <span className="text-lg font-bold text-slate-200">{formatBaht(stats.securityDeposits)}</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">ความโปร่งใสหลักประกัน</span>
              </div>
              <div className="bg-slate-950/30 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">ประมาณการเงินสดรับสุทธิ</span>
                  <span className="text-lg font-bold text-emerald-400">{formatBaht(stats.netCollectedCash)}</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">กระแสเงินสดหมุนเวียน</span>
              </div>
              <div className="bg-slate-950/30 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">รายการยกเลิกใบเสร็จ</span>
                  <span className="text-lg font-bold text-rose-400">{stats.cancelledCount} รายการ</span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-rose-950/30 rounded-lg border border-rose-900/50 text-rose-300">ระบบคุมใบค้างจ่าย</span>
              </div>
            </div>

            {/* Interactive Custom SVG Dashboard Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chart 1: Month & Year Trends (Interactive Custom Bar Chart) */}
              <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">วิเคราะห์ความคืบหน้าโครงการและรายรับสะสม</h4>
                    <p className="text-xs text-slate-400">เปรียบเทียบขนาดรายรับโครงการสำคัญ (ล้านบาท)</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">รายได้สะสม</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">ค้างรับ</span>
                  </div>
                </div>

                {/* Custom Responsive SVG Graphic bar chart */}
                <div className="relative h-64 w-full bg-slate-900/30 rounded-xl p-4 border border-slate-800/40 flex items-end justify-between">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-10">
                    <div className="border-b border-slate-100 w-full"></div>
                    <div className="border-b border-slate-100 w-full"></div>
                    <div className="border-b border-slate-100 w-full"></div>
                    <div className="border-b border-slate-100 w-full"></div>
                  </div>

                  {/* Render simulated projects */}
                  {[
                    { name: 'สอวช. Soft Power', earned: 2.25, accrued: 0.70, color: 'from-amber-500 to-amber-300' },
                    { name: 'depa e-Sports', earned: 0.00, accrued: 2.95, color: 'from-blue-500 to-indigo-400' },
                    { name: 'Erasmus+ (Zero)', earned: 2.70, accrued: 0.00, color: 'from-emerald-500 to-teal-400' },
                    { name: 'SMEs CBEC จีน', earned: 0.15, accrued: 2.55, color: 'from-purple-500 to-pink-400' },
                    { name: 'Software Eng CMU', earned: 2.84, accrued: 0.00, color: 'from-amber-400 to-yellow-200' },
                    { name: 'วิจัยวิทยบริการ มช.', earned: 0.64, accrued: 0.65, color: 'from-slate-400 to-slate-200' }
                  ].map((proj, idx) => {
                    const totalVal = proj.earned + proj.accrued;
                    const maxVal = 3.5; // Scale base
                    const earnedHeight = (proj.earned / maxVal) * 100;
                    const accruedHeight = (proj.accrued / maxVal) * 100;

                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group z-10">
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-36 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-300 pointer-events-none transition-all duration-300 shadow-xl z-20">
                          <p className="font-bold text-slate-100">{proj.name}</p>
                          {proj.earned > 0 && <p className="text-amber-400">รับแล้ว: {proj.earned}M Baht</p>}
                          {proj.accrued > 0 && <p className="text-blue-400">ค้างรับ: {proj.accrued}M Baht</p>}
                          <p className="border-t border-slate-800 mt-1 pt-1 font-semibold">รวม: {totalVal.toFixed(2)}M Baht</p>
                        </div>

                        {/* Stacked Bar */}
                        <div className="w-7 md:w-10 rounded-t-md overflow-hidden flex flex-col justify-end h-full bg-slate-950/20">
                          {/* Accrued Portion */}
                          <div 
                            style={{ height: `${accruedHeight}%` }} 
                            className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 transition-all duration-500 rounded-t-sm"
                          ></div>
                          {/* Earned Portion */}
                          <div 
                            style={{ height: `${earnedHeight}%` }} 
                            className="w-full bg-gradient-to-t from-amber-600 to-yellow-400 transition-all duration-500"
                          ></div>
                        </div>

                        {/* Project Label */}
                        <span className="text-[10px] text-slate-400 mt-2 text-center truncate w-full px-1">{proj.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Bank Breakdown (Circular Share & Status representation) */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">สัดส่วนช่องทางการรับชำระ</h4>
                  <p className="text-xs text-slate-400">แบ่งตามสถาบันธนาคารที่รับเงินฝากหมุนเวียน</p>
                </div>

                <div className="my-6 flex items-center justify-center relative">
                  {/* Clean CSS-based SVG Pie/Donut approximation chart */}
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 32 32">
                    {/* Background Circle */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#1e293b" strokeWidth="4" />
                    {/* SCB: ~70% share */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="64 100" strokeDashoffset="0" />
                    {/* GSB: ~20% share */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-64" />
                    {/* Others: ~10% share */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="16 100" strokeDashoffset="-84" />
                  </svg>
                  
                  {/* Center info */}
                  <div className="absolute text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">ช่องทางหลัก</p>
                    <p className="text-base font-bold text-amber-400">ไทยพาณิชย์</p>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="text-slate-300">ไทยพาณิชย์ (SCB)</span>
                    </div>
                    <span className="font-semibold text-amber-400">{formatBaht(bankShare["ไทยพาณิชย์"])}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-slate-300">ธนาคารออมสิน (GSB)</span>
                    </div>
                    <span className="font-semibold text-emerald-400">{formatBaht(bankShare["ออมสิน"])}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <span className="text-slate-300">ธนาคารอื่น / เงินรับฝาก</span>
                    </div>
                    <span className="font-semibold text-blue-400">{formatBaht(bankShare["อื่น"])}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlighted major programs info cards */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">กลุ่มเป้าหมายการเงินและภาคีหลัก</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">หน่วยงานรัฐ & สหกรณ์รัฐบาล (depa, สอวช.)</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      เป็นผู้สนับสนุนงบประมาณรายรับโครงการพัฒนาขนาดใหญ่ เช่น โครงการบ่มเพาะ ซอฟท์พาวเวอร์ และพัฒนาเมืองอัจฉริยะ (Smart City)
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">กลุ่มโรงเรียน & ค่ายเยาวชน (Yuparaj, Montfort)</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      สร้างรายรับเสริมสม่ำเสมอผ่านทางคอร์สติว และค่ายวิชาการ เช่น Robot Creator Workshop, CAMT Summer Courses 2025 เป็นต้น
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">พันธมิตรวิจัยระดับสากล (Erasmus+, Inha)</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      เงินทุนการศึกษาและทุนแลกเปลี่ยนสัญญางานวิชาการระดับสากล เช่น SUNSPACE project, Tourism-Zero, exchange program
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 2. LEDGER TAB (Rich Table) */}
        {activeTab === 'ledger' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Search, Filter and Actions Bar */}
            <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h3 className="text-base font-bold text-slate-200 tracking-tight">ทะเบียนควบคุมรายรับใบเสร็จรับเงิน</h3>
                <div className="text-xs text-slate-400">
                  พบข้อมูลทั้งสิ้น <span className="font-bold text-amber-400 text-sm">{filteredData.length}</span> จาก {RAW_DATA.length} รายการ
                </div>
              </div>

              {/* Filters grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                {/* Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="ค้นหาลูกค้า, เลขใบเสร็จ, รายการ..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                  <div className="absolute left-3 top-2.5 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Bank Filter */}
                <div>
                  <select 
                    value={selectedBank}
                    onChange={(e) => { setSelectedBank(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="All">ทุกธนาคารที่รับ</option>
                    <option value="ไทยพาณิชย์">ไทยพาณิชย์ (SCB)</option>
                    <option value="ออมสิน">ธนาคารออมสิน (GSB)</option>
                    <option value="อื่น">ธนาคารและวิธีการอื่น</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <select 
                    value={selectedType}
                    onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="All">ทุกประเภทการชำระ</option>
                    <option value="รายได้">รายได้ปกติ</option>
                    <option value="รายได้ค้างรับ">รายได้ค้างรับ</option>
                    <option value="รับคืนเงินยืม">รับคืนเงินยืม</option>
                    <option value="เงินประกันสัญญา">เงินประกันสัญญา</option>
                    <option value="รายได้อื่นๆ">รายได้อื่นๆ</option>
                    <option value="ยกเลิก">เอกสารยกเลิก</option>
                  </select>
                </div>

                {/* Year Filter */}
                <div className="flex gap-2">
                  <select 
                    value={selectedYear}
                    onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="All">ทุกปี พ.ศ.</option>
                    <option value="2567">พ.ศ. 2567</option>
                    <option value="2568">พ.ศ. 2568</option>
                  </select>

                  <button 
                    onClick={handleResetFilters}
                    className="px-3 bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all text-xs"
                    title="ล้างตัวกรองทั้งหมด"
                  >
                    ล้าง
                  </button>
                </div>

              </div>
            </div>

            {/* Receipt Table and Detail Drawer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Ledger Table Container */}
              <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/60 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-4 px-4">วันที่ / ใบเสร็จ</th>
                        <th className="py-4 px-4">ลูกค้า / รายละเอียด</th>
                        <th className="py-4 px-4">ประเภท</th>
                        <th className="py-4 px-4 text-right">จำนวนเงิน</th>
                        <th className="py-4 px-4 text-center">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs">
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => {
                          const isCancelled = item.type === 'ยกเลิก';
                          return (
                            <tr 
                              key={index}
                              onClick={() => setSelectedReceipt(item)}
                              className={`hover:bg-slate-900/40 cursor-pointer transition-all ${selectedReceipt && selectedReceipt.id === item.id ? 'bg-slate-900/60 border-l-2 border-l-amber-500' : ''}`}
                            >
                              <td className="py-4 px-4">
                                <span className="block text-slate-200 font-medium">{item.date}</span>
                                <span className="text-[10px] text-slate-400 block font-mono">{item.id}</span>
                              </td>
                              <td className="py-4 px-4 max-w-xs md:max-w-sm truncate-3-lines">
                                <div className={`font-bold ${isCancelled ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                  {item.customer}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.description}</div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  item.type === 'รายได้' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                  item.type === 'รายได้ค้างรับ' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                  item.type === 'รับคืนเงินยืม' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                                  item.type === 'เงินประกันสัญญา' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                  item.type === 'ยกเลิก' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                                  'bg-slate-500/10 text-slate-400 border-slate-500/30'
                                }`}>
                                  {item.type}
                                </span>
                                <span className="block text-[9px] text-slate-500 mt-1 font-semibold">{item.bank}</span>
                              </td>
                              <td className="py-4 px-4 text-right font-bold font-mono text-slate-100">
                                {isCancelled ? (
                                  <span className="text-slate-500">-</span>
                                ) : (
                                  formatBaht(item.amount)
                                )}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button className="p-1.5 hover:bg-slate-800 rounded-lg text-amber-400 transition-all">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                            ไม่พบรายการเอกสารใบเสร็จตามตัวกรองที่เลือก
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="bg-slate-900/60 border-t border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-lg text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      ก่อนหน้า
                    </button>
                    <span className="text-xs text-slate-400">
                      หน้า <span className="font-bold text-amber-400">{currentPage}</span> จาก <span className="font-bold">{totalPages}</span>
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-lg text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      ถัดไป
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Detail Drawer View */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg sticky top-24">
                {selectedReceipt ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">ใบเสร็จรับเงินอ้างอิง</span>
                        <h4 className="text-sm font-extrabold text-slate-100 font-mono">{selectedReceipt.id}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${selectedReceipt.type === 'ยกเลิก' ? 'bg-rose-950 text-rose-300 border border-rose-800/40' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}>
                        {selectedReceipt.type}
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wide">วันที่ทำรายการเงินฝาก</span>
                        <span className="text-slate-100 font-semibold">{selectedReceipt.date}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wide">ชื่อภาคี / ลูกค้าผู้ชำระ</span>
                        <span className="text-slate-100 font-bold block bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 mt-1 leading-relaxed">
                          {selectedReceipt.customer}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wide">วัตถุประสงค์งานวิชาการ / คำอธิบาย</span>
                        <span className="text-slate-300 block text-[11px] mt-1 leading-relaxed leading-relaxed">
                          {selectedReceipt.description}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wide">สถาบันการชำระเงิน</span>
                        <span className="text-slate-200 font-semibold inline-flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          {selectedReceipt.bank}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wide">จำนวนเงินตามสัญญา</span>
                        <span className="text-lg font-black text-amber-300 font-mono block mt-1">
                          {selectedReceipt.type === 'ยกเลิก' ? 'ยกเลิกรายการ' : formatBaht(selectedReceipt.amount)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
                      💡 ข้อมูลใบเสร็จนี้ถูกบันทึกและตรวจสอบโดยระบบ Onestop System ประจำคณะวิทยาศาสตร์และนวัตกรรมดิจิทัล มีกลไกการรับรู้ยอดสุทธิและตรวจสอบย้อนกลับ (Traceability)
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <div className="text-slate-600 flex justify-center">
                      <svg className="w-10 h-10 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">คลิกเลือกรายการใบเสร็จในตารางด้านซ้าย เพื่อดึงข้อมูลเชิงลึกและรายละเอียดความโปร่งใสทางการเงิน</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* 3. DONATIONS & SPONSORS TAB */}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-100 tracking-tight mb-2">ทำเนียบผู้สนับสนุนและเงินบริจาคเพื่อการศึกษา</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                รายงานสรุปยอดผู้มีจิตศรัทธา บริษัทเอกชน และองค์กรวิจัย ที่สนับสนุนงบเพื่อการศึกษาและพัฒนาสังคมในระบบ Onestop System
              </p>
            </div>

            {/* Donor cards list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-950/30 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wide block uppercase">บุคคลผู้มีจิตศรัทธา</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">Mr.Shubhodeep Das</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">บริจาคสนับสนุนหลักเพื่อส่งเสริมพัฒนาศักยภาพทุนวิศวกรรมไอที</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">มูลค่าบริจาค</span>
                  <span className="text-base font-extrabold text-slate-200">{formatBaht(430000.00)}</span>
                </div>
              </div>

              <div className="bg-slate-950/30 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wide block uppercase">บุคคลผู้มีจิตศรัทธา</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">นางสาว ณัฐกานต์ ขวัญคง</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">บริจาคสนับสนุนสมทบเพื่อปรับปรุงห้องปฏิบัติการเทคโนโลยีชั้นสูง</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">มูลค่าบริจาค</span>
                  <span className="text-base font-extrabold text-slate-200">{formatBaht(400000.00)}</span>
                </div>
              </div>

              <div className="bg-slate-950/30 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wide block uppercase">พันธมิตรภาคการก่อสร้าง</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">บริษัท เอ เอ คอนสตรัคชั่น จำกัด</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">บริจาคเงินอุดหนุนเพื่อยกระดับความรู้และความร่วมมือภาคอุตสาหกรรม</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">มูลค่าบริจาค</span>
                  <span className="text-base font-extrabold text-slate-200">{formatBaht(200000.00)}</span>
                </div>
              </div>

              <div className="bg-slate-950/30 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wide block uppercase">พันธมิตรด้านพัฒนาทรัพย์สิน</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">บริษัท ไฮไลฟ์ แอสเซท จำกัด</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">บริจาคสนับสนุนกิจกรรมนวัตกรรมสร้างสรรค์เพื่อความรับผิดชอบสังคม</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">มูลค่าบริจาค</span>
                  <span className="text-base font-extrabold text-slate-200">{formatBaht(200000.00)}</span>
                </div>
              </div>

            </div>

            {/* Strategic Overview on Research Sponsorship */}
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">พันธมิตรสนับสนุนทุนวิจัยระดับชาติ & สากล</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800">
                  <h5 className="font-bold text-slate-100 border-b border-slate-800 pb-2 mb-2">Erasmus+ (สหภาพยุโรป)</h5>
                  <p className="text-slate-400 leading-relaxed">
                    มีรายรับสนับสนุนโครงการวิจัยต่อเนื่อง เช่น <span className="font-semibold text-slate-200">Tourism-Zero</span> และ <span className="font-semibold text-slate-200">SUNSPACE</span> แหล่งทุนรวมหลักล้านบาท เพื่อออกแบบหลักสูตรรักษ์โลกและการประมวลผลระบบคลาวด์ร่วมกับมหาวิทยาลัยในต่างประเทศ
                  </p>
                </div>

                <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800">
                  <h5 className="font-bold text-slate-100 border-b border-slate-800 pb-2 mb-2">สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)</h5>
                  <p className="text-slate-400 leading-relaxed">
                    สนับสนุนงบประมาณในอุตสาหกรรมเป้าหมายหลัก เช่น <span className="font-semibold text-slate-200">e-Sports (อีสปอร์ต)</span> และโครงการพัฒนา <span className="font-semibold text-slate-200">Animation และ Games ภาคเหนือ</span> เพื่อเพิ่มสมรรถนะบุคลากรยุคใหม่
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Onestop System | คณะวิทยาลัยศิลปะ สื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่</p>
          <p className="mt-1 text-[10px] text-slate-600">ออกแบบและควบคุมทางการเงินอย่างโปร่งใสตามกรอบมาตรฐาน ISO 30401: 2018</p>
        </div>
      </footer>

    </div>
  );
}