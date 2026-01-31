import CodeBlock from '../CodeBlock/CodeBlock';
import Accordion from '../Accordion/Accordion';
import InterviewCard from '../InterviewCard/InterviewCard';
import './MiniProjects.css';

function MiniProjects({ data }) {
    return (
        <div className="mini-projects-container">
            <div className="projects-header">
                <span className="projects-icon">{data.icon}</span>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className="projects-grid">
                {data.subtopics.map((project, index) => (
                    <article key={project.id} className="project-card">
                        <div className="project-number">{index + 1}</div>
                        <h3>{project.title}</h3>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="project-tag">{tag}</span>
                            ))}
                        </div>
                        <p className="project-description">{project.definition}</p>

                        <Accordion title="Key Features" icon="⭐" defaultOpen={false}>
                            <ul className="features-list">
                                {project.keyPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </Accordion>

                        {project.codeExamples && project.codeExamples.map((example, i) => (
                            <Accordion
                                key={i}
                                title={example.title}
                                icon="💻"
                                badge={example.level}
                            >
                                <CodeBlock
                                    code={example.code}
                                    language={example.language}
                                />
                            </Accordion>
                        ))}

                        {project.interviewQuestions && project.interviewQuestions.length > 0 && (
                            <Accordion title="Interview Questions" icon="💬">
                                {project.interviewQuestions.map((qa, i) => (
                                    <InterviewCard
                                        key={i}
                                        question={qa.question}
                                        answer={qa.answer}
                                        difficulty={qa.difficulty}
                                    />
                                ))}
                            </Accordion>
                        )}
                    </article>
                ))}
            </div>

            <div className="projects-tips">
                <h3>💡 Tips for Presenting Projects in Interviews</h3>
                <ol>
                    <li><strong>Know your tech stack:</strong> Be ready to explain why you chose each technology</li>
                    <li><strong>Explain challenges:</strong> Describe problems you faced and how you solved them</li>
                    <li><strong>Show code:</strong> Be prepared to walk through key code snippets</li>
                    <li><strong>Discuss improvements:</strong> Mention what you would do differently or add next</li>
                    <li><strong>Have it deployed:</strong> Live demos are impressive - deploy on Vercel, Netlify, or Heroku</li>
                </ol>
            </div>
        </div>
    );
}

export default MiniProjects;
