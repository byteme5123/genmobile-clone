export default function FAQPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Help Center – FAQ</h1>
        <div className="mt-6 space-y-4">
          {[
            { q: "How do I activate my SIM?", a: "Use the Activate button in the header to start activation." },
            { q: "Do plans include international calling?", a: "Yes, unlimited calling to 100+ destinations while in the U.S." },
            { q: "Can I use a mobile hotspot?", a: "Yes, hotspot usage pulls from your plan's high-speed data allotment." },
          ].map((item) => (
            <div key={item.q} className="card p-6">
              <h3 className="text-lg font-semibold">{item.q}</h3>
              <p className="small-muted mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
