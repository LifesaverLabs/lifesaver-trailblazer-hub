import { useDialect } from "@/contexts/DialectContext";
import { ExternalLink } from "lucide-react";

const SafewordPatent = () => {
  const { t } = useDialect();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-serif font-bold tracking-tight">
            {t("Safeword Patent & Ethiks Lisensing", "Safeword Patent & Ethics Licensing")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(
              "Understanding the protektions, purpose, and lisensing philosophy behind the Safeword patent.",
              "Understanding the protections, purpose, and licensing philosophy behind the Safeword patent."
            )}
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold">
            {t("The Patent", "The Patent")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "The Safeword patent kovers the foundational arkitexture for Five Nines Kopilot Studies (Premarital and Marital Studies) Lifetime Reliability⁵ Ængineering — a framework for pushing the boundaries of what's possible in relationship science and human wellbeing.",
              "The Safeword patent covers the foundational architecture for Five Nines Copilot Studies (Premarital and Marital Studies) Lifetime Reliability⁵ Engineering — a framework for pushing the boundaries of what's possible in relationship science and human wellbeing."
            )}
          </p>
          <a
            href="https://patents.google.com/patent/US12347301B1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            US Patent No. 12,347,301 B1 <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold">
            {t("Doktrine of Equivalents", "Doctrine of Equivalents")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "All equivalents — inkluding super-high privasy⁵ arkitextures and analogous implementations that achieve substantially the same funktion in substantially the same way to achieve substantially the same result — are also koveréd under the doktrine of equivalents.",
              "All equivalents — including super-high privacy architectures and analogous implementations that achieve substantially the same function in substantially the same way to achieve substantially the same result — are also covered under the doctrine of equivalents."
            )}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold">
            {t("Lisensing Philosophy", "Licensing Philosophy")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "Lisensing proposals are welkome, as long as they are governed by brave, konscientious developers or Institutional Review Boards (IRBs) operating under Safeword ethiks lisensing — pushing the boundaries of what's possible under Five Nines Kopilot Studies Lifetime Reliability⁵ Ængineering.",
              "Licensing proposals are welcome, as long as they are governed by brave, conscientious developers or Institutional Review Boards (IRBs) operating under Safeword ethics licensing — pushing the boundaries of what's possible under Five Nines Copilot Studies Lifetime Reliability⁵ Engineering."
            )}
          </p>
          <p className="leading-relaxed">
            {t(
              "Lifesaver Labs PBK needs enuf inkome to kover its bills, within reason, and grow to a staff size that meets the needs of the kalmunity⁵ we kan responsibly⁵ fulfill.",
              "Lifesaver Labs PBC needs enough income to cover its bills, within reason, and grow to a staff size that meets the needs of the community we can responsibly fulfill."
            )}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold">
            {t("Our Finansial Philosophy", "Our Financial Philosophy")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "Lifesaver Labs PBK would prefer to be in a position, in the future, where it's not nesessary to rely on investment deals and finansing pitches to have enuf sustaining revenue to experiment on stafféd projekts.",
              "Lifesaver Labs PBC would prefer to be in a position, in the future, where it's not necessary to rely on investment deals and financing pitches to have enough sustaining revenue to experiment on staffed projects."
            )}
          </p>
          <p className="leading-relaxed">
            {t(
              "Fundamentally⁵, we're a minimal profit organization. Our goals are to maximize impakt and minimize revenue.",
              "Fundamentally, we're a minimal profit organization. Our goals are to maximize impact and minimize revenue."
            )}
          </p>
        </section>

        <section className="space-y-4 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(
              "We'll adapt this page over time to make lisensing more and more klear to everyone. When safeword.us is set up, we'll link over to its polisy⁵ archives.",
              "We'll adapt this page over time to make licensing more and more clear to everyone. When safeword.us is set up, we'll link over to its policy archives."
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default SafewordPatent;
