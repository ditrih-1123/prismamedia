# Images migration (Next.js → WordPress)

## 1. Post featured images

The import stores the original path in post meta `_prisma_image_url` (e.g. `/images/1.jpg`). To set featured images in WordPress:

**Option A – Manual**

- Upload files from the Next.js `public/images/` folder (1.jpg–24.jpg, 14.png, 16.png, 20.png, 23.jpeg) to **Media → Add New**.
- Edit each post and set **Featured image** to the corresponding uploaded image.

**Option B – Sideload from URL (if images are on a live site)**

If the Next.js site is deployed (e.g. at `https://yoursite.com`), you can use a plugin like “Import External Images” or “Auto Featured Image from URL” to set the featured image from `https://yoursite.com/images/1.jpg` etc. Alternatively, use WP-CLI or a one-off script that:

1. Gets all posts with `_prisma_image_url` meta.
2. For each, downloads the image from `home_url() . $url` (or a configurable base URL) and attaches it as the post’s featured image.

**Option C – Copy files to WordPress root**

If you copy `public/images/` to your WordPress root (so `https://yourwp.com/images/1.jpg` works), you can keep using those URLs in content. The theme does not force featured images; posts will still show without them (placeholder or no image).

## 2. Sidebar “Trust in prime ministers” avatars

The theme expects these files in the theme directory:

- `wp-content/themes/prismamedia/images/pm/Babish.png`
- `wp-content/themes/prismamedia/images/pm/Fico.png`
- `wp-content/themes/prismamedia/images/pm/Orban.png`
- `wp-content/themes/prismamedia/images/pm/Muntianu.png`
- `wp-content/themes/prismamedia/images/pm/Kobahidze.png`
- `wp-content/themes/prismamedia/images/pm/Pashynyan.png`

Copy them from the Next.js project `public/images/` into `wordpress-theme/prismamedia/images/pm/` (before copying the theme to WordPress) or into `wp-content/themes/prismamedia/images/pm/` on the server.

If you don’t have these files, the sidebar will show broken image icons; you can add your own images with the same filenames or hide the avatar in CSS (e.g. `.prisma-trust-avatar { display: none; }`).
