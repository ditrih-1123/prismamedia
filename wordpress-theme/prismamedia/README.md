# PrismaMedia WordPress Theme

News and editorial theme for Central and Eastern Europe coverage. Port from the Next.js PrismaMedia site.

## Installation

1. Copy the `prismamedia` folder to your WordPress `wp-content/themes/` directory.
2. In WordPress admin go to **Appearance → Themes** and activate **PrismaMedia**.

## Content import (from Next.js site)

1. **Generate content-export.json** (from the Next.js project root):
   ```bash
   node scripts/export-news-for-wp.cjs
   ```
   This writes `wordpress-theme/prismamedia/content-export.json`. If you use the theme from a different path, copy that JSON file into the theme folder (same directory as `style.css`).

2. In WordPress admin go to **Appearance → Import Content**.
3. Click **Run import**. This creates:
   - Categories: Czech Republic, Slovakia, Hungary, Moldova, Georgia, Armenia (slugs: czech-republic, slovakia, hungary, moldova, georgia, armenia)
   - Posts for each news item, with excerpt and content; each post is assigned to its country category and gets meta `_prisma_import_id`, `_prisma_dateline`, `_prisma_image_url` for reference.

## Images

- **Featured images for posts**: Import does not attach featured images. Each post stores the original image path in `_prisma_image_url` (e.g. `/images/1.jpg`). To set featured images:
  - Upload the images from the Next.js `public/images/` folder to the WordPress Media Library (or place them in your WordPress root and use a “sideload from URL” plugin).
  - Edit each post and set the Featured Image, or use a plugin that bulk-sets featured images from a meta field or URL.

- **Sidebar “Trust in prime ministers”**: The theme looks for images in the theme folder at `images/pm/`:
  - Babish.png, Fico.png, Orban.png, Muntianu.png, Muntianu.png, Kobahidze.png, Pashynyan.png  
  Copy these from the Next.js `public/images/` directory into `wp-content/themes/prismamedia/images/pm/`. See `images/pm/README.md` in the theme.

## Menu

To use a custom menu for the header country links: **Appearance → Menus**, create a menu, add links (e.g. to `#czech-republic`, `#slovakia`, etc.), assign it to **Primary (Countries)**. If no menu is set, the theme shows default country anchors.

## Features

- Currency rates in header (from MoneyConvert API, cached 1 hour).
- Front page: ticker, category buttons, Hungary polls block, main stories, topic grids by category, sidebar with Latest posts, Trust in PMs, Latest digest (oil + EU direction approval by country).
- Responsive layout; sidebar sticks on desktop.
