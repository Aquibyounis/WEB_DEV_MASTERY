import './MistakeAlert.css';

function MistakeAlert({ mistake, why, correct }) {
    return (
        <div className="mistake-alert">
            <div className="mistake-section wrong">
                <div className="mistake-header">
                    <span className="mistake-icon">❌</span>
                    <span className="mistake-label">Common Mistake</span>
                </div>
                <div className="mistake-content">
                    {typeof mistake === 'string' ? <p>{mistake}</p> : mistake}
                </div>
            </div>

            {why && (
                <div className="mistake-section why">
                    <div className="mistake-header">
                        <span className="mistake-icon">🤔</span>
                        <span className="mistake-label">Why It Breaks</span>
                    </div>
                    <div className="mistake-content">
                        {typeof why === 'string' ? <p>{why}</p> : why}
                    </div>
                </div>
            )}

            <div className="mistake-section correct">
                <div className="mistake-header">
                    <span className="mistake-icon">✅</span>
                    <span className="mistake-label">Correct Approach</span>
                </div>
                <div className="mistake-content">
                    {typeof correct === 'string' ? <p>{correct}</p> : correct}
                </div>
            </div>
        </div>
    );
}

export default MistakeAlert;
