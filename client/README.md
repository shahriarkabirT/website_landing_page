# Frontend Setup

This is the Next.js frontend application for the SaaS eCommerce marketing landing page.

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Runs on: `http://localhost:3000`

## Build

```bash
pnpm build
```

## Start Production

```bash
pnpm start
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5003
```

## Features

- Marketing landing page
- Contact form (sends to backend)
- FAQ section
- Pricing page
- Features showcase
- Services listing
- Email notifications with Meta Pixel integration
