export const metadata = {
  title: "Chá de Casa Nova — Sabrina & Júnior 💍",
  description: "Lista de presentes com confirmação automática de presença.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
