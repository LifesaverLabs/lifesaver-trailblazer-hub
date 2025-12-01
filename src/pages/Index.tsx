import Hero from "@/components/Hero";
import OrganizationTabs from "@/components/OrganizationTabs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <OrganizationTabs />
      <Footer />
    </div>
  );
};

export default Index;
