import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AdSense from "./components/AdSense";

// Define font with FontSans
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Define the type for the component's props
interface RootLayoutProps {
  children: React.ReactNode;
}

// Define metadata for SEO and PWA
const metadata = {
  title: "Ontario Pulse - Your Source for News and Trends in Ontario",
  description: "Explore up-to-the-minute news and insights across tech, business, and politics in Ontario.",
  author: "Touhidul Islam Chayan",
  keywords: "Ontario news, Ontario tech, Ontario politics, Ontario business, Canada news, local news, Ontario events",
};

// Component definition
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* <AdSense pId="ca-pub-1234567890123456"/> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ontariopulse.com/og-image.jpg" />
        <meta property="og:url" content="https://ontariopulse.com/" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
