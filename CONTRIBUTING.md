# Contributing to VAULT OS

Thanks for your interest in contributing! VAULT OS is open source under the AGPL-3.0 license.

## Ground Rules

- By submitting a pull request, you agree that your contributions are licensed under AGPL-3.0.
- This is a personal-finance tool. Do not introduce third-party trackers or send user data anywhere the user didn't explicitly configure.
- Keep dependencies minimal. The API layer intentionally uses only `pg`.

## Development Setup

```bash
git clone https://github.com/solivana7/vault-wealth-os.git
cd vault-wealth-os
npm install
vercel dev
```

You'll need a `DATABASE_URL` (any PostgreSQL instance works) for the auth endpoints. The dashboard itself runs entirely on `localStorage`.

## Pull Requests

- Small, focused changes are easier to review.
- Explain *what* changed and *why* in the PR description.
- The frontend is a single `index.html` — keep it dependency-free.

## Issues

Bug reports and feature requests are welcome via GitHub Issues. For security vulnerabilities, please open a private security advisory instead of a public issue.

## Scope

The AI advisor (`api/advisor.js`) calls the Anthropic API with the user's own key; property valuations (`api/redfin.js`) use Redfin data via RapidAPI. Contributions that add new external services should keep the same pattern: server-side env vars only, never keys in the client.
