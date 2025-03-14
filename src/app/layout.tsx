import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { AuroraBackground } from "@/components/ui/aurora-background";

const sansserif = Poppins({
  weight: ["100", "300", "200", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "card game counting",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${sansserif.className}  antialiased`}>
        <GameProvider>
          <AuroraBackground>
            {children}
          </AuroraBackground>
        </GameProvider>
      </body>
    </html>
  );
}
