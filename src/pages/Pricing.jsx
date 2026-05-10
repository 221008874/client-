import { useState } from 'react';
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
      <div className="pricing-bg" aria-hidden="true">
        <div className="pricing-orb" />
      </div>

      <div className="container">
        <div className="pricing-header animate-on-scroll" style={{ textAlign: 'center' }}>
          <div className="tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Toggle */}
          <div className="billing-toggle">
            <span className={!annual ? 'active' : ''}>شهري</span>
            <button
              className={`toggle-btn ${annual ? 'annual' : ''}`}
              onClick={() => setAnnual(!annual)}
              aria-label="تبديل فترة الفاتورة"
            >
              <span className="toggle-thumb" />
            </button>
            <span className={annual ? 'active' : ''}>
              سنوي
              <span className="save-badge">وفّر 20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card animate-on-scroll delay-${i + 1} ${plan.popular ? 'popular' : ''} plan-${plan.color}`}
            >
              {plan.popular && (
                <div className="popular-badge">⭐ الأكثر شيوعًا</div>
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
                      <span className="amount">{annual ? Math.round(plan.price * 0.8) : plan.price}</span>
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
                  <li key={j} className="plan-feature">
                    <span className={`check check-${plan.color}`}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#download"
                className={`plan-cta ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="pricing-footer animate-on-scroll">
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>جرّب مجانًا لمدة 30 يوم بدون بيانات بنكية</span>
          </div>
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>دعم فني طوال فترة الاشتراك</span>
          </div>
          <div className="pricing-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>ترقية سهلة في أي وقت</span>
          </div>
        </div>
      </div>
    </section>
  );
}