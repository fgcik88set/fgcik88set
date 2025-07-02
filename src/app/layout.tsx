import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/session-provider";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import FooterWrapper from "@/components/footer/FooterWrapper";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FGC IK '88",
  description: "Federal Government College Ikot Ekpene 1988 Set",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <HeaderWrapper />
          <Toaster position="top-right" richColors />
          {children}
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
