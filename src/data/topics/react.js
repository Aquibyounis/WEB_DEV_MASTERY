export const reactData = {
  id: 'react',
  title: 'React',
  icon: '⚛️',
  description: 'Master React fundamentals - components, hooks, state management, and real-world patterns',
  subtopics: [
    {
      id: 'components-jsx',
      title: 'Components & JSX',
      tags: ['fundamentals', 'UI', 'composition'],
      definition: 'React components are reusable UI pieces that accept inputs (props) and return React elements describing what should appear on screen. JSX is syntax extension allowing HTML-like code in JavaScript.',
      keyPoints: [
        'Functional components are functions returning JSX',
        'JSX compiles to React.createElement()',
        'Must return single root element (or Fragment)',
        'Use className instead of class',
        'Use camelCase for event handlers (onClick)',
        'Expressions in JSX with {}',
        'Components must start with capital letter'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Functional Component',
          language: 'javascript',
          code: `// Basic Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="John" />

// Component with children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>Card content here</p>
</Card>`
        }
      ],
      output: {
        description: 'When React renders <Welcome name="John" />, it displays:',
        result: '<h1>Hello, John!</h1>\n\nThe Card component wraps its children in a styled container with the title displayed prominently.'
      },
      commonMistakes: [
        {
          mistake: 'Returning multiple root elements',
          why: 'JSX must have single root. React.createElement needs one parent.',
          correct: 'Wrap in <div> or use <> (Fragment).'
        },
        {
          mistake: 'Using class instead of className',
          why: 'class is a reserved keyword in JavaScript.',
          correct: 'Always use className for CSS classes in JSX.'
        },
        {
          mistake: 'Lowercase component names',
          why: 'React treats lowercase as DOM tags (<div>), uppercase as components.',
          correct: 'Always start component names with capital letter: Welcome, not welcome.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is JSX?',
          answer: 'JSX is syntax extension for JavaScript that looks like HTML. Its syntactic sugar for React.createElement(). Babel compiles JSX to regular JavaScript. Allows writing UI in declarative way.',
          difficulty: 'easy'
        },
        {
          question: 'What are React Fragments?',
          answer: 'Fragments let you group children without adding extra DOM nodes. Use <React.Fragment> or shorthand <>...</>. Useful when returning multiple elements from a component.',
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'props-state',
      title: 'Props vs State',
      tags: ['data', 'fundamentals', 'communication'],
      definition: 'Props are read-only data passed from parent to child. State is mutable data owned by a component that triggers re-renders when updated.',
      keyPoints: [
        'Props: passed from parent, read-only, external data',
        'State: internal, mutable, owned by component',
        'Props flow down (parent → child)',
        'State updates trigger re-render',
        'Never modify props directly',
        'Use callback props to pass data up',
        'Lifting state up = move state to common ancestor'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Props and State',
          language: 'javascript',
          code: `function Counter({ initialCount }) { // prop
  const [count, setCount] = useState(initialCount); // state
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Passing data up via callback
function Parent() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <Child onNameChange={setName} />
      <p>Name from child: {name}</p>
    </div>
  );
}

function Child({ onNameChange }) {
  return (
    <input 
      placeholder="Type your name"
      onChange={e => onNameChange(e.target.value)} 
    />
  );
}`
        }
      ],
      output: {
        description: 'The Counter displays current count and increments on button click. Parent-Child example shows:',
        result: 'Child input → Parent receives value via callback → Parent displays "Name from child: [typed value]"'
      },
      commonMistakes: [
        {
          mistake: 'Mutating props directly',
          why: 'Props are read-only. Mutating breaks React data flow and wont trigger re-render.',
          correct: 'If you need to change data from props, copy to state first or use callback to parent.'
        },
        {
          mistake: 'Putting all state in top component',
          why: 'Causes unnecessary re-renders of entire app.',
          correct: 'Keep state as close to where its used as possible. Lift only when needed.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Difference between props and state?',
          answer: 'Props: external, passed from parent, immutable within component. State: internal, owned by component, mutable via setter, triggers re-render. Props = function params, State = local variables.',
          difficulty: 'easy'
        },
        {
          question: 'What is lifting state up?',
          answer: 'Moving state from child to parent component so multiple children can share it. Common ancestor manages state, passes down as props. Used when siblings need same data.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'usestate-hook',
      title: 'useState Hook',
      tags: ['hooks', 'state', 'fundamentals'],
      definition: 'useState is a Hook that adds state to functional components. Returns array with current state value and setter function.',
      keyPoints: [
        'const [state, setState] = useState(initialValue)',
        'setState triggers re-render',
        'Use functional update for previous state',
        'Objects/arrays need new reference to trigger update',
        'Initial value can be expensive function',
        'State updates are batched in React 18+'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'useState Patterns',
          language: 'javascript',
          code: `// Basic usage
const [count, setCount] = useState(0);

// Object state
const [user, setUser] = useState({ name: '', email: '' });

// Update object (spread previous state)
setUser(prev => ({ ...prev, name: 'John' }));

// Array state
const [items, setItems] = useState([]);

// Add to array
setItems(prev => [...prev, newItem]);

// Remove from array
setItems(prev => prev.filter(item => item.id !== id));

// Functional update (when next depends on previous)
setCount(prev => prev + 1);

// Lazy initialization (expensive computation)
const [data] = useState(() => computeExpensiveValue());`
        }
      ],
      output: {
        description: 'State updates trigger re-render with new values:',
        result: 'setCount(5) → Component re-renders → count now displays 5\nsetUser({...prev, name: "John"}) → user.name becomes "John"'
      },
      commonMistakes: [
        {
          mistake: 'Mutating state directly',
          why: 'React compares references. Mutation doesnt create new reference, no re-render.',
          correct: 'Always create new object/array: setItems([...items, new])'
        },
        {
          mistake: 'Not using functional update',
          why: 'Multiple setState calls may use stale state due to batching.',
          correct: 'Use setCount(prev => prev + 1) for updates based on previous state.'
        },
        {
          mistake: 'Calling setState in render body',
          why: 'Causes infinite re-render loop.',
          correct: 'Call setState in event handlers or useEffect, not directly in component body.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Why use functional update in setState?',
          answer: 'When new state depends on previous state, use functional form: setState(prev => prev + 1). React batches updates, so reading state directly may be stale. Functional update always gets latest value.',
          difficulty: 'medium'
        },
        {
          question: 'How does useState differ from useRef?',
          answer: 'useState triggers re-render when updated. useRef persists value across renders but doesnt trigger re-render. Use useRef for values you need to persist but dont affect UI.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'useeffect-hook',
      title: 'useEffect Hook',
      tags: ['hooks', 'effects', 'lifecycle'],
      definition: 'useEffect performs side effects in functional components. Replaces componentDidMount, componentDidUpdate, and componentWillUnmount.',
      keyPoints: [
        'Runs after render by default',
        'Dependency array controls when effect runs',
        'Empty array = run once (mount)',
        'Return function for cleanup (unmount)',
        'List all dependencies used inside effect',
        'Avoid infinite loops - dont update state unconditionally'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'useEffect Patterns',
          language: 'javascript',
          code: `// Run on every render (rarely needed)
useEffect(() => {
  console.log('Rendered');
});

// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Cleanup on unmount
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// Practical: API fetch with cleanup
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const response = await fetch(\`/api/user/\${id}\`);
    const data = await response.json();
    if (!cancelled) {
      setUser(data);
    }
  }
  
  fetchData();
  
  return () => { cancelled = true; };
}, [id]);`
        }
      ],
      output: {
        description: 'useEffect runs at specific times based on dependencies:',
        result: '[] = runs once after first render (mount)\n[userId] = runs when userId changes\nno array = runs after every render\nCleanup function runs before next effect or unmount'
      },
      commonMistakes: [
        {
          mistake: 'Missing dependency in array',
          why: 'Effect uses stale value, leads to bugs. ESLint exhaustive-deps warns.',
          correct: 'Include ALL values from component scope used in effect.'
        },
        {
          mistake: 'Infinite loop from updating state',
          why: 'Updating state calls re-render → effect runs → updates state...',
          correct: 'Add proper dependencies, dont update state unconditionally.'
        },
        {
          mistake: 'Async function as effect',
          why: 'useEffect callback cant be async (returns cleanup, not Promise).',
          correct: 'Define async function inside effect and call it.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How to fetch data on component mount?',
          answer: 'Use useEffect with empty dependency array. Define async function inside effect (or use .then). Handle cleanup to prevent setState on unmounted component. Consider loading/error states.',
          difficulty: 'medium'
        },
        {
          question: 'What does the cleanup function do?',
          answer: 'Cleanup runs when: component unmounts, or before effect re-runs (dependency changed). Use for subscriptions, timers, event listeners. Prevents memory leaks.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'controlled-forms',
      title: 'Controlled Components & Forms',
      tags: ['forms', 'input', 'validation'],
      definition: 'Controlled components have their form data controlled by React state rather than DOM. React is the single source of truth.',
      keyPoints: [
        'Input value tied to state',
        'onChange updates state',
        'React controls the input value',
        'Enables validation, formatting on input',
        'Submit handler prevents default, uses state',
        'Can validate in real-time as user types'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Controlled Form',
          language: 'javascript',
          code: `function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submit:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}`
        }
      ],
      output: {
        description: 'Form behavior with controlled components:',
        result: 'User types → onChange fires → state updates → input shows new value\nSubmit validates → shows errors or processes form data'
      },
      commonMistakes: [
        {
          mistake: 'Missing value prop on input',
          why: 'Input becomes uncontrolled - React doesnt control it.',
          correct: 'Always pair value={state} with onChange handler.'
        },
        {
          mistake: 'Forgetting e.preventDefault() on submit',
          why: 'Form submits via HTTP, page refreshes.',
          correct: 'Always call e.preventDefault() in submit handler.'
        },
        {
          mistake: 'Not using name attribute',
          why: 'Cant identify which field changed in generic handler.',
          correct: 'Use name prop and e.target.name to handle multiple inputs with one handler.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Controlled vs Uncontrolled components?',
          answer: 'Controlled: React state is source of truth, value + onChange handler. More code but full control. Uncontrolled: DOM is source of truth, use ref to access values. Simpler but less control.',
          difficulty: 'medium'
        },
        {
          question: 'How would you handle form validation in React?',
          answer: 'Controlled component with validation in onChange (real-time) or onSubmit. Store errors in state. Show error messages conditionally. Can use libraries like Formik or React Hook Form for complex forms.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'usecontext-hook',
      title: 'useContext Hook',
      tags: ['context', 'state', 'global'],
      definition: 'useContext provides a way to pass data through component tree without prop drilling. Creates global state accessible to nested components.',
      keyPoints: [
        'Create context with createContext()',
        'Provider wraps consumers, provides value',
        'useContext(Context) reads current value',
        'Component re-renders when context value changes',
        'Good for: theme, auth, locale',
        'Not replacement for all state management'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Theme Context',
          language: 'javascript',
          code: `// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage in component
function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}`
        }
      ],
      output: {
        description: 'Context makes theme available everywhere:',
        result: 'Any component can call useTheme() to get current theme and toggleTheme function.\nNo need to pass props through intermediate components.'
      },
      commonMistakes: [
        {
          mistake: 'Using context for all state',
          why: 'Context re-renders all consumers on any change. Not optimized for frequent updates.',
          correct: 'Use for low-frequency updates (theme, auth). Use local state or state libs for frequent updates.'
        },
        {
          mistake: 'Not providing default value',
          why: 'Components outside Provider get undefined, causing errors.',
          correct: 'Either provide default in createContext() or throw helpful error in custom hook.'
        },
        {
          mistake: 'Putting too much in one context',
          why: 'Any change re-renders all consumers, even if they dont use changed value.',
          correct: 'Split contexts by concern (ThemeContext, AuthContext, etc.).'
        }
      ],
      interviewQuestions: [
        {
          question: 'When to use Context vs Redux?',
          answer: 'Context: simple global state (theme, auth, locale), low-frequency updates. Redux: complex state logic, debugging tools needed, high-frequency updates (Context lacks optimization).',
          difficulty: 'medium'
        },
        {
          question: 'What is prop drilling and how does Context solve it?',
          answer: 'Prop drilling = passing props through many component levels to reach deeply nested child. Context provides value at top, any descendant can consume directly without intermediate components passing it.',
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'usememo-usecallback',
      title: 'useMemo & useCallback',
      tags: ['hooks', 'performance', 'optimization'],
      definition: 'useMemo memoizes expensive computed values. useCallback memoizes function references. Both prevent unnecessary recalculations and re-renders.',
      keyPoints: [
        'useMemo: memoize computed value',
        'useCallback: memoize function reference',
        'Both take dependency array',
        'Prevent expensive recalculations',
        'Stable references prevent child re-renders',
        'Dont overuse - adds complexity'
      ],
      codeExamples: [
        {
          level: 'Intermediate',
          title: 'Memoization Patterns',
          language: 'javascript',
          code: `function SearchResults({ items, query }) {
  // useMemo: cache expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]); // Only recompute when these change

  // useCallback: stable function reference
  const handleItemClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []); // Function never changes

  return (
    <ul>
      {filteredItems.map(item => (
        <ListItem 
          key={item.id}
          item={item}
          onClick={handleItemClick} // Stable reference
        />
      ))}
    </ul>
  );
}

// Child wrapped with React.memo benefits from stable props
const ListItem = React.memo(({ item, onClick }) => {
  console.log('Rendering:', item.name);
  return <li onClick={() => onClick(item.id)}>{item.name}</li>;
});`
        }
      ],
      output: {
        description: 'Without memoization vs with:',
        result: 'Without: filteredItems recalculates on every render, ListItem re-renders every time\nWith: filteredItems only recalculates when items/query change, ListItem only re-renders when its props change'
      },
      commonMistakes: [
        {
          mistake: 'Memoizing everything',
          why: 'Memoization has overhead (comparison, cache). Simple calculations are faster without it.',
          correct: 'Only memoize expensive computations or when preventing child re-renders.'
        },
        {
          mistake: 'Wrong dependencies',
          why: 'Missing deps = stale values. Extra deps = unnecessary recalculation.',
          correct: 'Include all values used inside, nothing more.'
        },
        {
          mistake: 'Using useCallback without React.memo child',
          why: 'Stable reference is useless if child re-renders anyway.',
          correct: 'useCallback pairs with React.memo on child component.'
        }
      ],
      interviewQuestions: [
        {
          question: 'When to use useMemo vs useCallback?',
          answer: 'useMemo: memoize computed VALUES (expensive calculations, derived data). useCallback: memoize FUNCTIONS (event handlers passed to optimized children). useCallback(fn, deps) equals useMemo(() => fn, deps).',
          difficulty: 'medium'
        },
        {
          question: 'When should you NOT use useMemo?',
          answer: 'Simple calculations, values that change every render anyway, premature optimization. Memoization has overhead. Profile first, optimize where needed.',
          difficulty: 'medium'
        }
      ]
    }
  ]
};

export default reactData;
