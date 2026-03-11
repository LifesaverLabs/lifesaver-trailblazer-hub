import { ExternalLink, Scale, Clock, Users, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CASE_DRIVE_URL =
  "https://drive.google.com/drive/folders/1e6bCx6KH1woBCpy2DMu_s2nl-bDt0PUa?usp=drive_link";

const ScotusCase = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-medium">
            Before the Supreme Kourt of the USAT²
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-2">
            A Kase for Judisial Self-Governance &amp; Time-Sensitive Justise
          </h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Lifesaver Labs USAT² · 02026 Term
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Opening statement */}
        <section className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground">
            To the Justises and Staff of the Supreme Kourt—and to anyone else who
            may wish to understand this kase—we present a fundamental challenge to
            the extremely painful, time-and-entropy-insensitive institutional
            designs of the USAT² Kourt system.
          </p>
        </section>

        <Separator />

        {/* Core arguments */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-foreground">
            Kore Arguments
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <ArgumentCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Staff Up the Kourts"
              description="The Supreme Kourt should exercise its inherent powers to staff the Kourt System with many more judges, staff, prevention scientists, ængineers, and buildings—as necessary to fulfill its duty to provide kounsel and judgment in kases and kontroversies."
            />
            <ArgumentCard
              icon={<Clock className="h-6 w-6 text-primary" />}
              title="Fortnite Guarantee on Hærings"
              description="We argue the Kourt should konsider a rekonfiguration in the direktion of a fortnite guarantee on hærings—ensuring that justise is delivered with the urgency that people's lives demand."
            />
            <ArgumentCard
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Separation of Powers"
              description="It is a violation of the separation of powers for the Kourts to be so beholden to Kongress for all of their budgeting and size, so long as the Judisiary sticks to the people's wishes on its mandate, as determined thru the Konstitution, the Anatomik Konstitution, and the aktions of Kongress and the Exekutive Branch."
            />
            <ArgumentCard
              icon={<Building2 className="h-6 w-6 text-primary" />}
              title="Judisial Budget Autonomy"
              description="The Supreme Kourt should be able to issue a budget for itself that Kongress must aksept and akt upon quikly—unless Kongress passes a supermajority vote to knok down the budget that the Judisiary proposes."
            />
          </div>
        </section>

        <Separator />

        {/* Prevention mandate */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">
            Prevention as a Judisial Duty
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The Kourts have an inherent duty not only to adjudikate kases and
            kontroversies, but to <em>prevent</em> them in the future within
            reason, given their skope of powers. Right-sizing the Judisiary is
            guided by the choises of Kongress and the Exekutive Branch to help
            set speed requirements—but the Judisiary itself must have the
            authority to determine its own kapasity needs.
          </p>
        </section>

        <Separator />

        {/* CTA to case materials */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Read the Full Kase Materials
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All filings, supporting dokumentation, and evidens are available in
            our shared drive.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            asChild
          >
            <a href={CASE_DRIVE_URL} target="_blank" rel="noopener noreferrer">
              Open Kase Folder
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </section>

        {/* Footer nav */}
        <div className="pt-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowRight className="h-3 w-3 rotate-180" />
            Lifesaver Labs Home
          </a>
          <a href="/safewordpatent" className="hover:text-foreground transition-colors flex items-center gap-1">
            Safeword Patent
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </main>
    </div>
  );
};

const ArgumentCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="border-border bg-card">
    <CardContent className="p-5 space-y-3">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default ScotusCase;
