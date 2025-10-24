-- AlterTable AboutSection - Add multi-language fields
ALTER TABLE "AboutSection" 
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT;

-- AlterTable BenefitItem - Add multi-language fields
ALTER TABLE "BenefitItem"
  ADD COLUMN IF NOT EXISTS "titleTh" TEXT,
  ADD COLUMN IF NOT EXISTS "titleZh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT,
  ADD COLUMN IF NOT EXISTS "descriptionZh" TEXT;

-- AlterTable HeroSection - Add multi-language fields
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
