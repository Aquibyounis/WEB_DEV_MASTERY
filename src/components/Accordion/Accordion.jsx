import { useState } from 'react';
import './Accordion.css';

function Accordion({ title, children, defaultOpen = false, icon, badge }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`accordion ${isOpen ? 'open' : ''}`}>
            <button
                className="accordion-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="accordion-header-left">
                    {icon && <span className="accordion-icon">{icon}</span>}
                    <span className="accordion-title">{title}</span>
                    {badge && <span className="accordion-badge">{badge}</span>}
                </div>
                <span className="accordion-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            <div className="accordion-content">
                <div className="accordion-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Accordion;
