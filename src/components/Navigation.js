import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

// Navigation links component that handles both mobile and desktop views
const NavLinks = React.memo(({ scrollToSection, isLandingPage, isMobile, closeMenu }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClasses = isMobile
    ? "hover:text-blue-300 cursor-pointer whitespace-nowrap w-full"
    : "hover:text-blue-300 cursor-pointer whitespace-nowrap";

  const containerClasses = isMobile
    ? "flex flex-col space-y-4 w-full"
    : "flex items-center space-x-6 w-full justify-end";

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    if (closeMenu) {
      closeMenu();
    }
  };

  if (isLandingPage) {
    return (
      <div className={containerClasses} onClick={(e) => e.stopPropagation()}>
        <a
          href="#about"
          onClick={(e) => handleLinkClick(e, 'about')}
          onTouchEnd={(e) => handleLinkClick(e, 'about')}
          className={linkClasses}
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(e) => handleLinkClick(e, 'projects')}
          onTouchEnd={(e) => handleLinkClick(e, 'projects')}
          className={linkClasses}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, 'contact')}
          onTouchEnd={(e) => handleLinkClick(e, 'contact')}
          className={linkClasses}
        >
          Contact
        </a>
        {/* Separator between Contact and Algorithms Page */}
        {!isMobile && (
          <span className="h-6 w-px bg-gray-500 mx-2" aria-hidden="true" />
        )}
        {isMobile && (
          <span className="h-px w-full bg-gray-500 my-2" aria-hidden="true" />
        )}
        <Link
          to="/algorithms"
          className={linkClasses}
          onClick={(e) => {
            e.stopPropagation();
            closeMenu?.();
          }}
        >
          Algorithms Page
        </Link>
        <Link
          to="/school-projects"
          className={linkClasses}
          onClick={(e) => {
            e.stopPropagation();
            closeMenu?.();
          }}
        >
          School Projects
        </Link>
      </div>
    );
  }

  return (
    <div className={containerClasses} onClick={(e) => e.stopPropagation()}>
      <Link
        to="/"
        className={linkClasses}
        onClick={(e) => {
          e.stopPropagation();
          closeMenu?.();
        }}
      >
        Home
      </Link>
      {currentPath !== '/algorithms' && (
        <Link
          to="/algorithms"
          className={linkClasses}
          onClick={(e) => {
            e.stopPropagation();
            closeMenu?.();
          }}
        >
          Algorithms Page
        </Link>
      )}
      {currentPath !== '/school-projects' && (
        <Link
          to="/school-projects"
          className={linkClasses}
          onClick={(e) => {
            e.stopPropagation();
            closeMenu?.();
          }}
        >
          School Projects
        </Link>
      )}
    </div>
  );
});

// Toggle button component for switching between light and dark mode
const DarkModeToggle = ({ darkMode, toggleDarkMode }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      toggleDarkMode();
    }}
    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <Sun className="w-5 h-5 text-yellow-500" />
    ) : (
      <Moon className="w-5 h-5 text-gray-600" />
    )}
  </button>
);

// Main navigation bar component with responsive design and theme switching
const Navigation = ({
  darkMode,
  setDarkMode,
  isLandingPage = false,
  scrollToSection = null,
  showDarkMode = true,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileNavOpen && !e.target.closest('nav')) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isMobileNavOpen]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLandingPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileNavOpen(false);
  };

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <nav className="fixed w-full bg-slate-800 text-white z-50" onClick={(e) => e.stopPropagation()}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left side - Logo */}
          <div
            className="text-xl font-bold cursor-pointer hover:text-blue-300"
            onClick={handleLogoClick}
            onTouchEnd={handleLogoClick}
          >
            [ MB ]
          </div>

          {/* Right side - Navigation and Controls */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-end">
              <NavLinks
                scrollToSection={scrollToSection}
                isLandingPage={isLandingPage}
                isMobile={false}
                closeMenu={closeMenu}
              />
            </div>

            {/* Dark Mode Toggle and Hamburger */}
            <div className="flex items-center gap-4">
              {showDarkMode && (
                <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              )}
              <button
                className="md:hidden text-white hover:text-blue-300 transition-colors duration-200"
                onClick={toggleMobileMenu}
                onTouchEnd={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-slate-800 border-t border-slate-700 transform transition-all duration-500 ease-in-out ${
            isMobileNavOpen
              ? 'opacity-100 max-h-[400px] translate-y-0'
              : 'opacity-0 max-h-0 -translate-y-4 pointer-events-none'
          }`}
          style={{
            transitionProperty: 'opacity, max-height, transform',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`p-4 transition-all duration-500 ${
              isMobileNavOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <NavLinks
              scrollToSection={scrollToSection}
              isLandingPage={isLandingPage}
              isMobile={true}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;