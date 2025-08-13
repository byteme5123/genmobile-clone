export default function PhonesPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Phones</h1>
        <p className="small-muted mt-3 max-w-2xl">Bring your own device or pick a new one. This is a placeholder gallery.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card aspect-[3/4]" />
          ))}
        </div>
      </div>
    </main>
  );
}
