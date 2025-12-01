import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";

const OrganizationTabs = () => {
  const coalitionProjects = [
    { name: "Healthcare Access Initiative", logo: "🏥", url: "#", description: "Expanding healthcare access to underserved communities" },
    { name: "Medical Research Fund", logo: "🔬", url: "#", description: "Supporting breakthrough medical research" },
    { name: "Emergency Response Network", logo: "🚑", url: "#", description: "Coordinating rapid emergency medical response" },
    { name: "Global Health Coalition", logo: "🌍", url: "#", description: "International healthcare collaboration" },
  ];

  const pbcProjects = [
    { name: "MedTech Solutions", logo: "⚕️", url: "#", description: "Innovative medical technology development" },
    { name: "Digital Health Platform", logo: "💻", url: "#", description: "Connecting patients with care providers" },
    { name: "Biomedical Analytics", logo: "📊", url: "#", description: "Data-driven healthcare insights" },
    { name: "Sustainable Healthcare", logo: "♻️", url: "#", description: "Environmentally conscious medical solutions" },
  ];

  const usaProjects = [
    { name: "Healthcare Policy Reform", logo: "📋", url: "#", description: "Advocating for better healthcare policy" },
    { name: "Medical Education Fund", logo: "🎓", url: "#", description: "Supporting medical education initiatives" },
    { name: "Patient Rights Campaign", logo: "✊", url: "#", description: "Protecting patient rights and access" },
    { name: "Prevention Programs", logo: "🛡️", url: "#", description: "Promoting preventive healthcare measures" },
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
            USA (Campaign Committee)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coalition" className="mt-12 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Lifesaver Labs Coalition
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our nonprofit foundation dedicated to advancing healthcare accessibility and research
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Lifesaver Labs PBC
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our public benefit corporation creating sustainable healthcare innovations
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Lifesaver Labs USA
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our principal campaign committee advocating for healthcare policy and education
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
