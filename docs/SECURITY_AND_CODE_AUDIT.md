# S.H.I.E.L.D. Security and Code Audit

## Route inventory

| Module | Route | Authentication | Authorization | Validation | Controller | Service | Test status |
|---|---|---|---|---|---|---|---|
| Health | `/api/health` | None | None | None | `app.js` | N/A | Passed via startup smoke checks |
| Auth | `/api/auth/register` | None | None | Strict body validation | `userAuth.controllers.js` | `mail.service.js` | Verified via validation tests and code review |
| Auth | `/api/auth/verify-otp` | None | None | Strict body validation | `userAuth.controllers.js` | `mail.service.js` | Verified by code review |
| Auth | `/api/auth/resend-otp` | None | None | Strict body validation | `userAuth.controllers.js` | `mail.service.js` | Verified by code review |
| Auth | `/api/auth/login` | None | None | Strict body validation | `userAuth.controllers.js` | N/A | Verified by code review |
| Auth | `/api/auth/me` | Required | Authenticated user only | None | `userAuth.controllers.js` | N/A | Verified by code review |
| Auth | `/api/auth/logout` | Required | Authenticated user only | None | `userAuth.controllers.js` | N/A | Verified by code review |
| Community | `/api/community/posts` | Required | Authenticated users only | Query + body validation | `community.controllers.js` | N/A | Not full DB integration test; request flow reviewed |
| Community | `/api/community/posts/:id/likes` | Required | Authenticated users only | ObjectId param validation | `community.controllers.js` | N/A | Code reviewed |
| Community | `/api/community/posts/:id/reports` | Required | Authenticated users only | Param + body validation | `community.controllers.js` | N/A | Code reviewed |
| Lost and Found | `/api/lost-found/` (GET) | Required | Authenticated users only | Query validation | `lostFound.controllers.js` | N/A | Code reviewed |
| Lost and Found | `/api/lost-found/` (POST) | Required | Authenticated users only | Body validation | `lostFound.controllers.js` | N/A | Code reviewed |
| Announcements | `/api/announcements/` | Required | Authenticated users only | Query validation | `announcement.controllers.js` | N/A | Code reviewed |
| Announcements | `/api/admin/announcements` | Required | Admin only | Query + body validation | `admin.controllers.js` | `announcement.controllers.js` | Code reviewed |
| Announcements | `/api/admin/announcements/:id` | Required | Admin only | Param + body validation | `admin.controllers.js` | `announcement.controllers.js` | Code reviewed |
| Admin | `/api/admin/summary` | Required | Admin only | None | `user.controllers.js` | N/A | Code reviewed |
| Admin | `/api/admin/reports` | Required | Admin only | Query validation | `admin.controllers.js` | N/A | Code reviewed |
| Admin | `/api/admin/reports/:id` | Required | Admin only | Param + body validation | `admin.controllers.js` | N/A | Code reviewed |
| Admin | `/api/admin/users` | Required | Admin only | Query validation | `user.controllers.js` | N/A | Code reviewed |
| Admin | `/api/admin/users/:id` | Required | Admin only | Param + body validation | `user.controllers.js` | N/A | Code reviewed |
| Dashboard | `/api/dashboard/` | Required | Authenticated users only | None | `user.controllers.js` | N/A | Code reviewed |
| Campus | `/api/campus/locations/` | Required | Authenticated users only | Query validation | `location.controllers.js` | N/A | Code reviewed |
| Assistant | `/api/assistant/chat` | Required | Authenticated users only | Message and history validation | `assistant.controller.js` | `assistant.service.js` | Code reviewed; external API configuration remains environment-dependent |
| Users | `/api/users/me` | Required | Authenticated users only | None | `user.controllers.js` | N/A | Code reviewed |
| Users | `/api/users/me` (PATCH) | Required | Authenticated users only | Body validation | `user.controllers.js` | N/A | Code reviewed |

## Findings and fixes

### Security findings fixed

- JWT authentication is enforced server-side using signed tokens and server-side revocation checks.
- Password hashing is performed with bcrypt before storage; plaintext passwords are not retained.
- Registration OTPs are created with cryptographically secure randomness and stored as hashes, not plaintext values.
- Login attempts and signup flows are rate-limited to reduce brute force abuse.
- Role checks are enforced by backend middleware instead of relying on frontend visibility.
- Invalid or expired authentication tokens are rejected with explicit API errors.
- Unknown request fields are rejected by validation middleware to reduce mass-assignment risk.
- API responses avoid returning sensitive auth material, password hashes, or debug leakage.

### Bugs fixed and hardening changes

- Added robust boolean coercion to the shared validation middleware so query parameters such as `?includeArchived=true` are normalized consistently before downstream checks.
- Kept the validation layer strict and deterministic: malformed values and unknown fields still fail with a 400 response and a structured error detail array.
- Preserved the existing auth flow while ensuring cookie and bearer token auth both continue to work with the correct security metadata.
- Kept the OpenAI integration in the Node backend as the intended architecture; the Python AIML service is not used for route handling or assistant requests.

### Remaining limitations

- Real SMTP delivery and OpenAI access still depend on valid environment configuration.
- Database-backed behavior requires a running MongoDB instance and the expected environment variables.
- Production deployments should continue to enforce HTTPS and a locked-down CORS origin list.

## Verification performed

The following checks were executed during the audit:

- `cd server; npm test -- --test-reporter=spec`
- `cd client; npm install`
- `cd client; npm run build`

These checks confirmed the validation middleware remains stable and the client production build succeeds after dependency installation.
