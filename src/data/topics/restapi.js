export const restapiData = {
    id: 'restapi',
    title: 'REST APIs',
    icon: '🔌',
    description: 'Understand REST API design, HTTP methods, status codes, and best practices',
    subtopics: [
        {
            id: 'http-methods',
            title: 'HTTP Methods & Status Codes',
            tags: ['HTTP', 'methods', 'status'],
            definition: 'REST uses standard HTTP methods to perform operations on resources. Status codes indicate the result of the request.',
            keyPoints: [
                'GET: Retrieve resource (safe, idempotent)',
                'POST: Create resource (not idempotent)',
                'PUT: Replace entire resource (idempotent)',
                'PATCH: Partial update (idempotent)',
                'DELETE: Remove resource (idempotent)',
                '2xx: Success (200 OK, 201 Created, 204 No Content)',
                '4xx: Client error (400 Bad Request, 401 Unauthorized, 404 Not Found)',
                '5xx: Server error (500 Internal Server Error)'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'HTTP Methods Example',
                    language: 'javascript',
                    code: `// GET - Retrieve users
fetch('/api/users')
  .then(res => res.json());

// POST - Create user
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});

// PUT - Replace entire user
fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Updated', email: 'new@example.com' })
});

// PATCH - Partial update
fetch('/api/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Just Name Update' })
});

// DELETE - Remove user
fetch('/api/users/1', { method: 'DELETE' });`
                }
            ],
            interviewQuestions: [
                {
                    question: 'PUT vs PATCH - what is the difference?',
                    answer: 'PUT replaces the ENTIRE resource - must send all fields. PATCH updates only specified fields - partial update. Both are idempotent. PUT is like replacing a file, PATCH is like editing specific lines.',
                    difficulty: 'easy'
                },
                {
                    question: 'What does idempotent mean?',
                    answer: 'Idempotent = making same request multiple times has same effect as once. GET, PUT, DELETE are idempotent. POST is NOT - each call creates new resource. Important for retry logic and caching.',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'rest-best-practices',
            title: 'REST Best Practices',
            tags: ['design', 'conventions', 'API'],
            definition: 'RESTful API design follows conventions for consistent, predictable, and maintainable APIs.',
            keyPoints: [
                'Use nouns for endpoints (/users not /getUsers)',
                'Use plural nouns (/users not /user)',
                'Nested resources: /users/1/orders',
                'Use query params for filtering/sorting',
                'Version your API: /api/v1/users',
                'Return appropriate status codes',
                'Handle errors consistently'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'RESTful URL Design',
                    language: 'javascript',
                    code: `// GOOD REST Design
GET    /api/v1/users          // List all users
GET    /api/v1/users/1        // Get user 1
POST   /api/v1/users          // Create user
PUT    /api/v1/users/1        // Update user 1
DELETE /api/v1/users/1        // Delete user 1

GET    /api/v1/users/1/orders // User 1's orders (nested)

// Query parameters for filtering
GET /api/v1/users?active=true&sort=name&limit=10

// BAD Design (avoid these)
GET /api/getUsers
GET /api/user/delete/1
POST /api/createNewUser`
                }
            ],
            interviewQuestions: [
                {
                    question: 'What makes an API RESTful?',
                    answer: 'REST principles: Stateless (no session stored), Client-server separation, Uniform interface (standard HTTP methods), Resource-based URLs (nouns), Cacheable, Layered system. Most important: stateless + resource-based URLs.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default restapiData;
