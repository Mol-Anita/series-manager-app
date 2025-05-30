"use client";

import Link from "next/link";
import Navigation from "./Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section className="border-b-[0.05px] border-neutral-800">
      <div className="px-10 py-8 text-xl">
        <div className="flex flex-row justify-between pb-3">
          <h1 className="font-semibold text-white">Series Manager App</h1>
          {isLoggedIn && (
            <Link 
              className="text-white hover:text-neutral-500 transition-colors" 
              href="/settings/2fa"
            >
              Profile
            </Link>
          )}
        </div>
        <Navigation />
      </div>
    </section>
  );
};

export default Header; 