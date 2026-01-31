export const checklistData = {
    id: 'checklist',
    title: 'Final Revision Checklist',
    icon: '✅',
    description: 'Last-minute revision checklist before your Full Stack Developer interview',
    categories: [
        {
            title: '📚 Core Concepts to Revise',
            items: [
                { id: 'c1', text: 'JavaScript: Closures, Event Loop, Promises, async/await' },
                { id: 'c2', text: 'React: Hooks (useState, useEffect, useContext), Props vs State' },
                { id: 'c3', text: 'CSS: Flexbox vs Grid, Positioning, Responsive Design' },
                { id: 'c4', text: 'Node.js: Express middleware, REST API design' },
                { id: 'c5', text: 'Database: SQL joins, MongoDB CRUD, indexing' },
                { id: 'c6', text: 'Authentication: JWT flow, token storage security' },
                { id: 'c7', text: 'Git: Branching, merge conflicts, pull request workflow' },
                { id: 'c8', text: 'HTTP: Methods (GET/POST/PUT/DELETE), Status codes' }
            ]
        },
        {
            title: '💻 Commands to Remember',
            items: [
                { id: 'cmd1', text: 'git checkout -b feature/name, git merge, git rebase' },
                { id: 'cmd2', text: 'npm init, npm install, npm run dev' },
                { id: 'cmd3', text: 'npx create-react-app / create-vite' },
                { id: 'cmd4', text: 'MongoDB: insertOne, find, updateOne, deleteOne' },
                { id: 'cmd5', text: 'SQL: SELECT, INSERT, UPDATE, DELETE, JOIN' }
            ]
        },
        {
            title: '❓ Questions to Rehearse',
            items: [
                { id: 'q1', text: 'Tell me about yourself (keep it 1-2 minutes, relevant experience)' },
                { id: 'q2', text: 'Explain a challenging project you built' },
                { id: 'q3', text: 'What is closure and why is it useful?' },
                { id: 'q4', text: 'Explain React component lifecycle with hooks' },
                { id: 'q5', text: 'How does JWT authentication work?' },
                { id: 'q6', text: 'SQL vs NoSQL - when to use which?' },
                { id: 'q7', text: 'What is REST and RESTful API design?' },
                { id: 'q8', text: 'Difference between PUT and PATCH?' },
                { id: 'q9', text: 'How do you optimize website performance?' },
                { id: 'q10', text: 'Describe your Git workflow' }
            ]
        },
        {
            title: '🎯 Project Explanation Points',
            items: [
                { id: 'p1', text: 'Know the tech stack of each project (frontend, backend, database)' },
                { id: 'p2', text: 'Explain key features and your role' },
                { id: 'p3', text: 'Describe challenges faced and how you solved them' },
                { id: 'p4', text: 'Mention any scaling/performance considerations' },
                { id: 'p5', text: 'Be ready to explain any code snippet from your projects' },
                { id: 'p6', text: 'Know how to deploy and host your applications' }
            ]
        },
        {
            title: '🚀 Day Before Interview',
            items: [
                { id: 'd1', text: 'Review your resume - know every project mentioned' },
                { id: 'd2', text: 'Test your projects - make sure they are working/deployed' },
                { id: 'd3', text: 'Prepare 2-3 questions to ask the interviewer' },
                { id: 'd4', text: 'Get good sleep!' },
                { id: 'd5', text: 'Have water and notes ready (for virtual interviews)' }
            ]
        },
        {
            title: '💡 Interview Tips',
            items: [
                { id: 't1', text: 'Think out loud - show your problem-solving process' },
                { id: 't2', text: 'Ask clarifying questions before diving in' },
                { id: 't3', text: 'Its okay to say "I dont know, but heres how Id find out"' },
                { id: 't4', text: 'Use STAR format for behavioral questions' },
                { id: 't5', text: 'Be honest about your experience level' },
                { id: 't6', text: 'Show enthusiasm and willingness to learn' }
            ]
        }
    ]
};

export default checklistData;
