import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Providers } from "./providers";

const notoSansLao = Noto_Sans_Lao({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["lao"],
  variable: "--font-lao",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  title: "NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ",
  description: "NAMNGAM ຄູ່ມືການນວດກັວຊາ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ ດ້ວຍວິທີທຳມະຊາດທີ່ປອດໄພ",
  keywords: ["ກັວຊາ", "Gua Sha", "NAMNGAM", "ຄວາມງາມ", "ສຸຂະພາບ", "ນວດ", "ຜິວໜ້າ", "ທຳມະຊາດ", "ລາວ"],
  authors: [{ name: "NAMNGAM" }],
  openGraph: {
    title: "NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ",
    description: "NAMNGAM ຄູ່ມືການນວດກັວຊາ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ ດ້ວຍວິທີທຳມະຊາດທີ່ປອດໄພ",
    type: "website",
    locale: "lo_LA",
    siteName: "NAMNGAM",
    images: [
      {
        url: "/Logo-namngam-white.png",
        width: 1200,
        height: 630,
        alt: "NAMNGAM Gua Sha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ",
    description: "NAMNGAM ຄູ່ມືການນວດກັວຊາ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ",
    images: ["/Logo-namngam-white.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo">
      <body className={`${notoSansLao.variable} antialiased`}>
        {/* Google Analytics - ใส่ Measurement ID ของลูกค้า */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
