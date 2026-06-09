import { useState, useEffect, useCallback } from 'react';
import './Guide.css';

/* ─── Data ─────────────────────────────────── */
const SECTIONS = [
  { id: 'overview',  label: 'نظرة عامة' },
  { id: 'start',     label: 'كيف تبدأ' },
  { id: 'server',    label: 'Ziara Server' },
  { id: 'dr',        label: 'Ziara DR (الطبيب)' },
  { id: 'sec',       label: 'Ziara SEC (السكرتيرة)' },
  { id: 'community', label: 'الحجز الأونلاين' },
  { id: 'faq',       label: 'الأسئلة الشائعة' },
];

const FAQ_ITEMS = [
  {
    icon: '❓',
    q: 'هل أحتاج إلى تثبيت Java أو أي برنامج إضافي؟',
    a: 'لا، البرنامج يأتي بكل ما يحتاجه. كل ما عليك فعله هو فك الضغط والتشغيل مباشرةً.',
  },
  {
    icon: '🌐',
    q: 'هل يعمل البرنامج بدون إنترنت؟',
    a: 'نعم! يعمل البرنامج بشكل كامل دون إنترنت. الإنترنت مطلوب فقط لمزامنة الحجوزات الأونلاين مع موقع Ziara Community.',
  },
  {
    icon: '💻',
    q: 'كم جهازاً يمكن ربطه بالسيرفر؟',
    a: 'يمكن ربط عدة أجهزة في نفس الشبكة. مثلاً: جهاز الطبيب + جهاز السكرتيرة في العيادة، وكلاهما يتصل بـ Ziara Server.',
  },
  {
    icon: '🔒',
    q: 'هل بياناتي آمنة؟',
    a: 'نعم، بياناتك تُحفظ على جهازك المحلي، ولا يمكن لأي طرف خارجي الوصول إليها. الاتصالات بين التطبيقات تستخدم تشفير JWT.',
  },
  {
    icon: '📦',
    q: 'كيف أقوم بنسخ احتياطية للبيانات؟',
    a: 'البرنامج يُنشئ تلقائياً ملفات Excel احتياطية عند كل إغلاق. يمكنك أيضاً الدخول على H2 Console من السيرفر لتصدير قاعدة البيانات كاملةً.',
  },
  {
    icon: '🖨️',
    q: 'كيف أطبع الوصفات الطبية والتقارير؟',
    a: 'من تطبيق الطبيب (DR)، بعد كتابة الوصفة أو التشخيص، اضغط على "طباعة" وسيُنشئ البرنامج ملف PDF جاهزاً للطباعة تلقائياً.',
  },
  {
    icon: '🔧',
    q: 'ماذا أفعل إذا لم يتصل التطبيق بالسيرفر؟',
    a: 'تأكد أولاً أن Ziara Server يعمل وتظهر نافذته. ثم تحقق من IP والبورت في إعدادات التطبيق، وتأكد أن كلا الجهازين على نفس شبكة الواي فاي.',
  },
];

/* ─── Sub-components ───────────────────────── */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(v => !v)}>
        <div className="faq-q-icon">{item.icon}</div>
        <h4>{item.q}</h4>
        <span className="faq-chevron">▼</span>
      </button>
      {open && (
        <div className="faq-answer">
          <p>{item.a}</p>
        </div>
      )}
    </div>
  );
}

