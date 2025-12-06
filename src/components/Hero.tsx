import heroImage from "@/assets/hero-lifesaver.webp";
import lifesaverLabsLogo from "@/assets/lifesaver-labs-logo.webp";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-background/95" />
      </div>

      <div className="container relative z-10 px-6 py-20 text-center animate-fade-in">
        <img
          src={lifesaverLabsLogo}
          alt="Lifesaver Labs"
          className="w-72 md:w-96 lg:w-[28rem] mx-auto mb-8 drop-shadow-lg"
          fetchPriority="high"
          decoding="async"
          width={448}
          height={448}
        />
        <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-4xl mx-auto leading-relaxed mb-4 font-medium">
          We don't just save lives—we redesign and reinvent the systems that put them at risk. Public health is
          democracy in practice; every prevented harm is a Vision Zero vote for the world we're building together.
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
          Make no little plans. Aim for the systems that shape generations—because our grandchildren will inherit either
          our courage or our complacency.
        </p>
      </div>
    </section>
  );
};

export default Hero;
