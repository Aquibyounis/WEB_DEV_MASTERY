export const mongodbData = {
    id: 'mongodb',
    title: 'MongoDB',
    icon: '🍃',
    description: 'Master MongoDB - document database, CRUD operations, and aggregation',
    subtopics: [
        {
            id: 'mongodb-crud',
            title: 'MongoDB CRUD Operations',
            tags: ['CRUD', 'documents', 'queries'],
            definition: 'MongoDB stores data as flexible JSON-like documents in collections. CRUD operations: insertOne/Many, find, updateOne/Many, deleteOne/Many.',
            keyPoints: [
                'Documents = JSON-like (BSON)',
                'Collections = group of documents (like tables)',
                'No fixed schema required',
                '_id field auto-generated (ObjectId)',
                'Query operators: $eq, $gt, $in, $and, $or',
                'Update operators: $set, $inc, $push, $pull'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'MongoDB CRUD',
                    language: 'javascript',
                    code: `// Connect (Node.js with MongoDB driver)
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('myapp');
const users = db.collection('users');

// CREATE
await users.insertOne({
  name: 'John',
  email: 'john@example.com',
  age: 25,
  skills: ['javascript', 'react']
});

// READ - find all matching
const activeUsers = await users.find({ active: true }).toArray();

// READ - find one
const user = await users.findOne({ email: 'john@example.com' });

// READ with operators
const adults = await users.find({ 
  age: { $gte: 18 },
  skills: { $in: ['react', 'vue'] }
}).toArray();

// UPDATE - update one
await users.updateOne(
  { email: 'john@example.com' },
  { $set: { age: 26 }, $push: { skills: 'node' } }
);

// DELETE
await users.deleteOne({ email: 'john@example.com' });`
                }
            ],
            interviewQuestions: [
                {
                    question: 'How does MongoDB store data?',
                    answer: 'MongoDB stores documents in BSON format (binary JSON) within collections. Documents are schema-less - each can have different fields. Collections are analogous to tables, documents to rows. _id field is unique identifier.',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'mongoose',
            title: 'Mongoose ODM',
            tags: ['ODM', 'schema', 'Node.js'],
            definition: 'Mongoose is an ODM (Object Document Mapper) for MongoDB that provides schema validation, middleware, and easier data modeling.',
            keyPoints: [
                'Schema defines document structure',
                'Model is compiled schema (like a class)',
                'Built-in validation',
                'Middleware (pre/post hooks)',
                'Virtual fields',
                'Population for references'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Mongoose Model',
                    language: 'javascript',
                    code: `const mongoose = require('mongoose');

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create Model
const User = mongoose.model('User', userSchema);

// Usage
const user = new User({ name: 'John', email: 'john@example.com', password: 'password123' });
await user.save();

// Query
const users = await User.find({ role: 'admin' });
const user = await User.findById(id);
await User.findByIdAndUpdate(id, { name: 'Jane' });`
                }
            ],
            interviewQuestions: [
                {
                    question: 'Why use Mongoose over native MongoDB driver?',
                    answer: 'Mongoose adds: Schema validation, middleware hooks (pre/post save), type casting, easier query building, population for references, virtual fields. Native driver is lighter but requires more manual work.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default mongodbData;
