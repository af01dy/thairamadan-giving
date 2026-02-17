import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thairamadan.com"),

  title: {
    default: "Thairamadan",
    template: "%s | Thairamadan",
  },

  description:
    "ร่วมบริจาคเพื่อสนับสนุนโครงการรอมฎอนในประเทศไทย เช่น ซะกาต อาหารละศีลอด น้ำสะอาด และความช่วยเหลือทางการแพทย์ เพื่อสร้างประโยชน์แก่สังคมอย่างยั่งยืน",

  openGraph: {
    title: "Thairamadan",
    description:
      "ร่วมบริจาคเพื่อสนับสนุนโครงการรอมฎอนในประเทศไทย เช่น ซะกาต อาหารละศีลอด น้ำสะอาด และความช่วยเหลือทางการแพทย์ เพื่อสร้างประโยชน์แก่สังคมอย่างยั่งยืน",
    url: "https://thairamadan.com",
    siteName: "Thairamadan",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/banner.jpg", // from /public/banner.jpg
        width: 1200,
        height: 630,
        alt: "Thairamadan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Thairamadan",
    description:
      "ร่วมบริจาคเพื่อสนับสนุนโครงการรอมฎอนในประเทศไทย เช่น ซะกาต อาหารละศีลอด น้ำสะอาด และความช่วยเหลือทางการแพทย์ เพื่อสร้างประโยชน์แก่สังคมอย่างยั่งยืน",
    images: ["/banner.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}