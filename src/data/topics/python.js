export const pythonData = {
    id: 'python',
    title: 'Python + Flask',
    icon: '🐍',
    description: 'Create backend APIs with Python and Flask framework',
    subtopics: [
        {
            id: 'flask-basics',
            title: 'Flask API Basics',
            tags: ['API', 'routing', 'REST'],
            definition: 'Flask is a lightweight Python web framework for building APIs and web applications with minimal setup.',
            keyPoints: [
                'Minimal boilerplate to start',
                '@app.route() decorator for routing',
                'Methods parameter for HTTP methods',
                'request object for accessing data',
                'jsonify() for JSON responses',
                'Blueprint for modular routes'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Basic Flask API',
                    language: 'python',
                    code: `from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory data
users = [
    {"id": 1, "name": "John", "email": "john@example.com"}
]

# GET all users
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

# GET single user
@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user = next((u for u in users if u['id'] == id), None)
    if not user:
        return jsonify({"error": "Not found"}), 404
    return jsonify(user)

# POST create user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = {
        "id": len(users) + 1,
        "name": data['name'],
        "email": data['email']
    }
    users.append(new_user)
    return jsonify(new_user), 201

# PUT update user
@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = next((u for u in users if u['id'] == id), None)
    if not user:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json()
    user['name'] = data.get('name', user['name'])
    user['email'] = data.get('email', user['email'])
    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)`
                }
            ],
            interviewQuestions: [
                {
                    question: 'Flask vs Express - key differences?',
                    answer: 'Flask: Python, decorator-based routing, synchronous by default. Express: JavaScript, method-based routing, async-friendly. Both lightweight, minimal. Choose based on team skills and ecosystem.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default pythonData;
