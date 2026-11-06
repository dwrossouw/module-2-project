import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-midnight text-ivory p-4 flex flex-row gap-6 justify-between rounded-b-xl items-center min-h-16 [&_a:hover]:text-soft-gold">
      <p>©2026 The Reading Realm</p>
      <div className="flex items-center gap-6">
        <Link to="/about">About</Link>
        <a href="https://github.com/dwrossouw/module-2-project">
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
