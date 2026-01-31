export const performanceData = {
    id: 'performance',
    title: 'Performance & Scalability',
    icon: '🚀',
    description: 'Optimize applications with caching, pagination, indexing, and frontend performance techniques',
    subtopics: [
        {
            id: 'optimization',
            title: 'Performance Optimization',
            tags: ['speed', 'frontend', 'backend'],
            definition: 'Performance optimization reduces load times and improves user experience through various techniques at frontend and backend levels.',
            keyPoints: [
                'Frontend: minimize JS/CSS, lazy loading, image optimization',
                'Backend: database indexing, query optimization, caching',
                'Pagination reduces data transferred',
                'CDN for static assets',
                'Gzip/Brotli compression',
                'Code splitting for large apps'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Pagination & Caching',
                    language: 'javascript',
                    code: `// Backend: Pagination
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const users = await User.find()
    .skip(skip)
    .limit(limit);
  
  const total = await User.countDocuments();
  
  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// Simple in-memory cache
const cache = new Map();

app.get('/api/expensive', async (req, res) => {
  const key = 'expensive_data';
  
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }
  
  const data = await expensiveOperation();
  cache.set(key, data);
  setTimeout(() => cache.delete(key), 60000); // expire 1 min
  
  res.json(data);
});`
                }
            ],
            interviewQuestions: [
                {
                    question: 'How do you optimize a slow web application?',
                    answer: '1) Measure first (Lighthouse, DevTools). Frontend: minimize bundles, lazy load images/routes, optimize images, use CDN. Backend: add indexes, optimize queries, implement caching, paginate large lists. Network: compression, HTTP/2, reduce requests.',
                    difficulty: 'medium'
                },
                {
                    question: 'What is database indexing?',
                    answer: 'Index = data structure for fast lookups (like book index). Without index, database scans all rows. Create indexes on frequently queried/filtered columns. Tradeoff: faster reads, slower writes. Dont over-index.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default performanceData;
