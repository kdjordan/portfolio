# Receptionist Stage 1 sqlite and auth spine

Stage 1 keeps all new functionality behind `/admin` and `/api/admin/*`. Public marketing routes remain unchanged.

## Persistent data

The Console uses sqlite through a narrow repository layer in `server/utils/receptionist/db.ts`. The database path is runtime-configurable with `RECEPTIONIST_DB_PATH`.

Production should mount the Coolify persistent volume at `/app/data` and set:

```bash
RECEPTIONIST_DB_PATH=/app/data/receptionist.sqlite
```

The application checks the database parent directory before opening sqlite. If the directory is missing, not a directory, or not writable, startup/request handling fails with a clear error. In local development only, the fallback `.data/receptionist.sqlite` directory is created automatically.

## Authentication

The Console is single-operator. It uses:

- `RECEPTIONIST_ADMIN_USERNAME`
- `RECEPTIONIST_ADMIN_PASSWORD_HASH`
- `RECEPTIONIST_SESSION_SECRET`

Password verification uses `argon2`. Session state is a signed, httpOnly, sameSite `lax` cookie with an eight-hour expiry. The cookie payload contains only username, expiry, and nonce; integrity is protected with HMAC-SHA256 using `RECEPTIONIST_SESSION_SECRET`.

`server/middleware/admin-auth.ts` guards `/admin` and `/api/admin/*`. The login endpoint is the only unauthenticated admin API.

## Current schema

The migration bootstrap creates:

- `schema_migrations`
- `businesses`
- `leads`

No Places sourcing, scoring, pipeline board, Vanity pages, or outreach code exists in this stage.
