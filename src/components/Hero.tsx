import heroImage from "@/assets/hero-lifesaver.webp";
import lifesaverLabsLogo from "@/assets/lifesaver-labs-logo.webp";

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
        <img 
          src={lifesaverLabsLogo} 
          alt="Lifesaver Labs" 
          className="w-72 md:w-96 lg:w-[28rem] mx-auto mb-8 drop-shadow-lg"
          fetchPriority="high"
          decoding="async"
          width={448}
          height={448}
        />
        <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-4xl mx-auto leading-relaxed mb-4">
          An innovation hub advancing public-health prevention, personal and community security, 
          and a higher standard of civic democracy.
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
          A coordinated ecosystem of a nonprofit foundation, a public-benefit corporation, and a national 
          principal campaign committee—working together to improve safety, compassion, emergency response, 
          and democratic integrity.
        </p>
      </div>
    </section>
  );
};

export default Hero;
