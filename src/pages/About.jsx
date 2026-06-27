import { ScrollReveal, StaggerParent, GlowOrb, FloatingParticles } from "../motion/MotionPrimitives";
import { motion } from "motion/react";
import './About.css';

const nodes = [
  { icon: '🖥️', label: 'برنامج ويندوز', pos: 'arch-node-1' },
  { icon: '🌐', label: 'حجز أونلاين', pos: 'arch-node-2' },
  { icon: '☁️', label: 'سحابة', pos: 'arch-node-3' },
  { icon: '📱', label: 'منصة زيارة', pos: 'arch-node-4' },
  { icon: '🔄', label: 'مزامنة', pos: 'arch-node-5' },
];

const lineColors = [
  'rgba(6, 182, 212, 0.18)',
  'rgba(56, 189, 248, 0.18)',
  'rgba(6, 182, 212, 0.18)',
  'rgba(245, 158, 11, 0.15)',
  'rgba(56, 189, 248, 0.18)',
];

const lineEndpoints = [
  [150, 150, 56, 46],
  [150, 150, 244, 46],
  [150, 150, 56, 254],
  [150, 150, 244, 254],
  [150, 150, 150, 26],
];

export default function About() {
  return (
    <section className="about section-padding" id="about">
      <GlowOrb size={500} color="rgba(6, 182, 212, 0.04)" position="topLeft" />
      <GlowOrb size={400} color="rgba(56, 189, 248, 0.03)" position="bottomRight" />

      <div className="container">
        <div className="about-grid">
          {/* Left - Architecture Visual */}
          <ScrollReveal className="about-visual" direction="left">
            <div className="arch-diagram">
              <FloatingParticles count={5} />

              {/* Central hub */}
              <motion.div
                className="arch-center"
                whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="arch-center-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M2 12l10 5 10-5" stroke="#060d18" strokeWidth="2.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="arch-center-label">ZIARA</div>
              </motion.div>

              {/* Connection lines */}
              <svg className="arch-lines" viewBox="0 0 300 300" fill="none">
                {lineEndpoints.map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={lineColors[i]}
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>

              {/* Satellite nodes */}
              {nodes.map(({ icon, label, pos }, i) => (
                <motion.div
                  key={pos}
                  className={`arch-node ${pos}`}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.1, y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                >
                  <span>{icon}</span>
                  <div className="arch-node-label">{label}</div>
                </motion.div>
              ))}

              {/* Rotating rings */}
              <div className="arch-ring arch-ring-1" />
              <div className="arch-ring arch-ring-2" />
            </div>
          </ScrollReveal>

          {/* Right - Text Content */}
          <ScrollReveal className="about-text" delay={0.15}>
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

            <StaggerParent className="about-pillars" stagger={0.07}>
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
              ].map(({ icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  className="pillar"
                  whileHover={{ x: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                >
                  <div className={`pillar-icon pillar-${color}`}>{icon}</div>
                  <div className="pillar-content">
                    <div className="pillar-title">{title}</div>
                    <div className="pillar-desc">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </StaggerParent>

            <motion.a
              href="#download"
              className="btn-primary about-cta"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              ابدأ تجربتك المجانية
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}