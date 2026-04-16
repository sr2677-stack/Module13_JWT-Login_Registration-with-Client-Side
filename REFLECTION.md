# Reflection (Module 13)

## What Went Well

- Implemented a clean separation between authentication logic, schema validation, and DB setup.
- Added both client-side and server-side validation, improving reliability.
- E2E tests covered success and failure scenarios for registration and login.
- CI pipeline automated test execution and Docker image deployment flow.

## Challenges

- Ensuring consistency between front-end error messages and API error responses.
- Handling two environments (local SQLite and CI Docker/Postgres) with one codebase.
- Making Playwright work both locally (self-started server) and in CI (pre-started Docker service).

## What I Learned

- How to structure JWT auth in FastAPI using password hashing and token generation.
- How to build resilient E2E tests for form workflows.
- How to combine Docker Compose and GitHub Actions for test-and-deploy pipelines.

## Next Improvements

- Add protected routes and token verification middleware/dependencies.
- Add refresh token support.
- Add stronger password policy and account lockout/rate limiting.
- Add full BREAD front-end features in Module 14.
