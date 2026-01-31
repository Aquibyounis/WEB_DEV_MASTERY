import { useState, useEffect, useRef } from 'react';
import './CodeBlock.css';

// Simple syntax highlighting without external dependencies
function highlightCode(code, language) {
    // Basic keyword highlighting
    const keywords = {
        javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'switch', 'case', 'break', 'continue', 'do', 'extends', 'super', 'static', 'get', 'set', 'yield'],
        python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'pass', 'break', 'continue', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'lambda', 'global', 'nonlocal', 'assert', 'yield', 'async', 'await'],
        html: ['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'label', 'select', 'option', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'script', 'style', 'link', 'meta', 'title'],
        css: ['color', 'background', 'margin', 'padding', 'border', 'display', 'flex', 'grid', 'position', 'top', 'left', 'right', 'bottom', 'width', 'height', 'font', 'text', 'align', 'justify', 'transform', 'transition', 'animation', 'opacity', 'z-index', 'overflow', 'cursor'],
        sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'],
        bash: ['echo', 'cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'sed', 'awk', 'chmod', 'chown', 'sudo', 'apt', 'npm', 'npx', 'node', 'python', 'pip', 'git', 'docker', 'curl', 'wget', 'export', 'source', 'if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'case', 'esac'],
        json: []
    };

    let result = code;
    const lang = language?.toLowerCase() || 'javascript';
    const langKeywords = keywords[lang] || keywords.javascript;

    // Escape HTML
    result = result
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Highlight strings
    result = result.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="token string">$&</span>');

    // Highlight comments
    result = result.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm, '<span class="token comment">$&</span>');

    // Highlight numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');

    // Highlight keywords
    langKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        result = result.replace(regex, '<span class="token keyword">$1</span>');
    });

    // Highlight function names
    result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="token function">$1</span>(');

    return result;
}

function CodeBlock({ code, language = 'javascript', title, showLineNumbers = true }) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const lines = code.split('\n');
    const highlightedCode = highlightCode(code, language);

    return (
        <div className="code-block">
            <div className="code-header">
                <div className="code-header-left">
                    <div className="code-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    {title && <span className="code-title">{title}</span>}
                    <span className="code-language">{language}</span>
                </div>
                <button
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            <div className="code-content">
                {showLineNumbers && (
                    <div className="line-numbers">
                        {lines.map((_, index) => (
                            <span key={index}>{index + 1}</span>
                        ))}
                    </div>
                )}
                <pre className="code-pre">
                    <code
                        ref={codeRef}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>
        </div>
    );
}

export default CodeBlock;
