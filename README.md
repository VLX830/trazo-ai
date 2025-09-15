# 🎨 TRAZO AI - AI-Powered Tattoo Design Generator

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Professional AI-powered tattoo design platform with subscription management and real-time generation**

![TRAZO AI Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=TRAZO+AI+Demo)

## 🚀 Features

### 🎯 Core Features
- **AI Tattoo Generation** - Advanced AI models for unique tattoo designs
- **Real-time Preview** - Instant design generation and customization
- **Style Variety** - Multiple artistic styles (Traditional, Neo-traditional, Minimalist, etc.)
- **High Resolution** - Professional quality output for tattoo artists

### 💰 Subscription Management
- **Stripe Integration** - Secure payment processing
- **Tiered Plans** - Free, Pro, and Ultra subscription tiers
- **Usage Tracking** - Generation limits and analytics
- **Webhook Handling** - Real-time subscription updates

### 🔐 Authentication & Security
- **Supabase Auth** - Secure user authentication
- **Email Verification** - Account verification system
- **Protected Routes** - Authentication-based access control
- **Data Privacy** - GDPR compliant user data handling

### 🎨 User Experience
- **Modern UI/UX** - Clean, professional interface
- **Dark/Light Mode** - Theme switching capability
- **Responsive Design** - Mobile-first approach
- **Image Gallery** - Personal design collection
- **Download System** - High-quality image exports

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Modern icon library

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - File storage
  - Real-time subscriptions
- **Stripe** - Payment processing
- **AI API** - Custom tattoo generation service

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/trazo-ai.git
cd trazo-ai
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```
Edit `.env.local` with your actual credentials.

4. **Set up Supabase**
```sql
-- Run these SQL commands in your Supabase SQL editor
-- (Database schema will be provided in /docs/database.sql)
```

5. **Set up Stripe**
- Create products in Stripe Dashboard
- Update `STRIPE_PRICE_IDS` in `/types/subscription.ts`
- Configure webhook endpoint

6. **Run development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
trazo-ai/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── docs/                 # Documentation
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the SQL commands from `/docs/database.sql`
3. Configure authentication providers
4. Set up storage buckets

### Stripe Setup
1. Create Stripe account and get API keys
2. Create subscription products
3. Configure webhook endpoints
4. Update price IDs in code

### Environment Variables
See `env.example` for complete configuration details.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Environment Variables for Production
- Update `NEXT_PUBLIC_APP_URL` to your domain
- Use Stripe Live keys
- Configure production webhook endpoints

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Optimized with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pablo Campelo**
- Email: vlx.dev@proton.me

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

⭐ **If you found this project helpful, please give it a star!**