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
    eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2m3 0-.8 14H5.8L5 6m4 4v6m6-6v6"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    close:'<path d="m18 6-12 12M6 6l12 12"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    circle:'<circle cx="12" cy="12" r="9"/>',
    mapPin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    arrowLeft:'<path d="m15 18-6-6 6-6M9 12h12"/>'
  };
  const iconSvg = (name, size = 16) => `<svg class="ui-icon" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.circle}</svg>`;
  const id = prefix => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const money = value => new Intl.NumberFormat('th-TH', {maximumFractionDigits:0}).format(Number(value || 0));
  const budgetMoney = value => new Intl.NumberFormat('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(value||0));
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
    budgets: {title:'งบประมาณรายได้', singular:'โครงการ', description:'บันทึกยอดรายได้รวมและค่าใช้จ่ายรวม พร้อมคำนวณกำไร/ขาดทุนแยกเป็นรายโครงการ', columns:[['code','รหัสงบ'],['projectName','ชื่อโครงการ'],['incomeTotal','รายได้รวม (บาท)'],['expenseTotal','ค่าใช้จ่ายรวม (บาท)'],['net','กำไร/ขาดทุน (บาท)'],['type','ประเภทงาน'],['status','สถานะ'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'code',label:'รหัสงบ',type:'text',required:true},{key:'projectName',label:'ชื่อโครงการ',type:'text',required:true},{key:'incomeTotal',label:'รายได้รวม (บาท)',type:'number',required:true},{key:'expenseTotal',label:'ค่าใช้จ่ายรวม (บาท)',type:'number',required:true},{key:'type',label:'ประเภทงาน',type:'select',options:['กิจกรรมประชาสัมพันธ์','Workshop','Camp','Short Course','อื่น ๆ'],required:true},{key:'owner',label:'ผู้รับผิดชอบ',type:'text',required:true}
    ]},
    agreements: {title:'MOU / MOA', singular:'บันทึกความร่วมมือ', description:'จัดการเอกสาร MOU/MOA คู่ความร่วมมือ ระยะเวลาสัญญา และรายละเอียดขอบเขตความร่วมมือ', columns:[['sequence','ลำดับ'],['agreementType','MOU/MOA'],['docNo','เลขที่เอกสาร'],['partner','Partner'],['documentStatus','สถานะเอกสาร'],['signedDate','วันที่ลงนาม'],['startDate','วันที่เริ่ม'],['endDate','วันที่หมดอายุ'],['cooperationStatus','สถานะความร่วมมือ'],['attachment','ไฟล์เอกสาร']], fields:[
      {key:'agreementType',label:'ประเภทเอกสาร',type:'select',options:['MOU','MOA'],required:true},{key:'docNo',label:'เลขที่เอกสาร',type:'text',required:true},{key:'partner',label:'Partner / ชื่อโครงการ',type:'text',required:true},{key:'signedDate',label:'วันที่ลงนาม',type:'date',required:true},{key:'startDate',label:'วันที่เริ่ม',type:'date',required:true},{key:'endDate',label:'วันที่หมดอายุ',type:'date',required:true},{key:'documentStatus',label:'สถานะเอกสาร',type:'select',options:['Active','Draft','Expired'],required:true},{key:'signerOur',label:'ผู้ลงนามฝ่ายเรา',type:'text'},{key:'signerPartner',label:'ผู้ลงนามฝ่าย Partner',type:'text'},{key:'attachment',label:'อัปโหลดไฟล์ MOU/MOA',type:'file',required:true,wide:true},{key:'documentNotes',label:'หมายเหตุเอกสาร',type:'textarea',wide:true},{key:'purpose',label:'วัตถุประสงค์ขอความร่วมมือ',type:'textarea',required:true},{key:'cooperationFormat',label:'รูปแบบความร่วมมือ',type:'select',options:['ทางวิชาการ','พัฒนาหลักสูตร','แลกเปลี่ยนนักศึกษา/บุคลากร','วิจัยและบริการวิชาการ','อื่น ๆ']},{key:'scope',label:'ขอบเขตความร่วมมือ',type:'textarea',wide:true}
    ]},
    products: {title:'โปรดัก / หลักสูตร', singular:'โปรดักหรือหลักสูตร', description:'ทะเบียนข้อมูลต้นทางของหลักสูตรและโปรดัก หนึ่งรายการเชื่อมกับกิจกรรมหรือรอบจัดได้หลายครั้ง', columns:[['name','ชื่อโปรดัก / หลักสูตร'],['type','ประเภท'],['level','ระดับ'],['branch','สาขา'],['unit','หน่วยงาน'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อโปรดัก / หลักสูตร',type:'text',required:true},{key:'type',label:'ประเภท',type:'select',options:['หลักสูตรปริญญาตรี','หลักสูตรปริญญาโท','หลักสูตรปริญญาเอก','หลักสูตรระยะสั้น','หลักสูตรร่วม'],required:true},{key:'level',label:'ระดับ',type:'select',options:['ปริญญาตรี','ปริญญาโท','ปริญญาเอก','ระยะสั้น','ร่วม'],required:true},{key:'branch',label:'สาขา / กลุ่ม',type:'text'},{key:'unit',label:'หน่วยงานเจ้าของข้อมูล',type:'select',options:unitOptions,required:true},{key:'status',label:'สถานะ',type:'select',options:statusOptions},{key:'description',label:'รายละเอียด',type:'textarea',wide:true},{key:'expectedSkills',label:'ทักษะที่คาดว่าจะได้รับ',type:'textarea',wide:true}
    ]},
    activities: {title:'กิจกรรม', singular:'กิจกรรม', description:'สร้างและจัดการค่าย, Workshop, Open House และกิจกรรมอื่น ๆ พร้อมรอบจัด ผู้รับผิดชอบ และจำนวนผู้เข้าร่วม', columns:[['activityCode','รหัสกิจกรรม'],['activityType','ประเภทกิจกรรม'],['name','ชื่อกิจกรรม'],['startDate','วันที่เริ่ม'],['round','รอบกิจกรรม'],['capacity','จำนวนรับ'],['participants','ลงทะเบียน'],['attended','เข้าร่วมจริง'],['status','สถานะ'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'activityCode',label:'รหัสกิจกรรม',type:'text',required:true,autoCode:true},{key:'activityType',label:'ประเภทกิจกรรม',type:'select',options:['Open House','Workshop','Camp','กิจกรรมแนะแนว','กิจกรรมอื่น ๆ'],required:true},{key:'name',label:'ชื่อกิจกรรม',type:'text',required:true},{key:'product',label:'โปรดัก / หลักสูตรที่เกี่ยวข้อง',type:'select',options:programOptions},{key:'unit',label:'หน่วยงานผู้จัด (CAMT)',type:'select',options:unitOptions,required:true},{key:'startDate',label:'วันที่เริ่มต้น',type:'date',required:true},{key:'endDate',label:'วันที่สิ้นสุด',type:'date'},{key:'round',label:'รอบกิจกรรม',type:'select',options:['รอบที่ 1','รอบที่ 2','รอบที่ 3','ต่อเนื่อง'],required:true},{key:'venue',label:'สถานที่',type:'text'},{key:'capacity',label:'จำนวนรับ',type:'number'},{key:'audience',label:'กลุ่มเป้าหมาย',type:'text'},{key:'walkIn',label:'รับสมัครหน้างาน',type:'select',options:yesNo},{key:'checkinMethod',label:'วิธีเช็คอิน',type:'select',options:['เจ้าหน้าที่ค้นหา/บันทึก','สแกน QR โดยเจ้าหน้าที่','ผู้เข้าร่วมสแกน QR']},{key:'partner','label':'พาร์ทเนอร์',type:'text'},{key:'owner',label:'ผู้รับผิดชอบ',type:'text',required:true},{key:'status',label:'สถานะกิจกรรม',type:'select',options:['ร่าง','กำลังจะเปิด','เปิดรับสมัคร','กำลังดำเนินการ','เสร็จสิ้น','ยกเลิก'],required:true},{key:'description',label:'รายละเอียดกิจกรรม / เนื้อหา',type:'textarea',wide:true},{key:'feedback',label:'Feedback ต่อกิจกรรม',type:'textarea',wide:true}
    ]},
    a0Participants: {title:'A0 · ผู้เข้าร่วมค่าย / Workshop / Open House', singular:'ข้อมูลผู้เข้าร่วม A0', description:'ติดตามผู้เข้าร่วมรายบุคคล ความสนใจหลังจบกิจกรรม และแนวโน้มสมัครเรียน โดยเชื่อมกับสมาชิกและกิจกรรม/รอบ', columns:[['recordCode','รหัสรายการ'],['recordedDate','วันที่บันทึก'],['memberId','สมาชิก'],['activityId','กิจกรรม / รอบ'],['grade','ระดับชั้น'],['interestedProgram','หลักสูตรที่สนใจ'],['interestReason','เหตุผลที่สนใจ'],['interestScore','คะแนนความสนใจ'],['applicationIntent','แนวโน้มสมัคร'],['feedback','Feedback'],['owner','ผู้รับผิดชอบ'],['status','สถานะ']], fields:[
      {key:'recordCode',label:'รหัสรายการ',type:'text',required:true,autoCode:true},{key:'recordedDate',label:'วันที่บันทึก',type:'date',required:true},{key:'memberId',label:'สมาชิกเดิม',type:'member',required:true},{key:'activityId',label:'กิจกรรม / รอบ',type:'activity',required:true},{key:'grade',label:'ระดับชั้น',type:'select',options:['ม.4','ม.5','ม.6','ปวช.','ปวส.','อื่น ๆ']},{key:'interestedProgram',label:'หลักสูตรที่สนใจ',type:'select',options:programOptions},{key:'interestReason',label:'เหตุผลที่สนใจ',type:'textarea',wide:true},{key:'interestScore',label:'คะแนนความสนใจหลังจบกิจกรรม',type:'select',options:['1','2','3','4','5'],required:true},{key:'applicationIntent',label:'มีแนวโน้มสมัครหรือไม่',type:'select',options:['มีแนวโน้ม','ไม่แน่ใจ','ไม่มีแนวโน้ม'],required:true},{key:'feedback',label:'Feedback ต่อกิจกรรม',type:'textarea',wide:true},{key:'owner',label:'ผู้รับผิดชอบ',type:'text',required:true},{key:'status',label:'สถานะติดตาม',type:'select',options:['รอติดตาม','ติดตามแล้ว','สมัครหลักสูตรแล้ว','ไม่สนใจ'],required:true}
    ]},
    applicants: {title:'A1 · ผู้สมัครหลักสูตร', singular:'ผู้สมัครหลักสูตร', description:'ผู้สนใจและผู้สมัครหลักสูตร แยกจากผู้เข้าร่วมกิจกรรม และเก็บสถานะการสมัครเป็นลำดับ', columns:[['name','ผู้สมัคร'],['program','หลักสูตร'],['applyYear','รอบ / ปี'],['email','อีเมล'],['source','แหล่งที่มา'],['status','สถานะ']], fields:[
      {key:'name',label:'ชื่อผู้สมัคร',type:'text',required:true},{key:'email',label:'อีเมล',type:'email'},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'program',label:'หลักสูตรที่สมัคร',type:'select',options:programOptions,required:true},{key:'applyYear',label:'รอบ / ปีการศึกษา',type:'text',required:true},{key:'source',label:'ช่องทางที่มา',type:'select',options:['เว็บไซต์','กิจกรรมแนะแนว','โรงเรียนเครือข่าย','พาร์ทเนอร์','อื่น ๆ']},{key:'status',label:'สถานะการสมัคร',type:'select',options:['สนใจ','เริ่มสมัคร','ส่งใบสมัครแล้ว','ตรวจเอกสาร','ผ่านการคัดเลือก','ยืนยันสิทธิ์','ไม่ผ่าน','สละสิทธิ์'],required:true},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    jointCourses: {title:'A2 · หลักสูตรร่วม / Inter / Short Course', singular:'โครงการ A2', description:'บันทึกโครงการหลักสูตรร่วม หลักสูตรนานาชาติ และหลักสูตรระยะสั้น พร้อมข้อมูล Partner และความต้องการผู้เรียน', columns:[['projectCode','รหัสรายการ'],['projectType','ประเภทโครงการ'],['name','ชื่อโครงการ'],['partner','Partner'],['startDate','วันที่เริ่ม'],['endDate','วันที่สิ้นสุด'],['participantCount','จำนวนผู้เข้าร่วม'],['targetGroup','กลุ่มเป้าหมาย'],['interestLevel','ระดับความสนใจ'],['status','สถานะ'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'projectCode',label:'รหัสรายการ',type:'text',required:true,autoCode:true},{key:'projectType',label:'ประเภทโครงการ',type:'select',options:['หลักสูตรร่วม (Joint Program)','Inter Program','Short Course'],required:true},{key:'name',label:'ชื่อโครงการ',type:'text',required:true},{key:'partner',label:'Partner',type:'text',required:true},{key:'startDate',label:'วันที่เริ่ม',type:'date',required:true},{key:'endDate',label:'วันที่สิ้นสุด',type:'date'},{key:'participantCount',label:'จำนวนผู้เข้าร่วม (โดยประมาณ)',type:'number',step:'1'},{key:'targetGroup',label:'กลุ่มเป้าหมาย',type:'text'},{key:'sourceChannel',label:'ช่องทางที่รู้จักโครงการ',type:'select',options:['ความร่วมมือเดิม (Existing Partnership)','แนะนำโดย Partner','เครือข่ายมหาวิทยาลัย','เว็บไซต์','กิจกรรม','อื่น ๆ']},{key:'customerNeed',label:'ความต้องการของลูกค้า',type:'text'},{key:'participationPurpose',label:'วัตถุประสงค์การเข้าร่วม',type:'text'},{key:'interestLevel',label:'ระดับความสนใจ',type:'rating',options:['1','2','3','4','5'],required:true},{key:'expectation',label:'ความคาดหวัง',type:'textarea'},{key:'notes',label:'หมายเหตุ',type:'textarea'},{key:'feedback',label:'Feedback และสรุป',type:'textarea',wide:true},{key:'status',label:'สถานะ',type:'select',options:['เปิดรับ','กำลังติดตาม','สมัครแล้ว','รอเอกสาร','เสร็จสิ้น','ร่าง'],required:true},{key:'owner',label:'ผู้รับผิดชอบ',type:'text',required:true}
    ]},
    potentialPartners: {title:'B0 · Potential Partner / พันธมิตรที่คาดหวัง', singular:'พันธมิตร', description:'ทะเบียนองค์กรที่มีโอกาสพัฒนาเป็นความร่วมมือ พร้อมผู้ติดต่อ โอกาส และขั้นตอนติดตาม', columns:[['partnerCode','รหัส Partner'],['name','ชื่อองค์กร'],['organizationType','ประเภทองค์กร'],['collaborationTypes','ประเภทความร่วมมือที่คาดหวัง'],['opportunityLevel','ระดับโอกาส'],['status','สถานะ'],['nextAction','Next action'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'partnerCode',label:'รหัส Partner',type:'text',required:true,autoCode:true},{key:'name',label:'ชื่อองค์กร',type:'autocomplete',required:true},{key:'organizationType',label:'ประเภทองค์กร',type:'select',options:['บริษัทเอกชน','องค์กรเอกชน','องค์กรภาครัฐ','สถาบันการศึกษา','องค์กรไม่แสวงหาผลกำไร','Startup','อื่น ๆ'],required:true},{key:'customerGroup',label:'กลุ่มลูกค้า / อุตสาหกรรม',type:'text',placeholder:'เช่น เทคโนโลยี / ดิจิทัล'},{key:'website',label:'เว็บไซต์',type:'url'},{key:'country',label:'ประเทศ',type:'text'},{key:'province',label:'จังหวัด',type:'text'},{key:'contact',label:'ผู้ประสานงาน',type:'text'},{key:'position',label:'ตำแหน่ง',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'collaborationTypes',label:'โอกาสความร่วมมือ',type:'checkbox-group',options:['ค่าย','Workshop','ทุนสนับสนุน','Recruitment','Research'],span:3},{key:'sourceChannel',label:'แหล่งที่มา',type:'select',options:['แนะนำจากเครือข่ายศิษย์เก่า','พบจากกิจกรรม','บุคลากร CAMT แนะนำ','Partner แนะนำ','เว็บไซต์','อื่น ๆ']},{key:'opportunityLevel',label:'ระดับโอกาส',type:'select',options:['สูง','กลาง','ต่ำ']},{key:'status',label:'สถานะ',type:'select',options:['สนใจ','กำลังติดตาม','พร้อมเจรจา','รอติดตาม','ติดต่อแล้ว','พักไว้','ไม่ร่วมมือ'],required:true},{key:'nextAction',label:'Next action',type:'text'},{key:'owner',label:'ผู้รับผิดชอบ',type:'text'},{key:'notes',label:'หมายเหตุ / สรุป',type:'textarea',wide:true,span:3}
    ]},
    schools: {title:'B1 · โรงเรียนคู่ความร่วมมือ / School Partner', singular:'โรงเรียนคู่ความร่วมมือ', description:'ข้อมูลโรงเรียน สถานะข้อตกลง การเข้าร่วมกิจกรรม และผู้เรียนที่สนใจหลักสูตร CAMT', columns:[['schoolCode','รหัส Partner'],['name','ชื่อโรงเรียน'],['province','จังหวัด'],['agreementType','MOU/MOA'],['status','สถานะ'],['collaborationActivities','กิจกรรมร่วม'],['participantCount','ผู้เข้าร่วม'],['interestedStudents','สมัครเรียนต่อ'],['incomeTotal','รายได้ (บาท)'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'schoolCode',label:'รหัส Partner',type:'text',required:true,autoCode:true,section:'ข้อมูลโรงเรียน'},{key:'name',label:'ชื่อโรงเรียน',type:'text',required:true,span:2},{key:'schoolType',label:'ประเภทโรงเรียน',type:'select',options:['มัธยมศึกษา','ประถมศึกษา','อาชีวศึกษา','วิทยาลัย','มหาวิทยาลัย','อื่น ๆ'],required:true},{key:'province',label:'จังหวัด',type:'select',options:['เชียงใหม่','กรุงเทพมหานคร','เชียงราย','ลำพูน','ลำปาง','แพร่','น่าน','พะเยา','แม่ฮ่องสอน','ภูเก็ต','ขอนแก่น','นครราชสีมา','สงขลา','อื่น ๆ']},{key:'coordinator',label:'ผู้ประสานงานโรงเรียน',type:'text'},{key:'position',label:'ตำแหน่ง',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'country',label:'ประเทศ',type:'select',options:['ไทย','อื่น ๆ']},{key:'phone',label:'เบอร์โทร',type:'tel'},
      {key:'agreementType',label:'MOU / MOA',type:'select',options:['ไม่มี','MOU','MOA'],section:'ความร่วมมือและกิจกรรม'},{key:'status',label:'สถานะความร่วมมือ',type:'select',options:['Potential','Active','ใกล้หมดอายุ','พักความร่วมมือ','สิ้นสุดแล้ว'],required:true},{key:'collaborationActivities',label:'กิจกรรมที่ร่วมกัน',type:'textarea',wide:true,span:3},{key:'relatedActivityIds',label:'กิจกรรมที่เกี่ยวข้อง (เลือกได้หลายรายการ)',type:'activity-multi',span:3},{key:'relatedProductIds',label:'หลักสูตรที่เกี่ยวข้อง (เลือกได้หลายรายการ)',type:'product-multi',span:3},{key:'participantCount',label:'จำนวนผู้เข้าร่วมกิจกรรม',type:'number'},{key:'interestedStudents',label:'จำนวนผู้เรียนที่สนใจสมัคร',type:'number'},{key:'incomeTotal',label:'รายได้รวม (บาท)',type:'number'},
      {key:'feedback',label:'Feedback จากโรงเรียน',type:'textarea',wide:true,span:3,section:'สรุปและหมายเหตุ'},{key:'summary',label:'สรุปความร่วมมือ / หมายเหตุ',type:'textarea',wide:true,span:3},{key:'owner',label:'ผู้รับผิดชอบ',type:'text'}
    ]},
    intlRelations: {title:'B2 · มหาวิทยาลัย / วิเทศสัมพันธ์', singular:'มหาวิทยาลัยคู่ความร่วมมือ', description:'จัดการเครือข่ายมหาวิทยาลัยและหน่วยงานต่างประเทศ จำนวนนักศึกษา กิจกรรม ข้อตกลง และงบประมาณที่เชื่อมโยง', columns:[['partnerCode','รหัส Partner'],['universityName','มหาวิทยาลัย'],['country','ประเทศ'],['cooperationType','ประเภทความร่วมมือ'],['agreementType','MOU/MOA'],['studentFlow','Inbound / Outbound'],['activityCount','กิจกรรมร่วม'],['incomeTotal','รายได้/ทุน (บาท)'],['status','สถานะ'],['owner','ผู้รับผิดชอบ']], fields:[
      {key:'partnerCode',label:'รหัส Partner',type:'text',required:true,autoCode:true,section:'ข้อมูลสถาบันคู่ความร่วมมือ'},{key:'universityName',label:'ชื่อมหาวิทยาลัย',type:'text',required:true},{key:'country',label:'ประเทศ',type:'select',options:['เกาหลีใต้','ญี่ปุ่น','สิงคโปร์','ออสเตรเลีย','มาเลเซีย','สหราชอาณาจักร','สหรัฐอเมริกา','จีน','ไทย','อื่น ๆ'],required:true},{key:'cooperationType',label:'ประเภทความร่วมมือ',type:'select',options:['Student Exchange','Joint Research','Short Course','Dual Degree','Visiting Lecturer','Cultural Workshop','ความร่วมมือทางวิชาการ','อื่น ๆ'],required:true},{key:'department',label:'หน่วยงาน',type:'text'},{key:'coordinator',label:'ผู้ประสานงาน',type:'text'},{key:'email',label:'อีเมล',type:'email'},{key:'phone',label:'เบอร์โทร',type:'tel'},{key:'inboundStudents',label:'Inbound Students',type:'number',step:'1',section:'ความร่วมมือและกิจกรรม'},{key:'outboundStudents',label:'Outbound Students',type:'number',step:'1'},{key:'status',label:'สถานะความร่วมมือ',type:'select',options:['Active','กำลังดำเนินการ','รอต่ออายุ','Potential','พักความร่วมมือ','สิ้นสุดแล้ว'],required:true},{key:'activityStartDate',label:'วันที่เริ่มกิจกรรม',type:'date'},{key:'activityEndDate',label:'วันที่สิ้นสุดกิจกรรม',type:'date'},{key:'activityDetails',label:'รายละเอียดกิจกรรมที่ร่วมกัน',type:'textarea',wide:true,span:3},{key:'relatedActivityIds',label:'เชื่อมกับกิจกรรมในระบบ (เลือกได้หลายรายการ)',type:'activity-multi',span:3},{key:'supportingAttachment',label:'เอกสารประกอบความร่วมมือ (ไม่บังคับ)',type:'file',span:3},{key:'summary',label:'สรุปและหมายเหตุ',type:'textarea',wide:true,span:3,section:'สรุปและหมายเหตุ'},{key:'owner',label:'ผู้รับผิดชอบ',type:'text'},{key:'agreementType',label:'MOU / MOA',type:'select',options:['ไม่มี','MOU','MOA']}
    ]},
    alumni: {title:'C · Alumni', singular:'ศิษย์เก่า', description:'ทะเบียนศิษย์เก่าและข้อมูลเส้นทางอาชีพ รวมสถานะการทำงาน เงินเดือน และการตอบ VOC', columns:[['sequence','ลำดับ'],['alumniCode','รหัส Alumni'],['fullName','ชื่อ-นามสกุล'],['cohortYear','รุ่น / ปีที่จบ'],['position','ตำแหน่ง / ทำอะไร'],['employer','ทำอะไรอยู่ / บริษัท'],['employmentStatus','ภาวะการมีงานทำ'],['salaryMonthly','Salary (บาท/เดือน)'],['vocSubmitted','VOC']], fields:[
      {key:'alumniCode',label:'รหัส Alumni',type:'text',required:true,autoCode:true,section:'1. ข้อมูลส่วนตัว'},{key:'prefix',label:'คำนำหน้า',type:'select',options:['นาย','นาง','นางสาว','ดร.','อื่น ๆ'],required:true},{key:'firstName',label:'ชื่อ',type:'text',required:true},{key:'lastName',label:'นามสกุล',type:'text',required:true},{key:'cohortYear',label:'รุ่น / ปีที่จบ',type:'select',options:Array.from({length:21},(_,index)=>String(2570-index)),required:true},{key:'major',label:'สาขาที่จบ',type:'select',options:programOptions,required:true},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel'},{key:'email',label:'อีเมล',type:'email'},
      {key:'position',label:'ตำแหน่งงาน / ใคร อะไร',type:'text',section:'2. ใคร อะไร / ทำอะไร / ที่ไหน'},{key:'employer',label:'ทำอะไรอยู่ / บริษัท / หน่วยงาน',type:'text'},
      {key:'employmentStatus',label:'ภาวะการมีงานทำ',type:'select',options:['ทำงานแล้ว','กำลังหางาน','ศึกษาต่อ','ประกอบธุรกิจส่วนตัว','อื่น ๆ'],required:true,section:'3. ภาวะการมีงานทำ / Salary'},{key:'salaryMonthly',label:'รายได้ (Salary) บาท/เดือน',type:'number',step:'1'},{key:'vocSubmitted',label:'ส่ง VOC แล้ว',type:'select',options:['มี','ไม่มี'],required:true,section:'4. VOC / Feedback'},{key:'vocFeedback',label:'Feedback / VOC',type:'textarea',wide:true},{key:'notes',label:'หมายเหตุ',type:'textarea',wide:true}
    ]},
    studentHistories: {title:'D · Student', singular:'นักเรียน', description:'ประวัตินักเรียนตั้งแต่เริ่มศึกษา ต่อเนื่องถึงการสำเร็จการศึกษา ทุน และรางวัล', columns:[['sequence','ลำดับ'],['studentCode','รหัสนักเรียน'],['fullName','ชื่อ-นามสกุล'],['program','หลักสูตร/สาขา'],['admissionYear','ปีที่เข้าเรียน'],['currentStage','สถานะการศึกษา'],['awardsSummary','เกียรติยศ / รางวัล (สรุป)']], fields:[
      {key:'studentCode',label:'รหัสนักเรียน',type:'text',required:true,autoCode:true,section:'1. ข้อมูลนักเรียน',formStep:1},{key:'prefix',label:'คำนำหน้า',type:'select',options:['เด็กชาย','เด็กหญิง','นาย','นางสาว','อื่น ๆ'],formStep:1},{key:'firstName',label:'ชื่อ',type:'text',required:true,formStep:1},{key:'lastName',label:'นามสกุล',type:'text',required:true,formStep:1},{key:'citizenId',label:'เลขประจำตัวประชาชน',type:'text',placeholder:'13 หลัก',formStep:1},{key:'birthDate',label:'วันเกิด',type:'date',formStep:1},{key:'phone',label:'เบอร์โทรศัพท์',type:'tel',formStep:1},{key:'program',label:'หลักสูตร / สาขา',type:'select',options:programOptions,required:true,section:'ข้อมูลการศึกษา',formStep:1},{key:'admissionYear',label:'ปีที่เข้าเรียน',type:'select',options:Array.from({length:21},(_,index)=>String(2570-index)),required:true,formStep:1},{key:'currentStage',label:'สถานะการศึกษา',type:'select',options:['กำลังศึกษา','จบการศึกษา','พักการศึกษา','พ้นสภาพ'],required:true,formStep:1},
      {key:'advisor',label:'อาจารย์ / ผู้ประสานงาน',type:'text',section:'2. ประวัติการศึกษา',formStep:2},{key:'educationNotes',label:'บันทึกประวัติการศึกษา',type:'textarea',wide:true,formStep:2},
      {key:'scholarshipSummary',label:'ทุนการศึกษา (สรุป)',type:'textarea',wide:true,section:'3. เกียรติยศ / รางวัล',formStep:3},{key:'awardsSummary',label:'เกียรติยศ / รางวัล (สรุป)',type:'textarea',wide:true,formStep:3},{key:'awardCount',label:'จำนวนรางวัล',type:'number',step:'1',formStep:3},{key:'supportNotes',label:'หมายเหตุทุน / รางวัล',type:'textarea',wide:true,formStep:3},
      {key:'graduationYear',label:'ปีที่จบการศึกษา',type:'select',options:Array.from({length:21},(_,index)=>String(2570-index)),section:'4. จบการศึกษา',formStep:4},{key:'graduationResult',label:'สถานะการจบ',type:'select',options:['ยังไม่จบ','สำเร็จการศึกษา','กำลังดำเนินการ','อื่น ๆ'],formStep:4},{key:'graduationNotes',label:'รายละเอียดการจบการศึกษา',type:'textarea',wide:true,formStep:4},{key:'notes',label:'หมายเหตุเพิ่มเติม',type:'textarea',wide:true,formStep:4}
    ]}
  };

  const seed = {
    budgets:[
      {id:'BUD-001',code:'BG-240001',projectName:'ค่ายทดลองเรียนสื่อดิจิทัล (ตัวอย่าง)',incomeTotal:0,expenseTotal:24800,type:'Camp',owner:'หน่วยพัฒนานักศึกษา'},
      {id:'BUD-002',code:'BG-240002',projectName:'Workshop สร้างสรรค์ด้วย AI (ตัวอย่าง)',incomeTotal:86500,expenseTotal:0,type:'Workshop',owner:'BRIDGE'},
      {id:'BUD-003',code:'BG-240003',projectName:'กิจกรรมแนะแนวหลักสูตร (ตัวอย่าง)',incomeTotal:150000,expenseTotal:0,type:'กิจกรรมประชาสัมพันธ์',owner:'หน่วยบริหารการศึกษา'}
    ],
    agreements:[
      {id:'AGR-001',agreementType:'MOU',docNo:'MOU-2567-001',partner:'Singapore Global Academy',documentStatus:'Active',signedDate:'2024-06-01',startDate:'2024-06-01',endDate:'2027-05-31',signerOur:'ผู้บริหาร CAMT (ตัวอย่าง)',signerPartner:'ผู้บริหาร Singapore Global Academy (ตัวอย่าง)',attachmentName:'',documentNotes:'ข้อมูลสมมติสำหรับพัฒนา',purpose:'สร้างความร่วมมือด้านการศึกษาและสื่อสร้างสรรค์',cooperationFormat:'พัฒนาหลักสูตร',scope:'แลกเปลี่ยนองค์ความรู้และจัดกิจกรรมร่วมกัน'},
      {id:'AGR-002',agreementType:'MOA',docNo:'MOA-2567-002',partner:'University of Malaya',documentStatus:'Draft',signedDate:'',startDate:'2024-08-15',endDate:'2027-08-14',signerOur:'',signerPartner:'',attachmentName:'',documentNotes:'รอจัดทำเอกสารฉบับลงนาม',purpose:'พัฒนาความร่วมมือทางวิชาการระหว่างสถาบัน',cooperationFormat:'แลกเปลี่ยนนักศึกษา/บุคลากร',scope:'อยู่ระหว่างยืนยันรายละเอียด'},
      {id:'AGR-003',agreementType:'MOU',docNo:'MOU-2566-015',partner:'Khon Kaen University',documentStatus:'Expired',signedDate:'2023-05-10',startDate:'2023-05-10',endDate:'2024-05-09',signerOur:'ผู้บริหาร CAMT (ตัวอย่าง)',signerPartner:'ผู้บริหารมหาวิทยาลัยขอนแก่น (ตัวอย่าง)',attachmentName:'',documentNotes:'ข้อมูลสมมติสำหรับพัฒนา',purpose:'ส่งเสริมการแลกเปลี่ยนความรู้และทรัพยากรการศึกษา',cooperationFormat:'ทางวิชาการ',scope:'สิ้นสุดระยะเวลาความร่วมมือแล้ว'},
      {id:'AGR-004',agreementType:'MOA',docNo:'MOA-2567-010',partner:'Peking University',documentStatus:'Active',signedDate:'2024-03-20',startDate:'2024-03-20',endDate:'2027-03-19',signerOur:'ผู้บริหาร CAMT (ตัวอย่าง)',signerPartner:'ผู้บริหาร Peking University (ตัวอย่าง)',attachmentName:'',documentNotes:'ข้อมูลสมมติสำหรับพัฒนา',purpose:'สนับสนุนกิจกรรมแลกเปลี่ยนนักศึกษาและบุคลากร',cooperationFormat:'แลกเปลี่ยนนักศึกษา/บุคลากร',scope:'ประสานงานโครงการแลกเปลี่ยนตามรอบการศึกษา'}
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
      {id:'EVT-001',activityCode:'ACT-2609001',activityType:'Open House',name:'CMU Open House 2024 (ตัวอย่าง)',product:'ดิจิทัลเกม',unit:'หน่วยพัฒนานักศึกษา',startDate:'2026-09-15',endDate:'2026-09-15',round:'รอบที่ 2',venue:'วิทยาลัย CAMT',capacity:60,audience:'นักเรียน ม.4–6',walkIn:'ไม่ใช่',checkinMethod:'สแกน QR โดยเจ้าหน้าที่',partner:'โรงเรียนเครือข่ายตัวอย่าง',owner:'น.ส. อรณิชา ใจดี (ตัวอย่าง)',status:'เสร็จสิ้น',description:'กิจกรรมเปิดบ้านแนะนำหลักสูตรและการเรียนการสอน (ข้อมูลตัวอย่าง)'},
      {id:'EVT-002',activityCode:'ACT-2608002',activityType:'Workshop',name:'Workshop การทำเว็บด้วย HTML & CSS (ตัวอย่าง)',product:'หลักสูตรระยะสั้น BRIDGE',unit:'BRIDGE',startDate:'2026-08-10',endDate:'2026-08-10',round:'รอบที่ 1',venue:'ห้องเรียนตัวอย่าง',capacity:40,audience:'นักศึกษาและผู้สนใจ',walkIn:'ใช่',checkinMethod:'เจ้าหน้าที่ค้นหา/บันทึก',partner:'องค์กรตัวอย่างด้านสื่อ',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)',status:'เสร็จสิ้น',description:'กิจกรรม Workshop ฝึกทำเว็บเบื้องต้น (ข้อมูลตัวอย่าง)'},
      {id:'EVT-003',activityCode:'ACT-2607003',activityType:'กิจกรรมแนะแนว',name:'แนะแนวการศึกษาต่อ (ตัวอย่าง)',product:'การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (ปกติ)',unit:'หน่วยบริหารการศึกษา',startDate:'2026-07-20',endDate:'2026-07-20',round:'รอบที่ 1',venue:'โรงเรียนเครือข่ายตัวอย่าง',capacity:80,audience:'นักเรียน ม.ปลาย',walkIn:'ไม่ใช่',checkinMethod:'ผู้เข้าร่วมสแกน QR',partner:'โรงเรียนเครือข่ายตัวอย่าง',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)',status:'เสร็จสิ้น',description:'กิจกรรมแนะแนวหลักสูตรของ CAMT (ข้อมูลตัวอย่าง)'}
    ],
    registrations:[
      {id:'REG-001',activityId:'EVT-001',memberId:'MEM-001',registeredAt:'2026-09-01',status:'ยืนยันแล้ว',checkInAt:'2026-09-15T09:05:00.000Z'},
      {id:'REG-002',activityId:'EVT-001',memberId:'MEM-002',registeredAt:'2026-09-02',status:'ยืนยันแล้ว',checkInAt:'2026-09-15T09:20:00.000Z'},
      {id:'REG-003',activityId:'EVT-002',memberId:'MEM-003',registeredAt:'2026-08-01',status:'ยืนยันแล้ว',checkInAt:'2026-08-10T09:10:00.000Z'}
    ],
    a0Participants:[
      {id:'A0-0001',recordCode:'A0-0001',recordedDate:'2026-09-15',memberId:'MEM-001',activityId:'EVT-001',grade:'ม.6',interestedProgram:'วิศวกรรมซอฟต์แวร์',interestReason:'ชอบการเขียนโปรแกรมและอยากพัฒนาตนเองให้ดีขึ้น',interestScore:'4',applicationIntent:'มีแนวโน้ม',feedback:'กิจกรรมสนุก ได้รับข้อมูลครบถ้วน วิทยากรอธิบายดีมาก',owner:'น.ส. อรณิชา ใจดี (ตัวอย่าง)',status:'รอติดตาม'},
      {id:'A0-0002',recordCode:'A0-0002',recordedDate:'2026-09-15',memberId:'MEM-002',activityId:'EVT-001',grade:'ม.5',interestedProgram:'ดิจิทัลเกม',interestReason:'สนใจเทคโนโลยีใหม่และอยากต่อยอดด้านนวัตกรรม',interestScore:'5',applicationIntent:'มีแนวโน้ม',feedback:'ได้ทดลองปฏิบัติจริงและเห็นภาพการเรียนชัดเจน',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)',status:'ติดตามแล้ว'},
      {id:'A0-0003',recordCode:'A0-0003',recordedDate:'2026-08-10',memberId:'MEM-003',activityId:'EVT-002',grade:'อื่น ๆ',interestedProgram:'หลักสูตรระยะสั้น BRIDGE',interestReason:'สนใจการวิเคราะห์ข้อมูลและการใช้ AI ในอนาคต',interestScore:'3',applicationIntent:'ไม่แน่ใจ',feedback:'บรรยากาศดี วิทยากรน่ารัก อยากทราบข้อมูลเพิ่มเติม',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)',status:'รอติดตาม'}
    ],
    applicants:[
      {id:'APP-001',name:'ผู้สมัครตัวอย่าง 01',email:'applicant@example.invalid',phone:'0800000003',program:'ดิจิทัลเกม',applyYear:'2569',source:'กิจกรรมแนะแนว',status:'ส่งใบสมัครแล้ว',notes:'ข้อมูลสมมติ'},
      {id:'APP-002',name:'ผู้สมัครตัวอย่าง 02',email:'demoapp@example.invalid',phone:'0800000004',program:'วิศวกรรมซอฟต์แวร์',applyYear:'2569',source:'เว็บไซต์',status:'สนใจ',notes:'ข้อมูลสมมติ'}
    ],
    jointCourses:[
      {id:'JNT-001',projectCode:'A2-2407001',projectType:'หลักสูตรร่วม (Joint Program)',name:'CMU – SGA Joint Summer Program 2024',partner:'Singapore Global Academy (ตัวอย่าง)',startDate:'2024-07-15',endDate:'2024-07-26',participantCount:25,targetGroup:'นักเรียนระดับมัธยมศึกษาตอนปลาย',sourceChannel:'ความร่วมมือเดิม (Existing Partnership)',customerNeed:'พัฒนาทักษะภาษาอังกฤษและประสบการณ์ด้านสื่อดิจิทัล',participationPurpose:'เสริมสร้างทักษะภาษาอังกฤษและเรียนรู้วัฒนธรรมใหม่',interestLevel:'4',expectation:'ได้รับประสบการณ์การเรียนรู้และกิจกรรมเชิงวัฒนธรรมที่มีคุณภาพ',notes:'ประสานงานกับ Partner สำหรับกำหนดการและจำนวนผู้เข้าร่วม',feedback:'การจัดโครงการเป็นมืออาชีพ ทีมงานดูแลดี กิจกรรมหลากหลาย นักเรียนได้รับประสบการณ์ที่ดีมาก',status:'เปิดรับ',owner:'น.ส. อรณิชา ใจดี (ตัวอย่าง)'},
      {id:'JNT-002',projectCode:'A2-2408002',projectType:'Short Course',name:'Data Analytics for Beginners',partner:'Tech Future Institute (ตัวอย่าง)',startDate:'2024-08-10',endDate:'2024-08-18',participantCount:40,targetGroup:'นักศึกษาระดับปริญญาตรี',sourceChannel:'แนะนำโดย Partner',customerNeed:'เพิ่มทักษะการวิเคราะห์ข้อมูลเบื้องต้นสำหรับผู้เรียน',participationPurpose:'เรียนรู้การใช้เครื่องมือวิเคราะห์ข้อมูล',interestLevel:'5',expectation:'นำความรู้ไปใช้กับโครงงานหรือการทำงานได้',notes:'เปิดรับสมัครรุ่นที่ 1',feedback:'ผู้เรียนให้ความสนใจสูงและต้องการต่อยอดหลักสูตรขั้นสูง',status:'กำลังติดตาม',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)'},
      {id:'JNT-003',projectCode:'A2-2409003',projectType:'Inter Program',name:'ASEAN Digital Skills Exchange',partner:'Bangkok International College (ตัวอย่าง)',startDate:'2024-09-01',endDate:'2024-09-15',participantCount:30,targetGroup:'นักศึกษาต่างชาติ',sourceChannel:'เครือข่ายมหาวิทยาลัย',customerNeed:'กิจกรรมแลกเปลี่ยนทักษะดิจิทัลระหว่างประเทศ',participationPurpose:'แลกเปลี่ยนความรู้และประสบการณ์ระหว่างนักศึกษา',interestLevel:'3',expectation:'สร้างเครือข่ายและเรียนรู้การทำงานข้ามวัฒนธรรม',notes:'อยู่ระหว่างติดตามเอกสารและรายชื่อผู้สมัคร',feedback:'',status:'สมัครแล้ว',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)'},
      {id:'JNT-004',projectCode:'A2-2410004',projectType:'หลักสูตรร่วม (Joint Program)',name:'Creative Media Collaboration Camp',partner:'Kyoto Arts Academy (ตัวอย่าง)',startDate:'2024-10-05',endDate:'2024-10-12',participantCount:20,targetGroup:'นักเรียนและบุคคลทั่วไป',sourceChannel:'ความร่วมมือเดิม (Existing Partnership)',customerNeed:'พัฒนาความคิดสร้างสรรค์และการผลิตสื่อร่วมกัน',participationPurpose:'ทดลองทำงานสื่อสร้างสรรค์กับผู้เรียนต่างประเทศ',interestLevel:'4',expectation:'ได้ผลงานสื่อที่นำไปต่อยอดได้',notes:'รอเอกสารยืนยันการจัดกิจกรรม',feedback:'',status:'รอเอกสาร',owner:'นาย ภูมิภัทร แก้วทอง (ตัวอย่าง)'}
    ],
    potentialPartners:[
      {id:'POT-001',partnerCode:'PB0-2024-0001',name:'Future Tech Solutions Co., Ltd. (ตัวอย่าง)',organizationType:'บริษัทเอกชน',customerGroup:'เทคโนโลยี / ดิจิทัล',website:'https://example.invalid',country:'ไทย',province:'กรุงเทพมหานคร',contact:'คุณเพียรพล สินสุข (ตัวอย่าง)',position:'Business Development Manager',email:'partner@example.invalid',phone:'02-345-6789',collaborationTypes:['Workshop','Recruitment'],sourceChannel:'แนะนำจากเครือข่ายศิษย์เก่า',opportunityLevel:'สูง',status:'กำลังติดตาม',nextAction:'นัดประชุมเบื้องต้น',owner:'น.ส. ศิริวรรณ จันทร์ดี (ตัวอย่าง)',notes:'ข้อมูลสมมติสำหรับแสดงรูปแบบทะเบียน Partner'},
      {id:'POT-002',partnerCode:'PB0-2024-0002',name:'Northern Smart Manufacturing (ตัวอย่าง)',organizationType:'บริษัทเอกชน',customerGroup:'อุตสาหกรรม / การผลิต',website:'https://example.invalid',country:'ไทย',province:'เชียงใหม่',contact:'ผู้ประสานงานองค์กร (ตัวอย่าง)',position:'HR Manager',email:'northern@example.invalid',phone:'053-000-000',collaborationTypes:['Research','Recruitment'],sourceChannel:'พบจากกิจกรรม',opportunityLevel:'สูง',status:'พร้อมเจรจา',nextAction:'ส่งข้อเสนอความร่วมมือ',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)',notes:'ข้อมูลสมมติสำหรับแสดงรูปแบบทะเบียน Partner'},
      {id:'POT-003',partnerCode:'PB0-2024-0003',name:'Green Energy Network (ตัวอย่าง)',organizationType:'องค์กรเอกชน',customerGroup:'พลังงาน / สิ่งแวดล้อม',website:'https://example.invalid',country:'ไทย',province:'เชียงใหม่',contact:'ผู้ประสานงานเครือข่าย (ตัวอย่าง)',position:'ผู้จัดการโครงการ',email:'green@example.invalid',phone:'053-000-001',collaborationTypes:['ทุนสนับสนุน','Workshop'],sourceChannel:'บุคลากร CAMT แนะนำ',opportunityLevel:'กลาง',status:'รอติดตาม',nextAction:'โทรติดตามอีกครั้ง',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)',notes:'ข้อมูลสมมติสำหรับแสดงรูปแบบทะเบียน Partner'},
      {id:'POT-004',partnerCode:'PB0-2024-0004',name:'HealthTech Innovation Hub (ตัวอย่าง)',organizationType:'Startup',customerGroup:'สุขภาพ / เทคโนโลยี',website:'https://example.invalid',country:'ไทย',province:'เชียงใหม่',contact:'ผู้ประสานงานองค์กร (ตัวอย่าง)',position:'Partnership Lead',email:'healthtech@example.invalid',phone:'053-000-002',collaborationTypes:['Recruitment','Research'],sourceChannel:'เว็บไซต์',opportunityLevel:'สูง',status:'สนใจ',nextAction:'นัดเยี่ยมองค์กร',owner:'นายณัฐวุฒิ แก้วทอง (ตัวอย่าง)',notes:'ข้อมูลสมมติสำหรับแสดงรูปแบบทะเบียน Partner'}
    ],
    schools:[
      {id:'SCH-001',schoolCode:'SB1-2024-0012',name:'โรงเรียนเชียงใหม่วิทยาคม (ตัวอย่าง)',schoolType:'มัธยมศึกษา',province:'เชียงใหม่',coordinator:'อาจารย์กมลรัตน์ สุขใจ (ตัวอย่าง)',position:'หัวหน้างานแนะแนว',email:'guidance@example.invalid',country:'ไทย',phone:'053-234-567',agreementType:'MOU',status:'Active',collaborationActivities:'กิจกรรม Open House, Workshop แนะแนวอาชีพ และให้คำปรึกษาด้านการเรียนต่อในคณะ / สาขาต่าง ๆ',relatedActivityIds:['EVT-001','EVT-002'],relatedProductIds:['PRD-001','PRD-004'],participantCount:180,interestedStudents:24,incomeTotal:45000,feedback:'โรงเรียนได้รับประโยชน์จากกิจกรรม นักเรียนได้ข้อมูลที่ชัดเจนและมีประโยชน์ อยากให้จัดต่อเนื่องในปีถัดไป',summary:'ร่วมกิจกรรมแนะแนวและ Open House ต่อเนื่อง',owner:'น.ส. ศิริวรรณ จันทร์ดี (ตัวอย่าง)'},
      {id:'SCH-002',schoolCode:'SB1-2024-0013',name:'โรงเรียนแม่ริมวิทยาคม (ตัวอย่าง)',schoolType:'มัธยมศึกษา',province:'เชียงใหม่',coordinator:'ครูผู้ประสานงาน (ตัวอย่าง)',position:'ครูแนะแนว',email:'maerim@example.invalid',country:'ไทย',phone:'053-000-013',agreementType:'MOA',status:'Active',collaborationActivities:'แนะแนวการศึกษาและประชาสัมพันธ์หลักสูตร',relatedActivityIds:['EVT-003'],relatedProductIds:['PRD-002'],participantCount:120,interestedStudents:15,incomeTotal:18000,feedback:'ได้รับข้อมูลหลักสูตรครบถ้วนและต้องการพานักเรียนเข้าร่วมกิจกรรมอีก',summary:'ติดตามการส่งต่อนักเรียนที่สนใจหลักสูตร',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)'},
      {id:'SCH-003',schoolCode:'SB1-2024-0014',name:'โรงเรียนยุพราชวิทยาลัย (ตัวอย่าง)',schoolType:'มัธยมศึกษา',province:'เชียงใหม่',coordinator:'ผู้ประสานงานโรงเรียน (ตัวอย่าง)',position:'ครูแนะแนว',email:'yupparaj@example.invalid',country:'ไทย',phone:'053-000-014',agreementType:'MOU',status:'ใกล้หมดอายุ',collaborationActivities:'ค่ายวิทยาศาสตร์และสื่อดิจิทัล',relatedActivityIds:['EVT-001'],relatedProductIds:['PRD-001'],participantCount:95,interestedStudents:12,incomeTotal:12500,feedback:'อยู่ระหว่างทบทวนแผนกิจกรรมร่วมในปีการศึกษาถัดไป',summary:'ตรวจสอบวันหมดอายุ MOU และนัดคุยต่ออายุ',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)'},
      {id:'SCH-004',schoolCode:'SB1-2024-0015',name:'โรงเรียนสาธิตมหาวิทยาลัยเชียงใหม่ (ตัวอย่าง)',schoolType:'มัธยมศึกษา',province:'เชียงใหม่',coordinator:'เจ้าหน้าที่ประสานงาน (ตัวอย่าง)',position:'ผู้ประสานงานโครงการ',email:'demo-school@example.invalid',country:'ไทย',phone:'053-000-015',agreementType:'ไม่มี',status:'Potential',collaborationActivities:'Workshop แนะแนวและกิจกรรมทดลองเรียน',relatedActivityIds:['EVT-002'],relatedProductIds:['PRD-004'],participantCount:60,interestedStudents:8,incomeTotal:9000,feedback:'สนใจเข้าร่วม Workshop ในรอบถัดไป',summary:'อยู่ระหว่างสำรวจรูปแบบความร่วมมือ',owner:'นายณัฐวุฒิ แก้วทอง (ตัวอย่าง)'}
    ],
    intlRelations:[
      {id:'INT-001',partnerCode:'UB2-2024-0007',universityName:'Seoul Global University (ตัวอย่าง)',country:'เกาหลีใต้',cooperationType:'Student Exchange',department:'International Affairs Office',coordinator:'Dr. Min Seo Kim (ตัวอย่าง)',email:'minkim@example.invalid',phone:'+82-2-1234-5678',agreementType:'MOA',inboundStudents:12,outboundStudents:8,activityCount:5,relatedActivityIds:[],incomeTotal:320000,status:'Active',activityStartDate:'2024-06-01',activityEndDate:'2024-06-05',activityDetails:'แลกเปลี่ยนนักศึกษา บรรยายพิเศษโดยอาจารย์ผู้เชี่ยวชาญ และจัดเวิร์กช็อปวัฒนธรรม (ข้อมูลตัวอย่าง)',summary:'มีแนวโน้มร่วมมืออย่างต่อเนื่องและขยายโอกาสด้านการวิจัย',attachmentName:'',owner:'น.ส. ศิริวรรณ จันทร์ดี (ตัวอย่าง)'},
      {id:'INT-002',partnerCode:'UB2-2024-0008',universityName:'Kyoto International College (ตัวอย่าง)',country:'ญี่ปุ่น',cooperationType:'Joint Research',department:'Center for Creative Media',coordinator:'ผู้ประสานงานโครงการ (ตัวอย่าง)',email:'global@example.invalid',phone:'+81-75-123-4567',agreementType:'MOU',inboundStudents:4,outboundStudents:2,activityCount:3,relatedActivityIds:[],incomeTotal:180000,status:'Active',activityStartDate:'2024-08-10',activityEndDate:'2024-08-12',activityDetails:'โครงการวิจัยร่วมด้านสื่อดิจิทัลและการเรียนรู้ข้ามวัฒนธรรม (ข้อมูลตัวอย่าง)',summary:'วางแผนประชุมติดตามผลการวิจัยในภาคการศึกษาถัดไป',attachmentName:'',owner:'นายปริญญา จันทร์ดี (ตัวอย่าง)'},
      {id:'INT-003',partnerCode:'UB2-2024-0009',universityName:'National University of Singapore (ตัวอย่าง)',country:'สิงคโปร์',cooperationType:'Short Course',department:'School of Computing',coordinator:'เจ้าหน้าที่วิเทศสัมพันธ์ (ตัวอย่าง)',email:'exchange@example.invalid',phone:'+65-6123-4567',agreementType:'MOA',inboundStudents:15,outboundStudents:10,activityCount:4,relatedActivityIds:[],incomeTotal:450000,status:'กำลังดำเนินการ',activityStartDate:'2024-09-01',activityEndDate:'2024-09-15',activityDetails:'จัดหลักสูตรระยะสั้นและแลกเปลี่ยนประสบการณ์ด้านเทคโนโลยีสารสนเทศ (ข้อมูลตัวอย่าง)',summary:'กำลังเตรียมกำหนดการและรายชื่อผู้เข้าร่วม',attachmentName:'',owner:'น.ส. ศิริลักษณ์ พงษ์สุข (ตัวอย่าง)'},
      {id:'INT-004',partnerCode:'UB2-2024-0010',universityName:'Queensland Partner University (ตัวอย่าง)',country:'ออสเตรเลีย',cooperationType:'Dual Degree',department:'Global Engagement Office',coordinator:'เจ้าหน้าที่ประสานงาน (ตัวอย่าง)',email:'contact@example.invalid',phone:'+61-7-1234-5678',agreementType:'MOU',inboundStudents:2,outboundStudents:1,activityCount:2,relatedActivityIds:[],incomeTotal:95000,status:'รอต่ออายุ',activityStartDate:'2024-10-05',activityEndDate:'2024-10-08',activityDetails:'หารือแนวทางหลักสูตรสองปริญญาและการแลกเปลี่ยนนักศึกษา (ข้อมูลตัวอย่าง)',summary:'เตรียมทบทวนเอกสารและขอบเขตความร่วมมือ',attachmentName:'',owner:'นายณัฐวุฒิ แก้วทอง (ตัวอย่าง)'}
    ],
    alumni:[
      {id:'ALU-001',alumniCode:'ALM670001',prefix:'นาย',firstName:'กิตติพงศ์',lastName:'แสงดี',cohortYear:'2567',major:'วิศวกรรมซอฟต์แวร์',email:'alumni01@example.invalid',phone:'0800000101',position:'Software Engineer',employer:'SCB Tech X (ตัวอย่าง)',employmentStatus:'ทำงานแล้ว',salaryMonthly:45000,vocSubmitted:'มี',vocFeedback:'ข้อมูลตัวอย่างสำหรับสาธิต VOC'},
      {id:'ALU-002',alumniCode:'ALM660045',prefix:'นางสาว',firstName:'อริธรา',lastName:'มั่นคง',cohortYear:'2566',major:'วิทยาการข้อมูล',email:'alumni02@example.invalid',phone:'0800000102',position:'Data Analyst',employer:'Google Thailand (ตัวอย่าง)',employmentStatus:'ทำงานแล้ว',salaryMonthly:55000,vocSubmitted:'มี',vocFeedback:'ข้อมูลตัวอย่าง'},
      {id:'ALU-003',alumniCode:'ALM650123',prefix:'นาย',firstName:'ธนวัฒน์',lastName:'ใจดี',cohortYear:'2565',major:'การออกแบบดิจิทัล',email:'alumni03@example.invalid',phone:'0800000103',position:'UX/UI Designer',employer:'Freelance',employmentStatus:'ทำงานแล้ว',salaryMonthly:35000,vocSubmitted:'ไม่มี',vocFeedback:''},
      {id:'ALU-004',alumniCode:'ALM640210',prefix:'นางสาว',firstName:'ปภาวดี',lastName:'รักเรียน',cohortYear:'2564',major:'การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ',email:'alumni04@example.invalid',phone:'0800000104',position:'Marketing Officer',employer:'CP All (ตัวอย่าง)',employmentStatus:'ทำงานแล้ว',salaryMonthly:30000,vocSubmitted:'มี',vocFeedback:'ข้อมูลตัวอย่าง'},
      {id:'ALU-005',alumniCode:'ALM630078',prefix:'นาย',firstName:'พีรณัฐ',lastName:'สุขใจ',cohortYear:'2563',major:'ดิจิทัลเกม',email:'alumni05@example.invalid',phone:'0800000105',position:'เจ้าของกิจการ',employer:'ร้านกาแฟ Slow Day (ตัวอย่าง)',employmentStatus:'ประกอบธุรกิจส่วนตัว',salaryMonthly:40000,vocSubmitted:'มี',vocFeedback:'ข้อมูลตัวอย่าง'},
      {id:'ALU-006',alumniCode:'ALM650200',prefix:'นางสาว',firstName:'พิมพ์ชนก',lastName:'คงทอง',cohortYear:'2565',major:'การจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ',email:'alumni06@example.invalid',phone:'0800000106',position:'กำลังหางาน',employer:'',employmentStatus:'กำลังหางาน',salaryMonthly:'',vocSubmitted:'ไม่มี',vocFeedback:''},
      {id:'ALU-007',alumniCode:'ALM650250',prefix:'นาย',firstName:'ศุภกร',lastName:'พันธดี',cohortYear:'2565',major:'วิทยาการข้อมูล',email:'alumni07@example.invalid',phone:'0800000107',position:'นักศึกษาปริญญาโท',employer:'มหาวิทยาลัยเชียงใหม่',employmentStatus:'ศึกษาต่อ',salaryMonthly:'',vocSubmitted:'ไม่มี',vocFeedback:''}
    ],
    studentHistories:[
      {id:'STU-001',studentCode:'STU670001',prefix:'เด็กชาย',firstName:'ธนกร',lastName:'ใจดี',citizenId:'',birthDate:'',phone:'0800000201',email:'student01@example.invalid',program:'วิทยาการคอมพิวเตอร์',admissionYear:'2567',currentStage:'กำลังศึกษา',graduationYear:'',graduationResult:'ยังไม่จบ',advisor:'อาจารย์ตัวอย่าง',educationNotes:'เริ่มศึกษาในปี 2567 (ข้อมูลสาธิต)',scholarshipSummary:'ทุนตัวอย่าง 1 รายการ',awardsSummary:'3 รางวัล',awardCount:3,supportNotes:'ข้อมูลสมมติ',graduationNotes:'',notes:'ข้อมูลสมมติ'},
      {id:'STU-002',studentCode:'STU660045',prefix:'นางสาว',firstName:'พิมพ์ชนก',lastName:'แสงสุข',citizenId:'',birthDate:'',phone:'0800000202',email:'student02@example.invalid',program:'บริหารธุรกิจ',admissionYear:'2566',currentStage:'กำลังศึกษา',graduationYear:'',graduationResult:'ยังไม่จบ',advisor:'อาจารย์ตัวอย่าง',educationNotes:'ข้อมูลการศึกษาตัวอย่าง',scholarshipSummary:'ทุนตัวอย่าง',awardsSummary:'1 รางวัล',awardCount:1,supportNotes:'',graduationNotes:'',notes:'ข้อมูลสมมติ'},
      {id:'STU-003',studentCode:'STU630120',prefix:'นาย',firstName:'ปรีชา',lastName:'วงศ์ดี',citizenId:'',birthDate:'',phone:'0800000203',email:'student03@example.invalid',program:'วิศวกรรมไฟฟ้า',admissionYear:'2563',currentStage:'จบการศึกษา',graduationYear:'2567',graduationResult:'สำเร็จการศึกษา',advisor:'อาจารย์ตัวอย่าง',educationNotes:'สำเร็จการศึกษาในปี 2567 (ข้อมูลสาธิต)',scholarshipSummary:'',awardsSummary:'5 รางวัล',awardCount:5,supportNotes:'',graduationNotes:'สำเร็จการศึกษาปี 2567',notes:'ข้อมูลสมมติ'},
      {id:'STU-004',studentCode:'STU620210',prefix:'นางสาว',firstName:'วรรณิภา',lastName:'บุญล้น',citizenId:'',birthDate:'',phone:'0800000204',email:'student04@example.invalid',program:'บัญชีบัณฑิต',admissionYear:'2562',currentStage:'จบการศึกษา',graduationYear:'2566',graduationResult:'สำเร็จการศึกษา',advisor:'อาจารย์ตัวอย่าง',educationNotes:'สำเร็จการศึกษาในปี 2566 (ข้อมูลสาธิต)',scholarshipSummary:'ทุนตัวอย่าง',awardsSummary:'2 รางวัล',awardCount:2,supportNotes:'',graduationNotes:'สำเร็จการศึกษาปี 2566',notes:'ข้อมูลสมมติ'},
      {id:'STU-005',studentCode:'STU610098',prefix:'นาย',firstName:'ศรัณย์',lastName:'ก้องเจริญ',citizenId:'',birthDate:'',phone:'0800000205',email:'student05@example.invalid',program:'นิเทศศาสตร์',admissionYear:'2561',currentStage:'จบการศึกษา',graduationYear:'2565',graduationResult:'สำเร็จการศึกษา',advisor:'อาจารย์ตัวอย่าง',educationNotes:'สำเร็จการศึกษาในปี 2565 (ข้อมูลสาธิต)',scholarshipSummary:'',awardsSummary:'4 รางวัล',awardCount:4,supportNotes:'',graduationNotes:'สำเร็จการศึกษาปี 2565',notes:'ข้อมูลสมมติ'}
    ],
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
  let currentStudentFormStep = 1;
  let overviewUnit = 'all';
  let overviewYear = '2569';
  let overviewPeriod = 'ปีปัจจุบัน';
  const entityStatusByRoute={};

  function loadState(){
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if(raw){
        const parsed=JSON.parse(raw);
        if(parsed && parsed.data && parsed.version===1){
          const budgetRows=Array.isArray(parsed.data.budgets)?parsed.data.budgets:[];
          const legacyRows=budgetRows.filter(row=>row.direction||row.amount!==undefined);
          if(parsed.demo&&legacyRows.length){
            const demoActivityLinks={'BUD-001':'EVT-001','BUD-002':'EVT-002','BUD-003':'EVT-001','BUD-004':'EVT-003'};
            const activities=Array.isArray(parsed.data.activities)?parsed.data.activities:[];
            const groups=new Map();
            activities.forEach(activity=>groups.set(activity.id,{activityId:activity.id,projectName:activity.name,incomeTotal:0,expenseTotal:0,type:/workshop/i.test(activity.name)?'Workshop':/camp|ค่าย/i.test(activity.name)?'Camp':/ระยะสั้น|short course/i.test(activity.name)?'Short Course':'กิจกรรมประชาสัมพันธ์',owner:activity.unit}));
            legacyRows.forEach(row=>{
              const activityId=row.activityId||demoActivityLinks[row.id]||'';
              const activity=activities.find(item=>item.id===activityId);
              const key=activityId||`legacy-${row.id}`;
              if(!groups.has(key))groups.set(key,{activityId:'',projectName:row.projectName||row.name||row.category||'โครงการที่ยังไม่ระบุชื่อ',incomeTotal:0,expenseTotal:0,type:'อื่น ๆ',owner:row.unit||'ยังไม่ระบุ'});
              const project=groups.get(key);
              if(row.direction==='รายรับ')project.incomeTotal+=Number(row.amount||0);
              if(row.direction==='รายจ่าย')project.expenseTotal+=Number(row.amount||0);
              if(activity&&row.id==='BUD-003'&&row.unit==='ห้องสร้างสรรค์เพื่อการเรียนรู้')project.owner=activity.unit;
            });
            const migratedProjects=[...groups.values()].map((project,index)=>{const {activityId,...fields}=project;return{id:`BUD-${String(index+1).padStart(3,'0')}`,code:`BG-240${String(index+1).padStart(3,'0')}`,...fields};});
            parsed.data.budgets=[...budgetRows.filter(row=>!row.direction&&row.amount===undefined),...migratedProjects];
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not save migrated budget records',error);}
          }
          const agreementRows=Array.isArray(parsed.data.agreements)?parsed.data.agreements:[];
          if(agreementRows.some(row=>!row.docNo)){
            parsed.data.agreements=agreementRows.map((row,index)=>{
              const agreementType=row.agreementType||row.type||'MOU';
              const startDate=row.startDate||'';
              const endDate=row.endDate||'';
              const oldStatus=String(row.documentStatus||row.status||'Active');
              const documentStatus=/draft|ร่าง|อนุมัติ/i.test(oldStatus)?'Draft':/expired|สิ้นสุด|หมดอายุ/i.test(oldStatus)||Boolean(endDate&&endDate<today)?'Expired':'Active';
              const year=startDate?String(Number(startDate.slice(0,4))+543):'2569';
              const sequence=String(index+1).padStart(3,'0');
              return {...row,agreementType,docNo:row.docNo||`${agreementType}-${year}-${sequence}`,partner:row.partner||row.organization||'ยังไม่ระบุ Partner',signedDate:row.signedDate||startDate,documentStatus,signerOur:row.signerOur||row.owner||'',signerPartner:row.signerPartner||'',attachmentName:row.attachmentName||'',documentNotes:row.documentNotes||row.notes||'',purpose:row.purpose||row.actualWork||'',cooperationFormat:row.cooperationFormat||'อื่น ๆ',scope:row.scope||row.actualWork||''};
            });
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not save migrated agreement records',error);}
          }
          const activityRows=Array.isArray(parsed.data.activities)?parsed.data.activities:[];
          if(activityRows.some(row=>!row.activityCode||!row.activityType||!row.round||!row.owner)){
            parsed.data.activities=activityRows.map((row,index)=>{
              const label=`${row.name||''} ${row.product||''}`;
              const activityType=row.activityType||(/open\s*house/i.test(label)?'Open House':/workshop/i.test(label)?'Workshop':/camp|ค่าย/i.test(label)?'Camp':/แนะแนว/i.test(label)?'กิจกรรมแนะแนว':'กิจกรรมอื่น ๆ');
              return {...row,activityCode:row.activityCode||`ACT-260${String(index+1).padStart(4,'0')}`,activityType,round:row.round||'รอบที่ 1',owner:row.owner||row.unit||'ยังไม่ระบุ'};
            });
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not save migrated activity records',error);}
          }
          const jointCourseRows=Array.isArray(parsed.data.jointCourses)?parsed.data.jointCourses:[];
          if(jointCourseRows.some(row=>!row.projectCode||!row.projectType||!row.partner||row.participantCount===undefined)){
            parsed.data.jointCourses=jointCourseRows.map((row,index)=>{
              const projectType=row.projectType||(/short course|ระยะสั้น|BRIDGE/i.test(`${row.name||''} ${row.program||''}`)?'Short Course':/inter|นานาชาติ/i.test(`${row.name||''} ${row.program||''}`)?'Inter Program':'หลักสูตรร่วม (Joint Program)');
              const cohortCount=String(row.cohort||'').match(/\d+/)?.[0];
              const oldStatus=String(row.status||'ร่าง');
              const status=['เปิดรับ','กำลังติดตาม','สมัครแล้ว','รอเอกสาร','เสร็จสิ้น','ร่าง'].includes(oldStatus)?oldStatus:/เปิด|active/i.test(oldStatus)?'เปิดรับ':/เอกสาร|รอ/i.test(oldStatus)?'รอเอกสาร':/เสร็จ|สิ้นสุด|complete/i.test(oldStatus)?'เสร็จสิ้น':'กำลังติดตาม';
              return {...row,projectCode:row.projectCode||`A2-${String(2400001+index).padStart(7,'0')}`,projectType,name:row.name||'โครงการ A2 ที่ยังไม่ระบุชื่อ',partner:row.partner||row.institution||'ยังไม่ระบุ Partner',participantCount:row.participantCount??Number(cohortCount||0),targetGroup:row.targetGroup||'',sourceChannel:row.sourceChannel||'ความร่วมมือเดิม (Existing Partnership)',customerNeed:row.customerNeed||'',participationPurpose:row.participationPurpose||'',interestLevel:String(row.interestLevel||'3'),expectation:row.expectation||'',feedback:row.feedback||'',status,owner:row.owner||'ยังไม่ระบุ'};
            });
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate A2 project records',error);}
          }
          const partnerRows=Array.isArray(parsed.data.potentialPartners)?parsed.data.potentialPartners:[];
          if(!Array.isArray(parsed.data.potentialPartners)||partnerRows.some(row=>!row.partnerCode||!row.organizationType||!Array.isArray(row.collaborationTypes)||!row.opportunityLevel||!row.nextAction||!row.owner)){
            const oldStatusMap={'พบรายชื่อ':'สนใจ','ติดต่อแล้ว':'กำลังติดตาม','กำลังหารือ':'พร้อมเจรจา','ทำข้อตกลงแล้ว':'พร้อมเจรจา','พักการติดต่อ':'พักไว้'};
            parsed.data.potentialPartners=partnerRows.map((row,index)=>({
              ...row,
              partnerCode:row.partnerCode||`PB0-2024-${String(index+1).padStart(4,'0')}`,
              organizationType:row.organizationType||'องค์กรเอกชน',
              customerGroup:row.customerGroup||'',website:row.website||'',province:row.province||'',position:row.position||'',phone:row.phone||'',
              collaborationTypes:Array.isArray(row.collaborationTypes)?row.collaborationTypes:(row.field?[row.field]:[]),
              sourceChannel:row.sourceChannel||'อื่น ๆ',opportunityLevel:row.opportunityLevel||'กลาง',
              status:oldStatusMap[row.status]||(['สนใจ','กำลังติดตาม','พร้อมเจรจา','รอติดตาม','ติดต่อแล้ว','พักไว้','ไม่ร่วมมือ'].includes(row.status)?row.status:'กำลังติดตาม'),
              nextAction:row.nextAction||'ติดตามความคืบหน้า',owner:row.owner||'ยังไม่ระบุผู้รับผิดชอบ',notes:row.notes||''
            }));
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate Potential Partner records',error);}
          }
          if(!Array.isArray(parsed.data.a0Participants)){
            parsed.data.a0Participants=parsed.demo?structuredClone(seed.a0Participants):[];
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not initialize A0 participant records',error);}
          }
          const schoolRows=Array.isArray(parsed.data.schools)?parsed.data.schools:[];
          if(!Array.isArray(parsed.data.schools)||schoolRows.some(row=>!row.schoolCode||!row.schoolType||row.participantCount===undefined||!Array.isArray(row.relatedActivityIds)||!Array.isArray(row.relatedProductIds))){
            const activityRows=Array.isArray(parsed.data.activities)?parsed.data.activities:[];
            const oldSchoolStatus={'กำลังดำเนินการ':'Active','มีข้อตกลง':'Active','ติดตามต่อ':'Potential','พักความร่วมมือ':'พักความร่วมมือ'};
            parsed.data.schools=schoolRows.map((row,index)=>({
              ...row,schoolCode:row.schoolCode||`SB1-2024-${String(index+12).padStart(4,'0')}`,
              schoolType:row.schoolType||'มัธยมศึกษา',coordinator:row.coordinator||row.contact||'',position:row.position||'',country:row.country||'ไทย',phone:row.phone||'',
              agreementType:row.agreementType||row.mouMoa||'ไม่มี',status:oldSchoolStatus[row.status]||(['Potential','Active','ใกล้หมดอายุ','พักความร่วมมือ','สิ้นสุดแล้ว'].includes(row.status)?row.status:'Potential'),
              collaborationActivities:row.collaborationActivities||row.lastActivity||'',
              relatedActivityIds:Array.isArray(row.relatedActivityIds)?row.relatedActivityIds:activityRows.filter(activity=>activity.partner===row.name||activity.venue===row.name).map(activity=>activity.id),
              relatedProductIds:Array.isArray(row.relatedProductIds)?row.relatedProductIds:[],
              participantCount:Number(row.participantCount??row.students??0),interestedStudents:Number(row.interestedStudents||0),incomeTotal:Number(row.incomeTotal||0),
              feedback:row.feedback||'',summary:row.summary||row.notes||'',owner:row.owner||'ยังไม่ระบุผู้รับผิดชอบ'
            }));
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate school partner records',error);}
          }
          const intlRows=Array.isArray(parsed.data.intlRelations)?parsed.data.intlRelations:null;
          if(!intlRows||intlRows.some(row=>!row.partnerCode||!row.universityName||!row.cooperationType||row.inboundStudents===undefined||row.outboundStudents===undefined)){
            const agreementRows=Array.isArray(parsed.data.agreements)?parsed.data.agreements:[];
            parsed.data.intlRelations=intlRows?.length?intlRows.map((row,index)=>{
              const oldStatus=String(row.status||'กำลังดำเนินการ');
              const status=oldStatus==='มีข้อตกลง'?'Active':oldStatus==='สิ้นสุด'?'สิ้นสุดแล้ว':['Active','กำลังดำเนินการ','รอต่ออายุ','Potential','พักความร่วมมือ','สิ้นสุดแล้ว'].includes(oldStatus)?oldStatus:'กำลังดำเนินการ';
              return {...row,partnerCode:row.partnerCode||`UB2-2024-${String(index+7).padStart(4,'0')}`,universityName:row.universityName||row.name||row.institution||'มหาวิทยาลัยที่ยังไม่ระบุชื่อ',country:row.country||'อื่น ๆ',cooperationType:row.cooperationType||row.relationType||'อื่น ๆ',department:row.department||row.unit||'',coordinator:row.coordinator||row.contact||'',email:row.email||'',phone:row.phone||'',agreementId:row.agreementId||(agreementRows.some(agreement=>agreement.id===row.agreement)?row.agreement:''),agreementType:row.agreementType||(['MOU','MOA'].includes(row.agreement)?row.agreement:'ไม่มี'),inboundStudents:Number(row.inboundStudents??row.inbound??0),outboundStudents:Number(row.outboundStudents??row.outbound??0),activityCount:Number(row.activityCount??row.activitiesCount??0),relatedActivityIds:Array.isArray(row.relatedActivityIds)?row.relatedActivityIds:[],incomeTotal:Number(row.incomeTotal??row.scholarship??0),status,activityStartDate:row.activityStartDate||row.startDate||'',activityEndDate:row.activityEndDate||row.endDate||'',activityDetails:row.activityDetails||row.activities||row.collaborationActivities||'',summary:row.summary||row.notes||'',attachmentName:row.attachmentName||'',owner:row.owner||'ยังไม่ระบุผู้รับผิดชอบ'};
            }):parsed.demo?structuredClone(seed.intlRelations):[];
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate university partner records',error);}
          }
          const alumniRows=Array.isArray(parsed.data.alumni)?parsed.data.alumni:[];
          if(alumniRows.some(row=>!row.alumniCode||!row.firstName||!row.employmentStatus||row.vocSubmitted===undefined)){
            parsed.data.alumni=alumniRows.map((row,index)=>{
              const nameParts=String(row.name||'').trim().split(/\s+/);
              const cohortYear=String(row.cohortYear||row.graduationYear||'2569');
              const oldStatus=String(row.employmentStatus||row.contactStatus||'');
              const employmentStatus=row.employmentStatus||(/ศึกษา/.test(oldStatus)?'ศึกษาต่อ':/หางาน/.test(oldStatus)?'กำลังหางาน':/ธุรกิจ|เจ้าของ/.test(row.position||'')?'ประกอบธุรกิจส่วนตัว':row.employer?'ทำงานแล้ว':'อื่น ๆ');
              return {...row,alumniCode:row.alumniCode||`ALM${cohortYear.slice(-2)}${String(index+1).padStart(4,'0')}`,prefix:row.prefix||'นาย',firstName:row.firstName||nameParts[0]||'ศิษย์เก่า',lastName:row.lastName||nameParts.slice(1).join(' ')||'ตัวอย่าง',cohortYear,major:row.major||row.program||'ยังไม่ระบุสาขา',employmentStatus,salaryMonthly:row.salaryMonthly??row.salary??'',vocSubmitted:row.vocSubmitted||'ไม่มี',vocFeedback:row.vocFeedback||'',notes:row.notes||''};
            });
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate alumni records',error);}
          }
          const studentRows=Array.isArray(parsed.data.studentHistories)?parsed.data.studentHistories:[];
          if(studentRows.some(row=>!row.studentCode||!row.firstName||row.awardsSummary===undefined)){
            parsed.data.studentHistories=studentRows.map((row,index)=>{
              const nameParts=String(row.name||'').trim().split(/\s+/);
              const admissionYear=String(row.admissionYear||'2569');
              const currentStage=/สำเร็จ|จบ/.test(String(row.currentStage||''))?'จบการศึกษา':/พ้น|ลาออก/.test(String(row.currentStage||''))?'พ้นสภาพ':/พัก/.test(String(row.currentStage||''))?'พักการศึกษา':'กำลังศึกษา';
              return {...row,studentCode:row.studentCode||row.studentId||`STU${admissionYear.slice(-2)}${String(index+1).padStart(4,'0')}`,prefix:row.prefix||'นาย',firstName:row.firstName||nameParts[0]||'นักเรียน',lastName:row.lastName||nameParts.slice(1).join(' ')||'ตัวอย่าง',citizenId:row.citizenId||'',birthDate:row.birthDate||'',phone:row.phone||'',admissionYear,currentStage,graduationYear:row.graduationYear||'',graduationResult:row.graduationResult||(row.graduationYear?'สำเร็จการศึกษา':'ยังไม่จบ'),educationNotes:row.educationNotes||'',scholarshipSummary:row.scholarshipSummary||'',awardsSummary:row.awardsSummary||'',awardCount:Number(row.awardCount||0),supportNotes:row.supportNotes||'',graduationNotes:row.graduationNotes||'',notes:row.notes||''};
            });
            try{localStorage.setItem(STORE_KEY,JSON.stringify(parsed));}catch(error){console.warn('Could not migrate student history records',error);}
          }
          return parsed;
        }
      }
    } catch(error) { console.warn('Could not load local One Journey data', error); }
    const initial={version:1,demo:true,updatedAt:new Date().toISOString(),data:structuredClone(seed)};
    try{localStorage.setItem(STORE_KEY,JSON.stringify(initial));}catch(error){console.warn('Local storage unavailable',error);}
    return initial;
  }
  function saveState(){state.updatedAt=new Date().toISOString();try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(error){toast('บันทึกในเบราว์เซอร์ไม่สำเร็จ พื้นที่จัดเก็บอาจเต็ม');}}
  const data = key => state.data[key] || [];
  const budgetNet = row => Number(row.incomeTotal||0)-Number(row.expenseTotal||0);
  const budgetOutcome = row => budgetNet(row)>0?'มีกำไร':budgetNet(row)<0?'ขาดทุน':'เท่าทุน';
  const agreementCooperationStatus = row => row.documentStatus==='Active'?'ดำเนินการอยู่':row.documentStatus==='Draft'?'ร่างเอกสาร':'สิ้นสุดแล้ว';
  const schoolAgreement = school => data('agreements').find(row=>row.id===school.agreementId)||data('agreements').find(row=>row.relatedGroup==='B1'&&row.relatedRecordId===school.id)||data('agreements').find(row=>row.partner===school.name&&(!row.relatedGroup||row.relatedGroup==='B1'))||null;
  const schoolAgreementType = school => schoolAgreement(school)?.agreementType||school.agreementType||'ไม่มี';
  const schoolStatus = school => {
    const agreement=schoolAgreement(school);
    if(['พักความร่วมมือ','สิ้นสุดแล้ว'].includes(school.status))return school.status;
    if(!agreement)return school.status||'Potential';
    if(agreement.documentStatus==='Draft')return 'ร่างเอกสาร';
    if(agreement.documentStatus==='Expired')return 'สิ้นสุดแล้ว';
    if(agreement.endDate){const days=Math.ceil((new Date(`${agreement.endDate}T23:59:59`).getTime()-Date.now())/86400000);if(days<0)return 'สิ้นสุดแล้ว';if(days<=90)return 'ใกล้หมดอายุ';}
    return 'Active';
  };
  const schoolIncome = school => {const linked=data('budgets').filter(row=>row.relatedGroup==='B1'&&row.relatedRecordId===school.id);return linked.length?linked.reduce((total,row)=>total+Number(row.incomeTotal||0),0):Number(school.incomeTotal||0);};
  const intlAgreement = record => data('agreements').find(row=>row.id===record.agreementId)||data('agreements').find(row=>row.relatedGroup==='B2'&&row.relatedRecordId===record.id)||data('agreements').find(row=>row.partner===record.universityName&&(!row.relatedGroup||row.relatedGroup==='B2'))||null;
  const intlAgreementType = record => intlAgreement(record)?.agreementType||record.agreementType||'ไม่มี';
  const intlRelationStatus = record => {
    const agreement=intlAgreement(record);
    if(['พักความร่วมมือ','สิ้นสุดแล้ว'].includes(record.status))return record.status;
    if(!agreement)return record.status||'Potential';
    if(agreement.documentStatus==='Draft')return 'กำลังดำเนินการ';
    if(agreement.documentStatus==='Expired')return 'สิ้นสุดแล้ว';
    if(agreement.endDate){const days=Math.ceil((new Date(`${agreement.endDate}T23:59:59`).getTime()-Date.now())/86400000);if(days<0)return 'สิ้นสุดแล้ว';if(days<=90)return 'รอต่ออายุ';}
    return 'Active';
  };
  const intlRelationIncome = record => {const linked=data('budgets').filter(row=>row.relatedGroup==='B2'&&row.relatedRecordId===record.id);return linked.length?linked.reduce((total,row)=>total+Number(row.incomeTotal||0),0):Number(record.incomeTotal||0);};
  const intlActivityCount = record => record.relatedActivityIds?.length||Number(record.activityCount||0);
  const nextBudgetCode = () => {
    const largest=data('budgets').reduce((max,row)=>Math.max(max,Number(String(row.code||'').replace(/\D/g,''))||0),240000);
    return `BG-${String(largest+1).padStart(6,'0')}`;
  };
  const nextActivityCode = () => `ACT-260${String(data('activities').reduce((max,row)=>Math.max(max,Number(String(row.activityCode||'').replace(/\D/g,''))||0),2600000)-2600000+1).padStart(4,'0')}`;
  const nextA0Code = () => `A0-${String(data('a0Participants').reduce((max,row)=>Math.max(max,Number(String(row.recordCode||'').replace(/\D/g,''))||0),0)+1).padStart(4,'0')}`;
  const nextA2Code = () => `A2-${String(data('jointCourses').reduce((max,row)=>Math.max(max,Number(String(row.projectCode||'').replace(/\D/g,''))||0),2400000)+1).padStart(7,'0')}`;
  const nextAlumniCode = (cohortYear='2569') => {const year=String(cohortYear||'2569').slice(-2);const prefix=`ALM${year}`;const largest=data('alumni').reduce((max,row)=>{const code=String(row.alumniCode||'');return code.startsWith(prefix)?Math.max(max,Number(code.slice(prefix.length))||0):max;},0);return `${prefix}${String(largest+1).padStart(4,'0')}`;};
  const nextStudentCode = (admissionYear='2569') => {const year=String(admissionYear||'2569').slice(-2);const prefix=`STU${year}`;const largest=data('studentHistories').reduce((max,row)=>{const code=String(row.studentCode||row.studentId||'');return code.startsWith(prefix)?Math.max(max,Number(code.slice(prefix.length))||0):max;},0);return `${prefix}${String(largest+1).padStart(4,'0')}`;};
  const nextPotentialPartnerCode = () => {const year=String(new Date().getFullYear());const prefix=`PB0-${year}-`;const largest=data('potentialPartners').reduce((max,row)=>{const code=String(row.partnerCode||'');return code.startsWith(prefix)?Math.max(max,Number(code.slice(prefix.length))||0):max;},0);return `${prefix}${String(largest+1).padStart(4,'0')}`;};
  const nextSchoolCode = () => {const year=String(new Date().getFullYear());const prefix=`SB1-${year}-`;const largest=data('schools').reduce((max,row)=>{const code=String(row.schoolCode||'');return code.startsWith(prefix)?Math.max(max,Number(code.slice(prefix.length))||0):max;},0);return `${prefix}${String(largest+1).padStart(4,'0')}`;};
  const nextIntlRelationCode = () => {const year=String(new Date().getFullYear());const prefix=`UB2-${year}-`;const largest=data('intlRelations').reduce((max,row)=>{const code=String(row.partnerCode||'');return code.startsWith(prefix)?Math.max(max,Number(code.slice(prefix.length))||0):max;},0);return `${prefix}${String(largest+1).padStart(4,'0')}`;};
  function toast(message){const node=document.createElement('div');node.className='toast';node.textContent=message;$('#toastRegion').append(node);setTimeout(()=>node.remove(),3000);}

  const navSections=[
    {label:'ภาพรวม',items:[['overview','หน้าหลัก','home']]},
    {label:'งบประมาณและความร่วมมือ',items:[['budgets','งบประมาณรายได้','wallet'],['agreements','MOU / MOA','handshake']]},
    {label:'กลุ่มลูกค้า A',items:[['members','ทะเบียนสมาชิกกลาง','users'],['a0Participants','A0 · ผู้เข้าร่วมกิจกรรม','users'],['activities','กิจกรรม','calendar'],['applicants','A1 · ผู้สมัครหลักสูตร','user'],['jointCourses','A2 · Joint / Inter / Short Course','book'],['products','ทะเบียนโปรดัก / หลักสูตร','package']]},
    {label:'เครือข่ายกลุ่ม B',items:[['potentialPartners','B0 · Potential Partner','network'],['schools','B1 · โรงเรียนคู่ความร่วมมือ','school'],['intlRelations','B2 · มหาวิทยาลัย / วิเทศสัมพันธ์','globe']]},
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
    $('#breadcrumbTitle').textContent=currentRoute==='overview'?'หน้าหลัก':currentRoute==='search'?'ผลการค้นหา':currentRoute.startsWith('activity:')?'ลงทะเบียน / เช็คอิน':currentRoute.startsWith('student:')?'เส้นทางนักเรียน':(schemas[currentRoute]?.title||'หน้าหลัก');
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
    const activities=activityRows.length;
    const participantRows=data('a0Participants').filter(row=>activityIds.has(row.activityId));
    const partners=data('potentialPartners').length+data('schools').length+data('intlRelations').length;
    const registered=filteredRegistrations.length,attended=filteredRegistrations.filter(row=>row.checkInAt).length;
    const revenue=data('budgets').filter(row=>(!row.fiscalYear||row.fiscalYear===overviewYear)&&(overviewUnit==='all'||row.owner===overviewUnit)).reduce((sum,row)=>sum+Number(row.incomeTotal||0),0);
    const activeAgreements=data('agreements').filter(row=>row.documentStatus==='Active'||row.status==='ใช้งาน'||row.status==='ใกล้หมดอายุ').length;
    const stats=[['โปรดัก / หลักสูตร',data('products').length,'รายการในทะเบียน','package'],['กิจกรรมตามช่วง',activities,'จัดการในหน้ากิจกรรม','calendar'],['ผู้เข้าร่วม A0',participantRows.length,'บันทึกข้อมูลผู้เข้าร่วม','users'],['พาร์ทเนอร์และเครือข่าย',partners,'กลุ่ม B','handshake']];
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
      <section class="panel"><div class="panel-head"><div><h2>ข้อมูลตามกลุ่ม A</h2><p>จำนวนระเบียน A0–A2 และกิจกรรมที่เชื่อมกัน</p></div><span class="tag orange">A0–A2</span></div><div class="panel-body"><div class="donut-wrap"><div class="donut"><div class="donut-label"><strong>${money(participantRows.length)}</strong>A0 · ผู้เข้าร่วม</div></div><div class="legend-list"><div class="legend-row"><span><i></i>A0 · ผู้เข้าร่วม</span><b>${money(participantRows.length)}</b></div><div class="legend-row"><span><i></i>A1 · ผู้สมัครหลักสูตร</span><b>${money(data('applicants').length)}</b></div><div class="legend-row"><span><i></i>A2 · หลักสูตรร่วม</span><b>${money(data('jointCourses').length)}</b></div><div class="legend-row"><span><i></i>ลงทะเบียน / เช็คอิน</span><b>${money(registered)} / ${money(attended)}</b></div><div class="legend-row"><span><i></i>MOU / MOA ใช้งาน</span><b>${money(activeAgreements)}</b></div></div></div></div></section></div>
      <div class="dashboard-bottom"><section class="panel"><div class="panel-head"><div><h2>ทางลัดข้อมูลหลัก</h2><p>ชุดข้อมูลและโฟลว์งานการศึกษาที่เชื่อมกัน</p></div></div><div class="quick-links">${[['activities','กิจกรรม','จัดประเภท รอบ วันจัด และจำนวนผู้เข้าร่วม'],['a0Participants','A0 · ผู้เข้าร่วมกิจกรรม','สมาชิก ความสนใจ และ Feedback'],['applicants','A1 · ผู้สมัครหลักสูตร','ติดตามสถานะการสมัคร'],['jointCourses','A2 · Joint / Inter / Short Course','โครงการร่วมและหลักสูตรระยะสั้น'],['budgets','งบประมาณรายได้',`รายรับตัวอย่าง ฿${money(revenue)}`],['agreements','MOU / MOA',`${activeAgreements} ฉบับในสถานะใช้งาน`],['studentHistories','D · ประวัตินักเรียน','เส้นทางตั้งแต่สนใจจนจบ']].map(([key,title,note])=>`<a class="quick-link" href="#${key}" data-route="${key}"><span class="quick-link-icon">${iconSvg('arrowUpRight',15)}</span><span><strong>${title}</strong><small>${note}</small></span></a>`).join('')}</div></section>
      <section class="panel"><div class="panel-head"><div><h2>ภาพรวมหน่วยงาน</h2><p>จำนวนกิจกรรมในข้อมูลตัวอย่าง</p></div><span class="tag green">${money(activities)} กิจกรรม</span></div><div class="unit-breakdown">${unitOptions.slice(0,5).map(unit=>{const count=activityRows.filter(row=>row.unit===unit).length;const pct=Math.max(8,Math.round(count/Math.max(activities,1)*100));return `<div class="unit-row"><span>${escapeHtml(unit)}</span><div class="progress"><span style="width:${pct}%"></span></div><span class="unit-count">${count}</span></div>`}).join('')}</div></section></div>
      <div class="notice-card" style="margin-top:15px"><strong>ขอบเขตข้อมูลที่ต้องยืนยันกับเจ้าของระบบ:</strong> การเชื่อมระบบทะเบียน/การเรียน, แหล่งงบประมาณ, สิทธิ์ข้อมูลส่วนบุคคล และตัวชี้วัดรายงาน ขณะนี้ยังไม่มีไฟล์ข้อมูลจริงในโฟลเดอร์ data</div>`;
  }

  function renderEntityPage(entity){
    if(entity==='agreements')return renderAgreementsPage();
    const schema=schemas[entity];
    const actions=`${button('ส่งออก CSV','export-csv','button-quiet','download')}${button('เพิ่ม'+schema.singular,'add-record','button-primary','plus')}`;
    const q=(window.entitySearch||'').trim().toLocaleLowerCase('th');
    const sourceRows=data(entity);
    const statusOptions=[...new Set(sourceRows.map(row=>entity==='budgets'?budgetOutcome(row):entity==='schools'?schoolStatus(row):entity==='intlRelations'?intlRelationStatus(row):entity==='alumni'?row.employmentStatus:entity==='studentHistories'?row.currentStage:row.status).filter(Boolean))];
    const selectedStatus=entityStatusByRoute[entity]||'all';
    const rows=sourceRows.filter(row=>{
      const relatedText=entity==='a0Participants'?`${memberById(row.memberId)?.name||''} ${memberById(row.memberId)?.email||''} ${allActivities().find(activity=>activity.id===row.activityId)?.name||''} ${allActivities().find(activity=>activity.id===row.activityId)?.activityCode||''}`:entity==='potentialPartners'?`${row.name||''} ${row.organizationType||''} ${(row.collaborationTypes||[]).join(' ')} ${row.customerGroup||''} ${row.contact||''} ${row.nextAction||''} ${row.owner||''}`:entity==='schools'?`${row.name||''} ${row.province||''} ${row.coordinator||''} ${row.position||''} ${row.collaborationActivities||''} ${(row.relatedActivityIds||[]).map(id=>allActivities().find(activity=>activity.id===id)?.name||'').join(' ')} ${(row.relatedProductIds||[]).map(id=>data('products').find(product=>product.id===id)?.name||'').join(' ')} ${row.owner||''}`:entity==='intlRelations'?`${row.partnerCode||''} ${row.universityName||''} ${row.country||''} ${row.cooperationType||''} ${row.department||''} ${row.coordinator||''} ${row.activityDetails||''} ${row.summary||''} ${row.owner||''} ${(row.relatedActivityIds||[]).map(id=>allActivities().find(activity=>activity.id===id)?.name||'').join(' ')}`:'';
      const matchesQuery=!q||`${JSON.stringify(row)} ${relatedText}`.toLocaleLowerCase('th').includes(q);
      const matchesStatus=selectedStatus==='all'||(entity==='budgets'?budgetOutcome(row)===selectedStatus:entity==='schools'?schoolStatus(row)===selectedStatus:entity==='intlRelations'?intlRelationStatus(row)===selectedStatus:entity==='alumni'?row.employmentStatus===selectedStatus:entity==='studentHistories'?row.currentStage===selectedStatus:row.status===selectedStatus);
      return matchesQuery&&matchesStatus;
    });
    const tableClass=entity==='a0Participants'?'a0-table':entity==='activities'?'activity-table':entity==='jointCourses'?'a2-table':entity==='potentialPartners'?'potential-partner-table':entity==='schools'?'school-partner-table':entity==='intlRelations'?'international-partner-table':entity==='alumni'?'alumni-table':entity==='studentHistories'?'student-table':'';
    return `${setHeading(schema.title,schema.description,actions)}
      <div class="filter-row"><input class="search-control" id="entitySearch" type="search" placeholder="ค้นหาใน${escapeHtml(schema.title)}" value="${escapeHtml(window.entitySearch||'')}"><select class="field-control" id="statusFilter"><option value="all">ทุกสถานะ</option>${statusOptions.map(status=>`<option value="${escapeHtml(status)}" ${selectedStatus===status?'selected':''}>${escapeHtml(status)}</option>`).join('')}</select><span class="filter-spacer"></span><span class="small-label">${rows.length} รายการ · เก็บในเครื่องนี้</span></div>
      <section class="panel data-panel"><div class="panel-head"><div><h2>${escapeHtml(schema.title)}</h2><p>${entity==='activities'?'จัดการกิจกรรมและรอบ ส่วนรายชื่อผู้เข้าร่วมและเช็คอินอยู่ในรายละเอียดกิจกรรม':entity==='a0Participants'?'ข้อมูลผู้เข้าร่วมที่เชื่อมกับสมาชิกเดิมและกิจกรรม/รอบ':entity==='jointCourses'?'ข้อมูลโครงการ A2 ตามประเภท ความต้องการผู้เรียน และสถานะการติดตาม':entity==='potentialPartners'?'ติดตามองค์กรเป้าหมาย ระดับโอกาส ความร่วมมือ และขั้นตอนถัดไป · เพิ่มชื่อใหม่ได้จากฟอร์ม':entity==='schools'?'เชื่อมโรงเรียนกับกิจกรรมและหลักสูตรที่เกี่ยวข้อง พร้อมเปิดหน้ารายการต้นทางได้':entity==='intlRelations'?'ติดตามความร่วมมือกับมหาวิทยาลัยต่างประเทศ นักศึกษาแลกเปลี่ยน กิจกรรม เอกสาร และรายได้/ทุน':entity==='alumni'?'ข้อมูลศิษย์เก่าตามภาพตัวอย่าง · ข้อมูลในหน้านี้เป็นข้อมูลสาธิต':'ข้อมูลตัวอย่าง · ใช้ปุ่มแก้ไขเพื่อปรับระเบียนในเครื่อง'}</p></div></div>
      <div class="table-scroll"><table class="${tableClass}"><thead><tr>${schema.columns.map(([,label])=>`<th>${escapeHtml(label)}</th>`).join('')}<th>จัดการ</th></tr></thead><tbody>${rows.map((row,rowIndex)=>`<tr>${schema.columns.map(([key])=>`<td>${formatCell(entity,key,row,rowIndex)}</td>`).join('')}<td><div class="row-actions">${entity==='budgets'?`<button class="icon-action view-action" type="button" data-view-budget="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='activities'?`<button class="icon-action" type="button" data-open-activity="${escapeHtml(row.id)}" title="จัดการลงทะเบียนและเช็คอิน">${iconSvg('users',15)}</button>`:''}${entity==='a0Participants'?`<button class="icon-action view-action" type="button" data-view-a0="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='jointCourses'?`<button class="icon-action view-action" type="button" data-view-a2="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button><button class="icon-action" type="button" data-budget-a2="${escapeHtml(row.id)}" title="งบการเงิน">${iconSvg('wallet',14)}</button>`:''}${entity==='potentialPartners'?`<button class="icon-action view-action" type="button" data-view-partner="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='schools'?`<button class="icon-action view-action" type="button" data-view-school="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='intlRelations'?`<button class="icon-action view-action" type="button" data-view-intl-relation="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='alumni'?`<button class="icon-action view-action" type="button" data-view-alumni="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button>`:''}${entity==='studentHistories'?`<button class="icon-action" type="button" data-open-student="${escapeHtml(row.id)}" title="ดูเส้นทาง">${iconSvg('arrowUpRight',15)}</button>`:''}<button class="icon-action" type="button" data-edit="${escapeHtml(row.id)}" title="แก้ไข">${iconSvg('edit',14)}</button><button class="icon-action delete-action" type="button" data-delete="${escapeHtml(row.id)}" title="ลบ">${iconSvg('trash',14)}</button></div></td></tr>`).join('')}</tbody></table>${rows.length?'':'<div class="empty-state">ไม่พบข้อมูล ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มรายการใหม่</div>'}</div>
      <div class="table-foot"><span>แสดง ${rows.length} รายการ · ข้อมูลตัวอย่างยังไม่ใช่ข้อมูลจากฐานระบบจริง</span><button class="button button-quiet" data-action="reset-demo">คืนค่าข้อมูลตัวอย่าง</button></div></section>`;
  }
  function renderAgreementsPage(){
    const schema=schemas.agreements;
    const actions=`${button('ส่งออก CSV','export-csv','button-quiet','download')}${button('เพิ่มบันทึกความร่วมมือ','add-record','button-primary','plus')}`;
    const query=(window.agreementSearch||'').trim().toLocaleLowerCase('th');
    const status=entityStatusByRoute.agreements||'all';
    const startFrom=window.agreementStartFrom||'';
    const expiryTo=window.agreementExpiryTo||'';
    const rows=data('agreements').filter(row=>{
      const matchesQuery=!query||`${row.partner||''} ${row.docNo||''} ${row.projectName||''}`.toLocaleLowerCase('th').includes(query);
      const matchesStatus=status==='all'||row.documentStatus===status;
      const matchesStart=!startFrom||Boolean(row.startDate&&row.startDate>=startFrom);
      const matchesExpiry=!expiryTo||Boolean(row.endDate&&row.endDate<=expiryTo);
      return matchesQuery&&matchesStatus&&matchesStart&&matchesExpiry;
    });
    return `${setHeading(schema.title,schema.description,actions)}
      <div class="agreement-filter-row">
        <div class="agreement-filter-field"><label for="agreementStatusFilter">สถานะเอกสาร</label><select class="field-control" id="agreementStatusFilter"><option value="all" ${status==='all'?'selected':''}>ทั้งหมด</option>${['Active','Draft','Expired'].map(option=>`<option value="${option}" ${status===option?'selected':''}>${option}</option>`).join('')}</select></div>
        <div class="agreement-filter-field"><label for="agreementStartFilter">วันที่เริ่ม (จาก)</label><input class="field-control" id="agreementStartFilter" type="date" value="${escapeHtml(startFrom)}"></div>
        <div class="agreement-filter-field"><label for="agreementExpiryFilter">วันที่หมดอายุ (ถึง)</label><input class="field-control" id="agreementExpiryFilter" type="date" value="${escapeHtml(expiryTo)}"></div>
        <div class="agreement-filter-field agreement-search-field"><label for="agreementSearch">ค้นหา Partner / ชื่อโครงการ / เลขที่เอกสาร</label><input class="search-control" id="agreementSearch" type="search" placeholder="ค้นหา Partner / ชื่อโครงการ / เลขที่เอกสาร" value="${escapeHtml(window.agreementSearch||'')}"></div>
      </div>
      <section class="panel data-panel"><div class="panel-head"><div><h2>รายการบันทึกความร่วมมือ (MOU) / บันทึกข้อตกลง (MOA)</h2><p>${rows.length} รายการ · แนบเอกสารประกอบแต่ละฉบับได้</p></div></div><div class="table-scroll"><table class="agreement-table"><thead><tr>${schema.columns.map(([,label])=>`<th>${escapeHtml(label)}</th>`).join('')}<th>จัดการ</th></tr></thead><tbody>${rows.map((row,index)=>`<tr>${schema.columns.map(([key])=>`<td>${formatCell('agreements',key,row,index)}</td>`).join('')}<td><div class="row-actions"><button class="icon-action view-action" type="button" data-view-agreement="${escapeHtml(row.id)}" title="ดูรายละเอียด">${iconSvg('eye',14)}</button><button class="icon-action" type="button" data-edit="${escapeHtml(row.id)}" title="แก้ไข">${iconSvg('edit',14)}</button><button class="icon-action delete-action" type="button" data-delete="${escapeHtml(row.id)}" title="ลบ">${iconSvg('trash',14)}</button></div></td></tr>`).join('')}</tbody></table>${rows.length?'':'<div class="empty-state">ไม่พบรายการที่ตรงกับตัวกรอง ลองเปลี่ยนเงื่อนไขหรือเพิ่มบันทึกความร่วมมือ</div>'}</div><div class="table-foot"><span>แสดง ${rows.length} จาก ${data('agreements').length} รายการ · ข้อมูลตัวอย่างจัดเก็บในเบราว์เซอร์นี้</span><button class="button button-quiet" data-action="reset-demo">คืนค่าข้อมูลตัวอย่าง</button></div></section>`;
  }
  function renderA0Shortcuts(){return `<div class="module-grid"><article class="module-card"><h3>ลงทะเบียนด้วยตัวเอง</h3><p>ผู้เข้าร่วมกรอกข้อมูลและสร้าง/จับคู่โปรไฟล์สมาชิกด้วยอีเมล</p><div class="big-number">A0</div></article><article class="module-card"><h3>เพิ่มโดยเจ้าหน้าที่</h3><p>เจ้าหน้าที่เพิ่มผู้เข้าร่วมและลงทะเบียนจากหน้ารายชื่อกิจกรรม</p><div class="big-number">Staff</div></article><article class="module-card"><h3>ป้องกันข้อมูลซ้ำ</h3><p>ใช้สมาชิกเดิมข้ามกิจกรรม และเช็คอินเดิมไม่เพิ่มยอดซ้ำ</p><div class="big-number">1 คน</div></article></div>`;}
  function formatCell(entity,key,row,rowIndex=0){
    if(entity==='alumni'){
      const fullName=[row.prefix,row.firstName,row.lastName].filter(Boolean).join(' ');
      if(key==='sequence')return String(rowIndex+1);
      if(key==='alumniCode')return `<span class="cell-primary">${escapeHtml(row.alumniCode||'—')}</span>`;
      if(key==='fullName')return `<span class="cell-primary">${escapeHtml(fullName||'—')}</span>`;
      if(key==='cohortYear')return escapeHtml(row.cohortYear||'—');
      if(key==='employmentStatus'){const color=row.employmentStatus==='ทำงานแล้ว'?'green':row.employmentStatus==='กำลังหางาน'?'orange':row.employmentStatus==='ศึกษาต่อ'?'blue':row.employmentStatus==='ประกอบธุรกิจส่วนตัว'?'purple':'';return `<span class="tag ${color}">${escapeHtml(row.employmentStatus||'—')}</span>`;}
      if(key==='salaryMonthly')return row.salaryMonthly!==''&&row.salaryMonthly!==undefined&&row.salaryMonthly!==null?`${money(row.salaryMonthly)}`:'—';
      if(key==='vocSubmitted')return `<span class="tag ${row.vocSubmitted==='มี'?'green':''}">${escapeHtml(row.vocSubmitted||'ไม่มี')}</span>`;
    }
    if(entity==='studentHistories'){
      const fullName=[row.prefix,row.firstName,row.lastName].filter(Boolean).join(' ');
      if(key==='sequence')return String(rowIndex+1);
      if(key==='studentCode')return `<span class="cell-primary">${escapeHtml(row.studentCode||row.studentId||'—')}</span>`;
      if(key==='fullName')return `<span class="cell-primary">${escapeHtml(fullName||row.name||'—')}</span>`;
      if(key==='currentStage'){const color=row.currentStage==='จบการศึกษา'?'green':row.currentStage==='กำลังศึกษา'?'blue':row.currentStage==='พ้นสภาพ'?'red':'orange';const label=row.currentStage==='จบการศึกษา'&&row.graduationYear?`${row.currentStage} (${row.graduationYear})`:row.currentStage||'—';return `<span class="tag ${color}">${escapeHtml(label)}</span>`;}
      if(key==='awardsSummary')return escapeHtml(row.awardsSummary||(row.awardCount?`${row.awardCount} รางวัล`:'—'));
    }
    if(entity==='agreements'){
      if(key==='sequence')return String(rowIndex+1);
      if(key==='agreementType')return `<span class="cell-primary">${escapeHtml(row.agreementType||'—')}</span>`;
      if(key==='docNo')return `<span class="cell-primary">${escapeHtml(row.docNo||'—')}</span>`;
      if(key==='partner')return `<span class="agreement-partner">${escapeHtml(row.partner||'—')}</span>`;
      if(key==='documentStatus'){const color=row.documentStatus==='Active'?'green':row.documentStatus==='Expired'?'red':'';return `<span class="tag ${color}">${escapeHtml(row.documentStatus||'—')}</span>`;}
      if(key==='cooperationStatus'){const value=agreementCooperationStatus(row);const color=value==='ดำเนินการอยู่'?'green':value==='สิ้นสุดแล้ว'?'red':'';return `<span class="tag ${color}">${value}</span>`;}
      if(key==='attachment')return row.attachmentName?`<button class="file-cell-button" type="button" data-open-agreement-file="${escapeHtml(row.id)}">${iconSvg('file',14)} ดูไฟล์</button>`:`<button class="file-cell-button file-cell-upload" type="button" data-upload-agreement-file="${escapeHtml(row.id)}">${iconSvg('upload',14)} อัปโหลด</button>`;
    }
    if(entity==='budgets'){
      if(key==='incomeTotal'||key==='expenseTotal')return budgetMoney(row[key]);
      if(key==='net'){const net=budgetNet(row);return `<span class="budget-net ${net<0?'budget-negative':net>0?'budget-positive':''}">${net<0?'−':''}${budgetMoney(Math.abs(net))}</span>`;}
      if(key==='status'){const outcome=budgetOutcome(row);const color=outcome==='มีกำไร'?'green':outcome==='ขาดทุน'?'orange':'';return `<span class="tag ${color}">${outcome}</span>`;}
    }
    if(entity==='jointCourses'){
      if(key==='projectCode')return `<span class="cell-primary">${escapeHtml(row.projectCode||'—')}</span>`;
      if(key==='projectType')return `<span class="tag blue">${escapeHtml(row.projectType||'—')}</span>`;
      if(key==='participantCount')return money(row.participantCount);
      if(key==='interestLevel')return `<span class="score-badge score-${escapeHtml(row.interestLevel||'0')}">${escapeHtml(row.interestLevel||'—')} / 5</span>`;
    }
    if(entity==='potentialPartners'){
      if(key==='partnerCode')return `<span class="cell-primary">${escapeHtml(row.partnerCode||'—')}</span>`;
      if(key==='organizationType')return `<span class="tag blue">${escapeHtml(row.organizationType||'—')}</span>`;
      if(key==='collaborationTypes')return `<div class="partner-type-tags">${(Array.isArray(row.collaborationTypes)?row.collaborationTypes:[]).map(value=>`<span class="tag">${escapeHtml(value)}</span>`).join('')||'—'}</div>`;
      if(key==='opportunityLevel')return `<span class="tag ${row.opportunityLevel==='สูง'?'green':row.opportunityLevel==='ต่ำ'?'':'orange'}">${escapeHtml(row.opportunityLevel||'—')}</span>`;
      if(key==='status'){const color=row.status==='พร้อมเจรจา'?'green':row.status==='ไม่ร่วมมือ'?'red':row.status==='สนใจ'?'blue':'orange';return `<span class="tag ${color}">${escapeHtml(row.status||'—')}</span>`;}
    }
    if(entity==='schools'){
      if(key==='schoolCode')return `<span class="cell-primary">${escapeHtml(row.schoolCode||'—')}</span>`;
      if(key==='agreementType'){const agreement=schoolAgreement(row);const value=schoolAgreementType(row);return agreement?`<button class="school-agreement-link" type="button" data-view-agreement="${escapeHtml(agreement.id)}">${escapeHtml(value)}</button>`:`<span class="tag ${value==='ไม่มี'?'':'blue'}">${escapeHtml(value)}</span>`;}
      if(key==='status'){const value=schoolStatus(row);const color=value==='Active'?'green':value==='Potential'?'blue':value==='ใกล้หมดอายุ'||value==='ร่างเอกสาร'?'orange':value==='สิ้นสุดแล้ว'?'red':'';return `<span class="tag ${color}">${escapeHtml(value)}</span>`;}
      if(key==='collaborationActivities'){
        const activities=(row.relatedActivityIds||[]).map(id=>allActivities().find(activity=>activity.id===id)).filter(Boolean);
        const activityButtons=activities.map(activity=>`<button class="school-source-link" type="button" data-open-activity="${escapeHtml(activity.id)}">${escapeHtml(activity.name)}${activity.round?` · ${escapeHtml(activity.round)}`:''}</button>`).join('');
        return `<div class="school-activity-cell"><span>${escapeHtml(row.collaborationActivities||'—')}</span>${activityButtons?`<div class="school-source-links">${activityButtons}</div>`:''}</div>`;
      }
      if(key==='participantCount'||key==='interestedStudents')return money(row[key]);
      if(key==='incomeTotal')return budgetMoney(schoolIncome(row));
    }
    if(entity==='intlRelations'){
      if(key==='partnerCode')return `<span class="cell-primary">${escapeHtml(row.partnerCode||'—')}</span>`;
      if(key==='universityName')return `<span class="cell-primary">${escapeHtml(row.universityName||'—')}</span>`;
      if(key==='cooperationType')return `<span class="tag blue">${escapeHtml(row.cooperationType||'—')}</span>`;
      if(key==='agreementType'){const agreement=intlAgreement(row);const value=intlAgreementType(row);return agreement?`<button class="school-agreement-link" type="button" data-view-agreement="${escapeHtml(agreement.id)}">${escapeHtml(value)}</button>`:`<span class="tag ${value==='ไม่มี'?'':'blue'}">${escapeHtml(value)}</span>`;}
      if(key==='studentFlow')return `<span>${money(row.inboundStudents)} / ${money(row.outboundStudents)}</span>`;
      if(key==='activityCount')return `<button class="intl-count-link" type="button" data-view-intl-relation="${escapeHtml(row.id)}">${money(intlActivityCount(row))}</button>`;
      if(key==='incomeTotal')return budgetMoney(intlRelationIncome(row));
      if(key==='status'){const value=intlRelationStatus(row);const color=value==='Active'?'green':value==='สิ้นสุดแล้ว'?'red':value==='รอต่ออายุ'?'orange':value==='Potential'?'blue':'';return `<span class="tag ${color}">${escapeHtml(value)}</span>`;}
    }
    if(key==='amount'||key==='value')return `฿${money(row[key])}`;
    if(key==='participants')return money(registrationsFor(row.id).length);
    if(key==='attended')return money(registrationsFor(row.id).filter(reg=>reg.checkInAt).length);
    let value=row[key]??'—';
    if(key==='memberId'){const member=memberById(value);value=member?.name||value;}
    if(key==='activityId'){const activity=allActivities().find(item=>item.id===value);value=activity?`${activity.name} · ${activity.round||'ไม่ระบุรอบ'}`:value;}
    if(key==='activityType')return `<span class="tag blue">${escapeHtml(value)}</span>`;
    if(key==='activityCode'||key==='recordCode')return `<span class="cell-primary">${escapeHtml(value)}</span>`;
    if(key==='interestScore')return `<span class="score-badge score-${escapeHtml(value)}">${escapeHtml(value)} / 5</span>`;
    if(key==='applicationIntent')return `<span class="tag ${value==='มีแนวโน้ม'?'green':value==='ไม่มีแนวโน้ม'?'red':'orange'}">${escapeHtml(value)}</span>`;
    if(key==='startDate'||key==='endDate'||key==='signedDate'||key==='date'||key==='recordedDate'||key==='lastContact')value=value&&value!=='—'?new Date(`${value}T00:00:00`).toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'2-digit'}):'—';
    if(key==='status'||key==='contactStatus'||key==='currentStage')return `<span class="tag ${statusClass(String(value))}">${escapeHtml(value)}</span>`;
    return `<span class="${key==='name'||key==='organization'||key==='projectName'||key==='code'||key==='activityCode'||key==='recordCode'||key==='partner'?'cell-primary':''}">${escapeHtml(value)}</span>`;
  }
  function statusClass(value){if(/ใช้งาน|ยืนยัน|เปิดรับ|กำลังดำเนิน|เสร็จ|ผ่าน|สำเร็จ|อนุมัติ/i.test(value))return 'green';if(/หมดอายุ|ร่าง|สนใจ|ติดตาม|สมัคร|รอ/i.test(value))return 'orange';if(/ไม่ผ่าน|สละ|ปิด|สิ้นสุด|พ้น/i.test(value))return 'red';if(/นานาชาติ|ร่วม/i.test(value))return 'blue';return '';}

  function renderActivityDetail(activityId){
    const activity=allActivities().find(row=>row.id===activityId);if(!activity){currentRoute='activities';return renderEntityPage('activities');}
    currentActivityId=activityId;const regs=registrationsFor(activityId);const attended=regs.filter(row=>row.checkInAt).length;
    const registrationRows=regs.map(reg=>{const member=memberById(reg.memberId)||{};const a0Record=data('a0Participants').find(row=>row.activityId===activityId&&row.memberId===reg.memberId);return `<tr><td><span class="cell-primary">${escapeHtml(member.name||'สมาชิกที่ไม่พบ')}</span><div class="cell-secondary">${escapeHtml(member.email||'')}</div></td><td>${escapeHtml(member.category||member.group||'—')}</td><td>${escapeHtml(reg.registeredAt||'—')}</td><td>${reg.checkInAt?'<span class="tag green">เข้าร่วมจริง</span>':'<span class="tag orange">ยังไม่เช็คอิน</span>'}</td><td>${escapeHtml(reg.source==='staff'?'เจ้าหน้าที่เพิ่ม':'ลงทะเบียนเอง')}</td><td><div class="row-actions"><button class="button ${reg.checkInAt?'button-quiet':'button-primary'}" type="button" data-checkin="${escapeHtml(reg.id)}">${reg.checkInAt?'เช็คอินแล้ว':'เช็คอิน'}</button>${a0Record?`<button class="button button-quiet" type="button" data-view-a0="${escapeHtml(a0Record.id)}">ดู A0</button>`:`<button class="button button-quiet" type="button" data-create-a0-member="${escapeHtml(reg.memberId)}">บันทึก A0</button>`}</div></td></tr>`}).join('');
    return `${setHeading('ลงทะเบียนและเช็คอินกิจกรรม','จัดการผู้ลงทะเบียนและบันทึกการเข้าร่วมจริง แยกจากข้อมูลติดตาม A0')}
      <div class="activity-head"><span class="activity-mark">${iconSvg('calendar',20)}</span><div><span class="eyebrow">กิจกรรม · ${escapeHtml(activity.unit)}</span><h2>${escapeHtml(activity.name)}</h2><p>${escapeHtml(activity.startDate)}${activity.endDate&&activity.endDate!==activity.startDate?` – ${escapeHtml(activity.endDate)}`:''} · ${escapeHtml(activity.venue||'ยังไม่ระบุสถานที่')} · รับ ${money(activity.capacity||0)} คน</p></div><button class="button button-quiet" type="button" data-route="activities">${iconSvg('arrowLeft',14)} กลับไปรายการกิจกรรม</button></div>
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
    const studentName=[student.prefix,student.firstName,student.lastName].filter(Boolean).join(' ')||student.name||'นักเรียน';
    return `${setHeading('เส้นทางนักเรียน','ประวัติต่อเนื่องตั้งแต่สนใจ สมัคร เข้าเรียน และกิจกรรมจนสำเร็จการศึกษา')}
      <div class="activity-head"><span class="activity-mark">${iconSvg('route',20)}</span><div><span class="eyebrow">D · ${escapeHtml(student.program)}</span><h2>${escapeHtml(studentName)}</h2><p>รหัส ${escapeHtml(student.studentCode||student.studentId||'—')} · เข้าเรียนปี ${escapeHtml(student.admissionYear||'—')} · สถานะ ${escapeHtml(student.currentStage||'—')}</p></div><button class="button button-quiet" type="button" data-route="studentHistories">${iconSvg('arrowLeft',14)} กลับไปประวัตินักเรียน</button></div>
      <div class="student-profile-grid"><article class="student-profile-card"><h3>ข้อมูลนักเรียน</h3><p><strong>หลักสูตร:</strong> ${escapeHtml(student.program||'—')}</p><p><strong>ปีเข้าเรียน:</strong> ${escapeHtml(student.admissionYear||'—')}</p><p><strong>สถานะ:</strong> ${escapeHtml(student.currentStage||'—')}</p><p><strong>อาจารย์ / ผู้ประสานงาน:</strong> ${escapeHtml(student.advisor||'—')}</p></article><article class="student-profile-card"><h3>ทุนและรางวัล</h3><p><strong>ทุนการศึกษา:</strong> ${escapeHtml(student.scholarshipSummary||'ยังไม่มีข้อมูล')}</p><p><strong>รางวัล:</strong> ${escapeHtml(student.awardsSummary||(student.awardCount?`${student.awardCount} รางวัล`:'ยังไม่มีข้อมูล'))}</p><p>${escapeHtml(student.supportNotes||'')}</p></article><article class="student-profile-card"><h3>การสำเร็จการศึกษา</h3><p><strong>สถานะ:</strong> ${escapeHtml(student.graduationResult||'ยังไม่จบ')}</p><p><strong>ปีที่จบ:</strong> ${escapeHtml(student.graduationYear||'—')}</p><p>${escapeHtml(student.graduationNotes||'')}</p></article></div>
      <div class="notice-card"><strong>ต้นแบบประวัติการศึกษา:</strong> แสดงเฉพาะข้อมูลตัวอย่างที่บันทึกในเครื่อง ข้อมูลผลการเรียนและแหล่งทะเบียนจริงยังไม่เชื่อมต่อ</div>
      <section class="panel"><div class="panel-head"><div><h2>ประวัติตามลำดับเวลา</h2><p>เหตุการณ์จากการแนะแนว การสมัคร กิจกรรม และสถานะการศึกษา</p></div><button class="button button-primary" type="button" data-add-journey="${escapeHtml(historyId)}">${iconSvg('plus',14)} เพิ่มเหตุการณ์</button></div><div class="panel-body">${journeyFormOpen?`<form class="inline-form" id="journeyEventForm" data-history="${escapeHtml(historyId)}"><div class="form-field"><label>วันที่ *</label><input class="form-control" name="date" type="date" required></div><div class="form-field"><label>ขั้นตอน *</label><select class="form-control" name="stage"><option>เริ่มสนใจ / แนะแนว</option><option>สมัครหลักสูตร</option><option>ผ่านการคัดเลือก</option><option>ยืนยันสิทธิ์ / เข้าเรียน</option><option>เข้าร่วมกิจกรรม</option><option>ฝึกงาน / สหกิจ</option><option>สำเร็จการศึกษา</option><option>ติดตามศิษย์เก่า</option><option>อื่น ๆ</option></select></div><div class="form-field form-span-2"><label>รายละเอียด *</label><input class="form-control" name="description" required placeholder="บันทึกเหตุการณ์"></div><div class="form-field"><label>ที่มาของข้อมูล</label><input class="form-control" name="source" placeholder="เช่น A0, A1, ระบบทะเบียน"></div><div class="form-field"><label>&nbsp;</label><button class="button button-primary" type="submit">บันทึกเหตุการณ์</button></div></form>`:''}<div class="timeline">${events.map(event=>`<div class="timeline-item"><span class="timeline-dot">•</span><span class="timeline-date">${escapeHtml(event.date||'ไม่ระบุ')}</span><span class="timeline-copy"><strong>${escapeHtml(event.stage)}</strong><small>${escapeHtml(event.description)} · ที่มา: ${escapeHtml(event.source||'ไม่ระบุ')}</small></span></div>`).join('')||'<div class="empty-state">ยังไม่มีเหตุการณ์ในเส้นทางนี้</div>'}</div></div></section>`;
  }

  function renderSearchResults(){
    const q=currentGlobalQuery.trim().toLocaleLowerCase('th');let found=[];
    Object.entries(schemas).forEach(([key,schema])=>data(key).forEach(row=>{const text=JSON.stringify(row).toLocaleLowerCase('th');if(q&&text.includes(q)){found.push({key,title:schema.title,row,label:row.name||row.organization||row.institution||row.id});}}));
    return `${setHeading('ผลการค้นหา',`คำค้น “${currentGlobalQuery}” · ค้นในข้อมูลทุกกลุ่ม`)}<div class="filter-row"><span class="tag orange">${found.length} รายการ</span><span class="small-label">แสดงเฉพาะข้อมูลตัวอย่างที่มีในเบราว์เซอร์</span></div><section class="panel data-panel"><div class="table-scroll"><table><thead><tr><th>รายการ</th><th>กลุ่มข้อมูล</th><th>รหัส</th><th>ดูข้อมูล</th></tr></thead><tbody>${found.map(item=>`<tr><td><span class="cell-primary">${escapeHtml(item.label)}</span></td><td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.row.id)}</td><td><button class="button button-quiet" data-route="${item.key}">เปิดรายการ</button></td></tr>`).join('')}</tbody></table>${found.length?'':'<div class="empty-state">ไม่พบข้อมูลที่ตรงกับคำค้น</div>'}</div></section>`;
  }

  function renderAgreementFields(existing,defaults={}){
    const fields=schemas.agreements.fields;
    const byKey=key=>fields.find(field=>field.key===key);
    const renderControl=(key,span)=>{
      const field=byKey(key);const value=existing?.[key]??defaults[key]??'';const required=field.required?'required':'';
      let control='';
      if(field.type==='select')control=`<select class="form-control" name="${key}" ${required}><option value="">เลือก${escapeHtml(field.label)}</option>${field.options.map(option=>`<option value="${escapeHtml(option)}" ${String(value)===String(option)?'selected':''}>${escapeHtml(option)}</option>`).join('')}</select>`;
      else if(field.type==='textarea')control=`<textarea class="form-control textarea" name="${key}" ${required} placeholder="${escapeHtml(field.label)}">${escapeHtml(value)}</textarea>`;
      else control=`<input class="form-control" name="${key}" type="${field.type}" value="${escapeHtml(value)}" ${required} placeholder="${escapeHtml(field.label)}">`;
      return `<div class="form-field agreement-span-${span}"><label>${escapeHtml(field.label)}${field.required?' *':''}</label>${control}</div>`;
    };
    const fileField=byKey('attachment');
    const attachmentRequired=!existing?.attachmentName;
    return `<div class="agreement-form-title agreement-span-6">ข้อมูล MOU/MOA และเอกสาร</div>
      ${renderControl('agreementType',2)}${renderControl('docNo',4)}${renderControl('partner',6)}
      ${renderControl('signedDate',2)}${renderControl('startDate',2)}${renderControl('endDate',2)}
      ${renderControl('documentStatus',2)}${renderControl('signerOur',2)}${renderControl('signerPartner',2)}
      <div class="form-field agreement-span-3"><label>${escapeHtml(fileField.label)}${attachmentRequired?' *':''}</label><label class="agreement-upload-dropzone" for="agreementAttachment"><input id="agreementAttachment" name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" ${attachmentRequired?'required':''}><span class="agreement-upload-icon">${iconSvg('upload',20)}</span><strong>คลิกหรือลากไฟล์มาวางที่นี่</strong><small>รองรับ PDF, Word, JPG, PNG (ไม่เกิน 20 MB)</small><span id="agreementAttachmentName" class="agreement-file-name">${escapeHtml(existing?.attachmentName||'ยังไม่ได้เลือกไฟล์')}</span></label></div>
      ${renderControl('documentNotes',3)}${renderControl('purpose',6)}${renderControl('cooperationFormat',3)}${renderControl('scope',3)}`;
  }

  function setupAgreementUpload(){
    const input=$('#agreementAttachment');const zone=$('.agreement-upload-dropzone');const name=$('#agreementAttachmentName');if(!input||!zone||!name)return;
    const updateName=()=>{const file=input.files?.[0];name.textContent=file?file.name:(input.dataset.existingName||'ยังไม่ได้เลือกไฟล์');zone.classList.toggle('has-file',Boolean(file||input.dataset.existingName));};
    input.dataset.existingName=name.textContent==='ยังไม่ได้เลือกไฟล์'?'':name.textContent;
    input.addEventListener('change',updateName);
    zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('dragging');});
    zone.addEventListener('dragleave',()=>zone.classList.remove('dragging'));
    zone.addEventListener('drop',event=>{event.preventDefault();zone.classList.remove('dragging');if(event.dataTransfer?.files?.length){input.files=event.dataTransfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));}});
  }
  function setupInternationalUpload(){
    const input=$('#intlRelationAttachment');const zone=$('.intl-upload-dropzone');const name=$('#intlRelationAttachmentName');if(!input||!zone||!name)return;
    const updateName=()=>{const file=input.files?.[0];name.textContent=file?file.name:(input.dataset.existingName||'ยังไม่ได้เลือกไฟล์');zone.classList.toggle('has-file',Boolean(file||input.dataset.existingName));};
    input.dataset.existingName=name.textContent==='ยังไม่ได้เลือกไฟล์'?'':name.textContent;
    input.addEventListener('change',updateName);
    zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('dragging');});
    zone.addEventListener('dragleave',()=>zone.classList.remove('dragging'));
    zone.addEventListener('drop',event=>{event.preventDefault();zone.classList.remove('dragging');if(event.dataTransfer?.files?.length){input.files=event.dataTransfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));}});
  }

  function openAttachmentDatabase(){
    if(!('indexedDB'in window))return Promise.reject(new Error('IndexedDB is unavailable'));
    return new Promise((resolve,reject)=>{
      const request=indexedDB.open('one-journey-attachments',2);
      request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('agreements'))request.result.createObjectStore('agreements',{keyPath:'id'});if(!request.result.objectStoreNames.contains('intlRelations'))request.result.createObjectStore('intlRelations',{keyPath:'id'});};
      request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error||new Error('Could not open attachment storage'));
    });
  }
  async function saveAgreementAttachment(recordId,file){
    const db=await openAttachmentDatabase();
    await new Promise((resolve,reject)=>{const tx=db.transaction('agreements','readwrite');tx.objectStore('agreements').put({id:recordId,name:file.name,type:file.type,blob:file,updatedAt:new Date().toISOString()});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('Could not save attachment'));tx.onabort=()=>reject(tx.error||new Error('Attachment save was aborted'));});
    db.close();
  }
  async function readAgreementAttachment(recordId){
    const db=await openAttachmentDatabase();
    const result=await new Promise((resolve,reject)=>{const request=db.transaction('agreements','readonly').objectStore('agreements').get(recordId);request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error||new Error('Could not read attachment'));});
    db.close();return result;
  }
  async function saveIntlRelationAttachment(recordId,file){
    const db=await openAttachmentDatabase();
    await new Promise((resolve,reject)=>{const tx=db.transaction('intlRelations','readwrite');tx.objectStore('intlRelations').put({id:recordId,name:file.name,type:file.type,blob:file,updatedAt:new Date().toISOString()});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('Could not save attachment'));tx.onabort=()=>reject(tx.error||new Error('Attachment save was aborted'));});
    db.close();
  }
  async function readIntlRelationAttachment(recordId){
    const db=await openAttachmentDatabase();
    const result=await new Promise((resolve,reject)=>{const request=db.transaction('intlRelations','readonly').objectStore('intlRelations').get(recordId);request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error||new Error('Could not read attachment'));});
    db.close();return result;
  }
  async function removeIntlRelationAttachment(recordId){
    try{const db=await openAttachmentDatabase();await new Promise((resolve,reject)=>{const tx=db.transaction('intlRelations','readwrite');tx.objectStore('intlRelations').delete(recordId);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();}catch(error){console.warn('Could not remove university attachment',error);}
  }
  async function openIntlRelationAttachment(recordId){
    const popup=window.open('about:blank','_blank');
    try{const stored=await readIntlRelationAttachment(recordId);if(!stored?.blob){popup?.close();toast('ไม่พบไฟล์แนบในเบราว์เซอร์นี้');return;}const url=URL.createObjectURL(stored.blob);if(popup){popup.location.href=url;setTimeout(()=>URL.revokeObjectURL(url),60000);}else{const anchor=document.createElement('a');anchor.href=url;anchor.download=stored.name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}}
    catch(error){popup?.close();console.warn('Could not open university attachment',error);toast('เปิดไฟล์ไม่ได้ กรุณาเปิดเว็บไซต์ผ่าน start.bat แล้วลองอีกครั้ง');}
  }
  async function removeAgreementAttachment(recordId){
    try{const db=await openAttachmentDatabase();await new Promise((resolve,reject)=>{const tx=db.transaction('agreements','readwrite');tx.objectStore('agreements').delete(recordId);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();}catch(error){console.warn('Could not remove MOU/MOA attachment',error);}
  }
  async function openAgreementFile(recordId){
    const popup=window.open('about:blank','_blank');
    try{
      const stored=await readAgreementAttachment(recordId);
      if(!stored?.blob){popup?.close();toast('ไม่พบไฟล์แนบในเบราว์เซอร์นี้');return;}
      const url=URL.createObjectURL(stored.blob);
      if(popup){popup.location.href=url;setTimeout(()=>URL.revokeObjectURL(url),60000);}
      else{const anchor=document.createElement('a');anchor.href=url;anchor.download=stored.name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
    }catch(error){popup?.close();console.warn('Could not open MOU/MOA attachment',error);toast('เปิดไฟล์ไม่ได้ กรุณาเปิดเว็บไซต์ผ่าน start.bat แล้วลองอีกครั้ง');}
  }

  function setupStudentWizard(initialStep=1){
    const form=$('#recordForm');
    const setStep=(step,validateCurrent=false)=>{
      if(validateCurrent&&step>currentStudentFormStep){
        const activePanel=$(`[data-student-step-panel="${currentStudentFormStep}"]`,$('#modalFields'));
        const invalid=[...activePanel.querySelectorAll('[required]')].find(field=>!field.checkValidity());
        if(invalid){invalid.reportValidity();return;}
      }
      currentStudentFormStep=step;
      $$('[data-student-step-panel]',$('#modalFields')).forEach(panel=>panel.dataset.active=String(Number(panel.dataset.studentStepPanel)===step));
      $$('[data-student-step]',$('#modalFields')).forEach(button=>{const selected=Number(button.dataset.studentStep)===step;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected));});
      const back=$('[data-student-step-back]',form);const next=$('[data-student-step-next]',form);const submit=$('button[type="submit"]',form);
      if(back)back.hidden=step===1;if(next)next.hidden=step===4;if(submit)submit.hidden=step!==4;
    };
    $$('[data-student-step]',$('#modalFields')).forEach(button=>button.addEventListener('click',()=>{const target=Number(button.dataset.studentStep);if(target<=currentStudentFormStep)setStep(target);else if(target===currentStudentFormStep+1)setStep(target,true);}));
    $('[data-student-step-back]',form)?.addEventListener('click',()=>setStep(Math.max(1,currentStudentFormStep-1)));
    $('[data-student-step-next]',form)?.addEventListener('click',()=>setStep(Math.min(4,currentStudentFormStep+1),true));
    setStep(initialStep);
  }

  function openBudgetView(recordId){
    const record=data('budgets').find(row=>row.id===recordId);
    if(!record)return;
    const net=budgetNet(record);
    $('#modalEyebrow').textContent=`${record.code} · ${record.type}`;
    $('#modalTitle').textContent=record.projectName;
    $('#recordForm').dataset.entity='budgets';
    $('#recordForm').dataset.recordId=recordId;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');
    $('#modalFields').classList.remove('agreement-modal-body','partner-modal-body');
    $('#modalFields').innerHTML=[
      ['รหัสงบ',record.code],['ชื่อโครงการ',record.projectName],['รายได้รวม (บาท)',budgetMoney(record.incomeTotal)],['ค่าใช้จ่ายรวม (บาท)',budgetMoney(record.expenseTotal)],['กำไร/ขาดทุน (บาท)',`${net<0?'−':''}${budgetMoney(Math.abs(net))}`],['ประเภทงาน',record.type],['สถานะ',budgetOutcome(record)],['ผู้รับผิดชอบ',record.owner]
    ].map(([label,value])=>`<div class="form-field"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value)}</div></div>`).join('');
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').showModal();
  }

  function openAlumniView(recordId){
    const record=data('alumni').find(row=>row.id===recordId);if(!record)return;
    const fullName=[record.prefix,record.firstName,record.lastName].filter(Boolean).join(' ');
    const details=[['รหัส Alumni',record.alumniCode],['ชื่อ-นามสกุล',fullName],['รุ่น / ปีที่จบ',record.cohortYear],['สาขาที่จบ',record.major],['เบอร์โทรศัพท์',record.phone],['อีเมล',record.email],['ตำแหน่งงาน',record.position],['บริษัท / หน่วยงาน',record.employer],['ภาวะการมีงานทำ',record.employmentStatus],['Salary (บาท/เดือน)',record.salaryMonthly!==''&&record.salaryMonthly!==undefined?money(record.salaryMonthly):'—'],['VOC',record.vocSubmitted],['Feedback / VOC',record.vocFeedback],['หมายเหตุ',record.notes]];
    $('#modalEyebrow').textContent=`C · Alumni · ${record.alumniCode||''}`;
    $('#modalTitle').textContent=fullName||'รายละเอียดศิษย์เก่า';
    $('#recordForm').dataset.entity='alumni';$('#recordForm').dataset.recordId=recordId;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');$('#modalFields').classList.remove('agreement-modal-body','partner-modal-body');
    $('#modalFields').innerHTML=details.map(([label,value])=>`<div class="form-field ${['Feedback / VOC','หมายเหตุ'].includes(label)?'form-span-2':''}"><label>${escapeHtml(label)}</label><div class="form-control alumni-readonly">${escapeHtml(value||'—')}</div></div>`).join('');
    $('#recordForm').querySelector('[type="submit"]').hidden=true;$('#recordModal').showModal();
  }

  function openA0View(recordId){
    const record=data('a0Participants').find(row=>row.id===recordId);if(!record)return;
    const member=memberById(record.memberId)||{};
    const activity=allActivities().find(row=>row.id===record.activityId)||{};
    $('#modalEyebrow').textContent=`${record.recordCode||record.id} · A0 ผู้เข้าร่วม`;
    $('#modalTitle').textContent=member.name||'รายละเอียดผู้เข้าร่วม';
    $('#recordForm').dataset.entity='a0Participants';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');$('#modalFields').classList.remove('agreement-modal-body','partner-modal-body');
    const viewFields=[['วันที่บันทึก',record.recordedDate],['สมาชิก',member.name],['อีเมล',member.email],['กิจกรรม',activity.name],['รอบกิจกรรม',activity.round],['ระดับชั้น',record.grade],['หลักสูตรที่สนใจ',record.interestedProgram],['เหตุผลที่สนใจ',record.interestReason],['คะแนนความสนใจ',record.interestScore?`${record.interestScore} / 5`:'' ],['แนวโน้มสมัคร',record.applicationIntent],['Feedback',record.feedback],['ผู้รับผิดชอบ',record.owner],['สถานะติดตาม',record.status]];
    $('#modalFields').innerHTML=viewFields.map(([label,value])=>`<div class="form-field ${['เหตุผลที่สนใจ','Feedback'].includes(label)?'form-span-2':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value||'—')}</div></div>`).join('');
    $('#recordModal').showModal();
  }

  function openA2View(recordId){
    const record=data('jointCourses').find(row=>row.id===recordId);if(!record)return;
    $('#modalEyebrow').textContent=`${record.projectCode||record.id} · A2`;
    $('#modalTitle').textContent=record.name||'รายละเอียดโครงการ A2';
    $('#recordForm').dataset.entity='jointCourses';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');$('#modalFields').classList.remove('agreement-modal-body','partner-modal-body');
    const viewFields=[['ประเภทโครงการ',record.projectType],['Partner',record.partner],['วันที่เริ่ม',record.startDate],['วันที่สิ้นสุด',record.endDate],['จำนวนผู้เข้าร่วม',record.participantCount],['กลุ่มเป้าหมาย',record.targetGroup],['ช่องทางที่รู้จักโครงการ',record.sourceChannel],['ความต้องการของลูกค้า',record.customerNeed],['วัตถุประสงค์การเข้าร่วม',record.participationPurpose],['ระดับความสนใจ',record.interestLevel?`${record.interestLevel} / 5`:'' ],['ความคาดหวัง',record.expectation],['หมายเหตุ',record.notes],['Feedback และสรุป',record.feedback],['สถานะ',record.status],['ผู้รับผิดชอบ',record.owner]];
    $('#modalFields').innerHTML=viewFields.map(([label,value])=>`<div class="form-field ${['ความต้องการของลูกค้า','วัตถุประสงค์การเข้าร่วม','ความคาดหวัง','หมายเหตุ','Feedback และสรุป'].includes(label)?'form-span-2':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value||'—')}</div></div>`).join('')+'<div class="form-field form-span-2 a2-finance-action"><label>งบประมาณโครงการ</label><button class="button button-quiet" type="button" data-a2-view-budget>งบการเงิน</button><small>เปิดหรือแก้ไขงบการเงินที่เชื่อมกับโครงการนี้</small></div>';
    $('[data-a2-view-budget]')?.addEventListener('click',()=>openBudgetForA2(record));
    $('#recordModal').showModal();
  }

  function openBudgetForA2(record){
    const linked=data('budgets').find(row=>row.relatedGroup==='A2'&&row.relatedRecordId===record.id);
    const budgetType=record.projectType==='Short Course'?'Short Course':'อื่น ๆ';
    openForm('budgets',linked?.id||'',{projectName:record.name,type:budgetType,owner:record.owner||'',relatedGroup:'A2',relatedRecordId:record.id});
  }

  function openBudgetForPartner(record){
    const linked=data('budgets').find(row=>row.relatedGroup==='B0'&&row.relatedRecordId===record.id);
    openForm('budgets',linked?.id||'',{projectName:record.name,type:'อื่น ๆ',owner:record.owner||'',relatedGroup:'B0',relatedRecordId:record.id});
  }

  function openAgreementForPartner(record){
    const linked=data('agreements').find(row=>row.relatedGroup==='B0'&&row.relatedRecordId===record.id)||data('agreements').find(row=>row.partner===record.name&&(!row.relatedGroup||row.relatedGroup==='B0'));
    openForm('agreements',linked?.id||'',{partner:record.name,relatedGroup:'B0',relatedRecordId:record.id});
  }

  function openBudgetForSchool(record){
    const linked=data('budgets').find(row=>row.relatedGroup==='B1'&&row.relatedRecordId===record.id);
    openForm('budgets',linked?.id||'',{projectName:record.name,type:'กิจกรรมประชาสัมพันธ์',owner:record.owner||'',relatedGroup:'B1',relatedRecordId:record.id});
  }

  function openAgreementForSchool(record){
    const linked=schoolAgreement(record);
    openForm('agreements',linked?.id||'',{agreementType:record.agreementType==='MOU'||record.agreementType==='MOA'?record.agreementType:'',partner:record.name,relatedGroup:'B1',relatedRecordId:record.id});
  }

  function openBudgetForIntlRelation(record){
    const linked=data('budgets').find(row=>row.relatedGroup==='B2'&&row.relatedRecordId===record.id);
    openForm('budgets',linked?.id||'',{projectName:record.universityName,type:'อื่น ๆ',owner:record.owner||'',relatedGroup:'B2',relatedRecordId:record.id});
  }

  function openAgreementForIntlRelation(record){
    const linked=intlAgreement(record);
    openForm('agreements',linked?.id||'',{agreementType:record.agreementType==='MOU'||record.agreementType==='MOA'?record.agreementType:'',partner:record.universityName,relatedGroup:'B2',relatedRecordId:record.id});
  }

  function openIntlRelationView(recordId){
    const record=data('intlRelations').find(row=>row.id===recordId);if(!record)return;
    $('#modalEyebrow').textContent=`${record.partnerCode||record.id} · B2 International Relations`;
    $('#modalTitle').textContent=record.universityName||'รายละเอียดมหาวิทยาลัยคู่ความร่วมมือ';
    $('#recordForm').dataset.entity='intlRelations';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal');$('#recordModal').classList.add('partner-modal');
    $('#modalFields').classList.remove('agreement-modal-body');$('#modalFields').classList.add('partner-modal-body');
    const dateRange=record.activityStartDate||record.activityEndDate?`${record.activityStartDate||'ไม่ระบุ'} – ${record.activityEndDate||record.activityStartDate||'ไม่ระบุ'}`:'—';
    const fields=[['ประเทศ',record.country],['ประเภทความร่วมมือ',record.cooperationType],['หน่วยงาน',record.department],['ผู้ประสานงาน',record.coordinator],['อีเมล',record.email],['เบอร์โทร',record.phone],['MOU / MOA',intlAgreementType(record)],['สถานะความร่วมมือ',intlRelationStatus(record)],['Inbound Students',record.inboundStudents],['Outbound Students',record.outboundStudents],['ช่วงวันที่กิจกรรม',dateRange],['จำนวนกิจกรรม',intlActivityCount(record)],['รายได้ / ทุน (บาท)',budgetMoney(intlRelationIncome(record))],['รายละเอียดกิจกรรม',record.activityDetails],['สรุปและหมายเหตุ',record.summary],['ผู้รับผิดชอบ',record.owner]];
    const relatedActivities=(record.relatedActivityIds||[]).map(activityId=>allActivities().find(activity=>activity.id===activityId)).filter(Boolean);
    const relatedMarkup=`<div class="form-field form-span-3 school-related-block"><label>กิจกรรมที่เชื่อมกับระบบ</label><div class="school-related-links">${relatedActivities.map(activity=>`<button class="school-source-link" type="button" data-intl-open-activity="${escapeHtml(activity.id)}">${iconSvg('calendar',14)} ${escapeHtml(activity.name)}${activity.round?` · ${escapeHtml(activity.round)}`:''}</button>`).join('')||'<span class="small-label">ยังไม่ได้เชื่อมกิจกรรมในระบบ</span>'}</div></div>`;
    const attachmentMarkup=record.attachmentName?`<div class="form-field form-span-3"><label>เอกสารประกอบ</label><button class="file-cell-button" type="button" data-open-intl-attachment="${escapeHtml(record.id)}">${iconSvg('file',14)} ${escapeHtml(record.attachmentName)}</button></div>`:'';
    const actionMarkup=`<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-intl-open-agreement>${iconSvg('handshake',15)} MOU / MOA</button><button class="button button-quiet" type="button" data-intl-open-budget>${iconSvg('wallet',15)} งบการเงิน</button></div><small>เปิดหรือสร้างรายการที่เชื่อมกับมหาวิทยาลัยนี้</small></div>`;
    $('#modalFields').innerHTML=fields.map(([label,value])=>`<div class="form-field ${['ช่วงวันที่กิจกรรม','รายละเอียดกิจกรรม','สรุปและหมายเหตุ'].includes(label)?'form-span-3':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value??'—')||'—'}</div></div>`).join('')+relatedMarkup+attachmentMarkup+actionMarkup;
    $$('[data-intl-open-activity]').forEach(button=>button.addEventListener('click',()=>{const activityId=button.dataset.intlOpenActivity;$('#recordModal').close();go(`activity:${activityId}`);}));
    $('[data-open-intl-attachment]')?.addEventListener('click',()=>openIntlRelationAttachment(record.id));
    $('[data-intl-open-agreement]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openAgreementForIntlRelation(record);});
    $('[data-intl-open-budget]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openBudgetForIntlRelation(record);});
    $('#recordModal').showModal();
  }

  function openSchoolView(recordId){
    const record=data('schools').find(row=>row.id===recordId);if(!record)return;
    $('#modalEyebrow').textContent=`${record.schoolCode||record.id} · B1 School Partner`;
    $('#modalTitle').textContent=record.name||'รายละเอียดโรงเรียนคู่ความร่วมมือ';
    $('#recordForm').dataset.entity='schools';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');$('#recordModal').classList.add('partner-modal');
    $('#modalFields').classList.remove('agreement-modal-body');$('#modalFields').classList.add('partner-modal-body');
    const fields=[['ประเภทโรงเรียน',record.schoolType],['จังหวัด',record.province],['ผู้ประสานงาน',record.coordinator],['ตำแหน่ง',record.position],['อีเมล',record.email],['ประเทศ',record.country],['เบอร์โทร',record.phone],['MOU / MOA',schoolAgreementType(record)],['สถานะความร่วมมือ',schoolStatus(record)],['ผู้เข้าร่วมกิจกรรม',record.participantCount],['ผู้เรียนที่สนใจสมัคร',record.interestedStudents],['รายได้รวม (บาท)',budgetMoney(schoolIncome(record))],['กิจกรรมที่ร่วมกัน',record.collaborationActivities],['Feedback จากโรงเรียน',record.feedback],['สรุปความร่วมมือ / หมายเหตุ',record.summary],['ผู้รับผิดชอบ',record.owner]];
    const relatedActivities=(record.relatedActivityIds||[]).map(id=>allActivities().find(activity=>activity.id===id)).filter(Boolean);
    const relatedProducts=(record.relatedProductIds||[]).map(id=>data('products').find(product=>product.id===id)).filter(Boolean);
    const relatedMarkup=`<div class="form-field form-span-3 school-related-block"><label>กิจกรรมและหลักสูตรต้นทาง</label><div class="school-related-links">${relatedActivities.map(activity=>`<button class="school-source-link" type="button" data-school-open-activity="${escapeHtml(activity.id)}">${iconSvg('calendar',14)} ${escapeHtml(activity.name)}${activity.round?` · ${escapeHtml(activity.round)}`:''}</button>`).join('')}${relatedProducts.map(product=>`<button class="school-source-link" type="button" data-school-open-product="${escapeHtml(product.id)}">${iconSvg('book',14)} ${escapeHtml(product.name)}</button>`).join('')}${relatedActivities.length||relatedProducts.length?'':'<span class="small-label">ยังไม่ได้เชื่อมกิจกรรมหรือหลักสูตร</span>'}</div></div>`;
    const actionMarkup=`<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-school-open-agreement>${iconSvg('handshake',15)} MOU / MOA</button><button class="button button-quiet" type="button" data-school-open-budget>${iconSvg('wallet',15)} งบการเงิน</button></div><small>เปิดหรือสร้างรายการที่เชื่อมกับโรงเรียนนี้</small></div>`;
    $('#modalFields').innerHTML=fields.map(([label,value])=>`<div class="form-field ${['กิจกรรมที่ร่วมกัน','Feedback จากโรงเรียน','สรุปความร่วมมือ / หมายเหตุ'].includes(label)?'form-span-3':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value??'—')||'—'}</div></div>`).join('')+relatedMarkup+actionMarkup;
    $$('[data-school-open-activity]').forEach(button=>button.addEventListener('click',()=>{const activityId=button.dataset.schoolOpenActivity;$('#recordModal').close();go(`activity:${activityId}`);}));
    $$('[data-school-open-product]').forEach(button=>button.addEventListener('click',()=>{const productId=button.dataset.schoolOpenProduct;$('#recordModal').close();openProductView(productId);}));
    $('[data-school-open-agreement]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openAgreementForSchool(record);});
    $('[data-school-open-budget]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openBudgetForSchool(record);});
    $('#recordModal').showModal();
  }

  function openProductView(productId){
    const product=data('products').find(row=>row.id===productId);if(!product)return;
    $('#modalEyebrow').textContent=`${product.type||'หลักสูตร'} · ${product.level||''}`;
    $('#modalTitle').textContent=product.name||'รายละเอียดหลักสูตร';
    $('#recordForm').dataset.entity='products';$('#recordForm').dataset.recordId=productId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal','partner-modal');$('#modalFields').classList.remove('agreement-modal-body','partner-modal-body');
    const fields=[['ประเภทหลักสูตร',product.type],['ระดับ',product.level],['สาขา / กลุ่ม',product.branch],['หน่วยงาน',product.unit],['สถานะ',product.status],['รายละเอียด',product.description],['ทักษะที่คาดว่าจะได้รับ',product.expectedSkills]];
    $('#modalFields').innerHTML=fields.map(([label,value])=>`<div class="form-field ${['รายละเอียด','ทักษะที่คาดว่าจะได้รับ'].includes(label)?'form-span-2':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value||'—')}</div></div>`).join('');
    $('#recordModal').showModal();
  }

  function openPartnerView(recordId){
    const record=data('potentialPartners').find(row=>row.id===recordId);if(!record)return;
    $('#modalEyebrow').textContent=`${record.partnerCode||record.id} · B0 Potential Partner`;
    $('#modalTitle').textContent=record.name||'รายละเอียด Partner';
    $('#recordForm').dataset.entity='potentialPartners';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('agreement-modal');$('#recordModal').classList.add('partner-modal');
    $('#modalFields').classList.remove('agreement-modal-body');$('#modalFields').classList.add('partner-modal-body');
    const fields=[['ประเภทองค์กร',record.organizationType],['กลุ่มลูกค้า / อุตสาหกรรม',record.customerGroup],['เว็บไซต์',record.website],['ประเทศ',record.country],['จังหวัด',record.province],['ผู้ประสานงาน',record.contact],['ตำแหน่ง',record.position],['อีเมล',record.email],['เบอร์โทรศัพท์',record.phone],['โอกาสความร่วมมือ',(record.collaborationTypes||[]).join(', ')],['แหล่งที่มา',record.sourceChannel],['ระดับโอกาส',record.opportunityLevel],['สถานะ',record.status],['Next action',record.nextAction],['ผู้รับผิดชอบ',record.owner],['หมายเหตุ / สรุป',record.notes]];
    $('#modalFields').innerHTML=fields.map(([label,value])=>`<div class="form-field ${label==='หมายเหตุ / สรุป'?'form-span-3':''}"><label>${escapeHtml(label)}</label><div class="form-control budget-readonly">${escapeHtml(value||'—')}</div></div>`).join('')+`<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-partner-open-agreement>${iconSvg('handshake',15)} MOU / MOA</button><button class="button button-quiet" type="button" data-partner-open-budget>${iconSvg('wallet',15)} งบการเงิน</button></div><small>เปิดหรือสร้างรายการที่เชื่อมกับ Partner นี้</small></div>`;
    $('[data-partner-open-agreement]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openAgreementForPartner(record);});
    $('[data-partner-open-budget]')?.addEventListener('click',()=>{if($('#recordModal').open)$('#recordModal').close();openBudgetForPartner(record);});
    $('#recordModal').showModal();
  }

  function openAgreementView(recordId){
    const record=data('agreements').find(row=>row.id===recordId);if(!record)return;
    $('#modalEyebrow').textContent=`${record.docNo} · ${record.agreementType}`;
    $('#modalTitle').textContent=record.partner||'รายละเอียด MOU / MOA';
    $('#recordForm').dataset.entity='agreements';$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').querySelector('[type="submit"]').hidden=true;
    $('#recordModal').classList.remove('partner-modal');$('#recordModal').classList.add('agreement-modal');$('#modalFields').classList.remove('partner-modal-body');$('#modalFields').classList.add('agreement-modal-body');
    const viewFields=[['ประเภทเอกสาร',record.agreementType],['เลขที่เอกสาร',record.docNo],['Partner',record.partner],['สถานะเอกสาร',record.documentStatus],['วันที่ลงนาม',record.signedDate],['วันที่เริ่ม',record.startDate],['วันที่หมดอายุ',record.endDate],['สถานะความร่วมมือ',agreementCooperationStatus(record)],['ผู้ลงนามฝ่ายเรา',record.signerOur],['ผู้ลงนามฝ่าย Partner',record.signerPartner],['ไฟล์เอกสาร',record.attachmentName],['หมายเหตุเอกสาร',record.documentNotes],['วัตถุประสงค์',record.purpose],['รูปแบบความร่วมมือ',record.cooperationFormat],['ขอบเขตความร่วมมือ',record.scope]];
    $('#modalFields').innerHTML=viewFields.map(([label,value])=>`<div class="form-field ${['หมายเหตุเอกสาร','วัตถุประสงค์','ขอบเขตความร่วมมือ'].includes(label)?'agreement-span-6':'agreement-span-3'}"><label>${escapeHtml(label)}</label><div class="form-control agreement-readonly">${escapeHtml(value||'—')}</div></div>`).join('');
    $('#recordModal').showModal();
  }

  function openForm(entity,recordId='',defaults={}){
    const schema=schemas[entity];if(!schema)return;const existing=recordId?data(entity).find(row=>row.id===recordId):null;
    if(entity==='a0Participants')defaults={recordedDate:today,...defaults};
    if(entity==='alumni')defaults={cohortYear:'2569',...defaults};
    if(entity==='studentHistories')defaults={admissionYear:'2569',...defaults};
    $('#modalEyebrow').textContent=schema.title;$('#modalTitle').textContent=`${existing?'แก้ไข':'เพิ่ม'}${schema.singular}`;$('#recordForm').dataset.entity=entity;$('#recordForm').dataset.recordId=recordId;
    $('#recordForm').dataset.relatedGroup=defaults.relatedGroup||existing?.relatedGroup||'';$('#recordForm').dataset.relatedRecordId=defaults.relatedRecordId||existing?.relatedRecordId||'';delete $('#recordForm').dataset.openBudgetAfterSave;delete $('#recordForm').dataset.openPartnerAction;delete $('#recordForm').dataset.openSchoolAction;
    const formSubmit=$('#recordForm').querySelector('[type="submit"]');formSubmit.hidden=false;
    $$('.student-step-control').forEach(control=>control.remove());
    if(entity==='studentHistories'){
      currentStudentFormStep=1;
      const footer=$('#recordForm .modal-foot');
      footer.insertAdjacentHTML('beforeend','<button class="button button-quiet student-step-control" type="button" data-student-step-back hidden>ย้อนกลับ</button><button class="button button-primary student-step-control" type="button" data-student-step-next>ถัดไป</button>');
      formSubmit.hidden=true;
    }
    $('#recordModal').classList.toggle('agreement-modal',entity==='agreements');
    const widePartnerForm=['potentialPartners','schools','intlRelations'].includes(entity);
    $('#recordModal').classList.toggle('partner-modal',widePartnerForm);
    $('#modalFields').classList.toggle('agreement-modal-body',entity==='agreements');
    $('#modalFields').classList.toggle('partner-modal-body',widePartnerForm);
    if(entity==='agreements'){
      $('#modalFields').innerHTML=renderAgreementFields(existing,defaults);
      setupAgreementUpload();
      $('#recordModal').showModal();
      return;
    }
    let currentSection='';
    $('#modalFields').innerHTML=schema.fields.map(field=>{
      let sectionMarkup='';if(field.section&&field.section!==currentSection){currentSection=field.section;sectionMarkup=`<div class="form-section-title form-span-${['schools','intlRelations'].includes(entity)?3:2}">${escapeHtml(field.section)}</div>`;}
      const generatedCode=field.autoCode?(entity==='activities'?nextActivityCode():entity==='a0Participants'?nextA0Code():entity==='jointCourses'?nextA2Code():entity==='alumni'?nextAlumniCode(existing?.cohortYear||defaults.cohortYear):entity==='studentHistories'?nextStudentCode(existing?.admissionYear||defaults.admissionYear):entity==='potentialPartners'?nextPotentialPartnerCode():entity==='schools'?nextSchoolCode():entity==='intlRelations'?nextIntlRelationCode():''):'';
      const value=entity==='schools'&&field.key==='incomeTotal'&&existing?schoolIncome(existing):(existing?.[field.key]??defaults[field.key]??(field.autoCode?generatedCode:entity==='budgets'&&field.key==='code'?nextBudgetCode():''));
      const required=field.required?'required':'';
      let input='';
      if(field.type==='select'||field.type==='member'||field.type==='activity'){
        const options=field.type==='member'?data('members').map(member=>({value:member.id,label:`${member.name} · ${member.email||member.category||'ไม่มีอีเมล'}`})):field.type==='activity'?allActivities().map(activity=>({value:activity.id,label:`${activity.activityCode||''} ${activity.name} · ${activity.round||'ไม่ระบุรอบ'} · ${activity.startDate||'ไม่ระบุวัน'}`})):(field.options||[]).map(option=>({value:option,label:option}));
        const noOptions=field.type==='member'&&!options.length?'ยังไม่มีสมาชิกในทะเบียนกลาง':field.type==='activity'&&!options.length?'ยังไม่มีกิจกรรม กรุณาสร้างกิจกรรมก่อน':'';
        input=`<select class="form-control" name="${field.key}" ${required} ${noOptions?'disabled':''}><option value="">${escapeHtml(noOptions||`เลือก${field.label}`)}</option>${options.map(option=>`<option value="${escapeHtml(option.value)}" ${String(value)===String(option.value)?'selected':''}>${escapeHtml(option.label)}</option>`).join('')}</select>`;
      }else if(field.type==='rating'){
        input=`<div class="rating-control" role="radiogroup" aria-label="${escapeHtml(field.label)}">${(field.options||[]).map(option=>`<label class="rating-option"><input type="radio" name="${field.key}" value="${escapeHtml(option)}" ${String(value)===String(option)?'checked':''} ${required}><span>${escapeHtml(option)}</span></label>`).join('')}</div>`;
      }else if(field.type==='checkbox-group'||field.type==='activity-multi'||field.type==='product-multi'){
        const selected=Array.isArray(value)?value:[];
        const options=field.type==='activity-multi'?allActivities().map(activity=>({value:activity.id,label:`${activity.activityCode||''} ${activity.name} · ${activity.round||'ไม่ระบุรอบ'} · ${activity.startDate||'ไม่ระบุวัน'}`})):field.type==='product-multi'?data('products').map(product=>({value:product.id,label:`${product.name} · ${product.type||product.level||''}`})):(field.options||[]).map(option=>({value:option,label:option}));
        input=`<div class="checkbox-group">${options.map(option=>`<label class="check-option"><input type="checkbox" name="${field.key}" value="${escapeHtml(option.value)}" ${selected.includes(option.value)?'checked':''}><span>${escapeHtml(option.label)}</span></label>`).join('')||'<span class="small-label">ยังไม่มีข้อมูลให้เลือก</span>'}</div>`;
      }else if(field.type==='autocomplete'){
        const names=[...new Set(data('potentialPartners').map(row=>row.name).filter(Boolean))];
        input=`<input class="form-control" name="${field.key}" type="text" list="partnerNameOptions" value="${escapeHtml(value)}" ${required} placeholder="${escapeHtml(field.placeholder||field.label)}" autocomplete="off"><datalist id="partnerNameOptions">${names.map(name=>`<option value="${escapeHtml(name)}"></option>`).join('')}</datalist>`;
      }else if(field.type==='textarea'){
        input=`<textarea class="form-control textarea" name="${field.key}" ${required} placeholder="${escapeHtml(field.label)}">${escapeHtml(value)}</textarea>`;
      }else if(field.type==='file'){
        input=`<label class="agreement-upload-dropzone intl-upload-dropzone" for="intlRelationAttachment"><input id="intlRelationAttachment" name="${field.key}" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation"><span class="agreement-upload-icon">${iconSvg('upload',20)}</span><strong>คลิกหรือลากไฟล์มาวางที่นี่</strong><small>PDF, Word, Excel, PowerPoint, JPG หรือ PNG · ไม่เกิน 20 MB</small><span id="intlRelationAttachmentName" class="agreement-file-name">${escapeHtml(existing?.attachmentName||'ยังไม่ได้เลือกไฟล์')}</span></label>`;
      }else{
        input=`<input class="form-control" name="${field.key}" type="${field.type}" value="${escapeHtml(value)}" ${required} ${field.type==='number'?`min="0" step="${field.step||'0.01'}"`:''} ${field.autoCode?'readonly':''} placeholder="${escapeHtml(field.placeholder||field.label)}">`;
      }
      const spanClass=field.span?`form-span-${field.span}`:field.wide?'form-span-2':'';
      const studentStep=entity==='studentHistories'?Number(field.formStep||1):0;
      const fieldMarkup=`${sectionMarkup}<div class="form-field ${spanClass} ${['checkbox-group','activity-multi','product-multi'].includes(field.type)?'form-field-check-group':''}"><label>${escapeHtml(field.label)}${field.required?' *':''}</label>${input}</div>`;
      return entity==='studentHistories'?`<div class="student-step-panel" data-student-step-panel="${studentStep}" data-active="${studentStep===1}">${fieldMarkup}</div>`:fieldMarkup;
    }).join('');
    if(entity==='studentHistories'){
      $('#modalFields').insertAdjacentHTML('afterbegin','<div class="student-wizard-nav form-span-2" role="tablist" aria-label="ขั้นตอนข้อมูลนักเรียน"><button type="button" role="tab" class="active" aria-selected="true" data-student-step="1"><span>1</span> ข้อมูลนักเรียน</button><button type="button" role="tab" aria-selected="false" data-student-step="2"><span>2</span> ประวัติการศึกษา</button><button type="button" role="tab" aria-selected="false" data-student-step="3"><span>3</span> เกียรติยศ / รางวัล</button><button type="button" role="tab" aria-selected="false" data-student-step="4"><span>4</span> จบการศึกษา</button></div>');
      setupStudentWizard(1);
      $('#modalFields').querySelector('[name="admissionYear"]')?.addEventListener('change',event=>{const codeInput=$('#modalFields').querySelector('[name="studentCode"]');if(codeInput)codeInput.value=nextStudentCode(event.target.value);});
    }
    if(entity==='alumni')$('#modalFields').querySelector('[name="cohortYear"]')?.addEventListener('change',event=>{const codeInput=$('#modalFields').querySelector('[name="alumniCode"]');if(codeInput)codeInput.value=nextAlumniCode(event.target.value);});
    if(entity==='jointCourses'){
      $('#modalFields').insertAdjacentHTML('beforeend','<div class="form-field form-span-2 a2-finance-action"><label>งบประมาณโครงการ</label><button class="button button-quiet" type="button" data-a2-budget-form>งบการเงิน</button><small>กดเพื่อบันทึกข้อมูลโครงการ แล้วเปิดงบการเงินที่เชื่อมกับรายการ A2 นี้</small></div>');
      $('[data-a2-budget-form]')?.addEventListener('click',()=>{const form=$('#recordForm');form.dataset.openBudgetAfterSave='true';saveRecord(form);});
    }
    if(entity==='potentialPartners'){
      $('#modalFields').insertAdjacentHTML('beforeend','<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-partner-save-action="agreement">MOU / MOA</button><button class="button button-quiet" type="button" data-partner-save-action="budget">งบการเงิน</button></div><small>บันทึก Partner ก่อน แล้วเปิดฟอร์มรายการที่เชื่อมโยง</small></div>');
      $$('[data-partner-save-action]').forEach(button=>button.addEventListener('click',()=>{const form=$('#recordForm');form.dataset.openPartnerAction=button.dataset.partnerSaveAction;saveRecord(form);}));
    }
    if(entity==='schools'){
      $('#modalFields').insertAdjacentHTML('beforeend','<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-school-save-action="agreement">MOU / MOA</button><button class="button button-quiet" type="button" data-school-save-action="budget">งบการเงิน</button></div><small>บันทึกข้อมูลโรงเรียนก่อน แล้วเปิดฟอร์มรายการที่เชื่อมโยง</small></div>');
      $$('[data-school-save-action]').forEach(button=>button.addEventListener('click',()=>{const form=$('#recordForm');form.dataset.openSchoolAction=button.dataset.schoolSaveAction;saveRecord(form);}));
    }
    if(entity==='intlRelations'){
      $('#modalFields').insertAdjacentHTML('beforeend','<div class="form-field form-span-3 partner-related-actions"><label>ต่อยอดความร่วมมือ</label><div class="partner-action-buttons"><button class="button button-quiet" type="button" data-intl-save-action="agreement">MOU / MOA</button><button class="button button-quiet" type="button" data-intl-save-action="budget">งบการเงิน</button></div><small>บันทึกข้อมูลมหาวิทยาลัยก่อน แล้วเปิดรายการเอกสารหรือการเงินที่เชื่อมโยง</small></div>');
      $$('[data-intl-save-action]').forEach(button=>button.addEventListener('click',()=>{const form=$('#recordForm');form.dataset.openIntlAction=button.dataset.intlSaveAction;saveRecord(form);}));
      setupInternationalUpload();
    }
    $('#recordModal').showModal();
  }
  async function saveRecord(form){
    if(form.dataset.entity==='agreements')return saveAgreementRecord(form);
    const openRelatedBudget=form.dataset.openBudgetAfterSave==='true';delete form.dataset.openBudgetAfterSave;
    const openPartnerAction=form.dataset.openPartnerAction||'';delete form.dataset.openPartnerAction;
    const openSchoolAction=form.dataset.openSchoolAction||'';delete form.dataset.openSchoolAction;
    const openIntlAction=form.dataset.openIntlAction||'';delete form.dataset.openIntlAction;
    const entity=form.dataset.entity,recordId=form.dataset.recordId,schema=schemas[entity];const body={};schema.fields.forEach(field=>{if(field.type==='file')return;const input=form.elements.namedItem(field.key);if(field.type==='checkbox-group'||field.type==='activity-multi'||field.type==='product-multi'){body[field.key]=$$(`input[name="${field.key}"]:checked`,form).map(option=>option.value);return;}if(input){let value=input.value.trim();if(field.type==='number')value=value?Number(value):field.required?0:'';body[field.key]=value;}});
    if(entity==='studentHistories'){body.name=[body.prefix,body.firstName,body.lastName].filter(Boolean).join(' ');body.studentId=body.studentCode;}
    if(!form.reportValidity())return;
    if(['budgets','potentialPartners'].includes(entity)&&form.dataset.relatedGroup&&form.dataset.relatedRecordId){body.relatedGroup=form.dataset.relatedGroup;body.relatedRecordId=form.dataset.relatedRecordId;}
    const rows=data(entity);
    if(entity==='budgets'&&rows.some(row=>row.id!==recordId&&String(row.code||'').toLocaleUpperCase('en')===String(body.code||'').toLocaleUpperCase('en'))){toast('รหัสงบนี้มีอยู่แล้ว');return;}
    if(entity==='alumni'&&rows.some(row=>row.id!==recordId&&String(row.alumniCode||'').trim().toLocaleUpperCase('en')===String(body.alumniCode||'').trim().toLocaleUpperCase('en'))){toast('รหัส Alumni นี้มีอยู่แล้ว');return;}
    if(entity==='studentHistories'){
      if(rows.some(row=>row.id!==recordId&&String(row.studentCode||row.studentId||'').trim().toLocaleUpperCase('en')===String(body.studentCode||'').trim().toLocaleUpperCase('en'))){toast('รหัสนักเรียนนี้มีอยู่แล้ว');return;}
      if(body.citizenId&&!/^\d{13}$/.test(body.citizenId)){toast('เลขประจำตัวประชาชนต้องมีตัวเลข 13 หลัก');return;}
    }
    if(entity==='activities'){
      if(rows.some(row=>row.id!==recordId&&String(row.activityCode||'').trim().toLocaleUpperCase('en')===String(body.activityCode||'').trim().toLocaleUpperCase('en'))){toast('รหัสกิจกรรมนี้มีอยู่แล้ว');return;}
      if(body.endDate&&body.endDate<body.startDate){toast('วันที่สิ้นสุดต้องไม่อยู่ก่อนวันที่เริ่มต้น');return;}
    }
    if(entity==='a0Participants'){
      if(rows.some(row=>row.id!==recordId&&String(row.recordCode||'').trim().toLocaleUpperCase('en')===String(body.recordCode||'').trim().toLocaleUpperCase('en'))){toast('รหัสรายการ A0 นี้มีอยู่แล้ว');return;}
      if(rows.some(row=>row.id!==recordId&&row.memberId===body.memberId&&row.activityId===body.activityId)){toast('สมาชิกนี้มีบันทึก A0 ในกิจกรรม/รอบนี้แล้ว');return;}
      if(!memberById(body.memberId)||!allActivities().some(activity=>activity.id===body.activityId)){toast('เลือกสมาชิกและกิจกรรมที่มีอยู่ในระบบ');return;}
    }
    if(entity==='jointCourses'){
      if(rows.some(row=>row.id!==recordId&&String(row.projectCode||'').trim().toLocaleUpperCase('en')===String(body.projectCode||'').trim().toLocaleUpperCase('en'))){toast('รหัสโครงการ A2 นี้มีอยู่แล้ว');return;}
      if(body.endDate&&body.endDate<body.startDate){toast('วันที่สิ้นสุดต้องไม่อยู่ก่อนวันที่เริ่ม');return;}
    }
    if(entity==='potentialPartners'&&rows.some(row=>row.id!==recordId&&String(row.partnerCode||'').trim().toLocaleUpperCase('en')===String(body.partnerCode||'').trim().toLocaleUpperCase('en'))){toast('รหัส Partner นี้มีอยู่แล้ว');return;}
    if(entity==='schools'){
      if(rows.some(row=>row.id!==recordId&&String(row.schoolCode||'').trim().toLocaleUpperCase('en')===String(body.schoolCode||'').trim().toLocaleUpperCase('en'))){toast('รหัส Partner โรงเรียนนี้มีอยู่แล้ว');return;}
      if((body.relatedActivityIds||[]).some(id=>!allActivities().some(activity=>activity.id===id))||(body.relatedProductIds||[]).some(id=>!data('products').some(product=>product.id===id))){toast('มีกิจกรรมหรือหลักสูตรที่ถูกลบไปแล้ว กรุณาเลือกข้อมูลต้นทางใหม่');return;}
    }
    let intlFile=null;
    if(entity==='intlRelations'){
      if(rows.some(row=>row.id!==recordId&&String(row.partnerCode||'').trim().toLocaleUpperCase('en')===String(body.partnerCode||'').trim().toLocaleUpperCase('en'))){toast('รหัส Partner มหาวิทยาลัยนี้มีอยู่แล้ว');return;}
      if(body.activityEndDate&&body.activityStartDate&&body.activityEndDate<body.activityStartDate){toast('วันที่สิ้นสุดกิจกรรมต้องไม่อยู่ก่อนวันที่เริ่ม');return;}
      if((body.relatedActivityIds||[]).some(activityId=>!allActivities().some(activity=>activity.id===activityId))){toast('มีกิจกรรมที่ถูกลบไปแล้ว กรุณาเลือกกิจกรรมใหม่');return;}
      intlFile=form.elements.namedItem('supportingAttachment').files?.[0]||null;
      if(intlFile){const extension=intlFile.name.split('.').pop().toLocaleLowerCase('en');if(!['pdf','doc','docx','jpg','jpeg','png','xlsx','pptx'].includes(extension)){toast('ชนิดไฟล์ไม่รองรับ กรุณาเลือก PDF, Word, Excel, PowerPoint, JPG หรือ PNG');return;}if(intlFile.size>20*1024*1024){toast('ไฟล์มีขนาดเกิน 20 MB');return;}}
    }
    const savedId=recordId||id(entity==='a0Participants'?'A0':entity==='activities'?'EVT':entity==='jointCourses'?'JNT':entity==='intlRelations'?'INT':entity.slice(0,3).toUpperCase());
    if(entity==='intlRelations'&&intlFile){try{await saveIntlRelationAttachment(savedId,intlFile);body.attachmentName=intlFile.name;body.attachmentType=intlFile.type;body.attachmentSize=intlFile.size;}catch(error){console.warn('Could not save university attachment',error);toast('บันทึกเอกสารประกอบไม่สำเร็จ กรุณาลองอีกครั้ง');return;}}
    let savedRecord;
    if(recordId){const index=rows.findIndex(row=>row.id===recordId);if(index>=0){rows[index]={...rows[index],...body};savedRecord=rows[index];}}
    else{savedRecord={id:savedId,...body};rows.unshift(savedRecord);}
    if(entity==='jointCourses'&&savedRecord){
      const linkedBudget=data('budgets').find(row=>row.relatedGroup==='A2'&&row.relatedRecordId===savedRecord.id);
      if(linkedBudget){linkedBudget.projectName=savedRecord.name;linkedBudget.type=savedRecord.projectType==='Short Course'?'Short Course':'อื่น ๆ';linkedBudget.owner=savedRecord.owner||linkedBudget.owner;}
    }
    if(entity==='potentialPartners'&&savedRecord){
      const linkedBudget=data('budgets').find(row=>row.relatedGroup==='B0'&&row.relatedRecordId===savedRecord.id);
      if(linkedBudget){linkedBudget.projectName=savedRecord.name;linkedBudget.owner=savedRecord.owner||linkedBudget.owner;}
      const linkedAgreement=data('agreements').find(row=>row.relatedGroup==='B0'&&row.relatedRecordId===savedRecord.id);
      if(linkedAgreement)linkedAgreement.partner=savedRecord.name;
    }
    if(entity==='schools'&&savedRecord){
      const linkedBudget=data('budgets').find(row=>row.relatedGroup==='B1'&&row.relatedRecordId===savedRecord.id);
      if(linkedBudget){linkedBudget.projectName=savedRecord.name;linkedBudget.owner=savedRecord.owner||linkedBudget.owner;}
      const linkedAgreement=data('agreements').find(row=>row.relatedGroup==='B1'&&row.relatedRecordId===savedRecord.id);
      if(linkedAgreement){linkedAgreement.partner=savedRecord.name;savedRecord.agreementType=linkedAgreement.agreementType;}
    }
    if(entity==='intlRelations'&&savedRecord){
      const linkedBudget=data('budgets').find(row=>row.relatedGroup==='B2'&&row.relatedRecordId===savedRecord.id);
      if(linkedBudget){linkedBudget.projectName=savedRecord.universityName;linkedBudget.owner=savedRecord.owner||linkedBudget.owner;}
      const linkedAgreement=data('agreements').find(row=>row.relatedGroup==='B2'&&row.relatedRecordId===savedRecord.id);
      if(linkedAgreement){linkedAgreement.partner=savedRecord.universityName;savedRecord.agreementId=linkedAgreement.id;savedRecord.agreementType=linkedAgreement.agreementType;}
    }
    saveState();$('#recordModal').close();toast(recordId?'ปรับปรุงข้อมูลแล้ว':'เพิ่มข้อมูลแล้ว');render();
    if(openRelatedBudget&&entity==='jointCourses'&&savedRecord)openBudgetForA2(savedRecord);
    if(openPartnerAction&&entity==='potentialPartners'&&savedRecord){if(openPartnerAction==='agreement')openAgreementForPartner(savedRecord);if(openPartnerAction==='budget')openBudgetForPartner(savedRecord);}
    if(openSchoolAction&&entity==='schools'&&savedRecord){if(openSchoolAction==='agreement')openAgreementForSchool(savedRecord);if(openSchoolAction==='budget')openBudgetForSchool(savedRecord);}
    if(openIntlAction&&entity==='intlRelations'&&savedRecord){if(openIntlAction==='agreement')openAgreementForIntlRelation(savedRecord);if(openIntlAction==='budget')openBudgetForIntlRelation(savedRecord);}
  }
  async function saveAgreementRecord(form){
    const recordId=form.dataset.recordId;const rows=data('agreements');const existing=recordId?rows.find(row=>row.id===recordId):null;const file=form.elements.namedItem('attachment').files?.[0]||null;
    if(file){
      const extension=file.name.split('.').pop().toLocaleLowerCase('en');
      if(!['pdf','doc','docx','jpg','jpeg','png'].includes(extension)){toast('ชนิดไฟล์ไม่รองรับ กรุณาเลือก PDF, Word, JPG หรือ PNG');return;}
      if(file.size>20*1024*1024){toast('ไฟล์มีขนาดเกิน 20 MB');return;}
    }
    if(!form.reportValidity())return;
    const body={};schemas.agreements.fields.filter(field=>field.type!=='file').forEach(field=>{const input=form.elements.namedItem(field.key);if(input){const value=input.value.trim();body[field.key]=value;}});
    if(form.dataset.relatedGroup&&form.dataset.relatedRecordId){body.relatedGroup=form.dataset.relatedGroup;body.relatedRecordId=form.dataset.relatedRecordId;}
    if(body.startDate&&body.endDate<body.startDate){toast('วันที่หมดอายุต้องอยู่หลังวันที่เริ่ม');return;}
    if(rows.some(row=>row.id!==recordId&&String(row.docNo||'').trim().toLocaleUpperCase('en')===String(body.docNo||'').trim().toLocaleUpperCase('en'))){toast('เลขที่เอกสารนี้มีอยู่แล้ว');return;}
    const savedId=recordId||id('AGR');
    if(file){try{await saveAgreementAttachment(savedId,file);}catch(error){console.warn('Could not save MOU/MOA attachment',error);toast('บันทึกไฟล์แนบไม่สำเร็จ กรุณาลองเปิดผ่าน start.bat แล้วบันทึกอีกครั้ง');return;}}
    const previous=existing||{};
    const record={...previous,id:savedId,...body,attachmentName:file?.name||previous.attachmentName||'',attachmentType:file?.type||previous.attachmentType||'',attachmentSize:file?.size||previous.attachmentSize||0};
    if(existing){const index=rows.findIndex(row=>row.id===savedId);if(index>=0)rows[index]=record;}else rows.unshift(record);
    if(record.relatedGroup==='B1'&&record.relatedRecordId){const school=data('schools').find(row=>row.id===record.relatedRecordId);if(school){school.agreementId=savedId;school.agreementType=record.agreementType;school.name=school.name||record.partner;}}
    if(record.relatedGroup==='B2'&&record.relatedRecordId){const university=data('intlRelations').find(row=>row.id===record.relatedRecordId);if(university){university.agreementId=savedId;university.agreementType=record.agreementType;university.universityName=university.universityName||record.partner;}}
    saveState();$('#recordModal').close();toast(existing?'ปรับปรุงข้อมูลแล้ว':'เพิ่มบันทึกความร่วมมือแล้ว');render();
  }
  function deleteRecord(entity,recordId){const schema=schemas[entity];if(!schema)return;
    if(entity==='members'&&(data('registrations').some(row=>row.memberId===recordId)||data('a0Participants').some(row=>row.memberId===recordId))){toast('สมาชิกนี้เชื่อมกับการลงทะเบียนหรือข้อมูล A0 อยู่ กรุณาจัดการข้อมูลที่เชื่อมโยงก่อน');return;}
    if(entity==='jointCourses'&&data('budgets').some(row=>row.relatedGroup==='A2'&&row.relatedRecordId===recordId)){toast('โครงการนี้มีงบการเงินเชื่อมอยู่ กรุณาลบงบการเงินก่อนลบโครงการ');return;}
    if(entity==='potentialPartners'&&(data('budgets').some(row=>row.relatedGroup==='B0'&&row.relatedRecordId===recordId)||data('agreements').some(row=>row.relatedGroup==='B0'&&row.relatedRecordId===recordId))){toast('Partner นี้มีงบการเงินหรือ MOU/MOA เชื่อมอยู่ กรุณาจัดการรายการที่เชื่อมโยงก่อนลบ');return;}
    if(entity==='schools'&&(data('budgets').some(row=>row.relatedGroup==='B1'&&row.relatedRecordId===recordId)||data('agreements').some(row=>row.relatedGroup==='B1'&&row.relatedRecordId===recordId))){toast('โรงเรียนนี้มีงบการเงินหรือ MOU/MOA เชื่อมอยู่ กรุณาจัดการรายการที่เชื่อมโยงก่อนลบ');return;}
    if(entity==='activities'&&data('schools').some(row=>(row.relatedActivityIds||[]).includes(recordId))){toast('กิจกรรมนี้เชื่อมกับโรงเรียนคู่ความร่วมมืออยู่ กรุณาเอาความเชื่อมโยงออกก่อนลบ');return;}
    if(entity==='products'&&data('schools').some(row=>(row.relatedProductIds||[]).includes(recordId))){toast('หลักสูตรนี้เชื่อมกับโรงเรียนคู่ความร่วมมืออยู่ กรุณาเอาความเชื่อมโยงออกก่อนลบ');return;}
    if(entity==='intlRelations'&&(data('budgets').some(row=>row.relatedGroup==='B2'&&row.relatedRecordId===recordId)||data('agreements').some(row=>row.relatedGroup==='B2'&&row.relatedRecordId===recordId))){toast('มหาวิทยาลัยนี้มีงบการเงินหรือ MOU/MOA เชื่อมอยู่ กรุณาจัดการรายการที่เชื่อมโยงก่อนลบ');return;}
    if(entity==='activities'&&data('intlRelations').some(row=>(row.relatedActivityIds||[]).includes(recordId))){toast('กิจกรรมนี้เชื่อมกับมหาวิทยาลัยคู่ความร่วมมืออยู่ กรุณาเอาความเชื่อมโยงออกก่อนลบ');return;}
    const linkedA0=entity==='activities'?data('a0Participants').filter(row=>row.activityId===recordId).length:0;
    const linkedRegistrations=entity==='activities'?registrationsFor(recordId).length:0;
    const linkedJourneyEvents=entity==='studentHistories'?data('journeyEvents').filter(event=>event.historyId===recordId).length:0;
    const message=entity==='activities'?`ลบกิจกรรมนี้พร้อมข้อมูลลงทะเบียน ${linkedRegistrations} รายการ และบันทึก A0 ${linkedA0} รายการหรือไม่?`:entity==='studentHistories'?`ลบประวัตินักเรียนนี้พร้อมเหตุการณ์ในเส้นทาง ${linkedJourneyEvents} รายการหรือไม่?`:`ลบรายการ${schema.singular}นี้จากข้อมูลในเครื่องหรือไม่?`;
    if(!confirm(message))return;
    state.data[entity]=data(entity).filter(row=>row.id!==recordId);
    if(entity==='activities'){state.data.registrations=data('registrations').filter(row=>row.activityId!==recordId);state.data.a0Participants=data('a0Participants').filter(row=>row.activityId!==recordId);}
    if(entity==='studentHistories')state.data.journeyEvents=data('journeyEvents').filter(event=>event.historyId!==recordId);
    if(entity==='agreements')data('schools').filter(row=>row.agreementId===recordId).forEach(row=>{row.agreementId='';row.agreementType='ไม่มี';if(['Active','ใกล้หมดอายุ','ร่างเอกสาร'].includes(row.status))row.status='Potential';});
    if(entity==='agreements')data('intlRelations').filter(row=>row.agreementId===recordId).forEach(row=>{row.agreementId='';row.agreementType='ไม่มี';if(['Active','รอต่ออายุ','กำลังดำเนินการ'].includes(row.status))row.status='Potential';});
    if(entity==='agreements')removeAgreementAttachment(recordId);if(entity==='intlRelations')removeIntlRelationAttachment(recordId);saveState();toast('ลบรายการแล้ว');render();
  }

  function exportCsv(entity){
    const schema=schemas[entity];const rows=data(entity);if(!schema||!rows.length){toast('ไม่มีข้อมูลสำหรับส่งออก');return;}
    const keys=[...new Set([...schema.columns.map(([key])=>key),...schema.fields.map(field=>field.key)])];
    const csv=[
      keys.map(key=>quoteCsv(schema.columns.find(([column])=>column===key)?.[1]||schema.fields.find(field=>field.key===key)?.label||key)).join(','),
      ...rows.map((row,index)=>keys.map(key=>{
        const alumniName=[row.prefix,row.firstName,row.lastName].filter(Boolean).join(' ');
        const studentName=[row.prefix,row.firstName,row.lastName].filter(Boolean).join(' ');
        const value=entity==='studentHistories'&&key==='sequence'?index+1:entity==='studentHistories'&&key==='fullName'?studentName:entity==='alumni'&&key==='sequence'?index+1:entity==='alumni'&&key==='fullName'?alumniName:entity==='budgets'&&key==='net'?budgetNet(row):entity==='budgets'&&key==='status'?budgetOutcome(row):entity==='agreements'&&key==='cooperationStatus'?agreementCooperationStatus(row):entity==='agreements'&&key==='attachment'?row.attachmentName||'':entity==='agreements'&&key==='sequence'?index+1:entity==='activities'&&key==='participants'?registrationsFor(row.id).length:entity==='activities'&&key==='attended'?registrationsFor(row.id).filter(reg=>reg.checkInAt).length:entity==='a0Participants'&&key==='memberId'?memberById(row.memberId)?.name||row.memberId:entity==='a0Participants'&&key==='activityId'?allActivities().find(activity=>activity.id===row.activityId)?.name||row.activityId:entity==='schools'&&key==='status'?schoolStatus(row):entity==='schools'&&key==='agreementType'?schoolAgreementType(row):entity==='schools'&&key==='incomeTotal'?schoolIncome(row):entity==='intlRelations'&&key==='agreementType'?intlAgreementType(row):entity==='intlRelations'&&key==='status'?intlRelationStatus(row):entity==='intlRelations'&&key==='studentFlow'?`${row.inboundStudents||0} / ${row.outboundStudents||0}`:entity==='intlRelations'&&key==='activityCount'?intlActivityCount(row):entity==='intlRelations'&&key==='incomeTotal'?intlRelationIncome(row):entity==='intlRelations'&&key==='relatedActivityIds'?(row.relatedActivityIds||[]).map(activityId=>allActivities().find(activity=>activity.id===activityId)?.name||activityId).join(' / '):(row[key]??'');
        return quoteCsv(value);
      }).join(','))
    ].join('\r\n');
    downloadBlob(`one-journey-${entity}.csv`,'\ufeff'+csv,'text/csv;charset=utf-8');toast('ส่งออก CSV แล้ว');
  }
  function quoteCsv(value){return `"${String(value).replace(/"/g,'""')}"`;}
  function downloadBlob(filename,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download=filename;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function downloadJson(){downloadBlob('one-journey-local-backup.json',JSON.stringify(state,null,2),'application/json');toast('ดาวน์โหลดไฟล์สำรอง JSON แล้ว');}
  function resetDemo(){if(!confirm('คืนค่าข้อมูลตัวอย่างทั้งหมด? การแก้ไขที่บันทึกในเครื่องนี้จะหายไป'))return;state={version:1,demo:true,updatedAt:new Date().toISOString(),data:structuredClone(seed)};saveState();toast('คืนค่าข้อมูลตัวอย่างแล้ว');render();}

  function bindActions(root){
    $$('[data-route]',root).forEach(button=>button.addEventListener('click',event=>{event.preventDefault();go(button.dataset.route);}));
    $$('[data-action]',root).forEach(button=>button.addEventListener('click',()=>{const action=button.dataset.action;if(action==='add-record')openForm(currentRoute);if(action==='export-csv')exportCsv(currentRoute);if(action==='download-json')downloadJson();if(action==='reset-demo')resetDemo();}));
    $$('[data-view-budget]',root).forEach(button=>button.addEventListener('click',()=>openBudgetView(button.dataset.viewBudget)));
    $$('[data-view-a0]',root).forEach(button=>button.addEventListener('click',()=>openA0View(button.dataset.viewA0)));
    $$('[data-view-a2]',root).forEach(button=>button.addEventListener('click',()=>openA2View(button.dataset.viewA2)));
    $$('[data-view-partner]',root).forEach(button=>button.addEventListener('click',()=>openPartnerView(button.dataset.viewPartner)));
    $$('[data-view-school]',root).forEach(button=>button.addEventListener('click',()=>openSchoolView(button.dataset.viewSchool)));
    $$('[data-view-intl-relation]',root).forEach(button=>button.addEventListener('click',()=>openIntlRelationView(button.dataset.viewIntlRelation)));
    $$('[data-view-alumni]',root).forEach(button=>button.addEventListener('click',()=>openAlumniView(button.dataset.viewAlumni)));
    $$('[data-open-product]',root).forEach(button=>button.addEventListener('click',()=>openProductView(button.dataset.openProduct)));
    $$('[data-budget-a2]',root).forEach(button=>button.addEventListener('click',()=>{const record=data('jointCourses').find(row=>row.id===button.dataset.budgetA2);if(record)openBudgetForA2(record);}));
    $$('[data-view-agreement]',root).forEach(button=>button.addEventListener('click',()=>openAgreementView(button.dataset.viewAgreement)));
    $$('[data-open-agreement-file]',root).forEach(button=>button.addEventListener('click',()=>openAgreementFile(button.dataset.openAgreementFile)));
    $$('[data-upload-agreement-file]',root).forEach(button=>button.addEventListener('click',()=>openForm('agreements',button.dataset.uploadAgreementFile)));
    $$('[data-edit]',root).forEach(button=>button.addEventListener('click',()=>openForm(currentRoute,button.dataset.edit)));
    $$('[data-delete]',root).forEach(button=>button.addEventListener('click',()=>deleteRecord(currentRoute,button.dataset.delete)));
    $$('[data-open-activity]',root).forEach(button=>button.addEventListener('click',()=>go(`activity:${button.dataset.openActivity}`)));
    $$('[data-create-a0-member]',root).forEach(button=>button.addEventListener('click',()=>{const activity=allActivities().find(row=>row.id===currentActivityId);openForm('a0Participants','',{memberId:button.dataset.createA0Member,activityId:currentActivityId,recordedDate:today,owner:activity?.owner||''});}));
    $$('[data-open-student]',root).forEach(button=>button.addEventListener('click',()=>go(`student:${button.dataset.openStudent}`)));
    $$('[data-add-journey]',root).forEach(button=>button.addEventListener('click',()=>{journeyFormOpen=true;render();}));
    $$('[data-mode]',root).forEach(button=>button.addEventListener('click',()=>{activityMode=button.dataset.mode;render();}));
    const search=$('#entitySearch',root);if(search)search.addEventListener('input',()=>{window.entitySearch=search.value;const position=search.selectionStart;render();const refreshed=$('#entitySearch');refreshed?.focus();refreshed?.setSelectionRange(position,position);});
    const status=$('#statusFilter',root);if(status)status.addEventListener('change',()=>{entityStatusByRoute[currentRoute]=status.value;render();});
    const agreementStatus=$('#agreementStatusFilter',root);if(agreementStatus)agreementStatus.addEventListener('change',()=>{entityStatusByRoute.agreements=agreementStatus.value;render();});
    const agreementStart=$('#agreementStartFilter',root);if(agreementStart)agreementStart.addEventListener('change',()=>{window.agreementStartFrom=agreementStart.value;render();});
    const agreementExpiry=$('#agreementExpiryFilter',root);if(agreementExpiry)agreementExpiry.addEventListener('change',()=>{window.agreementExpiryTo=agreementExpiry.value;render();});
    const agreementSearch=$('#agreementSearch',root);if(agreementSearch)agreementSearch.addEventListener('input',()=>{window.agreementSearch=agreementSearch.value;const position=agreementSearch.selectionStart;render();const refreshed=$('#agreementSearch');refreshed?.focus();refreshed?.setSelectionRange(position,position);});
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
  $('#notificationButton').addEventListener('click',()=>toast('ไม่มีการแจ้งเตือนใหม่ในข้อมูลตัวอย่าง'));
  // Reserve the legacy window property before an element with id="entitySearch" is rendered.
  // Browsers otherwise expose that input as window.entitySearch and overwrite this search value.
  window.entitySearch='';
  renderNav();currentRoute=location.hash.replace('#','')||'overview';render();
})();
