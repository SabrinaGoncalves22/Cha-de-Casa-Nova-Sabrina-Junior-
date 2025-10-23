import "./globals.css";

export const metadata = {
  title: "Chá de Casa Nova – Sabrina & Junior 💍",
  description: "Lista de presentes com confirmação de presença automática.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
