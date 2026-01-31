export const miniProjectsData = {
    id: 'miniprojects',
    title: 'Mini Projects',
    icon: '🛠️',
    description: 'Three practical projects to consolidate your learning and showcase in interviews',
    subtopics: [
        {
            id: 'auth-app',
            title: 'Project 1: Auth App',
            tags: ['authentication', 'JWT', 'full-stack'],
            definition: 'A complete authentication system with registration, login, protected routes, and token-based auth.',
            keyPoints: [
                'User registration with validation',
                'Secure password hashing (bcrypt)',
                'JWT token generation and verification',
                'Protected routes requiring authentication',
                'Login/Logout flow',
                'Password reset (optional)'
            ],
            codeExamples: [
                {
                    level: 'Project',
                    title: 'Folder Structure',
                    language: 'javascript',
                    code: `auth-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
├── server/                 # Node.js backend
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
└── package.json`
                },
                {
                    level: 'Key Code',
                    title: 'Auth Context (Frontend)',
                    language: 'javascript',
                    code: `// AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user
      fetch('/api/auth/me', {
        headers: { Authorization: \`Bearer \${token}\` }
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}`
                }
            ],
            interviewQuestions: [
                {
                    question: 'Walk me through your auth app',
                    answer: 'Built with React frontend and Node.js backend. User registers with email/password, password hashed with bcrypt, stored in MongoDB. On login, server verifies password, returns JWT. Token stored in localStorage, sent with requests. Protected routes check token validity.',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'crud-dashboard',
            title: 'Project 2: CRUD Dashboard',
            tags: ['CRUD', 'React', 'API'],
            definition: 'An admin dashboard for managing resources with full Create, Read, Update, Delete functionality.',
            keyPoints: [
                'List view with pagination',
                'Search and filter functionality',
                'Create/Edit forms with validation',
                'Delete with confirmation',
                'Loading and error states',
                'Responsive data tables'
            ],
            codeExamples: [
                {
                    level: 'Key Code',
                    title: 'CRUD Hook',
                    language: 'javascript',
                    code: `// useResource.js - Custom hook for CRUD operations
function useResource(resourceUrl) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(resourceUrl);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item) => {
    const res = await fetch(resourceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    return newItem;
  };

  const updateItem = async (id, updates) => {
    const res = await fetch(\`\${resourceUrl}/\${id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const updated = await res.json();
    setItems(items.map(i => i.id === id ? updated : i));
    return updated;
  };

  const deleteItem = async (id) => {
    await fetch(\`\${resourceUrl}/\${id}\`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  useEffect(() => { fetchItems(); }, []);

  return { items, loading, error, createItem, updateItem, deleteItem, refetch: fetchItems };
}`
                }
            ]
        },
        {
            id: 'task-manager',
            title: 'Project 3: Full Stack Task Manager',
            tags: ['full-stack', 'MERN', 'complete'],
            definition: 'A complete task management application demonstrating the full MERN stack with all features.',
            keyPoints: [
                'User authentication',
                'Create, edit, delete tasks',
                'Task status (todo, in-progress, done)',
                'Due dates and priorities',
                'Filter and sort tasks',
                'Responsive design'
            ],
            codeExamples: [
                {
                    level: 'Project',
                    title: 'Folder Structure',
                    language: 'javascript',
                    code: `task-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
└── README.md`
                }
            ],
            interviewQuestions: [
                {
                    question: 'How would you explain your task manager project?',
                    answer: 'MERN stack app - MongoDB, Express, React, Node. Features: JWT auth, task CRUD, status tracking (Kanban-style), due dates, priority levels. Used React hooks for state, Express middleware for auth, Mongoose for MongoDB. Deployed on Vercel/Heroku with CI/CD.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default miniProjectsData;
