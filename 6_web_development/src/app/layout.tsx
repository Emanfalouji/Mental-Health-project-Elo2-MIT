import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SALAM - Safe And Loving Aid for Minds",
  description: "A safe and empathetic platform connecting trauma survivors with mental health professionals and trained volunteers",
  keywords: "mental health, trauma support, PTSD, anxiety, depression, psychological first aid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen`}>
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">SALAM</h1>
                  <p className="text-xs text-gray-600">Safe And Loving Aid for Minds</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
                <a href="/training" className="text-gray-600 hover:text-blue-600 transition-colors">Training</a>
                <a href="/crisis" className="text-gray-600 hover:text-blue-600 transition-colors">Crisis Support</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              </nav>
              <div className="flex items-center space-x-3">
                <a href="/auth/signin" className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2">
                  Sign In
                </a>
                <a href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Get Support
                </a>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">SALAM</span>
                </div>
                <p className="text-gray-600 mb-4 max-w-md">
                  Providing safe, empathetic support for trauma survivors through professional guidance and peer support.
                </p>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-500">Available 24/7</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Confidential & Secure</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Crisis Hotline</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Emergency Resources</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Community Guidelines</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Platform</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Safety Guidelines</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Accessibility</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-500">
                © 2024 SALAM Platform. All rights reserved. | If you're in crisis, please contact emergency services immediately.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}