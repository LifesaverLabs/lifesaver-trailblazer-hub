import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import enoughIsEnufLogo from "@/assets/enough-is-enuf-logo.jpg";
import bledLogo from "@/assets/bled-blessed-dialect-logo.jpg";
import nayborlyLogo from "@/assets/nayborly-logo.jpg";
import ribbreakersLogo from "@/assets/ribbreakers-united-logo.jpg";
import saveUsFromSlogLogo from "@/assets/save-us-from-slog-logo.jpg";
import heartclotLogo from "@/assets/heartclot-logo.jpg";
import safewordLogo from "@/assets/safeword-logo.jpg";
import nayborsosLogo from "@/assets/nayborsos-logo.jpg";
import unifySosLogo from "@/assets/unify-sos-logo.jpg";
import civigionLogo from "@/assets/civigion-logo.jpg";
import take10Logo from "@/assets/take10-logo.jpg";
import raisingRightsLogo from "@/assets/raising-rights-logo.jpg";
import calmunismLogo from "@/assets/calmunism-logo.jpg";
import tearDownThisFirewallLogo from "@/assets/tear-down-this-firewall-logo.jpg";
import krashlessKarLogo from "@/assets/krashless-kar-logo.jpg";
import religiousRcvLogo from "@/assets/religious-rcv-logo.jpg";
import lifesaverLabsUnitedLogo from "@/assets/lifesaver-labs-united-logo.jpg";

