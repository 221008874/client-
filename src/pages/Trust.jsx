import './Trust.css';

const trustPoints = [
  { icon: '⚡', title: 'يعمل بدون إنترنت', desc: 'حتى في أسوأ الظروف، العيادة شغالة' },
  { icon: '🇪🇬', title: 'مصمم للسوق المصري', desc: 'يدعم اللغة العربية بالكامل' },
  { icon: '🏥', title: 'للعيادات الصغيرة والكبيرة', desc: 'مرن ويتناسب مع كل حجم' },
  { icon: '🔐', title: 'أمان وخصوصية', desc: 'بيانات المرضى محمية بالكامل' },
  { icon: '🔄', title: 'مزامنة تلقائية', desc: 'حجز أونلاين متزامن مع العيادة' },
  { icon: '📞', title: 'دعم فني متواصل', desc: 'فريق دعم متخصص 24/7' },
];

export default function Trust() {
  return (
    <section className="trust section-padding">
      <div className="trust-bg" aria-hidden="true">
        <div className="trust-line trust-line-1" />
        <div className="trust-line trust-line-2" />
      </div>

      <div className="container">
        {/* Stats band */}
        <div className="stats-band animate-on-scroll">
          <div className="stats-inner">
            {[
              { num: '500+', label: 'عيادة تثق بنا', color: 'teal' },
              { num: '50K+', label: 'موعد تم تنظيمه', color: 'blue' },
              { num: '99.9%', label: 'وقت تشغيل', color: 'gold' },
              { num: '4.9★', label: 'تقييم المستخدمين', color: 'teal' },
            ].map(({ num, label, color }, i) => (
              <div key={i} className={`band-stat band-stat-${color}`}>
                <div className="band-num">{num}</div>
                <div className="band-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trust-content">
          <div className="trust-text animate-on-scroll">
            <div className="tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
            <div className="trust-points">
              {trustPoints.map(({ icon, title, desc }, i) => (
                <div key={i} className={`trust-point animate-on-scroll delay-${i + 1}`}>
                  <div className="trust-icon">{icon}</div>
                  <div>
                    <div className="trust-point-title">{title}</div>
                    <div className="trust-point-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="trust-visual animate-on-scroll delay-2">
            <div className="trust-card-stack">
              <div className="trust-card-bg trust-card-bg-2" />
              <div className="trust-card-bg trust-card-bg-1" />
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-teal)">
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
                  <div className="metric">
                    <div className="metric-val teal">+40%</div>
                    <div className="metric-lbl">كفاءة العيادة</div>
                  </div>
                  <div className="metric">
                    <div className="metric-val blue">-60%</div>
                    <div className="metric-lbl">وقت الإدارة</div>
                  </div>
                  <div className="metric">
                    <div className="metric-val gold">0</div>
                    <div className="metric-lbl">أخطاء مواعيد</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}