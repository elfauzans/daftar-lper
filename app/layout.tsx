import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Koperasi LPER - Pendaftaran Anggota Online",
    template: "%s | Koperasi LPER",
  },
  description:
    "Daftar anggota Koperasi LPER secara online. Koperasi simpan pinjam terpercaya untuk pemberdayaan ekonomi masyarakat Indonesia.",
  keywords: [
    "koperasi LPER",
    "daftar koperasi online",
    "koperasi simpan pinjam",
    "anggota koperasi",
    "koperasi indonesia",
  ],
  authors: [{ name: "Koperasi LPER" }],
  metadataBase: new URL("https://daftar.koperasilper.com"),

  openGraph: {
    title: "Koperasi LPER",
    description:
      "Pendaftaran anggota koperasi online yang mudah dan terpercaya.",
    url: "https://daftar.koperasilper.com",
    siteName: "Koperasi LPER",
    images: [
      {
        url: "/logo_lper.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Koperasi LPER",
    description: "Daftar anggota koperasi online sekarang",
    images: ["/logo_lper.png"],
  },

  icons: {
    icon: "/logo_lper.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <head>
        {/* 🔥 STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Koperasi LPER",
              url: "https://daftar.koperasilper.com",
              logo: "https://daftar.koperasilper.com/logo_lper.png",
              description:
                "Koperasi LPER adalah lembaga pemberdayaan ekonomi masyarakat Indonesia.",
            }),
          }}
        />
      </head>

      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
