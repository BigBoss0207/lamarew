import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fontSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fontSans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lamare (라마레) | Luxury House Wedding Hall",
    template: "%s | Lamare (라마레)",
  },
  description:
    "일광 해수욕장 오션뷰, 라마레만의 공간. 아이보리 & 로즈 핑크, 로즈 골드 액센트의 프라이빗 하우스 웨딩홀 Lamare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--color-ivory)] text-[color:var(--color-foreground)]">
        <SiteHeader />
        <main className="flex-1 pt-[72px]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
