import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Calculator", "Dashboard", "Challenges"];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <span className="navbar__logo-icon">🌿</span>
          <span className="navbar__logo-text">
            Carbon<span className="navbar__logo-accent">Lens</span>
            <span className="navbar__logo-ai"> AI</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`navbar__link ${link === "Home" ? "navbar__link--active" : ""}`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="navbar__cta">Start Tracking 🌱</button>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <button className="navbar__cta navbar__cta--mobile">Start Tracking 🌱</button>
      </div>
    </nav>
  );
}
