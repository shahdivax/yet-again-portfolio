import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ChatBot } from "../components/ChatBot";

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
title: "Divax Shah",
description: "AI enthusiast and engineer building premium-grade AI systems.",
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
defaultTheme="dark"
enableSystem
disableTransitionOnChange
>
<div className="relative z-[2] w-full overflow-hidden min-h-screen dot-grid-bg">
{children}
</div>
<ChatBot />
</ThemeProvider>
</body>
</html>
);
}