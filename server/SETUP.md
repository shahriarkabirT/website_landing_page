# Backend Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Gmail account

## Installation

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Gmail credentials:
     - `MAIL_USER`: Your Gmail address
     - `MAIL_PASS`: Your Gmail App Password (NOT your regular password)

3. **Create Gmail App Password:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Factor Authentication
   - Go to App passwords (available only with 2FA enabled)
   - Select "Mail" and "Windows Computer"
   - Copy the generated password

4. **Start the server:**
\`\`\`bash
npm run dev
\`\`\`

The backend will be running on \`http://localhost:5000\`

## API Endpoints

### POST /api/mail
Send an email from the contact form

**Request body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Message sent successfully!"
}
\`\`\`

## Troubleshooting

- **Connection refused**: Make sure backend is running on port 5000
- **Invalid credentials**: Check your MAIL_USER and MAIL_PASS in .env
- **CORS error**: Update FRONTEND_URL in .env if using different port
