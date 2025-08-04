# Goldy Brown's Auction

A luxury auction platform with live countdown timer and real-time bidding.

## Features

- 🎯 Live countdown timer to auction end
- 💰 Real-time bid tracking
- 🏆 Live leaderboard showing top bidders
- 💳 Secure payment processing with Stripe
- 📊 Google Sheets integration for bid tracking

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Set up your environment variables:
   - Stripe secret key
   - Google Sheets ID
   - Google service account credentials
5. Deploy to Netlify

## Environment Variables

- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `GOOGLE_SHEETS_ID`: ID of your Google Sheet
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Service account private key

## Development

Run locally with Netlify CLI:
```bash
npm run dev
