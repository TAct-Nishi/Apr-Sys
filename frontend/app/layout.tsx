// app/layout.tsx
import './globals.css' // 必要なCSSをimport

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  )
}
