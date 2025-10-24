import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import FacebookPixel from "./components/FacebookPixel";
import { Providers } from "./providers";

const notoSansLao = Noto_Sans_Lao({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["lao"],
  variable: "--font-lao",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: {
    default: "NAMNGAM - Gua Sha ກັວຊາ | ຄວາມງາມແລະສຸຂະພາບທຳມະຊາດ",
    template: "%s | NAMNGAM Gua Sha"
  },
  description: "ເຄື່ອງມືກັວຊາແທ້ແລະຄູ່ມືການນວດດັ້ງເດີມຂອງຈີນ ເພື່ອສຸຂະພາບແລະຄວາມງາມຂອງຜິວໜ້າ ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ປັບປຸງການໄຫຼວຽນຂອງເລືອດ ວິທີທຳມະຊາດທີ່ປອດໄພ 100%",
  keywords: [
    // Lao keywords
    "ກັວຊາ", "ກັວຊາລາວ", "NAMNGAM", "ນ້ຳງາມ", "ຄວາມງາມ", "ສຸຂະພາບ", "ນວດໜ້າ", "ຜິວໜ້າ", "ທຳມະຊາດ", 
    "ຫຼຸດຮອຍຊ້ຳ", "ຍົກກະຊັບໜ້າ", "ນວດກັວຊາ", "ເຄື່ອງມືກັວຊາ", "ກັວຊາໄມ້ກ່ຽງ", "ກັວຊາກົ້ນໝູ",
    // Thai keywords  
    "กัวช่า", "กัวช่าลาว", "นวดหน้า", "ความงาม", "ดูแลผิว", "ลดริ้วรอย", "ยกกระชับ",
    // English keywords
    "Gua Sha", "Gua Sha Laos", "facial massage", "natural beauty", "skincare", "jade roller",
    "rose quartz", "facial tools", "anti-aging", "face lift", "blood circulation",
    // Chinese keywords
    "刮痧", "面部刮痧", "美容", "护肤", "天然美容"
  ],
  authors: [{ name: "NAMNGAM", url: "https://namngam.com" }],
  creator: "NAMNGAM",
  publisher: "NAMNGAM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/Logo-namngam-gold.png", sizes: "any" },
      { url: "/Logo-namngam-gold.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/Logo-namngam-gold.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/Logo-namngam-gold.png",
      },
    ],
  },
  openGraph: {
    title: "NAMNGAM - Gua Sha ກັວຊາ | ຄວາມງາມແລະສຸຂະພາບທຳມະຊາດ",
    description: "ເຄື່ອງມືກັວຊາແທ້ແລະຄູ່ມືການນວດດັ້ງເດີມຂອງຈີນ ເພື່ອສຸຂະພາບແລະຄວາມງາມຂອງຜິວໜ້າ ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ປັບປຸງການໄຫຼວຽນຂອງເລືອດ ວິທີທຳມະຊາດທີ່ປອດໄພ 100%",
    url: "https://namngam.com",
    type: "website",
    locale: "lo_LA",
    siteName: "NAMNGAM Gua Sha",
    images: [
      {
        url: "/Logo-namngam-gold.png",
        width: 1200,
        height: 630,
        alt: "NAMNGAM - Gua Sha Tools & Facial Massage Guide",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAMNGAM - Gua Sha ກັວຊາ | ຄວາມງາມແລະສຸຂະພາບທຳມະຊາດ",
    description: "ເຄື່ອງມືກັວຊາແທ້ແລະຄູ່ມືການນວດດັ້ງເດີມ ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ວິທີທຳມະຊາດທີ່ປອດໄພ",
    images: ["/Logo-namngam-gold.png"],
    creator: "@namngam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://namngam.com",
    languages: {
      "lo": "https://namngam.com",
      "th": "https://namngam.com",
      "en": "https://namngam.com",
      "zh": "https://namngam.com",
    },
  },
  verification: {
    google: "KvTYevRB510KBEMrR3rUwOL_CYP1AhDrRfJ1wAIpipM",
  },
  category: "beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo">
      <body className={`${notoSansLao.variable} antialiased`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
