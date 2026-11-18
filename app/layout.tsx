import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { UTMTracking } from "@/components/tracking/UTMTracking";
import { VkDigitalPixel } from "@/components/tracking/VkDigitalPixel";

export const metadata: Metadata = {
  title: "Cordelia",
  description: "Landings de Cordelia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <UTMTracking />
        <Suspense fallback={null}><MetaPixel /></Suspense>
        <VkDigitalPixel />
        {children}
      </body>
    </html>
  );
}
