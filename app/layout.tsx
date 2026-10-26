import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "몽실 미용실 관리",
  description: "반려동물 미용실 고객·강아지·미용 기록 관리",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
