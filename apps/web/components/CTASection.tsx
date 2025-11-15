export default function CTASection() {
  return (
    <section className="section section--cta" id="collaborate">
      <div className="section__header">
        <span className="section__kicker">Launch window</span>
        <h2 className="section__title">Ready to build the future shader lab?</h2>
        <p className="section__description">
          We are actively assembling partners, artists, and researchers for the Website v1.1 milestone. Bring your use
          case and we will bring the tools.
        </p>
      </div>
      <div className="cta__actions">
        <a className="button" href="#experience">
          Tour the experience
        </a>
        <a className="button button--secondary" href="mailto:hello@tsl-kit.dev">
          Partner with us
        </a>
      </div>
    </section>
  );
}
