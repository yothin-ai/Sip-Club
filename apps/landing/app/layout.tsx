import type { Metadata } from "next";
import { Anuphan, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sip Club — ผู้ช่วยชงกาแฟดริป",
  description:
    "ถ่ายรูปถุงกาแฟ ให้ AI วิเคราะห์ roast/process แล้วคำนวณเบอร์บด อุณหภูมิ และจังหวะเทน้ำ ให้ตรงกับเครื่องที่คุณมีจริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${anuphan.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-heading">{children}</body>
    </html>
  );
}
