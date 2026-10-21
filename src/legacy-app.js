/* One Journey local prototype. Data is synthetic and stored only in this browser. */
(() => {
  const STORE_KEY = 'onejourney.education.v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const iconPaths = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
    wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 14h2"/><path d="M7 5V3h10v2"/>',
    handshake:'<path d="m3 12 4-4 4 1 2-1 5 1 3 3-7 7-4-3-3 1-4-5Z"/><path d="m7 8 3-3 4 1 3-1 4 4M9 13l5 4M12 11l5 4"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h8"/>',
    package:'<path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z"/><path d="m3 8 9 5 9-5M12 13v8M8 5l9 5"/>',
    network:'<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.8 7.2-4.6 8.6m7-8.6 4.6 8.6M7.5 18h9"/>',
    school:'<path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-6h6v6M2 21h20"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    graduation:'<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3.5 3 8.5 3 12 0v-5M22 10v6"/>',
    route:'<circle cx="6" cy="19" r="2"/><path d="M8 19h5a5 5 0 0 0 0-10h-2a5 5 0 0 1 0-10" transform="translate(0 3)"/><path d="m15 5 3-3 3 3"/>',
    arrowUpRight:'<path d="M7 17 17 7M8 7h9v9"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"/>',
    close:'<path d="m18 6-12 12M6 6l12 12"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    circle:'<circle cx="12" cy="12" r="9"/>',
    mapPin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    arrowLeft:'<path d="m15 18-6-6 6-6M9 12h12"/>'
  };
  const iconSvg = (name, size = 16) => `<svg class="ui-icon" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.circle}</svg>`;
  const id = prefix => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const money = value => new Intl.NumberFormat('th-TH', {maximumFractionDigits:0}).format(Number(value || 0));
  const localNow = new Date();
  const today = `${localNow.getFullYear()}-${String(localNow.getMonth()+1).padStart(2,'0')}-${String(localNow.getDate()).padStart(2,'0')}`;

  const programOptions = [
    'ดิจิทัลเกม','การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (ปกติ)','การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (นานาชาติ)',
    'แอนิเมชันและวิชวลเอฟเฟกต์','วิศวกรรมซอฟต์แวร์','บูรณาการอุตสาหกรรมดิจิทัล',
    'การจัดการความรู้และนวัตกรรม','การจัดการเทคโนโลยีดิจิทัล','หลักสูตรระยะสั้น BRIDGE','หลักสูตรร่วมกับต่างประเทศ'
  ];
  const unitOptions = ['หน่วยบริหารการศึกษา','หน่วยพัฒนานักศึกษา','International Student Center','ห้องสร้างสรรค์เพื่อการเรียนรู้','ศูนย์การเรียนรู้ร่วมการทำงาน','BRIDGE','PR & Marketing'];
  const statusOptions = ['ร่าง','เปิดใช้งาน','เปิดรับสมัคร','กำลังดำเนินการ','เสร็จสิ้น','พักใช้งาน'];
  const yesNo = ['ใช่','ไม่ใช่'];

  const schemas = {
    members: {title:'ทะเบียนสมาชิกกลาง', singular:'สมาชิก', description:'ข้อมูลสมาชิกกลางเพื่อเชื่อมประวัติการมีส่วนร่วมข้ามกิจกรรม หลักสูตร และหน่วยงาน', columns:[['name','สมาชิก'],['email','อีเมล'],['phone','เบอร์โทรศัพท์'],['group','กลุ่มข้อมูล'],['category','ประเภทสมาชิก'],['affiliation','โรงเรียน / หน่วยงาน'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อ-นามสกุล',type:'text',required:true},{key:'email',label:'อีเมล',type:'email',required:true},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'group',label:'กลุ่มข้อมูลหลัก',type:'select',options:['A0','A1','A2','B','C','D'],required:true},{key:'category',label:'ประเภทสมาชิก',type:'select',options:['นักเรียน ม.ปลาย','นักศึกษา','ศิษย์เก่า','ผู้ประกอบการ','บุคลากร','อาจารย์','ผู้บริหาร','บุคคลทั่วไป']},{key:'affiliation',label:'โรงเรียน / หน่วยงาน',type:'text'},{key:'status',label:'สถานะ',type:'select',options:['ใช้งาน','รอตรวจสอบ','ระงับ','ไม่ประสงค์รับข่าวสาร']},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    budgets: {title:'งบประมาณรายได้', singular:'รายการงบประมาณ', description:'ติดตามงบประมาณจัดสรร รายรับ และผลการใช้จ่าย แยกตามหน่วยและปีงบประมาณ', columns:[['fiscalYear','ปีงบประมาณ'],['unit','หน่วยงาน'],['category','หมวด'],['direction','ประเภทรายการ'],['amount','จำนวนเงิน'],['date','วันที่'],['status','สถานะ']], fields:[
      {key:'fiscalYear',label:'ปีงบประมาณ',type:'select',options:['2569','2570','2568'],required:true},{key:'unit',label:'หน่วยงาน',type:'select',options:unitOptions,required:true},{key:'category',label:'หมวดงบประมาณ',type:'select',options:['งบประมาณจัดสรร','ค่าลงทะเบียน','เงินสนับสนุน','ค่าใช้จ่ายกิจกรรม','รายได้อื่น'],required:true},{key:'direction',label:'ประเภทรายการ',type:'select',options:['รายรับ','รายจ่าย','จัดสรร'],required:true},{key:'amount',label:'จำนวนเงิน (บาท)',type:'number',required:true},{key:'date',label:'วันที่',type:'date',required:true},{key:'source',label:'แหล่งงบประมาณ',type:'text'},{key:'status',label:'สถานะ',type:'select',options:['วางแผน','อนุมัติ','ดำเนินการ','ปิดรายการ'],required:true},{key:'note',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    agreements: {title:'MOU / MOA', singular:'ข้อตกลงความร่วมมือ', description:'จัดการคู่ความร่วมมือ ข้อตกลง วันมีผล วันสิ้นสุด และกิจกรรมที่เกิดขึ้นจริง', columns:[['organization','องค์กร / คู่ความร่วมมือ'],['type','ประเภท'],['partnerGroup','กลุ่ม'],['startDate','วันเริ่มต้น'],['endDate','วันสิ้นสุด'],['status','สถานะ'],['owner','ผู้ดูแล']], fields:[
      {key:'organization',label:'ชื่อองค์กร',type:'text',required:true},{key:'type',label:'ประเภทข้อตกลง',type:'select',options:['MOU','MOA','ข้อตกลงอื่น'],required:true},{key:'partnerGroup',label:'กลุ่มคู่ความร่วมมือ',type:'select',options:['Potential Partner','โรงเรียน','วิเทศสัมพันธ์มหาวิทยาลัย','องค์กรอื่น'],required:true},{key:'startDate',label:'วันเริ่มต้น',type:'date',required:true},{key:'endDate',label:'วันสิ้นสุด',type:'date',required:true},{key:'status',label:'สถานะ',type:'select',options:['ร่าง','รออนุมัติ','ใช้งาน','ใกล้หมดอายุ','สิ้นสุด','ต่ออายุแล้ว'],required:true},{key:'owner',label:'ผู้รับผิดชอบ',type:'text'},{key:'value',label:'มูลค่าความร่วมมือ (บาท)',type:'number'},{key:'actualWork',label:'กิจกรรม/ผลงานที่เกิดขึ้นจริง',type:'textarea',wide:true},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    products: {title:'โปรดัก / หลักสูตร', singular:'โปรดักหรือหลักสูตร', description:'ทะเบียนข้อมูลต้นทางของหลักสูตรและโปรดัก หนึ่งรายการเชื่อมกับกิจกรรมหรือรอบจัดได้หลายครั้ง', columns:[['name','ชื่อโปรดัก / หลักสูตร'],['type','ประเภท'],['level','ระดับ'],['branch','สาขา'],['unit','หน่วยงาน'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อโปรดัก / หลักสูตร',type:'text',required:true},{key:'type',label:'ประเภท',type:'select',options:['หลักสูตรปริญญาตรี','หลักสูตรปริญญาโท','หลักสูตรปริญญาเอก','หลักสูตรระยะสั้น','หลักสูตรร่วม'],required:true},{key:'level',label:'ระดับ',type:'select',options:['ปริญญาตรี','ปริญญาโท','ปริญญาเอก','ระยะสั้น','ร่วม'],required:true},{key:'branch',label:'สาขา / กลุ่ม',type:'text'},{key:'unit',label:'หน่วยงานเจ้าของข้อมูล',type:'select',options:unitOptions,required:true},{key:'status',label:'สถานะ',type:'select',options:statusOptions},{key:'description',label:'รายละเอียด',type:'textarea',wide:true},{key:'expectedSkills',label:'ทักษะที่คาดว่าจะได้รับ',type:'textarea',wide:true}
    ]},
    activities: {title:'A0 · กิจกรรมและผู้เข้าร่วม', singular:'กิจกรรม', description:'ค่ายและกิจกรรมที่เชื่อมกับโปรดัก สมาชิก การลงทะเบียน และการเช็คอินจริง', columns:[['name','กิจกรรม'],['product','โปรดัก / หลักสูตร'],['unit','หน่วยงาน'],['startDate','วันจัด'],['venue','สถานที่'],['participants','ผู้ลงทะเบียน'],['attended','เข้าร่วมจริง'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อกิจกรรม',type:'text',required:true},{key:'product',label:'โปรดัก / หลักสูตร',type:'select',options:programOptions,required:true},{key:'unit',label:'หน่วยงานผู้จัด',type:'select',options:unitOptions,required:true},{key:'startDate',label:'วันเริ่มต้น',type:'date',required:true},{key:'endDate',label:'วันสิ้นสุด',type:'date'},{key:'venue',label:'สถานที่',type:'text'},{key:'capacity',label:'จำนวนรับ',type:'number'},{key:'audience',label:'กลุ่มเป้าหมาย',type:'text'},{key:'walkIn',label:'รับสมัครหน้างาน',type:'select',options:yesNo},{key:'checkinMethod',label:'วิธีเช็คอิน',type:'select',options:['เจ้าหน้าที่ค้นหา/บันทึก','สแกน QR โดยเจ้าหน้าที่','ผู้เข้าร่วมสแกน QR']},{key:'partner','label':'พาร์ทเนอร์',type:'text'},{key:'status',label:'สถานะ',type:'select',options:statusOptions},{key:'description',label:'รายละเอียดกิจกรรม',type:'textarea',wide:true}
    ]},
    applicants: {title:'A1 · ผู้สมัครหลักสูตร', singular:'ผู้สมัครหลักสูตร', description:'ผู้สนใจและผู้สมัครหลักสูตร แยกจากผู้เข้าร่วมกิจกรรม และเก็บสถานะการสมัครเป็นลำดับ', columns:[['name','ผู้สมัคร'],['program','หลักสูตร'],['applyYear','รอบ / ปี'],['email','อีเมล'],['source','แหล่งที่มา'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อผู้สมัคร',type:'text',required:true},{key:'email',label:'อีเมล',type:'email'},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'program',label:'หลักสูตรที่สมัคร',type:'select',options:programOptions,required:true},{key:'applyYear',label:'รอบ / ปีการศึกษา',type:'text',required:true},{key:'source',label:'ช่องทางที่มา',type:'select',options:['เว็บไซต์','กิจกรรมแนะแนว','โรงเรียนเครือข่าย','พาร์ทเนอร์','อื่น ๆ']},{key:'status',label:'สถานะการสมัคร',type:'select',options:['สนใจ','เริ่มสมัคร','ส่งใบสมัครแล้ว','ตรวจเอกสาร','ผ่านการคัดเลือก','ยืนยันสิทธิ์','ไม่ผ่าน','สละสิทธิ์'],required:true},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    jointCourses: {title:'A2 · หลักสูตรร่วม', singular:'หลักสูตรร่วม', description:'หลักสูตรหรือกิจกรรมการเรียนรู้ที่ทำร่วมกับสถาบันหรือพาร์ทเนอร์ พร้อมความเชื่อมโยงกับ MOU/MOA', columns:[['name','ชื่อหลักสูตรร่วม'],['institution','สถาบันร่วม'],['country','ประเทศ'],['program','หลักสูตร CAMT'],['startDate','ช่วงเวลา'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อหลักสูตรร่วม',type:'text',required:true},{key:'institution',label:'สถาบันคู่ความร่วมมือ',type:'text',required:true},{key:'country',label:'ประเทศ',type:'text'},{key:'program',label:'หลักสูตร CAMT',type:'select',options:programOptions},{key:'agreement','label':'MOU / MOA อ้างอิง',type:'text'},{key:'startDate',label:'วันเริ่มต้น',type:'date'},{key:'endDate',label:'วันสิ้นสุด',type:'date'},{key:'cohort',label:'รุ่น / จำนวนผู้เรียน',type:'text'},{key:'status',label:'สถานะ',type:'select',options:statusOptions},{key:'notes',label:'รายละเอียด',type:'textarea',wide:true}
    ]},
    potentialPartners: {title:'B · Potential Partners', singular:'Potential Partner', description:'องค์กรหรือผู้สนใจที่อยู่ระหว่างการสำรวจและพัฒนาความร่วมมือ', columns:[['name','องค์กร'],['country','ประเทศ'],['field','ความสนใจ'],['contact','ผู้ติดต่อ'],['lastContact','ติดต่อล่าสุด'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อองค์กร',type:'text',required:true},{key:'country',label:'ประเทศ / จังหวัด',type:'text'},{key:'field',label:'หัวข้อความร่วมมือ',type:'text'},{key:'contact',label:'ผู้ติดต่อ',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'lastContact',label:'ติดต่อล่าสุด',type:'date'},{key:'status',label:'สถานะ',type:'select',options:['พบรายชื่อ','ติดต่อแล้ว','กำลังหารือ','ทำข้อตกลงแล้ว','พักการติดต่อ'],required:true},{key:'notes',label:'บันทึกการหารือ',type:'textarea',wide:true}
    ]},
    schools: {title:'B · โรงเรียนร่วมความร่วมมือ', singular:'โรงเรียนเครือข่าย', description:'ข้อมูลโรงเรียน ผู้ประสานงาน กิจกรรมแนะแนว และการส่งต่อผู้สมัคร', columns:[['name','โรงเรียน'],['province','จังหวัด'],['contact','ผู้ประสานงาน'],['students','ผู้เรียนที่เชื่อมโยง'],['lastActivity','กิจกรรมล่าสุด'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อโรงเรียน',type:'text',required:true},{key:'province',label:'จังหวัด',type:'text'},{key:'contact',label:'ผู้ประสานงาน',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'students',label:'จำนวนผู้เรียนที่เชื่อมโยง',type:'number'},{key:'lastActivity',label:'กิจกรรมล่าสุด',type:'text'},{key:'status',label:'สถานะความร่วมมือ',type:'select',options:['กำลังดำเนินการ','มีข้อตกลง','ติดตามต่อ','พักความร่วมมือ']},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    intlRelations: {title:'B · วิเทศสัมพันธ์มหาวิทยาลัย', singular:'ความสัมพันธ์ระหว่างประเทศ', description:'สถาบันต่างประเทศ ผู้ประสานงาน โครงการแลกเปลี่ยน และข้อตกลงที่เกี่ยวข้อง', columns:[['name','สถาบัน'],['country','ประเทศ'],['relationType','ประเภทความสัมพันธ์'],['contact','ผู้ประสานงาน'],['agreement','MOU / MOA'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อสถาบัน',type:'text',required:true},{key:'country',label:'ประเทศ',type:'text',required:true},{key:'relationType',label:'ประเภทความสัมพันธ์',type:'select',options:['แลกเปลี่ยนนักศึกษา','หลักสูตรร่วม','วิจัย/วิชาการ','ดูงาน','อื่น ๆ']},{key:'contact',label:'ผู้ประสานงาน',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'agreement',label:'MOU / MOA อ้างอิง',type:'text'},{key:'status',label:'สถานะ',type:'select',options:['กำลังดำเนินการ','มีข้อตกลง','ติดตามต่อ','สิ้นสุด']},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    alumni: {title:'C · ศิษย์เก่า', singular:'ข้อมูลศิษย์เก่า', description:'ข้อมูลการติดต่อและเส้นทางอาชีพของศิษย์เก่า โดยจำกัดการเข้าถึงตามบทบาท', columns:[['name','ศิษย์เก่า'],['program','หลักสูตร'],['graduationYear','ปีที่จบ'],['employer','องค์กรปัจจุบัน'],['position','ตำแหน่ง'],['contactStatus','สถานะการติดต่อ']], fields:[
      {key:'name',label:'ชื่อ-นามสกุล',type:'text',required:true},{key:'email',label:'อีเมล',type:'email'},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'program',label:'หลักสูตร',type:'select',options:programOptions,required:true},{key:'graduationYear',label:'ปีที่สำเร็จการศึกษา',type:'text'},{key:'employer',label:'องค์กรปัจจุบัน',type:'text'},{key:'position',label:'ตำแหน่งงาน',type:'text'},{key:'sector',label:'ประเภทธุรกิจ',type:'text'},{key:'contactStatus',label:'สถานะการติดต่อ',type:'select',options:['ยืนยันข้อมูลแล้ว','ต้องติดตาม','ไม่ประสงค์รับข่าวสาร']},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    studentHistories: {title:'D · ประวัตินักเรียนตั้งแต่ต้นจนจบ', singular:'ประวัตินักเรียน', description:'มุมมองเส้นทางนักเรียนแบบต่อเนื่อง ตั้งแต่สนใจ สมัคร เข้าเรียน เข้าร่วมกิจกรรม จนสำเร็จการศึกษา', columns:[['name','นักเรียน / นักศึกษา'],['studentId','รหัสนักศึกษา'],['program','หลักสูตร'],['admissionYear','ปีเข้า'],['currentStage','สถานะปัจจุบัน'],['graduationYear','ปีจบ']], fields:[
      {key:'name',label:'ชื่อ-นามสกุล',type:'text',required:true},{key:'studentId',label:'รหัสนักศึกษา',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'program',label:'หลักสูตร',type:'select',options:programOptions,required:true},{key:'admissionYear',label:'ปีที่เข้าศึกษา',type:'text',required:true},{key:'currentStage',label:'ขั้นตอนปัจจุบัน',type:'select',options:['ผู้สนใจ','ผู้สมัคร','ยืนยันสิทธิ์','กำลังศึกษา','ฝึกงาน / สหกิจ','สำเร็จการศึกษา','พ้นสภาพ'],required:true},{key:'graduationYear',label:'ปีสำเร็จการศึกษา',type:'text'},{key:'advisor',label:'อาจารย์ / ผู้ประสานงาน',type:'text'},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]}
  };

  const seed = {
    budgets:[
      {id:'BUD-001',fiscalYear:'2569',unit:'หน่วยพัฒนานักศึกษา',category:'งบประมาณจัดสรร',direction:'จัดสรร',amount:420000,date:'2026-10-01',source:'งบประมาณวิทยาลัย',status:'อนุมัติ',note:'ข้อมูลสมมติสำหรับตัวอย่าง'},
      {id:'BUD-002',fiscalYear:'2569',unit:'BRIDGE',category:'ค่าลงทะเบียน',direction:'รายรับ',amount:86500,date:'2026-10-03',source:'หลักสูตรระยะสั้น',status:'ดำเนินการ',note:'ข้อมูลสมมติสำหรับตัวอย่าง'},
      {id:'BUD-003',fiscalYear:'2569',unit:'ห้องสร้างสรรค์เพื่อการเรียนรู้',category:'ค่าใช้จ่ายกิจกรรม',direction:'รายจ่าย',amount:24800,date:'2026-10-08',source:'งบกิจกรรม',status:'ปิดรายการ',note:'ข้อมูลสมมติสำหรับตัวอย่าง'},
      {id:'BUD-004',fiscalYear:'2569',unit:'หน่วยบริหารการศึกษา',category:'เงินสนับสนุน',direction:'รายรับ',amount:150000,date:'2026-10-11',source:'พาร์ทเนอร์',status:'อนุมัติ',note:'ข้อมูลสมมติสำหรับตัวอย่าง'}
    ],
    agreements:[
      {id:'AGR-001',organization:'องค์กรตัวอย่างด้านสื่อ',type:'MOU',partnerGroup:'Potential Partner',startDate:'2025-11-01',endDate:'2027-10-31',status:'ใช้งาน',owner:'ผู้ประสานงานตัวอย่าง',value:120000,actualWork:'กิจกรรมแลกเปลี่ยนความรู้ (ข้อมูลสาธิต)',notes:'ข้อมูลสมมติ'},
      {id:'AGR-002',organization:'โรงเรียนเครือข่ายตัวอย่าง',type:'MOA',partnerGroup:'โรงเรียน',startDate:'2024-06-15',endDate:'2026-12-31',status:'ใกล้หมดอายุ',owner:'ทีมแนะแนว',value:45000,actualWork:'ค่ายทดลองเรียน (ข้อมูลสาธิต)',notes:'ข้อมูลสมมติ'},
      {id:'AGR-003',organization:'มหาวิทยาลัยคู่ความร่วมมือตัวอย่าง',type:'MOU',partnerGroup:'วิเทศสัมพันธ์มหาวิทยาลัย',startDate:'2025-02-01',endDate:'2028-01-31',status:'ใช้งาน',owner:'International Student Center',value:0,actualWork:'อยู่ระหว่างออกแบบหลักสูตรร่วม',notes:'ข้อมูลสมมติ'}
    ],
    products:[
      {id:'PRD-001',name:'ดิจิทัลเกม',type:'หลักสูตรปริญญาตรี',level:'ปริญญาตรี',branch:'ดิจิทัลเกม',unit:'หน่วยบริหารการศึกษา',status:'เปิดใช้งาน',description:'ข้อมูลหลักสูตรจากแผนผังโครงสร้าง',expectedSkills:'ตามหลักสูตร'},
      {id:'PRD-002',name:'การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (ปกติ)',type:'หลักสูตรปริญญาตรี',level:'ปริญญาตรี',branch:'MMIT ปกติ',unit:'หน่วยบริหารการศึกษา',status:'เปิดใช้งาน',description:'ข้อมูลหลักสูตรจากแผนผังโครงสร้าง',expectedSkills:'ตามหลักสูตร'},
      {id:'PRD-003',name:'การจัดการเทคโนโลยีดิจิทัล',type:'หลักสูตรปริญญาโท',level:'ปริญญาโท',branch:'DTM',unit:'หน่วยบริหารการศึกษา',status:'เปิดใช้งาน',description:'ข้อมูลหลักสูตรจากแผนผังโครงสร้าง',expectedSkills:'ตามหลักสูตร'},
      {id:'PRD-004',name:'หลักสูตรระยะสั้น BRIDGE',type:'หลักสูตรระยะสั้น',level:'ระยะสั้น',branch:'BRIDGE',unit:'BRIDGE',status:'เปิดใช้งาน',description:'หลักสูตรระยะสั้นและหลักสูตรร่วมตามแผนผังโครงสร้าง',expectedSkills:'กำหนดตามแต่ละรุ่น'}
    ],
    members:[
      {id:'MEM-001',name:'ผู้เข้าร่วมตัวอย่าง 01',email:'demo01@example.invalid',phone:'0800000001',group:'A0',category:'นักเรียน ม.ปลาย',affiliation:'โรงเรียนตัวอย่าง',status:'ใช้งาน'},
      {id:'MEM-002',name:'ผู้เข้าร่วมตัวอย่าง 02',email:'demo02@example.invalid',phone:'0800000002',group:'A0',category:'นักศึกษา',affiliation:'มหาวิทยาลัยตัวอย่าง',status:'ใช้งาน'},
      {id:'MEM-003',name:'ผู้สมัครตัวอย่าง 01',email:'applicant@example.invalid',phone:'0800000003',group:'A1',category:'ผู้สมัครหลักสูตร',affiliation:'โรงเรียนตัวอย่าง',status:'ใช้งาน'}
    ],
    activities:[
      {id:'EVT-001',name:'ค่ายทดลองเรียนสื่อดิจิทัล (ตัวอย่าง)',product:'ดิจิทัลเกม',unit:'หน่วยพัฒนานักศึกษา',startDate:'2026-11-08',endDate:'2026-11-09',venue:'วิทยาลัย CAMT',capacity:60,audience:'นักเรียน ม.4–6',walkIn:'ไม่ใช่',checkinMethod:'สแกน QR โดยเจ้าหน้าที่',partner:'โรงเรียนเครือข่ายตัวอย่าง',status:'เปิดรับสมัคร',description:'ข้อมูลกิจกรรมสังเคราะห์เพื่อสาธิตหน้าจอ'},
      {id:'EVT-002',name:'Workshop สร้างสรรค์ด้วย AI (ตัวอย่าง)',product:'หลักสูตรระยะสั้น BRIDGE',unit:'BRIDGE',startDate:'2026-11-22',endDate:'2026-11-22',venue:'ห้องเรียนตัวอย่าง',capacity:40,audience:'นักศึกษาและผู้สนใจ',walkIn:'ใช่',checkinMethod:'เจ้าหน้าที่ค้นหา/บันทึก',partner:'องค์กรตัวอย่างด้านสื่อ',status:'เปิดรับสมัคร',description:'ข้อมูลกิจกรรมสังเคราะห์เพื่อสาธิตหน้าจอ'},
      {id:'EVT-003',name:'กิจกรรมแนะแนวหลักสูตร (ตัวอย่าง)',product:'การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (ปกติ)',unit:'หน่วยบริหารการศึกษา',startDate:'2026-12-05',endDate:'2026-12-05',venue:'โรงเรียนเครือข่ายตัวอย่าง',capacity:80,audience:'นักเรียน ม.ปลาย',walkIn:'ไม่ใช่',checkinMethod:'ผู้เข้าร่วมสแกน QR',partner:'โรงเรียนเครือข่ายตัวอย่าง',status:'ร่าง',description:'ข้อมูลกิจกรรมสังเคราะห์เพื่อสาธิตหน้าจอ'}
    ],
    registrations:[
      {id:'REG-001',activityId:'EVT-001',memberId:'MEM-001',registeredAt:'2026-10-14',status:'ยืนยันแล้ว',checkInAt:''},
      {id:'REG-002',activityId:'EVT-001',memberId:'MEM-002',registeredAt:'2026-10-15',status:'ยืนยันแล้ว',checkInAt:''}
    ],
    applicants:[
      {id:'APP-001',name:'ผู้สมัครตัวอย่าง 01',email:'applicant@example.invalid',phone:'0800000003',program:'ดิจิทัลเกม',applyYear:'2569',source:'กิจกรรมแนะแนว',status:'ส่งใบสมัครแล้ว',notes:'ข้อมูลสมมติ'},
      {id:'APP-002',name:'ผู้สมัครตัวอย่าง 02',email:'demoapp@example.invalid',phone:'0800000004',program:'วิศวกรรมซอฟต์แวร์',applyYear:'2569',source:'เว็บไซต์',status:'สนใจ',notes:'ข้อมูลสมมติ'}
    ],
    jointCourses:[{id:'JNT-001',name:'หลักสูตรร่วมด้านสื่อสร้างสรรค์ (ตัวอย่าง)',institution:'มหาวิทยาลัยคู่ความร่วมมือตัวอย่าง',country:'ญี่ปุ่น',program:'หลักสูตรระยะสั้น BRIDGE',agreement:'AGR-003',startDate:'2027-02-01',endDate:'2027-06-30',cohort:'รุ่นตัวอย่าง / 20 คน',status:'ร่าง',notes:'ข้อมูลสมมติ'}],
    potentialPartners:[{id:'POT-001',name:'องค์กรตัวอย่างด้านสื่อ',country:'ไทย',field:'ฝึกงานและโครงงาน',contact:'ผู้ประสานงานตัวอย่าง',email:'partner@example.invalid',lastContact:'2026-10-09',status:'กำลังหารือ',notes:'ข้อมูลสมมติ'}],
    schools:[{id:'SCH-001',name:'โรงเรียนเครือข่ายตัวอย่าง',province:'เชียงใหม่',contact:'ครูผู้ประสานงานตัวอย่าง',email:'school@example.invalid',students:18,lastActivity:'ค่ายทดลองเรียน (ตัวอย่าง)',status:'กำลังดำเนินการ',notes:'ข้อมูลสมมติ'}],
    intlRelations:[{id:'INT-001',name:'มหาวิทยาลัยคู่ความร่วมมือตัวอย่าง',country:'ญี่ปุ่น',relationType:'หลักสูตรร่วม',contact:'เจ้าหน้าที่ประสานงานตัวอย่าง',email:'global@example.invalid',agreement:'AGR-003',status:'กำลังดำเนินการ',notes:'ข้อมูลสมมติ'}],
    alumni:[{id:'ALU-001',name:'ศิษย์เก่าตัวอย่าง 01',email:'alumni@example.invalid',phone:'0800000005',program:'ดิจิทัลเกม',graduationYear:'2565',employer:'บริษัทตัวอย่าง',position:'นักออกแบบสื่อ',sector:'ดิจิทัลคอนเทนต์',contactStatus:'ยืนยันข้อมูลแล้ว',notes:'ข้อมูลสมมติ'}],
    studentHistories:[{id:'STU-001',name:'นักศึกษาตัวอย่าง 01',studentId:'DEMO-001',email:'student@example.invalid',program:'ดิจิทัลเกม',admissionYear:'2566',currentStage:'กำลังศึกษา',graduationYear:'',advisor:'อาจารย์ตัวอย่าง',notes:'ข้อมูลสมมติ; timeline ต้องยืนยันกับเจ้าของข้อมูล'}],
    journeyEvents:[
      {id:'JEV-001',historyId:'STU-001',date:'2025-08-01',stage:'เริ่มสนใจ / แนะแนว',description:'เข้าร่วมกิจกรรมแนะแนวหลักสูตร (ตัวอย่าง)',source:'กิจกรรม A0'},
      {id:'JEV-002',historyId:'STU-001',date:'2025-10-20',stage:'สมัครหลักสูตร',description:'ผู้สมัครส่งข้อมูลความสนใจ (ตัวอย่าง)',source:'ผู้สมัคร A1'},
      {id:'JEV-003',historyId:'STU-001',date:'2026-06-15',stage:'ยืนยันสิทธิ์ / เข้าเรียน',description:'เริ่มเส้นทางการศึกษา (ตัวอย่าง)',source:'เจ้าหน้าที่เพิ่มข้อมูล'}
    ]
  };

  let state = loadState();
  let currentRoute = 'overview';
  let currentGlobalQuery = '';
  let currentActivityId = '';
  let activityMode = 'self';
  let overviewUnit = 'all';
  let overviewYear = '2569';
  let overviewPeriod = 'ปีปัจจุบัน';
  let budgetYear = '2569';
  let budgetUnit = 'all';
  const entityStatusByRoute={};

  function loadState(){
    try { const raw = localStorage.getItem(STORE_KEY); if(raw){ const parsed=JSON.parse(raw); if(parsed && parsed.data && parsed.version===1) return parsed; } } catch(error) { console.warn('Could not load local One Journey data', error); }
    const initial={version:1,demo:true,updatedAt:new Date().toISOString(),data:structuredClone(seed)};
    try{localStorage.setItem(STORE_KEY,JSON.stringify(initial));}catch(error){console.warn('Local storage unavailable',error);}
    return initial;
  }
  function saveState(){state.updatedAt=new Date().toISOString();try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(error){toast('บันทึกในเบราว์เซอร์ไม่สำเร็จ พื้นที่จัดเก็บอาจเต็ม');}}
  const data = key => state.data[key] || [];
  function toast(message){const node=document.createElement('div');node.className='toast';node.textContent=message;$('#toastRegion').append(node);setTimeout(()=>node.remove(),3000);}

  const navSections=[
    {label:'ภาพรวม',items:[['overview','หน้าหลัก','home']]},
    {label:'งบประมาณและความร่วมมือ',items:[['budgets','งบประมาณรายได้','wallet'],['agreements','MOU / MOA','handshake']]},
    {label:'กลุ่มลูกค้า A',items:[['members','ทะเบียนสมาชิกกลาง','users'],['activities','A0 · กิจกรรม / ผู้เข้าร่วม','calendar'],['applicants','A1 · ผู้สมัครหลักสูตร','user'],['jointCourses','A2 · หลักสูตรร่วม','book'],['products','ทะเบียนโปรดัก / หลักสูตร','package']]},
    {label:'เครือข่ายกลุ่ม B',items:[['potentialPartners','Potential Partners','network'],['schools','โรงเรียนร่วมความร่วมมือ','school'],['intlRelations','วิเทศสัมพันธ์มหาวิทยาลัย','globe']]},
    {label:'บุคคลและเส้นทางการศึกษา',items:[['alumni','C · ศิษย์เก่า','graduation'],['studentHistories','D · ประวัตินักเรียน','route']]}
  ];
  function renderNav(){
    $('#nav').innerHTML=navSections.map(section=>`<div class="nav-group-label">${escapeHtml(section.label)}</div>${section.items.map(([key,label,icon])=>`<a href="#${key}" class="nav-link" data-route="${key}"><span class="nav-icon">${iconSvg(icon,17)}</span><span>${escapeHtml(label)}</span></a>`).join('')}`).join('');
    $$('#nav [data-route]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();go(link.dataset.route);}));
  }
  function go(route){currentRoute=route;currentGlobalQuery='';if(route!=='search')location.hash=route;render();$('#sidebar').classList.remove('open');}
  function setHeading(title,description,actions=''){
    return `<div class="demo-banner"><span class="banner-dot"></span><span><strong>ข้อมูลตัวอย่างสำหรับพัฒนา</strong> ข้อมูลในหน้านี้ยังไม่ใช่ข้อมูลจริง และบันทึกไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น</span><button type="button" data-action="download-json">สำรองข้อมูล JSON</button></div><div class="page-head"><div><span class="eyebrow">ระบบงานบริการการศึกษา · วิทยาลัย CAMT มหาวิทยาลัยเชียงใหม่</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div><div class="head-actions">${actions}</div></div>`;
  }
  function renderOverviewHero(){
    return `<div class="demo-banner"><span class="banner-dot"></span><span><strong>ข้อมูลตัวอย่างสำหรับพัฒนา</strong> ข้อมูลในหน้านี้ยังไม่ใช่ข้อมูลจริง และบันทึกไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น</span><button type="button" data-action="download-json">สำรองข้อมูล JSON</button></div><section class="welcome-banner"><div class="welcome-copy"><span class="welcome-kicker"><i></i> CAMT · EDUCATION SERVICES</span><h1>One Journey</h1><p class="welcome-lead">เชื่อมต่อทุกโอกาส สร้างประสบการณ์ที่มากกว่า</p><p class="welcome-detail">พื้นที่กลางสำหรับข้อมูลการศึกษา กิจกรรม หลักสูตร และเครือข่ายความร่วมมือ<br>วิทยาลัยศิลปะ สื่อ และเทคโนโลยี มหาวิทยาลัยเชียงใหม่</p><span class="welcome-chip">ระบบงานบริการการศึกษา <b>${iconSvg('arrowUpRight',13)}</b></span></div><div class="welcome-art" aria-hidden="true"><svg viewBox="0 0 520 240" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="412" cy="73" r="42" fill="#FFD68C" opacity=".72"/><path d="M0 191C93 145 146 183 226 157c79-26 157-57 294-3v86H0v-49Z" fill="#FFA53E" opacity=".72"/><path d="M0 211c101-54 165-6 260-42 78-29 147-35 260 4v67H0v-29Z" fill="#F9832F" opacity=".68"/><path d="M91 75c8-19 35-22 47-7 8-18 39-17 45 5 19 1 26 12 27 23H81c1-10 3-17 10-21Z" fill="white" opacity=".66"/><path d="M263 46c5-13 24-15 33-5 7-13 27-12 32 4 13 1 19 9 19 16h-92c1-7 3-12 9-15Z" fill="white" opacity=".58"/><g fill="#C95224"><path d="M316 102h128v85H316z"/><path d="m300 105 79-37 81 37H300Z" fill="#F26A2B"/><path d="M354 127h20v27h-20zM390 127h20v27h-20zM331 127h14v18h-14zM419 127h14v18h-14z" fill="#FFE3B7"/><path d="M369 164h22v23h-22z" fill="#FFE3B7"/><path d="M377 66V39h4v29" fill="#98421F"/><path d="M381 40h28l-11 9 11 9h-28V40Z" fill="#FF7A32"/></g><g fill="#F8D39E"><circle cx="274" cy="167" r="18"/><path d="M256 183h36v52h-36zM261 153c-3-9 4-17 13-17s15 8 12 17l-4 12h-17l-4-12Z" fill="#294D69"/><path d="m259 190-12 38h10l13-27M286 190l10 38h10l-10-42" fill="#294D69"/><path d="m256 192-17 21 5 5 22-18M291 191l16 11-4 7-19-9" fill="#FFE0B7"/><path d="m276 188 6-25 7 2-2 27" fill="#F6A33D"/></g><g fill="#162F46"><circle cx="198" cy="177" r="13"/><path d="M185 190h27v42h-27z" fill="#F26A2B"/><path d="m187 197-17 17 4 5 18-13M210 197l14 14-4 5-17-12" fill="#FFD7A2"/><path d="m188 229-8 11h9l10-10M205 229l8 11h9l-10-12"/><path d="M190 164c2-11 17-13 22-3l-1 13h-21v-10Z" fill="#38251B"/></g><g fill="#FFF1D9" opacity=".85"><circle cx="55" cy="183" r="7"/><circle cx="61" cy="163" r="5"/><path d="M53 189h15v44H53z"/><path d="m54 202-10 18 4 3 11-15M65 202l10 15 4-3-10-18"/></g><g fill="#8F4A26" opacity=".58"><circle cx="478" cy="143" r="16"/><path d="M474 154h8v75h-8z"/><circle cx="105" cy="154" r="13"/><path d="M102 164h7v61h-7z"/></g></svg></div><div class="welcome-orbit orbit-one"></div><div class="welcome-orbit orbit-two"></div></section><div class="page-head overview-title"><div><span class="eyebrow">ภาพรวมระบบ</span><h2>ภาพรวมงานการศึกษา</h2><p>ข้อมูลที่เชื่อมโยงโปรดัก กิจกรรม สมาชิก งบประมาณ และความร่วมมือ</p></div></div>`;
  }
  function button(label,action,kind='button',icon=''){return `<button class="button ${kind}" type="button" data-action="${action}">${icon?`<span>${iconSvg(icon,14)}</span>`:''}${escapeHtml(label)}</button>`;}
  function allActivities(){return data('activities');}
  function registrationsFor(activityId){return data('registrations').filter(row=>row.activityId===activityId);}
  function memberById(memberId){return data('members').find(member=>member.id===memberId);}
  function updateNavState(){
    $$('#nav [data-route]').forEach(link=>link.classList.toggle('active',link.dataset.route===currentRoute || (currentRoute.startsWith('activity:')&&link.dataset.route==='activities') || (currentRoute.startsWith('student:')&&link.dataset.route==='studentHistories')));
    $('#breadcrumbTitle').textContent=currentRoute==='overview'?'หน้าหลัก':currentRoute==='search'?'ผลการค้นหา':currentRoute.startsWith('activity:')?'ผู้เข้าร่วมกิจกรรม':currentRoute.startsWith('student:')?'เส้นทางนักเรียน':(schemas[currentRoute]?.title||'หน้าหลัก');
  }

  function render(){updateNavState();const root=$('#content');
    try{
      if(currentRoute==='overview')root.innerHTML=renderOverview();
      else if(currentRoute==='search')root.innerHTML=renderSearchResults();
      else if(currentRoute.startsWith('activity:'))root.innerHTML=renderActivityDetail(currentRoute.split(':')[1]);
      else if(currentRoute.startsWith('student:'))root.innerHTML=renderStudentJourney(currentRoute.split(':')[1]);
      else if(schemas[currentRoute])root.innerHTML=renderEntityPage(currentRoute);
      else {currentRoute='overview';root.innerHTML=renderOverview();updateNavState();}
      bindActions(root);
    }catch(error){console.error('One Journey render failed',currentRoute,error);root.innerHTML=`<div class="notice-card"><strong>เปิดหน้านี้ไม่สำเร็จ</strong><br>${escapeHtml(error.message||'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ')}</div>`;}
  }
  function renderOverview(){
    const yearDigits=overviewYear==='2568'?'2025':'2026';
    const periodStart=new Date();if(overviewPeriod==='6 เดือนล่าสุด')periodStart.setMonth(periodStart.getMonth()-6);else if(overviewPeriod==='12 เดือนล่าสุด')periodStart.setMonth(periodStart.getMonth()-12);else periodStart.setMonth(0,1);
    const activityRows=data('activities').filter(row=>{const date=new Date(`${row.startDate||yearDigits+'-01-01'}T00:00:00`);return (overviewUnit==='all'||row.unit===overviewUnit)&&String(date.getFullYear())===yearDigits&&date>=periodStart;});
    const activityIds=new Set(activityRows.map(row=>row.id));
    const filteredRegistrations=data('registrations').filter(row=>activityIds.has(row.activityId));
    const members=new Set(filteredRegistrations.map(row=>row.memberId)).size,activities=activityRows.length,partners=data('potentialPartners').length+data('schools').length+data('intlRelations').length;
    const registered=filteredRegistrations.length,attended=filteredRegistrations.filter(row=>row.checkInAt).length;
    const revenue=data('budgets').filter(row=>row.direction==='รายรับ'&&row.fiscalYear===overviewYear&&(overviewUnit==='all'||row.unit===overviewUnit)).reduce((sum,row)=>sum+Number(row.amount||0),0);
    const activeAgreements=data('agreements').filter(row=>row.status==='ใช้งาน'||row.status==='ใกล้หมดอายุ').length;
    const stats=[['โปรดัก / หลักสูตร',data('products').length,'รายการในทะเบียน','package'],['กิจกรรมทั้งหมด',activities,'A0 · ค่ายและกิจกรรม','calendar'],['สมาชิกในข้อมูลตัวอย่าง',members,'จำนวนคนไม่ซ้ำ','users'],['พาร์ทเนอร์และเครือข่าย',partners,'กลุ่ม B','handshake']];
    const monthNames=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    const monthlyCounts=Array.from({length:12},()=>({registered:0,attended:0}));
    activityRows.forEach(activity=>{
      const activityDate=new Date(`${activity.startDate||yearDigits+'-01-01'}T00:00:00`);
      if(Number.isNaN(activityDate.getTime()))return;
      const month=monthlyCounts[activityDate.getMonth()];
      const registrations=filteredRegistrations.filter(row=>row.activityId===activity.id);
      month.registered+=registrations.length;
      month.attended+=registrations.filter(row=>row.checkInAt).length;
    });
    const chartMax=Math.max(1,...monthlyCounts.flatMap(month=>[month.registered,month.attended]));
    return `${renderOverviewHero()}
      <div class="filter-row"><span class="small-label">ตัวกรองภาพรวม</span><select class="field-control" id="overviewYear"><option value="2569" ${overviewYear==='2569'?'selected':''}>ปีการศึกษา 2569</option><option value="2568" ${overviewYear==='2568'?'selected':''}>ปีการศึกษา 2568</option></select><select class="field-control" id="overviewUnit"><option value="all" ${overviewUnit==='all'?'selected':''}>ทุกหน่วยงาน</option>${unitOptions.map(unit=>`<option value="${escapeHtml(unit)}" ${overviewUnit===unit?'selected':''}>${escapeHtml(unit)}</option>`).join('')}</select><select class="field-control" id="overviewPeriod"><option ${overviewPeriod==='ปีปัจจุบัน'?'selected':''}>ปีปัจจุบัน</option><option ${overviewPeriod==='6 เดือนล่าสุด'?'selected':''}>6 เดือนล่าสุด</option><option ${overviewPeriod==='12 เดือนล่าสุด'?'selected':''}>12 เดือนล่าสุด</option></select><span class="filter-spacer"></span><span class="small-label">อัปเดต ${new Date(state.updatedAt).toLocaleDateString('th-TH')}</span></div>
      <section class="stat-grid">${stats.map(([label,value,note,icon])=>`<article class="stat-card"><div class="stat-icon">${iconSvg(icon,21)}</div><div><div class="stat-label">${label}</div><div class="stat-value">${money(value)}</div><div class="stat-note muted">${note}</div></div></article>`).join('')}</section>
      <div class="dashboard-grid"><section class="panel"><div class="panel-head"><div><h2>ภาพรวมการเข้าร่วมกิจกรรม</h2><p>จำนวนลงทะเบียนและเข้าร่วมจริงแยกตามเดือนของวันจัดกิจกรรม</p></div><div class="chart-legend"><span class="legend-item"><i class="legend-dot blue"></i>ลงทะเบียน</span><span class="legend-item"><i class="legend-dot"></i>เข้าร่วมจริง</span></div></div><div class="panel-body"><div class="bar-chart ${activityRows.length?'':'empty'}">${activityRows.length?monthlyCounts.map((month,index)=>`<div class="bar-group"><div class="bar-stack"><i class="bar blue" data-zero="${month.registered?'false':'true'}" style="height:${month.registered?Math.max(2,Math.round(month.registered/chartMax*100)):0}%" title="${monthNames[index]} ลงทะเบียน ${money(month.registered)} คน"></i><i class="bar" data-zero="${month.attended?'false':'true'}" style="height:${month.attended?Math.max(2,Math.round(month.attended/chartMax*100)):0}%" title="${monthNames[index]} เข้าร่วมจริง ${money(month.attended)} คน"></i></div><span class="bar-label">${monthNames[index]}</span></div>`).join(''):'<span class="chart-empty">ไม่มีข้อมูลกิจกรรมในช่วงที่เลือก</span>'}</div></div></section>
      <section class="panel"><div class="panel-head"><div><h2>ข้อมูลกิจกรรมแยกตามกลุ่ม</h2><p>จัดกลุ่มตามข้อมูลหลักที่ระบุใน FigJam</p></div><span class="tag orange">A0–A2</span></div><div class="panel-body"><div class="donut-wrap"><div class="donut"><div class="donut-label"><strong>${money(activities)}</strong>กิจกรรม / รอบ</div></div><div class="legend-list"><div class="legend-row"><span><i></i>A0 · กิจกรรม</span><b>${money(activities)}</b></div><div class="legend-row"><span><i></i>A1 · ผู้สมัครหลักสูตร</span><b>${money(data('applicants').length)}</b></div><div class="legend-row"><span><i></i>A2 · หลักสูตรร่วม</span><b>${money(data('jointCourses').length)}</b></div><div class="legend-row"><span><i></i>ลงทะเบียน / เช็คอิน</span><b>${money(registered)} / ${money(attended)}</b></div><div class="legend-row"><span><i></i>MOU / MOA ใช้งาน</span><b>${money(activeAgreements)}</b></div></div></div></div></section></div>
      <div class="dashboard-bottom"><section class="panel"><div class="panel-head"><div><h2>ทางลัดข้อมูลหลัก</h2><p>ชุดข้อมูลและโฟลว์งานการศึกษาที่เชื่อมกัน</p></div></div><div class="quick-links">${[['activities','A0 · กิจกรรม / ผู้เข้าร่วม','ค่าย ลงทะเบียน และเช็คอิน'],['applicants','A1 · ผู้สมัครหลักสูตร','ติดตามสถานะการสมัคร'],['jointCourses','A2 · หลักสูตรร่วม','สถาบันและพาร์ทเนอร์'],['budgets','งบประมาณรายได้',`รายรับตัวอย่าง ฿${money(revenue)}`],['agreements','MOU / MOA',`${activeAgreements} ฉบับในสถานะใช้งาน`],['studentHistories','D · ประวัตินักเรียน','เส้นทางตั้งแต่สนใจจนจบ']].map(([key,title,note])=>`<a class="quick-link" href="#${key}" data-route="${key}"><span class="quick-link-icon">${iconSvg('arrowUpRight',15)}</span><span><strong>${title}</strong><small>${note}</small></span></a>`).join('')}</div></section>
      <section class="panel"><div class="panel-head"><div><h2>ภาพรวมหน่วยงาน</h2><p>จำนวนกิจกรรมในข้อมูลตัวอย่าง</p></div><span class="tag green">${money(activities)} กิจกรรม</span></div><div class="unit-breakdown">${unitOptions.slice(0,5).map(unit=>{const count=activityRows.filter(row=>row.unit===unit).length;const pct=Math.max(8,Math.round(count/Math.max(activities,1)*100));return `<div class="unit-row"><span>${escapeHtml(unit)}</span><div class="progress"><span style="width:${pct}%"></span></div><span class="unit-count">${count}</span></div>`}).join('')}</div></section></div>
      <div class="notice-card" style="margin-top:15px"><strong>ขอบเขตข้อมูลที่ต้องยืนยันกับเจ้าของระบบ:</strong> การเชื่อมระบบทะเบียน/การเรียน, แหล่งงบประมาณ, สิทธิ์ข้อมูลส่วนบุคคล และตัวชี้วัดรายงาน ขณะนี้ยังไม่มีไฟล์ข้อมูลจริงในโฟลเดอร์ data</div>`;
  }

  function renderEntityPage(entity){
    const schema=schemas[entity];const actions=`${button('ส่งออก CSV','export-csv','button-quiet','download')}${button('เพิ่ม'+schema.singular,'add-record','button-primary','plus')}`;
    const q=(window.entitySearch||'').trim().toLocaleLowerCase('th');
    const sourceRows=data(entity);
    const statusOptions=[...new Set(sourceRows.map(row=>row.status).filter(Boolean))];
    const selectedStatus=entityStatusByRoute[entity]||'all';
    const rows=sourceRows.filter(row=>{
      const matchesQuery=!q||JSON.stringify(row).toLocaleLowerCase('th').includes(q);
      const matchesStatus=selectedStatus==='all'||row.status===selectedStatus;
      if(entity!=='budgets')return matchesQuery&&matchesStatus;
      return matchesQuery&&matchesStatus&&(budgetYear==='all'||row.fiscalYear===budgetYear)&&(budgetUnit==='all'||row.unit===budgetUnit);
    });
    const budgetFilters=entity==='budgets'?`<select class="field-control" id="budgetYearFilter" aria-label="กรองตามปีงบประมาณ"><option value="all" ${budgetYear==='all'?'selected':''}>ทุกปีงบประมาณ</option>${[...new Set(sourceRows.map(row=>row.fiscalYear).filter(Boolean))].sort((a,b)=>b.localeCompare(a,'th')).map(year=>`<option value="${escapeHtml(year)}" ${budgetYear===year?'selected':''}>ปีงบประมาณ ${escapeHtml(year)}</option>`).join('')}</select><select class="field-control" id="budgetUnitFilter" aria-label="กรองตามหน่วยงาน"><option value="all" ${budgetUnit==='all'?'selected':''}>ทุกหน่วยงาน</option>${unitOptions.map(unit=>`<option value="${escapeHtml(unit)}" ${budgetUnit===unit?'selected':''}>${escapeHtml(unit)}</option>`).join('')}</select>`:'';
    return `${setHeading(schema.title,schema.description,actions)}<div class="filter-row"><input class="search-control" id="entitySearch" type="search" placeholder="ค้นหาใน${escapeHtml(schema.title)}" value="${escapeHtml(window.entitySearch||'')}">${budgetFilters}<select class="field-control" id="statusFilter"><option value="all">ทุกสถานะ</option>${statusOptions.map(status=>`<option value="${escapeHtml(status)}" ${selectedStatus===status?'selected':''}>${escapeHtml(status)}</option>`).join('')}</select><span class="filter-spacer"></span><span class="small-label">${rows.length} รายการ · เก็บในเครื่องนี้</span></div>${entity==='budgets'?renderBudgetSummary(rows):''}${entity==='activities'?renderA0Shortcuts():''}<section class="panel data-panel"><div class="panel-head"><div><h2>${escapeHtml(schema.title)}</h2><p>ข้อมูลตัวอย่าง · ใช้ปุ่มแก้ไขเพื่อปรับระเบียนในเครื่อง</p></div></div><div class="table-scroll"><table><thead><tr>${schema.columns.map(([,label])=>`<th>${escapeHtml(label)}</th>`).join('')}<th>จัดการ</th></tr></thead><tbody>${rows.map(row=>`<tr>${schema.columns.map(([key])=>`<td>${formatCell(entity,key,row)}</td>`).join('')}<td><div class="row-actions">${entity==='activities'?`<button class="icon-action" type="button" data-open-activity="${escapeHtml(row.id)}" title="ดูผู้เข้าร่วม">${iconSvg('users',15)}</button>`:''}${entity==='studentHistories'?`<button class="icon-action" type="button" data-open-student="${escapeHtml(row.id)}" title="ดูเส้นทาง">${iconSvg('arrowUpRight',15)}</button>`:''}<button class="icon-action" type="button" data-edit="${escapeHtml(row.id)}" title="แก้ไข">${iconSvg('edit',14)}</button><button class="icon-action" type="button" data-delete="${escapeHtml(row.id)}" title="ลบ">${iconSvg('close',14)}</button></div></td></tr>`).join('')}</tbody></table>${rows.length?'':'<div class="empty-state">ไม่พบข้อมูล ลองเปลี่ยนคำค้นหรือตัวกรอง หรือเพิ่มรายการใหม่</div>'}</div><div class="table-foot"><span>แสดง ${rows.length} รายการ · ข้อมูลตัวอย่างยังไม่ใช่ข้อมูลจากฐานระบบจริง</span><button class="button button-quiet" data-action="reset-demo">คืนค่าข้อมูลตัวอย่าง</button></div></section>`;
  }
  function renderBudgetSummary(rows){
    const income=rows.filter(row=>row.direction==='รายรับ').reduce((sum,row)=>sum+Number(row.amount||0),0);
    const expense=rows.filter(row=>row.direction==='รายจ่าย').reduce((sum,row)=>sum+Number(row.amount||0),0);
    const net=income-expense;
    const netLabel=net>0?'กำไรสุทธิ':net<0?'ขาดทุนสุทธิ':'กำไร/ขาดทุน';
    const netClass=net<0?'is-negative':net>0?'is-positive':'';
    return `<section class="stat-grid budget-summary" aria-label="สรุปงบประมาณตามตัวกรอง" aria-live="polite"><article class="stat-card"><div class="stat-icon">${iconSvg('download',20)}</div><div><div class="stat-label">รายได้รวม</div><div class="stat-value">฿${money(income)}</div><div class="stat-note muted">${rows.filter(row=>row.direction==='รายรับ').length} รายการรายรับ</div></div></article><article class="stat-card"><div class="stat-icon">${iconSvg('wallet',20)}</div><div><div class="stat-label">รายจ่ายรวม</div><div class="stat-value">฿${money(expense)}</div><div class="stat-note muted">${rows.filter(row=>row.direction==='รายจ่าย').length} รายการรายจ่าย</div></div></article><article class="stat-card"><div class="stat-icon">${iconSvg('package',20)}</div><div><div class="stat-label">กำไร/ขาดทุน</div><div class="stat-value ${netClass}">${net<0?'−':''}฿${money(Math.abs(net))}</div><div class="stat-note ${netClass}">${netLabel} · รายได้รวม − รายจ่ายรวม</div></div></article></section>`;
  }
  function renderA0Shortcuts(){return `<div class="module-grid"><article class="module-card"><h3>ลงทะเบียนด้วยตัวเอง</h3><p>ผู้เข้าร่วมกรอกข้อมูลและสร้าง/จับคู่โปรไฟล์สมาชิกด้วยอีเมล</p><div class="big-number">A0</div></article><article class="module-card"><h3>เพิ่มโดยเจ้าหน้าที่</h3><p>เจ้าหน้าที่เพิ่มผู้เข้าร่วมและลงทะเบียนจากหน้ารายชื่อกิจกรรม</p><div class="big-number">Staff</div></article><article class="module-card"><h3>ป้องกันข้อมูลซ้ำ</h3><p>ใช้สมาชิกเดิมข้ามกิจกรรม และเช็คอินเดิมไม่เพิ่มยอดซ้ำ</p><div class="big-number">1 คน</div></article></div>`;}
  function formatCell(entity,key,row){
    if(key==='amount'||key==='value')return `฿${money(row[key])}`;
    if(key==='participants')return money(registrationsFor(row.id).length);
    if(key==='attended')return money(registrationsFor(row.id).filter(reg=>reg.checkInAt).length);
    let value=row[key]??'—';
    if(key==='memberId'){const member=memberById(value);value=member?.name||value;}
    if(key==='startDate'||key==='endDate'||key==='date'||key==='lastContact')value=value&&value!=='—'?new Date(`${value}T00:00:00`).toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'2-digit'}):'—';
    if(entity==='agreements'&&key==='status'&&row.endDate){const days=Math.ceil((new Date(`${row.endDate}T23:59:59`)-Date.now())/86400000);if(days<0&&value==='ใช้งาน')value='สิ้นสุด';else if(days>=0&&days<=60&&value==='ใช้งาน')value='ใกล้หมดอายุ';}
    if(key==='status'||key==='contactStatus'||key==='currentStage')return `<span class="tag ${statusClass(String(value))}">${escapeHtml(value)}</span>`;
    return `<span class="${key==='name'||key==='organization'?'cell-primary':''}">${escapeHtml(value)}</span>`;
  }
  function statusClass(value){if(/ใช้งาน|ยืนยัน|เปิดรับ|กำลังดำเนิน|เสร็จ|ผ่าน|สำเร็จ|อนุมัติ/i.test(value))return 'green';if(/หมดอายุ|ร่าง|สนใจ|ติดตาม|สมัคร|รอ/i.test(value))return 'orange';if(/ไม่ผ่าน|สละ|ปิด|สิ้นสุด|พ้น/i.test(value))return 'red';if(/นานาชาติ|ร่วม/i.test(value))return 'blue';return '';}

  function renderActivityDetail(activityId){
    const activity=allActivities().find(row=>row.id===activityId);if(!activity){currentRoute='activities';return renderEntityPage('activities');}
    currentActivityId=activityId;const regs=registrationsFor(activityId);const attended=regs.filter(row=>row.checkInAt).length;
    const registrationRows=regs.map(reg=>{const member=memberById(reg.memberId)||{};return `<tr><td><span class="cell-primary">${escapeHtml(member.name||'สมาชิกที่ไม่พบ')}</span><div class="cell-secondary">${escapeHtml(member.email||'')}</div></td><td>${escapeHtml(member.category||member.group||'—')}</td><td>${escapeHtml(reg.registeredAt||'—')}</td><td>${reg.checkInAt?'<span class="tag green">เข้าร่วมจริง</span>':'<span class="tag orange">ยังไม่เช็คอิน</span>'}</td><td>${escapeHtml(reg.source==='staff'?'เจ้าหน้าที่เพิ่ม':'ลงทะเบียนเอง')}</td><td><button class="button ${reg.checkInAt?'button-quiet':'button-primary'}" type="button" data-checkin="${escapeHtml(reg.id)}">${reg.checkInAt?'เช็คอินแล้ว':'เช็คอิน'}</button></td></tr>`}).join('');
    return `${setHeading('จัดการผู้เข้าร่วมกิจกรรม','ลงทะเบียนด้วยตนเองหรือเพิ่มโดยเจ้าหน้าที่ พร้อมตรวจรายการซ้ำและเช็คอิน')}
      <div class="activity-head"><span class="activity-mark">${iconSvg('calendar',20)}</span><div><span class="eyebrow">A0 · ${escapeHtml(activity.unit)}</span><h2>${escapeHtml(activity.name)}</h2><p>${escapeHtml(activity.startDate)}${activity.endDate&&activity.endDate!==activity.startDate?` – ${escapeHtml(activity.endDate)}`:''} · ${escapeHtml(activity.venue||'ยังไม่ระบุสถานที่')} · รับ ${money(activity.capacity||0)} คน</p></div><button class="button button-quiet" type="button" data-route="activities">${iconSvg('arrowLeft',14)} กลับไปรายการกิจกรรม</button></div>
      <div class="stat-grid"><article class="stat-card"><div class="stat-icon">${iconSvg('users',20)}</div><div><div class="stat-label">ลงทะเบียน</div><div class="stat-value">${regs.length}</div><div class="stat-note muted">คนในกิจกรรมนี้</div></div></article><article class="stat-card"><div class="stat-icon">${iconSvg('check',20)}</div><div><div class="stat-label">เข้าร่วมจริง</div><div class="stat-value">${attended}</div><div class="stat-note muted">บันทึกจากเช็คอิน</div></div></article><article class="stat-card"><div class="stat-icon">${iconSvg('circle',20)}</div><div><div class="stat-label">ยังไม่เช็คอิน</div><div class="stat-value">${regs.length-attended}</div><div class="stat-note muted">ยอดไม่รวมการเช็คอินซ้ำ</div></div></article><article class="stat-card"><div class="stat-icon">${iconSvg('mapPin',20)}</div><div><div class="stat-label">รับสมัครหน้างาน</div><div class="stat-value" style="font-size:16px">${escapeHtml(activity.walkIn||'ยังไม่กำหนด')}</div><div class="stat-note muted">ต้องยืนยันกับผู้จัด</div></div></article></div>
      <div class="subnav"><button class="chip ${activityMode==='self'?'active':''}" data-mode="self">ลงทะเบียนด้วยตัวเอง</button><button class="chip ${activityMode==='staff'?'active':''}" data-mode="staff">เพิ่มโดยเจ้าหน้าที่</button><span class="small-label">ต้นแบบการทำงาน · ยังไม่มีการยืนยันตัวตนจริง</span></div>
      ${renderRegistrationForm(activityMode)}
      <section class="panel data-panel"><div class="panel-head"><div><h2>รายชื่อผู้ลงทะเบียน</h2><p>ใช้สมาชิกคนเดิมข้ามกิจกรรม · เช็คอินแล้วจะไม่เพิ่มยอดซ้ำ</p></div><span class="tag green">${attended} / ${regs.length} เข้าร่วมจริง</span></div><div class="table-scroll"><table><thead><tr><th>สมาชิก</th><th>กลุ่ม</th><th>ลงทะเบียนเมื่อ</th><th>การเข้าร่วม</th><th>ช่องทาง</th><th>เช็คอิน</th></tr></thead><tbody>${registrationRows||''}</tbody></table>${regs.length?'':'<div class="empty-state">ยังไม่มีผู้ลงทะเบียนในข้อมูลตัวอย่าง</div>'}</div></section>`;
  }
  function renderRegistrationForm(mode){
    const isStaff=mode==='staff';
    return `<form class="inline-form" id="participantForm" data-mode="${mode}"><div class="form-field"><label for="participantName">ชื่อ-นามสกุล *</label><input class="form-control" id="participantName" name="name" required placeholder="ชื่อผู้เข้าร่วม"></div><div class="form-field"><label for="participantEmail">อีเมล *</label><input class="form-control" id="participantEmail" name="email" type="email" required placeholder="name@example.com" autocomplete="email"></div>${isStaff?'':`<div class="form-field"><label for="participantPassword">ตั้งรหัสผ่าน *</label><input class="form-control" id="participantPassword" name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="อย่างน้อย 8 ตัวอักษร"></div>`}<div class="form-field"><label for="participantPhone">เบอร์โทรศัพท์</label><input class="form-control" id="participantPhone" name="phone" placeholder="08x-xxx-xxxx"></div><div class="form-field"><label for="participantCategory">กลุ่มผู้เข้าร่วม</label><select class="form-control" id="participantCategory" name="category"><option>นักเรียน ม.ปลาย</option><option>นักศึกษา</option><option>ศิษย์เก่า</option><option>ผู้ประกอบการ</option><option>บุคคลทั่วไป</option></select></div>${isStaff?'<div class="form-field form-span-2"><label for="participantAffiliation">โรงเรียน / หน่วยงาน</label><input class="form-control" id="participantAffiliation" name="affiliation" placeholder="ระบุสังกัด"></div>':''}<div class="form-field ${isStaff?'form-span-2':''}"><label>&nbsp;</label><button class="button button-primary" type="button" data-register-submit>${isStaff?'เพิ่มสมาชิกและลงทะเบียน':'สมัครและลงทะเบียนกิจกรรม'}</button></div><div class="form-full small-label">${isStaff?'เจ้าหน้าที่เพิ่มข้อมูลสมาชิกและลงทะเบียนให้ โดยไม่สร้างรหัสผ่าน':'ระบบตัวอย่างตรวจรหัสผ่านขั้นต่ำ 8 ตัวอักษร แต่จะไม่เก็บหรือส่งรหัสผ่าน; ระบบจริงต้องมี backend สำหรับบัญชีและการยืนยันอีเมล'} · หากพบอีเมลเดิม ระบบใช้สมาชิกเดิมและป้องกันรายการซ้ำ</div></form>`;
  }

  let journeyFormOpen=false;
  function renderStudentJourney(historyId){
    const student=data('studentHistories').find(row=>row.id===historyId);if(!student){currentRoute='studentHistories';return renderEntityPage('studentHistories');}
    const events=data('journeyEvents').filter(event=>event.historyId===historyId).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    return `${setHeading('เส้นทางนักเรียน','ประวัติต่อเนื่องตั้งแต่สนใจ สมัคร เข้าเรียน และกิจกรรมจนสำเร็จการศึกษา')}
      <div class="activity-head"><span class="activity-mark">${iconSvg('route',20)}</span><div><span class="eyebrow">D · ${escapeHtml(student.program)}</span><h2>${escapeHtml(student.name)}</h2><p>รหัส ${escapeHtml(student.studentId||'—')} · เข้าเรียนปี ${escapeHtml(student.admissionYear||'—')} · สถานะ ${escapeHtml(student.currentStage||'—')}</p></div><button class="button button-quiet" type="button" data-route="studentHistories">${iconSvg('arrowLeft',14)} กลับไปประวัตินักเรียน</button></div>
      <div class="notice-card"><strong>ต้นแบบประวัติการศึกษา:</strong> แสดงเฉพาะข้อมูลตัวอย่างที่บันทึกในเครื่อง ข้อมูลผลการเรียนและแหล่งทะเบียนจริงยังไม่เชื่อมต่อ</div>
      <section class="panel"><div class="panel-head"><div><h2>ประวัติตามลำดับเวลา</h2><p>เหตุการณ์จากการแนะแนว การสมัคร กิจกรรม และสถานะการศึกษา</p></div><button class="button button-primary" type="button" data-add-journey="${escapeHtml(historyId)}">${iconSvg('plus',14)} เพิ่มเหตุการณ์</button></div><div class="panel-body">${journeyFormOpen?`<form class="inline-form" id="journeyEventForm" data-history="${escapeHtml(historyId)}"><div class="form-field"><label>วันที่ *</label><input class="form-control" name="date" type="date" required></div><div class="form-field"><label>ขั้นตอน *</label><select class="form-control" name="stage"><option>เริ่มสนใจ / แนะแนว</option><option>สมัครหลักสูตร</option><option>ผ่านการคัดเลือก</option><option>ยืนยันสิทธิ์ / เข้าเรียน</option><option>เข้าร่วมกิจกรรม</option><option>ฝึกงาน / สหกิจ</option><option>สำเร็จการศึกษา</option><option>ติดตามศิษย์เก่า</option><option>อื่น ๆ</option></select></div><div class="form-field form-span-2"><label>รายละเอียด *</label><input class="form-control" name="description" required placeholder="บันทึกเหตุการณ์"></div><div class="form-field"><label>ที่มาของข้อมูล</label><input class="form-control" name="source" placeholder="เช่น A0, A1, ระบบทะเบียน"></div><div class="form-field"><label>&nbsp;</label><button class="button button-primary" type="submit">บันทึกเหตุการณ์</button></div></form>`:''}<div class="timeline">${events.map(event=>`<div class="timeline-item"><span class="timeline-dot">•</span><span class="timeline-date">${escapeHtml(event.date||'ไม่ระบุ')}</span><span class="timeline-copy"><strong>${escapeHtml(event.stage)}</strong><small>${escapeHtml(event.description)} · ที่มา: ${escapeHtml(event.source||'ไม่ระบุ')}</small></span></div>`).join('')||'<div class="empty-state">ยังไม่มีเหตุการณ์ในเส้นทางนี้</div>'}</div></div></section>`;
  }

  function renderSearchResults(){
    const q=currentGlobalQuery.trim().toLocaleLowerCase('th');let found=[];
    Object.entries(schemas).forEach(([key,schema])=>data(key).forEach(row=>{const text=JSON.stringify(row).toLocaleLowerCase('th');if(q&&text.includes(q)){found.push({key,title:schema.title,row,label:row.name||row.organization||row.institution||row.id});}}));
    return `${setHeading('ผลการค้นหา',`คำค้น “${currentGlobalQuery}” · ค้นในข้อมูลทุกกลุ่ม`)}<div class="filter-row"><span class="tag orange">${found.length} รายการ</span><span class="small-label">แสดงเฉพาะข้อมูลตัวอย่างที่มีในเบราว์เซอร์</span></div><section class="panel data-panel"><div class="table-scroll"><table><thead><tr><th>รายการ</th><th>กลุ่มข้อมูล</th><th>รหัส</th><th>ดูข้อมูล</th></tr></thead><tbody>${found.map(item=>`<tr><td><span class="cell-primary">${escapeHtml(item.label)}</span></td><td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.row.id)}</td><td><button class="button button-quiet" data-route="${item.key}">เปิดรายการ</button></td></tr>`).join('')}</tbody></table>${found.length?'':'<div class="empty-state">ไม่พบข้อมูลที่ตรงกับคำค้น</div>'}</div></section>`;
  }

  function openForm(entity,recordId=''){
    const schema=schemas[entity];if(!schema)return;const existing=recordId?data(entity).find(row=>row.id===recordId):null;
    $('#modalEyebrow').textContent=schema.title;$('#modalTitle').textContent=`${existing?'แก้ไข':'เพิ่ม'}${schema.singular}`;$('#recordForm').dataset.entity=entity;$('#recordForm').dataset.recordId=recordId;
    $('#modalFields').innerHTML=schema.fields.map(field=>{const value=existing?.[field.key]??'';const required=field.required?'required':'';let input='';if(field.type==='select'){input=`<select class="form-control" name="${field.key}" ${required}><option value="">เลือก${escapeHtml(field.label)}</option>${field.options.map(option=>`<option value="${escapeHtml(option)}" ${String(value)===String(option)?'selected':''}>${escapeHtml(option)}</option>`).join('')}</select>`;}else if(field.type==='textarea'){input=`<textarea class="form-control textarea" name="${field.key}" ${required} placeholder="${escapeHtml(field.label)}">${escapeHtml(value)}</textarea>`;}else{input=`<input class="form-control" name="${field.key}" type="${field.type}" value="${escapeHtml(value)}" ${required} ${field.type==='number'?'min="0"':''} placeholder="${escapeHtml(field.label)}">`;}
      return `<div class="form-field ${field.wide?'form-span-2':''}"><label>${escapeHtml(field.label)}${field.required?' *':''}</label>${input}</div>`;}).join('');
    $('#recordModal').showModal();
  }
  function saveRecord(form){
    const entity=form.dataset.entity,recordId=form.dataset.recordId,schema=schemas[entity];const body={};schema.fields.forEach(field=>{const input=form.elements.namedItem(field.key);if(input){let value=input.value.trim();if(field.type==='number')value=value?Number(value):0;body[field.key]=value;}});
    if(!form.reportValidity())return;const rows=data(entity);if(recordId){const index=rows.findIndex(row=>row.id===recordId);if(index>=0)rows[index]={...rows[index],...body};}else{rows.unshift({id:id(entity.slice(0,3).toUpperCase()),...body});}
    saveState();$('#recordModal').close();toast(recordId?'ปรับปรุงข้อมูลแล้ว':'เพิ่มข้อมูลแล้ว');render();
  }
  function deleteRecord(entity,recordId){const schema=schemas[entity];if(!schema)return;if(!confirm(`ลบรายการ${schema.singular}นี้จากข้อมูลในเครื่องหรือไม่?`))return;state.data[entity]=data(entity).filter(row=>row.id!==recordId);saveState();toast('ลบรายการแล้ว');render();}

  function exportCsv(entity){
    const schema=schemas[entity];const rows=data(entity);if(!schema||!rows.length){toast('ไม่มีข้อมูลสำหรับส่งออก');return;}
    const keys=[...new Set([...schema.columns.map(([key])=>key),...schema.fields.map(field=>field.key)])];const csv=[keys.map(key=>quoteCsv(schema.fields.find(field=>field.key===key)?.label||schema.columns.find(([c])=>c===key)?.[1]||key)).join(','),...rows.map(row=>keys.map(key=>quoteCsv(row[key]??'')).join(','))].join('\r\n');downloadBlob(`one-journey-${entity}.csv`,'\ufeff'+csv,'text/csv;charset=utf-8');toast('ส่งออก CSV แล้ว');
  }
  function quoteCsv(value){return `"${String(value).replace(/"/g,'""')}"`;}
  function downloadBlob(filename,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download=filename;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function downloadJson(){downloadBlob('one-journey-local-backup.json',JSON.stringify(state,null,2),'application/json');toast('ดาวน์โหลดไฟล์สำรอง JSON แล้ว');}
  function resetDemo(){if(!confirm('คืนค่าข้อมูลตัวอย่างทั้งหมด? การแก้ไขที่บันทึกในเครื่องนี้จะหายไป'))return;state={version:1,demo:true,updatedAt:new Date().toISOString(),data:structuredClone(seed)};saveState();toast('คืนค่าข้อมูลตัวอย่างแล้ว');render();}

  function bindActions(root){
    $$('[data-route]',root).forEach(button=>button.addEventListener('click',event=>{event.preventDefault();go(button.dataset.route);}));
    $$('[data-action]',root).forEach(button=>button.addEventListener('click',()=>{const action=button.dataset.action;if(action==='add-record')openForm(currentRoute);if(action==='export-csv')exportCsv(currentRoute);if(action==='download-json')downloadJson();if(action==='reset-demo')resetDemo();}));
    $$('[data-edit]',root).forEach(button=>button.addEventListener('click',()=>openForm(currentRoute,button.dataset.edit)));
    $$('[data-delete]',root).forEach(button=>button.addEventListener('click',()=>deleteRecord(currentRoute,button.dataset.delete)));
    $$('[data-open-activity]',root).forEach(button=>button.addEventListener('click',()=>go(`activity:${button.dataset.openActivity}`)));
    $$('[data-open-student]',root).forEach(button=>button.addEventListener('click',()=>go(`student:${button.dataset.openStudent}`)));
    $$('[data-add-journey]',root).forEach(button=>button.addEventListener('click',()=>{journeyFormOpen=true;render();}));
    $$('[data-mode]',root).forEach(button=>button.addEventListener('click',()=>{activityMode=button.dataset.mode;render();}));
    const search=$('#entitySearch',root);if(search)search.addEventListener('input',()=>{window.entitySearch=search.value;const position=search.selectionStart;render();const refreshed=$('#entitySearch');refreshed?.focus();refreshed?.setSelectionRange(position,position);});
    const status=$('#statusFilter',root);if(status)status.addEventListener('change',()=>{entityStatusByRoute[currentRoute]=status.value;render();});
    const budgetYearSelect=$('#budgetYearFilter',root);if(budgetYearSelect)budgetYearSelect.addEventListener('change',()=>{budgetYear=budgetYearSelect.value;render();});
    const budgetUnitSelect=$('#budgetUnitFilter',root);if(budgetUnitSelect)budgetUnitSelect.addEventListener('change',()=>{budgetUnit=budgetUnitSelect.value;render();});
    const yearSelect=$('#overviewYear',root);if(yearSelect)yearSelect.addEventListener('change',()=>{overviewYear=yearSelect.value;render();});
    const unitSelect=$('#overviewUnit',root);if(unitSelect)unitSelect.addEventListener('change',()=>{overviewUnit=unitSelect.value;render();});
    const periodSelect=$('#overviewPeriod',root);if(periodSelect)periodSelect.addEventListener('change',()=>{overviewPeriod=periodSelect.value;render();});
    const participantForm=$('#participantForm',root);if(participantForm)participantForm.addEventListener('submit',event=>{event.preventDefault();submitParticipant(participantForm);});
    const participantSubmit=$('[data-register-submit]',root);if(participantSubmit&&participantForm)participantSubmit.addEventListener('click',()=>submitParticipant(participantForm));
    const journeyForm=$('#journeyEventForm',root);if(journeyForm)journeyForm.addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(journeyForm).entries());state.data.journeyEvents ||= [];state.data.journeyEvents.push({id:id('JEV'),historyId:journeyForm.dataset.history,date:values.date,stage:values.stage,description:values.description,source:values.source||'บันทึกโดยเจ้าหน้าที่'});journeyFormOpen=false;saveState();toast('เพิ่มเหตุการณ์ในเส้นทางแล้ว');render();});
    $$('[data-checkin]',root).forEach(button=>button.addEventListener('click',()=>toggleCheckin(button.dataset.checkin)));
  }
  function submitParticipant(form){
    if(!form.reportValidity())return;
    const values=Object.fromEntries(new FormData(form).entries());const normalized=String(values.email||'').trim().toLocaleLowerCase('en');if(!values.name||!normalized){toast('กรอกชื่อและอีเมลให้ครบก่อน');return;}
    let member=data('members').find(row=>String(row.email||'').trim().toLocaleLowerCase('en')===normalized);if(!member){member={id:id('MEM'),name:values.name.trim(),email:normalized,phone:values.phone||'',group:'A0',category:values.category||'บุคคลทั่วไป',affiliation:values.affiliation||'',status:'ใช้งาน'};data('members').push(member);}
    const already=data('registrations').some(row=>row.activityId===currentActivityId&&row.memberId===member.id);if(already){toast('สมาชิกนี้ลงทะเบียนกิจกรรมแล้ว ระบบไม่เพิ่มรายการซ้ำ');return;}
    data('registrations').push({id:id('REG'),activityId:currentActivityId,memberId:member.id,registeredAt:today,status:'ยืนยันแล้ว',checkInAt:'',source:form.dataset.mode});saveState();toast('บันทึกการลงทะเบียนแล้ว');render();
  }
  function toggleCheckin(registrationId){const reg=data('registrations').find(row=>row.id===registrationId);if(!reg)return;if(reg.checkInAt){toast('มีบันทึกเช็คอินแล้ว ไม่มีการเพิ่มยอดซ้ำ');return;}reg.checkInAt=new Date().toISOString();saveState();toast('บันทึกการเข้าร่วมจริงแล้ว');render();}

  $('#recordForm').addEventListener('submit',event=>{event.preventDefault();saveRecord(event.currentTarget);});
  $$('[data-close-modal]').forEach(button=>button.addEventListener('click',()=>$('#recordModal').close()));
  $('#recordModal').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.close();});
  $('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
  $('#globalSearch').addEventListener('submit',event=>{event.preventDefault();const query=$('#globalSearchInput').value.trim();if(!query){toast('พิมพ์คำค้นก่อน');return;}currentGlobalQuery=query;currentRoute='search';render();});
  window.addEventListener('hashchange',()=>{const route=location.hash.replace('#','')||'overview';if(route!==currentRoute){currentRoute=route;render();}});
  $('#profileButton').addEventListener('click',()=>toast('บัญชี Admin DII เป็นบัญชีตัวอย่าง ยังไม่มีระบบยืนยันตัวตนจริง'));
  $('#topUser').addEventListener('click',()=>toast('การเข้าสู่ระบบอีเมล/รหัสผ่านจะเชื่อมกับระบบหลังบ้านในขั้นถัดไป'));
  $('#notificationButton').addEventListener('click',()=>toast('ไม่มีการแจ้งเตือนใหม่ในข้อมูลตัวอย่าง'));
  // Reserve the legacy window property before an element with id="entitySearch" is rendered.
  // Browsers otherwise expose that input as window.entitySearch and overwrite this search value.
  window.entitySearch='';
  renderNav();currentRoute=location.hash.replace('#','')||'overview';render();
})();
