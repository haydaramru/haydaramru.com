import { Link } from "@tanstack/react-router";
import { House, Pen, FolderOpen, Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/shared/theme-provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

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

const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };

function DockItem({
  mouseX,
  children,
}: {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return 200;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const padding = useTransform(distance, [0, 80], [8, 2]);
  const smoothPadding = useSpring(padding, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ paddingLeft: smoothPadding, paddingRight: smoothPadding }}
      className="flex items-center"
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Moon : Sun;
  const mouseX = useMotionValue(-200);

  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="flex items-center rounded-full border border-border bg-background/80 backdrop-blur-md px-1 py-1.5 shadow-sm text-muted-foreground"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-200)}
      >
        {navLinks.map(({ to, label, icon: Icon }) => (
          <DockItem key={to} mouseX={mouseX}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={to} className={linkClass} aria-label={label}>
                  <Icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                {label}
              </TooltipContent>
            </Tooltip>
          </DockItem>
        ))}

        <div className="w-px h-4 bg-border mx-1" />

        {socialLinks.map(({ href, label, icon: Icon }) => (
          <DockItem key={href} mouseX={mouseX}>
            <Tooltip>
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
          </DockItem>
        ))}

        <div className="w-px h-4 bg-border mx-1" />

        <DockItem mouseX={mouseX}>
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
        </DockItem>
      </nav>
    </header>
  );
}
