import { useState, useEffect } from 'react';
import './Checklist.css';

function Checklist({ data }) {
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('checklist-progress');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('checklist-progress', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleItem = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const totalItems = data.categories.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    const progress = Math.round((completedItems / totalItems) * 100);

    const resetProgress = () => {
        if (confirm('Are you sure you want to reset all progress?')) {
            setCheckedItems({});
        }
    };

    return (
        <div className="checklist-container">
            <div className="checklist-header">
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                <button className="reset-btn" onClick={resetProgress}>
                    Reset Progress
                </button>
            </div>

            <div className="checklist-progress">
                <div className="progress-info">
                    <span className="progress-label">Your Progress</span>
                    <span className="progress-value">{completedItems} / {totalItems} completed</span>
                </div>
                <div className="progress-bar-large">
                    <div
                        className="progress-fill-large"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="progress-percent">{progress}%</span>
            </div>

            <div className="checklist-categories">
                {data.categories.map((category, catIndex) => (
                    <div key={catIndex} className="checklist-category">
                        <h3 className="category-title">{category.title}</h3>
                        <ul className="checklist-items">
                            {category.items.map((item) => (
                                <li
                                    key={item.id}
                                    className={`checklist-item ${checkedItems[item.id] ? 'checked' : ''}`}
                                >
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[item.id] || false}
                                            onChange={() => toggleItem(item.id)}
                                        />
                                        <span className="checkmark">
                                            {checkedItems[item.id] ? '✓' : ''}
                                        </span>
                                        <span className="item-text">{item.text}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Checklist;
