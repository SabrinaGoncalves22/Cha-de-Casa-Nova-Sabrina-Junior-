import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chá de Casa Nova – Sabrina & Junior 💍",
  description: "Lista de presentes com reserva e confirmação de presença."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
