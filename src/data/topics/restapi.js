export const restapiData = {
    id: 'restapi',
    title: 'REST APIs',
    icon: '🔌',
    description: 'Master REST API design, HTTP methods, status codes, authentication, and best practices for building scalable APIs',
    subtopics: [
        {
            id: 'http-methods',
            title: 'HTTP Methods & Status Codes',
            tags: ['HTTP', 'methods', 'status', 'CRUD'],
            definition: 'REST APIs use standard HTTP methods to perform CRUD operations on resources. Each method has specific semantics, and status codes communicate the result of each request.',
            whyItExists: 'HTTP methods provide a standardized way for clients and servers to communicate actions. Using consistent methods makes APIs predictable and easier to understand. Status codes eliminate the need for custom error formats.',
            howItWorks: 'When a client makes a request, it specifies an HTTP method (verb) that indicates the intended action. The server processes the request and responds with a status code indicating success, client error, or server error, along with any relevant data.',
            keyPoints: [
                'GET: Retrieve data (safe, idempotent, cacheable)',
                'POST: Create new resource (not idempotent, returns 201 Created)',
                'PUT: Replace entire resource (idempotent, include all fields)',
                'PATCH: Partial update (idempotent, only changed fields)',
                'DELETE: Remove resource (idempotent, returns 204 No Content)',
                'OPTIONS: Check allowed methods (CORS preflight)',
                'HEAD: GET without response body (check resource exists)',
                '2xx Success: 200 OK, 201 Created, 204 No Content',
                '3xx Redirect: 301 Moved Permanently, 304 Not Modified',
                '4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity',
                '5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable'
            ],
            whenToUse: [
                'GET when fetching data without side effects',
                'POST when creating new resources or complex operations',
                'PUT when you have the complete updated resource',
                'PATCH when updating only specific fields',
                'DELETE when removing resources permanently'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Basic CRUD with Fetch API',
                    language: 'javascript',
                    code: `// GET - Retrieve all users
const getUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json(); // Returns array of users
};

// GET - Retrieve single user
const getUser = async (id) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  if (response.status === 404) return null; // User not found
  return response.json();
};

// POST - Create new user
const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token-here'
    },
    body: JSON.stringify(userData)
  });
  
  if (response.status === 201) {
    return response.json(); // Returns created user with ID
  }
  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message); // Validation error
  }
};

// Example usage
createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
});`
                },
                {
                    level: 'Intermediate',
                    title: 'PUT vs PATCH Comparison',
                    language: 'javascript',
                    code: `// Current user in database:
// { id: 1, name: "John", email: "john@old.com", role: "user", active: true }

// PUT - Replace ENTIRE resource (must send ALL fields)
const updateUserPUT = async (id, userData) => {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Updated',
      email: 'john@new.com',
      role: 'admin',
      active: true  // Must include ALL fields!
    })
  });
  // Missing fields would be set to null/default
  return response.json();
};

// PATCH - Partial update (only changed fields)
const updateUserPATCH = async (id, partialData) => {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'john@new.com'  // Only updating email
      // Other fields remain unchanged
    })
  });
  return response.json();
};

// DELETE - Remove resource
const deleteUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer admin-token' }
  });
  
  if (response.status === 204) {
    console.log('User deleted successfully');
    return true;
  }
  if (response.status === 404) {
    console.log('User not found');
    return false;
  }
};`
                },
                {
                    level: 'Advanced',
                    title: 'Complete API Client with Error Handling',
                    language: 'javascript',
                    code: `class APIClient {
  constructor(baseURL, authToken) {
    this.baseURL = baseURL;
    this.authToken = authToken;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.authToken}\`,
        ...options.headers,
      },
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);

    // Handle different status codes
    switch (response.status) {
      case 200: // OK
      case 201: // Created
        return response.json();
      
      case 204: // No Content
        return null;
      
      case 400: // Bad Request
        const badRequest = await response.json();
        throw new ValidationError(badRequest.errors);
      
      case 401: // Unauthorized
        throw new AuthenticationError('Please log in again');
      
      case 403: // Forbidden
        throw new AuthorizationError('Permission denied');
      
      case 404: // Not Found
        throw new NotFoundError(\`Resource not found: \${endpoint}\`);
      
      case 422: // Unprocessable Entity
        const validation = await response.json();
        throw new ValidationError(validation.errors);
      
      case 429: // Too Many Requests
        throw new RateLimitError('Rate limit exceeded');
      
      case 500: // Server Error
      case 502:
      case 503:
        throw new ServerError('Server error, please try again');
      
      default:
        throw new Error(\`Unexpected status: \${response.status}\`);
    }
  }

  // Convenience methods
  get(endpoint) { return this.request(endpoint); }
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body }); }
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body }); }
  patch(endpoint, body) { return this.request(endpoint, { method: 'PATCH', body }); }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }
}

// Usage
const api = new APIClient('https://api.example.com', 'your-token');

try {
  const users = await api.get('/users');
  const newUser = await api.post('/users', { name: 'Jane', email: 'jane@example.com' });
  await api.patch(\`/users/\${newUser.id}\`, { role: 'admin' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Fix these fields:', error.errors);
  }
}`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Using GET for operations with side effects',
                    why: 'GET requests can be cached, repeated, and prefetched by browsers. Using GET to delete or modify data is dangerous.',
                    correct: 'Use POST/PUT/DELETE for state-changing operations. GET should only retrieve data.'
                },
                {
                    mistake: 'Ignoring status codes and only checking response body',
                    why: 'Status codes provide immediate context. Checking only the body requires parsing and custom error handling.',
                    correct: 'Always check response.ok or response.status before processing the body.'
                },
                {
                    mistake: 'Using PUT when PATCH is appropriate',
                    why: 'PUT requires sending the complete resource. Missing fields may be set to null, causing data loss.',
                    correct: 'Use PATCH for partial updates. Use PUT only when replacing the entire resource.'
                }
            ],
            output: {
                description: 'HTTP responses for different operations:',
                result: `GET /api/users → 200 OK
[{"id":1,"name":"John"},{"id":2,"name":"Jane"}]

POST /api/users → 201 Created
Location: /api/users/3
{"id":3,"name":"New User","createdAt":"2024-01-15"}

PATCH /api/users/1 → 200 OK
{"id":1,"name":"Updated Name","email":"same@email.com"}

DELETE /api/users/1 → 204 No Content
(empty response body)

GET /api/users/999 → 404 Not Found
{"error":"User not found","code":"USER_NOT_FOUND"}`
            },
            interviewQuestions: [
                {
                    question: 'What is the difference between PUT and PATCH?',
                    answer: 'PUT replaces the ENTIRE resource - you must send all fields, missing fields become null. PATCH updates only the specified fields - existing fields remain unchanged. Both are idempotent. Example: To update just email, PATCH sends { email: "new@mail.com" }, while PUT must send { name, email, role, ... }.',
                    difficulty: 'easy',
                    tip: 'Remember: PUT = "replace", PATCH = "edit"'
                },
                {
                    question: 'What does idempotent mean and which HTTP methods are idempotent?',
                    answer: 'Idempotent means making the same request multiple times produces the same result as making it once. GET, PUT, PATCH, DELETE are idempotent. POST is NOT - each POST creates a new resource. This matters for retry logic: safe to retry idempotent requests on network failure.',
                    difficulty: 'medium',
                    tip: 'Think of DELETE: deleting user 1 twice = user 1 is deleted. POST: creating user twice = two users.'
                },
                {
                    question: 'When would you use 422 vs 400 status code?',
                    answer: '400 Bad Request = request is malformed (invalid JSON, missing required headers). 422 Unprocessable Entity = request is valid but semantically incorrect (valid JSON but email format wrong, password too short). Use 400 for syntax errors, 422 for validation errors.',
                    difficulty: 'hard',
                    tip: 'Many APIs use 400 for both. 422 is more specific and RESTful.'
                }
            ]
        },
        {
            id: 'rest-design',
            title: 'RESTful URL Design',
            tags: ['design', 'URLs', 'resources', 'conventions'],
            definition: 'RESTful URL design uses resource-based URLs with nouns, proper HTTP methods, and consistent naming conventions to create intuitive and maintainable APIs.',
            whyItExists: 'Well-designed URLs make APIs self-documenting and predictable. Developers can often guess endpoint URLs based on conventions, reducing learning curve and documentation needs.',
            howItWorks: 'URLs represent resources (nouns) while HTTP methods represent actions (verbs). Nested URLs show relationships. Query parameters handle filtering, sorting, and pagination without creating new endpoints.',
            keyPoints: [
                'Use nouns, not verbs (✓ /users ✗ /getUsers)',
                'Use plural nouns (✓ /users ✗ /user)',
                'Use kebab-case for multi-word (✓ /user-profiles ✗ /userProfiles)',
                'Nest resources to show relationships (/users/1/orders)',
                'Limit nesting to 2 levels max (/users/1/orders not /users/1/orders/5/items/3)',
                'Use query params for filtering (?status=active&sort=name)',
                'Version your API (/api/v1/users)',
                'Use consistent response formats (always JSON)',
                'Return resource on create/update (not just success message)'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'RESTful URL Examples',
                    language: 'javascript',
                    code: `// ✅ GOOD RESTful Design
GET    /api/v1/users              // List all users
GET    /api/v1/users/123          // Get user 123
POST   /api/v1/users              // Create user
PUT    /api/v1/users/123          // Replace user 123
PATCH  /api/v1/users/123          // Update user 123
DELETE /api/v1/users/123          // Delete user 123

// Nested resources (relationships)
GET    /api/v1/users/123/orders          // User 123's orders
GET    /api/v1/users/123/orders/456      // Order 456 of user 123
POST   /api/v1/users/123/orders          // Create order for user 123

// Query parameters for filtering/sorting/pagination
GET    /api/v1/users?role=admin          // Filter by role
GET    /api/v1/users?sort=createdAt:desc // Sort descending
GET    /api/v1/users?page=2&limit=20     // Pagination
GET    /api/v1/users?fields=id,name,email // Sparse fieldsets

// Combined query parameters
GET    /api/v1/products?category=electronics&minPrice=100&maxPrice=500&sort=price:asc&page=1&limit=10

// ❌ BAD Design (avoid these anti-patterns)
GET    /api/getUsers              // Verb in URL
GET    /api/user                   // Singular
GET    /api/users/delete/123       // Action in URL
POST   /api/createNewUser         // Redundant verb
GET    /api/UserProfile           // PascalCase
GET    /api/users/123/orders/456/items/789/details  // Too deep nesting`
                },
                {
                    level: 'Intermediate',
                    title: 'Express.js RESTful Routes',
                    language: 'javascript',
                    code: `const express = require('express');
const router = express.Router();

// Resource: Users
router.get('/users', async (req, res) => {
  const { role, sort, page = 1, limit = 10 } = req.query;
  
  let query = User.find();
  
  // Filtering
  if (role) query = query.where('role').equals(role);
  
  // Sorting
  if (sort) {
    const [field, order] = sort.split(':');
    query = query.sort({ [field]: order === 'desc' ? -1 : 1 });
  }
  
  // Pagination
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(parseInt(limit));
  
  const users = await query.exec();
  const total = await User.countDocuments();
  
  res.json({
    data: users,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/users', validateUser, async (req, res) => {
  const user = await User.create(req.body);
  res.status(201)
     .location(\`/api/v1/users/\${user._id}\`)
     .json(user);
});

router.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
});

// Nested resource: User's orders
router.get('/users/:userId/orders', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Using verbs in URLs like /getUsers or /deleteUser/123',
                    why: 'HTTP methods already indicate the action. Verbs in URLs are redundant and inconsistent.',
                    correct: 'Use nouns for resources: GET /users, DELETE /users/123'
                },
                {
                    mistake: 'Deep nesting like /users/1/orders/2/items/3/variants/4',
                    why: 'Deep nesting creates complex URLs and tight coupling between resources.',
                    correct: 'Limit to 2 levels. Use direct access: /order-items/3 or /variants/4'
                },
                {
                    mistake: 'Inconsistent naming: /users, /Product, /order_items',
                    why: 'Inconsistency confuses developers and makes the API harder to learn.',
                    correct: 'Pick one convention (plural, kebab-case) and stick to it everywhere.'
                }
            ],
            output: {
                description: 'Example API response with proper structure:',
                result: `GET /api/v1/users?role=admin&page=1&limit=2

{
  "data": [
    {"id": 1, "name": "Admin User", "role": "admin"},
    {"id": 5, "name": "Super Admin", "role": "admin"}
  ],
  "meta": {
    "page": 1,
    "limit": 2,
    "total": 8,
    "pages": 4
  },
  "links": {
    "self": "/api/v1/users?role=admin&page=1&limit=2",
    "next": "/api/v1/users?role=admin&page=2&limit=2",
    "last": "/api/v1/users?role=admin&page=4&limit=2"
  }
}`
            },
            interviewQuestions: [
                {
                    question: 'What makes an API RESTful?',
                    answer: '6 REST constraints: 1) Client-server separation, 2) Stateless (no session on server), 3) Cacheable (responses indicate cacheability), 4) Uniform interface (standard methods + resource URLs), 5) Layered system (can add proxies/load balancers), 6) Code on demand (optional - send executable code). Most important: stateless + uniform interface.',
                    difficulty: 'medium',
                    tip: 'Focus on stateless and resource-based URLs in interviews.'
                },
                {
                    question: 'How would you design a URL for getting all comments on a specific blog post?',
                    answer: 'GET /api/v1/posts/123/comments - uses nested resource pattern showing relationship. Alternative: GET /api/v1/comments?postId=123 if comments are accessed independently. Both are valid, nested is more intuitive for direct relationships.',
                    difficulty: 'easy',
                    tip: 'Explain your reasoning - interviewers want to see your thought process.'
                }
            ]
        },
        {
            id: 'api-authentication',
            title: 'API Authentication & Security',
            tags: ['JWT', 'OAuth', 'security', 'tokens'],
            definition: 'API authentication verifies client identity using methods like API keys, JWT tokens, or OAuth. Security includes preventing common attacks and protecting sensitive data.',
            whyItExists: 'APIs expose data and functionality over the network. Without authentication, anyone could access, modify, or delete data. Security protects against attacks, data breaches, and abuse.',
            howItWorks: 'Client sends credentials (token, API key) with each request. Server validates credentials and checks permissions before processing. Tokens contain encoded user info and expire after a set time.',
            keyPoints: [
                'API Keys: Simple, static keys for server-to-server',
                'JWT: Self-contained tokens with user data + signature',
                'OAuth 2.0: Delegate authentication to providers (Google, GitHub)',
                'Bearer tokens: Sent in Authorization header',
                'Token expiration: Access tokens short-lived (15min-1hr)',
                'Refresh tokens: Long-lived (7-30 days) to get new access tokens',
                'HTTPS required: Never send tokens over HTTP',
                'Rate limiting: Prevent abuse and DDoS',
                'Input validation: Prevent injection attacks',
                'CORS: Control which domains can call your API'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'JWT Authentication Flow',
                    language: 'javascript',
                    code: `// 1. LOGIN - Get tokens
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (response.status === 401) {
    throw new Error('Invalid credentials');
  }
  
  const { accessToken, refreshToken, expiresIn } = await response.json();
  
  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  return { accessToken, refreshToken };
};

// 2. MAKE AUTHENTICATED REQUESTS
const getProtectedData = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/protected/data', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  if (response.status === 401) {
    // Token expired, try refresh
    await refreshAccessToken();
    return getProtectedData(); // Retry
  }
  
  return response.json();
};

