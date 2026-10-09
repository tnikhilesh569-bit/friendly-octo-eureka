import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Lumi - Luxury Communication Platform',
  description: 'Enterprise-grade luxury communication app with neumorphic design',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#E2B8A8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Lumi ServiceWorker registered successfully.');
                    },
                    function(err) {
                      console.log('Lumi ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#F7F0EC] text-[#4A3B32] min-h-screen antialiased selection:bg-[#E2B8A8] selection:text-white">
        {children}
      </body>
    </html>
  );
}
