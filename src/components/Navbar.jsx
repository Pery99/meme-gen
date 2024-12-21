import React, { useState } from 'react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const socialLinks = [
  { icon: <FaGithub className="text-xl" />, url: 'https://github.com', label: 'Github' },
  { icon: <FaTwitter className="text-xl" />, url: 'https://twitter.com', label: 'Twitter' },
  { icon: <FaInstagram className="text-xl" />, url: 'https://instagram.com', label: 'Instagram' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-web3-primary to-web3-secondary animate-gradient">
            Meme Generator
          </h1>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              {isOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/10 bg-black/20 backdrop-blur-lg">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
