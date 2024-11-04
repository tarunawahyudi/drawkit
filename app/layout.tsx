import type { Metadata } from "next";
import "./globals.css";
import {Work_Sans} from "next/font/google";
import {Room} from "@/app/Room";

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "DrawKit",
  description: "UI UX Design tool kit",
  authors: {
    name: "taruna",
    url: "https://github.com/tarunawahyudi"
  },
  icons: {
    icon: '/assets/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased bg-primary-grey-200`}
        suppressHydrationWarning
      >
        <Room>
          {children}
        </Room>
      </body>
    </html>
  );
}
