export const javascriptData = {
  id: 'javascript',
  title: 'JavaScript',
  icon: '⚡',
  description: 'Master JavaScript fundamentals - execution context, closures, async, and modern ES6+ features',
  subtopics: [
    {
      id: 'execution-context',
      title: 'Execution Context & Hoisting',
      tags: ['fundamentals', 'scope', 'memory'],
      definition: 'Execution context is the environment where JavaScript code is evaluated and executed. It contains variables, scope chain, and this binding.',
      whyItExists: 'JS needs to know where variables are stored, what this refers to, and scope boundaries. Understanding this prevents bugs from hoisting and scope issues.',
      keyPoints: [
        'Global Execution Context created first',
        'Function Execution Context for each function call',
        'Two phases: Creation (hoisting) and Execution',
        'var is hoisted and initialized to undefined',
        'let/const are hoisted but NOT initialized (TDZ)',
        'Functions declarations are fully hoisted',
        'Function expressions are NOT fully hoisted'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Hoisting Behavior',
          language: 'javascript',
          code: `// var hoisting - initialized to undefined
console.log(x); // undefined (not error!)
var x = 5;

// let/const - Temporal Dead Zone
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Function declaration - fully hoisted
greet(); // Works! Output: "Hello"
function greet() {
  console.log("Hello");
}

// Function expression - NOT hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi");
};`
        }
      ],
      output: {
        description: 'Console output for hoisting examples:',
        result: 'console.log(x) → undefined\nconsole.log(y) → ReferenceError\ngreet() → "Hello"\nsayHi() → TypeError'
      },
      commonMistakes: [
        {
          mistake: 'Thinking let/const are not hoisted',
          why: 'They ARE hoisted, but remain in Temporal Dead Zone until declaration.',
          correct: 'Understand TDZ - accessing before declaration throws error.'
        },
        {
          mistake: 'Using var in loops',
          why: 'var is function-scoped, not block-scoped. Loop variable leaks.',
          correct: 'Use let for loop counters.'
        },
        {
          mistake: 'Relying on hoisting for code organization',
          why: 'Makes code hard to read and debug.',
          correct: 'Declare variables at top of scope, functions before use.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Explain hoisting in JavaScript',
          answer: 'Hoisting moves declarations to top of scope during creation phase. var initialized to undefined, let/const in TDZ, function declarations fully hoisted. Only declarations hoisted, not initializations.',
          tip: 'Demonstrate with var vs let example.',
          difficulty: 'medium'
        },
        {
          question: 'What is Temporal Dead Zone?',
          answer: 'TDZ is time between entering scope and variable declaration. Accessing let/const in TDZ throws ReferenceError. Exists from start of block until declaration line.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'closures',
      title: 'Closures',
      tags: ['scope', 'functions', 'advanced'],
      definition: 'A closure is a function bundled with its lexical environment - it remembers variables from its outer scope even after that scope has finished executing.',
      whyItExists: 'Enables data privacy, factory functions, callbacks, and maintaining state without global variables.',
      keyPoints: [
        'Function + its outer scope variables',
        'Inner function accesses outer variables',
        'Variables persist after outer function returns',
        'Each closure has its own copy of variables',
        'Used for private variables, callbacks, currying'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Basic Closure',
          language: 'javascript',
          code: `function createCounter() {
  let count = 0; // private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.count); // undefined - count is PRIVATE`
        },
        {
          level: 'Intermediate',
          title: 'Closure in Loops',
          language: 'javascript',
          code: `// PROBLEM with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (i is shared!)

// SOLUTION 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// SOLUTION 2: Create closure with IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2`
        }
      ],
      output: {
        description: 'Closure counter example output:',
        result: 'counter.increment() → 1\ncounter.increment() → 2\ncounter.getCount() → 2\ncounter.count → undefined (private!)\n\nLoop with var: 3, 3, 3\nLoop with let: 0, 1, 2'
      },
      commonMistakes: [
        {
          mistake: 'Not understanding variable sharing in loops',
          why: 'var creates one shared variable for all loop iterations.',
          correct: 'Use let for new binding each iteration, or create closure.'
        },
        {
          mistake: 'Memory leaks from closures',
          why: 'Closures hold references to outer scope, preventing garbage collection.',
          correct: 'Set references to null when done, be mindful of what you capture.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is a closure? Give an example use case.',
          answer: 'Closure = function + lexical environment. The inner function remembers outer scope variables. Use cases: private variables (module pattern), callbacks, event handlers, currying.',
          tip: 'Show counter example - count is private.',
          difficulty: 'medium'
        },
        {
          question: 'Loop with var and setTimeout - explain the bug',
          answer: 'var is function-scoped, so all callbacks share same i. By time callbacks run, loop finished, i = final value. Fix: use let (block-scoped) or create closure with IIFE.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'event-loop',
      title: 'Event Loop & Async',
      tags: ['async', 'callback', 'promise'],
      definition: 'The event loop handles asynchronous operations by managing the call stack, callback queue, and microtask queue.',
      whyItExists: 'JavaScript is single-threaded. Event loop enables non-blocking async operations (network, timers) without freezing UI.',
      keyPoints: [
        'Call Stack: executes synchronous code',
        'Web APIs: handle async operations',
        'Callback Queue (Task Queue): setTimeout, events',
        'Microtask Queue: Promises, queueMicrotask',
        'Microtasks run before next task',
        'Event loop: stack empty → microtasks → next task'
      ],
      codeExamples: [
        {
          level: 'Intermediate',
          title: 'Event Loop Order',
          language: 'javascript',
          code: `console.log('1. Start');

setTimeout(() => {
  console.log('4. Timeout');
}, 0);

Promise.resolve()
  .then(() => console.log('3. Promise'));

console.log('2. End');

// Output order:
// 1. Start
// 2. End
// 3. Promise (microtask - runs before timeout)
// 4. Timeout (macrotask)`
        }
      ],
      output: {
        description: 'Event loop execution order:',
        result: '1. Start (sync)\n2. End (sync)\n3. Promise (microtask - higher priority)\n4. Timeout (macrotask - runs after microtasks)'
      },
      commonMistakes: [
        {
          mistake: 'Expecting setTimeout(fn, 0) to run immediately',
          why: 'setTimeout goes to macrotask queue, runs after all sync code and microtasks.',
          correct: 'Understand queue priorities: sync > microtasks > macrotasks.'
        },
        {
          mistake: 'Blocking the event loop',
          why: 'Long-running sync code blocks everything else.',
          correct: 'Break up heavy work with setTimeout or Web Workers.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Explain the event loop',
          answer: 'JS is single-threaded with call stack. Async ops go to Web APIs, then to queues. Event loop checks: if stack empty, run all microtasks (Promises), then one macrotask (setTimeout). Repeat.',
          tip: 'Draw diagram: Stack → Web APIs → Queues → Event Loop',
          difficulty: 'hard'
        },
        {
          question: 'Why does Promise.then run before setTimeout(fn, 0)?',
          answer: 'Promises go to microtask queue, setTimeout to macrotask queue. Microtasks have priority - all microtasks run before next macrotask.',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'promises-async',
      title: 'Promises & Async/Await',
      tags: ['async', 'promise', 'modern'],
      definition: 'Promises represent eventual completion of async operations. Async/await provides cleaner syntax for consuming promises.',
      keyPoints: [
        'Promise states: pending, fulfilled, rejected',
        '.then() for success, .catch() for errors',
        'Promise.all(): wait for all (fails fast)',
        'Promise.allSettled(): get all results',
        'Promise.race(): first to settle wins',
        'async function returns Promise',
        'await pauses until Promise settles',
        'try/catch for error handling with await'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Promise Basics',
          language: 'javascript',
          code: `// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ user: 'John', id: 1 });
      } else {
        reject(new Error('Failed to fetch'));
      }
    }, 1000);
  });
};

// Consuming with .then/.catch
fetchData()
  .then(data => console.log('Got:', data))
  .catch(err => console.error('Error:', err));

// Async/Await - cleaner syntax
async function getData() {
  try {
    const data = await fetchData();
    console.log('Got:', data);
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}`
        },
        {
          level: 'Intermediate',
          title: 'Promise Utilities',
          language: 'javascript',
          code: `// Promise.all - wait for all, fail fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
// Fails completely if ANY promise rejects

// Promise.allSettled - get all results regardless
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/might-fail')
]);
// [{status:'fulfilled', value}, {status:'rejected', reason}]

// Promise.race - first to settle wins
const fast = await Promise.race([
  fetch('/api/server1'),
  fetch('/api/server2')
]);

// Practical: fetch with timeout
const fetchWithTimeout = (url, ms) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
};`
        }
      ],
      output: {
        description: 'Promise resolution examples:',
        result: 'fetchData() success: { user: "John", id: 1 }\nPromise.all: [usersArray, postsArray]\nPromise.allSettled: [{status, value/reason}, ...]'
      },
      commonMistakes: [
        {
          mistake: 'Forgetting to return in .then chain',
          why: 'Next .then receives undefined instead of data.',
          correct: 'Always return values in .then, or use async/await.'
        },
        {
          mistake: 'Using await in regular function',
          why: 'await only works inside async functions.',
          correct: 'Mark function as async or use .then().'
        },
        {
          mistake: 'Not handling rejected promises',
          why: 'Unhandled rejection can crash Node or silently fail.',
          correct: 'Always use .catch() or try/catch with await.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Promise.all vs Promise.allSettled',
          answer: 'Promise.all: resolves when ALL fulfill, rejects immediately if ANY rejects. Use when all must succeed. Promise.allSettled: waits for ALL to settle, returns array with status/value/reason. Use when you need all results regardless of failures.',
          difficulty: 'medium'
        },
        {
          question: 'How does async/await work under the hood?',
          answer: 'async/await is syntactic sugar for Promises. async function always returns Promise. await pauses execution until Promise settles, then unwraps value. Compiled to .then() chains by transpilers.',
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'this-keyword',
      title: 'The "this" Keyword',
      tags: ['context', 'binding', 'scope'],
      definition: 'this refers to the object that is executing the current function. Its value depends on HOW the function is called.',
      keyPoints: [
        'Global: this = window (browser) / undefined (strict)',
        'Object method: this = the object',
        'Regular function: this = global/undefined',
        'Arrow function: this = inherited from enclosing scope',
        'Event: this = element that triggered event',
        '.call/.apply/.bind: explicitly set this'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'this in Different Contexts',
          language: 'javascript',
          code: `const user = {
  name: 'John',
  
  // Method: this = user object
  greet() {
    console.log('Hello, ' + this.name); // 'Hello, John'
  },
  
  // Arrow: inherits this (WRONG for methods)
  greetArrow: () => {
    console.log('Hi, ' + this.name); // 'Hi, undefined'
  },
  
  // Callback problem and solution
  delayedGreet() {
    // Problem: regular function loses this
    setTimeout(function() {
      console.log(this.name); // undefined!
    }, 100);
    
    // Solution 1: arrow function
    setTimeout(() => {
      console.log(this.name); // 'John' ✓
    }, 100);
    
    // Solution 2: bind
    setTimeout(function() {
      console.log(this.name); // 'John' ✓
    }.bind(this), 100);
  }
};

// call, apply, bind
function introduce(greeting) {
  console.log(greeting + ', I am ' + this.name);
}
introduce.call(user, 'Hi');   // 'Hi, I am John'
introduce.apply(user, ['Hey']); // 'Hey, I am John'
const boundFn = introduce.bind(user);
boundFn('Hello'); // 'Hello, I am John'`
        }
      ],
      output: {
        description: 'this keyword behavior:',
        result: 'user.greet() → "Hello, John"\nuser.greetArrow() → "Hi, undefined"\nintroduce.call(user, "Hi") → "Hi, I am John"'
      },
      commonMistakes: [
        {
          mistake: 'Using arrow functions for object methods',
          why: 'Arrow functions dont have own this - inherit from outer scope.',
          correct: 'Use regular function syntax for methods.'
        },
        {
          mistake: 'Losing this in callbacks',
          why: 'Regular functions in callbacks get new this (usually undefined).',
          correct: 'Use arrow functions, .bind(), or store this in variable.'
        }
      ],
      interviewQuestions: [
        {
          question: 'Explain this in arrow functions',
          answer: 'Arrow functions dont have own this - inherit from enclosing lexical scope. Great for callbacks (keeps outer this), bad for object methods (lose object context).',
          difficulty: 'medium'
        },
        {
          question: 'How do call, apply, and bind differ?',
          answer: 'All set this explicitly. call: invokes immediately, args as list. apply: invokes immediately, args as array. bind: returns NEW function with bound this (doesnt invoke).',
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'array-methods',
      title: 'Array Methods: map, filter, reduce',
      tags: ['arrays', 'functional', 'iteration'],
      definition: 'Higher-order array methods that transform, filter, or reduce arrays without mutating the original.',
      keyPoints: [
        'map: transform each element, returns new array',
        'filter: keep elements passing test, returns new array',
        'reduce: accumulate to single value',
        'forEach: side effects only, returns undefined',
        'find: first element matching condition',
        'some/every: test conditions on array',
        'All return new arrays (except forEach, reduce)'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Essential Array Methods',
          language: 'javascript',
          code: `const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 22, active: true }
];

// map: transform to new array
const names = users.map(u => u.name);
// ['John', 'Jane', 'Bob']

// filter: keep matching elements
const activeUsers = users.filter(u => u.active);
// [{ name: 'John'... }, { name: 'Bob'... }]

// find: first match (not array)
const john = users.find(u => u.name === 'John');
// { name: 'John', age: 25, active: true }

// reduce: accumulate to single value
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
// 77

// some/every: test conditions
const hasInactive = users.some(u => !u.active); // true
const allAdults = users.every(u => u.age >= 18); // true

// Chain them!
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name);
// ['John', 'Bob']`
        }
      ],
      output: {
        description: 'Array method results:',
        result: 'map → ["John", "Jane", "Bob"]\nfilter → [{John}, {Bob}]\nfind → {John}\nreduce → 77\nchained → ["John", "Bob"]'
      },
      commonMistakes: [
        {
          mistake: 'Using forEach when map is needed',
          why: 'forEach returns undefined, cant chain. map returns new array.',
          correct: 'Use map for transformations, forEach only for side effects.'
        },
        {
          mistake: 'Mutating in map/filter callbacks',
          why: 'These should be pure - return new values, not modify originals.',
          correct: 'Create new objects: .map(u => ({...u, name: u.name.toUpperCase()}))'
        },
        {
          mistake: 'Forgetting initial value in reduce',
          why: 'Without initial value, first element is used, may cause type errors.',
          correct: 'Always provide initial value: reduce((acc, curr) => ..., initialValue)'
        }
      ],
      interviewQuestions: [
        {
          question: 'Explain reduce with an example',
          answer: 'reduce accumulates array to single value. Takes callback(accumulator, current) and initial value. Common uses: sum, counting, grouping, flattening. Example: [1,2,3].reduce((sum, n) => sum + n, 0) = 6',
          difficulty: 'medium'
        },
        {
          question: 'map vs forEach?',
          answer: 'map transforms and returns new array - use when you need transformed data. forEach is for side effects only (logging, DOM updates) - returns undefined. Prefer map for transformations.',
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'destructuring-spread',
      title: 'Destructuring & Spread',
      tags: ['ES6', 'syntax', 'modern'],
      definition: 'Destructuring extracts values from objects/arrays into variables. Spread operator (...) expands iterables into individual elements.',
      keyPoints: [
        'Object destructuring: const { a, b } = obj',
        'Array destructuring: const [x, y] = arr',
        'Default values: { a = 1 } = obj',
        'Rename: { a: newName } = obj',
        'Spread in arrays: [...arr1, ...arr2]',
        'Spread in objects: {...obj1, ...obj2}',
        'Rest parameter: function(...args)'
      ],
      codeExamples: [
        {
          level: 'Beginner',
          title: 'Destructuring & Spread Patterns',
          language: 'javascript',
          code: `// Object destructuring
const user = { name: 'John', age: 25, city: 'NYC' };
const { name, age } = user;
console.log(name); // 'John'

// With rename and default
const { name: userName, country = 'USA' } = user;
console.log(userName); // 'John'
console.log(country);  // 'USA' (default)

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Spread: copy and merge
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Function with rest parameter
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Practical: React props
function Button({ onClick, children, ...rest }) {
  return <button onClick={onClick} {...rest}>{children}</button>;
}`
        }
      ],
      output: {
        description: 'Destructuring and spread results:',
        result: '{ name, age } from user → name="John", age=25\n[first, ...rest] → first=1, rest=[3,4,5]\n{...obj1, b: 2} → {a: 1, b: 2}'
      },
      commonMistakes: [
        {
          mistake: 'Shallow copy confusion',
          why: 'Spread creates shallow copy - nested objects still reference original.',
          correct: 'For deep copy, use structuredClone() or JSON.parse(JSON.stringify()).'
        },
        {
          mistake: 'Destructuring undefined',
          why: 'Cant destructure undefined/null - throws error.',
          correct: 'Use default: const { a } = obj || {} or optional chaining.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is the difference between rest and spread?',
          answer: 'Same syntax (...) but opposite purposes. Spread EXPANDS iterable into elements. Rest COLLECTS multiple elements into array. Spread in function calls/arrays, rest in function params/destructuring.',
          difficulty: 'easy'
        },
        {
          question: 'How do you deep clone an object?',
          answer: 'Spread only shallow copies. For deep: structuredClone(obj) in modern JS, or JSON.parse(JSON.stringify(obj)) for simple objects (loses functions, dates). Libraries like lodash have _.cloneDeep().',
          difficulty: 'medium'
        }
      ]
    }
  ]
};

export default javascriptData;
