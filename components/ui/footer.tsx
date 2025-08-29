import React from 'react';

const Footer: React.FC = () => {
    return(
  <footer
    className="glass-card mt-20 py-8 px-4 w-full text-center flex flex-col md:flex-row items-center justify-between neon-cyan border-t border-cyan-400/30"
    aria-label="Site Footer"
  >
    <div className="flex flex-col md:flex-row items-center gap-4">
      <span className="font-bold text-lg neon-cyan">Zaddy</span>
      <nav className="flex gap-4 text-sm">
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/packages" className="hover:underline">Packages</a>
        <a href="/reviews" className="hover:underline">Reviews</a>
      </nav>
    </div>
    <div className="mt-4 md:mt-0 text-xs text-muted-foreground">
      © {new Date().getFullYear()} Zaddy. All rights reserved.
    </div>
    <div className="flex gap-3 mt-4 md:mt-0">
      <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener" className="neon-cyan hover:scale-110 transition-transform">Instagram</a>
      <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener" className="neon-purple hover:scale-110 transition-transform">Twitter</a>
      <a href="https://wa.me/" aria-label="WhatsApp" target="_blank" rel="noopener" className="neon-cyan hover:scale-110 transition-transform">WhatsApp</a>
    </div>
  </footer>
    )
};

export default Footer;
