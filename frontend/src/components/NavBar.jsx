import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import { useMovieContext } from "../context/MovieContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const { favorites } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);


  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="brand-highlight">Cine</span>Sphere
      </div>

      {/* Theme Toggle & Hamburger menu icon */}
      <div className="navbar-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon } />
        </button>     
        
        <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
       

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-close">
          <button onClick={closeMenu} aria-label="Close Menu">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li>
          <Link to="/favorites" onClick={closeMenu}>
            Favorites <span className="badge">{favorites.length}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
