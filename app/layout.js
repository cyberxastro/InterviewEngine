import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "./dashboard/_components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InterviewEngine",
  description: "Your Ai Interview Buddy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body className={inter.className} >

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
