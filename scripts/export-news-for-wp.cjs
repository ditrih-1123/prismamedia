/**
 * Export topicSections from lib/news.ts to JSON for WordPress import.
 * Run from project root: node scripts/export-news-for-wp.cjs
 * Or with full TS support: npx tsx -e "import {topicSections} from './lib/news.ts'; require('fs').writeFileSync('wordpress-theme/prismamedia/content-export.json', JSON.stringify(topicSections, null, 2)); console.log('Wrote content-export.json');"
 */

const fs = require('fs');
const path = require('path');

let topicSections;
try {
  require('ts-node/register');
  const mod = require(path.join(__dirname, '..', 'lib', 'news.ts'));
  topicSections = mod.topicSections || mod.default?.topicSections;
} catch (e) {
  // Fallback: ts-node not available, try parsing TS as text and building JSON
  const newsPath = path.join(__dirname, '..', 'lib', 'news.ts');
  const raw = fs.readFileSync(newsPath, 'utf8');
  topicSections = [];
  const sectionRegex = /\{\s*id:\s*["']([^"']+)["']\s*,\s*label:\s*["']([^"']+)["']\s*,\s*description:\s*["']([^"']*)["']\s*,\s*items:\s*\[/g;
  let m;
  while ((m = sectionRegex.exec(raw)) !== null) {
    const [, id, label, description] = m;
    const items = [];
    const itemBlockStart = m.index + m[0].length;
    let depth = 1;
    let pos = raw.indexOf('[', itemBlockStart) + 1;
    const itemStart = pos;
    while (pos < raw.length && depth > 0) {
      const c = raw[pos];
      if (c === '[') depth++;
      else if (c === ']') depth--;
      pos++;
    }
    const itemsStr = raw.slice(itemStart, pos - 1);
    const itemRegex = /\{\s*id:\s*["']([^"']+)["']\s*,\s*title:\s*["']((?:[^"\\]|\\.)*)["']\s*,\s*dek:\s*["']((?:[^"\\]|\\.)*)["']\s*(?:\s*body:\s*["']((?:[^"\\]|\\.)*)["']\s*)?\s*imageUrl:\s*(?:publicImage\s*\(\s*["']([^"']+)["']\s*\)|["'][^"']*["'])\s*,\s*imageAlt:\s*["']((?:[^"\\]|\\.)*)["']\s*,\s*category:\s*["']([^"']*)["']\s*,\s*dateline:\s*["']([^"']+)["']\s*,\s*publishedAt:\s*["']([^"']+)["']/g;
    let im;
    while ((im = itemRegex.exec(itemsStr)) !== null) {
      items.push({
        id: im[1],
        title: im[2].replace(/\\'/g, "'"),
        dek: im[3].replace(/\\'/g, "'"),
        body: (im[4] || '').replace(/\\'/g, "'"),
        imageUrl: im[5] ? '/' + im[5] : '',
        imageAlt: (im[6] || '').replace(/\\'/g, "'"),
        category: im[7] || '',
        dateline: im[8] || '',
        publishedAt: im[9] || '',
      });
    }
    topicSections.push({ id, label, description, items });
  }
}

if (!topicSections || topicSections.length === 0) {
  console.error('No data extracted. Install ts-node and run: npm install -D ts-node');
  console.error('Then run this script again, or use: npx tsx -e "import {topicSections} from \'./lib/news.ts\'; require(\'fs\').writeFileSync(\'wordpress-theme/prismamedia/content-export.json\', JSON.stringify(topicSections, null, 2));"');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'wordpress-theme', 'prismamedia');
const outPath = path.join(outDir, 'content-export.json');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(topicSections, null, 2), 'utf8');
console.log('Wrote', outPath);
