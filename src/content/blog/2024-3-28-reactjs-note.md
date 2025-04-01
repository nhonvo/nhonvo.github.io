---
layout: post
title: "Reactjs basic note"
description: ""
pubDate: "3 28 2024"
published: true
tags:
  - react
---

<!--truncate-->

## useState and useEffect

`useState` and `useEffect` are both hooks used in React, a JavaScript library for building user interfaces.

`useState` is a hook that allows you to add state to a functional component. State is a way of storing and managing data within a component. With `useState`, you can declare a state variable and a function to update that variable. Every time the state variable is updated, React will re-render the component and update the UI.

```js
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
```

`useEffect` is a hook used for side effects in React. Side effects are actions that happen outside of the normal flow of the component, such as fetching data, subscriptions, or manually manipulating the DOM. `useEffect` allows you to perform these side effects after the component has rendered.

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## class and interface

`class` create object with attribute and method. They facilitate code organization, encapsulation, and reusability through inheritance and polymorphism.

```tsx
class Car {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
  accelerate(speed: number) {
    console.log(`${this.brand} is accelerating at ${speed} km/h.`);
  }
}

const myCar = new Car("Toyota");
myCar.accelerate(100);
```

`inteface` Interfaces in TypeScript define contracts for objects, specifying the structure of their properties and methods without providing implementation details.

```ts
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log(`${this.name} barks.`);
  }
}

const myDog = new Dog("Buddy");
myDog.makeSound();
```

## useStore() and mobx

**`store`** is where all the state of the application is stored. It contains important data and provides methods to change and access this data

`MobX` is a state management library for JavaScript applications. It simplifies state management by using the observer pattern and automatically tracking state changes to update the user interface.

```tsx
import { makeAutoObservable } from "mobx";

// Define a store
class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this); // Automatically generate state management functions
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

// Create an object from the CounterStore class
const counter = new CounterStore();

// Perform operations on the state
counter.increment();
counter.decrement();
```

## Redux

Redux is a predictable state container for JavaScript apps. It helps in managing the state of your application in a predictable way, which is especially useful for larger applications with complex state management

![redux](https://media.geeksforgeeks.org/wp-content/uploads/20210706235837/reactreduxx.png)

### Store

- The Store holds the global state of the application.
- It allows access to the state via `getState()`.
- State can be updated using `dispatch(action)`.
- You can subscribe to changes using `subscribe(listener)`.

```typescript
import { createStore } from "redux";
import rootReducer from "./reducers"; // Your root reducer

const store = createStore(rootReducer);
```

### Actions

- Actions are plain JavaScript objects that represent what happened.
- They are dispatched to update the state.
- Actions typically have a `type` property that describes the action being performed.
- They can optionally carry additional data in the `payload`.

```typescript
const incrementCounter = () => ({
  type: "INCREMENT_COUNTER",
});

const decrementCounter = () => ({
  type: "DECREMENT_COUNTER",
});
```

### Reducers

- Reducers are pure functions that specify how the application's state changes in response to actions.
- They take the current state and an action, and return a new state.
- They should not mutate the state, but return a new state object.

```typescript
const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT_COUNTER":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default counterReducer;
```

## TypeScript Basics

### Variables and Data Types

```typescript
let num: number = 10;
let str: string = "Hello, TypeScript!";
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let obj: { name: string; age: number } = { name: "John", age: 30 };
let func: (x: number, y: number) => number = (x, y) => x + y;
```

### Functions and Arrow Functions

```typescript
function add(x: number, y: number): number {
  return x + y;
}

const multiply = (x: number, y: number): number => x * y;
```

### Interfaces and Types

```typescript
interface Person {
  name: string;
  age: number;
}

type Point = {
  x: number;
  y: number;
};
```

### Arrays and Tuples

```typescript
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["apple", 10];
```

### Classes and Inheritance

```typescript
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string
  ) {
    super(name);
  }

  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy", "Labrador");
dog.makeSound(); // Output: Woof!
```

### Advanced TypeScript Concepts

### Generics

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("Hello");
```

### Enums

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const move = (direction: Direction) => {
  switch (direction) {
    case Direction.Up:
      console.log("Moving Up");
      break;
    case Direction.Down:
      console.log("Moving Down");
      break;
    case Direction.Left:
      console.log("Moving Left");
      break;
    case Direction.Right:
      console.log("Moving Right");
      break;
    default:
      console.log("Unknown direction");
  }
};

move(Direction.Left);
```

### Type Assertions

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### Type Inference

```typescript
let num = 10; // TypeScript infers 'number' type
```

### Decorators

```typescript
function Log(target: any, key: string) {
  console.log(`${key} was called`);
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Output: add was called
```
