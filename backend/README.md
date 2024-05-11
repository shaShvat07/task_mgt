
# TaskMgt - Backend

## Project Structure
The project is structured following MVC architecture pattern

```bash

  src
    ├───Components
    │   ├───config
    │   ├───controllers
    │   ├───middleware
    │   ├───routes
    │   ├───services
    │      
    └───index.js
```
## Setup and Installation

Setup
```bash
Clone the Repository by running this command 
git clone https://github.com/shaShvat07/task_mgt.git
cd backend 
```

Installating Dependencies
```bash
npm i
```
Create a .env file
```bash
PORT=[any 4 digit number]
SECRET_KEY=[Any string]
POSTGRES_URL=[Provided by Vercel]
```
Run the Application
```bash
npm run dev
```
Link to the deployed backend 
```bash
https://task-mgt-pro.vercel.app
```
On local
```bash
http://localhost:[PORT]
``` 
## Backend API Endpoints

### Authentication
- `POST https://task-mgt-three.vercel.app/register`: Register a new user.
- `POST https://task-mgt-three.vercel.app/login`: Login with existing credentials.
- `GET https://task-mgt-three.vercel.app/auth`: Verify user authentication.

### Lists
- `POST https://task-mgt-three.vercel.app/lists`: Create a new list.
- `GET https://task-mgt-three.vercel.app/lists`: Get all lists belonging to the authenticated user.
- `GET https://task-mgt-three.vercel.app/lists/:listId`: Get a specific list by its ID.
- `PUT https://task-mgt-three.vercel.app/lists/:listId`: Update a specific list by its ID.
- `DELETE https://task-mgt-three.vercel.app/lists/:listId`: Delete a specific list by its ID.

### Tasks
- `GET https://task-mgt-three.vercel.app/mytask/tasks`: Get all tasks belonging to the authenticated user.
- `POST https://task-mgt-three.vercel.app/search`: Search tasks based on query.
- `POST https://task-mgt-three.vercel.app/lists/:listId/tasks`: Create a new task in a specific list.
- `GET https://task-mgt-three.vercel.app/lists/:listId/tasks`: Get all tasks within a specific list.
- `GET https://task-mgt-three.vercel.app/lists/:listId/tasks/:taskId`: Get a specific task within a specific list.
- `PATCH https://task-mgt-three.vercel.app/lists/:listId/tasks/:taskId`: Update a specific task within a specific list.
- `DELETE https://task-mgt-three.vercel.app/lists/:listId/tasks/:taskId`: Delete a specific task within a specific list.

### User
- `GET https://task-mgt-three.vercel.app/user`: Get user details by user ID.

## Features

- ```Authentication:``` Implemented secure user authentication using JWT Token for enhanced security.
- ```Authorization Control:``` Utilized middleware functions to enforce authorization control, ensuring that only authenticated users can access certain endpoints or perform specific actions.
- ```Input Validation:``` Implemented robust input validation functions to check for incorrect input types and values, ensuring data integrity.
- ```Notifications:``` Integrated notification feature using react-toast for timely reminders and updates.
- ```Task Management:``` Users can perform CRUD operations on tasks, enabling them to create, read, update, and delete tasks effortlessly.
- ```List Management:``` Users can organize tasks by creating lists, enhancing task management capabilities.
- ```Deployment:``` The backend API is deployed on Vercel, ensuring high availability and scalability.
