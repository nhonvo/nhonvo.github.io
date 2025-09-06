---
title: "RESTful API Design Principles"
description: "Discuss principles like statelessness, resource-based URLs, and proper use of HTTP verbs."
pubDate: "Sep 06 2025"
published: true
tags: ["Software Design & Architecture", "ASP.NET Core"]
---

### Mind Map Summary

- **REST (REpresentational State Transfer)**: An architectural style for designing networked applications, not a strict protocol.
  - **Core Idea**: Treat everything as a **Resource**.
  - **Key Constraints**:
    - **Client-Server**: Separate the UI (client) from the data storage (server).
    - **Stateless**: Each request from the client must contain all information needed to complete the request. The server holds no client session state.
    - **Uniform Interface**: The cornerstone of REST. This is what makes it work.
      - **Identify resources via URI**: e.g., `/api/posts/123`.
      - **Manipulate resources via representations**: The client sends a representation (e.g., JSON) of the resource's desired state.
      - **Use HTTP Verbs as Actions**: Use `GET`, `POST`, `PUT`, `DELETE` to operate on the resource.
      - **HATEOAS (Hypermedia as the Engine of Application State)**: Responses should include links to other possible actions (e.g., a `post` object could contain a link to get its `comments`).
- **Practical Design Principles**
  - **URIs should use nouns, not verbs**: 
    - *Good*: `/posts/123`
    - *Bad*: `/getPostById?id=123`
  - **Use Plural Nouns for Collections**: `/posts`, not `/post`.
  - **Use HTTP Verbs Correctly**:
    - `GET`: Retrieve data (safe and idempotent).
    - `POST`: Create a new resource (not idempotent).
    - `PUT`: Replace a resource completely (idempotent).
    - `PATCH`: Partially update a resource.
    - `DELETE`: Remove a resource (idempotent).
  - **Use HTTP Status Codes Semantically**:
    - `200 OK`: General success.
    - `201 Created`: A new resource was successfully created.
    - `204 No Content`: Success, but there is nothing to return (e.g., after a `DELETE`).
    - `400 Bad Request`: The client sent invalid data.
    - `401 Unauthorized`: The client is not authenticated.
    - `403 Forbidden`: The client is authenticated, but not authorized to perform the action.
    - `404 Not Found`: The requested resource does not exist.

### Core Concepts

#### 1. Resources
In REST, the focus is on the *things* or *nouns* in your system, which are called resources. A resource could be a product, a user, an order, or a blog post. Each resource should have a unique identifier, which is its Uniform Resource Identifier (URI). For example, `/api/users/123` is the unique URI for the user with an ID of 123.

#### 2. Statelessness
This is a critical constraint. The server must not store any information about the client's session between requests. Every request from the client must be self-contained and include all the necessary information (e.g., authentication tokens, identifiers) for the server to process it. This makes the API highly scalable, as any server instance can handle any client request without needing shared session state.

#### 3. Uniform Interface
This is what makes REST so powerful and consistent. It's a set of rules that ensures the API is predictable.
- **Use HTTP Verbs for Actions**: Instead of creating URIs like `/createUser` or `/deleteProduct`, you use the built-in HTTP methods to define the action you want to perform on a resource URI.
  - `POST /users` -> Create a new user.
  - `DELETE /products/45` -> Delete the product with ID 45.
- **Idempotency**: An operation is idempotent if making the same request multiple times produces the same result as making it once. `GET`, `PUT`, and `DELETE` are idempotent. `PUT /products/123` with the same data twice is the same as doing it once. `DELETE /products/123` twice is the same as doing it once. `POST` is *not* idempotent; calling `POST /products` twice will create two new products.

### Practice Exercise

Design the REST API endpoints for a blog post resource. Show the URLs and HTTP verbs for: 1) Getting all posts, 2) Getting a single post, 3) Creating a new post, 4) Updating a post, 5) Deleting a post, and 6) Getting all comments for a post. Justify your choices.

### Answer

Here is a standard, RESTful design for the blog post resource:

1.  **Get all posts**
    -   **Endpoint**: `GET /posts`
    -   **Justification**: `GET` is the correct verb for retrieving data. `/posts` uses a plural noun to represent the collection of all post resources.

2.  **Get a single post**
    -   **Endpoint**: `GET /posts/{postId}`
    -   **Justification**: This follows the pattern of `/{collection}/{resourceId}`. It uniquely identifies a single post resource.

3.  **Create a new post**
    -   **Endpoint**: `POST /posts`
    -   **Justification**: `POST` is the standard verb for creating a new resource. The request body would contain the data for the new post (e.g., title, content). A successful response should be a `201 Created` status code with a `Location` header pointing to the URI of the newly created post (e.g., `Location: /posts/124`).

4.  **Update a post**
    -   **Endpoint**: `PUT /posts/{postId}` or `PATCH /posts/{postId}`
    -   **Justification**:
        -   `PUT` is used to **completely replace** the resource. The request body must contain the entire post object. If a field is omitted, it would be set to null. This is idempotent.
        -   `PATCH` is used to **partially update** a resource. The request body would only contain the fields that need to be changed (e.g., just the `title`). This is the more flexible and often preferred method for updates.

5.  **Delete a post**
    -   **Endpoint**: `DELETE /posts/{postId}`
    -   **Justification**: `DELETE` is the standard verb for removing a resource. A successful deletion should return a `204 No Content` status code.

6.  **Get all comments for a post**
    -   **Endpoint**: `GET /posts/{postId}/comments`
    -   **Justification**: This is a nested resource. The URI clearly expresses the relationship: we are getting the `comments` collection that belongs to the specific post identified by `{postId}`. This is the standard RESTful way to represent parent-child relationships.