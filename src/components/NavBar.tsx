"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState<string | null>(null);
  const { isLoggedIn, updateAuthState } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }
  }, [isLoggedIn]);

  const links = [
    { name: "Home", href: "/" },
    { name: "My Series", href: "/my-series" },
    { name: "Stats", href: "/stats" },
    { name: "Discover", href: "/discover" },
  ];

  const authLinks = [];

  if (isLoggedIn) {
    authLinks.push({ name: `Hello, ${username || 'User'}`, href: "#" });
    authLinks.push({ name: "Logout", href: "#logout" });
  } else {
    authLinks.push({ name: "Login", href: "/login" });
    authLinks.push({ name: "Register", href: "/register" });
  }

  const handleLogout = async () => {
    updateAuthState(false, null);
    router.push("/login");
  };

  return (
    <nav>
      <div className="hidden w-full md:flex md:justify-between md:items-center md:w-auto" id="navbar-default">
        <ul className="font-normal flex flex-col md:flex-row md:space-x-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  activePath === link.href ? "text-neutral-500" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="font-normal flex flex-col md:flex-row md:space-x-8">
          {authLinks.map((link) => (
            <li key={link.href}>
              {link.href === "#logout" ? (
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 rounded-sm text-white md:p-0 hover:text-neutral-500"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    activePath === link.href ? "text-neutral-500" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
