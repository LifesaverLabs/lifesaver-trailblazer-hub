import { Globe, Heart, Users } from "lucide-react";

const InternationalizationSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <Globe className="w-12 h-12 text-primary" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Internationalization</h2>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            If you or your team share similar goals and values and want to volunteer to
            <span className="text-foreground font-medium"> hybridize and localize </span>
            these projects for your local or national context—and insufficient internationalization has been done—we're{" "}
            <span className="text-primary font-medium">super-happy to share</span> any of these concepts or domains if
            you'd find that useful.
          </p>

          <p>
            Projects like <span className="font-medium text-foreground">Krashless Kar</span>,
            <span className="font-medium text-foreground"> Raising Rights</span>,{" "}
            <span className="font-medium text-foreground">Tongtied</span>,{" "}
            <span className="font-medium text-foreground">Drafting Precedents</span>,{" "}
            <span className="font-medium text-foreground">Take 10</span>,{" "}
            <span className="font-medium text-foreground">Naybor SOS</span>,{" "}
            <span className="font-medium text-foreground">Feminist Yes!</span>, and{" "}
            <span className="font-medium text-foreground">Lifesaver Labs US</span> really may need to be built uniquely
            for each culture.
          </p>

          <p className="italic text-foreground/80">Perhaps you'll even end up outpacing Us.</p>

          <p>We do hope for broader impact than what we ourselves locally experience, natively know, and can handle.</p>
        </div>

        <div className="mt-10 flex justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="text-sm">Collaborate</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm">Share Freely</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span className="text-sm">Localize</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalizationSection;
