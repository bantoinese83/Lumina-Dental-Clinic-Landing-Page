# Lumina Dental Clinic Landing Page

A high-performance, production-ready dental clinic landing page built with React 19, TypeScript, and Vite. Features a modern design system, comprehensive error handling, and enterprise-level optimizations.

## 🚀 Features

- **Hero Section**: High-conversion hero with call-to-action, status indicators, and animated metrics
- **Patient Journey**: Interactive workflow timeline showcasing the dental experience
- **Smile Gallery**: Professional case studies with before/after dental procedures
- **Patient Reviews**: Dynamic testimonials with ratings and company attribution
- **Lead Capture**: Advanced contact form with validation, sanitization, and email API
- **Emergency Care**: 24/7 emergency dental services banner and information
- **PDF Credentials**: Integrated credentials display and download functionality
- **Error Handling**: Comprehensive error boundaries with user-friendly fallbacks
- **Performance Monitoring**: Core Web Vitals tracking and analytics integration
- **Bundle Analysis**: Built-in bundle analyzer for optimization insights
- **Responsive Design**: Mobile-first design with modern UI/UX patterns
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript (strict mode), Vite
- **Styling**: Tailwind CSS v4 (with @tailwindcss/vite plugin)
- **Icons**: Custom Dentistry Icons (80 premium SVG icons)
- **Animations**: Framer Motion with Reveal components
- **Backend**: Node.js, Express with security middleware
- **Error Handling**: React Error Boundaries with reporting
- **Performance**: Core Web Vitals monitoring, bundle analysis
- **Security**: Helmet, CORS, input sanitization, rate limiting
- **Email**: Nodemailer with OAuth2 and App Password support
- **Quality**: ESLint, Prettier, Knip, TypeScript strict mode (100/100 score)
- **Build**: Vite with advanced optimizations

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lumina-dental-clinic
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   **Note**: This project uses Tailwind CSS v4 with the official Vite plugin for optimal performance and zero-configuration setup.

3. **Environment Setup**

   Copy the environment template:

   ```bash
   cp .env.example .env
   ```

   Configure the following variables:

   **Frontend:**

   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Backend (Choose one email method):**

   _OAuth2 (Recommended - More Secure):_

   ```bash
   EMAIL_USER=your_email@gmail.com
   OAUTH_CLIENT_ID=your_oauth_client_id
   OAUTH_CLIENT_SECRET=your_oauth_client_secret
   OAUTH_REFRESH_TOKEN=your_oauth_refresh_token
   OAUTH_ACCESS_TOKEN=your_oauth_access_token
   ```

   _App Password (Less Secure - Fallback):_

   ```bash
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Start full-stack development (frontend + backend)**

   ```bash
   npm run dev:full
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

7. **Preview production build**

   ```bash
   npm run preview
   ```

8. **Start production server**

   ```bash
   npm run server
   ```

## 📊 Quality Assurance

This project maintains a **100/100 quality score** with enterprise-level code standards:

```bash
npm run quality  # Run complete quality pipeline
```

### Quality Pipeline Commands:

- `npm run type-check` - TypeScript strict mode compilation
- `npm run lint` - ESLint with zero warnings/errors
- `npm run format` - Prettier code formatting
- `npm run knip` - Unused dependency detection
- `npm run build` - Production build verification
- `npm run analyze` - Bundle analysis with visualizer

### Additional Scripts:

- `npm run dev` - Development server
- `npm run dev:full` - Full-stack development (frontend + backend)
- `npm run server` - Production backend server
- `npm run preview` - Production build preview

## 🎨 Custom Dentistry Icons

This project features **80 premium custom dentistry-themed SVG icons** professionally integrated throughout the landing page:

### Icon Categories:

- **Dental Procedures**: Implants, crowns, braces, root canals, surgery
- **Equipment & Tools**: Drills, x-rays, dental chairs, extraction tools
- **Healthcare Elements**: Checkups, certificates, wellness, hygiene
- **UI Elements**: Calendar, phone, email, location, download
- **Patient Care**: Smile, teeth, cleaning, prevention, emergency

### Technical Implementation:

- **Lucide React Icons**: Modern icon system for consistent UI
- **Semantic Mapping**: Meaningful names to SVG file mappings
- **Fallback System**: Default icons for missing assets
- **Responsive Sizing**: Optimized for all screen sizes
- **Performance Optimized**: Efficient SVG rendering

