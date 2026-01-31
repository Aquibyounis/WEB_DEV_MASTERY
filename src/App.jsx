import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import ContentArea from './components/ContentArea/ContentArea';
import MiniProjects from './components/MiniProjects/MiniProjects';
import Checklist from './components/Checklist/Checklist';
import { allTopics, miniProjectsData, checklistData } from './data';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('completed-topics');
    return saved ? JSON.parse(saved) : {};
  });

  // Save progress
  useEffect(() => {
    localStorage.setItem('completed-topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  // Mobile: close sidebar when topic selected
  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(null);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSearchSelect = (topicId, subtopicId) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(subtopicId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const markTopicComplete = (topicId) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: true
    }));
  };

  // Calculate progress
  const totalTopics = allTopics.length;
  const completedCount = Object.keys(completedTopics).length;

  // Get current topic data
  const currentTopic = selectedTopic
    ? allTopics.find(t => t.id === selectedTopic)
    : null;

  // Determine what to render
  const renderContent = () => {
    if (!selectedTopic) {
      return (
        <ContentArea
          topic={null}
          selectedSubtopic={selectedSubtopic}
          onSubtopicSelect={setSelectedSubtopic}
        />
      );
    }

    if (selectedTopic === 'miniprojects') {
      return <MiniProjects data={miniProjectsData} />;
    }

    if (selectedTopic === 'checklist') {
      return <Checklist data={checklistData} />;
    }

    return (
      <ContentArea
        topic={currentTopic}
        selectedSubtopic={selectedSubtopic}
        onSubtopicSelect={setSelectedSubtopic}
        onMarkComplete={() => markTopicComplete(selectedTopic)}
        isCompleted={completedTopics[selectedTopic]}
      />
    );
  };

  return (
    <div className="app">
      <Sidebar
        topics={allTopics}
        selectedTopic={selectedTopic}
        onTopicSelect={handleTopicSelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        completedTopics={completedTopics}
        progress={{ completed: completedCount, total: totalTopics }}
      />

      <div className={`main-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onSearchSelect={handleSearchSelect}
        />

        <main className="content-wrapper">
          {renderContent()}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
