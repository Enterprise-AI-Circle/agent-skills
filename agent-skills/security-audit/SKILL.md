---
name: security-audit
version: "1.2"
description: Use when the user wants a codebase security audit, security review, hardening check, "safe to ship" review, or to verify privacy/security/trust/legal/product claims against code. Also use for secrets, auth, admin routes, headers, cookies, CORS, CSRF, rate limits, dependency CVEs, encryption, 2FA/MFA, SSO, audit logs, or data export/delete.
---

# Security audit

Audit the security basics that would be painful to miss, then check whether the product's privacy and security promises are true in code. Keep the tone plain. The work should feel like a careful engineer reviewed the repo, not like a scanner produced a wall of warnings.

The bar depends on the project. A small side project does not need the same controls as a B2B SaaS that stores customer data. It still should not commit `.env`, log passwords, or render user input with `dangerouslySetInnerHTML`.

Functionality matters. Do not suggest a fix that can break a working flow without saying so. Prefer additive fixes when they are enough: add a header, set a cookie flag, redact a log field. Be careful with changes that can lock users out, invalidate sessions, tighten CORS, force 2FA, or touch production infrastructure.

## Scope

- If `$ARGUMENTS` is a path, scan only that file or directory.
- Otherwise scan the repo, excluding generated and dependency folders: `node_modules`, `.git`, `dist`, `build`, `out`, `.next`, `.nuxt`, `vendor`, `target`, `__pycache__`, `.venv`, lock files, minified assets, and obvious build output from `.gitignore`.
- Announce the scope before scanning so the user can redirect you.
- Detect the stack first. Check manifest files such as `package.json`, `Gemfile`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `composer.json`, `pubspec.yaml`, and `mix.exs`.

## Workflow

Progress:

- [ ] Confirm scope and detected stack.
- [ ] Load [references/security-checklist.md](security-checklist.md) before the code and config audit.
- [ ] Run the dependency scanner that matches the stack, but only if it is already available.
- [ ] Find privacy and security claims in legal pages, marketing copy, and product UI.
- [ ] Verify each concrete claim against code or configuration evidence.
- [ ] Load [references/report-template.md](report-template.md) only when writing the report or checking report shape.
- [ ] Validate the report before sending it.
- [ ] Ask the user what to fix. Do not apply changes during the audit unless the user explicitly asks.

## Code and config audit

Use `rg`, `find`, and `git log` first because they work almost everywhere. A grep hit is not a finding by itself. Read the file, find the caller, and make sure untrusted input or production config is actually involved.

Focus on:

- Critical issues: committed secrets, weak password handling, SQL injection, XSS sinks, code execution on user data, missing admin auth, IDOR, broken JWT verification, public storage, production debug mode, dangerous CORS, and unsafe uploads.
- Serious issues: cookie flags, CSRF, security headers, HTTPS enforcement, sensitive logs, missing rate limits, account enumeration, weak reset tokens, SSRF, path traversal, unsigned webhooks, regex denial of service, and default admin credentials.
- Moderate issues: old TLS versions, loose permissions policy, missing SRI on third party scripts, localStorage auth tokens, unsafe `_blank` links, plain SMTP, and outdated dependencies.

See the reference checklist for detection hints and examples.

## Dependency scanning

Run the scanner for the detected stack only if the tool is already installed. Do not install global tools or mutate the user's environment.

| Stack signal | Command | Fallback |
|---|---|---|
| `package.json` with lockfile | `npm audit --json`, `pnpm audit --json`, or `yarn npm audit --json` | Report if the registry or private auth blocks the scan |
| `Gemfile.lock` | `bundle exec bundler-audit check --format json` | `bundle outdated` |
| `requirements.txt`, `poetry.lock`, or `Pipfile.lock` | `pip-audit --format=json` | `safety check --json` |
| `go.mod` | `govulncheck ./...` | Report that `govulncheck` is missing |
| `Cargo.lock` | `cargo audit --json` | Report that `cargo-audit` is missing |
| `composer.lock` | `composer audit --format=json` | Report the failure |

Parse JSON when a scanner provides it. Put High and Critical CVEs in the main report. Put Medium and Low findings in a collapsible block. Use the upgrade path from the scanner instead of inventing versions.

## Promise audit

This is what makes the audit useful. Claims create risk when the product says one thing and the code does another.

Look for claim sources in this order:

