import { NavLink } from 'react-router-dom';
import './styles.scss';

const Navbar = () => {
  const activeStyle = {
    fontWeight: 500,
    color: 'var(--color-body-1)',
  };

  return (
    <nav className="flex justify-end">
      <ul className="flex items-center">
        <li>
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="consents" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Consents
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
