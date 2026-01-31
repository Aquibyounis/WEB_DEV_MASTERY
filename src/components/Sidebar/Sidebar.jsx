import './Sidebar.css';

const menuItems = [
    { id: 'html5', title: 'HTML5', icon: '🌐' },
    { id: 'css3', title: 'CSS3', icon: '🎨' },
    { id: 'javascript', title: 'JavaScript', icon: '⚡' },
    { id: 'react', title: 'React', icon: '⚛️' },
    { id: 'nodejs', title: 'Node.js + Express', icon: '🟢' },
    { id: 'python', title: 'Python + Flask', icon: '🐍' },
    { id: 'databases', title: 'SQL Databases', icon: '🗄️' },
    { id: 'mongodb', title: 'MongoDB', icon: '🍃' },
    { id: 'restapi', title: 'REST APIs', icon: '🔌' },
    { id: 'authentication', title: 'Authentication (JWT)', icon: '🔐' },
    { id: 'git', title: 'Git & GitHub', icon: '📦' },
    { id: 'performance', title: 'Performance', icon: '🚀' },
    { id: 'devops', title: 'DevOps & CI/CD', icon: '⚙️' },
    { id: 'interview', title: 'Interview Q&A', icon: '💬' },
    { id: 'miniprojects', title: 'Mini Projects', icon: '🛠️' },
    { id: 'checklist', title: 'Final Checklist', icon: '✅' },
];

function Sidebar({ isOpen, onToggle, selectedTopic, onTopicSelect, completedTopics = {}, progress = { completed: 0, total: 16 } }) {
    const handleTopicClick = (topicId) => {
        onTopicSelect(topicId);
    };

    const progressPercent = progress.total > 0
        ? Math.round((progress.completed / progress.total) * 100)
        : 0;

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onToggle}
            />

            <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
                {/* Collapse/Expand Toggle Button */}
                <button
                    className="sidebar-toggle"
                    onClick={onToggle}
                    title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <span className="toggle-icon">{isOpen ? '◀' : '▶'}</span>
                </button>

                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span className="logo-icon">🚀</span>
                        {isOpen && <span className="logo-text">FullStack Mastery</span>}
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        {isOpen && <span className="nav-section-title">Learning Modules</span>}
                        <ul className="nav-list">
                            {menuItems.slice(0, 14).map(item => (
                                <li key={item.id}>
                                    <button
                                        className={`nav-item ${selectedTopic === item.id ? 'active' : ''} ${completedTopics[item.id] ? 'completed' : ''}`}
                                        onClick={() => handleTopicClick(item.id)}
                                        title={!isOpen ? item.title : undefined}
                                    >
                                        <span className="nav-icon">{item.icon}</span>
                                        {isOpen && <span className="nav-text">{item.title}</span>}
                                        {isOpen && completedTopics[item.id] && <span className="nav-check">✓</span>}
                                        {selectedTopic === item.id && <span className="nav-indicator" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav-section">
                        {isOpen && <span className="nav-section-title">Practice & Review</span>}
                        <ul className="nav-list">
                            {menuItems.slice(14).map(item => (
                                <li key={item.id}>
                                    <button
                                        className={`nav-item ${selectedTopic === item.id ? 'active' : ''}`}
                                        onClick={() => handleTopicClick(item.id)}
                                        title={!isOpen ? item.title : undefined}
                                    >
                                        <span className="nav-icon">{item.icon}</span>
                                        {isOpen && <span className="nav-text">{item.title}</span>}
                                        {selectedTopic === item.id && <span className="nav-indicator" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {isOpen && (
                    <div className="sidebar-footer">
                        <div className="progress-card">
                            <div className="progress-header">
                                <span className="progress-label">Your Progress</span>
                                <span className="progress-value">{progressPercent}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                            </div>
                            <span className="progress-detail">{progress.completed} of {progress.total} topics</span>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}

export default Sidebar;
