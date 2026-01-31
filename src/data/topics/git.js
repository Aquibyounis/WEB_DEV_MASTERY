export const gitData = {
    id: 'git',
    title: 'Git & GitHub',
    icon: '📦',
    description: 'Master version control with Git - branching, merging, and collaborative workflows',
    subtopics: [
        {
            id: 'git-basics',
            title: 'Git Fundamentals',
            tags: ['version-control', 'commands', 'basics'],
            definition: 'Git is a distributed version control system that tracks changes in code, enables collaboration, and maintains history of all modifications.',
            keyPoints: [
                'Repository = project folder tracked by Git',
                'Commit = snapshot of changes',
                'Branch = independent line of development',
                'Working directory → Staging → Repository',
                'Remote = version on server (GitHub)',
                'HEAD = pointer to current commit'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Essential Git Commands',
                    language: 'bash',
                    code: `# Initialize repository
git init

# Clone existing repo
git clone https://github.com/user/repo.git

# Check status
git status

# Stage changes
git add filename.js    # single file
git add .              # all changes

# Commit changes
git commit -m "Add login feature"

# View history
git log --oneline

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create and switch to branch
git checkout -b feature/login

# Switch branches
git checkout main

# Merge branch into current
git merge feature/login

# Delete branch
git branch -d feature/login`
                }
            ],
            interviewQuestions: [
                {
                    question: 'What is the difference between git merge and git rebase?',
                    answer: 'Merge: creates merge commit, preserves history as-is. Rebase: rewrites history, places commits on top of target branch. Merge is safer (keeps original), rebase is cleaner (linear history). Never rebase public/shared branches.',
                    difficulty: 'medium'
                },
                {
                    question: 'Explain git pull vs git fetch',
                    answer: 'Fetch: downloads changes from remote, doesnt merge. Pull: fetch + merge in one command. Fetch is safer - lets you review before merging. Pull is convenient for quick updates.',
                    difficulty: 'easy'
                }
            ]
        },
        {
            id: 'branching-workflow',
            title: 'Branching & Workflows',
            tags: ['branching', 'workflow', 'collaboration'],
            definition: 'Git branching enables parallel development. Team workflows like Git Flow or GitHub Flow organize how branches are used.',
            keyPoints: [
                'main/master: production-ready code',
                'develop: integration branch',
                'feature/*: new features',
                'hotfix/*: urgent production fixes',
                'Pull Requests for code review',
                'Protect main branch from direct pushes'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Feature Branch Workflow',
                    language: 'bash',
                    code: `# Start new feature
git checkout main
git pull origin main
git checkout -b feature/user-profile

# Work on feature...
git add .
git commit -m "Add user profile page"
git commit -m "Add avatar upload"

# Push feature branch
git push origin feature/user-profile

# Create Pull Request on GitHub
# After review and approval, merge via GitHub

# Clean up
git checkout main
git pull origin main
git branch -d feature/user-profile`
                }
            ],
            commonMistakes: [
                {
                    mistake: 'Working directly on main branch',
                    why: 'No code review, risky deployments, hard to revert.',
                    correct: 'Always create feature branches, use Pull Requests.'
                },
                {
                    mistake: 'Large commits with many unrelated changes',
                    why: 'Hard to review, hard to revert specific changes.',
                    correct: 'Small, focused commits. One feature or fix per commit.'
                }
            ],
            interviewQuestions: [
                {
                    question: 'What is your Git workflow experience?',
                    answer: 'Feature branch workflow: create branch from main, develop feature, push branch, create PR, code review, merge. Use semantic commit messages. Pull latest main before branching. Delete branches after merge.',
                    tip: 'Mention code review and branch protection as team practices.',
                    difficulty: 'easy'
                },
                {
                    question: 'How do you resolve merge conflicts?',
                    answer: '1) Git shows conflicting files. 2) Open files, find conflict markers (<<<<, ====, >>>>). 3) Manually edit to keep correct code. 4) Remove markers. 5) Stage resolved files. 6) Commit merge. Use IDE tools for visual diff.',
                    difficulty: 'medium'
                }
            ]
        }
    ]
};

export default gitData;
