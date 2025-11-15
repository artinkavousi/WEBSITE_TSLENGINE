export default function PerformanceBenchmarks() {
  const benchmarks = [
    {
      name: "Nebula Cloth",
      summary:
        "Particle lattices and volumetric lighting render at production fidelity thanks to GPU-driven instancing and adaptive budgets.",
      metrics: [
        { label: "Frame time", value: "11.2ms", delta: "-1.8ms vs v1.0" },
        { label: "GPU occupancy", value: "78%", delta: "+6% headroom" },
        { label: "Cache hits", value: "94%", delta: "+9% streaming" },
      ],
    },
    {
      name: "Spectral Nodes",
      summary:
        "Complex shader graphs compile with deterministic caching layers so designers iterate without waiting on rebuilds.",
      metrics: [
        { label: "Compile time", value: "420ms", delta: "-35%" },
        { label: "Graph hydration", value: "1.6s", delta: "-48% cold start" },
        { label: "Preview delta", value: "<0.5s", delta: "Stable" },
      ],
    },
    {
      name: "Particle Anvil",
      summary:
        "Compute-heavy sandboxes leverage streaming workers and telemetry feedback to keep interactions crisp across devices.",
      metrics: [
        { label: "Interaction latency", value: "38ms", delta: "-22ms" },
        { label: "Worker yield", value: "96%", delta: "+4%" },
        { label: "Fallback parity", value: "99%", delta: "+7% WebGL" },
      ],
    },
  ];

  const commitments = [
    {
      title: "Deterministic builds",
      description: "Every preset ships with reproducible bundles and signed manifests so teams can trust benchmark deltas.",
    },
    {
      title: "Hardware labs",
      description: "Benchmark pool spans partner GPUs, browsers, and accessibility tooling to keep optimisation grounded in reality.",
    },
    {
      title: "Continuous tuning",
      description: "Telemetry loops feed auto-tuners that squeeze more headroom without sacrificing visual ambition.",
    },
  ];

  return (
    <section className="section" id="performance" aria-labelledby="performance-title">
      <div className="section__header">
        <span className="section__kicker">Performance</span>
        <h2 id="performance-title" className="section__title">
          Benchmarks that hold under launch pressure
        </h2>
        <p className="section__description">
          Our labs run continuous regressions across devices and render modes so performance gains stick from prototype to
          production.
        </p>
      </div>
      <div className="performance-grid">
        {benchmarks.map((benchmark) => (
          <article key={benchmark.name} className="performance-card">
            <header>
              <h3>{benchmark.name}</h3>
              <p>{benchmark.summary}</p>
            </header>
            <dl>
              {benchmark.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>
                    <span>{metric.value}</span>
                    <em>{metric.delta}</em>
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <div className="performance-commitments">
        {commitments.map((commitment) => (
          <article key={commitment.title}>
            <h3>{commitment.title}</h3>
            <p>{commitment.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
