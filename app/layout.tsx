import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue, Caveat, Rozha_One } from "next/font/google";
import "./globals.css";
import { name, role } from "@/data/content";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-condensed",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-signature",
});

const rozha = Rozha_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-devanagari",
});

const pageTitle = `${name} — ${role}`;
const description =
  "A Computer Science student at MLRIT, building AI-powered products with a focus on full-stack web development and machine learning.";
const canonicalUrl = "https://sujeel.com";

export const metadata: Metadata = {
  title: pageTitle,
  description: description,
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: description,
    url: canonicalUrl,
    siteName: name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${bebas.variable} ${caveat.variable} ${rozha.variable} font-sans bg-[#e5e5e7] dark:bg-[#09080d] text-[#111111] dark:text-[#f3f4f6] antialiased selection:bg-[#ff3b11]/30 selection:text-[#ff3b11] overflow-x-hidden transition-colors duration-400`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sujeel Marapatla",
              jobTitle: "Student",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "MLR Institute of Technology",
              },
              knowsAbout: [
                "Python",
                "Java",
                "C",
                "SQL",
                "Machine Learning",
                "Full-Stack Development",
              ],
              url: canonicalUrl,
            }),
          }}
        />
      </body>
    </html>
  );
}
