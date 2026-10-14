# 🏛️ VAULT Open Source

**Personal Wealth Intelligence Platform — Self-Hosted Edition**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

VAULT OS is a free, open-source personal finance dashboard that helps you track net worth, manage debt, monitor investments, and visualize your financial health — all while keeping your data private.

This is the self-hosted, open-source edition (AGPL-3.0). Prefer a hosted product? See [vaultwealthiq.com](https://vaultwealthiq.com).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Railway, Supabase, or self-hosted)
- Vercel account (free) for deployment

### 1. Clone & Install
```bash
git clone https://github.com/solivana7/vault-wealth-os.git
cd vault-wealth-os
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
# Database (Railway, Supabase, or local Postgres)
DATABASE_URL=postgresql://user:pass@host:5432/vault

# AI Advisor (Anthropic Claude - optional)
CLAUDE_API_KEY=sk-ant-...

# Property Valuations (Redfin - optional)
REDFIN_API_KEY=your_rapidapi_key
```

### 3. Database Schema
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Deploy
```bash
vercel --prod
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 Net Worth Tracking | Real-time calculation of assets minus liabilities |
| 🏠 Property Valuation | Redfin integration for automatic home value updates |
| 💳 Debt Management | Payoff planning with avalanche/snowball strategies |
| 📈 Investment Tracking | Portfolio visualization with allocation charts |
| 🤖 AI Advisor | Claude-powered financial insights (optional) |
| 🔒 Privacy-First | Data stays in your browser + your database |
| 📱 Responsive | Works on desktop, tablet, and mobile |

## 🆚 Open Source vs SaaS

| Feature | Open Source (Self-Hosted) | VAULT SaaS |
|---------|---------------------------|------------|
| Cost | Free | $9.99-29.99/mo |
| Hosting | You host | We host |
| Data Control | Full control | Encrypted, exportable |
| Bank Sync | Manual / DIY | Plaid integration |
| Support | Community | Priority support |
| Updates | Self-managed | Automatic |

## 🛡️ Security

- All financial data stored in browser `localStorage`
- Only auth data touches the server
- Passwords hashed with scrypt + salt
- Served over HTTPS
- No third-party tracking

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

AGPL-3.0 — See [LICENSE](LICENSE) for details.

Commercial licenses available for SaaS offerings.

---

**⚠️ Disclaimer:** VAULT is for educational purposes only. Not financial advice.
