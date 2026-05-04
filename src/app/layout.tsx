import type { Metadata } from "next";
import "./globals.css";
import { Providers }    from "./providers";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Starylo — Explore the World, Find Your Crew",
  description:
    "Connect with fellow travelers, discover hidden city gems, and book verified local guides. Free forever.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {/* Custom warm cursor — hidden on touch devices */}
        <CustomCursor />

        <Providers>
          {/* Lenis smooth scroll with inertia */}
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
