# DevOps Portfolio — Frontend

This is the React + Vite frontend for the DevOps Portfolio bug-tracker demo.

It is a single-page app built with React 19, Vite and React Router. The app uses a small context layer for authentication (`AuthContext`) and bug state (`BugContext`) and talks to a backend API via a base URL provided through Vite environment variables.

## What you'll find here

- Pages / routes: `/` (Landing), `/about`, `/login`, `/register`, `/dashboard` (protected).
- Components: `Navbar`, `BugList`, `BugCard`, `BugForm`, `ProtectedRoute`.
- API wrappers: `src/api/authApi.js` and `src/api/bugsApi.js` (they read `import.meta.env.VITE_API_URL`).

## Quick start

Prerequisites: Node.js and a package manager (npm / pnpm / yarn).
When you are done with cloneing the repository, you can start with installing dependencies.

1. Install dependencies

```bash
npm install
```

2. Add environment variables

Create a file named `.env.local` (or use your preferred env mechanism) at the project root and set the backend URL used by the frontend:

```env
VITE_API_URL=http://localhost:3000
```

The frontend expects the API to support cookie-based auth (requests use `credentials: 'include'`). When running against a deployed API Gateway / backend, use the full HTTPS URL.

3. Run the dev server

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run preview   # serves the built site locally
```

Lint the project

```bash
npm run lint
```

## Important notes about the API

- The frontend calls endpoints like `/auth/*` and `/bugs` on the base URL defined by `VITE_API_URL` (see `src/api/*.js`).
- Cross-origin cookie auth requires the backend to enable CORS with credentials and set cookies with the appropriate SameSite/domain attributes.
- This repository includes a serverless backend under `lambda/` and Terraform configs under `terraform/` — after deploying the API (for example via Terraform), update `VITE_API_URL` to point to the API Gateway URL.

## Project structure (key folders)

- `src/pages` — route components (Landing, Login, Register, Dashboard, About).
- `src/components` — reusable UI pieces (Navbar, BugList, BugCard, BugForm, ProtectedRoute).
- `src/context` — `AuthContext` and `BugContext` providers.
- `src/api` — small fetch wrappers used by the app.
- `src/hooks` — custom hooks (e.g., `useAuth`, `useBugs`).

## Routes summary

- `/` — Landing page
- `/about` — About page
- `/login` — Login form
- `/register` — Register form (also includes email confirmation flow)
- `/dashboard` — Protected route that lists bugs and allows creating/updating them

## Troubleshooting

- If the app can't reach the API, check `VITE_API_URL` and the browser console/network tab.
- If authentication seems to fail, ensure the backend supports cross-origin cookies and that you open the site from the correct origin.

## Where to look next

- Frontend entry: `src/main.jsx`
- Routes and app wiring: `src/App.jsx`
- API wrappers: `src/api/authApi.js` & `src/api/bugsApi.js`
- Backend & infra: `lambda/` and `terraform/`
