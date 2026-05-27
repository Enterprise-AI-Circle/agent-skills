# Report template

Use this shape for the final audit report. Keep it plain markdown.

```markdown
# Security audit

**Scope:** `<path or "whole repo">`
**Stack detected:** `<stack summary>`
**Found:** `<N>` findings: `<C>` critical, `<S>` serious, `<M>` moderate, `<D>` dependency CVEs
**Top risk:** `<one sentence about the worst confirmed issue>`

## Critical (`<N>`)

### 1. `<finding title>`

- **Why it matters:** `<actual attack, data leak, or broken promise>`
- **Evidence:** `<file:line and short explanation>`
- **Fix:** `<specific fix or next step>`
- **Breakage risk:** `<none, low, or specific risk>`

## Serious (`<N>`)

### 1. `<finding title>`

- **Why it matters:** `<actual risk>`
- **Evidence:** `<file:line and short explanation>`
- **Fix:** `<specific fix or next step>`
- **Breakage risk:** `<none, low, or specific risk>`

## Moderate (`<N>`)

### 1. `<finding title>`

- **Why it matters:** `<actual risk>`
- **Evidence:** `<file:line and short explanation>`
- **Fix:** `<specific fix or next step>`
- **Breakage risk:** `<none, low, or specific risk>`

## Dependency CVEs

### High and Critical (`<N>`)

| Package | Installed | Patched | CVE | Advisory |
|---|---|---|---|---|
| `<package>` | `<version>` | `<version>` | `<CVE>` | `<url>` |

<details>
<summary>Medium and Low (`<N>`) findings</summary>

| Package | Installed | Patched | CVE | Advisory |
|---|---|---|---|---|
| `<package>` | `<version>` | `<version>` | `<CVE>` | `<url>` |

</details>

## Promise audit

### Claims found

- `<source>`: "`<claim>`"

### Mismatches

- **Critical:** "`<claim>`" has no code backing. `<evidence and fix>`
- **Serious:** "`<claim>`" has partial or weak backing. `<evidence and fix>`
- **Moderate:** "`<claim>`" is true but vague or under-documented. `<evidence and fix>`

## Handoff

Want me to apply any of these? Reply with the finding numbers, `all critical`, `all`, or `no`.
```

## Example findings

```markdown
### 1. `.env` is tracked with a live Stripe secret

- **Why it matters:** Anyone with repo read access can use the live Stripe secret. In a public repo or contractor offboarding, assume the key is compromised.
- **Evidence:** `.env:14` contains `STRIPE_SECRET_KEY=sk_live_...`; `git ls-files .env` shows the file is tracked.
- **Fix:** Rotate the key in Stripe, remove `.env` from git, add `.env*` to `.gitignore`, and keep `.env.example` as the tracked template.
- **Breakage risk:** Key rotation needs coordination with deploy secrets. A history rewrite requires every collaborator to re-clone or repair their local checkout.
```

```markdown
### 2. The "2FA available on all plans" claim is not backed by code

- **Why it matters:** Users may rely on a security feature that does not exist. Broken security promises are often worse than ordinary bugs because users make trust decisions from them.
- **Evidence:** `/security` says "2FA available on all plans", but `app/settings/` has no enrollment flow and no TOTP, backup code, or recovery path.
- **Fix:** Build the 2FA flow or remove the claim until the feature exists.
- **Breakage risk:** Building 2FA touches account recovery and login. Removing the claim is safer but changes marketing copy.
```
