import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  name: string;
  logo: string;
  url: string;
  description?: string;
}

const ProjectCard = ({ name, logo, url, description }: ProjectCardProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-1 border-border bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg p-4 group-hover:bg-primary/10 transition-colors">
            <span className="text-4xl font-bold text-primary">{logo}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default ProjectCard;
