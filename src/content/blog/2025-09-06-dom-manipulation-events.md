---
title: "DOM Manipulation & Events"
description: "Explain how JavaScript interacts with the DOM. Discuss event bubbling, capturing, and delegation."
pubDate: "Sep 06 2025"
published: true
tags: ["Front-End: Core Web", "JavaScript"]
---

### Mind Map Summary

- **The DOM (Document Object Model)**
  - **What**: A tree-like programming interface for an HTML document. It represents the page so that programs can change the document structure, style, and content.
  - **DOM Manipulation (The Core Task)**
    - **Selecting Elements**: Finding the nodes you want to work with.
      - `document.getElementById()`
      - `document.querySelector()` (finds the first match)
      - `document.querySelectorAll()` (finds all matches)
    - **Modifying Elements**: Changing the selected nodes.
      - `element.textContent` / `element.innerHTML`
      - `element.style`
      - `element.classList.add/remove/toggle`
      - `element.setAttribute()`
    - **Creating/Adding Elements**: 
      - `document.createElement()`
      - `parentElement.appendChild()`
- **DOM Events**
  - **What**: Signals that something has happened in the browser (e.g., a click, a keypress, a form submission).
  - **Event Flow (The Journey of an Event)**
    - **1. Capturing Phase**: The event travels from the root of the document *down* to the target element.
    - **2. Target Phase**: The event reaches the target element.
    - **3. Bubbling Phase**: The event travels *up* from the target element back to the root. This is the default phase for event listeners.
  - **Event Delegation (The Smart Way to Handle Events)**
    - **What**: Instead of adding an event listener to every child element, add a single listener to their common parent.
    - **How**: Leverages event bubbling. The parent listener inspects `event.target` to see which child triggered the event.
    - **Benefits**: Better performance (fewer listeners) and automatically handles dynamically added child elements.

### Core Concepts

#### 1. DOM Manipulation
This is the foundation of any dynamic webpage. JavaScript uses the `document` object as an entry point to the DOM. From there, you can select any element on the page using various methods. Once you have a reference to an element, you can change its content, apply styles, modify its attributes, or even remove it from the page entirely. You can also create new elements from scratch and append them to the DOM, building up your UI programmatically.

#### 2. Event Bubbling and Capturing
When you click a button inside a div, what have you actually clicked? The button, the div, the body, the html element... in a way, all of them. The browser formalizes this with a two-phase process. The event first travels down from the `window` to the target element (the **capturing phase**), and then travels back up from the target to the `window` (the **bubbling phase**). By default, `addEventListener` listens for events in the bubbling phase. This is a crucial concept because it makes event delegation possible.

#### 3. Event Delegation
Imagine a `<ul>` with 100 `<li>` items, and you want to do something when any `<li>` is clicked. The naive approach is to add 100 separate event listeners, one for each `<li>`. This is inefficient. The smart approach is to use event delegation: add a *single* click listener to the parent `<ul>`.

Because of event bubbling, a click on any `<li>` will "bubble up" to the `<ul>`. The event listener on the `<ul>` will fire, and inside its handler function, you can check the `event.target` property. `event.target` is a reference to the actual element that was clicked (the `<li>`). This allows you to handle events for all children with one listener. This has two major benefits:
1.  **Performance**: You have only one event listener instead of hundreds.
2.  **Dynamic Elements**: If you add a new `<li>` to the list later with JavaScript, the event handler on the `<ul>` will automatically work for the new item without needing to attach a new listener.

### Practice Exercise

Build a simple to-do list application using vanilla JavaScript. Users should be able to add, delete, and mark items as complete. Use event delegation for the delete and complete actions.

### Answer

#### HTML and CSS

```html
<style>
    .completed { text-decoration: line-through; color: #888; }
    li { cursor: pointer; margin: 5px 0; }
    .delete-btn { margin-left: 10px; color: red; cursor: pointer; }
</style>

<h1>To-Do List</h1>
<input type="text" id="todo-input" placeholder="Add a new task">
<button id="add-btn">Add</button>
<ul id="todo-list"></ul>
```

#### JavaScript Solution

```javascript
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// --- Event Listener for Adding a New To-Do --- 
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        addTodoItem(taskText);
        todoInput.value = '';
        todoInput.focus();
    }
});

// --- Event Delegation for Clicks on the List --- 
// A single listener on the parent UL handles all clicks on its children.
todoList.addEventListener('click', (event) => {
    const target = event.target;

    // Check if a delete button was clicked
    if (target.matches('.delete-btn')) {
        const li = target.parentElement;
        todoList.removeChild(li);
    }
    // Check if an LI element was clicked (for toggling completion)
    else if (target.matches('li')) {
        target.classList.toggle('completed');
    }
});

function addTodoItem(text) {
    // 1. Create the new elements
    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '[X]';
    deleteBtn.className = 'delete-btn';

    // 2. Append the delete button to the list item
    li.appendChild(deleteBtn);

    // 3. Append the list item to the main list
    todoList.appendChild(li);
}
```

#### Explanation

1.  **Adding an Item**: The `addBtn` has a standard event listener. When clicked, it reads the input, calls `addTodoItem` to create the necessary DOM elements (`<li>` and `<span>`), and appends them to the `<ul>`.

2.  **Event Delegation in Action**: The key to this solution is the single `click` listener on the `todoList` (`<ul>`).
    -   When a click occurs anywhere inside the `<ul>`, this listener fires.
    -   `event.target` tells us exactly which element was clicked.
    -   We use `target.matches('.delete-btn')` to check if the clicked element was a delete button. If so, we find its parent `<li>` and remove it.
    -   We use `target.matches('li')` to check if the click was on the list item itself. If so, we toggle the `.completed` CSS class on it.

3.  **The Benefit**: We never have to add event listeners to the individual `<li>` or `<span>` elements. When we call `addTodoItem` and append a new `<li>`, this event delegation model works for it immediately and automatically, because the new item is inside the `<ul>` that has the listener.