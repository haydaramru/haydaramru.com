import { Link } from "@tanstack/react-router";
import { House, Pen, FolderOpen, Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/shared/theme-provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const linkClass =
  "p-2 rounded-full hover:text-foreground hover:bg-secondary transition-colors";

const navLinks = [
  { to: "/", label: "Home", icon: House },
  { to: "/blog", label: "Blog", icon: Pen },
  { to: "/projects", label: "Projects", icon: FolderOpen },
] as const;

const socialLinks = [
  { href: "https://github.com/haydaramru", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/haydaramru", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:hello@haydaramru.com", label: "Email", icon: Mail },
] as const;

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Moon : Sun;

  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 rounded-full border border-border bg-background/80 backdrop-blur-md px-3 py-1.5 shadow-sm text-muted-foreground hover:gap-4 hover:px-5 transition-all duration-300 ease-out">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Tooltip key={to}>
            <TooltipTrigger asChild>
              <Link to={to} className={linkClass} aria-label={label}>
                <Icon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="w-px h-4 bg-border mx-1" />

        {socialLinks.map(({ href, label, icon: Icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label={label}
              >
                <Icon className="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="w-px h-4 bg-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <button className={linkClass} aria-label="Toggle theme" onClick={toggleTheme}>
              <ThemeIcon className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </TooltipContent>
        </Tooltip>
      </nav>
    </header>
  );
}