All icons are professionally designed and provide a cohesive, premium visual experience that reinforces the dental clinic branding and enhances user trust.

## ⚡ Advanced Features

### Error Handling & Reliability

- **React Error Boundaries**: Graceful error recovery with user-friendly fallbacks
- **Error Reporting**: Production error logging with context and user information
- **Performance Monitoring**: Core Web Vitals tracking and analytics integration

- **Offline Support**: Graceful degradation when network is unavailable

### Security & Performance

- **Security Headers**: Helmet.js with comprehensive security middleware
- **Input Sanitization**: XSS protection and data validation
- **Rate Limiting**: API protection against abuse
- **Bundle Analysis**: Rollup visualizer for optimization insights

### Developer Experience

- **TypeScript Strict Mode**: 100% type safety with strict compiler options
- **Code Quality**: ESLint, Prettier, and Knip for consistent, clean code
- **Hot Reload**: Fast development with Vite's instant updates
- **Build Optimization**: Advanced bundling with tree shaking and minification

## 📁 Project Structure

```
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx   # Custom button component
│   │   │   ├── Counter.tsx  # Animated counter
│   │   │   ├── OptimizedImage.tsx # Image optimization component
│   │   │   ├── ErrorBoundary.tsx # Error handling
│   │   │   ├── Layout.tsx   # Layout wrapper
│   │   │   ├── OptimizedImage.tsx # Image optimization
│   │   │   ├── Reveal.tsx   # Animation wrapper
│   │   │   ├── Section.tsx  # Section wrapper
│   │   │   ├── TiltCard.tsx # Interactive cards
│   │   │   └── Badge.tsx    # Status badges
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Workflow.tsx     # Patient journey
│   │   ├── CaseStudies.tsx  # Smile gallery
│   │   ├── Testimonials.tsx # Patient reviews
│   │   ├── Contact.tsx      # Lead capture form
│   │   ├── Credentials.tsx  # PDF credentials
│   │   ├── Footer.tsx       # Site footer
│   │   └── Navbar.tsx       # Navigation
│   ├── config/              # Configuration files
│   │   └── config.tsx       # Site configuration
│   ├── types/               # TypeScript definitions
│   │   ├── types.ts         # Type definitions
│   │   └── globals.d.ts     # Global type declarations
│   ├── utils/               # Utility functions
│   │   ├── errorReporting.ts # Error reporting
│   │   └── performance.ts   # Performance monitoring
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # App entry point
│   └── index.css            # Global styles
├── server/                  # Backend API server
│   └── server.js            # Express server with email API
├── public/                  # Static assets
│   ├── icons/              # Custom dentistry icons (80 SVGs)
│   └── favicon.ico        # Favicon
├── docs/                   # Documentation
│   └── DEPLOYMENT.md      # Deployment guide
├── dist/                  # Production build (generated)
├── node_modules/          # Dependencies (generated)
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript strict configuration
├── eslint.config.js       # ESLint configuration
├── knip.json             # Unused dependency checker
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── .gitignore            # Git ignore rules
```

## 🎨 Design System

- **Primary Colors**: Teal (#14b8a6) and Blue (#3b82f6)
- **Typography**: Space Grotesk (headings), Inter (body)
- **Spacing**: Tailwind CSS spacing scale
- **Animations**: Framer Motion with smooth transitions

## 🔧 Configuration

Site content is managed through `config.tsx`. Update this file to modify:

- Clinic information
- Testimonials
- Case studies
- Contact details
- Navigation menu

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended for React)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain support included

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set Node.js version to 18+

### Manual Deployment

1. Run `npm run build`
2. Upload `dist` folder to your hosting provider

## 📋 Future Enhancements

- [x] PDF credentials integration (completed)
- [x] Error boundaries and monitoring (completed)
- [x] Performance optimization (completed)
- [ ] Backend API for dynamic content management
- [ ] Appointment booking system integration
- [ ] Patient portal with authentication
- [ ] Admin dashboard for content management
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics and conversion tracking

## 📄 License

This project is proprietary. All rights reserved.

## 👥 Support

For technical support or questions, please contact the development team.
