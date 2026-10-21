import { useEffect } from 'react';

function Icon({ name, size = 18 }) {
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Brand() {
  return (
    <a className="brand group" href="#overview" aria-label="One Journey หน้าหลัก">
      <span className="brand-logo">
        <img src="/one-journey-logo.png" alt="" />
      </span>
    </a>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      <Brand />
      <div className="sidebar-caption">ระบบงานการศึกษา</div>
      <nav className="nav" id="nav" aria-label="เมนูหลัก" />
      <div className="sidebar-bottom">
        <div className="system-note">
          <span className="status-dot" />
          <span><strong>โหมดข้อมูลตัวอย่าง</strong><small>จัดเก็บในเบราว์เซอร์เครื่องนี้</small></span>
        </div>
        <button className="profile-button transition-colors duration-150" id="profileButton" type="button">
          <span className="avatar">AD</span>
          <span className="profile-copy"><strong>Admin DII</strong><small>ผู้ดูแลระบบ · ตัวอย่าง</small></span>
          <span className="profile-chevron"><Icon name="chevronRight" size={18} /></span>
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <button className="icon-button mobile-menu" id="mobileMenu" type="button" aria-label="เปิดเมนู"><Icon name="menu" /></button>
        <a className="breadcrumb-home" href="#overview">One Journey</a><b>/</b><strong id="breadcrumbTitle">หน้าหลัก</strong>
      </div>
      <form className="global-search" id="globalSearch">
        <span aria-hidden="true"><Icon name="search" size={19} /></span>
        <input id="globalSearchInput" type="search" placeholder="ค้นหาสมาชิก กิจกรรม หลักสูตร หรือพาร์ทเนอร์" aria-label="ค้นหาทั่วทั้งระบบ" />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="top-actions">
        <button className="icon-button notification-button" id="notificationButton" type="button" aria-label="การแจ้งเตือน"><Icon name="bell" /></button>
        <button className="top-user" id="topUser" type="button">
          <span className="avatar small">AD</span>
          <span><strong>Admin DII</strong><small>วิทยาลัย CAMT</small></span>
          <b><Icon name="chevronDown" size={15} /></b>
        </button>
      </div>
    </header>
  );
}

function RecordDialog() {
  return (
    <dialog className="modal" id="recordModal" aria-labelledby="modalTitle">
      <form id="recordForm" method="dialog" noValidate>
        <div className="modal-head">
          <div><span className="eyebrow" id="modalEyebrow">One Journey</span><h2 id="modalTitle">เพิ่มข้อมูล</h2></div>
          <button className="icon-button" type="button" data-close-modal aria-label="ปิด"><Icon name="close" size={18} /></button>
        </div>
        <div className="modal-body" id="modalFields" />
        <div className="modal-foot">
          <button className="button button-quiet" type="button" data-close-modal>ยกเลิก</button>
          <button className="button button-primary" type="submit">บันทึกข้อมูล</button>
        </div>
      </form>
    </dialog>
  );
}

export default function App() {
  useEffect(() => {
    // Keep existing data flows intact while screens move into React components incrementally.
    import('./legacy-app.js');
  }, []);

  return (
    <div className="app-shell min-h-screen bg-journey-canvas text-journey-ink">
      <Sidebar />
      <main className="main-area min-h-screen">
        <Topbar />
        <section className="content" id="content" aria-live="polite" />
      </main>
      <div className="toast-region" id="toastRegion" aria-live="polite" aria-atomic="true" />
      <RecordDialog />
    </div>
  );
}
