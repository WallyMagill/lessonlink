import React, { useState } from 'react';
import './LessonEditTemplate.css';

function LessonEditTemplate() {
  return (
    <div className="lesson-link-container">
      <header className="header">
        <div className="logo">LESSONLINK</div>
        <div className="header-actions">
          <button type="button" className="user-icon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Eo_circle_blue_letter-a.svg/1024px-Eo_circle_blue_letter-a.svg.png" alt="user" />
          </button>
        </div>
      </header>

      <nav className="nav-tabs">
        <button type="button" className="nav-button">View Standards</button>
        <button type="button" className="nav-button">Template</button>
        <button type="button" className="nav-button">Custom</button>
      </nav>

      <div className="content">
        <div className="standards-panel">
          <input
            type="text"
            placeholder="Search Standards..."
            className="search-input"
          />
          <div className="filter-options">
            <select>
              <option>Filter by Subject</option>
              <option>Science</option>
              <option>Math</option>
              <option>English</option>
            </select>
            <select>
              <option>Filter by Grade</option>
              <option>K-5</option>
              <option>6-8</option>
              <option>9-12</option>
            </select>
            <select>
              <option>Filter by Topic</option>
              <option>Biology</option>
              <option>Chemistry</option>
              <option>Physics</option>
            </select>
          </div>
        </div>

        <div className="lesson-panel">
          <section className="lesson-section">
            <input
              type="text"
              placeholder="My Lesson"
              className="lessontitle"
            />
            {/* <h2 className="lessontitle">My Lesson</h2> */}
          </section>

          <section className="lesson-section">
            <input
              type="text"
              placeholder="Materials:"
              className="subtitle"
            />
            {/* <h3 className="subtitle">Materials:</h3> */}
            <ul>
              <li>Worksheet</li>
              <li>Textbook</li>
              <li>Blank paper</li>
              <li>Goggles</li>
              <li>Beaker</li>
            </ul>
          </section>

          <section className="lesson-section">
            <h3 className="subtitle">Learning Objectives</h3>
            <ul>
              <li>Students will be able to define key scientific terms with 80% accuracy.</li>
              <li>Students will be able to design and conduct a simple scientific experiment.</li>
              <li>Students will be able to explain how scientific principles relate to everyday life.</li>
            </ul>
          </section>

          <section className="lesson-section">
            <h3 className="subtitle">Overview</h3>
            <p>In this lesson...</p>
          </section>

          <section className="lesson-section">
            <h3 className="subtitle">Procedure List</h3>
            <ol>
              <li>1. Hand out the worksheet and go over the objective of the...</li>
              <li>2. Open the  textbook to page 123...</li>
              <li>3. Talk with partner about ..</li>
            </ol>
          </section>

          <div className="footer-icons">
            <button type="button" className="icon">🖨️</button>
            <button type="button" className="icon">📄</button>
            <button type="button" className="icon">↗️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonEditTemplate;
