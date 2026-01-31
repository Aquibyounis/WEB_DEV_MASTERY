export const interviewData = {
    id: 'interview',
    title: 'Interview Q&A',
    icon: '💬',
    description: 'Comprehensive interview questions across all full stack topics',
    subtopics: [
        {
            id: 'behavioral',
            title: 'Behavioral Questions',
            tags: ['soft-skills', 'STAR', 'communication'],
            definition: 'Behavioral questions assess how you handle situations, collaborate, and solve problems in real work environments.',
            keyPoints: [
                'Use STAR format: Situation, Task, Action, Result',
                'Prepare 3-5 stories covering different scenarios',
                'Be specific with examples',
                'Show growth and learning from failures'
            ],
            interviewQuestions: [
                {
                    question: 'Tell me about yourself',
                    answer: 'Structure: Present (current role/studies) → Past (relevant experience) → Future (why this role). "Im a final year CS student passionate about full stack development. Ive built several projects including a task manager with React and Node.js. Im excited about this internship because..."',
                    tip: 'Keep it 1-2 minutes. Focus on relevant experience.',
                    difficulty: 'easy'
                },
                {
                    question: 'Describe a challenging project and how you overcame difficulties',
                    answer: 'Use STAR: "Situation: Built e-commerce app with payment integration. Task: Had to handle complex state and API errors. Action: Implemented Redux for state, added error boundaries, created retry logic. Result: App handled 1000+ orders without issues."',
                    difficulty: 'medium'
                },
                {
                    question: 'How do you handle tight deadlines?',
                    answer: 'Prioritize ruthlessly, communicate early if at risk, break into smaller tasks, focus on MVP features first. Example: "For my capstone project, I had 2 weeks. I prioritized core features, used a Kanban board, and shipped MVP on time with stretch goals for later."',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'technical-general',
            title: 'General Technical',
            tags: ['concepts', 'fundamentals', 'mixed'],
            definition: 'Common technical questions testing fundamental knowledge across the full stack.',
            interviewQuestions: [
                {
                    question: 'Explain how the internet works when you type a URL',
                    answer: 'DNS resolves domain to IP → TCP connection to server → HTTP request sent → Server processes, returns response → Browser renders HTML → Fetches CSS/JS/images → Paints page. TLS handshake if HTTPS.',
                    difficulty: 'medium'
                },
                {
                    question: 'What is the difference between synchronous and asynchronous code?',
                    answer: 'Synchronous: executes line by line, blocks until complete. Asynchronous: starts operation, continues to next line, handles result when ready (callbacks, promises, async/await). Async prevents blocking in I/O operations.',
                    difficulty: 'easy'
                },
                {
                    question: 'Explain MVC architecture',
                    answer: 'Model-View-Controller separates concerns. Model: data and business logic. View: UI presentation. Controller: handles input, updates Model, selects View. Benefits: separation of concerns, testability, reusability.',
                    difficulty: 'medium'
                },
                {
                    question: 'What are some ways to improve website performance?',
                    answer: 'Frontend: minify JS/CSS, lazy load images, code splitting, caching. Backend: database indexes, query optimization, caching (Redis), pagination. Network: CDN, gzip compression, HTTP/2. Measure with Lighthouse.',
                    difficulty: 'medium'
                },
                {
                    question: 'Describe your experience with version control',
                    answer: 'Daily Git usage: feature branches, meaningful commits, pull requests for code review. Comfortable with merge conflicts resolution. Used GitHub Projects for issue tracking. CI/CD integration with GitHub Actions.',
                    difficulty: 'easy'
                }
            ]
        }
    ]
};

export default interviewData;