// 3. REFRESH TOKEN
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  
  if (response.status === 401) {
    // Refresh token also expired - force re-login
    localStorage.clear();
    window.location.href = '/login';
    return;
  }
  
  const { accessToken } = await response.json();
  localStorage.setItem('accessToken', accessToken);
};

// 4. LOGOUT
const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  
  localStorage.clear();
  window.location.href = '/login';
};`
                },
                {
                    level: 'Intermediate',
                    title: 'Express.js JWT Middleware',
                    language: 'javascript',
                    code: `const jwt = require('jsonwebtoken');

// Generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  // Short-lived
  );
  
  const refreshToken = jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }  // Long-lived
  );
  
  return { accessToken, refreshToken };
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.slice(7); // Remove 'Bearer '
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Authorization middleware (check role)
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: allowedRoles,
        current: req.user.role
      });
    }
    
    next();
  };
};

// Usage in routes
app.get('/api/users', authenticate, (req, res) => {
  // User is authenticated
});

app.delete('/api/users/:id', 
  authenticate, 
  authorize('admin'), 
  (req, res) => {
    // Only admins can delete users
  }
);`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Storing JWTs in localStorage (vulnerable to XSS)',
                    why: 'Any JavaScript on your page can read localStorage, including malicious scripts from XSS attacks.',
                    correct: 'Store in httpOnly cookies (not accessible to JS) or use short-lived tokens with refresh rotation.'
                },
                {
                    mistake: 'Not implementing token refresh and forcing re-login',
                    why: 'Bad UX - users have to re-login every 15 minutes. Also insecure with long-lived access tokens.',
                    correct: 'Use short access tokens (15min) + long refresh tokens (7 days) with automatic refresh.'
                },
                {
                    mistake: 'Sending tokens over HTTP instead of HTTPS',
                    why: 'HTTP is unencrypted - anyone can intercept the token and impersonate the user.',
                    correct: 'Always use HTTPS in production. Set cookies with Secure flag.'
                }
            ],
            output: {
                description: 'JWT authentication response flow:',
                result: `POST /api/auth/login
