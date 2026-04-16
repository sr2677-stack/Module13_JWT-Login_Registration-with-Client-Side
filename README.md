# JWT Auth Project (Module 13)

This project implements JWT-based authentication with FastAPI, front-end registration/login pages, Playwright E2E tests, and a GitHub Actions CI/CD pipeline that runs tests and deploys to Docker Hub.

## Features

- `/register` route:
  - Accepts email + password (optional username).
  - Validates input with Pydantic.
  - Rejects duplicate emails.
  - Hashes password with bcrypt.
  - Stores user in DB.
  - Returns JWT token.
- `/login` route:
  - Verifies credentials.
  - Returns JWT on success.
  - Returns `401 Unauthorized` for invalid login.
- Front-end pages:
  - `frontend/register.html`
  - `frontend/login.html`
  - Client-side checks and JWT storage in `localStorage`.
- Playwright E2E tests:
  - Positive and negative flows for register/login.
- CI/CD:
  - Starts DB + API with Docker Compose.
  - Runs Playwright tests.
  - Pushes Docker image to Docker Hub if tests pass (on `main`).

## Project Structure

```text
jwt-auth-project/
+-- backend/
+-- frontend/
+-- tests/
+-- .github/workflows/ci.yml
+-- docker-compose.yml
+-- playwright.config.ts
+-- package.json
+-- README.md
```

## Local Run

### 1) Start backend directly (SQLite)

```bash
pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Open:
- http://127.0.0.1:8000/register.html
- http://127.0.0.1:8000/login.html

### 2) Start with Docker Compose (Postgres + API)

```bash
docker compose up --build
```

## Run E2E Tests

```bash
npm install
npx playwright install --with-deps chromium
npm run test:e2e
```

If API is already running in Docker on port 8000, run:

```bash
set PLAYWRIGHT_BASE_URL=http://127.0.0.1:8000
set CI_DOCKER=true
npm run test:e2e
```

## CI/CD Setup

Set these GitHub repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

Workflow file: `.github/workflows/ci.yml`

Pipeline behavior:
- On every push/PR: run Playwright tests.
- On push to `main` and passing tests: build + push Docker image.

## Docker Hub Repo

Add your Docker Hub repo link here:

- `https://hub.docker.com/r/<your-username>/jwt-auth-project`

## Submission Checklist

- GitHub repo link
- Docker Hub link
- Screenshots:
  - successful GitHub Actions run
  - passing Playwright tests
  - working login/register pages
- Reflection document (`REFLECTION.md`)
