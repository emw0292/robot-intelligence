import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Robot Intelligence | 로봇·AI 정책·산업·기술 동향",
    template: "%s | Robot Intelligence",
  },
  description:
    "국내외 로봇·AI 정책, 산업, 기술, R&D, 표준·인증 동향을 통합 제공하는 Intelligence Platform",
  keywords: ["로봇", "AI", "정책", "산업", "기술", "R&D", "표준", "인증"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Robot Intelligence",
    title: "Robot Intelligence | 로봇·AI 정책·산업·기술 동향",
    description: "전략기획자를 위한 로봇·AI 정책·산업·기술 통합 분석 플랫폼",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Robot Intelligence 전략 대시보드" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robot Intelligence | 로봇·AI 정책·산업·기술 동향",
    description: "전략기획자를 위한 로봇·AI 정책·산업·기술 통합 분석 플랫폼",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Navigation />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
