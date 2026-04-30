# DevOps_Portfolio

This repository is a small demo portfolio / bug-tracker that includes a React + Vite frontend, serverless lambda handlers, and Terraform infrastructure to deploy an API Gateway + Lambdas and related resources.

Repository layout (frontend-focused)

```text
frontend/
├── src/
│   ├── api/
│   │   └── bugsApi.js        ← alla API-anrop
│   ├── context/
│   │   └── BugContext.jsx    ← global state
│   ├── hooks/
│   │   └── useBugs.js        ← custom hook för bug-logik
│   ├── pages/
│   │   └── Dashboard.jsx     ← huvudsidan
│   ├── components/
│   │   ├── BugForm.jsx
│   │   ├── BugForm.css
│   │   ├── BugCard.jsx
│   │   └── BugList.jsx
│   ├── utils/
│   │   └── helpers.js        ← hjälpfunktioner
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
└── vite.config.js
```

Quick start — frontend

1. Install dependencies

```bash
cd frontend
npm install
```

2. Configure environment

Create a local env file (recommended name: `.env.local`) in `frontend/` with the backend base URL used by the app:

```env
VITE_API_URL=http://localhost:3000
```

3. Start dev server

```bash
npm run dev
```

Build for production and preview

```bash
npm run build
npm run preview
```
You need to start local server also

```bash
python3 local_server.py
```

Notes about the frontend

- The frontend uses `import.meta.env.VITE_API_URL` (see `src/api/authApi.js` and `src/api/bugsApi.js`).
- Network requests use `credentials: 'include'`, so cookie-based authentication requires the backend to allow CORS with credentials and to set cookies appropriately.
- Routes: `/` (Landing), `/about`, `/login`, `/register`, `/dashboard` (protected).

Backend & infra notes

- Lambdas: `lambda/` contains the Python handlers used by the API.
- Terraform: `terraform/` includes infrastructure code to deploy API Gateway, DynamoDB, Cognito, ACM, CloudFront, S3, IAM, and Lambda resources. After `terraform apply`, update `VITE_API_URL` to point at the deployed API Gateway URL.

Development tips

- To test frontend against local lambda handlers you can run the minimal local server (`local_server.py`) and point `VITE_API_URL` to that server's URL.
- Make sure cookie SameSite and domain settings are compatible with the frontend origin when testing auth flows.

Where to look next

- Frontend entry: `frontend/src/main.jsx`
- App wiring: `frontend/src/App.jsx`
- API wrappers: `frontend/src/api/*.js`
- Lambda handlers: `lambda/*.py`
- Terraform: `terraform/`

If you want, I can:
- add a `.env.example` to `frontend/` with `VITE_API_URL`,
- add a short dev checklist that describes running the local server and wiring the frontend, or
- add a small script to run the Python local server and a note on how to test the full flow.