const OrganizationTabs = () => {
  const coalitionProjects = [
    {
      name: "Civigion",
      logo: "",
      logoImage: civigionLogo,
      url: "https://www.civigion.us",
      description:
        "Civigion (Civic Religion): Recognizing our shared faith in democratic values, natural rights, and human dignity—compatible with all spiritual traditions",
      status: "Beta",
    },
    {
      name: "UNify SOS",
      logo: "",
      logoImage: unifySosLogo,
      url: "https://www.unifysos.org",
      description:
        "#UNifySOS: Advocating for one world, one emergency number, and universal Good Samaritan protections to empower everyone to become an upstander",
      status: "Concept",
    },
    {
      name: "Tear Down This Firewall",
      logo: "",
      logoImage: tearDownThisFirewallLogo,
      url: "https://www.teardownthisfirewall.org",
      description:
        "#teardownthisfirewall: Fighting digital censorship and advocating for internet freedom—because when ideas cannot flow freely, humanity suffers",
      status: "Alpha",
    },
    {
      name: "Nayborly",
      logo: "",
      logoImage: nayborlyLogo,
      url: "https://www.nayborly.org",
      description:
        "Calmunity⁵ portal for naybors to learn about, revise, and coordinate on health and safety best practices to harvest healthy⁵ centuries together",
      status: "Concept",
    },
    {
      name: "Ribbreakers United",
      logo: "",
      logoImage: ribbreakersLogo,
      url: "https://www.ribbreakersunited.org",
      description:
        "Uniting the CPR community to normalize life-saving chest compressions, overcome bystander hesitation, and secure national free emergency training globally⁵",
      status: "POC",
    },
    {
      name: "#heartclot!!",
      logo: "",
      logoImage: heartclotLogo,
      url: "https://www.heartclot.us",
      description: "Rebranding 'heart attack' to help people recognize subtle symptoms and seek timely treatment",
      status: "POC",
    },
    {
      name: "Take 10?",
      logo: "",
      logoImage: take10Logo,
      url: "https://www.take10.us",
      description:
        "#take10? A simple de-escalation phrase inviting reflection—whether 10 seconds, 10 minutes, or 10 hours—to create space for calm, conciliation, and face-saving gestures",
      status: "Concept",
    },
    {
      name: "Krashless Kar",
      logo: "",
      logoImage: krashlessKarLogo,
      url: "https://www.krashlesskar.org",
      description:
        "Coming soon: A certification standards body granting safety levels measured in percentiles beyond typical human performance—Level 1 exceeds the 80th percentile of defensive driving, with all certifications requiring zero driver attention or supervision",
      status: "Concept",
    },
    {
      name: "Enough Is Enuf: English for Humans",
      logo: "",
      logoImage: enoughIsEnufLogo,
      url: "https://www.EnoughIsEnuf.org",
      description: "Simplified American spelling and counting reform for global accessibility",
      status: "POC",
    },
    {
      name: "BLED⁵/Blessed Dialect",
      logo: "",
      logoImage: bledLogo,
      url: "https://www.BlessedDialect.org",
      description: "The flexible future of English language evolution",
      status: "POC",
    },
  ];

  const pbcProjects = [
    {
      name: "Naybor SOS™",
      logo: "",
      logoImage: nayborsosLogo,
      url: "https://www.nayborsos.org",
      description:
        "Community-based emergency response platform connecting naybors to respond to CPR, overdose, wellness checks, and crisis situations in minutes—not quarter-hours",
      status: "Concept",
    },
    {
      name: "Safeword™",
      logo: "",
      logoImage: safewordLogo,
      url: "https://www.safeword.us",
      description:
        "Helping couples build stronger, safer relationships through consent tools, check-ins, and privacy-first calmunication",
      status: "Beta",
    },
  ];

  const usaProjects = [
    {
      name: "Raising Rights",
      logo: "",
      logoImage: raisingRightsLogo,
      url: "https://www.raisingrights.org",
      description:
        "Youth suffrage initiative advocating for voting rights at 14, civic education, and service rites—empowering those who bear long-term consequences to shape their future",
      status: "POC",
    },
    {
      name: "Calm⁴UNism",
      logo: "",
      logoImage: calmunismLogo,
      url: "https://www.calmunism.org",
      description:
        "Coming soon: A democratic, contract-based framework for global economic and social decision-making—CALM (Capital/Calmunity/Contract Altering Life Moments)—offering an ethical on-ramp toward calmunistic consensus",
      status: "Beta",
    },
    {
      name: "#SaveUsFromSlog",
      logo: "",
      logoImage: saveUsFromSlogLogo,
      url: "https://www.saveusfromslog.us",
      description: "Nonpartisan push to limit campaign seasons to a humane fraction of each term",
      status: "POC",
    },
    {
      name: "Religious RCV",
      logo: "",
      logoImage: religiousRcvLogo,
      url: "https://www.religiousrcv.us",
      description:
        "A Civigion Initiative: Legal effort to attain ranked-choice voting and mandatory voting standards for all elections",
      status: "Concept",
    },
    {
      name: "Lifesaver Labs United",
      logo: "",
      logoImage: lifesaverLabsUnitedLogo,
      url: "https://www.lifesaverlabs.us",
      description:
        "Harmless Hands Emergency⁵ Party organizing around policies to sociotechnically engineer civigious miracles and major incredibly urgent civ build projects",
      status: "Concept",
    },
  ];

  return (
    <section className="container px-6 py-16">
      <Tabs defaultValue="coalition" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-muted/50 p-2">
          <TabsTrigger
            value="coalition"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 text-sm md:text-base"
          >
            Coalition (Nonprofit)
          </TabsTrigger>
          <TabsTrigger
            value="pbc"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 text-sm md:text-base"
          >
            PBC (Public Benefit Corp)
          </TabsTrigger>
          <TabsTrigger
            value="usa"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 text-sm md:text-base"
          >
            Civics Campaigns and Legal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coalition" className="mt-12 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Lifesaver Labs Coalition
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              An open, global calmunity dedicated to public health, humane safety, emergency-response innovation,
              ethical relationships, and civic education. Emphasizing nonprofit volunteerism and life-saving
              technologies that serve communities worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coalitionProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pbc" className="mt-12 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Lifesaver Labs PBC</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              The calmplex product-building and technology-executing arm of the Lifesaver ecosystem—developing apps,
              safety protocols, emergency tools, and public-benefit technology. We build privacy-first, life-saving
              technology⁵ with ethical design at the core. These PBC projects will pursue calmunity⁵ dividends with
              cost-conscious care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pbcProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usa" className="mt-12 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Lifesaver Labs US</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              The civic-reform and democracy-innovation initiative focused on raising the ethical standard of
              representative democracy, improving citizen suffrage access, and integrating humane public safety values
              into governance. Building a more compassionate democracy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usaProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OrganizationTabs;
