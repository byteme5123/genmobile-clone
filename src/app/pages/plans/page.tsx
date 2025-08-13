"use client";
import { useState } from "react";
import Image from "next/image";

type Plan = {
  name: string;
  gbLabel: string;
  monthly: number;
  features: string[];
};

const PLANS: Plan[] = [
  { name: "1GB", gbLabel: "1GB data", monthly: 10, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "Mobile hotspot", "Powered by America's largest 5G networks", "No contract. No credit checks."] },
  { name: "5GB", gbLabel: "5GB data", monthly: 20, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "11GB", gbLabel: "11GB data", monthly: 30, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "17GB", gbLabel: "17GB data", monthly: 40, features: ["Unlimited nationwide talk & text", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming", "Mobile hotspot"] },
  { name: "Unlimited", gbLabel: "Unlimited + 10GB hotspot", monthly: 50, features: ["Unlimited talk, text & data (45GB high-speed)", "10GB hotspot", "Unlimited calling to 100+ intl. destinations", "$10 international talk credit", "Canada & Mexico roaming"] },
];

export default function PlansPage() {
  const [term, setTerm] = useState<"1m" | "3m">("1m");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const priceFor = (p: Plan) => (term === "1m" ? p.monthly : Math.round(p.monthly * 0.75));

  return (
    <main className="section">
      <div className="container">
        <h1>Plans</h1>
        <p className="small-muted mt-3 max-w-2xl">Affordable wireless plans as low as $9/mo. Powered by America's largest 5G networks.</p>

        <div className="flex items-center gap-2 mt-6 mb-8">
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
    </main>
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
