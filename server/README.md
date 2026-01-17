# Backend Setup

This is the Express.js backend API for the SaaS eCommerce marketing landing page.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on: `http://localhost:5003`

## Production

```bash
npm start
```

## Environment Variables

Create `.env`:

```
PORT=5003
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password (not your regular password)
3. Use the App Password in `MAIL_PASS`

## API Endpoints

### Health Check
- **GET** `/health`
- Response: `{ status: "Backend is running" }`

### Send Mail
- **POST** `/api/mail/send`
- Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```

## Project Structure

```
backend/
├── config/
│   └── mailConfig.js       # Mail configuration
├── controllers/
│   └── mailController.js   # Request handlers
├── routes/
│   └── mailRoutes.js       # API routes
├── services/
│   └── mailService.js      # Business logic
├── server.js               # Main server file
├── package.json
├── .env                    # Environment variables
└── README.md
```

## CORS Configuration

The backend is configured to accept requests from:
- Development: `http://localhost:3000`
- Production: Configured via `FRONTEND_URL` environment variable

## Technologies

- **Express.js** - Web framework
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
