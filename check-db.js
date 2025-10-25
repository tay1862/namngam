const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('=== CHECKING ABOUT SECTION ===');
    const about = await prisma.aboutSection.findFirst();
    if (about) {
      console.log('ID:', about.id);
      console.log('Title (Lao):', about.title);
      console.log('Title (Thai):', about.titleTh);
      console.log('Title (English):', about.titleEn);
      console.log('Title (Chinese):', about.titleZh);
      console.log('---');
    } else {
      console.log('No About Section found!');
    }

    console.log('\n=== CHECKING BENEFITS ===');
    const benefits = await prisma.benefitItem.findMany({ take: 2 });
    if (benefits.length > 0) {
      benefits.forEach((b, i) => {
        console.log(`\nBenefit ${i + 1}:`);
        console.log('Title (Lao):', b.title);
        console.log('Title (Thai):', b.titleTh);
        console.log('Title (English):', b.titleEn);
        console.log('Title (Chinese):', b.titleZh);
      });
    } else {
      console.log('No Benefits found!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
