import { motion } from "motion/react";
import { ScrollReveal, StaggerParent, GlowOrb, MagneticHover } from "../motion/MotionPrimitives";
import './Footer.css';

export default function Footer() {
  const links = {
    المنتج: ['المميزات', 'الأسعار', 'التحميل', 'التحديثات'],
    الدعم: ['دليل الاستخدام', 'الأسئلة الشائعة', 'تواصل معنا', 'الدعم الفني'],
    الشركة: ['عن زيارة', 'المدونة', 'سياسة الخصوصية', 'شروط الاستخدام'],
  };

  return (
    <>
      {/* CTA Section */}
      <section className="cta-section">
        <GlowOrb size={800} color="rgba(6, 182, 212, 0.04)" position="center" />
        <div className="container">
          <ScrollReveal>
            <div className="cta-box">
              <div className="tag cta-tag">
                <span style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  marginLeft: 8,
                  boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)',
                }} />
                ابدأ اليوم
              </div>
              <h2 className="cta-title">
                ابدأ تطوير عيادتك
                <br />
                <span className="gradient-text">اليوم</span>
              </h2>
              <p className="cta-desc">
                نظام بسيط وسريع يساعدك تدير العيادة بشكل احترافي.
                <br />
                جرّب مجانًا 30 يوم بدون بيانات بنكية.
              </p>
              <div className="cta-actions">
                <MagneticHover strength={0.12}>
                  <motion.a
                    href="#download"
                    className="btn-primary cta-btn-main"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    ابدأ الآن مجانًا
                  </motion.a>
                </MagneticHover>
                <motion.a
                  href="#"
                  className="btn-secondary"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  اطلب نسخة تجريبية
                </motion.a>
              </div>
              <div className="cta-trust">
                <span>✓ بدون بطاقة بنكية</span>
                <span>✓ تثبيت في دقيقتين</span>
                <span>✓ دعم فوري</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12l10 5 10-5" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="footer-logo-text">Zeyara</span>
              </div>
              <p className="footer-brand-desc">
                نظام متكامل لإدارة العيادات والحجوزات الطبية. مصمم للسوق المصري.
              </p>
              <div className="footer-socials">
                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    className="social-link"
                    aria-label={s}
                    whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="social-icon-placeholder" />
                  </motion.a>
                ))}
              </div>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/></svg>
                  <span>01114811612</span>
                </div>
                <div className="contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>bedoboda22222@gmail.com</span>
                </div>
              </div>
            </div>

            {Object.entries(links).map(([section, items]) => (
              <div key={section} className="footer-col">
                <div className="footer-col-title">{section}</div>
                <ul className="footer-links">
                  {items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <a href="#" className="footer-link">{item}</a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-line" />
            <div className="footer-bottom-content">
              <p className="footer-copy">© 2025 Zeyara Clinic. جميع الحقوق محفوظة.</p>
              <div className="footer-badges">
                <div className="footer-badge">
                  <span className="badge-dot" />
                  Windows 10+
                </div>
                <div className="footer-badge">
                  <span className="badge-dot badge-dot-blue" />
                  مصنوع في مصر 🇪🇬
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}