# Full-Stack-Todo-App

# ✅ TaskFlow — Full-Stack Task Management App

TaskFlow is a minimalist full-stack **task management app** built to demonstrate a clean architecture between an **async Django backend (via ADRF)** and a **modern React + Vite + TypeScript frontend** using **Redux Toolkit Query** for data fetching and caching.

It’s a small productivity app that demonstrates:

-  **Backend:** A Django + ADRF REST API (async) that stores and serves “tasks.”
-  **Frontend:** A React (Vite + TypeScript) app that talks to that API via Redux Toolkit Query.
-  Full CRUD integration between both layers.

So while it behaves like a simple to-do or task manager, it’s actually a **proof-of-concept full-stack project** that shows:

-  You understand API creation with Django/DRF/ADRF.  
-  You can consume REST APIs from a modern frontend.  
-  You can use Redux Toolkit & RTK Query for state management.  
-  You can integrate CORS, environment configs, async APIs, and CRUD operations end-to-end.

---

## Overview

TaskFlow demonstrates how a **modern frontend and backend** can communicate efficiently using REST APIs.  
The backend exposes a `/api/tasks/` endpoint for CRUD operations, and the frontend uses **Redux Toolkit Query** to handle data fetching and caching automatically.

The result is a lightweight but production-style setup for **learning, interviews, or portfolio display**.

---

##  Tech Stack

### **Frontend**
-  [Vite](https://vitejs.dev/) — Fast modern build tool  
-  [React 18](https://react.dev/) — Component-based UI  
-  [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/) — State management and API integration  
-  [TypeScript](https://www.typescriptlang.org/) — Type safety  
-  [TailwindCSS](https://tailwindcss.com/) — Simple styling (optional)

### **Backend**
-  [Django 5+](https://www.djangoproject.com/) — Python web framework  
-  [Django REST Framework (ADRF)](https://www.django-rest-framework.org/) — Async API support  
-  SQLite 3 — Local lightweight database  

---

## Architecture
frontend/ → React + Redux Toolkit (Vite + TypeScript)
backend/ → Django + ADRF API


**Flow:**
1. The Django backend serves a REST API at `http://127.0.0.1:8000/api/tasks/`
2. The React frontend fetches tasks using **RTK Query**
3. Redux Toolkit handles caching, loading states, and mutations
4. Users can add, view, and delete tasks — fully synced with the backend

---

##  Backend Setup (Django + ADRF)

```bash
# 1. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

# 2. Install dependencies
pip install django djangorestframework

# 3. Create Django project and app
django-admin startproject backend
cd backend
python manage.py startapp todos

# 4. Add 'rest_framework' and 'todos' to INSTALLED_APPS in backend/settings.py

# 5. Run migrations
python manage.py migrate

# 6. Run the development server
python manage.py runserver

``bash

**API Base URL:**  
`http://127.0.0.1:8000/api/tasks/`

**Example `Todo` object:**
```json
{
  "id": 1,
  "title": "Complete full-stack project",
  "completed": false
}

⚛️ Frontend Setup (Vite + Redux Toolkit + TypeScript)
# 1. Create a new Vite + React + TypeScript app
npm create vite@latest frontend -- --template react-ts
cd frontend

# 2. Install dependencies
npm install @reduxjs/toolkit react-redux axios

# 3. Start the development server
npm run dev


Frontend runs on:
http://localhost:5173

🔌 Connecting Frontend and Backend

Inside your Redux slice or RTK Query service:
// example apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => 'tasks/',
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: 'tasks/',
        method: 'POST',
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation } = api

This setup allows automatic caching, re-fetching, and optimistic updates — no manual state management required.

🧱 Folder Structure
taskflow/
├── backend/
│   ├── backend/
│   ├── todos/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── app/store.ts
    │   ├── features/tasks/apiSlice.ts
    │   ├── components/TaskList.tsx
    │   └── main.tsx
    ├── index.html
    └── package.json


🧠 How It Works (Simplified)

User opens the React frontend

The app requests data from the Django API (GET /api/tasks/)

Tasks are stored in Redux Toolkit state via RTK Query

When a user adds a new task:

The frontend sends a POST request

The backend saves it to the database

RTK Query automatically updates the cache

The page updates instantly without manual reload

💡 Example Flow

Run Django server
python manage.py runserver

Run Vite frontend
npm run dev


Open the app at
👉 http://localhost:5173

Add tasks, delete them, and see everything update live!

🧩 Example API Endpoints
| Method   | Endpoint          | Description     |
| -------- | ----------------- | --------------- |
| `GET`    | `/api/tasks/`     | Fetch all tasks |
| `POST`   | `/api/tasks/`     | Add a new task  |
| `DELETE` | `/api/tasks/:id/` | Delete a task   |


🧑‍💻 Author

Mairo Gospel
Data Engineer / DevOps Engineer
📧 [your-email@example.com
]
🌍 LinkedIn
 • GitHub


 🏁 Summary

TaskFlow is a proof-of-concept app demonstrating full-stack development skills — showing your ability to:

Build and expose APIs using Django & ADRF

Consume APIs using React + Redux Toolkit Query

Manage state and CRUD operations cleanly

Integrate async operations and full-stack communication

A clean, simple, yet complete example of frontend-backend synergy.
