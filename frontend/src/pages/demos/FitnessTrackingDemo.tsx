import '../../styles/demos/DemoPage.css';

export default function FitnessTrackingDemo() {
  const workouts = [
    { id: 1, name: 'Morning Run', type: 'Cardio', duration: '30 min', calories: 320, date: 'Today' },
    { id: 2, name: 'Strength Training', type: 'Strength', duration: '45 min', calories: 280, date: 'Yesterday' },
    { id: 3, name: 'Yoga Session', type: 'Flexibility', duration: '20 min', calories: 120, date: '2 days ago' },
  ];

  const goals = [
    { name: 'Steps', current: 7234, target: 10000, unit: 'steps', icon: '👣' },
    { name: 'Calories', current: 1850, target: 2500, unit: 'kcal', icon: '🔥' },
    { name: 'Water', current: 6, target: 8, unit: 'glasses', icon: '💧' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
      <div className="demo-hero">
        <h1>Fitness Tracking App Demo</h1>
        <p>Comprehensive fitness and wellness app with workout plans and progress analytics</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Today's Activity</h2>
          <div className="activity-cards">
            {goals.map((goal, index) => (
              <div key={index} className="activity-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{goal.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>{goal.name}</div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`, 
                    background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                    borderRadius: '4px'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Recent Workouts</h2>
          <div className="workouts-list">
            {workouts.map((workout) => (
              <div key={workout.id} className="workout-card">
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {workout.type === 'Cardio' ? '🏃' : workout.type === 'Strength' ? '💪' : '🧘'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{workout.name}</h3>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      <span>⏱️ {workout.duration}</span>
                      <span style={{ marginLeft: '1rem' }}>🔥 {workout.calories} kcal</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{workout.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Weekly Progress</h2>
          <div className="weekly-chart">
            <div className="chart-bars" style={{ height: '200px' }}>
              {[65, 78, 82, 75, 88, 92, 85].map((height, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar" 
                    style={{ 
                      height: `${height}%`,
                      background: 'linear-gradient(180deg, #ef4444, #dc2626)'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 600 }}>{height}%</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Workout Plans</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="demo-card">
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>💪</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Beginner Strength</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>4 weeks • 3x per week</p>
              <button className="demo-button primary" style={{ width: '100%' }}>Start Plan</button>
            </div>
            <div className="demo-card">
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🏃</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>5K Running</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>8 weeks • 4x per week</p>
              <button className="demo-button primary" style={{ width: '100%' }}>Start Plan</button>
            </div>
            <div className="demo-card">
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🧘</div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Yoga Flow</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>6 weeks • Daily</p>
              <button className="demo-button primary" style={{ width: '100%' }}>Start Plan</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
