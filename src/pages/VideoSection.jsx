import './VideoSection.css';

export default function VideoSection() {
  return (
    <section className="video-section section-padding" id="video">
      <div className="container">
        <div className="video-header animate-on-scroll">
          <div className="tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            شاهد البرنامج
          </div>
          <h2 className="section-title">
            Ziara Smart Clinic
            <br />
            <span className="gradient-text">في دقيقة واحدة</span>
          </h2>
        </div>

        <div className="video-wrapper animate-on-scroll delay-1">
          <div className="video-frame">
            <div className="video-frame-glow" />
            <video
              className="video-player"
              src="https://res.cloudinary.com/djwunhtu8/video/upload/v1780725529/0606_1_fueaz5.mp4"
              controls
              poster=""
              preload="metadata"
              playsInline
            >
              المتصفح لا يدعم تشغيل الفيديو.
            </video>
          </div>

          <div className="video-caption">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span>شاهد كيف يعمل Ziara Smart Clinic — من إدارة المرضى إلى جدولة المواعيد والتقارير</span>
          </div>
        </div>
      </div>
    </section>
  );
}
