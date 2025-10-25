#!/usr/bin/env node
/**
 * Check VPS Database - Multi-Language Data Verification
 * Run on VPS: node check-vps-database.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('🔍 NAMNGAM VPS DATABASE CHECK\n');
console.log('='.repeat(60));

async function main() {
  try {
    // ===== CHECK 1: About Section =====
    console.log('\n📄 ABOUT SECTION:');
    console.log('-'.repeat(60));
    
    const about = await prisma.aboutSection.findFirst();
    if (about) {
      console.log('✅ About Section Found (ID:', about.id + ')');
      console.log('\n🇱🇦 Lao (Required):');
      console.log('  Title:', about.title || '❌ MISSING');
      console.log('  Description:', about.description?.substring(0, 50) + '...' || '❌ MISSING');
      
      console.log('\n🇹🇭 Thai:');
      console.log('  Title:', about.titleTh || '⚠️ Not translated');
      console.log('  Description:', about.descriptionTh?.substring(0, 50) + '...' || '⚠️ Not translated');
      
      console.log('\n🇺🇸 English:');
      console.log('  Title:', about.titleEn || '⚠️ Not translated');
      console.log('  Description:', about.descriptionEn?.substring(0, 50) + '...' || '⚠️ Not translated');
      
      console.log('\n🇨🇳 Chinese:');
      console.log('  Title:', about.titleZh || '⚠️ Not translated');
      console.log('  Description:', about.descriptionZh?.substring(0, 50) + '...' || '⚠️ Not translated');
      
      // Check if multi-language is complete
      const hasAllLanguages = about.titleTh && about.titleEn && about.titleZh &&
                              about.descriptionTh && about.descriptionEn && about.descriptionZh;
      
      if (hasAllLanguages) {
        console.log('\n✅ COMPLETE: All 4 languages available!');
      } else {
        console.log('\n⚠️ INCOMPLETE: Missing some translations');
      }
    } else {
      console.log('❌ No About Section found in database!');
      console.log('   → Need to create one in Admin panel');
    }

    // ===== CHECK 2: Benefits =====
    console.log('\n\n💎 BENEFITS:');
    console.log('-'.repeat(60));
    
    const benefits = await prisma.benefitItem.findMany({
      orderBy: { order: 'asc' },
      take: 5
    });
    
    if (benefits.length > 0) {
      console.log(`✅ Found ${benefits.length} benefits\n`);
      
      benefits.forEach((benefit, index) => {
        console.log(`\n${index + 1}. ${benefit.title}`);
        console.log(`   🇱🇦 Lao: ${benefit.title}`);
        console.log(`   🇹🇭 Thai: ${benefit.titleTh || '⚠️ Not translated'}`);
        console.log(`   🇺🇸 English: ${benefit.titleEn || '⚠️ Not translated'}`);
        console.log(`   🇨🇳 Chinese: ${benefit.titleZh || '⚠️ Not translated'}`);
        
        const hasAllLang = benefit.titleTh && benefit.titleEn && benefit.titleZh;
        console.log(`   Status: ${hasAllLang ? '✅ Complete' : '⚠️ Incomplete'}`);
      });
      
      const completeCount = benefits.filter(b => 
        b.titleTh && b.titleEn && b.titleZh &&
        b.descriptionTh && b.descriptionEn && b.descriptionZh
      ).length;
      
      console.log(`\n📊 Summary: ${completeCount}/${benefits.length} benefits have all 4 languages`);
    } else {
      console.log('❌ No benefits found in database!');
      console.log('   → Need to create them in Admin panel');
    }

    // ===== CHECK 3: Products =====
    console.log('\n\n🛍️ PRODUCTS:');
    console.log('-'.repeat(60));
    
    const products = await prisma.product.findMany({ take: 3 });
    
    if (products.length > 0) {
      console.log(`✅ Found ${products.length} products\n`);
      
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   🇱🇦 Name: ${product.name}`);
        console.log(`   🇹🇭 NameTh: ${product.nameTh || '⚠️ Not available'}`);
        console.log(`   🇺🇸 NameEn: ${product.nameEn || '⚠️ Not available'}`);
        console.log(`   🇨🇳 NameZh: ${product.nameZh || '⚠️ Not available'}`);
      });
      
      console.log('\n⚠️ Note: Products currently only support single language');
      console.log('   Use Option B (AI translation) for multi-language');
    } else {
      console.log('⚠️ No products found');
    }

    // ===== CHECK 4: Blog =====
    console.log('\n\n📝 BLOG POSTS:');
    console.log('-'.repeat(60));
    
    const posts = await prisma.blogPost.findMany({ 
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    
    if (posts.length > 0) {
      console.log(`✅ Found ${posts.length} blog posts\n`);
      
      posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Published: ${post.published ? '✅ Yes' : '❌ No'}`);
      });
      
      console.log('\n⚠️ Note: Blog posts currently only support single language');
    } else {
      console.log('⚠️ No blog posts found');
    }

    // ===== CHECK 5: FAQ =====
    console.log('\n\n❓ FAQ:');
    console.log('-'.repeat(60));
    
    const faqs = await prisma.fAQ.findMany({ take: 3 });
    
    if (faqs.length > 0) {
      console.log(`✅ Found ${faqs.length} FAQs\n`);
      faqs.forEach((faq, index) => {
        console.log(`${index + 1}. ${faq.question}`);
      });
      console.log('\n⚠️ Note: FAQs currently only support single language');
    } else {
      console.log('⚠️ No FAQs found');
    }

    // ===== SUMMARY =====
    console.log('\n\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    
    const aboutComplete = about && about.titleTh && about.titleEn && about.titleZh;
    const benefitsComplete = benefits.length > 0 && benefits.every(b => 
      b.titleTh && b.titleEn && b.titleZh
    );
    
    console.log('\n✅ Multi-Language Status:');
    console.log(`  About: ${aboutComplete ? '✅ COMPLETE' : '⚠️ INCOMPLETE'}`);
    console.log(`  Benefits: ${benefitsComplete ? '✅ COMPLETE' : '⚠️ INCOMPLETE'}`);
    console.log(`  Products: ⚠️ Single language only`);
    console.log(`  Blog: ⚠️ Single language only`);
    console.log(`  FAQ: ⚠️ Single language only`);
    
    console.log('\n💡 Recommendations:');
    if (!aboutComplete) {
      console.log('  1. Go to Admin → About → Click 🪄 Auto-translate → Save');
    }
    if (!benefitsComplete) {
      console.log('  2. Go to Admin → Benefits → Edit each → Click 🪄 Auto-translate → Save');
    }
    if (products.length === 0) {
      console.log('  3. Add products in Admin → Products');
    }
    
    console.log('\n🎯 Expected Result:');
    console.log('  After auto-translate, frontend should display content in:');
    console.log('  🇱🇦 Lao | 🇹🇭 Thai | 🇺🇸 English | 🇨🇳 Chinese');
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Database check complete!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check DATABASE_URL in .env');
    console.error('  2. Ensure PostgreSQL is running');
    console.error('  3. Run: npx prisma db push');
  } finally {
    await prisma.$disconnect();
  }
}

main();
