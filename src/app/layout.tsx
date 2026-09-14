import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "30-Day Communication Transformation | Speak Confidently",
  description: "Transform your English communication in 30 days. Build fluency, confidence, and professional speaking skills through daily practice — not passive study.",
  keywords: "English communication, speaking practice, fluency, PREP framework, business English, pronunciation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || t === 'light') {
                  document.documentElement.setAttribute('data-theme', t);
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
