import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Grid background */}
      <div className="hero-grid" aria-hidden="true">
        <div className="grid-lines-h" />
        <div className="grid-lines-v" />
      </div>

      {/* Glowing orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="container hero-container">
        {/* Left - Content */}
        <div className="hero-content animate-fade-up">
          <div className="tag">
            <span className="tag-dot" />
            نظام إدارة عيادات ذكي
          </div>

          <h1 className="hero-title">
            <span className="line-1">عيادتك في</span>
            <br />
            <span className="line-2 gradient-text">أمان تام</span>
            <br />
            <span className="line-3">مع ZIARA</span>
          </h1>

          <p className="hero-subtitle">
            نظام متكامل لإدارة العيادات الطبية — يدير ملفات المرضى، المواعيد، الفواتير،
            والتقارير. حتى من غير إنترنت.
          </p>

          <div className="hero-offline-badge">
            <span className="offline-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
              </svg>
            </span>
            يعمل بدون إنترنت — مزامنة تلقائية مع السحابة
          </div>

          <div className="hero-actions">
            <a href="#download" className="btn-primary hero-btn-main">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              تحميل مجاني
            </a>
            <a href="#features" className="btn-secondary">
              اكتشف المزيد
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">عيادة تثق بنا</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">50K+</span>
              <span className="stat-label">موعد شهرياً</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">99.9%</span>
              <span className="stat-label">وقت تشغيل</span>
            </div>
          </div>
        </div>

        {/* Right - Visual */}
        <div className="hero-visual animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="device-mockup">
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />
            <div className="orbit-ring orbit-ring-3" />

            <div className="screen">
              <div className="screen-header">
                <div className="screen-dots">
                  <span /><span /><span />
                </div>
                <div className="screen-title">ZIARA Smart Clinic</div>
                <div className="screen-status">
                  <span className="status-dot" />
                  متصل
                </div>
              </div>

              <div className="screen-body">
                <div className="ui-stats-row">
                  <div className="ui-stat-card">
                    <div className="ui-stat-icon teal">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                    </div>
                    <div>
                      <div className="ui-stat-num">48</div>
                      <div className="ui-stat-lbl">مراجع</div>
                    </div>
                  </div>
                  <div className="ui-stat-card">
                    <div className="ui-stat-icon blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <div className="ui-stat-num">12</div>
                      <div className="ui-stat-lbl">موعد اليوم</div>
                    </div>
                  </div>
                  <div className="ui-stat-card">
                    <div className="ui-stat-icon gold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/></svg>
                    </div>
                    <div>
                      <div className="ui-stat-num">آمن</div>
                      <div className="ui-stat-lbl">بدون نت</div>
                    </div>
                  </div>
                </div>

                <div className="ui-section-title">مواعيد اليوم</div>
                <div className="ui-appointments">
                  {[
                    { init: 'م', name: 'محمد أحمد', time: '10:00 ص', badge: 'قادم', color: 'teal' },
                    { init: 'ن', name: 'نورا سعيد', time: '11:30 ص', badge: 'تأكيد', color: 'blue' },
                    { init: 'خ', name: 'خالد علي', time: '1:00 م', badge: 'منتهي', color: 'rgba(255,255,255,0.3)' },
                  ].map((apt, i) => (
                    <div key={i} className="ui-apt-item" style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
                      <div className="apt-avatar" style={{ background: apt.color === 'teal' ? 'rgba(0,212,170,0.2)' : apt.color === 'blue' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.1)', color: apt.color === 'teal' ? 'var(--accent-teal)' : apt.color === 'blue' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                        {apt.init}
                      </div>
                      <div className="apt-info">
                        <div className="apt-name">{apt.name}</div>
                        <div className="apt-meta">{apt.time}</div>
                      </div>
                      <span className="apt-badge" style={{ background: apt.color === 'teal' ? 'rgba(0,212,170,0.15)' : apt.color === 'blue' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.08)', color: apt.color === 'teal' ? 'var(--accent-teal)' : apt.color === 'blue' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                        {apt.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="sync-bar">
                  <div className="sync-indicator">
                    <span className="sync-dot" />
                    آخر مزامنة
                  </div>
                  <span className="sync-time">منذ دقيقة</span>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="float-card float-card-1">
              <div className="float-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d18" strokeWidth="2.5"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>
              </div>
              <div>
                <div className="float-title">+40% كفاءة</div>
                <div className="float-sub">زيادة في الإنتاجية</div>
              </div>
            </div>
            <div className="float-card float-card-2">
              <div className="float-icon offline-icon-float">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d18" strokeWidth="2.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9"/></svg>
              </div>
              <div>
                <div className="float-title">بدون إنترنت</div>
                <div className="float-sub">مزامنة تلقائية</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>اسحب للأسفل</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
