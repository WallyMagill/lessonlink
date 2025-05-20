import React from 'react';
import '../styles/landing_view.css';
import Header from '../components/Header';

function LandingPage() {
  return (
    <><Header />
      <div className="lesson-link-container">

        <section className="hero">
          <h1>Effortless Lesson Planning for Every Educator</h1>
          <p>Stay organized. Collaborate easily. Share with confidence.</p>
          <button type="button" className="cta-button">Get Started</button>
        </section>

        <section className="features">
          <div className="feature-card primary">
            <h2> Quick Access to Daily Lesson Plans</h2>
            <p>Substitute teachers, parents, and principals can log in and view classroom-specific lesson plans in real time.</p>
          </div>

          <div className="feature-card primary">
            <h2> Standardized Platform Format</h2>
            <p>A consistent lesson format ensures familiarity and ease of use across all classrooms while remaining customizable.</p>
          </div>

          <div className="feature-card primary">
            <h2> Lesson Plan Editor with Standards</h2>
            <p>Design standards-aligned lesson plans effortlessly using our intuitive editor with curriculum integration.</p>
          </div>

          <div className="feature-card primary">
            <h2> Collaboration Spaces</h2>
            <p>Share, edit, and co-create lessons with fellow educators in real-time to elevate teaching quality together.</p>
          </div>
        </section>

        <footer className="footer">
          <p>LessonLink!</p>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
