'use client';
import React from 'react';
import Header from './Header';
import Footer from './Footer';



interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
      {/* <CategoriesTab /> ✅ YEH ADD KARO */}
        
    

    </div>
  );
};

export default Layout;