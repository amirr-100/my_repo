import './globals.css'

export const metadata = {
  title: 'Sierra Explorer - Discover Sierra Leone',
  description: 'Your ultimate travel companion for discovering pristine beaches, lush mountains, and rich cultural heritage in Sierra Leone.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
