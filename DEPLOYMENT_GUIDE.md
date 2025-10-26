# Email Implementation & Render.com Deployment Guide

## ✅ Implementation Complete

Your Nuxt 4 app now has email functionality using nodemailer! Here's what was implemented:

### 🔧 What Was Added

1. **Server API Route**: `server/api/send-message.post.ts` - Handles email sending
2. **Updated Messages API**: `app/utils/api/messages.api.ts` - Now uses internal API instead of external service
3. **Email Configuration**: Added to `nuxt.config.ts` runtime config
4. **Image Attachments**: Full support for image attachments in emails

### 📧 Email Features

- ✅ Sends contact form data via email
- ✅ Includes all form fields (name, email, city, phone, description, price range)
- ✅ Supports image attachments
- ✅ HTML email template with Polish content
- ✅ Error handling and validation

## 🚀 Render.com Deployment

### 1. Environment Variables

Set these environment variables in your Render dashboard:

```bash
# Email Configuration (Required)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_TO=recipient@example.com

# Optional
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

**Note**: `EMAIL_USER` is your SMTP authentication username, not the sender email. The sender email comes from the form input.

### 2. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `EMAIL_PASSWORD`

### 3. Render.com Service Configuration

1. **Service Type**: Web Service
2. **Build Command**: `npm run build`
3. **Start Command**: `npm run preview`
4. **Node Version**: 20.19.0 (as specified in your package.json)

### 4. Alternative Email Providers

#### SendGrid
```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

#### Mailgun
```bash
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-smtp-username
EMAIL_PASSWORD=your-mailgun-smtp-password
```

#### Outlook/Hotmail
```bash
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🧪 Testing Locally

1. **Create `.env` file** with your email settings:
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_TO=recipient@example.com
```

2. **Run development server**:
```bash
npm run dev
```

3. **Test contact form** - emails will be sent to `EMAIL_TO` address

## 📁 File Structure

```
server/
├── api/
│   └── send-message.post.ts    # Email API endpoint
app/
├── utils/
│   └── api/
│       └── messages.api.ts      # Updated to use internal API
nuxt.config.ts                   # Added email configuration
```

## 🔍 How It Works

1. **User submits form** → `ContactForm.vue`
2. **Form data processed** → `messages.api.ts` (converts images to base64)
3. **API call made** → `/api/send-message` (server route)
4. **Email sent** → Using nodemailer with your SMTP settings
5. **Response returned** → Success/error status

## 🛠️ Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check email credentials
   - Ensure 2FA is enabled for Gmail
   - Use app password, not regular password

2. **"Connection timeout"**
   - Verify SMTP host and port
   - Check firewall settings
   - Try different email provider

3. **Images not attaching**
   - Check file size limits
   - Verify image formats are supported
   - Check base64 conversion

### Debug Mode

Add this to your server route for debugging:
```typescript
console.log('Email config:', {
  host: config.emailHost,
  port: config.emailPort,
  user: config.emailUser,
  to: config.emailTo
});
```

## 🎯 Next Steps

1. **Deploy to Render.com** with environment variables
2. **Test email functionality** in production
3. **Monitor email delivery** and adjust settings as needed
4. **Consider email templates** for better formatting
5. **Add email validation** and spam protection

Your app is now ready for production deployment on Render.com! 🚀
