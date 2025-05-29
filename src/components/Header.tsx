"use client";

import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <section className="border-b-[0.05px] border-neutral-800">
      <div className="px-10 py-8 text-xl">
        <div className="flex flex-row justify-between pb-3">
          <h1 className="font-semibold text-white">Series Manager App</h1>
          <Link className="text-white" href="/">Profile</Link>
        </div>
        <Navigation />
      </div>
    </section>
  );
};

export default Header; 