# Security checklist reference

Use this as the detailed checklist for the main `security-audit` skill. The severity labels are a starting point. Context can move a finding up or down.

## Critical

| Issue | Detection hint | Bad to better |
|---|---|---|
| Secrets committed to git | Check tracked `.env*` files with `git ls-files`. Scan the tree and history for high entropy strings, `sk_live_`, `xoxb-`, `AKIA[0-9A-Z]{16}`, private keys, `ghp_`, `glpat-`, and `AIza[0-9A-Za-z_-]{35}`. | Live secret in `.env` to rotated key, `.env` removed from git, `.env.example` tracked instead. |
| Plaintext passwords or weak hashing | Grep password writes. Confirm `bcrypt`, `argon2`, `scrypt`, or `pbkdf2`. Flag `md5`, `sha1`, direct compares against `password`, and `plaintext_password`. | `md5(input)` to a real password KDF. |
| SQL built with user input | Look for query strings with interpolation or concatenation near `execute`, `query`, or `raw`. Distinguish static template strings from untrusted interpolation. | String concatenation to parameterized queries. |
| XSS sinks with user input | Check `innerHTML`, `dangerouslySetInnerHTML`, `v-html`, Mustache triple braces, `document.write`, `outerHTML`, Rails `raw` or `html_safe`, Django `safe`, and Jinja `safe`. | User HTML to text rendering or a vetted sanitizer. |
| Code execution on user data | Check `eval`, `new Function`, string `setTimeout`, `vm.runInNewContext`, interpolated `child_process.exec`, `pickle.loads`, `Marshal.load`, `unserialize`, and unsafe YAML load. | Dynamic execution to a parser or a removed feature. |
| Missing auth on admin or internal routes | Find `admin/`, `internal/`, and `/api/admin` routes. Check each handler has auth and role checks. | Open admin handler to `requireAdmin` or equivalent. |
| IDOR | Look for handlers that take a resource ID from params and query without scoping by current user, account, team, or tenant. | `Invoice.find(id)` to `current_user.invoices.find(id)`. |
| Broken JWT verification | Check `jwt.verify`, `jwt.decode`, `algorithms`, `alg: 'none'`, `verify: false`, and hardcoded weak secrets. | Decode-only auth to strict verify with one expected algorithm and a real secret or public key. |
| Public storage | In Terraform, CloudFormation, Pulumi, or cloud config, check bucket ACLs and policies for `PublicRead`, `*` principals, `allUsers`, and signed URLs with no expiry. | Public user uploads to private storage plus expiring signed URLs. |
| Debug mode in production | Check production env and deploy config for `DEBUG=True`, `app.debug = True`, local error pages, and full traces returned to users. | Framework debug pages to generic errors plus server logs. |
| Dangerous CORS | Check for `Access-Control-Allow-Origin: *` paired with credentials. | Wildcard origin to an explicit allowlist. |
| Unsafe file uploads | Find upload handlers. Check extension, MIME, size limits, storage path, and whether uploaded files are served from the app origin without `Content-Disposition: attachment`. | Unbounded uploads to size and MIME checks plus safer serving. |

## Serious

| Issue | Detection hint | Bad to better |
|---|---|---|
| Cookies missing flags | Check `Set-Cookie`, `res.cookie`, signed cookies, and session middleware. | Session cookie without flags to `HttpOnly`, `Secure`, and `SameSite=Lax` or stricter. |
| Missing CSRF protection | For stacks without default CSRF protection, check state changing POST, PUT, PATCH, and DELETE routes. | Plain form POST to CSRF middleware and token validation. |
| Missing security headers | Check HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options` or `frame-ancestors`. | No headers to a starter header set that matches the app. |
| HTTPS not enforced | Check HSTS, HTTP to HTTPS redirect, edge config, and app middleware. | HTTP allowed in production to HTTPS redirect plus HSTS. |
| Sensitive data in logs | Check logger calls, request logging middleware, Sentry or error reporting hooks, and audit logging. | Full passwords, tokens, card numbers, SSNs, or email bodies to central redaction. |
| Missing rate limits | Check login, signup, password reset, OTP, email verification, webhook endpoints, and public APIs. | Unthrottled login to IP and account based throttles with backoff. |
| Account enumeration | Compare login and reset responses for existing versus missing accounts. | "No account with that email" to a neutral reset message. |
| Weak password reset tokens | Check expiry, single use, randomness, and transport. | Predictable or reusable token to CSPRNG token with expiry and single use. |
| SSRF | Check server side HTTP clients that accept user supplied URLs. Block private IP ranges and metadata services unless explicitly needed. | Free form URL fetch to host allowlist and private IP blocking. |
| Path traversal | Check file reads and path joins that include user input. | `path.join(base, userInput)` to `path.resolve` plus a base directory prefix check. |
| Unsigned webhooks | Check external POST endpoints from Stripe, GitHub, Slack, and similar services. | Raw body accepted to signature verification with the provider header. |
| Regex denial of service | Look for nested quantifiers on user controlled strings, such as `(.*)*` or `(a+)+`. | Catastrophic regex to bounded or non-backtracking logic. |
| Default admin credentials | Check seeds, docs, fixtures, demo data, and setup flows. | Shipped `admin@example.com / password` to first-run credential setup. |

## Moderate

- TLS pinned to 1.0 or 1.1 in load balancer, server, or app clients.
- Overly permissive `Permissions-Policy` or old `Feature-Policy`.
- Missing Subresource Integrity on third party scripts.
- Auth tokens stored in `localStorage` when an `HttpOnly` cookie would work.
- `target="_blank"` without `rel="noopener noreferrer"`.
- Email sent over plain SMTP without STARTTLS.
- Outdated dependencies that do not rise to High or Critical severity.

## Promise checks

| Claim | What code backing looks like |
|---|---|
| "Passwords are encrypted" or "hashed with bcrypt" | Password writes use `bcrypt`, `argon2`, `scrypt`, or `pbkdf2`. No `md5`, `sha1`, plaintext compare, or reversible storage. |
| "All data is encrypted at rest" | DB level, volume level, or column level encryption is configured. For hosted databases, confirm provider encryption and document that evidence. |
| "Encrypted in transit" or "uses TLS" | HSTS, HTTP to HTTPS redirect, and no hardcoded `http://` for the app's own domain. |
| "End-to-end encrypted" | Keys are generated and held client side. The server cannot decrypt user content. |
| "2FA" or "MFA" | Real enrollment, verification, recovery, and enforcement paths exist. |
| "SSO", "SAML", or "SCIM" | SAML or OIDC code paths and identity provider config exist. |
| "Audit log" or "audit trail" | Sensitive events write to an audit log, such as login, permission changes, data export, and billing changes. |
| "We never sell your data" | Third party SDKs and processors that receive user data are listed so the claim can be judged. |
| "GDPR" or "CCPA" export and delete rights | Export and delete endpoints or jobs exist, and delete behavior matches the wording of the claim. |
| "SOC 2", "HIPAA", "ISO 27001", or "PCI DSS" | Code alone cannot prove certification. Look for obvious contradictions and missing support controls. |
| "Bank-level encryption" or "military-grade" | Treat as vague marketing. Check TLS and at-rest encryption evidence, then suggest clearer wording if needed. |
