export default function ModuleShowcase() {
  const categories = [
    { name: "Materials & shading", count: "24", focus: "Layered PBR, transmission, and stylised NPR stacks." },
    { name: "Post-processing", count: "20", focus: "HDR pipelines, filmic curves, and cinematic tone ops." },
    { name: "Simulation & VFX", count: "18", focus: "GPU particles, fluids, volumetrics, and signed distance fields." },
    { name: "Lighting systems", count: "15", focus: "Clustered lighting, cached GI, ray marched god rays." },
    { name: "Geometry & instancing", count: "12", focus: "Procedural meshes, marching cubes, adaptive LOD pipelines." },
    { name: "AI & automation", count: "6", focus: "Copilot prompts, RAG-backed insights, preset recommendations." },
  ];

  return (
    <section className="section" id="modules">
      <div className="section__header">
        <span className="section__kicker">Module catalog</span>
        <h2 className="section__title">150+ building blocks ready for WebGPU</h2>
        <p className="section__description">
          Every module follows the same lifecycle contract so you can mix, match, and deploy on demand. Website v1.1
          ships with the first wave of hero showcases.
        </p>
      </div>
      <div className="card-grid card-grid--compact">
        {categories.map((category) => (
          <article key={category.name} className="card card--accent">
            <header className="card__header">
              <span className="card__count">{category.count}</span>
              <h3 className="card__title">{category.name}</h3>
            </header>
            <p className="card__description">{category.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
