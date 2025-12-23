---
title: "Modern JavaScript (ES6+)"
description: "Master key ES6+ features like Promises, async/await, arrow functions, and the event loop mechanism."
pubDate: "9 6 2025"
published: true
tags:
  [
    "JavaScript",
    "Front-End",
    "ES6",
    "Async",
    "Event Loop",
    "Promises",
    "Nodejs",
    "Web Development",
  ]
---

## Mind Map Summary

- **Modern JavaScript (ES6/ES2015 and beyond)**
  - **Variables**:
    - `let`: Block-scoped variables. The modern replacement for `var`.
    - `const`: Block-scoped constants. The value cannot be reassigned.
  - **Functions**:
    - **Arrow Functions (`=>`)**: A concise syntax for functions. Lexically binds the `this` keyword, avoiding common bugs.
  - **Asynchronous Operations**:
    - **Callbacks**: Prone to "Callback Hell" (deeply nested, hard-to-read code).
    - **Promises**: Represents the eventual success/failure of an async operation. Allows `.then()`/`.catch()` chaining.
    - **`async`/`await`**: Syntactic sugar over Promises. Writes async code that reads like synchronous code.
  - **Modules**: Splitting code into separate files using `import` and `export`.
  - **The Event Loop**: Core mechanism for handling async operations without blocking the main thread.

## Core Concepts

### 1. `let` and `const` vs. `var`

Before ES6, `var` was the only way to declare a variable. `var` is _function-scoped_, which can lead to confusing behavior (hoisting). `let` and `const` are _block-scoped_ (they only exist within the nearest set of curly braces `{}`), which is more predictable.

- **Best Practice**: Always use `const` by default. If you know you need to reassign the variable, use `let`. Avoid using `var` in modern code.

### 2. Arrow Functions

The syntax is more concise (`(a, b) => a + b`), but the most important feature is how it handles `this`. In a traditional function, the value of `this` is determined by how the function is called. In an arrow function, `this` is determined by the surrounding scope (**lexical binding**). This solves a whole class of bugs, especially in event handlers and callbacks.

### 3. Asynchronous JavaScript & The Event Loop

JavaScript is single-threaded, meaning it can only do one thing at a time. The **Event Loop** allows it to handle long-running operations (like an API call) without freezing the UI.

1. When an async operation (like `fetch`) starts, it's handed to the browser's Web API.
2. The JavaScript call stack continues to run.
3. When the Web API finishes, it places a callback function in the **Callback Queue**.
4. The Event Loop checks if the call stack is empty. If it is, it pushes the first item from the queue onto the stack.

### 4. Promises and `async/await`

- **Promises**: An object representing the future result of an async operation. It can be `pending`, `fulfilled`, or `rejected`.
- **`async/await`**: A layer on top of Promises. An `async` function automatically returns a Promise. `await` pauses execution until a Promise settles, then resumes with the result.

## Practice Exercise

Refactor callback-based asynchronous code (callback hell) to use Promises, and then again using `async/await`.

## Answer

### 1. The "Bad" Code: Callback Hell

```javascript
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Fetched user");
    callback(null, { id: id, name: "John Doe" });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    console.log("Fetched posts");
    callback(null, [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    console.log("Fetched comments");
    callback(null, [{ id: 101, text: "Great post!" }]);
  }, 500);
}

// Callback Hell - The Pyramid of Doom
getUser(1, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    getPosts(user.id, (err, posts) => {
      if (err) {
        console.error(err);
      } else {
        getComments(posts[0].id, (err, comments) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Comments:", comments);
          }
        });
      }
    });
  }
});
```

### 2. The "Better" Code: Using Promises

```javascript
function getUserP(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched user");
      resolve({ id: id, name: "John Doe" });
    }, 500);
  });
}

function getPostsP(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched posts");
      resolve([{ id: 1, title: "Post 1" }]);
    }, 500);
  });
}

function getCommentsP(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched comments");
      resolve([{ id: 101, text: "Great post!" }]);
    }, 500);
  });
}

// Promise Chaining
getUserP(1)
  .then((user) => getPostsP(user.id))
  .then((posts) => getCommentsP(posts[0].id))
  .then((comments) => console.log("Comments:", comments))
  .catch((err) => console.error("An error occurred:", err));
```

### 3. The "Best" Code: Using `async/await`

```javascript
async function fetchPostComments(userId) {
  try {
    const user = await getUserP(userId);
    const posts = await getPostsP(user.id);
    const comments = await getCommentsP(posts[0].id);
    console.log("Comments:", comments);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

fetchPostComments(1);
```

### Key Improvements

1. **Readability**: `async/await` reads top-to-bottom like synchronous code.
2. **Error Handling**: A single `try/catch` block replaces repetitive error checks in every callback.
3. **Execution Flow**: Promises avoid the "Pyramid of Doom" nesting.
