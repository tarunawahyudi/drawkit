import { Work_Sans } from "next/font/google";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

import Room from "./Room";

export const metadata = {
  title: "Secondbrain - Draw",
  description: "Enjoy draw with a collaboration feature",
  icons: [
    {
      url: "/assets/logo-dark.svg",
      href: "/assets/logo-dark.svg",
    },
  ],
  authors: [
    {
      name: "Taruna Wahyudi",
      url: "https://tarunawahyudi.github.io"
    }
  ]
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body className={`${workSans.className} bg-primary-grey-200`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;
