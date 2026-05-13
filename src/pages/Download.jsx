import { useState } from 'react';
import './Download.css';

const DOWNLOADS = [
  { label: 'Ziara.DR.zip', url: 'https://github.com/221008874/client-/releases/download/Ziara/Ziara.DR.zip' },
  { label: 'Ziara.SEC.zip', url: 'https://github.com/221008874/client-/releases/download/Ziara/Ziara.SEC.zip' },
  { label: 'Ziara.Server.zip', url: 'https://github.com/221008874/client-/releases/download/Ziara/Ziara.Server.zip' },
];

export default function Download() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadAll = () => {
    if (downloading) return;
    setDownloading(true);
    DOWNLOADS.forEach(({ url }) => {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    });
    setTimeout(() => setDownloading(false), 3500);
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
              متوفر لويندوز مع تثبيت سهل وسريع. ابدأ تشغيله في دقائق.
            </p>

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
              <button onClick={handleDownloadAll} className="btn-primary dl-btn-main" disabled={downloading}>
                {downloading ? (
                  <>
                    <svg className="dl-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                    </svg>
                    جاري التحميل…
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    تحميل البرنامج
                    <span className="dl-badge">v2.5.0</span>
                  </>
                )}
              </button>
              
              <a href="/guide" className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                دليل الاستخدام
              </a>
            </div>

            <div className="dl-meta animate-on-scroll delay-3">
              {downloading ? (
                <span style={{ color: 'var(--accent-teal)' }}>🔄 يتم تجهيز التحميل… (DR · SEC · Server)</span>
              ) : (
                <>
                  <span>📦 3 ملفات: DR · SEC · Server</span>
                  <span className="dl-sep">·</span>
                  <span>🔄 آخر تحديث: مايو 2025</span>
                  <span className="dl-sep">·</span>
                  <span>✅ آمن ومرخص</span>
                </>
              )}
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