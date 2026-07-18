import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Compass - Finanças Pessoais",
  description: "Gerenciamento de finanças pessoais, entradas, despesas com listas, dashboards e relatórios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body style={{ backgroundColor: "#060608" }}>
        {children}
      </body>
    </html>
  );
}
