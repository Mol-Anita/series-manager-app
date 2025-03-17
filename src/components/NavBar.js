"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden w-full md:flex md:justify-end md:w-auto" id="navbar-default">
        <ul className="font-normal flex flex-col md:flex-row md:space-x-8">
          {[
            { name: "Home", href: "/" },
            { name: "My Series", href: "/my-series" },
            { name: "Watchlist", href: "/watchlist" },
            { name: "Discover", href: "/discover" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 px-3 rounded-sm md:p-0 
                  ${pathname === link.href ? "text-neutral-500 font-bold" : "text-white"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
