import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-midnight text-ivory p-4 flex flex-row gap-6 rounded-b-xl items-center min-h-16 [&_a:hover]:text-soft-gold">
      <p>©2026 The Reading Realm</p>
      <Link to="/about">About</Link>
      <a href="https://github.com/dwrossouw"><FaGithub size={24} /></a>
    </footer>
  )
}

export default Footer