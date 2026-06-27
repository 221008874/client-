import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ScrollReveal, AnimatedCounter, GlowOrb, MagneticHover, ParallaxFloat } from "../motion/MotionPrimitives";
import { heroLine, heroBadge, fadeUp, btnGlow } from "../motion/motionSystem";
import './Hero.css';

const heroLines = [
  { text: 'عيادتك في', className: 'line-1', isGradient: false },
  { text: 'أمان تام', className: 'line-2 gradient-text', isGradient: true },
  { text: 'مع ZIARA', className: 'line-3', isGradient: false },
];

const appointments = [
  { init: 'م', name: 'محمد أحمد', time: '10:00 ص', badge: 'قادم', color: 'teal' },
  { init: 'ن', name: 'نورا سعيد', time: '11:30 ص', badge: 'تأكيد', color: 'blue' },
  { init: 'خ', name: 'خالد علي', time: '1:00 م', badge: 'منتهي', color: 'muted' },
];

const avatarStyles = {
  teal: { background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' },
  blue: { background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' },
  muted: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' },
};

const badgeStyles = {
  teal: { background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' },
  blue: { background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' },
  muted: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' },
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 100, damping: 20 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="hero" id="hero">
      <GlowOrb size={800} color="rgba(6, 182, 212, 0.05)" position="topRight" />
      <GlowOrb size={500} color="rgba(56, 189, 248, 0.03)" position="bottomLeft" />

      <div className="container hero-container">
        {/* Left - Content */}
        <ScrollReveal className="hero-content">
          <ScrollReveal variant={heroBadge}>
            <div className="tag">
              <span className="tag-dot" />
              نظام إدارة عيادات ذكي
            </div>
          </ScrollReveal>

          <h1 className="hero-title">
            {heroLines.map((line, i) => (
              <motion.span
                key={i}
                className={line.className}
                custom={i}
                variants={heroLine}
                initial="hidden"
                animate="show"
              >
                {line.text}
                {i < heroLines.length - 1 && <br />}
              </motion.span>
            ))}
          </h1>

          <ScrollReveal variant={fadeUp} delay={0.3}>
            <p className="hero-subtitle">
              نظام متكامل لإدارة العيادات الطبية — يدير ملفات المرضى، المواعيد، الفواتير،
              والتقارير. حتى من غير إنترنت.
            </p>
          </ScrollReveal>

          <ScrollReveal variant={fadeUp} delay={0.4}>
            <div className="hero-offline-badge">
              <span className="offline-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                </svg>
              </span>
              يعمل بدون إنترنت — مزامنة تلقائية مع السحابة
            </div>
          </ScrollReveal>

          <ScrollReveal variant={fadeUp} delay={0.5}>
            <div className="hero-actions">
              <MagneticHover strength={0.15}>
                <motion.a
                  href="#download"
                  className="btn-primary hero-btn-main"
                  variants={btnGlow}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  تحميل مجاني
                </motion.a>
              </MagneticHover>
              <motion.a
                href="#features"
                className="btn-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
                variants={btnGlow}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                اكتشف المزيد
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant={fadeUp} delay={0.6}>
            <motion.div className="hero-stats" whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
              <div className="stat">
                <span className="stat-num"><AnimatedCounter target={500} suffix="+" /></span>
                <span className="stat-label">عيادة تثق بنا</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num"><AnimatedCounter target={50} suffix="K+" /></span>
                <span className="stat-label">موعد شهرياً</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num"><AnimatedCounter target={99.9} suffix="%" decimals={1} /></span>
                <span className="stat-label">وقت تشغيل</span>
              </div>
            </motion.div>
          </ScrollReveal>
        </ScrollReveal>

        {/* Right - Visual */}
        <ScrollReveal className="hero-visual" delay={0.3} direction="right">
          <motion.div
            className="device-mockup"
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            <div className="orbit-ring orbit-ring-1" />

            <motion.div
              className="screen"
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              initial="hidden"
              animate="show"
            >
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
                  {[
                    { icon: 'teal', num: '48', label: 'مراجع', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg> },
                    { icon: 'blue', num: '12', label: 'موعد اليوم', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                    { icon: 'gold', num: 'آمن', label: 'بدون نت', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/></svg> },
                  ].map(({ icon, num, label, svg }) => (
                    <motion.div
                      key={label}
                      className="ui-stat-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + Math.random() * 0.3 }}
                    >
                      <div className={`ui-stat-icon ${icon}`}>{svg}</div>
                      <div>
                        <div className="ui-stat-num">{num}</div>
                        <div className="ui-stat-lbl">{label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="ui-section-title">مواعيد اليوم</div>
                <div className="ui-appointments">
                  {appointments.map((apt, i) => (
                    <motion.div
                      key={i}
                      className="ui-apt-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
                    >
                      <div className="apt-avatar" style={avatarStyles[apt.color]}>{apt.init}</div>
                      <div className="apt-info">
                        <div className="apt-name">{apt.name}</div>
                        <div className="apt-meta">{apt.time}</div>
                      </div>
                      <span className="apt-badge" style={badgeStyles[apt.color]}>{apt.badge}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="sync-bar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="sync-indicator">
                    <span className="sync-dot" />
                    آخر مزامنة
                  </div>
                  <span className="sync-time">منذ دقيقة</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              className="float-card float-card-1"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className="float-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d18" strokeWidth="2.5"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>
              </div>
              <div>
                <div className="float-title">+40% كفاءة</div>
                <div className="float-sub">زيادة في الإنتاجية</div>
              </div>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>اسحب للأسفل</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}