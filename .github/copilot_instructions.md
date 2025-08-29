# Zaddy Platform

## Context & Project Overview

You are building a premium modern skills training platform called "Zaddy" that teaches AI-integrated skills for people who want to earn money from home. This is a complete learning management system with e-commerce functionality, user authentication, video streaming, and community features.

**Brand Identity**: Edgy, modern, premium aesthetic with glassmorphism effects, neon accents, and a "WAAOW" factor that immediately impresses visitors.

**Core Business Model**: Progressive skill packages (Alpha → Beta → Gamma) with one-time payments, upgrade discounts, and community support integration.

## Technical Architecture Requirements

### Frontend Framework & Styling

- **Next.js 14+** with App Router for modern React development

- **Tailwind CSS** for responsive design and glassmorphism effects

- **TypeScript** for type safety and better development experience

- Support for both **light and dark themes** with smooth transitions

### Database & Backend

- **MongoDB** with Mongoose ODM for flexible document storage

- **Next.js API routes** for backend functionality

- **Server-side rendering** and **static generation** where appropriate

### Authentication & Payments

- **NextAuth.js** with multiple providers:

- Email/password with verification codes

- Google OAuth integration

- **Razorpay** integration for Indian payment processing

- **JWT tokens** for session management

- **Maximum 2 concurrent sessions** per user

### Media & Animations

- **Bunny.net CDN** for video streaming and content delivery

- **Framer Motion** for advanced animations and page transitions

- **Lenis** for smooth scrolling experiences

- **Lottie React** for micro-animations and loading states

- **Swiper.js** for carousels and testimonial sliders

- **Spline** integration for 3D elements (hero sections, backgrounds)

## Detailed Feature Requirements

### 1. Website Structure & Pages

```

REQUIRED PAGES:

├── / (Home) - Hero, features, testimonials, CTA

├── /packages - Alpha, Beta, Gamma overview

├── /package/[slug] - Individual package details

├── /reviews - Success stories and testimonials

├── /about - Company story and mission

├── /contact - Contact form and support

├── /auth/login - Login with email/Google

├── /auth/register - Registration with verification

├── /dashboard - User learning dashboard

├── /dashboard/profile - User profile management

└── /dashboard/courses/[courseId] - Course content player

```

### 2. User Authentication Flow

**Registration Process:**

1. Collect: email, name, phone, gender, age, occupation

2. Send email verification code (6-digit OTP)

3. Verify email before account activation

4. Support Google OAuth as alternative

**Session Management:**

- Implement concurrent session limiting (max 2 devices)

- JWT token refresh mechanism

- Secure logout functionality

**Database Schema for Users:**

```javascript

const UserSchema = {

email: String, // unique, required

name: String,

phone: String,

gender: String,

age: Number,

occupation: String,

password: String, // hashed

emailVerified: Boolean,

googleId: String, // for OAuth

avatar: String,

activePackages: [PackageId],

purchaseHistory: [PurchaseId],

sessionTokens: [String], // for concurrent session control

createdAt: Date,

lastLogin: Date

}

```

### 3. Package & Course Structure

**Package Types:**

- **Alpha**: E-commerce fundamentals

- **Beta**: Alpha + Build anything with AI (Vibe Coding)

- **Gamma**: Alpha + Beta + UGC (Instagram influencing, Veo3, JSON prompting)

- **Sigma**: Coming Soon (hidden/locked state)

**Course Content Schema:**

```javascript

const PackageSchema = {

name: String, // Alpha, Beta, Gamma

title: String,

description: String,

price: Number,

originalPrice: Number, // for discount display

features: [String],

modules: [ModuleId],

status: String, // active, coming-soon

thumbnailUrl: String,

introVideoUrl: String

}

const ModuleSchema = {

packageId: ObjectId,

title: String,

description: String,

lessons: [LessonId],

order: Number

}

const LessonSchema = {

moduleId: ObjectId,

title: String,

description: String,

videoUrl: String, // Bunny.net CDN URL

duration: Number, // in seconds

order: Number,

isCompleted: Boolean // per user

}

```

### 4. Video Streaming & Progress Tracking

**Bunny.net Integration:**

- Implement secure video streaming with signed URLs

- Prevent video downloading and unauthorized access

- Track video watch progress automatically

- Mark lessons as complete when 95% watched

**Progress Tracking:**

```javascript

const ProgressSchema = {

userId: ObjectId,

lessonId: ObjectId,

watchedDuration: Number,

totalDuration: Number,

isCompleted: Boolean,

completedAt: Date,

lastWatchedAt: Date

}

```

### 5. Payment Integration (Razorpay)

**Payment Flow:**

1. Package selection → Package details page

2. Buy button → Payment page with Razorpay integration

3. Successful payment → Redirect to dashboard with course access

4. Failed payment → Error handling and retry options

**Upgrade Mechanism:**

- 14-day upgrade window with discount (pay difference only)

- After 14 days, pay full price for upgrade

- Automatic calculation of upgrade pricing

**Purchase Schema:**

```javascript

const PurchaseSchema = {

userId: ObjectId,

packageId: ObjectId,

amount: Number,

currency: String,

razorpayOrderId: String,

razorpayPaymentId: String,

status: String, // pending, completed, failed

purchasedAt: Date,

upgradeEligibleUntil: Date // purchasedAt + 14 days

}

```

