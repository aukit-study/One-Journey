import { useEffect, useState } from 'react';

const AUTH_KEY = 'onejourney.auth.session.v1';
const LAST_EMAIL_KEY = 'onejourney.lastEmail';
const DEMO_EMAIL = 'admin@onejourney.camt.ac.th';
const DEMO_PASSWORD = 'Journey2026!';

function Icon({ name, size = 18 }) {
  const paths = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 3.9M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10.5 10.5 0 0 0 4-.8" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></>,
  };

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function readSession() {
  try {
    const account = JSON.parse(window.sessionStorage.getItem(AUTH_KEY) || 'null');
    return account?.email ? account : null;
  } catch {
    return null;
  }
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState(() => window.localStorage.getItem(LAST_EMAIL_KEY) || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(Boolean(window.localStorage.getItem(LAST_EMAIL_KEY)));
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const fillDemoAccount = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setMessage('กรอกบัญชีตัวอย่างให้แล้ว กดเข้าสู่ระบบเพื่อไปต่อ');
    setMessageType('info');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setMessage('อีเมลหรือรหัสผ่านไม่ถูกต้อง ลองใช้บัญชีตัวอย่างด้านล่าง');
      setMessageType('error');
      return;
    }

    if (rememberEmail) window.localStorage.setItem(LAST_EMAIL_KEY, normalizedEmail);
    else window.localStorage.removeItem(LAST_EMAIL_KEY);
    const account = { email: normalizedEmail, displayName: 'Admin DII', role: 'ผู้ดูแลระบบ' };
    window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(account));
    onLogin(account);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <section className="auth-story" aria-label="One Journey CAMT">
          <div className="auth-brand-card"><img src="/one-journey-logo.png" alt="One Journey CRM CAMT CMU" /></div>
          <div className="auth-story-copy">
            <span className="auth-eyebrow"><i /> CAMT · EDUCATION SERVICES</span>
            <h1>เชื่อมทุกเส้นทาง<br />การเรียนรู้ไว้ด้วยกัน</h1>
            <p>ศูนย์กลางข้อมูลการศึกษา กิจกรรม หลักสูตร และเครือข่ายความร่วมมือของวิทยาลัย CAMT</p>
          </div>
          <div className="auth-campus-art" aria-hidden="true">
            <svg viewBox="0 0 620 284" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 220c84-51 162-28 238-50 106-31 207-74 382-8v122H0v-64Z" fill="#F4A34D" />
              <path d="M0 245c111-35 168-23 264-45 124-29 207-46 356 2v82H0v-39Z" fill="#E98637" opacity=".8" />
              <circle cx="478" cy="84" r="46" fill="#FFE0A2" opacity=".95" />
              <path d="M401 94h125v95H401z" fill="#C95224" />
              <path d="m383 97 80-43 82 43H383Z" fill="#F26A2B" />
              <path d="M447 128h22v28h-22zM485 128h22v28h-22zM415 128h17v21h-17zM512 128h10v21h-10z" fill="#FFE3B7" />
              <path d="M451 163h27v26h-27z" fill="#FFE3B7" />
              <path d="M460 55V26h5v30" fill="#98421F" />
              <path d="M465 27h32l-13 10 13 10h-32V27Z" fill="#FF7A32" />
              <path d="M122 77c10-23 40-25 54-8 10-20 43-18 50 7 20 1 29 13 29 25H110c1-11 4-19 12-24Z" fill="#FFF9ED" opacity=".78" />
              <path d="M300 52c7-16 29-17 39-5 7-15 31-14 36 5 16 1 22 10 22 19h-107c1-8 4-15 10-19Z" fill="#FFF9ED" opacity=".7" />
              <g fill="#8F4A26" opacity=".7"><circle cx="553" cy="143" r="16"/><path d="M549 155h8v77h-8z"/><circle cx="350" cy="160" r="14"/><path d="M346 171h8v60h-8z"/></g>
              <g fill="#F8D39E"><circle cx="329" cy="178" r="18"/><path d="M310 195h38v47h-38z" fill="#294D69"/><path d="m313 202-17 20 6 5 20-15m24-10 17 16-6 6-18-14"/><path d="m316 238-10 19h11l12-17m11-2 10 19h11l-14-21" fill="#294D69"/></g>
              <g fill="#162F46"><circle cx="233" cy="190" r="14"/><path d="M218 204h31v39h-31z" fill="#F26A2B"/><path d="m221 210-19 19 5 6 21-15m21-10 17 18-6 6-19-15" fill="#FFD7A2"/><path d="m221 241-8 18h11l10-17m8-1 9 18h11l-13-19"/><path d="M223 178c2-12 19-15 25-4v15h-26v-11Z" fill="#38251B"/></g>
              <g fill="#FFF1D9" opacity=".9"><circle cx="90" cy="198" r="8"/><path d="M81 207h18v39H81z"/><path d="m83 214-13 18 5 4 13-15m11-7 13 16-5 5-14-16"/><path d="m84 244-8 17h10l7-16m7-1 9 17h10l-13-18"/></g>
            </svg>
          </div>
          <div className="auth-story-footer"><span><Icon name="shield" size={16} /> พื้นที่ทำงานของวิทยาลัย CAMT</span><span>มหาวิทยาลัยเชียงใหม่</span></div>
        </section>

        <section className="auth-panel" aria-labelledby="loginTitle">
          <div className="auth-panel-top"><span className="auth-system-mark"><Icon name="sparkle" size={18} /></span><span>ONE JOURNEY <b>·</b> CAMT CMU</span></div>
          <div className="auth-heading">
            <span className="auth-section-label">ยินดีต้อนรับกลับ</span>
            <h2 id="loginTitle">เข้าสู่ระบบ</h2>
            <p>ลงชื่อเข้าใช้เพื่อจัดการข้อมูลการศึกษาและความร่วมมือ</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="loginEmail">อีเมล</label>
            <div className="auth-input-wrap">
              <Icon name="mail" size={18} />
              <input id="loginEmail" type="email" autoComplete="username" placeholder="name@camt.ac.th" value={email} onChange={event => setEmail(event.target.value)} required />
            </div>

            <div className="auth-password-label"><label className="auth-label" htmlFor="loginPassword">รหัสผ่าน</label><button className="auth-text-button" type="button" onClick={() => { setMessage('ระบบตัวอย่างยังไม่เปิดรีเซ็ตรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ'); setMessageType('info'); }}>ลืมรหัสผ่าน?</button></div>
            <div className="auth-input-wrap">
              <Icon name="lock" size={18} />
              <input id="loginPassword" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="กรอกรหัสผ่าน" value={password} onChange={event => setPassword(event.target.value)} required />
              <button className="auth-password-toggle" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} /></button>
            </div>

            <div className="auth-form-options"><label className="auth-checkbox"><input type="checkbox" checked={rememberEmail} onChange={event => setRememberEmail(event.target.checked)} /><span>จดจำอีเมลนี้</span></label><span className="auth-secure"><Icon name="shield" size={14} /> บัญชีตัวอย่าง</span></div>

            {message && <p className={`auth-message ${messageType}`} role="status">{message}</p>}
            <button className="auth-submit" type="submit">เข้าสู่ระบบ <Icon name="arrowRight" size={18} /></button>
          </form>

          <div className="auth-demo-card">
            <div className="auth-demo-icon"><Icon name="lock" size={17} /></div>
            <div className="auth-demo-copy"><strong>ทดลองเข้าสู่ระบบ</strong><span>{DEMO_EMAIL}</span></div>
            <button type="button" onClick={fillDemoAccount}>กรอกบัญชีตัวอย่าง</button>
          </div>
          <p className="auth-disclaimer">ระบบต้นแบบสำหรับสาธิต ข้อมูลบัญชีและการยืนยันตัวตนยังไม่เชื่อมต่อฐานข้อมูลจริง</p>
          <div className="auth-copyright">© 2026 One Journey · CAMT, Chiang Mai University</div>
        </section>
      </div>
    </main>
  );
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

