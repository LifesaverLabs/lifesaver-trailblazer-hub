import Hero from "@/components/Hero";
import OrganizationTabs from "@/components/OrganizationTabs";
import InternationalizationSection from "@/components/InternationalizationSection";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Lifesaver Labs — Health & Safety Innovation"
        description="A coalition, PBC, and civic-reform lab building life-saving tools, emergency response systems, and democratic protocols."
        path="/"
      />
      <Hero />
      <OrganizationTabs />
      <InternationalizationSection />
      <Footer />
    </div>
  );
};

export default Index;
