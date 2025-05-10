import './globals.css'

export const metadata = {
  title: 'Jovify',
  description: 'Plataforma de autoconhecimento Jovify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
