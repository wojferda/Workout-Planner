import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand">Workout Planner</Link>
        <ul className="nav-links">
          <li><Link to="/">Plans</Link></li>
          <li><Link to="/plans/create">Create Plan</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 