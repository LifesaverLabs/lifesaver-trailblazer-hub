import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";

const OrganizationTabs = () => {
  const coalitionProjects = [
    {
      name: "Neighbor SOS",
      logo: "🆘",
      url: "#",
      description: "Community-driven emergency response network",
      status: "Alpha",
    },
    {
      name: "CPR Calmunity Programs",
      logo: "❤️",
      url: "#",
      description: "Global CPR training and life-saving education",
      status: "Beta",
    },
    {
      name: "Emergency Accessibility",
      logo: "♿",
      url: "#",
      description: "Making emergency services accessible worldwide",
      status: "POC",
    },
    {
      name: "Public Health Education",
      logo: "📚",
      url: "#",
      description: "Preventive health and safety education initiatives",
      status: "Planning",
    },
  ];

  const pbcProjects = [
    {
      name: "Safeword",
      logo: "🔒",
      url: "#",
      description: "Privacy-first emergency communication tools",
      status: "Beta",
    },
    {
      name: "Quick Consent",
      logo: "✅",
      url: "#",
      description: "Clear consent protocols and safety verification",
      status: "Alpha",
    },
    {
      name: "Wake-Word Monitoring",
      logo: "🎙️",
      url: "#",
      description: "On-device privacy protection and emergency detection",
      status: "POC",
    },
    {
      name: "Encrypted Emergency Systems",
      logo: "🔐",
      url: "#",
      description: "Secure, end-to-end encrypted safety technology",
      status: "Alpha",
    },
  ];

  const usaProjects = [
    {
      name: "Democracy Innovation",
      logo: "🗳️",
      url: "#",
      description: "Raising ethical standards in representative democracy",
      status: "Planning",
    },
    {
      name: "Suffrage Access",
      logo: "🏛️",
      url: "#",
      description: "Improving citizen access to voting and civic participation",
      status: "Research",
    },
    {
      name: "Civic Safety Integration",
      logo: "🤝",
      url: "#",
      description: "Integrating humane public safety into governance",
      status: "POC",
    },
    {
      name: "Policy Framework",
      logo: "📋",
      url: "#",
      description: "Evidence-based policy proposals for safer communities",
      status: "Draft",
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
            US (Civics Campaign Committees)
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
              The product-building and technology-executing arm of the Lifesaver ecosystem—developing apps, safety
              protocols, emergency tools, and public-benefit technology. We build privacy-first, life-saving technology
              with ethical design at the core.
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
