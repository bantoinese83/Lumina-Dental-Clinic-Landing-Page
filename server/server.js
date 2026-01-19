import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import validator from 'validator';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:', 'http:'],
        scriptSrc: ["'self'"],
      },
    },
  }),
);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://lumina-dental.com', 'https://www.lumina-dental.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);

app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email transporter with OAuth2 (more secure than app passwords)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});

// Fallback to app password if OAuth2 not configured (less secure)
if (!process.env.OAUTH_CLIENT_ID) {
  console.warn('⚠️  OAuth2 not configured, falling back to app password authentication');
  transporter.set('auth', {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  });
}

// API Routes
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Input validation and sanitization
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    // Sanitize and validate inputs
    const sanitizedName = validator.trim(validator.escape(name));
    const sanitizedEmail = validator.trim(validator.escape(email));
    const sanitizedPhone = phone ? validator.trim(validator.escape(phone)) : '';
    const sanitizedMessage = validator.trim(validator.escape(message));

    // Validate email format
    if (!validator.isEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Validate name length
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.',
      });
    }

    // Validate message length
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 2000 characters.',
      });
    }

    // Validate phone if provided
    if (sanitizedPhone && !validator.isMobilePhone(sanitizedPhone, 'any')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number.',
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'care@luminadental.com',
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
        <hr>
        <p><em>Sent from Lumina Dental Clinic website</em></p>
        <p><small>IP: ${req.ip} | Time: ${new Date().toISOString()}</small></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Auto-reply to customer
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: sanitizedEmail,
      subject: 'Thank you for contacting Lumina Dental Clinic',
      html: `
        <h2>Thank you for reaching out, ${sanitizedName}!</h2>
        <p>We have received your message and will get back to you within 2 hours.</p>
        <p>Here's what we received:</p>
        <blockquote>${sanitizedMessage}</blockquote>
        <p>If you need immediate assistance, please call us at: <strong>555-123-4567</strong></p>
        <br>
        <p>Best regards,<br>Lumina Dental Clinic Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          This is an automated response. Please do not reply to this email.
        </p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message:
        'Thank you! Your message has been sent successfully. We will contact you within 2 hours.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try calling us directly.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
  });
});

// PDF credentials route (placeholder for future implementation)
app.get('/api/credentials', (req, res) => {
  // This would serve PDF credentials in the future
  res.json({
    message: 'PDF credentials endpoint - Coming soon',
    available: false,
  });
});

// Global error handler
app.use((err, req, res) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Lumina Dental API Server running on port ${PORT}`);
  console.log(
    `📧 Email service: ${process.env.OAUTH_CLIENT_ID ? 'OAuth2' : process.env.EMAIL_PASS ? 'App Password' : 'Not configured'}`,
  );
  console.log(`🔒 Security: Rate limiting enabled, input sanitization active`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
