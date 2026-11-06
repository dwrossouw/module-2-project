import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-midnight text-ivory text-lg font-medium p-4 flex gap-6 rounded-t-xl items-center min-h-20 [&_a:hover]:text-soft-gold">
      <Link to="/" className="flex items-center gap-2">
        <img src="/src/assets/booklogo.png" alt="Home" width="50px" />The Reading Realm
      </Link>
      <Link to="/discover">Discover</Link>
      <Link to="/bookshelf">My Bookshelf</Link>
    </nav>
  );
}

export default Navbar;
