#!/bin/bash
echo "🔍 Testing Production Database Connection..."
echo ""

# Try to SSH and check database
timeout 10 ssh -o ConnectTimeout=5 root@167.86.84.139 << 'REMOTE'
cd /var/www/namngam

echo "=== DATABASE URL ==="
cat .env | grep DATABASE_URL

echo ""
echo "=== CHECKING ABOUT SECTION ==="
npm run db:check-about 2>/dev/null || node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.aboutSection.findFirst().then(about => {
  if (about) {
    console.log('✅ About Section exists');
    console.log('Title (Lao):', about.title);
    console.log('Title (Thai):', about.titleTh || 'NULL');
    console.log('Title (English):', about.titleEn || 'NULL');
    console.log('Title (Chinese):', about.titleZh || 'NULL');
  } else {
    console.log('❌ No About Section found');
  }
  prisma.\$disconnect();
});
"

echo ""
echo "=== CHECKING BENEFITS ==="
npm run db:check-benefits 2>/dev/null || node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.benefitItem.findMany({ take: 2 }).then(benefits => {
  console.log('Found', benefits.length, 'benefits');
  benefits.forEach((b, i) => {
    console.log(\`Benefit \${i+1}:\`, b.title, '| Thai:', b.titleTh || 'NULL');
  });
  prisma.\$disconnect();
});
"
REMOTE
