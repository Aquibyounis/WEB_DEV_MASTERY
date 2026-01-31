import { useState } from 'react';
import './InterviewCard.css';

function InterviewCard({ question, answer, tip, difficulty = 'medium' }) {
    const [showAnswer, setShowAnswer] = useState(false);

    const difficultyColors = {
        easy: 'success',
        medium: 'warning',
        hard: 'danger'
    };

    return (
        <div className="interview-card">
            <div className="interview-card-header">
                <span className={`difficulty-badge badge-${difficultyColors[difficulty]}`}>
                    {difficulty}
                </span>
            </div>

            <div className="interview-question">
                <span className="question-icon">❓</span>
                <h4>{question}</h4>
            </div>

            <button
                className={`reveal-btn ${showAnswer ? 'revealed' : ''}`}
                onClick={() => setShowAnswer(!showAnswer)}
            >
                {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={showAnswer ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
            </button>

            {showAnswer && (
                <div className="interview-answer animate-fadeIn">
                    <div className="answer-content">
                        <span className="answer-icon">💡</span>
                        <div>
                            <p>{answer}</p>
                        </div>
                    </div>

                    {tip && (
                        <div className="interview-tip">
                            <span className="tip-icon">🎯</span>
                            <div>
                                <strong>Interview Tip:</strong>
                                <p>{tip}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default InterviewCard;
