export const css3Data = {
  id: 'css3',
  title: 'CSS3',
  icon: '🎨',
  description: 'Modern CSS techniques - Flexbox, Grid, positioning, responsive design, and visual effects',
  subtopics: [
    {
      id: 'flexbox',
      title: 'Flexbox',
      tags: ['layout', 'alignment', 'responsive'],
      definition: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex to fill additional space or shrink to fit into smaller spaces.',
      whyItExists: 'Before flexbox, centering content required hacks. Flexbox provides intuitive alignment, distribution, and ordering of items.',
      keyPoints: [
        'display: flex on container',
        'Main axis = flex-direction (row/column)',
        'Cross axis = perpendicular to main',
        'justify-content: main axis alignment',
        'align-items: cross axis alignment',
        'flex-grow, flex-shrink, flex-basis',
        'gap: spacing between items',
        'flex-wrap: allow wrapping'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Common Flexbox Patterns',
          language: 'css',
          code: `/* Centering content - the classic problem solved */
.center-everything {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;       /* vertical */
  height: 100vh;
}

/* Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

/* Card layout that wraps */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;  /* grow, shrink, minimum width */
  /* Cards will be at least 300px, grow to fill space */
}

/* Footer with content pushed to edges */
.footer {
  display: flex;
  justify-content: space-between;
}

/* Sidebar + main content */
.layout {
  display: flex;
}
.sidebar { 
  flex: 0 0 250px; /* fixed width */
}
.main { 
  flex: 1; /* takes remaining space */
}`
        }
      ],
      output: {
        description: 'Visual layout results:',
        result: `Center Everything:
┌──────────────────────────┐
│                          │
│      [Content]           │
│                          │
└──────────────────────────┘

Navbar (space-between):
┌──────────────────────────┐
│ Logo        Home About   │
└──────────────────────────┘

Card Container (flex-wrap):
┌──────────────────────────┐
│ [Card 1] [Card 2] [Card 3] │
│ [Card 4] [Card 5]          │
└──────────────────────────┘`
      },
      commonMistakes: [
        {
          mistake: 'Forgetting height for vertical centering',
          why: 'Container needs height for align-items to work vertically.',
          correct: 'Set height on container: height: 100vh or height: 100%.'
        },
        {
          mistake: 'Using flexbox for 2D layouts',
          why: 'Flexbox is 1D - only row OR column at a time.',
          correct: 'Use CSS Grid for 2D layouts (rows AND columns).'
        },
        {
          mistake: 'Not using gap property',
          why: 'Using margins on children creates edge spacing issues.',
          correct: 'Use gap on container for consistent spacing.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How do you center a div vertically and horizontally?',
          answer: 'Flexbox: display: flex; justify-content: center; align-items: center; on parent. Container needs height. Alternative: Grid with place-items: center.',
          difficulty: 'easy'
        },
        {
          question: 'Explain flex-grow, flex-shrink, flex-basis',
          answer: 'flex-basis: initial size before free space distributed. flex-grow: how much item grows relative to siblings. flex-shrink: how much item shrinks. Shorthand: flex: 1 1 auto.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'grid',
      title: 'CSS Grid',
      tags: ['layout', '2D', 'template'],
      definition: 'CSS Grid is a two-dimensional layout system for the web. It lets you lay content out in rows and columns simultaneously.',
      whyItExists: 'Flexbox handles 1D. Grid handles 2D layouts - complex page structures, card grids, dashboards.',
      keyPoints: [
        'display: grid on container',
        'grid-template-columns/rows define tracks',
        'fr unit = fraction of free space',
        'gap for spacing',
        'grid-column/row for item placement',
        'grid-area for named regions',
        'auto-fill/auto-fit for responsive grids',
        'minmax() for flexible sizing'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Grid Layout Patterns',
          language: 'css',
          code: `/* Basic grid - 3 equal columns */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* Responsive grid - auto-fit cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
/* Cards are min 250px, auto-fill with equal widths */

/* Holy Grail Layout */
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main ads"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.ads     { grid-area: ads; }
.footer  { grid-area: footer; }

/* Dashboard grid with spanning */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}`
        }
      ],
      output: {
        description: 'Grid layout visualizations:',
        result: `3-Column Grid:
┌────────┬────────┬────────┐
│   1    │   2    │   3    │
├────────┼────────┼────────┤
│   4    │   5    │   6    │
└────────┴────────┴────────┘

Holy Grail Layout:
┌──────────────────────────┐
│         Header           │
├──────┬────────────┬──────┤
│ Side │    Main    │ Ads  │
│ bar  │            │      │
├──────┴────────────┴──────┤
│         Footer           │
└──────────────────────────┘

Responsive auto-fit:
Wide: [Card][Card][Card][Card]
Medium: [Card][Card][Card]
Narrow: [Card][Card]`
      },
      commonMistakes: [
        {
          mistake: 'Using only pixels for grid tracks',
          why: 'Fixed sizes break responsive design.',
          correct: 'Use fr units, minmax(), and auto-fit for flexibility.'
        },
        {
          mistake: 'Confusing auto-fill vs auto-fit',
          why: 'Auto-fill creates empty tracks, auto-fit collapses them.',
          correct: 'Use auto-fit for most responsive grids.'
        },
        {
          mistake: 'Over-complicating with Grid',
          why: 'Simple 1D layouts dont need Grid complexity.',
          correct: 'Use Flexbox for 1D (navbars, card rows), Grid for 2D.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Flexbox vs Grid - when to use each?',
          answer: 'Flexbox: 1D layouts - navbars, centering, single row/column. Grid: 2D layouts - page structure, complex grids, overlapping items. Can use together - Grid for page, Flexbox inside components.',
          difficulty: 'medium'
        },
        {
          question: 'How do you create a responsive grid without media queries?',
          answer: 'Use grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)). Items are minimum 250px and grow to fill. Columns adjust automatically based on container width.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'positioning',
      title: 'CSS Positioning',
      tags: ['position', 'layout', 'z-index'],
      definition: 'CSS position property controls how elements are placed in the document flow. Different values allow elements to be positioned relative to their normal position, parent, or viewport.',
      keyPoints: [
        'static: default, follows document flow',
        'relative: offset from normal position',
        'absolute: removed from flow, relative to positioned ancestor',
        'fixed: relative to viewport, doesnt scroll',
        'sticky: hybrid - relative until scroll threshold',
        'z-index only works on positioned elements',
        'Stacking context created by position + z-index'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Position Examples',
          language: 'css',
          code: `/* Relative - for positioning context or small offsets */
.relative-parent {
  position: relative;
}

/* Absolute - positioned within relative parent */
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
}

/* Fixed - stays in place on scroll */
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Sticky - hybrid magic */
.sticky-nav {
  position: sticky;
  top: 0;  /* becomes fixed when scrolled past this point */
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;  /* shorthand for top:0 right:0 bottom:0 left:0 */
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}`
        }
      ],
      output: {
        description: 'Position behavior:',
        result: `Static: Normal document flow
Relative: Shifted from normal position, space preserved
Absolute: Removed from flow, positioned in nearest relative ancestor
Fixed: Removed from flow, positioned in viewport (stays on scroll)
Sticky: Normal flow until scroll point, then fixed

Z-index stacking (higher = on top):
z-index: 1001  Modal content (topmost)
z-index: 1000  Modal overlay
z-index: 100   Fixed header
z-index: auto  Normal content`
      },
      commonMistakes: [
        {
          mistake: 'Absolute without relative parent',
          why: 'Element positions relative to document, not intended container.',
          correct: 'Add position: relative to the parent you want to position within.'
        },
        {
          mistake: 'Z-index on non-positioned elements',
          why: 'Z-index only works with position value other than static.',
          correct: 'Add position: relative if you need z-index without repositioning.'
        },
        {
          mistake: 'Fixed header without body padding',
          why: 'Fixed elements are removed from flow, content goes under header.',
          correct: 'Add body { padding-top: [header-height]; }'
        }
      ],
      interviewQuestions: [
        {
          question: 'Explain difference between absolute and fixed positioning',
          answer: 'Both remove from flow. Absolute: positions relative to nearest positioned ancestor. Fixed: positions relative to viewport, stays in place on scroll. Use fixed for headers, modals.',
          difficulty: 'medium'
        },
        {
          question: 'What is sticky positioning?',
          answer: 'Hybrid of relative and fixed. Element is relative until scroll passes threshold (top: 0), then becomes fixed. Requires scroll container. Great for sticky headers in sections.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'responsive',
      title: 'Responsive Design',
      tags: ['media-queries', 'mobile', 'fluid'],
      definition: 'Responsive design makes web pages render well on all devices by using fluid grids, flexible images, and CSS media queries.',
      whyItExists: 'Users browse on phones, tablets, laptops, TVs. One design must work everywhere.',
      keyPoints: [
        'Mobile-first: design for mobile, enhance for larger',
        'Viewport meta tag essential',
        '@media queries for breakpoints',
        'Use relative units: %, rem, em, vw, vh',
        'Fluid typography with clamp()',
        'Responsive images: max-width: 100%',
        'CSS Container Queries (modern alternative)'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Responsive Patterns',
          language: 'css',
          code: `/* Essential viewport meta in HTML */
/* <meta name="viewport" content="width=device-width, initial-scale=1"> */

/* Mobile-first approach */
.container {
  padding: 1rem;
}

.nav-links {
  display: none; /* Hidden on mobile */
}

.hamburger {
  display: block;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
  
  .nav-links {
    display: flex;
  }
  
  .hamburger {
    display: none;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Fluid typography - scales smoothly */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min: 1.5rem, preferred: 4vw, max: 3rem */
}

/* Responsive images */
img {
  max-width: 100%;
  height: auto;
}

/* Modern: Container Queries */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}`
        }
      ],
      output: {
        description: 'Layout at different breakpoints:',
        result: `Mobile (< 768px):
┌─────────────────┐
│ ☰ Logo          │
├─────────────────┤
│    Content      │
│    stacked      │
│    vertically   │
└─────────────────┘

Tablet (768px - 1023px):
┌───────────────────────────┐
│ Logo  Home About Contact  │
├─────────┬─────────────────┤
│ Sidebar │    Content      │
└─────────┴─────────────────┘

Desktop (≥ 1024px):
┌───────────────────────────────────┐
│ Logo  Search  Home About  Login   │
├─────────┬─────────────────────────┤
│ Sidebar │       Content           │
│         │    [Card] [Card] [Card] │
└─────────┴─────────────────────────┘`
      },
      commonMistakes: [
        {
          mistake: 'Desktop-first approach',
          why: 'Harder to adapt complex layouts to mobile, more overrides needed.',
          correct: 'Mobile-first: start simple, add complexity with min-width queries.'
        },
        {
          mistake: 'Using px for everything',
          why: 'Fixed sizes dont scale with user preferences or screens.',
          correct: 'Use rem for typography, % or fr for layouts, vw/vh for full-screen elements.'
        },
        {
          mistake: 'Forgetting viewport meta tag',
          why: 'Mobile browsers zoom out to fit desktop site, breaking layout.',
          correct: 'Always add: <meta name="viewport" content="width=device-width, initial-scale=1">'
        },
        {
          mistake: 'Too many breakpoints',
          why: 'Maintenance nightmare, unnecessary complexity.',
          correct: 'Use 2-3 breakpoints: mobile, tablet, desktop. Let content guide decisions.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is mobile-first design?',
          answer: 'Design for smallest screens first, then enhance for larger with min-width media queries. Benefits: better performance (less CSS to override), forces focus on essential content, progressive enhancement.',
          difficulty: 'easy'
        },
        {
          question: 'What is clamp() and how is it used?',
          answer: 'clamp(min, preferred, max) creates fluid values. Common for typography: clamp(1rem, 2.5vw, 2rem). Value is preferred, but never below min or above max. Responsive without media queries.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'animations',
      title: 'CSS Animations & Transitions',
      tags: ['animation', 'transition', 'motion'],
      definition: 'CSS transitions animate property changes smoothly. CSS animations allow complex multi-step animations with keyframes.',
      keyPoints: [
        'transition: property duration timing delay',
        'transform for performant animations',
        '@keyframes define animation steps',
        'animation: name duration timing delay iteration',
        'Use transform and opacity for 60fps',
        'prefers-reduced-motion for accessibility',
        'will-change for optimization hints'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Transitions & Animations',
          language: 'css',
          code: `/* Smooth transitions */
.button {
  background-color: #3b82f6;
  transform: scale(1);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
  background-color: #2563eb;
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.3s ease forwards;
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Accessibility - respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`
        }
      ],
      output: {
        description: 'Animation behavior:',
        result: `Button hover:
  Normal → Smoothly scales to 1.05x → Color transitions

Fade in:
  Card appears → Fades from transparent → Slides up 20px

Spinner:
  Continuously rotates 360° every second

Reduced motion:
  All animations effectively disabled for users who prefer it`
      },
      commonMistakes: [
        {
          mistake: 'Animating width, height, or margin',
          why: 'Triggers expensive layout recalculation, causes jank.',
          correct: 'Use transform (scale, translate) and opacity for smooth 60fps.'
        },
        {
          mistake: 'Ignoring prefers-reduced-motion',
          why: 'Can cause motion sickness or seizures for some users.',
          correct: 'Always provide reduced-motion alternative.'
        },
        {
          mistake: 'Too many animations',
          why: 'Distracting, reduces professionalism, impacts performance.',
          correct: 'Animate with purpose - guide attention, provide feedback.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Difference between transition and animation?',
          answer: 'Transition: simple A to B change on state (hover, focus). Animation: complex multi-step with keyframes, can loop, run on load. Use transition for interactions, animation for loading states, attention-grabbers.',
          difficulty: 'easy'
        },
        {
          question: 'How do you create performant animations?',
          answer: 'Animate only transform and opacity - GPU accelerated, no layout. Avoid animating width, height, margin, padding. Use will-change sparingly. Test with DevTools Performance tab.',
          difficulty: 'medium'
        }
      ]
    }
  ]
};

export default css3Data;
