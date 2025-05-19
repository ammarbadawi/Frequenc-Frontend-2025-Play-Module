import React from "react";

export function FooterNavSection({ title, links }) {
  return (
    <section className="flex flex-col gap-6 items-start">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <nav className="flex flex-col gap-4 items-start">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-base text-white hover:opacity-80 transition-opacity"
          >
            {link}
          </a>
        ))}
      </nav>
    </section>
  );
}