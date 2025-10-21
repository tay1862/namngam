# Setup Guide - Guasha Blog

## Quick Start

\`\`\`bash
cd guasha-blog
npm install
npm run dev
\`\`\`

Visit http://localhost:3000

## Adding Blog Content

### Option 1: Using Sanity CMS (Recommended)

**Requirements**: Node.js >= 20.19

\`\`\`bash
# Upgrade Node.js first
nvm install 20
nvm use 20

# Initialize Sanity
npx sanity@latest init --project-plan free --output-path sanity
\`\`\`

Then create schema in \`sanity/schemas/post.ts\`:

\`\`\`typescript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'ຫົວຂໍ້',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'excerpt',
      title: 'ສະຫຼຸບ',
      type: 'text',
    },
    {
      name: 'content',
      title: 'ເນື້ອຫາ',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'mainImage',
      title: 'ຮູບຫຼັກ',
      type: 'image',
    },
    {
      name: 'category',
      title: 'ປະເພດ',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'ວັນທີ່ເຜີຍແຜ່',
      type: 'datetime',
    },
  ],
}
\`\`\`

### Option 2: Using MDX Files

1. Install MDX packages:

\`\`\`bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
\`\`\`

2. Create \`posts\` directory and add \`.mdx\` files

3. Update next.config.ts to handle MDX

### Option 3: Simple JSON

Create \`data/posts.json\`:

\`\`\`json
[
  {
    "id": 1,
    "title": "ວິທີການເລີ່ມຕົ້ນນວດກັວຊາ",
    "excerpt": "ຄຳແນະນຳສຳລັບຜູ້ເລີ່ມຕົ້ນ",
    "image": "/images/post-1.jpg",
    "date": "2024-01-15",
    "readTime": "5 ນາທີ",
    "category": "ຄູ່ມືເບື້ອງຕົ້ນ",
    "content": "..."
  }
]
\`\`\`

Then import in BlogPreview.tsx:

\`\`\`typescript
import posts from '@/data/posts.json';
\`\`\`

## Customization

### Colors

Edit \`tailwind.config.ts\` to change color scheme:

\`\`\`typescript
colors: {
  pink: { /* your colors */ },
  rococo: { /* your colors */ }
}
\`\`\`

### Fonts

To change the Lao font, edit \`app/layout.tsx\`:

\`\`\`typescript
import { YourFont } from "next/font/google";
\`\`\`

### Images

Place images in \`public/images/\` and reference them:

\`\`\`tsx
<Image src="/images/your-image.jpg" alt="..." />
\`\`\`

## Environment Variables

Create \`.env.local\`:

\`\`\`env
# Sanity (if using)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Email (if using)
EMAIL_API_KEY=your_api_key
\`\`\`

## Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify

1. Connect your GitHub repo
2. Build command: \`npm run build\`
3. Publish directory: \`.next\`

### Self-hosted

\`\`\`bash
npm run build
npm start
\`\`\`

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Just use the Image component:

\`\`\`tsx
import Image from 'next/image';

<Image 
  src="/your-image.jpg" 
  width={800} 
  height={600}
  alt="Description"
/>
\`\`\`

### Font Optimization

Fonts are automatically optimized with \`next/font\`

### Code Splitting

Next.js automatically code-splits your application

## Troubleshooting

### Build Errors

\`\`\`bash
# Clear cache
rm -rf .next
npm run build
\`\`\`

### Port Already in Use

\`\`\`bash
# Use different port
PORT=3001 npm run dev
\`\`\`

### Node Version Issues

\`\`\`bash
# Check version
node --version

# Use nvm to switch
nvm use 20
\`\`\`

## Next Steps

1. Add real images to \`public/images/\`
2. Set up blog CMS (Sanity/MDX)
3. Configure email newsletter integration
4. Add analytics (Google Analytics, Plausible)
5. Set up SEO optimization
6. Add sitemap and robots.txt
7. Configure social media meta tags

## Support

For issues or questions, please open an issue on GitHub or contact info@guasha.la