function StepRow({ num, title, children, isLast }) {
  return (
    <div className="step-row">
      <div className="step-left">
        <div className="step-dot">{num}</div>
        {!isLast && <div className="step-line" />}
      </div>
      <div className="step-content">
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────── */
export default function Guide() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id); 
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="guide-page">
      {/* Background */}
      <div className="guide-bg" aria-hidden="true">
        <div className="guide-orb-1" />
        <div className="guide-orb-2" />
        <div className="guide-grid" />
      </div>

      {/* ── Hero ── */}
      <div className="guide-hero">
        <div className="container">
          <div className="guide-hero-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
            دليل الاستخدام
          </div>

          <h1 className="guide-hero-title">
            كيف تستخدم
            <br />
            <span>ZIARA Smart Clinic</span>
          </h1>

          <p className="guide-hero-subtitle">
            دليل شامل وبسيط يشرح كل خطوة بوضوح — مُصمَّم لمن لا يملك خبرة تقنية.
          </p>

          <div className="guide-jump-nav">
            {SECTIONS.map(s => (
              <button key={s.id} className="jump-btn" onClick={() => scrollTo(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className="guide-layout">

          {/* Sticky TOC */}
          <aside className="guide-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">محتوى الدليل</div>
              <nav className="sidebar-nav">
                {SECTIONS.map((s, i) => (
                  <button
                    key={s.id}
                    className={`sidebar-link ${activeSection === s.id ? 'active' : ''}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    <span className="sl-num">{i + 1}</span>
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="sidebar-tip">
                <p>💡 <strong>نصيحة:</strong> ابدأ دائماً بتشغيل <strong>السيرفر</strong> قبل أي تطبيق آخر.</p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="guide-content">

            {/* ═══ SECTION 1: Overview ═══ */}
            <section className="guide-section" id="overview">
              <div className="section-header">
                <div className="section-num">1</div>
                <div className="section-title-wrap">
                  <h2>ما هو برنامج Ziara؟</h2>
                  <p>نظرة عامة على مكونات البرنامج</p>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>
                برنامج Ziara هو نظام متكامل لإدارة العيادات الطبية. يتكون من أربعة أجزاء تعمل معاً لتوفير تجربة إدارة سلسة للطبيب والسكرتيرة والمرضى.
              </p>

              <div className="start-order">
                {[
                  { icon: '🖥️', name: 'Ziara Server', desc: 'قلب النظام — يُشغَّل أولاً ويربط كل الأجزاء ببعض', badge: 'إلزامي', cls: 'order-first' },
                  { icon: '🩺', name: 'Ziara DR', desc: 'تطبيق الطبيب — إدارة المرضى والمواعيد والتقارير الطبية', badge: '', cls: '' },
                  { icon: '📋', name: 'Ziara SEC', desc: 'تطبيق السكرتيرة — استقبال المرضى وإدارة طابور الانتظار', badge: '', cls: '' },
                  { icon: '🌐', name: 'Ziara Community', desc: 'موقع الحجز الإلكتروني للمرضى — اختياري', badge: '', cls: '' },
                ].map((item, i, arr) => (
                  <div key={i}>
                    <div className={`order-card ${item.cls}`}>
                      <div className="order-step-badge">{i + 1}</div>
                      <div className="order-icon">{item.icon}</div>
                      <div className="order-info">
                        <h4>{item.name}</h4>
                        <p>{item.desc}</p>
                      </div>
                      {item.badge && <span className="app-badge badge-required">{item.badge}</span>}
                      <span className="order-arrow">←</span>
                    </div>
                    {i < arr.length - 1 && <div className="connector-line" />}
                  </div>
                ))}
              </div>
            </section>

            {/* ═══ SECTION 2: Start Order ═══ */}
            <section className="guide-section" id="start">
              <div className="section-header">
                <div className="section-num">2</div>
                <div className="section-title-wrap">
                  <h2>كيف تبدأ في أول مرة</h2>
                  <p>الترتيب الصحيح لتشغيل النظام</p>
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-body">
                  <div className="steps-list">
                    <StepRow num="1" title="حمّل الملفات الثلاثة">
                      <p>من صفحة التحميل، اضغط "تحميل البرنامج" للحصول على الملفات الثلاثة: <strong style={{ color: 'var(--text-primary)' }}>Ziara Server</strong> و<strong style={{ color: 'var(--text-primary)' }}>Ziara DR</strong> و<strong style={{ color: 'var(--text-primary)' }}>Ziara SEC</strong>.</p>
                    </StepRow>
                    <StepRow num="2" title="فك ضغط الملفات">
                      <p>انقر بزر الماوس الأيمن على كل ملف ZIP ← اختر "استخراج هنا" أو "Extract Here". يُفضَّل استخراجها في مجلد مثل <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4, fontSize: '0.8rem' }}>C:\Ziara</code>.</p>
                    </StepRow>
                    <StepRow num="3" title="شغّل السيرفر أولاً">
                      <p>ادخل على مجلد Ziara Server وانقر مرتين على <strong style={{ color: 'var(--text-primary)' }}>Ziara Server.exe</strong>. سيفتح نافذة تحكم. اضغط <strong style={{ color: 'var(--accent)' }}>Start Server</strong>.</p>
                      <div className="step-tip">
                        <span className="tip-icon">💡</span>
                        <p>لاحظ الـ <strong>IP</strong> والـ <strong>Port</strong> المكتوبين في نافذة السيرفر — ستحتاجهم في الخطوة التالية.</p>
                      </div>
                    </StepRow>
                    <StepRow num="4" title="شغّل تطبيق الطبيب">
                      <p>انقر مرتين على <strong style={{ color: 'var(--text-primary)' }}>Ziara DR.exe</strong>. في أول مرة ستُطلب منك تسجيل حساب الطبيب المسؤول.</p>
                    </StepRow>
                    <StepRow num="5" title="اضبط الاتصال بالسيرفر">
                      <p>من داخل تطبيق الطبيب، اذهب إلى <strong style={{ color: 'var(--text-primary)' }}>الإعدادات ← اتصال السيرفر</strong> وأدخل الـ IP والـ Port من الخطوة السابقة.</p>
                    </StepRow>
                    <StepRow num="6" title="شغّل تطبيق السكرتيرة" isLast>
                      <p>انقر مرتين على <strong style={{ color: 'var(--text-primary)' }}>Ziara SEC.exe</strong> وكرر نفس خطوة ضبط الاتصال بالسيرفر.</p>
                      <div className="step-tip">
                        <span className="tip-icon">✅</span>
                        <p><strong>مبروك!</strong> النظام جاهز للاستخدام. يمكنك الآن إضافة مرضى وجدولة مواعيد.</p>
                      </div>
                    </StepRow>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 3: Server ═══ */}
            <section className="guide-section" id="server">
              <div className="section-header">
                <div className="section-num">3</div>
                <div className="section-title-wrap">
                  <h2>Ziara Server</h2>
                  <p>السيرفر المركزي — يجب تشغيله دائماً أولاً</p>
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-header">
                  <div className="app-icon-wrap icon-server">🖥️</div>
                  <div className="app-card-meta">
                    <h3>Ziara Server</h3>
                    <p>يحتوي على قاعدة البيانات والـ API الذي تتصل به كل التطبيقات</p>
                  </div>
                  <span className="app-badge badge-required">يُشغَّل أولاً دائماً</span>
                </div>
                <div className="app-card-body">
                  <div className="steps-list">
                    <StepRow num="1" title="فتح البرنامج">
                      <p>انقر مرتين على <strong style={{ color: 'var(--text-primary)' }}>Ziara Server.exe</strong> — ستفتح نافذة لوحة التحكم.</p>
                    </StepRow>
                    <StepRow num="2" title="تشغيل السيرفر">
                      <p>اضغط على زر <strong style={{ color: 'var(--accent)' }}>Start Server</strong> داخل النافذة. انتظر بضع ثوانٍ حتى يظهر أنه يعمل.</p>
                    </StepRow>
                    <StepRow num="3" title="لاحظ الـ IP والـ Port" isLast>
                      <p>ستجد في النافذة عنوان IP وPort مثل <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4, fontSize: '0.8rem' }}>192.168.1.5 : 8080</code>. احتفظ بهذه المعلومة لإعداد التطبيقات الأخرى.</p>
                      <div className="step-warning">
                        <span className="tip-icon">⚠️</span>
                        <p>إذا ظهرت رسالة من الجدار الناري (Windows Firewall)، اضغط <strong>السماح — Allow</strong> حتى تتصل التطبيقات الأخرى به.</p>
                      </div>
                    </StepRow>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 4: DR ═══ */}
            <section className="guide-section" id="dr">
              <div className="section-header">
                <div className="section-num">4</div>
                <div className="section-title-wrap">
                  <h2>Ziara DR — تطبيق الطبيب</h2>
                  <p>إدارة شاملة للعيادة من شاشة واحدة</p>
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-header">
                  <div className="app-icon-wrap icon-dr">🩺</div>
                  <div className="app-card-meta">
                    <h3>Ziara DR</h3>
                    <p>للطبيب — المرضى، المواعيد، الوصفات، التشخيص، التقارير المالية</p>
                  </div>
                  <span className="app-badge badge-optional">للطبيب</span>
                </div>
                <div className="app-card-body">
                  <div className="steps-list">
                    <StepRow num="1" title="أول تشغيل — إنشاء الحساب">
                      <p>في أول مرة ستظهر شاشة تسجيل. أدخل اسمك وبيانات الطبيب المسؤول، ثم سجّل دخولك.</p>
                    </StepRow>
                    <StepRow num="2" title="ربط التطبيق بالسيرفر">
                      <p>اذهب إلى <strong style={{ color: 'var(--text-primary)' }}>الإعدادات</strong> وأدخل IP وPort السيرفر. اضغط "اختبار الاتصال" للتأكد.</p>
                      <div className="step-tip">
                        <span className="tip-icon">💡</span>
                        <p>إذا كان السيرفر على <strong>نفس الجهاز</strong>، استخدم IP: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: 4, fontSize: '0.78rem' }}>127.0.0.1</code></p>
                      </div>
                    </StepRow>
                    <StepRow num="3" title="استخدام الميزات الرئيسية" isLast>
                      <p>من لوحة التحكم الرئيسية يمكنك الوصول لكل الميزات:</p>
                      <div className="feature-chips">
                        {[
                          ['👥','إدارة المرضى'],
                          ['📅','المواعيد'],
                          ['💊','الوصفات الطبية'],
                          ['🔬','التشخيص'],
                          ['💰','المصروفات'],
                          ['📊','التقارير المالية'],
                          ['📄','تصدير PDF'],
                          ['⏰','جدول العمل'],
                        ].map(([ic, lb]) => (
                          <span key={lb} className="feature-chip">{ic} {lb}</span>
                        ))}
                      </div>
                    </StepRow>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 5: SEC ═══ */}
            <section className="guide-section" id="sec">
              <div className="section-header">
                <div className="section-num">5</div>
                <div className="section-title-wrap">
                  <h2>Ziara SEC — تطبيق السكرتيرة</h2>
                  <p>استقبال المرضى وإدارة طابور الانتظار</p>
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-header">
                  <div className="app-icon-wrap icon-sec">📋</div>
                  <div className="app-card-meta">
                    <h3>Ziara SEC</h3>
                    <p>للسكرتيرة — استقبال، مواعيد، بحث عن المرضى</p>
                  </div>
                  <span className="app-badge badge-optional">للسكرتيرة</span>
                </div>
                <div className="app-card-body">
                  <div className="steps-list">
                    <StepRow num="1" title="تشغيل التطبيق">
                      <p>انقر مرتين على <strong style={{ color: 'var(--text-primary)' }}>Ziara SEC.exe</strong>.</p>
                    </StepRow>
                    <StepRow num="2" title="ربطه بالسيرفر">
                      <p>أدخل نفس IP وPort الخاصين بـ Ziara Server في إعدادات التطبيق.</p>
                    </StepRow>
                    <StepRow num="3" title="الميزات المتاحة" isLast>
                      <p>من التطبيق يمكن للسكرتيرة:</p>
                      <div className="feature-chips">
                        {[
                          ['🚶','تسجيل وصول المريض'],
                          ['📅','عرض مواعيد اليوم'],
                          ['🔢','إدارة طابور الانتظار'],
                          ['🔍','البحث عن مريض'],
                        ].map(([ic, lb]) => (
                          <span key={lb} className="feature-chip">{ic} {lb}</span>
                        ))}
                      </div>
                    </StepRow>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 6: Community ═══ */}
            <section className="guide-section" id="community">
              <div className="section-header">
                <div className="section-num">6</div>
                <div className="section-title-wrap">
                  <h2>الحجز الأونلاين</h2>
                  <p>كيف يحجز المرضى عبر موقع Ziara Community</p>
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-header">
                  <div className="app-icon-wrap icon-web">🌐</div>
                  <div className="app-card-meta">
                    <h3>Ziara Community</h3>
                    <p>موقع إلكتروني للمرضى لحجز المواعيد أونلاين</p>
                  </div>
                  <span className="app-badge badge-optional">اختياري</span>
                </div>
                <div className="app-card-body">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
                    آلية عمل الحجز الأونلاين بسيطة جداً — ولا تحتاج منك أي تدخل يدوي في الغالب:
                  </p>
                  <div className="steps-list">
                    <StepRow num="1" title="المريض يحجز">
                      <p>يفتح المريض الموقع الإلكتروني الخاص بعيادتك ويختار الموعد المناسب.</p>
                    </StepRow>
                    <StepRow num="2" title="تُحفظ الطلبات تلقائياً">
                      <p>تُخزَّن طلبات الحجز فورياً في Firebase (سحابة آمنة).</p>
                    </StepRow>
                    <StepRow num="3" title="السيرفر يزامن تلقائياً">
                      <p>Ziara Server يستقبل الحجوزات الجديدة تلقائياً كل فترة وجيزة.</p>
                    </StepRow>
                    <StepRow num="4" title="يظهر الحجز في التطبيق" isLast>
                      <p>يرى الطبيب والسكرتيرة الحجز الجديد مباشرةً داخل التطبيق.</p>
                      <div className="step-tip">
                        <span className="tip-icon">📌</span>
                        <p>هذا الجزء مخصص للمطورين لإعداد الموقع. إذا كنت طبيباً وتريد تفعيله، تواصل مع فريق Ziara.</p>
                      </div>
                    </StepRow>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 7: FAQ ═══ */}
            <section className="guide-section" id="faq">
              <div className="section-header">
                <div className="section-num">7</div>
                <div className="section-title-wrap">
                  <h2>الأسئلة الشائعة</h2>
                  <p>أكثر الأسئلة التي يطرحها المستخدمون</p>
                </div>
              </div>

              <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => <FaqItem key={i} item={item} />)}
              </div>
            </section>

            {/* ═══ Support Banner ═══ */}
            <div className="support-banner">
              <h3>لا تزال بحاجة إلى مساعدة؟</h3>
              <p>فريقنا جاهز لمساعدتك في أي وقت — سواء في التثبيت أو الاستخدام اليومي.</p>
              <div className="support-actions">
                <a href="#" className="btn-primary" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                  تواصل مع الدعم الفني
                </a>
                <a href="/#download" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                  العودة للتحميل
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}