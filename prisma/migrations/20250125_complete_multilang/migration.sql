-- Complete Multi-Language Migration
-- Adds all missing multi-language fields for ALL tables

-- ============================================================
-- AboutSection - Add missing titleEn
-- ============================================================
ALTER TABLE "AboutSection" 
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT;

-- ============================================================
-- BenefitItem - Add missing titleEn
-- ============================================================
ALTER TABLE "BenefitItem"
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT;

-- ============================================================
-- Product - Add multi-language fields (NEW!)
-- ============================================================
ALTER TABLE "Product"
  ADD COLUMN IF NOT EXISTS "nameTh" TEXT,
  ADD COLUMN IF NOT EXISTS "nameEn" TEXT,
  ADD COLUMN IF NOT EXISTS "nameZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT,
  ADD COLUMN IF NOT EXISTS "featuresTh" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "featuresEn" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "featuresZh" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "benefitsTh" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "benefitsEn" TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "benefitsZh" TEXT[] DEFAULT '{}';

-- ============================================================
-- BlogPost - Add multi-language fields (NEW!)
-- ============================================================
ALTER TABLE "BlogPost"
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "excerptTh" TEXT,
  ADD COLUMN IF NOT EXISTS "excerptEn" TEXT,
  ADD COLUMN IF NOT EXISTS "excerptZh" TEXT,
  ADD COLUMN IF NOT EXISTS "contentTh" TEXT,
  ADD COLUMN IF NOT EXISTS "contentEn" TEXT,
  ADD COLUMN IF NOT EXISTS "contentZh" TEXT;

-- ============================================================
-- FAQ - Add multi-language fields (NEW!)
-- ============================================================
ALTER TABLE "FAQ"
  ADD COLUMN IF NOT EXISTS "questionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "questionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "questionZh" TEXT,
  ADD COLUMN IF NOT EXISTS "answerTh" TEXT,
  ADD COLUMN IF NOT EXISTS "answerEn" TEXT,
  ADD COLUMN IF NOT EXISTS "answerZh" TEXT;

-- ============================================================
-- HeroSection - Add multi-language fields
-- ============================================================
ALTER TABLE "HeroSection"
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "subtitleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "subtitleEn" TEXT,
  ADD COLUMN IF NOT EXISTS "subtitleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT,
  ADD COLUMN IF NOT EXISTS "ctaTextTh" TEXT,
  ADD COLUMN IF NOT EXISTS "ctaTextEn" TEXT,
  ADD COLUMN IF NOT EXISTS "ctaTextZh" TEXT;
