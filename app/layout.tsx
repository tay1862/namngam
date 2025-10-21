import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";

const notoSansLao = Noto_Sans_Lao({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["lao"],
  variable: "--font-lao",
});

export const metadata: Metadata = {
  title: "NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ",
  description: "NAMNGAM ຄູ່ມືການນວດກັວຊາ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo">
      <body className={`${notoSansLao.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
