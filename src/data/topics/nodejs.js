export const nodejsData = {
  id: 'nodejs',
  title: 'Node.js + Express',
  icon: '🟢',
  description: 'Backend development with Node.js and Express - APIs, middleware, and server-side JavaScript',
  subtopics: [
    {
      id: 'node-basics',
      title: 'Node.js Fundamentals',
      tags: ['runtime', 'backend', 'async'],
      definition: 'Node.js is a JavaScript runtime built on Chrome V8 engine that lets you run JavaScript on the server. Its event-driven and non-blocking.',
      whyItExists: 'Before Node.js, JavaScript only ran in browsers. Node enables full-stack JS, sharing code between frontend and backend.',
      keyPoints: [
        'V8 engine executes JS outside browser',
        'Event-driven, non-blocking I/O',
        'Single-threaded with event loop',
        'NPM - largest package ecosystem',
        'CommonJS modules (require/exports)',
        'ES Modules supported (import/export)',
        'Great for I/O-heavy apps, APIs'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Basic Node.js Server',
          language: 'javascript',
          code: `// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js!</h1>');
  } else if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`
        }
      ],
      output: {
        description: 'Running the server and making requests:',
        result: `$ node server.js
Server running on http://localhost:3000

GET http://localhost:3000/
→ <h1>Hello from Node.js!</h1>

GET http://localhost:3000/api/users
→ [{"id":1,"name":"John"}]

GET http://localhost:3000/unknown
→ Not Found (404)`
      },
      commonMistakes: [
        {
          mistake: 'Blocking the event loop',
          why: 'CPU-intensive sync operations block all requests.',
          correct: 'Use async operations, worker threads for CPU tasks.'
        },
        {
          mistake: 'Not handling errors in async code',
          why: 'Unhandled errors crash the server.',
          correct: 'Always .catch() promises or use try/catch with async/await.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How is Node.js single-threaded yet handles concurrent requests?',
          answer: 'Event loop! Node delegates I/O to OS/thread pool, continues executing. When I/O completes, callback is queued. Single thread processes callbacks one at a time. Non-blocking allows handling many concurrent connections.',
          difficulty: 'medium'
        },
        {
          question: 'What is the difference between require and import?',
          answer: 'require = CommonJS (Node default), synchronous, dynamic. import = ES Modules, async, static (enables tree-shaking). Use import in new projects, add "type": "module" to package.json.',
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'express-basics',
      title: 'Express.js Fundamentals',
      tags: ['framework', 'routing', 'web'],
      definition: 'Express is a minimal, flexible Node.js web framework providing robust features for web and mobile applications.',
      whyItExists: 'Raw Node.js requires manual routing, parsing, etc. Express simplifies building APIs with middleware, routing, and helpful utilities.',
      keyPoints: [
        'Minimal and unopinionated',
        'Middleware-based architecture',
        'Powerful routing system',
        'Easy request/response handling',
        'Template engine support',
        'Large ecosystem of middleware'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Basic Express Server',
          language: 'javascript',
          code: `const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'User ' + id });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // Validate and save to database...
  res.status(201).json({ 
    id: Date.now(), 
    name, 
    email 
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
        }
      ],
      output: {
        description: 'API responses for different endpoints:',
        result: `GET /api/users
→ 200 OK
→ [{"id":1,"name":"John"},{"id":2,"name":"Jane"}]

GET /api/users/5
→ 200 OK
→ {"id":"5","name":"User 5"}

POST /api/users
Body: {"name":"Bob","email":"bob@mail.com"}
→ 201 Created
→ {"id":1706123456789,"name":"Bob","email":"bob@mail.com"}`
      },
      commonMistakes: [
        {
          mistake: 'Not using express.json() middleware',
          why: 'req.body will be undefined for JSON requests.',
          correct: 'Add app.use(express.json()) before routes.'
        },
        {
          mistake: 'Calling res.send() multiple times',
          why: 'Cannot set headers after they are sent to client.',
          correct: 'Use return res.send() or use if/else properly.'
        },
        {
          mistake: 'Wrong HTTP status codes',
          why: 'Misleads clients and debugging. Always 200 hides errors.',
          correct: '201 for created, 400 for bad request, 404 for not found, 500 for server error.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is Express middleware?',
          answer: 'Functions with access to req, res, next. Execute in order, can modify req/res, end request, or call next(). Used for logging, auth, parsing, error handling. app.use() registers middleware.',
          difficulty: 'medium'
        },
        {
          question: 'What is the order of middleware execution?',
          answer: 'Top to bottom as declared. Must call next() to continue chain. Route handlers are terminal middleware (usually dont call next). Order matters - declare error handlers last.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'middleware',
      title: 'Express Middleware',
      tags: ['middleware', 'auth', 'logging'],
      definition: 'Middleware functions have access to request, response, and next function. They can execute code, modify req/res, end the cycle, or call next middleware.',
      keyPoints: [
        'Runs in order declared',
        'Must call next() or send response',
        'app.use() for all routes',
        'app.use(path) for specific paths',
        'Types: application, router, error-handling, third-party'
      ],
      codeExamples: [
        {
          level: 'Intermediate',
          title: 'Custom Middleware Examples',
          language: 'javascript',
          code: `// Logger middleware
const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.url} \${res.statusCode} - \${duration}ms\`);
  });
  next();
};

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply middleware
app.use(logger); // All routes

app.get('/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

// Protected routes
app.use('/api', authenticate); // Only /api routes
app.get('/api/profile', (req, res) => {
  res.json({ user: req.user });
});`
        }
      ],
      output: {
        description: 'Middleware execution flow:',
        result: `Request: GET /api/profile
Headers: { Authorization: "Bearer eyJhbG..." }

Console Output:
GET /api/profile 200 - 15ms

Response Flow:
1. logger middleware → starts timer
2. authenticate middleware → verifies token, sets req.user
3. route handler → sends response
4. logger finish event → logs duration

Without Token:
GET /api/profile 401 - 2ms
→ {"error":"No token provided"}`
      },
      commonMistakes: [
        {
          mistake: 'Forgetting to call next()',
          why: 'Request hangs forever, no response sent.',
          correct: 'Always call next() or send response.'
        },
        {
          mistake: 'Calling next() after sending response',
          why: 'Causes "headers already sent" error.',
          correct: 'Use return res.send() to exit middleware.'
        },
        {
          mistake: 'Wrong middleware order',
          why: 'Auth middleware after route = route unprotected.',
          correct: 'Declare middleware before routes that need it.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How do you handle errors in Express middleware?',
          answer: 'Pass error to next(err). Define error handler with 4 params: (err, req, res, next). Must be last middleware. Handle different error types, send appropriate status code.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      tags: ['errors', 'middleware', 'async'],
      definition: 'Proper error handling in Express catches synchronous and asynchronous errors, providing meaningful responses to clients.',
      keyPoints: [
        'Error middleware has 4 params: (err, req, res, next)',
        'Must be defined LAST after all routes',
        'Sync errors caught automatically',
        'Async errors need next(err) or try/catch',
        'Express 5+ handles async errors automatically'
      ],
      codeExamples: [
        {
          level: 'Intermediate',
          title: 'Complete Error Handling',
          language: 'javascript',
          code: `// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async wrapper (avoids try/catch in every route)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes with error handling
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json(user);
}));

// 404 handler (after all routes)
app.use((req, res, next) => {
  next(new AppError(\`Route \${req.url} not found\`, 404));
});

// Global error handler (MUST be last)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  // Log error for debugging
  console.error('Error:', err);
  
  // Send response
  res.status(err.statusCode).json({
    status: 'error',
    message: err.isOperational ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});`
        }
      ],
      output: {
        description: 'Error responses in different scenarios:',
        result: `GET /api/users/nonexistent
→ 404 Not Found
→ {"status":"error","message":"User not found"}

GET /unknown-route
→ 404 Not Found  
→ {"status":"error","message":"Route /unknown-route not found"}

Database connection fails:
→ 500 Internal Server Error
→ {"status":"error","message":"Something went wrong"}

Development mode includes stack trace for debugging.`
      },
      commonMistakes: [
        {
          mistake: 'Not catching async errors',
          why: 'Unhandled promise rejections crash Node or hang request.',
          correct: 'Wrap async handlers in try/catch or use asyncHandler wrapper.'
        },
        {
          mistake: 'Exposing stack traces in production',
          why: 'Security risk - reveals internal code structure.',
          correct: 'Send generic messages in production, detailed only in development.'
        },
        {
          mistake: 'Error handler not last',
          why: 'Wont catch errors from routes defined after it.',
          correct: 'Define error handler as absolute last middleware.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How do you handle async errors in Express?',
          answer: 'Options: 1) try/catch with next(err), 2) asyncHandler wrapper that catches and passes to next, 3) Express 5+ handles automatically. Always have global error middleware at end.',
          difficulty: 'medium'
        },
        {
          question: 'What is the difference between operational and programming errors?',
          answer: 'Operational: expected, recoverable (invalid input, DB timeout). Programming: bugs, unexpected (undefined variable, type error). Handle operational gracefully, let programming crash in development.',
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'rest-api-structure',
      title: 'RESTful API Structure',
      tags: ['REST', 'architecture', 'CRUD'],
      definition: 'A well-structured REST API follows conventions for routes, controllers, and models separation.',
      keyPoints: [
        'Separate routes, controllers, models',
        'Use router for route grouping',
        'Controllers handle business logic',
        'Models handle data layer',
        'Use HTTP methods correctly',
        'Consistent JSON response format'
      ],
      codeExamples: [
        {
          level: 'Intermediate',
          title: 'Structured API Project',
          language: 'javascript',
          code: `// routes/users.js
const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.delete);

module.exports = router;

// controllers/userController.js
const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// app.js - Mount routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);`
        }
      ],
      output: {
        description: 'API endpoints and responses:',
        result: `Project Structure:
├── app.js
├── routes/
│   └── users.js
├── controllers/
│   └── userController.js
├── models/
│   └── User.js
└── middleware/
    └── auth.js

API Responses:
GET /api/users
→ {"success":true,"data":[...]}

POST /api/users  
→ {"success":true,"data":{...}}  (201)

PUT /api/users/123  (with auth)
→ {"success":true,"data":{...}}

DELETE /api/users/123  (with auth)
→ {"success":true,"message":"Deleted"}`
      },
      commonMistakes: [
        {
          mistake: 'Putting all logic in routes',
          why: 'Hard to test, maintain, and reuse.',
          correct: 'Separate into controllers for logic, models for data.'
        },
        {
          mistake: 'Inconsistent response format',
          why: 'Frontend has to handle different structures.',
          correct: 'Always use same format: { success, data, message, error }'
        }
      ],
      interviewQuestions: [
        {
          question: 'How would you structure a Node.js API project?',
          answer: 'Separation of concerns: routes (URL mapping), controllers (business logic), models (data/DB), middleware (cross-cutting). Use environment variables for config. Error handling middleware at end.',
          difficulty: 'medium'
        }
      ]
    }
  ]
};

export default nodejsData;