Body: {"email":"john@example.com","password":"secret123"}

Response 200 OK:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer",
  "user": {"id": 1, "email": "john@example.com", "role": "user"}
}

Authenticated request:
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response 200 OK:
{"id": 1, "name": "John", "email": "john@example.com"}`
            },
            interviewQuestions: [
                {
                    question: 'How do you handle JWT token expiration?',
                    answer: 'Use two tokens: short-lived access token (15-60min) and long-lived refresh token (7-30 days). When access token expires (401), send refresh token to /refresh endpoint to get new access token. If refresh fails, redirect to login. This balances security (short attack window) with UX (no constant re-login).',
                    difficulty: 'medium',
                    tip: 'Mention security tradeoffs between token lifetime and user experience.'
                },
                {
                    question: 'Where should you store JWT tokens on the frontend?',
                    answer: 'Best: httpOnly cookies (immune to XSS, sent automatically). Avoid: localStorage (XSS vulnerable). Alternative: memory variable (clears on refresh, pair with refresh token in cookie). For SPAs, short-lived memory token + httpOnly refresh cookie is most secure.',
                    difficulty: 'hard',
                    tip: 'Show you understand XSS/CSRF tradeoffs between storage methods.'
                }
            ]
        },
        {
            id: 'error-handling',
            title: 'API Error Handling',
            tags: ['errors', 'validation', 'debugging'],
            definition: 'Proper API error handling returns consistent, informative error responses that help clients understand and recover from failures.',
            whyItExists: 'Clear error responses help frontend developers debug issues, show meaningful messages to users, and handle edge cases gracefully.',
            howItWorks: 'Server catches errors, categorizes them (validation, authentication, not found, server error), and returns structured JSON with error code, message, and details. Clients parse this and take appropriate action.',
            keyPoints: [
                'Use consistent error format across all endpoints',
                'Include error code (machine-readable) and message (human-readable)',
                'Return appropriate HTTP status codes',
                'Provide field-level validation errors',
                'Never expose stack traces in production',
                'Log errors server-side with context',
                'Include request ID for debugging',
                'Handle async errors with try-catch or middleware'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Consistent Error Response Format',
                    language: 'javascript',
                    code: `// Standardized error response format
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {"field": "email", "message": "Invalid email format"},
      {"field": "password", "message": "Must be at least 8 characters"}
    ]
  },
  "requestId": "req-abc123",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Different error types
