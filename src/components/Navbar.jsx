import { Link } from "react-router-dom";
import emblem from "@/assets/emblem.png";

function Navbar() {
  return (
    <nav className="bg-midnight text-ivory text-lg font-medium p-4 flex gap-6 rounded-t-xl items-center min-h-20 [&_a:hover]:text-soft-gold">
      <Link to="/" className="flex items-center gap-2">
        <img src={emblem} alt="Home" width="50px" /></Link>
      <Link to="/discover">Discover</Link>
      <Link to="/bookshelf">My Vault</Link>
    </nav>
  );
}

export default Navbar;
