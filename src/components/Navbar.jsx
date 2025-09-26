

import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/inventory" className="navbar-logo">
          BUYCARS.COM
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/inventory" className="nav-links">
              My Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-car" className="nav-links">
              Add Car
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Login / Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;