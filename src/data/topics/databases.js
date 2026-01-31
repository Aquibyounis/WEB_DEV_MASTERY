export const databasesData = {
    id: 'databases',
    title: 'SQL Databases',
    icon: '🗄️',
    description: 'Master SQL databases - queries, joins, schema design for MySQL/PostgreSQL',
    subtopics: [
        {
            id: 'sql-vs-nosql',
            title: 'SQL vs NoSQL',
            tags: ['comparison', 'architecture', 'selection'],
            definition: 'SQL databases are relational with structured schemas and tables. NoSQL databases are non-relational with flexible schemas for unstructured data.',
            keyPoints: [
                'SQL: Tables, rows, columns, relationships',
                'SQL: ACID compliant, strong consistency',
                'SQL: Best for structured data, complex queries',
                'NoSQL: Documents, key-value, graphs, or wide-column',
                'NoSQL: Horizontal scaling, eventual consistency',
                'NoSQL: Best for unstructured, high-volume data'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'SQL vs NoSQL Structure',
                    language: 'sql',
                    code: `-- SQL: Relational table structure
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- NoSQL (MongoDB): Flexible document
{
  "_id": ObjectId("..."),
  "name": "John",
  "email": "john@example.com",
  "orders": [
    { "total": 99.99, "items": [...] }
  ]
}`
                }
            ],
            interviewQuestions: [
                {
                    question: 'When to use SQL vs NoSQL?',
                    answer: 'SQL: Complex relationships, transactions needed, structured data, need ACID. NoSQL: Flexible schema, horizontal scaling, high write volume, unstructured/semi-structured data, rapid prototyping.',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'sql-queries',
            title: 'Essential SQL Queries',
            tags: ['CRUD', 'queries', 'joins'],
            definition: 'SQL queries perform data operations: SELECT (read), INSERT (create), UPDATE (modify), DELETE (remove), with filtering and joining.',
            keyPoints: [
                'SELECT with WHERE for filtering',
                'JOIN for combining tables',
                'INNER JOIN: matching rows only',
                'LEFT JOIN: all from left + matching right',
                'GROUP BY for aggregation',
                'ORDER BY for sorting',
                'INDEX for query performance'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'CRUD Operations',
                    language: 'sql',
                    code: `-- READ: Select with conditions
SELECT name, email 
FROM users 
WHERE active = true 
ORDER BY created_at DESC
LIMIT 10;

-- CREATE: Insert new record
INSERT INTO users (name, email) 
VALUES ('John', 'john@example.com');

-- UPDATE: Modify existing
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- DELETE: Remove record
DELETE FROM users WHERE id = 1;

-- JOIN Example: Users with orders
SELECT u.name, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.total DESC;

-- Aggregation: Count and sum
SELECT user_id, COUNT(*) as order_count, SUM(total) as total_spent
FROM orders
GROUP BY user_id
HAVING total_spent > 500;`
                }
            ],
            interviewQuestions: [
                {
                    question: 'Explain INNER JOIN vs LEFT JOIN',
                    answer: 'INNER JOIN returns only rows with matches in BOTH tables. LEFT JOIN returns ALL rows from left table + matching rows from right (NULL if no match). Use LEFT JOIN when you want all left records regardless of matches.',
                    difficulty: 'easy'
                },
                {
                    question: 'What is a database index and why use it?',
                    answer: 'Index is data structure that speeds up data retrieval - like book index. Without index, database scans all rows. Tradeoff: faster reads, slower writes (index must update). Create on frequently queried columns.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default databasesData;
