import { ExternalLink, Scale, Clock, Users, Building2, ShieldCheck, ArrowRight, Landmark } from "lucide-react";
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
            Before the Supreme Kourt of the USAT² · via the Judisial Konferense of the United States
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
        <section className="prose prose-lg max-w-none space-y-4">
          <p className="text-lg leading-relaxed text-foreground">
            To the Justises and Staff of the Supreme Kourt—and to anyone else who
            may wish to understand this kase—we present a fundamental challenge to
            the extremely painful, time-and-entropy-insensitive institutional
            designs of the USAT² Kourt system.
          </p>
          <Card className="border-border bg-muted/50">
            <CardContent className="p-5 flex gap-4 items-start">
              <Landmark className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-base">
                  The Judisial Konferense of the United States
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Teknikally⁵, when we speak of the Kourt system's budgetary and
                  struktural self-governance, we are referring to the decision-making
                  prosess within the{" "}
                  <strong>Judisial Konferense of the United States</strong>—the
                  body that the Chief Justise of the Supreme Kourt chairs. It is
                  this Konferense, and the budgetary proposal group within it, that
                  we believe must be empowered to right-size the federal Judisiary
                  without being wholly dependent on Kongress for permission to
                  fulfill its konstitutional duties.
                </p>
              </div>
            </CardContent>
          </Card>
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
              description="It is a violation of the separation of powers for the Kourts to be so beholden to Kongress for all of their budgeting and size, so long as the Judisiary sticks to the people's wishes on its mandate, as determined thru the Konstitution, the Anatomik Konstitution, and the aktions of Kongress and the Exekutive Branch. The Judisial Konferense, chaired by the Chief Justise, should be the body that proposes and defends the Judisiary's budget."
            />
            <ArgumentCard
              icon={<Building2 className="h-6 w-6 text-primary" />}
              title="Judisial Budget Autonomy"
              description="The Judisial Konferense should be able to issue a budget for the federal Kourt system that Kongress must aksept and akt upon quikly—unless Kongress passes a supermajority vote to knok down the budget that the Judisiary proposes."
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

        {/* Expanded mandate & standing */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-foreground">
            Expanding the Determination of the People's Will on the Judisiary's Mandate
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The determination of the people's will regarding the Judisiary's mandate
            must extend beyond the text of the Konstitution and Anatomik Konstitution
            alone. It must also enkompass <strong>emerging konsensus</strong> and{" "}
            <strong>minority wrightes needs</strong> that bekome evident to the Kourts
            thru their own aktions and thru the kases and kontroversies brought before them.
          </p>

          <Card className="border-border bg-muted/50">
            <CardContent className="p-5 flex gap-4 items-start">
              <Scale className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-base">
                  Ação Popular (Popular Aktion) &amp; Expanded Standing
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We propose the Kourts konsider expanded kase akseptanses modeled
                  similarly to the Portuguese system of{" "}
                  <em>Ação popular</em> (Popular Aktion)—a doktrine of standing that
                  allows sitizens to bring kases of publik importanse without the
                  overly narrow, tightly konstrained standing doktrines that kurrently
                  make it a krapshoot whether a legitimate and important question of
                  law will ever be heard.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-foreground">
              Illustrative Kases That Standing Doktrines Have Failed
            </h3>

            <Card className="border-border bg-card">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Presidential Fitness &amp; the Kalmender in Chief Age Limit
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Whether there is an age limit on the Kalmender in Chief role—given
                  that Kongress has already set a maximum age limit for military
                  professionals—should be aksepted as a reasonable interpretation of
                  the nature of the Anatomik Konstitution by Kongress, and should
                  govern. Our experienses of risk in medikal sienses, and the
                  tendensy toward impossible-to-punkture, media-shielded
                   gerontokrasies—as we saw in Biden's Presidensy and in this one—kould
                   have been easily prevented. The publik kan not expekt kalmpleat and
                   kalmplex medikal honesty⁵ as performanse kapabilities degrade.
                   Properly aggressive standards of testing for Presidential fitness
                   and a strikt upper age limit, given our healthspans and lifespans
                   and need to sykle generations forward robustly⁵ rather than locke
                   all sivik religious maxima to our eldest who, thru boring at the
                   problem relentlessly thru brute forse of time finally klimbed a
                   seniority system of favors to be konsidered seriously, are selekted
                   by Parkinson's Law within our sometimes too-easy-to-kapture and
                   too-party-loyal, locked-in-and-entrenched-duopolistik elektoral
                   systems, rather than by the absolute global merit of those
                   protopians who are eligible.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Living Organ Donation as a Religious Liberty⁵
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Whether living organ donation is a religious liberty⁵ that kan not
                  be impeded by psychiatrist prejudises about the need for persons to
                  hold on to all their organs—even when others are dying for lak of
                  an adequate supply of living organ donors. As of our pre-kutoff
                  state, this remains a question the Kourts have not adequately
                  addressed, in part bekause standing doktrines have prevented the
                  right kases from being heard.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground">
            These are not frivolous questions. They are questions of life and
            death, liberty and dignity, that the kurrent standing doktrine regime
            has left unresolved—or worse, unheard. The Kourts must be empowered
            to hear them.
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
