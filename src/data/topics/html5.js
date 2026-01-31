export const html5Data = {
    id: 'html5',
    title: 'HTML5',
    icon: '🌐',
    description: 'The foundation of all web content - Semantic markup, forms, accessibility, and SEO',
    subtopics: [
        {
            id: 'semantic-tags',
            title: 'Semantic HTML Tags',
            tags: ['structure', 'accessibility', 'SEO'],
            definition: 'Semantic HTML elements clearly describe their meaning to both the browser and the developer, providing information about the type of content they contain.',
            whyItExists: 'Before HTML5, developers used generic <div> tags for everything. Semantic tags give meaning to different parts of a webpage, improving accessibility and SEO.',
            whenToUse: [
                'Always use semantic tags for page structure',
                '<header> for introductory content',
                '<nav> for navigation links',
                '<main> for primary content',
                '<article> for self-contained content',
                '<section> for thematic groupings',
                '<aside> for sidebar content',
                '<footer> for footer content'
            ],
            howItWorks: 'The browser creates an accessibility tree from semantic tags that screen readers can navigate. Search engines use these tags to understand content hierarchy.',
            keyPoints: [
                '<header> - Introductory content, logos, navigation',
                '<nav> - Navigation links',
                '<main> - Unique primary content area',
                '<article> - Self-contained, distributable content',
                '<section> - Thematic grouping with heading',
                '<aside> - Tangentially related content',
                '<footer> - Footer information',
                '<figure>/<figcaption> - Images with captions'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Basic Page Structure',
                    language: 'html',
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Portfolio</title>
</head>
<body>
  <header>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h1>About Me</h1>
      <p>Full Stack Developer</p>
    </section>
    <article>
      <h2>My Project</h2>
      <p>A task management app...</p>
    </article>
  </main>
  <footer>
    <p>© 2024 Portfolio</p>
  </footer>
</body>
</html>`
                }
            ],
            output: {
                description: 'Browser renders a structured page with accessibility tree:',
                result: `Page Structure in Accessibility Tree:
├── banner (header)
│   └── navigation (nav)
├── main (main)
│   ├── region "About Me" (section)
│   └── article "My Project"
└── contentinfo (footer)

SEO Benefits:
✓ Search engines understand content hierarchy
✓ Screen readers can navigate by landmarks
✓ Better indexing and ranking potential`
            },
            commonMistakes: [
                {
                    mistake: 'Using <section> without a heading',
                    why: 'A <section> should always have a heading as its first child for accessibility.',
                    correct: 'Always include a heading (h1-h6) inside <section> elements.'
                },
                {
                    mistake: 'Multiple <main> elements on a page',
                    why: 'Only one <main> should exist per page - represents unique content.',
                    correct: 'Use one <main> per page; update content dynamically for SPAs.'
                },
                {
                    mistake: 'Using <div> for everything',
                    why: 'Divs have no semantic meaning - screen readers cant navigate them.',
                    correct: 'Use semantic tags first, div only for styling wrappers.'
                }
            ],
            interviewQuestions: [
                {
                    question: 'What is semantic HTML and why is it important?',
                    answer: 'Semantic HTML uses elements that describe their meaning (header, nav, main, article). Benefits: improves accessibility for screen readers, helps SEO by giving context, makes code more maintainable.',
                    tip: 'Mention accessibility, SEO, and maintainability.',
                    difficulty: 'easy'
                },
                {
                    question: 'What is the difference between <section> and <div>?',
                    answer: '<section> is semantic, representing a thematic grouping with a heading. <div> is generic with no semantic meaning. Use <section> for content groups; <div> for styling only.',
                    difficulty: 'easy'
                },
                {
                    question: 'When would you use <article> vs <section>?',
                    answer: '<article> is for self-contained content that makes sense on its own (blog post, comment, news story). <section> groups related content within a page. Articles can contain sections, sections can contain articles.',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'forms',
            title: 'HTML Forms',
            tags: ['input', 'validation', 'user-input'],
            definition: 'HTML forms collect user input and send data to a server using form controls like text fields, checkboxes, and buttons.',
            whyItExists: 'Forms enable user interaction - login systems, search, checkout, feedback. Without forms, websites would be static.',
            whenToUse: ['Registration/login', 'Search', 'Contact forms', 'E-commerce', 'Surveys'],
            keyPoints: [
                '<form> wraps controls, defines action and method',
                '<input> creates various input types',
                '<label> associates text with controls (accessibility)',
                '<select> creates dropdowns',
                '<textarea> for multi-line input',
                'HTML5 types: email, date, number, range, color',
                'Validation: required, pattern, min/max, minlength/maxlength'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Contact Form with Validation',
                    language: 'html',
                    code: `<form action="/submit" method="POST">
  <label for="name">Name *</label>
  <input type="text" id="name" name="name" 
         required minlength="2" maxlength="50">
  
  <label for="email">Email *</label>
  <input type="email" id="email" name="email" required>
  
  <label for="phone">Phone</label>
  <input type="tel" id="phone" name="phone" 
         pattern="[0-9]{10}" placeholder="1234567890">
  
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4"></textarea>
  
  <button type="submit">Send</button>
</form>`
                }
            ],
            output: {
                description: 'Form validation behavior:',
                result: `User submits without filling required fields:
→ Browser shows "Please fill out this field"

User enters invalid email format:
→ Browser shows "Please include an @ in the email address"

User enters phone not matching pattern:
→ Browser shows "Please match the requested format"

Valid submission:
→ POST request sent to /submit with form data`
            },
            commonMistakes: [
                {
                    mistake: 'Not using labels',
                    why: 'Labels are essential for accessibility. Screen readers need them.',
                    correct: 'Always use <label for="id"> matching the input id.'
                },
                {
                    mistake: 'Using GET for sensitive data',
                    why: 'GET appends data to URL, visible in history and logs.',
                    correct: 'Use POST for passwords and personal data.'
                },
                {
                    mistake: 'Relying only on client-side validation',
                    why: 'Users can bypass HTML validation. Security risk.',
                    correct: 'Always validate on server too. Client validation is UX, server is security.'
                }
            ],
            interviewQuestions: [
                {
                    question: 'Difference between GET and POST?',
                    answer: 'GET: data in URL, cached, visible, ~2000 char limit. POST: data in body, not cached, more secure, no size limit. Use GET for searches; POST for sensitive data.',
                    difficulty: 'easy'
                },
                {
                    question: 'How does HTML5 validation work?',
                    answer: 'Attributes: required, pattern, minlength/maxlength, min/max, type validation. Browser validates on submit. Use :valid/:invalid CSS. Always add server-side validation too.',
                    difficulty: 'medium'
                }
            ]
        },
        {
            id: 'accessibility',
            title: 'Web Accessibility (a11y)',
            tags: ['WCAG', 'ARIA', 'screen-readers'],
            definition: 'Designing websites usable by everyone, including people with visual, auditory, motor, or cognitive disabilities.',
            whyItExists: '15% of population has disabilities. Equal access is ethically right and legally required (ADA, EAA).',
            keyPoints: [
                'WCAG defines standards (A, AA, AAA levels)',
                'POUR: Perceivable, Operable, Understandable, Robust',
                'Use semantic HTML as foundation',
                'ARIA for complex custom UI only',
                'Ensure keyboard navigation works',
                'Alt text for images',
                'Color contrast 4.5:1 minimum',
                'Focus indicators visible'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Accessible Elements',
                    language: 'html',
                    code: `<!-- Informative image - describe content -->
<img src="chart.png" alt="Sales increased 50% Q1-Q4">

<!-- Decorative image - empty alt -->
<img src="decoration.png" alt="">

<!-- Accessible link - describe destination -->
<a href="/report.pdf">Download Report (PDF, 2MB)</a>

<!-- Skip link for keyboard users -->
<a href="#main" class="skip-link">Skip to main content</a>

<!-- ARIA for custom widget -->
<button 
  aria-expanded="false"
  aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>...</ul>

<!-- Accessible form error -->
<input 
  id="email" 
  aria-describedby="email-error"
  aria-invalid="true">
<span id="email-error">Please enter valid email</span>`
                }
            ],
            output: {
                description: 'Screen reader announces:',
                result: `Image: "Sales increased 50% Q1-Q4, graphic"
Decorative image: (skipped - not announced)
Link: "Download Report PDF 2MB, link"
Button: "Menu, button, collapsed"
Invalid input: "Email, edit, invalid entry, Please enter valid email"

Keyboard navigation:
Tab → moves to next interactive element
Enter → activates buttons/links
Escape → closes dialogs
Arrow keys → navigate within widgets`
            },
            commonMistakes: [
                {
                    mistake: 'Empty or meaningless alt text',
                    why: 'Screen readers read alt text aloud. "Image" provides no info.',
                    correct: 'Describe content/purpose. Use alt="" for decorative only.'
                },
                {
                    mistake: 'Removing focus outlines completely',
                    why: 'Keyboard users cannot see where they are on page.',
                    correct: 'Provide custom focus styles with :focus-visible.'
                },
                {
                    mistake: 'Using ARIA before semantic HTML',
                    why: 'ARIA is complex and easy to get wrong. Native HTML is more robust.',
                    correct: 'First rule of ARIA: dont use ARIA if native HTML works.'
                },
                {
                    mistake: 'Color as only indicator',
                    why: 'Colorblind users cant distinguish. 8% of men are colorblind.',
                    correct: 'Use icons, text, or patterns in addition to color.'
                }
            ],
            interviewQuestions: [
                {
                    question: 'What is WCAG?',
                    answer: 'Web Content Accessibility Guidelines - international standard. 4 principles: Perceivable, Operable, Understandable, Robust (POUR). Levels: A, AA (common requirement), AAA.',
                    difficulty: 'medium'
                },
                {
                    question: 'When to use ARIA?',
                    answer: 'Only when native HTML cant provide semantics - custom widgets like tabs, modals, carousels. First rule: dont use ARIA if native HTML works. ARIA is a last resort.',
                    difficulty: 'medium'
                },
                {
                    question: 'How would you make a modal accessible?',
                    answer: 'Focus trap inside modal, close on Escape, role="dialog", aria-modal="true", aria-labelledby for title, return focus to trigger element on close.',
                    difficulty: 'hard'
                }
            ]
        },
        {
            id: 'meta-seo',
            title: 'Meta Tags & SEO',
            tags: ['SEO', 'social', 'head'],
            definition: 'Meta tags provide metadata about the HTML document - for search engines, browsers, and social media platforms.',
            whyItExists: 'Search engines need to understand and index content. Social platforms need preview info. Browsers need rendering instructions.',
            keyPoints: [
                '<title> - Page title in tabs and search results',
                '<meta name="description"> - Search result snippet',
                '<meta name="viewport"> - Mobile responsiveness',
                '<meta charset="UTF-8"> - Character encoding',
                'Open Graph (og:) - Facebook/LinkedIn previews',
                'Twitter Card - Twitter previews',
                'Canonical URL - Prevent duplicate content'
            ],
            codeExamples: [
                {
                    level: 'Beginner',
                    title: 'Complete Meta Setup',
                    language: 'html',
                    code: `<head>
  <!-- Essential -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best React Tutorial 2024 | Learn React</title>
  <meta name="description" content="Master React in 30 days with our comprehensive tutorial. Free projects, hooks, and real-world examples.">
  
  <!-- SEO -->
  <link rel="canonical" href="https://example.com/react-tutorial">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Best React Tutorial 2024">
  <meta property="og:description" content="Master React in 30 days...">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/react-tutorial">
  <meta property="og:type" content="article">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Best React Tutorial 2024">
  <meta name="twitter:description" content="Master React in 30 days...">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">
</head>`
                }
            ],
            output: {
                description: 'How meta tags appear in different contexts:',
                result: `Google Search Results:
┌─────────────────────────────────────────────┐
│ Best React Tutorial 2024 | Learn React      │
│ https://example.com/react-tutorial          │
│ Master React in 30 days with our            │
│ comprehensive tutorial. Free projects...   │
└─────────────────────────────────────────────┘

Facebook/LinkedIn Share Preview:
┌─────────────────────────────────────────────┐
│ [og:image displayed here]                   │
│ Best React Tutorial 2024                    │
│ Master React in 30 days...                  │
└─────────────────────────────────────────────┘`
            },
            commonMistakes: [
                {
                    mistake: 'Title too long or too short',
                    why: 'Google truncates titles over ~60 chars. Short titles miss keywords.',
                    correct: 'Keep titles 50-60 characters with primary keyword near start.'
                },
                {
                    mistake: 'Duplicate titles/descriptions across pages',
                    why: 'Search engines may see as duplicate content. Harder to rank.',
                    correct: 'Unique, descriptive title and description for each page.'
                },
                {
                    mistake: 'Missing viewport meta tag',
                    why: 'Mobile browsers wont scale properly. Google penalizes non-mobile-friendly sites.',
                    correct: 'Always include: <meta name="viewport" content="width=device-width, initial-scale=1.0">'
                }
            ],
            interviewQuestions: [
                {
                    question: 'What meta tags are essential for SEO?',
                    answer: 'title (most important), meta description (click-through rate), canonical (prevent duplicates), robots (index control), viewport (mobile-friendly), structured data (rich snippets).',
                    difficulty: 'medium'
                },
                {
                    question: 'What is Open Graph?',
                    answer: 'Protocol by Facebook for rich link previews on social media. og:title, og:description, og:image, og:url. Used by Facebook, LinkedIn, Discord, Slack.',
                    difficulty: 'easy'
                }
            ]
        }
    ]
};

export default html5Data;
