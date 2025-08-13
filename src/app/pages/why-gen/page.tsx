export default function WhyGenPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Why Gen Mobile?</h1>
        <p className="small-muted mt-3 max-w-2xl">More value. More coverage. More reasons to switch.</p>
        <ul className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            "Unlimited calling to 100+ international destinations",
            "Unlimited nationwide talk & text",
            "5G high-speed data",
            "Unlimited global text",
            "Mobile hotspot",
            "No contract. No credit checks.",
          ].map((f) => (
            <li key={f} className="card p-6">{f}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