1. In-repo legal, trust, and marketing pages: `/privacy`, `/privacy-policy`, `/terms`, `/security`, `/trust`, `/dpa`, `/gdpr`, `/ccpa`, and `/legal/*`.
2. Product copy in templates, components, docs, emails, onboarding, billing pages, and settings screens.
3. External marketing or trust pages, but only with user approval before fetching. Show the URLs first, then ask.

Search for concrete claim language such as:

```text
bcrypt, argon2, scrypt, pbkdf2, AES-256, AES-GCM, TLS, SSL, end-to-end encrypted, encrypted at rest, encrypted in transit, bank-level security, zero-knowledge, we never sell, your data is yours, 2FA, MFA, SSO, SAML, audit log, delete your data, export your data, right to be forgotten, SOC 2, HIPAA, GDPR, CCPA, ISO 27001, PCI DSS
```

If no promise sources turn up, say that plainly and skip this section. Do not invent claims.

For each claim, ask what code would need to exist for it to be true. Examples:

- "Passwords are encrypted" usually means password writes go through `bcrypt`, `argon2`, `scrypt`, or `pbkdf2`. Plain hashes such as `md5` and `sha1` do not count.
- "Encrypted in transit" needs HTTPS enforcement, HSTS, and no hardcoded `http://` links for the app's own domain.
- "End-to-end encrypted" means the server cannot decrypt user content. TLS alone does not satisfy this claim.
- "2FA available" needs a real setup flow, recovery path, and enforcement path. A pricing page badge is not enough.
- "We never sell your data" requires a list of third party SDKs or processors that receive user data. Do not accuse. Show the data paths and let the user judge.
- "SOC 2", "HIPAA", "ISO 27001", and "PCI DSS" are not proven by code alone. Note them as out of scope for a code audit, then flag obvious contradictions or missing supporting controls.

Severity for promise mismatches:

- Critical: a concrete claim has no code backing.
- Serious: a concrete claim has partial or weak backing.
- Moderate: the claim is mostly true but vague, brittle, or poorly documented.

## Reporting rules

- Lead with scope, detected stack, finding counts, and the top risk.
- Sort findings by severity: Critical, Serious, Moderate, then dependency CVEs and promise audit.
- Every finding needs evidence, why it matters, a fix, and a `Breakage risk:` line.
- Keep duplicate instances together as one finding with multiple locations.
- If the report is long, lead with the summary and Critical section, then continue with the rest. Do not silently truncate.
- Do not moralize. The finding is the message.
- Do not refactor while fixing security issues. Fix the issue and stop.

## Validation pass

Before sending the report, check it once against these rules:

- Each finding has concrete evidence, preferably `file:line`.
- Each severity is justified by the actual risk, not by how scary the pattern name sounds.
- Each proposed fix says whether it can break users, sessions, auth, deploys, data, or public APIs.
- Each promise mismatch quotes the claim source and names what code evidence is missing.
- Dependency findings come from scanner output, not guessed package versions.
- Anything based only on a search hit is removed or rechecked in context.

If a finding fails this pass, fix the report or drop the finding.

## Common mistakes

- Do not read every reference file up front. Load the checklist for auditing, and load the report template when writing the report.
- Do not report a framework default as missing until you check whether the framework already provides it.
- Do not turn a dependency warning into an upgrade plan unless the scanner gives a patched version or advisory.
- Do not fetch external privacy, terms, security, or trust pages without user approval.
- Do not soften a broken security promise just because the code itself is otherwise clean.

## Handoff

After the report, ask one clear question about what to fix. Use the host's native confirmation or approval flow when one exists. Otherwise ask:

> Want me to apply any of these? Reply with the finding numbers, `all critical`, `all`, or `no`.

Safe fixes can usually be applied once the user asks: security headers, cookie flags, `rel="noopener noreferrer"`, `.gitignore` additions for `.env*`, mechanical parameterized SQL changes with test coverage, and webhook signature checks when the upstream signature format is already documented.

Do not auto-apply changes that need human coordination: secret rotation, history rewrites, database migrations, new 2FA or export flows, production infrastructure changes, real CSP rollouts, CORS tightening, TLS enforcement, or session handling changes.

After applying fixes, summarize what changed, which files were touched, and what still needs action outside the repo.

## Judgment rules

- A clean audit with no critical findings is a valid result.
- Match the bar of the project. Do not demand enterprise controls from a toy app.
- Do not treat a search hit as proof. Read the surrounding code before flagging.
- Name the actual attack, data leak, or broken promise. "Consider improving validation" is not a finding.
- If a fix could break a working flow, say exactly how.
