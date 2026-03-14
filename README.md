# Prisma Media — News

News and editorial site (Central and Eastern Europe coverage). Next.js 16, React 19, Tailwind CSS 4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Development server       |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |

## Deploy on GitHub + Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy with Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → Import your repository.
3. Leave **Framework Preset**: Next.js and **Build Command**: `npm run build`.
4. Click **Deploy**. Vercel will build and host the app; every push to `main` triggers a new deployment.

### 3. Optional: GitHub Actions (build only)

To only verify that the project builds on push/PR (without deploying), add `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
```

## Environment

No environment variables are required for the default build. If you add any later, use `.env.local` for local development and set them in the Vercel project settings for production. Do not commit `.env` files with secrets.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying)