function Sidebar({ account, onLogout }) {
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
        <button className="profile-button transition-colors duration-150" id="profileButton" type="button" onClick={onLogout} title="ออกจากระบบ">
          <span className="avatar">AD</span>
          <span className="profile-copy"><strong>{account.displayName}</strong><small>ออกจากระบบ</small></span>
          <span className="profile-chevron"><Icon name="logout" size={17} /></span>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ account, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <button className="icon-button mobile-menu" id="mobileMenu" type="button" aria-label="เปิดเมนู"><Icon name="menu" /></button>
        <span id="breadcrumbTitle" className="sr-only">หน้าหลัก</span>
      </div>
      <form className="global-search" id="globalSearch">
        <span aria-hidden="true"><Icon name="search" size={19} /></span>
        <input id="globalSearchInput" type="search" placeholder="ค้นหาสมาชิก กิจกรรม หลักสูตร หรือพาร์ทเนอร์" aria-label="ค้นหาทั่วทั้งระบบ" />
        <button type="submit">ค้นหา</button>
      </form>
      <div className="top-actions">
        <button className="icon-button notification-button" id="notificationButton" type="button" aria-label="การแจ้งเตือน"><Icon name="bell" /></button>
        <div className="account-menu-wrap">
          <button className="top-user" id="topUser" type="button" onClick={() => setMenuOpen(open => !open)} aria-expanded={menuOpen}>
            <span className="avatar small">AD</span>
            <span><strong>{account.displayName}</strong><small>วิทยาลัย CAMT</small></span>
            <b><Icon name="chevronDown" size={15} /></b>
          </button>
          {menuOpen && <div className="account-menu"><span className="account-menu-label">ลงชื่อเข้าใช้ด้วย</span><strong>{account.email}</strong><button type="button" onClick={onLogout}><Icon name="logout" size={15} /> ออกจากระบบ</button></div>}
        </div>
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
  const [account, setAccount] = useState(readSession);

  useEffect(() => {
    if (account) import('./legacy-app.js');
  }, [account]);

  const handleLogin = authenticatedAccount => setAccount(authenticatedAccount);
  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.location.hash = 'overview';
    window.location.reload();
  };

  if (!account) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="app-shell min-h-screen bg-journey-canvas text-journey-ink">
      <Sidebar account={account} onLogout={handleLogout} />
      <main className="main-area min-h-screen">
        <Topbar account={account} onLogout={handleLogout} />
        <section className="content" id="content" aria-live="polite" />
      </main>
      <div className="toast-region" id="toastRegion" aria-live="polite" aria-atomic="true" />
      <RecordDialog />
    </div>
  );
}