// 400 Bad Request
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [...]
  }
}

// 401 Unauthorized
{
  "success": false,
  "error": {
    "code": "AUTH_REQUIRED",
    "message": "Authentication required"
  }
}

// 404 Not Found
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "resource": "user",
    "id": "123"
  }
}

// 500 Internal Server Error
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req-xyz789"  // For support
  }
}`
                },
                {
                    level: 'Intermediate',
                    title: 'Express.js Error Handling Middleware',
                    language: 'javascript',
                    code: `// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.details = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(\`\${resource} not found\`, 404, 'NOT_FOUND');
    this.resource = resource;
    this.resourceId = id;
  }
}

// Error handling middleware (must have 4 params)
const errorHandler = (err, req, res, next) => {
  // Generate request ID for debugging
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  
  // Log error with context
  console.error({
    requestId,
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id
  });
  
  // Determine status and format response
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  
  const errorResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.isOperational ? err.message : 'An unexpected error occurred',
      ...(err.details && { details: err.details }),
      ...(err.resource && { resource: err.resource }),
    },
    requestId,
    timestamp: new Date().toISOString(),
    // Include stack in development only
    ...(!isProduction && { stack: err.stack })
  };
  
  res.status(statusCode).json(errorResponse);
};

// Async handler wrapper (no try-catch needed in routes)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in routes
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError('User', req.params.id);
  }
  res.json(user);
}));

