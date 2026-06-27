import { motion } from "motion/react";
import { ScrollReveal, StaggerParent, AnimatedCounter, GlowOrb } from "../motion/MotionPrimitives";
import './Trust.css';

const trustPoints = [
  { icon: '⚡', title: 'يعمل بدون إنترنت', desc: 'حتى في أسوأ الظروف، العيادة شغالة' },
  { icon: '🇪🇬', title: 'مصمم للسوق المصري', desc: 'يدعم اللغة العربية بالكامل' },
  { icon: '🏥', title: 'للعيادات الصغيرة والكبيرة', desc: 'مرن ويتناسب مع كل حجم' },
  { icon: '🔐', title: 'أمان وخصوصية', desc: 'بيانات المرضى محمية بالكامل' },
  { icon: '🔄', title: 'مزامنة تلقائية', desc: 'حجز أونلاين متزامن مع العيادة' },
  { icon: '📞', title: 'دعم فني متواصل', desc: 'فريق دعم متخصص 24/7' },
];

const stats = [
  { num: 500, suffix: '+', label: 'عيادة تثق بنا', color: 'teal' },
  { num: 50, suffix: 'K+', label: 'موعد تم تنظيمه', color: 'blue' },
  { num: 99.9, suffix: '%', label: 'وقت تشغيل', color: 'gold' },
  { num: 4.9, suffix: '★', label: 'تقييم المستخدمين', color: 'teal' },
];

export default function Trust() {
  return (
    <section className="trust section-padding">
      <GlowOrb size={500} color="rgba(6, 182, 212, 0.03)" position="topLeft" />

      <div className="container">
        {/* Stats band */}
        <ScrollReveal className="stats-band">
          <div className="stats-inner">
            {stats.map(({ num, suffix, label, color }, i) => (
              <motion.div
                key={i}
                className={`band-stat band-stat-${color}`}
                whileHover={{ background: 'rgba(6, 182, 212, 0.04)' }}
              >
                <div className="band-num">
                  <AnimatedCounter target={num} suffix={suffix} decimals={num % 1 === 0 ? 0 : 1} />
                </div>
                <div className="band-label">{label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="trust-content">
          <ScrollReveal className="trust-text">
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              لماذا ZIARA؟
            </div>
            <h2 className="section-title">
              مصمم للعيادات
              <br />
              <span className="gradient-text">الحقيقية</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 36, fontSize: '1.05rem' }}>
              كتير من العيادات المصرية بتعاني من ضعف الإنترنت، الأنظمة الورقية،
              وأدوات SaaS غير مستقرة. ZIARA جاي يحل كل ده.
            </p>
            <StaggerParent className="trust-points" stagger={0.05}>
              {trustPoints.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  className="trust-point"
                  whileHover={{
                    y: -3,
                    borderColor: 'rgba(6, 182, 212, 0.2)',
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  <div className="trust-icon">{icon}</div>
                  <div>
                    <div className="trust-point-title">{title}</div>
                    <div className="trust-point-desc">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </StaggerParent>
          </ScrollReveal>

          <ScrollReveal className="trust-visual" delay={0.15} direction="right">
            <motion.div
              className="trust-card-stack"
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            >
              <div className="trust-main-card">
                <div className="trust-card-header">
                  <div className="trust-avatar">
                    <span>د</span>
                  </div>
                  <div>
                    <div className="trust-doc-name">د. محمد أحمد</div>
                    <div className="trust-doc-spec">طب عام · القاهرة</div>
                  </div>
                  <div className="trust-verified">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01" stroke="#060d18" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    موثوق
                  </div>
                </div>
                <div className="trust-quote">
                  "ZIARA غيّر طريقة إدارة عيادتي بالكامل. حتى لما النت بيقطع، كل حاجة شغالة والمرضى مش بيحسوا بفرق."
                </div>
                <div className="trust-stars">★★★★★</div>

                <div className="trust-metrics">
                  {[
                    { val: '+40%', lbl: 'كفاءة العيادة', cls: 'teal' },
                    { val: '-60%', lbl: 'وقت الإدارة', cls: 'blue' },
                    { val: '0', lbl: 'أخطاء مواعيد', cls: 'gold' },
                  ].map(({ val, lbl, cls }) => (
                    <div key={lbl} className="metric">
                      <div className={`metric-val ${cls}`}>{val}</div>
                      <div className="metric-lbl">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}