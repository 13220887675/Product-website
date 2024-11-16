# Multilingual Product Website

A modern, fast-loading product website built with Next.js 13+, featuring multilingual support and inquiry forms.

## Features

- 🌐 Multilingual support (English and Chinese)
- 🚀 Fast page loads with Next.js App Router
- 📱 Responsive design
- 📝 Contact forms with validation
- 🖼️ Optimized images
- 🔍 SEO optimized

## Tech Stack

- Next.js 14 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling framework
- next-intl - Internationalization support
- MDX - Product and blog content support
- React Hook Form - Form handling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js application directory
│   ├── [locale]/          # Multilingual routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── common/           # Common components
│   ├── layout/           # Layout components
│   └── sections/         # Page section components
├── i18n/                 # Internationalization configuration
├── messages/             # Translation files
└── middleware.ts         # Middleware configuration

public/
├── images/              # Static images
└── locales/            # Language resources

content/
├── products/           # Product MDX files
└── blog/              # Blog MDX files
```

## Features

1. Responsive design
   - Desktop and mobile adaptation
   - Mobile drawer navigation menu

2. Multilingual support
   - English and Chinese language support
   - SEO-friendly URL structure
   - Complete metadata and structured data

3. Theme switching
   - Light and dark theme modes
   - Custom theme colors

4. Content management
   - MDX-supported product showcase
   - Blog system
   - FAQ section

5. Interactive features
   - Search function
   - Email inquiry system
   - Navigation menu

## Development Guide

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build the production version:
```bash
npm run build
```

4. Run the production server:
```bash
npm run start
```

## Deployment

This project is configured for deployment on Vercel with Cloudflare integration:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure your domain with Cloudflare
4. Deploy!

## Notes

- All product and blog content supports MDX format
- Ensure adding new content includes corresponding multilingual translations
- Keep code comments complete during development

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=your-domain.com
```
