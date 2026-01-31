export const authenticationData = {
    id: 'authentication',
    title: 'Authentication (JWT)',
    icon: '🔐',
    description: 'Implement secure authentication with JWT tokens and understand auth vs authorization',
    subtopics: [
        {
            id: 'jwt-flow',
            title: 'JWT Authentication Flow',
            tags: ['JWT', 'tokens', 'security'],
            definition: 'JWT (JSON Web Token) is a stateless authentication method where server creates signed token on login, client stores and sends it with requests.',
            keyPoints: [
                'JWT = Header.Payload.Signature (base64 encoded)',
                'Header: algorithm and type',
                'Payload: user data (claims), expiration',
                'Signature: verifies token integrity',
                'Stateless - server doesnt store sessions',
                'Send in Authorization: Bearer <token>',
                'Verify on each protected request'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'JWT Flow (Node.js)',
                    language: 'javascript',
                    code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// LOGIN: Create token
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Create token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  res.json({ token, user: { id: user._id, email: user.email } });
});

// MIDDLEWARE: Verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// PROTECTED ROUTE
app.get('/api/profile', auth, (req, res) => {
  res.json({ user: req.user });
});`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Storing JWT in localStorage without XSS protection',
                    why: 'localStorage accessible by JavaScript - XSS attack can steal token.',
                    correct: 'Use HTTP-only cookies (immune to XSS) or protect against XSS rigorously.'
                },
                {
                    mistake: 'Including sensitive data in JWT payload',
                    why: 'JWT payload is base64 encoded (NOT encrypted) - anyone can read it.',
                    correct: 'Only include user ID and necessary claims. Never passwords or sensitive data.'
                }
            ],
            interviewQuestions: [
                {
                    question: 'How does JWT authentication work?',
                    answer: '1) User logs in with credentials. 2) Server verifies, creates signed JWT with user data + expiration. 3) Client stores token (localStorage or cookie). 4) Client sends token in Authorization header. 5) Server verifies signature + expiration on each request.',
                    tip: 'Draw the flow diagram showing login → token → protected requests.',
                    difficulty: 'medium'
                },
                {
                    question: 'Authentication vs Authorization?',
                    answer: 'Authentication = verify WHO you are (login, identity). Authorization = verify WHAT you can do (permissions, roles). Auth happens first, then authorization checks if authenticated user has permission for action.',
                    difficulty: 'easy'
                },
                {
                    question: 'Where to store JWT: localStorage vs cookies?',
                    answer: 'localStorage: easier to implement, vulnerable to XSS attacks (JS can read). HTTP-only cookies: immune to XSS, vulnerable to CSRF (use CSRF tokens). For high security, use HTTP-only cookies with CSRF protection.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default authenticationData;
