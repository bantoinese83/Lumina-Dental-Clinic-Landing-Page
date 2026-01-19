# Deployment Guide for Lumina Dental Clinic

## Overview

This project consists of a React frontend and Node.js backend. Both need to be deployed for full functionality.

## Frontend Deployment (React + Vite)

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect Vercel account to GitHub
   - Import the repository

2. **Configure Build Settings**

   ```
   Build Command: npm run build
   Output Directory: dist
   Node Version: 18.x
   ```

3. **Environment Variables**

   ```
   GEMINI_API_KEY=your_api_key
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   - Vercel will auto-deploy on git push
   - Get your frontend URL (e.g., `lumina-dental.vercel.app`)

### Option 2: Netlify

1. **Connect Repository**
   - Push code to GitHub
   - Connect Netlify to GitHub repo

2. **Build Settings**

   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18
   ```

3. **Environment Variables**
   - Same as Vercel

## Backend Deployment (Node.js)

### Option 1: Railway

1. **Connect Repository**
   - Push code to GitHub
   - Connect Railway to GitHub

2. **Environment Variables**

   ```
   PORT=3001
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Deploy**
   - Railway will provide a URL (e.g., `lumina-api.railway.app`)

### Option 2: Render

1. **Create Web Service**
   - Connect GitHub repository
   - Select Node.js environment

2. **Configure Settings**

   ```
   Build Command: npm install
   Start Command: npm run server
   Node Version: 18
   ```

3. **Environment Variables**
   - Same as Railway

## Environment Setup

### 1. Email Configuration (Required for Contact Form)

The contact form requires email functionality:

1. **Gmail Setup** (if using Gmail):
   - Enable 2-Factor Authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Use App Password (not regular password) in EMAIL_PASS

2. **Environment Variables**:
   ```bash
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

### 2. API Integration

Update the frontend to point to your backend:

1. **Local Development**:

   ```bash
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

2. **Production**:
   ```bash
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```

## Domain Setup

### Custom Domain (Optional)

1. **Frontend (Vercel/Netlify)**:
   - Add custom domain in provider settings
   - Configure DNS records

2. **Backend (Railway/Render)**:
   - Most providers support custom domains
   - Update CORS settings if needed

## Testing Deployment

### 1. Frontend Tests

```bash
# Test contact form submission
curl -X POST https://your-frontend-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### 2. Backend Tests

```bash
# Health check
curl https://your-backend-domain.com/api/health
```

### 3. Email Testing

- Submit contact form
- Check if emails are received
- Verify auto-reply functionality

## Security Considerations

1. **HTTPS**: Ensure both frontend and backend use HTTPS
2. **Environment Variables**: Never commit secrets to code
3. **CORS**: Configure properly for your domain
4. **Rate Limiting**: Consider adding rate limiting for contact form
5. **Input Validation**: Backend validates all inputs

## Monitoring & Maintenance

1. **Uptime Monitoring**: Use services like UptimeRobot
2. **Error Logging**: Implement proper error logging
3. **Backup**: Regular backups of any user data
4. **Updates**: Keep dependencies updated

## Troubleshooting

### Common Issues:

1. **Contact Form Not Working**:
   - Check email credentials
   - Verify API endpoints
   - Check CORS settings

2. **Build Failures**:
   - Ensure Node.js version compatibility
   - Check environment variables
   - Verify build commands

3. **Performance Issues**:
   - Enable compression
   - Optimize images
   - Use CDN for static assets

## Support

For deployment issues, check:

- Vercel/Railway/Render documentation
- Project README for local setup
- Console logs for error details
