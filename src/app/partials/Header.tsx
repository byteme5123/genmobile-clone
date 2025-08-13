"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!helpRef.current) return;
      if (!helpRef.current.contains(e.target as Node)) setHelpOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="https://ext.same-assets.com/2099578469/498826813.png" alt="Gen Mobile" width={36} height={36} />
            <span className="sr-only">Gen Mobile</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 ml-4">
            <Link className="nav-link" href="/pages/plans">Plans</Link>
            <Link className="nav-link" href="/pages/phones">Phones</Link>
            <Link className="nav-link" href="/pages/international">International Calling</Link>
            <Link className="nav-link" href="/pages/lifeline">Government Phone Service</Link>
            <Link className="nav-link" href="/pages/why-gen">Why Gen</Link>

            <div className="relative" ref={helpRef}>
              <button className="nav-link inline-flex items-center gap-1" onClick={() => setHelpOpen((v) => !v)} aria-expanded={helpOpen} aria-haspopup="menu">
                Help
                <span className={`transition-transform ${helpOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {helpOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white shadow-xl p-2">
                  <Link className="block px-3 py-2 rounded-lg hover:bg-neutral-50" href="/pages/faq">FAQ</Link>
                  <Link className="block px-3 py-2 rounded-lg hover:bg-neutral-50" href="/pages/contact">Contact Us</Link>
                  <Link className="block px-3 py-2 rounded-lg hover:bg-neutral-50" href="/pages/coverage">Coverage</Link>
                  <Link className="block px-3 py-2 rounded-lg hover:bg-neutral-50" href="/pages/easypay">Easy Pay</Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-neutral-100">
            <Image src="https://ext.same-assets.com/2099578469/2710359987.svg" alt="Search" width={20} height={20} />
          </button>
          <Link href="/cart" aria-label="Cart" className="p-2 rounded-full hover:bg-neutral-100">
            <Image src="https://ext.same-assets.com/2099578469/1126136421.svg" alt="Cart" width={22} height={22} />
          </Link>
          <a href="https://myaccount.genmobile.com/SignIn.php" className="btn border border-neutral-300 hidden sm:inline-flex">MyAccount</a>
          <a href="https://activate.genmobile.com/" className="btn btn-primary hidden sm:inline-flex">Activate</a>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-full hover:bg-neutral-100" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <span className="block w-6 h-0.5 bg-black mb-1"/>
            <span className="block w-6 h-0.5 bg-black mb-1"/>
            <span className="block w-6 h-0.5 bg-black"/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <Image src="https://ext.same-assets.com/2099578469/498826813.png" alt="Gen Mobile" width={32} height={32} />
              </Link>
              <button className="p-2 rounded hover:bg-neutral-100" aria-label="Close menu" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            <nav className="mt-6 space-y-1">
              <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/plans" onClick={() => setMobileOpen(false)}>Plans</Link>
              <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/phones" onClick={() => setMobileOpen(false)}>Phones</Link>
              <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/international" onClick={() => setMobileOpen(false)}>International Calling</Link>
              <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/lifeline" onClick={() => setMobileOpen(false)}>Government Phone Service</Link>
              <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/why-gen" onClick={() => setMobileOpen(false)}>Why Gen</Link>
              <div className="pt-2">
                <div className="px-3 text-xs font-semibold text-neutral-500">Help</div>
                <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
                <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/coverage" onClick={() => setMobileOpen(false)}>Coverage</Link>
                <Link className="block px-3 py-2 rounded hover:bg-neutral-50" href="/pages/easypay" onClick={() => setMobileOpen(false)}>Easy Pay</Link>
              </div>
            </nav>
            <div className="mt-auto flex gap-2">
              <a href="https://myaccount.genmobile.com/SignIn.php" className="btn border border-neutral-300 flex-1">MyAccount</a>
              <a href="https://activate.genmobile.com/" className="btn btn-primary flex-1">Activate</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
