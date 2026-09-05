import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">FORMA</div>
          <p className="footer-tagline">
            Architecture &amp; Interior Design Studio. Crafting spaces where beauty and
            purpose meet.
          </p>
        </div>
        <div>
          <p className="footer-col-title">Navigate</p>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Services</p>
          <ul className="footer-links">
            <li>
              <a href="#">Interior Design</a>
            </li>
            <li>
              <a href="#">Exterior Design</a>
            </li>
            <li>
              <a href="#">Construction</a>
            </li>
            <li>
              <a href="#">Consultation</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Contact</p>
          <ul className="footer-links">
            <li>
              <a href="mailto:hello@forma.studio">hello@forma.studio</a>
            </li>
            <li>
              <a href="tel:+919840000000">+91 98400 00000</a>
            </li>
            <li>
              <a href="#">Chennai, Tamil Nadu</a>
            </li>
            <li>
              <Link href="/quote">Get a Quote</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Forma Architecture Studio</span>
        <div className="footer-social">
          <a href="#">Instagram</a>
          <a href="#">Behance</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
