import "./globals.css";

export const metadata = {
  title: "Optosystem",
  description: "Desenvolvido por Wilker Martins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
