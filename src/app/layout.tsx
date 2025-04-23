import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TimerProvider } from "@/context/TimerContext";

// Fredoka 폰트 설정
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tik Do",
  description: "Tik Do: boost your productivity.",
  icons: {
    icon: "/favicon.png", // 이 부분!
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} antialiased`}>
        <TimerProvider>{children}</TimerProvider>
      </body>
    </html>
  );
}
