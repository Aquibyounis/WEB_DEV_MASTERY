export const devopsData = {
    id: 'devops',
    title: 'DevOps & CI/CD',
    icon: '⚙️',
    description: 'Understand CI/CD pipelines, deployment, and DevOps fundamentals',
    subtopics: [
        {
            id: 'cicd-basics',
            title: 'CI/CD Fundamentals',
            tags: ['pipeline', 'automation', 'deployment'],
            definition: 'CI (Continuous Integration) automatically tests code on each push. CD (Continuous Deployment) automatically deploys passing builds to production.',
            keyPoints: [
                'CI: Automated testing on every push',
                'CD: Automated deployment after tests pass',
                'Pipeline: series of automated steps',
                'Benefits: catch bugs early, faster releases',
                'Tools: GitHub Actions, Jenkins, CircleCI',
                'Stages: Build → Test → Deploy'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'GitHub Actions Workflow',
                    language: 'javascript',
                    code: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
  
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploy to production"`
                }
            ],
            interviewQuestions: [
                {
                    question: 'What is CI/CD and why is it important?',
                    answer: 'CI = Continuous Integration: automated testing on each code push. CD = Continuous Deployment: automated deployment after tests pass. Benefits: catch bugs early, consistent deployments, faster releases, reduces manual errors.',
                    difficulty: 'easy'
                },
                {
                    question: 'Describe a typical CI/CD pipeline',
                    answer: 'Trigger (push/PR) → Build (compile, install deps) → Test (unit, integration) → Static Analysis (lint, security scan) → Build Artifact → Deploy to Staging → Deploy to Production. Failed stage stops pipeline.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default devopsData;
