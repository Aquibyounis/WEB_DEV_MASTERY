import { useState } from 'react';
import './BottomNav.css';

const quickLinks = [
    { id: 'html5', title: 'HTML', icon: '🌐' },
    { id: 'css3', title: 'CSS', icon: '🎨' },
    { id: 'javascript', title: 'JS', icon: '⚡' },
    { id: 'react', title: 'React', icon: '⚛️' },
];

const allTopics = [
    { id: 'html5', title: 'HTML5', icon: '🌐' },
    { id: 'css3', title: 'CSS3', icon: '🎨' },
    { id: 'javascript', title: 'JavaScript', icon: '⚡' },
    { id: 'react', title: 'React', icon: '⚛️' },
    { id: 'nodejs', title: 'Node.js', icon: '🟢' },
    { id: 'python', title: 'Python', icon: '🐍' },
    { id: 'databases', title: 'SQL', icon: '🗄️' },
    { id: 'mongodb', title: 'MongoDB', icon: '🍃' },
    { id: 'restapi', title: 'REST APIs', icon: '🔌' },
    { id: 'authentication', title: 'Auth (JWT)', icon: '🔐' },
    { id: 'git', title: 'Git', icon: '📦' },
    { id: 'performance', title: 'Performance', icon: '🚀' },
    { id: 'devops', title: 'DevOps', icon: '⚙️' },
    { id: 'interview', title: 'Interview', icon: '💬' },
    { id: 'miniprojects', title: 'Projects', icon: '🛠️' },
    { id: 'checklist', title: 'Checklist', icon: '✅' },
];

function BottomNav({ selectedTopic, onTopicSelect }) {
    const [showMore, setShowMore] = useState(false);

    const handleTopicClick = (topicId) => {
        onTopicSelect(topicId);
        setShowMore(false);
    };

    return (
        <>
            {/* More Topics Modal */}
            {showMore && (
                <>
                    <div className="bottom-nav-overlay" onClick={() => setShowMore(false)} />
                    <div className="bottom-nav-sheet">
                        <div className="sheet-header">
                            <h3>All Topics</h3>
                            <button className="sheet-close" onClick={() => setShowMore(false)}>✕</button>
                        </div>
                        <div className="sheet-grid">
                            {allTopics.map(topic => (
                                <button
                                    key={topic.id}
                                    className={`sheet-item ${selectedTopic === topic.id ? 'active' : ''}`}
                                    onClick={() => handleTopicClick(topic.id)}
                                >
                                    <span className="sheet-item-icon">{topic.icon}</span>
                                    <span className="sheet-item-text">{topic.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Bottom Navigation Bar */}
            <nav className="bottom-nav">
                {quickLinks.map(link => (
                    <button
                        key={link.id}
                        className={`bottom-nav-item ${selectedTopic === link.id ? 'active' : ''}`}
                        onClick={() => handleTopicClick(link.id)}
                    >
                        <span className="bottom-nav-icon">{link.icon}</span>
                        <span className="bottom-nav-label">{link.title}</span>
                    </button>
                ))}
                <button
                    className={`bottom-nav-item ${showMore ? 'active' : ''}`}
                    onClick={() => setShowMore(!showMore)}
                >
                    <span className="bottom-nav-icon">☰</span>
                    <span className="bottom-nav-label">More</span>
                </button>
            </nav>
        </>
    );
}

export default BottomNav;
