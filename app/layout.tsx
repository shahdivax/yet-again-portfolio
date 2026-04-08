import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ChatBot } from "../components/ChatBot";
import RoamingPets from "../components/pets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://divaxshah.com"),
  title: "Divax Shah",
  description: "AI Engineer & Founder building premium-grade AI systems, commercial SaaS products, and fine-tuning specialized LLMs/VLMs.",
  openGraph: {
    title: "Divax Shah | AI Engineer & Founder",
    description: "Building premium-grade AI systems, commercial SaaS products, and fine-tuning specialized LLMs/VLMs.",
    url: "https://divaxshah.com",
    siteName: "Divax Shah",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divax Shah | AI Engineer & Founder",
    description: "Building premium-grade AI systems, commercial SaaS products, and fine-tuning specialized LLMs/VLMs.",
    creator: "@divax_shah_",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased selection:bg-[var(--color-accent)] selection:text-black relative z-0`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-[2] w-full overflow-hidden min-h-screen dot-grid-bg">
            {children}
          </div>
          <ChatBot />
          <RoamingPets />
        </ThemeProvider>
      </body>
    </html>
  );
}