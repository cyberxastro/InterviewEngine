import type { Metadata } from "next";
import { Inter, Rajdhani, Karma } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';
const inter = Karma({weight:"700" , subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContentCraft",
  description: "AI Content Generation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: shadesOfPurple,
    }}
    >
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

        {children}
        <Toaster/>
        </ThemeProvider>
        
        </body>
    </html>
    </ClerkProvider>
  );
}
