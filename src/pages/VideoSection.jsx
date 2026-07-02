import { motion } from "motion/react";
import { ScrollReveal, GlowOrb } from "../motion/MotionPrimitives";
import './VideoSection.css';

export default function VideoSection() {
  return (
    <section className="video-section section-padding" id="video">
      <GlowOrb size={600} color="rgba(6, 182, 212, 0.025)" position="center" />

      <div className="container">
        <ScrollReveal className="video-header">
          <div className="tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            شاهد البرنامج
          </div>
          <h2 className="section-title">
            Zeyara Clinic
            <br />
            <span className="gradient-text">في دقيقة واحدة</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="video-wrapper" delay={0.15}>
          <motion.div
            className="video-frame"
            whileHover={{ scale: 1.005, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
          >
            <video
              className="video-player"
              src="https://res.cloudinary.com/djwunhtu8/video/upload/v1780725529/0606_1_fueaz5.mp4"
              controls
              preload="metadata"
              playsInline
            >
              المتصفح لا يدعم تشغيل الفيديو.
            </video>
          </motion.div>

          <div className="video-caption">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span>شاهد كيف يعمل Zeyara Clinic — من إدارة المرضى إلى جدولة المواعيد والتقارير</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}