### 6. Design System & UI Components

**Glassmorphism Theme:**

```css

/* Primary glassmorphism effect */

.glass-card {

background: rgba(255, 255, 255, 0.1);

backdrop-filter: blur(10px);

border: 1px solid rgba(255, 255, 255, 0.2);

border-radius: 24px; /* rounded-3xl */

}

/* Dark theme variations */

.dark .glass-card {

background: rgba(0, 0, 0, 0.2);

border: 1px solid rgba(255, 255, 255, 0.1);

}

```

**Color Palette:**

- **Primary Neon**: Cyan/Electric Blue (#00D9FF)

- **Accent Neon**: Purple/Magenta (#FF006E)

- **Background Light**: Gradient whites and light grays

- **Background Dark**: Deep blacks and dark grays

- **Text**: High contrast for accessibility

**Animation Requirements:**

- **Page Transitions**: Smooth enter/exit with Framer Motion

- **Scroll Animations**: Elements fade/slide in with Lenis smooth scroll

- **Micro-animations**: Button hovers, card interactions

- **Loading States**: Lottie animations for loading screens

- **3D Elements**: Spline integration for hero backgrounds

### 7. Dashboard & Learning Interface

**User Dashboard Features:**

- Welcome message with user name

- Active packages overview with progress

- Quick access to continue watching

- Profile management link

- Upgrade suggestions based on current package

**Video Player Requirements:**

- Custom branded player (no external branding)

- Progress bar with chapter markers

- Playback speed controls

- Full-screen support

- Mobile-responsive design

- Automatic progress saving

### 8. Community Integration

**WhatsApp Community Workflow:**

- After successful purchase, show WhatsApp group links

- Separate groups for Alpha, Beta, Gamma packages

- Clear instructions for joining community

- Weekly live session scheduling information

### 9. Success Stories & Social Proof

**Testimonials System:**

- User-submitted success stories

- Social media post embeds

- Before/after showcases

- Earnings testimonials (with privacy protection)

- Swiper.js carousel for testimonial display

### 10. Security & Anti-Piracy Measures

**Content Protection:**

- Signed URLs for video access with expiration

- Hotlink protection on Bunny.net CDN

- Session-based video tokens

- Disable right-click and developer tools on video pages

- Watermarking with user information

**Account Security:**

- Rate limiting on login attempts

- CSRF protection on all forms

- Input validation and sanitization

- Secure password hashing (bcrypt)

- Environment variable protection

## Responsive Design Requirements

**Mobile-First Approach:**

- Touch-friendly interface with adequate spacing

- Swipe gestures for navigation

- Optimized video player for mobile viewing

- Collapsible navigation menu

- Performance optimization for slower connections

**Breakpoints:**

- Mobile: 320px - 768px

- Tablet: 768px - 1024px

- Desktop: 1024px+

- Large Desktop: 1440px+

## Performance & SEO Optimization

**Core Web Vitals:**

- First Contentful Paint < 2s

- Largest Contentful Paint < 2.5s

- Cumulative Layout Shift < 0.1

- First Input Delay < 100ms

**SEO Requirements:**

- Dynamic meta tags for each page

- Open Graph tags for social sharing

- Structured data markup

- XML sitemap generation

- Optimized images with alt text

## Development Priorities

### Phase 1: Core Foundation (Weeks 1-2)

1. Next.js project setup with TypeScript and Tailwind

2. MongoDB connection and basic schemas

3. NextAuth.js configuration with email and Google OAuth

4. Basic page structure and routing

5. Glassmorphism design system implementation

### Phase 2: Authentication & Content (Weeks 3-4)

1. Complete user registration/login flow

2. Email verification system

3. User dashboard with profile management

4. Package display pages with pricing

5. Razorpay payment integration

### Phase 3: Learning Management (Weeks 5-6)

1. Course content management system

2. Bunny.net video streaming integration

3. Progress tracking implementation

4. Video player with custom controls

5. Mobile responsive optimization

### Phase 4: Polish & Security (Weeks 7-8)

1. Advanced animations with Framer Motion and Lenis

2. 3D elements integration with Spline

3. Anti-piracy and security measures

4. Performance optimization

5. Testing and bug fixes

## Code Generation Instructions

When generating code for this project:

1. **Use TypeScript** for all components and API routes

2. **Implement proper error handling** with try-catch blocks

3. **Add loading states** for all async operations

4. **Include proper TypeScript interfaces** for all data structures

5. **Use Server Components** where possible for better performance

6. **Implement proper SEO** with metadata API

7. **Add proper ARIA labels** for accessibility

8. **Use environment variables** for all sensitive configuration

9. **Include proper validation** for all user inputs

10. **Implement proper caching strategies** for static content

## Example Component Structure

```typescript

// Example: Package Card Component

interface Package {

id: string;

name: string;

title: string;

price: number;

originalPrice?: number;

features: string[];

status: 'active' | 'coming-soon';

}

export default function PackageCard({ package }: { package: Package }) {

// Implementation with glassmorphism, animations, and proper accessibility

}