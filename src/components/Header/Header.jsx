import { useTheme } from '../../context/ThemeContext';
import './Header.css';

function Header({ onMenuClick, searchQuery, onSearchChange, searchResults, onSearchResultClick }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
                <div className="header-title">
                    <h1>Full Stack Mastery</h1>
                    <span className="header-subtitle">Interview Prep Dashboard</span>
                </div>
            </div>

            <div className="header-center">
                <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search topics, concepts, questions..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="search-clear"
                            onClick={() => onSearchChange('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}

                    {/* Search Results Dropdown */}
                    {searchResults && searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((result, index) => (
                                <button
                                    key={index}
                                    className="search-result-item"
                                    onClick={() => onSearchResultClick(result)}
                                >
                                    <span className={`result-type result-type-${result.type}`}>
                                        {result.type === 'topic' && '📚'}
                                        {result.type === 'subtopic' && '📖'}
                                        {result.type === 'content' && '📝'}
                                        {result.type === 'interview' && '💬'}
                                    </span>
                                    <div className="result-content">
                                        <span className="result-title">{result.title}</span>
                                        {result.parentTitle && (
                                            <span className="result-parent">{result.parentTitle}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="header-right">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                    )}
                </button>
                <div className="header-user">
                    <span className="user-greeting">Hello, Developer!</span>
                    <div className="user-avatar">👨‍💻</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
