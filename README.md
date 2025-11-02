# Welcome Site 🌍

A beautiful multilingual welcome loader built with Next.js, featuring smooth animations and support for 15 languages.

## ✨ Features

- **Multilingual Welcome Animation** - Cycles through 15 different languages
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Works on all device sizes
- **Modern Tech Stack** - Built with Next.js 13 and React 18
- **Environment Ready** - Configured for Vercel deployment

## 🌐 Supported Languages

The welcome loader displays welcome messages in these languages:

1. **English** - Welcome
2. **Spanish** - Bienvenido  
3. **French** - Bienvenue
4. **German** - Willkommen
5. **Italian** - Benvenuto
6. **Portuguese** - Bem-vindo
7. **Japanese** - いらっしゃいませ
8. **Chinese** - 欢迎
9. **Korean** - 환영합니다
10. **Arabic** - مرحبا
11. **Russian** - Добро пожаловать
12. **Dutch** - Welkom
13. **Serbian** - добродошлица
14. **Thai** - ยินดีต้อนรับ
15. **Swedish** - Välkommen

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saintus-create/welcome-site.git
   cd welcome-site
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your environment variables (see [Environment Variables](#environment-variables) section below).

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Content**: [MDX](https://mdxjs.com/) support
- **Build Tool**: Vite (via Next.js)

## 📁 Project Structure

```
welcome-site/
├── app/                      # Next.js app directory
│   ├── components/          # React components
│   │   ├── welcome-loader.tsx    # Main multilingual loader
│   │   ├── particles.tsx         # Background particles
│   │   ├── analytics.tsx         # Analytics integration
│   │   └── ...
│   ├── projects/           # Project pages (MDX)
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── content/               # MDX content files
│   └── projects/         # Project articles
├── public/               # Static assets
│   ├── favicon.png
│   ├── og.png
│   └── fonts/           # Custom fonts
├── types/               # TypeScript type definitions
├── util/                # Utility functions
├── .env.example         # Environment variables template
├── .env                 # Your environment variables (not committed)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.mjs
```

## 🔧 Environment Variables

This project requires the following environment variables for deployment:

### QStash Configuration (Optional)
```env
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your_qstash_token_here
QSTASH_CURRENT_SIGNING_KEY=your_current_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key
```

### Upstash Redis Configuration (Optional)
```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### Analytics (Optional)
```env
NEXT_PUBLIC_BEAM_TOKEN=your_beam_token
```

### Tinybird (Optional)
```env
TINYBIRD_TOKEN=your_tinybird_token
```

**Note**: The multilingual welcome loader works without these variables. They are only needed if you plan to use the additional features like analytics, messaging, or data storage.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy

### Other Platforms

This is a standard Next.js application and can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## 🧪 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm fmt          # Format code with Rome
```

## 🎨 Customization

### Adding New Languages

To add a new language to the welcome loader:

1. Open `app/components/welcome-loader.tsx`
2. Add your language to the `welcomeTranslations` array:
   ```typescript
   { text: "Your Welcome Text", lang: "Language Name", code: "lang-code" }
   ```
3. The animation will automatically include it in the rotation

### Styling

- Global styles: `global.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes in components

### Animations

Animations are powered by Framer Motion. You can customize:
- Animation timing: `1200` (milliseconds) in `welcome-loader.tsx`
- Motion effects: Built-in Framer Motion animations
- Color schemes: Tailwind CSS classes

## 🔍 How It Works

1. **Loader Animation**: When the page loads, the welcome loader appears
2. **Language Cycling**: Every 1.2 seconds, it displays the next language
3. **Smooth Transitions**: Framer Motion handles the fade/scale animations
4. **Progress Tracking**: Visual progress bar shows completion
5. **Auto Complete**: After all languages, loader fades out to reveal main content

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first styling
- All the contributors who made this possible

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/saintus-create/welcome-site/issues)
2. Create a new issue with detailed information
3. Join the discussion

---

**Built with ❤️ by MiniMax Agent**

*Transforming ideas into beautiful web experiences*
