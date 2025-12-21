import { Link } from "react-router-dom";
import { ArrowLeft, Download, Heart, Users, Coffee, Utensils, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import family5Logo from "@/assets/come-sit-lets-be-family5-logo.webp";
import Footer from "@/components/Footer";

const LetsBeFamily5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_40%)]" />
        
        <div className="container relative z-10 px-6 py-16 text-center animate-fade-in">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Lifesaver Labs
          </Link>
          
          <img
            src={family5Logo}
            alt="Come Sit, Let's Be Family⁵"
            className="w-64 md:w-80 lg:w-96 mx-auto mb-8 drop-shadow-2xl rounded-full border-4 border-white/20"
            fetchPriority="high"
            decoding="async"
          />
          
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Come Sit, Let's Be Family⁵
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-4">
            Turning restaurant tables into bridges between strangers, 
            one conversation at a time.
          </p>
          
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Because every meal shared could be the start of a beautiful friendship.
          </p>
        </div>
      </section>

      {/* The Loneliness Epidemic */}
      <section className="py-20 bg-muted/30">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                The Loneliness We Can Fix
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xl">
                Since Robert Putnam's groundbreaking book <em className="text-foreground font-medium">Bowling Alone</em> (2000), 
                we've known that our societies are becoming more lonely and isolating. Social capital—the connections 
                between individuals, the networks of trust and reciprocity—has been declining for decades.
              </p>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-foreground font-medium text-lg mb-2">
                    Loneliness is now recognized as a public health epidemic.
                  </p>
                  <p className="text-muted-foreground">
                    Studies show chronic loneliness can be as harmful to health as smoking 15 cigarettes a day. 
                    Yet every day, millions of us sit in restaurants, cafés, and public spaces—surrounded by 
                    potential friends, kousins, and kindred spirits—in silence.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xl">
                <strong className="text-foreground">But here's the beautiful truth:</strong> This is an epidemic we can fix 
                with nothing more than a simple signal—a table tent, a card, a small gesture that says:
              </p>
              
              <blockquote className="border-l-4 border-primary pl-6 py-4 text-2xl font-display text-foreground italic">
                "We're open. We welcome conversation. Come sit, let's be Family⁵."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Table Tent Vision */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Coffee className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                The Table Tent Revolution
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Imagine a simple, beautifully designed table tent that invites fellow kousins 
              to join your conversation across the Family⁵.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Utensils className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    For Diners & Café Patrons
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Download a design you love</li>
                    <li>• Print on cardstock (ideally laminate)</li>
                    <li>• Place on your table when you're open to conversation</li>
                    <li>• Meet fellow kousins across the Family⁵</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    For Restaurant & Café Owners
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Stock table tents for patrons to use</li>
                    <li>• Signal that your space welcomes community</li>
                    <li>• Create an atmosphere of connection</li>
                    <li>• Build loyalty through shared experiences</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-xl text-foreground font-medium mb-2">
                  How many kabillion restaurant meals could be more social?
                </p>
                <p className="text-muted-foreground">
                  Especially while traveling, getting to know a new place, or when wanting a change of pace 
                  from typical intimate family⁵ conversations to larger Family⁵ conversations with our kousins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 via-muted/50 to-primary/5">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Download className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Download & Print
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're building a growing gallery of beautiful table tent designs. 
              Download, print on cardstock, laminate if you can, and start sparking Family⁵ conversations.
            </p>
            
            <Card className="bg-card border-2 border-dashed border-primary/40 mb-8">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Download className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Table Tent Designs Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're preparing our first collection of downloadable designs. 
                  Check back soon for beautiful, print-ready table tents in various styles.
                </p>
                <Button disabled className="gap-2">
                  <Download className="w-4 h-4" />
                  Downloads Coming Soon
                </Button>
              </CardContent>
            </Card>
            
            <p className="text-muted-foreground text-sm">
              <strong>Pro tip:</strong> Print on cardstock and laminate for durability. 
              Fold into a tent shape so both sides are visible!
            </p>
          </div>
        </div>
      </section>

      {/* Creative Commons & Remix */}
      <section className="py-20 bg-muted/30">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Free to Remix & Share
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">
                    Creative Commons Universal 1.0
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    All designs on this page are released under the 
                    <strong className="text-foreground"> CC0 1.0 Universal</strong> license—
                    dedicated to the public domain for free creative remixing.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>✓ Use for any purpose</li>
                    <li>✓ Modify and adapt freely</li>
                    <li>✓ No attribution required</li>
                    <li>✓ Commercial use welcome</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">
                    Branch, Create, Share Back
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We encourage you to branch these designs and develop even better galleries. 
                    Create designs that speak to your local culture, language, or community.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Want to share your amazing creativity⁵ in sparking Family⁵ table conversations?
                  </p>
                  <a 
                    href="mailto:team@lifesaverlabs.org" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    team@lifesaverlabs.org
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    We'd love to study and feature your designs!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action for Venues */}
      <section className="py-20 bg-gradient-to-br from-primary via-orange-500 to-rose-500 text-white">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              A Message to Social Spaces Everywhere
            </h2>
            
            <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-3xl mx-auto">
              Restaurant and café owners, pub keepers, co-working spaces, hotel lounges, airport terminals—
              any place where strangers gather and could become kousins:
            </p>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardContent className="p-8">
                <p className="text-2xl font-display font-medium text-white leading-relaxed">
                  Print and stock designs like these as a welcome sign that you encourage 
                  conversations across families. You're not just serving food—you're serving community.
                </p>
              </CardContent>
            </Card>
            
            <p className="text-white/90 text-lg">
              Every table tent placed is a small vote for a more connected world. 
              It could do tremendous wonders for American and All-Nation internal and 
              cross-coupled social capital.
            </p>
          </div>
        </div>
      </section>

      {/* Final Thought */}
      <section className="py-16 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-display text-foreground leading-relaxed">
              In a world that's been <em>Bowling Alone</em> for too long, 
              let's start <strong className="text-primary">Dining Together</strong>.
            </p>
            <p className="text-lg text-muted-foreground mt-6">
              Come sit. Let's be Family⁵.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LetsBeFamily5;