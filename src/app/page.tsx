"use client";
import Image from "next/image";
import { useState } from "react";

type Plan = {
  name: string;
  gbLabel: string;
  monthly: number; // base 1-month price
  features: string[];
};

const PLANS: Plan[] = [
  { name: "1GB", gbLabel: "1GB data", monthly: 10, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "Mobile hotspot", "Powered by America's largest 5G networks", "No contract. No credit checks."] },
  { name: "5GB", gbLabel: "5GB data", monthly: 20, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "11GB", gbLabel: "11GB data", monthly: 30, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "17GB", gbLabel: "17GB data", monthly: 40, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "Unlimited", gbLabel: "Unlimited + 10GB hotspot", monthly: 50, features: ["Unlimited talk, text & data (45GB high-speed)", "10GB hotspot", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming"] },
];

export default function Home() {
  const [term, setTerm] = useState<"1m" | "3m">("1m");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const priceFor = (p: Plan) => (term === "1m" ? p.monthly : Math.round(p.monthly * 0.75));

  return (
    <main>
      {/* Top promo bar */}
      <div className="w-full bg-[var(--brand-red)] text-white text-center text-sm py-2 px-4">
        Get up to 25% off when you purchase a 3 month plan
      </div>

      {/* Hero */}
      <section className="section hero-gradient">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="badge inline-block">Even more data!</div>
            <h1>Even More Data!</h1>
            <p className="small-muted max-w-xl">
              All plans include unlimited talk and text and are subject to Gen Mobile's Terms and Conditions.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a className="btn btn-primary" href="#plans">View plans</a>
              <a className="btn border border-neutral-300" href="#why">Why Gen Mobile?</a>
            </div>
            <div className="flex gap-6 items-center pt-4">
              <Image src="https://ext.same-assets.com/2099578469/2385293180.svg" alt="5G badge" width={56} height={56} />
              <Image src="https://ext.same-assets.com/2099578469/322802589.svg" alt="network badge" width={120} height={40} />
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] md:aspect-[5/4]">
            <Image
              src="https://ext.same-assets.com/2099578469/2404223660.png"
              alt="Gen Mobile phones"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why section icons */}
      <section id="why" className="section bg-[var(--brand-bg)] bg-accent-shapes">
        <div className="container">
          <h2 className="mb-8">Affordable nationwide and international connectivity.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Feature icon="https://ext.same-assets.com/2099578469/675981778.svg" title="Unlimited intl. calling" />
            <Feature icon="https://ext.same-assets.com/2099578469/3196221403.svg" title="Unlimited talk & text" />
            <Feature icon="https://ext.same-assets.com/2099578469/1932253121.svg" title="5G high-speed data" />
            <Feature icon="https://ext.same-assets.com/2099578469/3808684198.svg" title="Unlimited global text" />
          </div>
        </div>
      </section>

      {/* Plans grid with toggle */}
      <section id="plans" className="section">
        <div className="container">
          <h2 className="mb-2">Save with affordable plans.</h2>
          <p className="small-muted mb-6">Choose a wireless plan and bring your own phone or buy a new one.</p>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-sm">Billing:</span>
            <div className="inline-flex rounded-full border border-neutral-300 p-1">
              <button onClick={() => setTerm("1m")} className={`px-4 py-1 rounded-full text-sm ${term === "1m" ? "bg-[var(--brand-red)] text-white" : ""}`}>1 Month</button>
              <button onClick={() => setTerm("3m")} className={`px-4 py-1 rounded-full text-sm ${term === "3m" ? "bg-[var(--brand-red)] text-white" : ""}`}>3 Month</button>
            </div>
            {term === "3m" && (
              <span className="ml-2 text-xs badge">Up to 25% off + free activation</span>
            )}
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PLANS.map((p, i) => (
              <PlanCard
                key={p.name}
                data={p.gbLabel}
                price={`$${priceFor(p)}/mo.`}
                onDetails={() => setOpenIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Plan details modal */}
      {openIdx !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setOpenIdx(null)}>
          <div className="max-w-md w-full card p-6 bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{PLANS[openIdx].gbLabel}</h3>
                <p className="small-muted">{term === "3m" ? "3-month discount applied" : "1-month pricing"}</p>
              </div>
              <button className="p-2 hover:bg-neutral-100 rounded" onClick={() => setOpenIdx(null)} aria-label="Close">✕</button>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold plan-price">${priceFor(PLANS[openIdx])}/mo.</div>
              <p className="small-muted text-xs">taxes and fees included</p>
              <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
                {PLANS[openIdx].features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-3">
              <a className="btn btn-primary" href="#">Bringing my own phone</a>
              <a className="btn border border-neutral-300" href="#">Buying a new phone</a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

function Feature({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="card p-6 flex flex-col items-center text-center gap-4">
      <Image src={icon} alt={title} width={56} height={56} />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

function PlanCard({ data, price, onDetails }: { data: string; price: string; onDetails: () => void }) {
  return (
    <div className="card p-6 flex flex-col">
      <span className="text-sm font-semibold">{data} data</span>
      <div className="mt-2 text-3xl font-bold plan-price">{price}</div>
      <p className="small-muted text-xs">taxes and fees included</p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>Unlimited nationwide talk & text</li>
        <li>Unlimited calling to 100+ intl. destinations</li>
        <li>Mobile hotspot</li>
        <li>No contract. No credit checks.</li>
      </ul>
      <button className="btn btn-primary mt-6 self-start" onClick={onDetails}>See plan details</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-[var(--brand-bg)]">
      <div className="section container grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3">Plans</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/pages/plans" className="hover:underline">All Plans</a></li>
            <li><a href="#plans" className="hover:underline">Compare Plans</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/pages/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/pages/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/pages/coverage" className="hover:underline">Coverage</a></li>
            <li><a href="/pages/easypay" className="hover:underline">Easy Pay</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/pages/why-gen" className="hover:underline">Why Gen</a></li>
            <li><a href="#" className="hover:underline">Consumer Policies</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Language</h4>
          <div className="flex flex-wrap gap-2 items-center">
            <Lang code="en-US" label="English" icon="https://ext.same-assets.com/2099578469/1939427772.svg" />
            <Lang code="es" label="Español" icon="https://ext.same-assets.com/2099578469/3826083307.svg" />
            <Lang code="fr" label="Français" icon="https://ext.same-assets.com/2099578469/463621977.svg" />
            <Lang code="hi" label="हिंदी" icon="https://ext.same-assets.com/2099578469/2114580194.svg" />
            <Lang code="zh-CN" label="简体中文" icon="https://ext.same-assets.com/2099578469/3530363548.svg" />
            <Lang code="zh-TW" label="繁體中文" icon="https://ext.same-assets.com/2099578469/3003393745.svg" />
          </div>
        </div>
      </div>
      <div className="container px-6 md:px-10 lg:px-16 xl:px-24 pb-8 text-xs small-muted">© {new Date().getFullYear()} Gen Mobile clone for demonstration purposes.</div>
    </footer>
  );
}

function Lang({ code, label, icon }: { code: string; label: string; icon: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-sm">
      <Image src={icon} alt={label} width={18} height={18} />
      <span>{label}</span>
    </button>
  );
}
