import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

import { CookieProvider } from "@/contexts/CookieContext";
import CookieConsent from "@/components/shared/CookieConsent";



const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Al-Asr ( Islamic Service )",
    template: "%s | Al-Asr ( Islamic Service )"
  },
  description: "Islamic Services, Calendar Events, and Community Programs",
  metadataBase: new URL("https://al-asr.centers.pk"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Asr Islamic Service",
  },
  openGraph: {
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    url: "https://al-asr.centers.pk",
    siteName: "Al-Asr Islamic Service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al-Asr Islamic Service",
        type: "image/png",
      },
    ],
    locale: "ur_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://al-asr.centers.pk" },
  applicationName: "Al-Asr Islamic Service",
  authors: [{ name: "Al-Asr Islamic Service" }],
  generator: "Next.js",
  keywords: ["islamic", "prayer", "quran", "muslim", "community", "religious"],
  creator: "Al-Asr Islamic Service",
  publisher: "Al-Asr Islamic Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#991b1b',
  colorScheme: 'light',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ur"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* ✅ Font preloading for better performance */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" 
          as="style" 
        />
        
        {/* ✅ YOUR EXISTING META TAGS - KEEP AS IS */}
        <meta name="application-name" content="Al-Asr Islamic Service" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Al-Asr" />
        <meta name="description" content="Islamic Services, Calendar Events, and Community Programs" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#991b1b" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#991b1b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* ✅ Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
        
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* ✅ Viewport meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/android/android-launchericon-48-48.png" />

        {/* ✅ Google Fonts - Optimized */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
        />

        {/* ✅ OG + Twitter Meta */}
        <meta property="og:image" content="https://al-asr.centers.pk/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Al-Asr Islamic Service" />
        <meta name="twitter:image" content="https://al-asr.centers.pk/og-image.png" />
        <meta name="twitter:image:alt" content="Al-Asr Islamic Service" />

        {/* ✅ Prevent dark-mode filter */}
        <meta name="darkreader-lock" />

        {/* ✅ CRITICAL CSS - PERFORMANCE OPTIMIZED */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /*! Critical Above-the-Fold CSS - Optimized for LCP */
              :root {
                --background: #ffffff;
                --foreground: #171717;
                --header-bg: #991b1b;
                --header-text: #ffffff;
              }
              
              [data-theme="dark"] {
                --background: #1a1a1a;
                --foreground: #f5f5f5;
                --header-bg: #2d2d2d;
                --header-text: #f5f5f5;
              }
              
              * {
                box-sizing: border-box;
              }
              
              html {
                scroll-behavior: smooth;
              }
              
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                margin: 0;
                padding: 0;
                background: var(--background);
                color: var(--foreground);
                line-height: 1.6;
                overflow-x: hidden;
                min-height: 100vh;
              }
              
              /* LCP Optimization */
              .lcp-optimize {
                content-visibility: auto;
                contain-intrinsic-size: 400px;
              }
              
              /* Header Critical Styles */
              .header-critical {
                background: var(--header-bg) !important;
                color: var(--header-text) !important;
              }
              
              /* Main Content Area */
              #main-content {
                min-height: 100vh;
              }
              
              /* Accessibility */
              .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
              }
              
              /* Focus styles for accessibility */
              button:focus-visible,
              a:focus-visible {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
                border-radius: 2px;
              }
              
              /* Loading states */
              .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }
              
              @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              
              /* Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                * {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }

              /* Install Button Styles */
              #install-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                background: #991b1b;
                color: white;
                border: none;
                padding: 12px 16px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                display: none;
                align-items: center;
                gap: 8px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.2);
              }

              #install-button:hover {
                background: #7f1d1d;
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(0,0,0,0.4);
              }

              #install-button:active {
                transform: translateY(0);
              }

              @media (max-width: 768px) {
                #install-button {
                  bottom: 80px;
                  right: 20px;
                  padding: 14px 18px;
                  font-size: 15px;
                }
              }

              /* Global Loader Styles */
              .global-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(8px);
              }

              .loader-spinner {
                width: 48px;
                height: 48px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid #ffffff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }

              .loader-text {
                color: white;
                margin-top: 16px;
                font-size: 14px;
                font-weight: 500;
              }
            `,
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* ✅ Performance Monitoring - Only in development */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        
        {/* ✅ PWA Install Button - FIXED POSITION */}
        <button 
          id="install-button" 
          aria-label="Install App"
          style={{ display: 'none' }}
        >
          <span style={{ fontSize: '18px' }}>📱</span>
          Install App
        </button>

       

          <CookieProvider>
            <ThemeProvider>
              <ApolloWrapper>
                {/* ✅ LCP OPTIMIZATION - Added lcp-optimize class */}
                <main 
                  role="main" 
                  id="main-content" 
                  tabIndex={-1} 
                  className="min-h-screen lcp-optimize"
                >
                  {children}
                </main>
              </ApolloWrapper>
            </ThemeProvider>
            {/* ✅ Cookie Consent Banner */}
            <CookieConsent />
          </CookieProvider>
   

        {/* ✅ Analytics - Only in production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}

        {/* ✅ PERFORMANCE OPTIMIZED PWA SCRIPT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let deferredPrompt;
                let installButton;

                function initializePWA() {
                  installButton = document.getElementById('install-button');
                  
                  if (!installButton) return;

                  // Install button click handler
                  installButton.addEventListener('click', async function() {
                    if (deferredPrompt) {
                      try {
                        deferredPrompt.prompt();
                        const choiceResult = await deferredPrompt.userChoice;
                        
                        if (choiceResult.outcome === 'accepted') {
                          hideInstallButton();
                        }
                        
                        deferredPrompt = null;
                      } catch (error) {
                        console.error('Error during install prompt:', error);
                      }
                    }
                  });

                  // Check if already installed
                  if (isPWAInstalled()) {
                    hideInstallButton();
                    return;
                  }
                }

                // Before install prompt event
                window.addEventListener('beforeinstallprompt', function(e) {
                  e.preventDefault();
                  deferredPrompt = e;
                  
                  // Show install button after a short delay
                  setTimeout(function() {
                    if (!isPWAInstalled() && deferredPrompt && installButton) {
                      installButton.style.display = 'flex';
                      
                      // Auto-hide after 15 seconds
                      setTimeout(function() {
                        if (installButton.style.display !== 'none') {
                          hideInstallButton();
                        }
                      }, 15000);
                    }
                  }, 2000);
                });

                // After app is installed
                window.addEventListener('appinstalled', function(evt) {
                  hideInstallButton();
                  deferredPrompt = null;
                });

                // Page load event - OPTIMIZED FOR LCP
                window.addEventListener('load', function() {
                  initializePWA();
                  
                  // Service Worker Registration - DEFERRED FOR LCP
                  setTimeout(function() {
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(registration) {
                          console.log('SW registered: ', registration);
                        })
                        .catch(function(registrationError) {
                          console.log('SW registration failed: ', registrationError);
                        });
                    }
                  }, 1000);
                });

                function hideInstallButton() {
                  if (installButton) {
                    installButton.style.display = 'none';
                  }
                }

                function isPWAInstalled() {
                  return window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
                }

                // LCP Optimization - Preload critical image
                function optimizeLCP() {
                  const lcpCandidate = document.querySelector('img[loading="eager"]');
                  if (lcpCandidate && 'fetch' in window) {
                    // Preload LCP image
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'image';
                    link.href = lcpCandidate.src;
                    document.head.appendChild(link);
                  }
                }

                // Initialize when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    initializePWA();
                    optimizeLCP();
                  });
                } else {
                  initializePWA();
                  optimizeLCP();
                }
              })();
            `,
          }}
        />

        {/* ✅ Font loading optimization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Optimize font loading
              const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
              if (fontLink) {
                fontLink.onload = function() {
                  this.media = 'all';
                };
              }

              // Enhanced loading state management
              document.addEventListener('DOMContentLoaded', function() {
                // Hide any lingering loaders when page is fully loaded
                setTimeout(function() {
                  const loaders = document.querySelectorAll('[data-loader]');
                  loaders.forEach(loader => {
                    loader.style.display = 'none';
                  });
                }, 1000);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}