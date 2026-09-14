# PLEXO Website

The official high-conversion landing page and interactive Card Studio for **PLEXO — Your Money. Your Way.**

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS** (Editorial paper aesthetic, custom fonts, retro grain)
- **Lucide Icons**
- **Supabase** (Live waitlist submissions with bot honeypot protection)
- **HTML Canvas** (Live client-side Card Studio & 1080x1920 Poster generator)

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

## Deployment Instructions

### Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In [Vercel Dashboard](https://vercel.com), click **Add New Project** and select your repository.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase public anon key
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add the same environment variables in **Site Configuration > Environment Variables**.
5. Click **Deploy Site**.
