import { Mail, Phone, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Lifesaver Labs</h3>
            <p className="text-secondary-foreground/80 leading-relaxed mb-4">
              A coordinated ecosystem dedicated to public benefit, life-saving innovation, and democratic integrity.
            </p>
            <a
              href="https://github.com/LifesaverLabs/lifesaver-trailblazer-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              <Github size={18} />
              <span>Please Contribute or Correct</span>
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Organizations</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <a href="#coalition" className="hover:text-primary transition-colors">
                  Lifesaver Labs Coalition
                </a>
              </li>
              <li>
                <a href="#pbc" className="hover:text-primary transition-colors">
                  Lifesaver Labs PBC
                </a>
              </li>
              <li>
                <a href="#usa" className="hover:text-primary transition-colors">
                  Lifesaver Labs USA
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-secondary-foreground/80">
              <a
                href="mailto:team@lifesaverlabs.org"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span>team@lifesaverlabs.org</span>
              </a>
              <a
                href="mailto:team@nayborsos.org"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span>team@nayborsos.org</span>
              </a>
              <a href="tel:+18002667368" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} />
                <span>+1-800-CONSENT</span>
              </a>
              <a href="tel:+13212529626" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} />
                <span>+1 (321) 252-9626</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/70">
          <p className="mb-2">
            © {new Date().getFullYear()} Lifesaver Labs Coalition & PBC. Public benefit organizations committed to
            life-saving, liberty⁵-building innovation.
          </p>
          <p className="italic mb-3">"First, do no harm. Then, save lives."</p>
          <Link
            to="/open-source-acknowledgments"
            className="inline-flex items-center gap-1 text-secondary-foreground/60 hover:text-primary transition-colors"
          >
            <Heart size={14} />
            <span>Built with open source</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
