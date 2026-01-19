import { useState } from 'react';
import '../../styles/demos/DemoPage.css';

export default function TaskManagementDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design new homepage', status: 'in-progress', priority: 'high', assignee: 'John Doe' },
    { id: 2, title: 'Fix login bug', status: 'todo', priority: 'high', assignee: 'Jane Smith' },
    { id: 3, title: 'Write documentation', status: 'completed', priority: 'medium', assignee: 'Bob Johnson' },
    { id: 4, title: 'Update dependencies', status: 'todo', priority: 'low', assignee: 'Alice Brown' },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        title: newTask,
        status: 'todo',
        priority: 'medium',
        assignee: 'You'
      }]);
      setNewTask('');
    }
  };

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statusOrder = ['todo', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return { ...task, status: statusOrder[nextIndex] };
      }
      return task;
    }));
  };

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
      <div className="demo-hero">
        <h1>Task Management SaaS Demo</h1>
        <p>Collaborative project management with real-time updates</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Add New Task</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <input
              type="text"
              className="demo-input"
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              style={{ flex: 1 }}
            />
            <button className="demo-button primary" onClick={addTask}>
              Add Task
            </button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Task Board</h2>
          <div className="kanban-board">
            <div className="kanban-column">
              <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>To Do ({tasks.filter(t => t.status === 'todo').length})</h3>
              {tasks.filter(t => t.status === 'todo').map(task => (
                <div key={task.id} className="task-card" onClick={() => toggleStatus(task.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600 }}>{task.title}</h4>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#dbeafe',
                      color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#2563eb'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    👤 {task.assignee}
                  </div>
                </div>
              ))}
            </div>

            <div className="kanban-column">
              <h3 style={{ marginBottom: '1rem', color: '#3b82f6' }}>In Progress ({tasks.filter(t => t.status === 'in-progress').length})</h3>
              {tasks.filter(t => t.status === 'in-progress').map(task => (
                <div key={task.id} className="task-card" onClick={() => toggleStatus(task.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600 }}>{task.title}</h4>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#dbeafe',
                      color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#2563eb'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    👤 {task.assignee}
                  </div>
                </div>
              ))}
            </div>

            <div className="kanban-column">
              <h3 style={{ marginBottom: '1rem', color: '#10b981' }}>Completed ({tasks.filter(t => t.status === 'completed').length})</h3>
              {tasks.filter(t => t.status === 'completed').map(task => (
                <div key={task.id} className="task-card completed" onClick={() => toggleStatus(task.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600, textDecoration: 'line-through', opacity: 0.7 }}>{task.title}</h4>
                    <span style={{ fontSize: '1.25rem' }}>✓</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    👤 {task.assignee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Team Activity</h2>
          <div className="activity-feed">
            <div className="activity-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>👤</div>
              <div style={{ flex: 1 }}>
                <p><strong>John Doe</strong> started working on "Design new homepage"</p>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>✓</div>
              <div style={{ flex: 1 }}>
                <p><strong>Bob Johnson</strong> completed "Write documentation"</p>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>💬</div>
              <div style={{ flex: 1 }}>
                <p><strong>Jane Smith</strong> commented on "Fix login bug"</p>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>1 day ago</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
