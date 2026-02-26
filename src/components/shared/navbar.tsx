import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="py-6">
      <nav className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
      </nav>
    </header>
  );
}
