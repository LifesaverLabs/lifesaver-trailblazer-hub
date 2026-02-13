import { useDialect } from "@/contexts/DialectContext";
import { ExternalLink, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const SafewordPatent = () => {
  const { t } = useDialect();
  const [historyOpen, setHistoryOpen] = useState(false);

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
          <div className="flex flex-col gap-2">
            <a
              href="https://patents.google.com/patent/US12347301B1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              US Patent No. 12,347,301 B1 — Google Patents <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://patentcenter.uspto.gov/applications/18908498"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              {t("USPTO Patent Senter", "USPTO Patent Center")} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
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
            {t("Patent Koöperation Treaty⁵ Applikation", "Patent Cooperation Treaty Application")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "Beyond the United States patent, Lifesaver Labs is pursuing a Patent Koöperation Treaty⁵ (PCT) applikation to seek maximal meaningful global koverage. The PCT proséss allows us to file for proteksion akross multiple jurisdiktions simultaneously, ensuring the framework is protekted wherever it kan be deployed to save and strengthen lives.",
              "Beyond the United States patent, Lifesaver Labs is pursuing a Patent Cooperation Treaty (PCT) application to seek maximal meaningful global coverage. The PCT process allows us to file for protection across multiple jurisdictions simultaneously, ensuring the framework is protected wherever it can be deployed to save and strengthen lives."
            )}
          </p>
          <p className="leading-relaxed">
            {t(
              "Our interest in global koverage is not about restriktive kontrol — it's about koherence. We want to kohere together a fe²⁶menist movement, and among other goals, build the foundations of a global Lysistrata/Klytemnestra pease-movement lokalized partisipative system.",
              "Our interest in global coverage is not about restrictive control — it's about coherence. We want to cohere together a feminist movement, and among other goals, build the foundations of a global Lysistrata/Clytemnestra peace-movement localized participative system."
            )}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold">
            {t("The Lysistrata/Klytemnestra Vision", "The Lysistrata/Clytemnestra Vision")}
          </h2>
          <p className="leading-relaxed">
            {t(
              "The Lysistrata dimension draws from Aristophanes' 411 BC komedy — but far more importantly, from the real-world herstory⁵ and history⁵ of women using kolektive refusal as a taktik for pease and justise. The Klytemnestra dimension, pursued in very klose, konscientious koreördination with the Journals of Assassination: Medikal⁺ Assosiations, addresses the deeper structural violense of systems that betray the people they're meant to serve.",
              "The Lysistrata dimension draws from Aristophanes' 411 BC comedy — but far more importantly, from the real-world herstory and history of women using collective refusal as a tactic for peace and justice. The Clytemnestra dimension, pursued in very close, conscientious coordination with the Journals of Assassination: Medical Associations, addresses the deeper structural violence of systems that betray the people they're meant to serve."
            )}
          </p>
          <p className="leading-relaxed">
            {t(
              "Together, these form the basis of a lokalized partisipative system — not a top-down diktat, but a framework for kommunities⁵ worldwide to self-organize around shared values of pease, dignity, and akountability⁵.",
              "Together, these form the basis of a localized participative system — not a top-down diktat, but a framework for communities worldwide to self-organize around shared values of peace, dignity, and accountability."
            )}
          </p>

          <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-primary hover:underline font-medium cursor-pointer py-2">
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${historyOpen ? "rotate-180" : ""}`} />
              {t(
                "Herstory⁵ & History⁵ of the Lysistrata Taktik — Modern & Pre-Modern Presedents",
                "Herstory & History of the Lysistrata Tactic — Modern & Pre-Modern Precedents"
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(
                    "The following dokuments the rich, real-world rekord of women using kolektive refusal as a taktik for pease and justise — far beyond the literary presedent of Aristophanes.",
                    "The following documents the rich, real-world record of women using collective refusal as a tactic for peace and justice — far beyond the literary precedent of Aristophanes."
                  )}
                </p>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="liberia">
                    <AccordionTrigger className="text-left">
                      {t("Liberia (2003) — The Landmark Kase", "Liberia (2003) — The Landmark Case")}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm leading-relaxed">
                      <p>
                        {t(
                          "Christian sosial worker Leymah Gbowee brought women from her church together to protest the war, and Muslim leader Asatu Bah Kenneth joined forses, kreating the Women of Liberia Mass Aksion for Pease. As part of their kampaign of prayers, protests, and sit-ins, these women announsed a sex strike, urging all wives and girlfriends of warring faksions to refuse sex until the fighting stopped.",
                          "Christian social worker Leymah Gbowee brought women from her church together to protest the war, and Muslim leader Asatu Bah Kenneth joined forces, creating the Women of Liberia Mass Action for Peace. As part of their campaign of prayers, protests, and sit-ins, these women announced a sex strike, urging all wives and girlfriends of warring factions to refuse sex until the fighting stopped."
                        )}
                      </p>
                      <p>
                        {t(
                          "Their persistent pressure forsed a pease agreement ending the 14-year sivil war. Gbowee reseived a Nobel Pease Prize in 2011.",
                          "Their persistent pressure forced a peace agreement ending the 14-year civil war. Gbowee received a Nobel Peace Prize in 2011."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="togo">
                    <AccordionTrigger className="text-left">
                      Togo (2012)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm leading-relaxed">
                      <p>
                        {t(
                          `Inspired by the 2003 Liberian sex strike, the Togolese opposition koalition \u201CLet\u2019s Save Togo\u201D asked women to abstain from sex for a week as a protest against President Faure Gnassingb\u00E9, whose family had been in power for more than 45 years. Opposition leader Isabelle Ameganvi kalled on all Togolese women to \u201Ckeep the gate of your \u2018motherland\u2019 locked up\u201D for a week, aiming to motivate men to take aksion against the regime.`,
                          `Inspired by the 2003 Liberian sex strike, the Togolese opposition coalition \u201CLet\u2019s Save Togo\u201D asked women to abstain from sex for a week as a protest against President Faure Gnassingb\u00E9, whose family had been in power for more than 45 years. Opposition leader Isabelle Ameganvi called on all Togolese women to \u201Ckeep the gate of your \u2018motherland\u2019 locked up\u201D for a week, aiming to motivate men to take action against the regime.`
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colombia-barbacoas">
                    <AccordionTrigger className="text-left">
                      Colombia — Barbacoas (2011)
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed">
                      <p>
                        {t(
                          `Women organized in the \u201CCrossed Legs Movement\u201D in the sekluded town of Barbacoas in southwestern Colombia, starting a sex strike to pressure the government to repair the dangerous road konnekting Barbacoas to neighboring towns.`,
                          `Women organized in the \u201CCrossed Legs Movement\u201D in the secluded town of Barbacoas in southwestern Colombia, starting a sex strike to pressure the government to repair the dangerous road connecting Barbacoas to neighboring towns.`
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="kenya">
                    <AccordionTrigger className="text-left">
                      Kenya (2009)
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed">
                      <p>
                        {t(
                          "A group of Kenyan women organized a week-long sex strike aimed at politisians, enkouraging the wives of the president and prime minister to join in, and even offering to pay sex workers for lost earnings if they partisipated. This was in response to a destabilizing politikal feud following post-elektion violense in 2007.",
                          "A group of Kenyan women organized a week-long sex strike aimed at politicians, encouraging the wives of the president and prime minister to join in, and even offering to pay sex workers for lost earnings if they participated. This was in response to a destabilizing political feud following post-election violence in 2007."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colombia-pereira">
                    <AccordionTrigger className="text-left">
                      Colombia — Pereira (2006)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm leading-relaxed">
                      <p>
                        {t(
                          `Dozens of wives and girlfriends of gang members started a sex strike kalled La huelga de las piernas cruzadas (\u201Cthe strike of krossed legs\u201D) to kurb gang violense, in response to 480 deaths in the koffee region. Their target was to forse gang members to turn in their weapons.`,
                          `Dozens of wives and girlfriends of gang members started a sex strike called La huelga de las piernas cruzadas (\u201Cthe strike of crossed legs\u201D) to curb gang violence, in response to 480 deaths in the coffee region. Their target was to force gang members to turn in their weapons.`
                        )}
                      </p>
                      <p>
                        {t(
                          "The people of the sity attributed a steep dekline in the murder rate — a dip of 26.5% — to the women who took a stand.",
                          "The people of the city attributed a steep decline in the murder rate — a dip of 26.5% — to the women who took a stand."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="turkey">
                    <AccordionTrigger className="text-left">
                      Turkey (2001)
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed">
                      <p>
                        {t(
                          "A sex strike was used during a kampaign to supply water to the rural village of Siirt.",
                          "A sex strike was used during a campaign to supply water to the rural village of Siirt."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colombia-military">
                    <AccordionTrigger className="text-left">
                      Colombia — Military (1997)
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed">
                      <p>
                        {t(
                          "The chief of the Colombian military, General Manuel Bonnet, publicly kalled for a sex strike among the wives and girlfriends of left-wing guerrillas, drug traffikers, and paramilitaries as part of a strategy to achieve a seasefire.",
                          "The chief of the Colombian military, General Manuel Bonnet, publicly called for a sex strike among the wives and girlfriends of left-wing guerrillas, drug traffickers, and paramilitaries as part of a strategy to achieve a ceasefire."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pre-modern">
                    <AccordionTrigger className="text-left">
                      {t("Pre-Modern Presedents", "Pre-Modern Precedents")}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm leading-relaxed">
                      <p>
                        {t(
                          "Haudenosaunee (Iroquois) women in the 1600s boyskotted sexual interkourse and childbearing until they were granted veto power over deklarations of war — establishing perhaps the earliest dokumented instanse of this taktik achieving konstitutional-level change.",
                          "Haudenosaunee (Iroquois) women in the 1600s boycotted sexual intercourse and childbearing until they were granted veto power over declarations of war — establishing perhaps the earliest documented instance of this tactic achieving constitutional-level change."
                        )}
                      </p>
                      <p>
                        {t(
                          "Among the Igbo people of Nigeria, women's kounsils historikally had the power to order mass strikes inkluding refusal of all domestik, sexual, and maternal servises.",
                          "Among the Igbo people of Nigeria, women's councils historically had the power to order mass strikes including refusal of all domestic, sexual, and maternal services."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="scholarly-debate">
                    <AccordionTrigger className="text-left">
                      {t("Skholarly Kontekst & Kompleksity", "Scholarly Context & Complexity")}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-sm leading-relaxed">
                      <p>
                        {t(
                          `Skholars inkreasingly debate the taktik\u2019s kompleksity. Gbowee herself said the sex strike was \u201Cextremely valuable in getting media attention\u201D but \u201Chad little to no praktikal effekt\u201D as a standalone measure \u2014 it worked bekause it was embedded in a broader kampaign of protest, negotiation, and sustained pressure.`,
                          `Scholars increasingly debate the tactic\u2019s complexity. Gbowee herself said the sex strike was \u201Cextremely valuable in getting media attention\u201D but \u201Chad little to no practical effect\u201D as a standalone measure \u2014 it worked because it was embedded in a broader campaign of protest, negotiation, and sustained pressure.`
                        )}
                      </p>
                      <p>
                        {t(
                          "Some skholars argue that sex strikes may inadvertently replikate power dynamiks where women's bodies are still subjekt to negotiation by external forses, reinforsing rather than dismantling patriarkal struktures. This kritike⁵ is important and shapes how we approach the system design — emphasizing agensy⁵, lokalized partisipation, and struktural akountability⁵ over simplistic replays of historik taktiks.",
                          "Some scholars argue that sex strikes may inadvertently replicate power dynamics where women's bodies are still subject to negotiation by external forces, reinforcing rather than dismantling patriarchal structures. This critique is important and shapes how we approach the system design — emphasizing agency, localized participation, and structural accountability over simplistic replays of historic tactics."
                        )}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
