export default function FAQ() {
  const faqs = [
    {
      question: "When can teams onboard to Website v1.1?",
      answer:
        "Early access opens this quarter for studios participating in the Labs programme. General availability follows once the control tower stabilises across WebGPU and WebGL paths.",
    },
    {
      question: "Does the engine require WebGPU?",
      answer:
        "The runtime defaults to WebGL today with a feature-flagged WebGPU renderer in active development. Both share lifecycle APIs so modules stay compatible.",
    },
    {
      question: "How does content authoring work?",
      answer:
        "MDX templates orchestrate shader states, camera beats, and copy. A schema-driven control surface keeps engineering and editorial in sync.",
    },
    {
      question: "What support is included?",
      answer:
        "Dedicated Slack channel, playbooks for deployment, and weekly office hours with the engine team come standard for partners.",
    },
  ];

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="section__header">
        <span className="section__kicker">Questions</span>
        <h2 id="faq-title" className="section__title">
          FAQ for the Website v1.1 launch cohort
        </h2>
        <p className="section__description">
          The roadmap is built with transparency. Here are the most common questions from shader teams evaluating the engine.
        </p>
      </div>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary className="faq-item__summary">{faq.question}</summary>
            <p className="faq-item__content">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
