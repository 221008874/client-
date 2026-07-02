import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, StaggerParent, GlowOrb, MagneticHover } from "../motion/MotionPrimitives";
import './Download.css';

const APPS = [
  { key: 'dr', icon: '🩺', label: 'Zeyara DR', desc: 'تطبيق الطبيب — إدارة المرضى والمواعيد والتقارير' },
  { key: 'sec', icon: '📋', label: 'Zeyara SEC', desc: 'تطبيق السكرتيرة — استقبال وإدارة طابور الانتظار' },
  { key: 'server', icon: '🖥️', label: 'Zeyara Server', desc: 'السيرفر المركزي — يجب تشغيله أولاً' },
];

const INCLUDES = [
  { icon: '🏥', title: 'برنامج إدارة العيادة', desc: 'كامل الميزات' },
  { icon: '📅', title: 'نظام الحجز والمواعيد', desc: 'ذكي وسريع' },
  { icon: '🔄', title: 'المزامنة التلقائية', desc: 'مع السحابة' },
  { icon: '📊', title: 'التقارير والإحصائيات', desc: 'PDF وExcel' },
  { icon: '💾', title: 'النسخ الاحتياطي', desc: 'تلقائي يومياً' },
  { icon: '🌐', title: 'ربط منصة زيارة', desc: 'حجز أونلاين' },
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
      <GlowOrb size={600} color="rgba(6, 182, 212, 0.035)" position="topRight" />
      <GlowOrb size={400} color="rgba(56, 189, 248, 0.025)" position="bottomLeft" />

      <div className="container">
        <div className="download-wrapper">
          {/* Left Column */}
          <ScrollReveal className="download-content">
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              تحميل البرنامج
            </div>

            <h2 className="section-title">
              حمّل برنامج
              <br />
              <span className="gradient-text">Zeyara Clinic</span>
            </h2>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.85,
              marginBottom: 36,
            }}>
              اختر المكونات التي تريد تحميلها ثم اضغط التحميل.
            </p>

            {/* App Checkboxes */}
            <ScrollReveal className="app-checkboxes" delay={0.1}>
              {APPS.map((app, i) => (
                <motion.label
                  key={app.key}
                  className={`app-checkbox ${checked[app.key] ? 'checked' : ''}`}
                  onClick={() => toggle(app.key)}
                  initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="app-cb-display">
                    <motion.div
                      className={`cb-box ${checked[app.key] ? 'on' : ''}`}
                      animate={checked[app.key] ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      <AnimatePresence>
                        {checked[app.key] && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <div className="app-cb-icon">{app.icon}</div>
                  <div className="app-cb-info">
                    <div className="app-cb-title">{app.label}</div>
                    <div className="app-cb-desc">{app.desc}</div>
                  </div>
                </motion.label>
              ))}
            </ScrollReveal>

            {/* Requirements */}
            <ScrollReveal className="requirements" delay={0.15}>
              <div className="req-title">المتطلبات</div>
              <ul className="req-list">
                {[
                  'Windows 10 أو أحدث',
                  '4 GB RAM على الأقل',
                  'اتصال إنترنت للمزامنة (اختياري)',
                ].map((req, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    {req}
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal className="download-actions" delay={0.2}>
              <MagneticHover strength={0.15}>
                <motion.button
                  onClick={handleDownload}
                  className="btn-primary dl-btn-main"
                  disabled={selected.length === 0}
                  whileHover={!selected.length ? {} : { scale: 1.03, y: -2 }}
                  whileTap={!selected.length ? {} : { scale: 0.97 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  تحميل المحدد ({selected.length})
                </motion.button>
              </MagneticHover>

              <motion.a
                href="/guide"
                className="btn-secondary"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
                دليل الاستخدام
              </motion.a>
            </ScrollReveal>

            {/* Meta */}
            <ScrollReveal className="dl-meta" delay={0.3}>
              <span>📦 {selected.length} ملف/ملفات محددة</span>
              <span className="dl-sep">·</span>
              <span>🔄 آخر تحديث: مايو 2025</span>
              <span className="dl-sep">·</span>
              <span>✅ آمن ومرخص</span>
            </ScrollReveal>
          </ScrollReveal>

          {/* Right Column — What's Included */}
          <ScrollReveal className="dl-includes" delay={0.25} direction="right">
            <div className="dl-includes-title">
              <span className="dl-check-icon">✓</span>
              ما يشمله البرنامج
            </div>

            <StaggerParent className="dl-items" stagger={0.06}>
              {INCLUDES.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="dl-item"
                  whileHover={{
                    x: -4,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  <div className="dl-item-icon">{icon}</div>
                  <div>
                    <div className="dl-item-title">{title}</div>
                    <div className="dl-item-desc">{desc}</div>
                  </div>
                  <div className="dl-item-check">✓</div>
                </motion.div>
              ))}
            </StaggerParent>

            <div className="support-links">
              <a href="#" className="support-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                تواصل مع الدعم
              </a>
              <a href="#" className="support-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                الأسئلة الشائعة
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}