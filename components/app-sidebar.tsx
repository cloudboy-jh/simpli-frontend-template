"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./sidebar-provider";
import {
  LayoutDashboard,
  Settings,
  PanelRightClose,
  BarChart3,
  Users,
  Mail,
  Sun,
  Moon,
  Home,
  Laptop,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarLinks = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: Mail,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCurrentThemeIcon = () => {
    if (!mounted) return Sun;
    const currentTheme = themes.find((t) => t.value === theme);
    return currentTheme?.icon || Sun;
  };

  const ThemeIcon = getCurrentThemeIcon();

  if (!mounted) {
    return null;
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 md:relative border-r bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isOpen ? "w-64 md:w-64" : "w-16 md:w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {isOpen && <span className="font-semibold">Your Sidebar</span>}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="transition-transform duration-300"
          >
            {isMobile ? (
              <X className="h-4 w-4" />
            ) : (
              <PanelRightClose
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            )}
          </Button>
        </div>
      </div>
      <div className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {sidebarLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                onClick={() => {
                  if (isMobile) {
                    toggle();
                  }
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  pathname === link.href ? "bg-accent" : "transparent",
                  !isOpen && "justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {isOpen && <span>{link.title}</span>}
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full",
                  !isOpen && "justify-center",
                  isOpen && "justify-start"
                )}
              >
                <ThemeIcon className="h-4 w-4" />
                {isOpen && (
                  <span className="ml-2">
                    {theme?.charAt(0).toUpperCase() + theme?.slice(1) || "Theme"}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isOpen ? "end" : "start"} className="w-32">
              {themes.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setTheme(value)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </aside>
  );
}