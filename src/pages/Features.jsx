import './Features.css';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'إدارة المرضى',
    desc: 'سجّل بيانات المرضى والتاريخ الطبي بسهولة مع بحث سريع وتنظيم كامل لملفاتهم.',
    color: 'teal',
    tag: 'أساسي',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'إدارة المواعيد',
    desc: 'نظّم الحجوزات اليومية وتابع حالات المواعيد بدون ورق أو أخطاء.',
    color: 'blue',
    tag: 'ذكي',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'حجز أونلاين',
    desc: 'استقبل حجوزات المرضى من خلال منصة زيارة Community وربطها تلقائيًا بالعيادة.',
    color: 'teal',
    tag: 'جديد',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'يعمل بدون إنترنت',
    desc: 'حتى لو الإنترنت فصل، العيادة تفضل شغالة والمزامنة تتم تلقائيًا عند رجوع الاتصال.',
    color: 'gold',
    tag: 'حصري',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'تقارير وملفات PDF',
    desc: 'أنشئ تقارير وملفات Excel وPDF بسهولة لمتابعة شغل العيادة بشكل احترافي.',
    color: 'blue',
    tag: 'تحليل',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'نسخ احتياطي تلقائي',
    desc: 'حافظ على بيانات العيادة بأمان مع النسخ الاحتياطي التلقائي والاسترجاع الفوري.',
    color: 'teal',
    tag: 'آمن',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'دعم العربية والإنجليزية',
    desc: 'واجهة سهلة تدعم العربي والإنجليزي بالكامل مع تصميم مريح للعين.',
    color: 'gold',
    tag: 'متعدد اللغات',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'نظام تراخيص SaaS',
    desc: 'إدارة سحابية للتراخيص مع تفعيل سهل ودعم متعدد الأجهزة وتحديثات تلقائية.',
    color: 'blue',
    tag: 'مرن',
  },
];

export default function Features() {
  return (
    <section className="features section-padding" id="features">
      {/* Background decoration */}
      <div className="features-bg" aria-hidden="true">
        <div className="features-orb" />
      </div>

      <div className="container">
        <div className="features-header animate-on-scroll">
          <div className="tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            المميزات
          </div>
          <h2 className="section-title">
            كل حاجة محتاجها
            <br />
            <span className="gradient-text">في نظام واحد</span>
          </h2>
          <p className="section-subtitle">
            من الحجز للتقارير… كل حاجة مترتبة. نظام متكامل صُمّم خصيصًا للعيادات المصرية.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`feature-card animate-on-scroll delay-${(i % 4) + 1}`}
            >
              <div className={`feat-icon-wrap feat-icon-${feat.color}`}>
                {feat.icon}
                <div className={`feat-icon-glow feat-glow-${feat.color}`} />
              </div>
              <div className="feat-content">
                <div className="feat-top">
                  <h3 className="feat-title">{feat.title}</h3>
                  <span className={`feat-tag feat-tag-${feat.color}`}>{feat.tag}</span>
                </div>
                <p className="feat-desc">{feat.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}