// Register error handler last
app.use(errorHandler);`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Exposing stack traces in production',
                    why: 'Stack traces reveal internal code structure, file paths, and potentially sensitive info useful for attackers.',
                    correct: 'Check NODE_ENV and only include stack in development. Return generic message in production.'
                },
                {
                    mistake: 'Not handling async errors (unhandled promise rejection)',
                    why: 'Uncaught async errors crash the server or return empty responses.',
                    correct: 'Use asyncHandler wrapper or express-async-errors package.'
                }
            ],
            output: {
                description: 'Error handling flow example:',
                result: `Request: POST /api/users
Body: { "email": "invalid", "password": "123" }

Response: 400 Bad Request
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {"field": "email", "message": "Must be a valid email address"},
      {"field": "password", "message": "Must be at least 8 characters"}
    ]
  },
  "requestId": "req-1705312200-abc",
  "timestamp": "2024-01-15T10:30:00Z"
}`
            },
            interviewQuestions: [
                {
                    question: 'How do you structure API error responses for a good developer experience?',
                    answer: 'Use consistent format with: HTTP status code (machine), error code (for programmatic handling), message (human readable), details array (for field-level validation), requestId (for debugging). Example: { success: false, error: { code: "VALIDATION_ERROR", message: "...", details: [...] }, requestId: "..." }',
                    difficulty: 'medium',
                    tip: 'Emphasize consistency and actionable information.'
                }
            ]
        }
    ]
};

export default restapiData;
