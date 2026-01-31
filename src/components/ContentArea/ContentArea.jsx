import { useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import Accordion from '../Accordion/Accordion';
import InterviewCard from '../InterviewCard/InterviewCard';
import MistakeAlert from '../MistakeAlert/MistakeAlert';
import './ContentArea.css';

const tabs = [
    { id: 'concept', label: 'Concept', icon: '📚' },
    { id: 'code', label: 'Code Example', icon: '💻' },
    { id: 'explanation', label: 'Explanation', icon: '🔍' },
    { id: 'mistakes', label: 'Common Mistakes', icon: '⚠️' },
    { id: 'interview', label: 'Interview Q&A', icon: '💬' },
    { id: 'output', label: 'Output / Result', icon: '📊' },
];

function ContentArea({ topic, subtopic }) {
    const [activeTab, setActiveTab] = useState('concept');
    const [activeSubtopic, setActiveSubtopic] = useState(0);

    if (!topic) {
        return (
            <div className="content-area">
                <div className="content-welcome">
                    <div className="welcome-icon">🚀</div>
                    <h2>Welcome to Full Stack Mastery</h2>
                    <p>Select a topic from the sidebar to begin your learning journey</p>
                    <div className="quick-stats">
                        <div className="stat-card">
                            <span className="stat-value">15+</span>
                            <span className="stat-label">Topics</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">100+</span>
                            <span className="stat-label">Interview Questions</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">50+</span>
                            <span className="stat-label">Code Examples</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentSubtopic = topic.subtopics?.[activeSubtopic];

    const renderTabContent = () => {
        if (!currentSubtopic) return <p>Select a subtopic to view content</p>;

        switch (activeTab) {
            case 'concept':
                return (
                    <div className="tab-content animate-fadeIn">
                        <div className="concept-header">
                            <h3>{currentSubtopic.title}</h3>
                            {currentSubtopic.tags && (
                                <div className="concept-tags">
                                    {currentSubtopic.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {currentSubtopic.definition && (
                            <div className="concept-section">
                                <h4>📖 Definition</h4>
                                <p>{currentSubtopic.definition}</p>
                            </div>
                        )}

                        {currentSubtopic.whyItExists && (
                            <div className="concept-section">
                                <h4>🎯 Why It Exists</h4>
                                <p>{currentSubtopic.whyItExists}</p>
                            </div>
                        )}

                        {currentSubtopic.whenToUse && (
                            <div className="concept-section">
                                <h4>⏰ When To Use</h4>
                                <ul>
                                    {currentSubtopic.whenToUse.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {currentSubtopic.howItWorks && (
                            <div className="concept-section">
                                <h4>⚙️ How It Works Internally</h4>
                                <p>{currentSubtopic.howItWorks}</p>
                            </div>
                        )}

                        {currentSubtopic.keyPoints && (
                            <div className="concept-section">
                                <h4>🔑 Key Points</h4>
                                <ul className="key-points">
                                    {currentSubtopic.keyPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case 'code':
                return (
                    <div className="tab-content animate-fadeIn">
                        {currentSubtopic.codeExamples?.map((example, i) => (
                            <div key={i} className="code-example-block">
                                <div className="code-example-header">
                                    <span className="code-level">{example.level || 'Example'}</span>
                                    {example.title && <h4>{example.title}</h4>}
                                </div>
                                {example.description && <p className="code-description">{example.description}</p>}
                                <CodeBlock
                                    code={example.code}
                                    language={example.language || 'javascript'}
                                    title={example.filename}
                                />
                            </div>
                        ))}
                        {!currentSubtopic.codeExamples?.length && (
                            <p className="no-content">No code examples available for this topic yet.</p>
                        )}
                    </div>
                );

            case 'explanation':
                return (
                    <div className="tab-content animate-fadeIn">
                        {currentSubtopic.explanation ? (
                            <div className="explanation-content">
                                {typeof currentSubtopic.explanation === 'string' ? (
                                    <p>{currentSubtopic.explanation}</p>
                                ) : (
                                    currentSubtopic.explanation.map((section, i) => (
                                        <Accordion
                                            key={i}
                                            title={section.title}
                                            defaultOpen={i === 0}
                                            icon={section.icon}
                                        >
                                            <p>{section.content}</p>
                                            {section.code && (
                                                <CodeBlock
                                                    code={section.code}
                                                    language={section.language || 'javascript'}
                                                />
                                            )}
                                        </Accordion>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="explanation-content">
                                {currentSubtopic.whyItExists && (
                                    <Accordion title="🎯 Why This Exists" defaultOpen={true}>
                                        <p>{currentSubtopic.whyItExists}</p>
                                    </Accordion>
                                )}

                                {currentSubtopic.howItWorks && (
                                    <Accordion title="⚙️ How It Works" defaultOpen={true}>
                                        <p>{currentSubtopic.howItWorks}</p>
                                    </Accordion>
                                )}

                                {currentSubtopic.keyPoints && (
                                    <Accordion title="🔑 Key Takeaways" defaultOpen={true}>
                                        <ul className="explanation-points">
                                            {currentSubtopic.keyPoints.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </Accordion>
                                )}

                                {currentSubtopic.whenToUse && (
                                    <Accordion title="⏰ When To Use" defaultOpen={false}>
                                        <ul className="explanation-points">
                                            {currentSubtopic.whenToUse.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </Accordion>
                                )}

                                {!currentSubtopic.whyItExists && !currentSubtopic.howItWorks && !currentSubtopic.keyPoints && (
                                    <div className="no-content-box">
                                        <span className="no-content-icon">📝</span>
                                        <p>Detailed explanation coming soon.</p>
                                        <p className="no-content-hint">Check the Concept tab for key information.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentSubtopic.stepByStep && (
                            <div className="step-by-step">
                                <h4>📋 Step-by-Step Breakdown</h4>
                                <ol className="steps-list">
                                    {currentSubtopic.stepByStep.map((step, i) => (
                                        <li key={i}>
                                            <strong>{step.title}</strong>
                                            <p>{step.description}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                );

            case 'mistakes':
                return (
                    <div className="tab-content animate-fadeIn">
                        {currentSubtopic.commonMistakes?.length > 0 ? (
                            currentSubtopic.commonMistakes.map((mistake, i) => (
                                <MistakeAlert
                                    key={i}
                                    mistake={mistake.mistake}
                                    why={mistake.why}
                                    correct={mistake.correct}
                                />
                            ))
                        ) : (
                            <div className="no-content-box">
                                <span className="no-content-icon">✅</span>
                                <p>Common mistakes will be added soon for this topic.</p>
                                <p className="no-content-hint">Check the Concept and Code Example tabs to learn best practices.</p>
                            </div>
                        )}
                    </div>
                );

            case 'interview':
                return (
                    <div className="tab-content animate-fadeIn">
                        {currentSubtopic.interviewQuestions?.map((qa, i) => (
                            <InterviewCard
                                key={i}
                                question={qa.question}
                                answer={qa.answer}
                                tip={qa.tip}
                                difficulty={qa.difficulty || 'medium'}
                            />
                        ))}
                        {!currentSubtopic.interviewQuestions?.length && (
                            <p className="no-content">No interview questions available for this topic yet.</p>
                        )}
                    </div>
                );

            case 'output':
                return (
                    <div className="tab-content animate-fadeIn">
                        {currentSubtopic.output && (
                            <div className="output-section">
                                <h4>📊 Expected Output</h4>
                                {currentSubtopic.output.description && (
                                    <p className="output-description">{currentSubtopic.output.description}</p>
                                )}
                                {currentSubtopic.output.result && (
                                    <div className="output-result">
                                        <pre>{currentSubtopic.output.result}</pre>
                                    </div>
                                )}
                                {currentSubtopic.output.visual && (
                                    <div className="output-visual">
                                        <pre>{currentSubtopic.output.visual}</pre>
                                    </div>
                                )}
                                {currentSubtopic.output.json && (
                                    <CodeBlock
                                        code={JSON.stringify(currentSubtopic.output.json, null, 2)}
                                        language="json"
                                        title="Response JSON"
                                    />
                                )}
                                {currentSubtopic.output.ui && (
                                    <div className="output-ui-preview">
                                        <div className="ui-preview-header">
                                            <span>UI Preview</span>
                                        </div>
                                        <div className="ui-preview-content">
                                            {currentSubtopic.output.ui}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {!currentSubtopic.output && (
                            <div className="no-content-box">
                                <span className="no-content-icon">📭</span>
                                <p>Output examples will be added soon for this topic.</p>
                                <p className="no-content-hint">Check the Code Example tab to see the expected behavior.</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="content-area">
            {/* Topic Header */}
            <div className="content-header">
                <div className="topic-info">
                    <span className="topic-icon">{topic.icon}</span>
                    <div>
                        <h2>{topic.title}</h2>
                        <p className="topic-description">{topic.description}</p>
                    </div>
                </div>
            </div>

            {/* Subtopic Pills */}
            {topic.subtopics && topic.subtopics.length > 0 && (
                <div className="subtopic-pills">
                    {topic.subtopics.map((sub, index) => (
                        <button
                            key={index}
                            className={`subtopic-pill ${activeSubtopic === index ? 'active' : ''}`}
                            onClick={() => setActiveSubtopic(index)}
                        >
                            {sub.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Tabs */}
            <div className="content-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`content-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="content-body">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default ContentArea;
