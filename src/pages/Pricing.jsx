import { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal, MotionCard } from "../motion/MotionPrimitives";
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    nameAr: 'المبتدئ',
    desc: 'للعيادات الصغيرة والأطباء المنفردين',
    price: 700,
    period: 'شهريًا',
    color: 'teal',
    features: [
      'إدارة ملفات المرضى',
      'جدول المواعيد',
      'تقارير أساسية',
      'نسخ احتياطي يومي',
      'دعم عبر البريد',
      'جهاز واحد',
    ],
    cta: 'ابدأ الآن',
    popular: false,
  },
  {
    name: 'Professional',
    nameAr: 'الاحترافي',
    desc: 'للعيادات المتوسطة والمراكز الطبية',
    price: 1000,
    period: 'شهريًا',
    color: 'blue',
    features: [
      'كل مميزات المبتدئ',
      'حجز أونلاين عبر زيارة',
      'مزامنة تلقائية',
      'تقارير Excel وPDF',
      'بوابة الدكتور',
      'دعم هاتفي',
      '3 أجهزة',
    ],
    cta: 'الأشهر',
    popular: true,
  },
  {
    name: 'Enterprise',
    nameAr: 'المؤسسي',
    desc: 'للمراكز الطبية الكبيرة والمستشفيات',
    price: null,
    period: 'تسعير مخصص',
    color: 'gold',
    features: [
      'كل مميزات الاحترافي',
      'أجهزة غير محدودة',
      'تخصيص كامل',
      'سيرفر محلي مخصص',
      'تدريب الفريق',
      'دعم VIP 24/7',
      'SLA مضمون',
    ],
    cta: 'تواصل معنا',
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="pricing section-padding" id="pricing">
      <div className="container">
        <ScrollReveal className="pricing-header" style={{ textAlign: 'center' }}>
          <div className="tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            الأسعار
          </div>
          <h2 className="section-title">
            اختار الباقة
            <br />
            <span className="gradient-text">المناسبة لعيادتك</span>
          </h2>
          <p className="section-subtitle">بدون عقود ملزمة. يمكنك الترقية أو الإلغاء في أي وقت.</p>

          <div className="billing-toggle">
            <span className={!annual ? 'active' : ''}>شهري</span>
            <motion.button
              className={`toggle-btn ${annual ? 'annual' : ''}`}
              onClick={() => setAnnual(!annual)}
              aria-label="تبديل فترة الفاتورة"
              whileTap={{ scale: 0.95 }}
            >
              <span className="toggle-thumb" />
            </motion.button>
            <span className={annual ? 'active' : ''}>
              سنوي
              <span className="save-badge">وفّر 20%</span>
            </span>
          </div>
        </ScrollReveal>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <motion.div
                className={`pricing-card ${plan.popular ? 'popular' : ''} plan-${plan.color}`}
                whileHover={
                  plan.popular
                    ? { y: -12, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                    : { y: -6, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                }
              >
                {plan.popular && (
                  <motion.div
                    className="popular-badge"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    ⭐ الأكثر شيوعًا
                  </motion.div>
                )}
                <div className="plan-header">
                  <div>
                    <div className="plan-name">{plan.nameAr}</div>
                    <div className="plan-name-en">{plan.name}</div>
                  </div>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-price-wrap">
                  {plan.price ? (
                    <>
                      <div className="plan-price">
                        <span className="currency">ج.م</span>
                        <motion.span
                          className="amount"
                          key={annual ? 'annual' : 'monthly'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {annual ? Math.round(plan.price * 0.8) : plan.price}
                        </motion.span>
                      </div>
                      <div className="plan-period">{plan.period}</div>
                    </>
                  ) : (
                    <div className="plan-custom">تواصل للتسعير</div>
                  )}
                </div>

                <div className="plan-divider" />

                <ul className="plan-features">
                  {plan.features.map((feat, j) => (
                    <motion.li
                      key={j}
                      className="plan-feature"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + j * 0.04 }}
                    >
                      <span className={`check check-${plan.color}`}>✓</span>
                      {feat}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#download"
                  className={`plan-cta ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="pricing-footer">
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>جرّب مجانًا لمدة 30 يوم بدون بيانات بنكية</span>
          </div>
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>دعم فني طوال فترة الاشتراك</span>
          </div>
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>ترقية سهلة في أي وقت</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}