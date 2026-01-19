import { useState } from 'react';
import '../../styles/demos/DemoPage.css';

export default function LMSDemo() {
  const [courses] = useState([
    { id: 1, title: 'Introduction to React', progress: 75, duration: '8 hours', students: 1245, image: '⚛️' },
    { id: 2, title: 'Advanced JavaScript', progress: 45, duration: '12 hours', students: 892, image: '📜' },
    { id: 3, title: 'Node.js Backend Development', progress: 0, duration: '15 hours', students: 567, image: '🟢' },
  ]);

  const [currentCourse] = useState({
    title: 'Introduction to React',
    currentLesson: 'State Management with Hooks',
    videoProgress: 65,
  });

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }}>
      <div className="demo-hero">
        <h1>Learning Management System Demo</h1>
        <p>Comprehensive LMS with video streaming, assessments, and progress tracking</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>My Courses</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {courses.map((course) => (
              <div key={course.id} className="demo-card">
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>{course.image}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{course.title}</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                  <div>⏱️ {course.duration}</div>
                  <div>👥 {course.students.toLocaleString()} students</div>
                </div>
                {course.progress > 0 ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span>Progress</span>
                      <span style={{ fontWeight: 600 }}>{course.progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${course.progress}%`, 
                        background: 'linear-gradient(90deg, #ec4899, #be185d)',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                ) : (
                  <button className="demo-button primary" style={{ width: '100%' }}>Start Course</button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Current Lesson</h2>
          <div className="video-player-demo">
            <div style={{ 
              background: '#1f2937', 
              aspectRatio: '16/9', 
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <div>▶️</div>
              <div style={{ 
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                height: '4px',
                background: '#374151',
                borderRadius: '2px'
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${currentCourse.videoProgress}%`, 
                  background: '#ec4899',
                  borderRadius: '2px'
                }}></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{currentCourse.currentLesson}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Course: {currentCourse.title}</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Course Curriculum</h2>
          <div className="curriculum-list">
            <div className="curriculum-item completed">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>✓</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Introduction to React</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Video • 15 min</p>
              </div>
            </div>
            <div className="curriculum-item completed">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>✓</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Components and Props</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Video • 20 min</p>
              </div>
            </div>
            <div className="curriculum-item active">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>▶</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>State Management with Hooks</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Video • 25 min • In Progress</p>
              </div>
            </div>
            <div className="curriculum-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🔒</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Context API</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Video • 18 min</p>
              </div>
            </div>
            <div className="curriculum-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🔒</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 0.6 }}>Quiz: React Fundamentals</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Assessment • 10 questions</p>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Progress Dashboard</h2>
          <div className="progress-stats">
            <div className="stat-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ec4899' }}>3</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Enrolled Courses</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>12</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed Lessons</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>40%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Overall Progress</div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>5</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Certificates Earned</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
