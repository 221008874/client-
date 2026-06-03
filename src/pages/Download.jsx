import { useState } from 'react';
import './Download.css';

const APPS = [
  { key: 'dr', icon: '🩺', label: 'Ziara DR', desc: 'تطبيق الطبيب — إدارة المرضى والمواعيد والتقارير' },
  { key: 'sec', icon: '📋', label: 'Ziara SEC', desc: 'تطبيق السكرتيرة — استقبال وإدارة طابور الانتظار' },
  { key: 'server', icon: '🖥️', label: 'Ziara Server', desc: 'السيرفر المركزي — يجب تشغيله أولاً' },
];

export default function Download() {
  const [checked, setChecked] = useState({ dr: true, sec: true, server: true });

  const toggle = (key) => setChecked((c) => ({ ...c, [key]: !c[key] }));

  const selected = APPS.filter((a) => checked[a.key]);
  const handleDownload = () => {
    if (selected.length === 0) return;
    const files = selected.map((a) => a.key).join(',');
    window.location.href = `/downloads?files=${files}`;
  };

  return (
    <section className="download section-padding" id="download">
      <div className="download-bg" aria-hidden="true">
        <div className="dl-orb-1" />
        <div className="dl-grid-overlay" />
      </div>

      <div className="container">
        <div className="download-wrapper">
          <div className="download-content animate-on-scroll">
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              تحميل البرنامج
            </div>
            <h2 className="section-title">
              حمّل برنامج
              <br />
              <span className="shimmer-text">ZIARA Smart Clinic</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
              اختر المكونات التي تريد تحميلها ثم اضغط التحميل.
            </p>

            <div className="app-checkboxes animate-on-scroll delay-1">
              {APPS.map((app) => (
                <label key={app.key} className={`app-checkbox ${checked[app.key] ? 'checked' : ''}`} onClick={() => toggle(app.key)}>
                  <div className="app-cb-display">
                    <span className={`cb-box ${checked[app.key] ? 'on' : ''}`}>
                      {checked[app.key] && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="app-cb-icon">{app.icon}</div>
                  <div className="app-cb-info">
                    <div className="app-cb-title">{app.label}</div>
                    <div className="app-cb-desc">{app.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="requirements animate-on-scroll delay-1">
              <div className="req-title">المتطلبات:</div>
              <ul className="req-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  Windows 10 أو أحدث
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  4 GB RAM على الأقل
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  اتصال إنترنت للمزامنة (اختياري)
                </li>
              </ul>
            </div>

            <div className="download-actions animate-on-scroll delay-2">
              <button onClick={handleDownload} className="btn-primary dl-btn-main" disabled={selected.length === 0}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                تحميل المحدد ({selected.length})
              </button>

              <a href="/guide" className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
                دليل الاستخدام
              </a>
            </div>

            <div className="dl-meta animate-on-scroll delay-3">
              <span>📦 {selected.length} ملف/ملفات محددة</span>
              <span className="dl-sep">·</span>
              <span>🔄 آخر تحديث: مايو 2025</span>
              <span className="dl-sep">·</span>
              <span>✅ آمن ومرخص</span>
            </div>
          </div>

          {/* What's included */}
          <div className="dl-includes animate-on-scroll delay-2">
            <div className="dl-includes-title">
              <span className="dl-check-icon">✓</span>
              ما يشمله البرنامج
            </div>
            <div className="dl-items">
              {[
                { icon: '🏥', title: 'برنامج إدارة العيادة', desc: 'كامل الميزات' },
                { icon: '📅', title: 'نظام الحجز والمواعيد', desc: 'ذكي وسريع' },
                { icon: '🔄', title: 'المزامنة التلقائية', desc: 'مع السحابة' },
                { icon: '📊', title: 'التقارير والإحصائيات', desc: 'PDF وExcel' },
                { icon: '💾', title: 'النسخ الاحتياطي', desc: 'تلقائي يومياً' },
                { icon: '🌐', title: 'ربط منصة زيارة', desc: 'حجز أونلاين' },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className={`dl-item animate-on-scroll delay-${i + 1}`}>
                  <div className="dl-item-icon">{icon}</div>
                  <div>
                    <div className="dl-item-title">{title}</div>
                    <div className="dl-item-desc">{desc}</div>
                  </div>
                  <div className="dl-item-check">✓</div>
                </div>
              ))}
            </div>

            <div className="support-links">
              <a href="#" className="support-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                تواصل مع الدعم
              </a>
              <a href="#" className="support-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                الأسئلة الشائعة
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
