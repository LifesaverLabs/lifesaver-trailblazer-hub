import heroImage from "@/assets/hero-lifesaver.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-background/95" />
      </div>
      
      <div className="container relative z-10 px-6 py-20 text-center animate-fade-in">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
          Lifesaver Labs
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
          Advancing healthcare innovation through collaborative foundations, sustainable business models, 
          and mission-driven initiatives that save lives and improve outcomes.
        </p>
      </div>
    </section>
  );
};

export default Hero;
