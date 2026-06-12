import { ScrollReveal, StaggerParent } from "../motion/MotionPrimitives";
import './About.css';

export default function About() {
  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left - Visual */}
          <ScrollReveal className="about-visual">
            <div className="arch-diagram">
              {/* Central hub */}
              <div className="arch-center">
                <div className="arch-center-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M2 12l10 5 10-5" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="arch-center-label">ZIARA</div>
              </div>

              {/* Connection lines */}
              <svg className="arch-lines" viewBox="0 0 300 300" fill="none">
                <line x1="150" y1="150" x2="50" y2="50" stroke="rgba(0,212,170,0.2)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="150" x2="250" y2="50" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="150" x2="50" y2="250" stroke="rgba(0,212,170,0.2)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="150" x2="250" y2="250" stroke="rgba(245,158,11,0.2)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="150" y1="150" x2="150" y2="30" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" strokeDasharray="4 4"/>
              </svg>

              {/* Surrounding nodes */}
              <div className="arch-node arch-node-1">
                <span>🖥️</span>
                <div className="arch-node-label">برنامج ويندوز</div>
              </div>
              <div className="arch-node arch-node-2">
                <span>🌐</span>
                <div className="arch-node-label">حجز أونلاين</div>
              </div>
              <div className="arch-node arch-node-3">
                <span>☁️</span>
                <div className="arch-node-label">سحابة</div>
              </div>
              <div className="arch-node arch-node-4">
                <span>📱</span>
                <div className="arch-node-label">منصة زيارة</div>
              </div>
              <div className="arch-node arch-node-5">
                <span>🔄</span>
                <div className="arch-node-label">مزامنة</div>
              </div>

              {/* Rotating rings */}
              <div className="arch-ring arch-ring-1" />
              <div className="arch-ring arch-ring-2" />
            </div>
          </ScrollReveal>

          {/* Right - Text */}
          <ScrollReveal className="about-text" delay={0.15}>
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              عن النظام
            </div>
            <h2 className="section-title">
              زيارة هو نظام ذكي
              <br />
              <span className="gradient-text">لإدارة العيادات</span>
            </h2>
            <p className="about-desc">
              زيارة هو نظام ذكي لإدارة العيادات الطبية تم تصميمه ليوفر تجربة سهلة وسريعة
              للأطباء والسكرتارية والمرضى.
            </p>

            <StaggerParent className="about-pillars" stagger={0.06}>
              {[
                {
                  icon: '🖥️',
                  title: 'برنامج سطح المكتب',
                  desc: 'تطبيق ويندوز متكامل يعمل محلياً بدون حاجة مستمرة للإنترنت',
                  color: 'teal',
                },
                {
                  icon: '🌐',
                  title: 'منصة حجز أونلاين',
                  desc: 'استقبل حجوزات المرضى عبر منصة زيارة Community المتصلة تلقائياً',
                  color: 'blue',
                },
                {
                  icon: '🔄',
                  title: 'مزامنة تلقائية',
                  desc: 'تزامن فوري بين التطبيق المحلي والسحابة فور عودة الاتصال',
                  color: 'gold',
                },
                {
                  icon: '🔑',
                  title: 'نظام تراخيص وإدارة',
                  desc: 'إدارة سحابية للاشتراكات مع تفعيل سهل ودعم متعدد الأجهزة',
                  color: 'teal',
                },
              ].map(({ icon, title, desc, color }, i) => (
                <div key={i} className={`pillar`}>
                  <div className={`pillar-icon pillar-${color}`}>{icon}</div>
                  <div className="pillar-content">
                    <div className="pillar-title">{title}</div>
                    <div className="pillar-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </StaggerParent>

            <a href="#download" className="btn-primary about-cta">
              ابدأ تجربتك المجانية
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}