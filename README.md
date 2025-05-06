[Website Link](http://ec2-18-222-134-82.us-east-2.compute.amazonaws.com/)

# Overview
I implemented a TODO application which serves as an interface for interacting with the Hapi.js server CRUD APIs.

# Setup Instructions
1. Clone this repository or unzip the submitted folder.
2. Install the necessary dependencies: `npm i`
3. Change the `backendBaseURL` in `src/main.tsx` to match your deployment environment.
4. Change the MongoDB connection URI, port, and hostname in `backend/server.js` to match your deployment environment.

# Website Routes

## /
The home page.

## /posts/:title
A page for viewing a single post by its title. Renders the PostDetail component.

## /posts/create/
A page for creating new posts.

## /posts/edit/:taskTitle?
A page for editing posts. When the search parameter is undefined, the server attempts to edit a task with the title given by the user. If the search parameter is defined, the server updates the post with title taskTitle with the new data given by the user.

## /posts/list
A page for listing all currently available posts. Renders the PostList component, which is composed of PostDetail components.

# Backend API Routes
Documentation is available via [Postman](https://documenter.getpostman.com/view/44703722/2sB2j6Ar1T).

# Components

## PostDetail
File Path: `/src/posts/PostDetail`
Accepts an optional task property, which is post of type Task.
When the task property is received, this component renders information about the given task.
Otherwise, the component fetches a task from the server given by the route parameters.
Clicking on the task title allows the user to navigate to `/posts/:title` to view that post only.
Clicking on the edit link allows the user to edit the post.

## Postform
File Path: `/src/posts/PostForm`
Renders a form which allows the user to either edit a task or create a new one.
When a path parameter is present, the form edits a task on the server.
If no path parameter is present, the form creates a new task on the server.
Once the form is submitted, the user is redirected back to `/`.

## PostList
File Path: `/src/posts/PostList`
Renders a list of all available posts on the server.
This component first fetches all posts form the server.
Once the tasks are fetched, they are collected into an array of PostDetail components and displayed in an unordered list.
