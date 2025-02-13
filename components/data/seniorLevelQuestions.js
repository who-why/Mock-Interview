const seniorLevelQuestions = [
  [
    "React.js",
    [
      "How does React’s reconciliation algorithm work under the hood?",
      "Explain the limitations of React’s concurrent mode and when it should be used.",
      "How do you handle large-scale state management in a React application?",
      "What are the best practices for optimizing React Server Components?",
      "Explain how Suspense and Concurrent Rendering improve application performance.",
      "How would you implement an isomorphic/universal React application?",
      "What are some strategies for reducing bundle size in a large React app?",
      "How do you manage side effects in complex React applications?",
      "Explain the trade-offs between Redux, Recoil, and Zustand for state management.",
      "How would you architect a scalable design system using React?"
    ]
  ],
  [
    "Vue.js",
    [
      "How does Vue.js handle reactivity under the hood?",
      "Explain the key improvements in Vue 3 over Vue 2.",
      "How would you design a large-scale application architecture using Vue.js?",
      "What are the best practices for managing performance in a Vue.js application?",
      "How do you optimize component rendering in Vue.js?",
      "Explain the role of Vue Composition API in building modular applications.",
      "How do you handle lazy loading and code splitting in a Vue app?",
      "What are the trade-offs between Vuex, Pinia, and other state management solutions?",
      "How would you integrate Vue with TypeScript efficiently?",
      "How do you handle SSR and hydration issues in a Vue.js application?"
    ]
  ],
  [
    "Angular",
    [
      "How does Angular’s Ivy renderer improve performance?",
      "Explain how Angular’s change detection mechanism works in depth.",
      "What are the key differences between Angular modules and standalone components?",
      "How do you optimize dependency injection in a large Angular application?",
      "What are the best strategies for handling memory leaks in Angular?",
      "How would you implement micro-frontends using Angular?",
      "How does Angular Universal handle SSR, and what are its limitations?",
      "What are the security best practices for Angular applications?",
      "How do you handle state management at scale in Angular?",
      "What are the performance implications of using signals in Angular?"
    ]
  ],
  [
    "Node.js",
    [
      "How would you design a highly scalable microservices architecture using Node.js?",
      "What are the best practices for managing memory leaks in Node.js?",
      "How does the Node.js event loop work in multi-threaded applications?",
      "What are the differences between event-driven and thread-based concurrency models?",
      "How do you optimize Node.js applications for high throughput?",
      "Explain the trade-offs of using worker threads vs. child processes in Node.js.",
      "How does Node.js handle backpressure in streams?",
      "What are the security best practices for a production-ready Node.js application?",
      "How do you efficiently handle database queries in a high-load Node.js app?",
      "How would you implement real-time features in a Node.js application?"
    ]
  ],
  [
    "Python",
    [
      "How do you handle large-scale concurrency in Python applications?",
      "What are the differences between asyncio, multiprocessing, and threading?",
      "How does Python’s garbage collection work, and how can you optimize it?",
      "How would you design a distributed system using Python?",
      "What are the trade-offs between PyPy, CPython, and Jython?",
      "How do you implement event-driven architecture in Python?",
      "How do you optimize Python applications for performance and memory usage?",
      "What are the security vulnerabilities in Python applications and how to prevent them?",
      "How would you implement a high-performance REST API using Python?",
      "How do you manage Python dependencies in large projects?"
    ]
  ],
  [
    "Java",
    [
      "How does the JVM optimize performance using JIT compilation?",
      "Explain the differences between parallel, concurrent, and reactive programming in Java.",
      "How would you design a scalable distributed system using Java?",
      "What are the trade-offs of using Spring Boot vs. Quarkus?",
      "How do you handle memory management and profiling in Java applications?",
      "What are the best practices for designing a highly available Java application?",
      "How would you optimize SQL queries in a Java-based application?",
      "What are the different GC (Garbage Collection) strategies in Java?",
      "How does Java handle deadlocks, and how can you prevent them?",
      "What are the best practices for handling large-scale data processing in Java?"
    ]
  ],
  [
    "CSS",
    [
      "How do you architect a scalable CSS system for large applications?",
      "What are the performance implications of CSS-in-JS solutions?",
      "How would you optimize rendering performance in complex CSS layouts?",
      "What are the best practices for using CSS variables in a design system?",
      "How do you handle FOUC (Flash of Unstyled Content) in SSR applications?",
      "How would you implement and optimize CSS animations for performance?",
      "What are the trade-offs between BEM, ITCSS, and utility-first CSS?",
      "How do modern browsers optimize CSS parsing and rendering?",
      "How does the CSS cascade and specificity impact performance?",
      "What are the best strategies for handling dark mode in large applications?"
    ]
  ],
  [
    "Next.js",
    [
      "How do you handle large-scale caching in a Next.js application?",
      "What are the performance implications of using ISR vs. SSR in Next.js?",
      "How would you optimize API routes in a Next.js application?",
      "What are the trade-offs between middleware and API routes in Next.js?",
      "How do you handle authentication and authorization in a Next.js app?",
      "How does Next.js handle incremental static regeneration (ISR) under the hood?",
      "What are the best practices for optimizing Lighthouse scores in Next.js?",
      "How would you manage multi-tenancy in a Next.js SaaS application?",
      "How does Next.js integrate with edge functions, and when should you use them?",
      "How do you handle large-scale state management in a Next.js application?"
    ]
  ],
  [
    "JavaScript",
    [
      "How does JavaScript’s event delegation improve performance?",
      "What are the internals of JavaScript’s garbage collection mechanism?",
      "How would you optimize JavaScript code for V8 engine performance?",
      "How do Web Workers and Service Workers impact JavaScript performance?",
      "What are the trade-offs between functional programming and OOP in JavaScript?",
      "How do you handle memory leaks in a long-running JavaScript application?",
      "What are the best practices for optimizing JavaScript execution time?",
      "How does JavaScript’s prototype chain impact performance?",
      "What are the implications of hoisting in JavaScript?",
      "How do you manage large-scale JavaScript applications efficiently?"
    ]
  ],
  [
    "Express.js",
    [
      "How do you handle high-performance API development with Express.js?",
      "What are the best strategies for securing an Express.js application?",
      "How do you optimize Express.js middleware for performance?",
      "What are the trade-offs of using Express.js vs. Koa.js?",
      "How do you handle request rate limiting in Express.js?",
      "How would you implement GraphQL APIs in an Express.js application?",
      "What are the best practices for handling file uploads in Express.js?",
      "How does clustering improve performance in an Express.js application?",
      "How do you handle multi-tenancy in an Express.js backend?",
      "What are the best caching strategies for an Express.js application?"
    ]
  ],
  [
    "MongoDB",
    [
      "How does MongoDB handle large-scale indexing efficiently?",
      "What are the best practices for designing a highly available MongoDB cluster?",
      "How do you optimize MongoDB queries for performance?",
      "What are the trade-offs between using embedded vs. referenced documents?",
      "How does MongoDB handle ACID transactions?",
      "How would you implement multi-region replication in MongoDB?",
      "What are the best strategies for sharding large datasets in MongoDB?",
      "How does MongoDB handle schema validation?",
      "What are the security best practices for MongoDB?",
      "How do you optimize MongoDB for high-throughput applications?"
    ]
  ]
];
export default seniorLevelQuestions