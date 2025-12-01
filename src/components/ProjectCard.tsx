import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  name: string;
  logo: string;
  url: string;
  description?: string;
  status?: string;
}

const ProjectCard = ({ name, logo, url, description, status }: ProjectCardProps) => {
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
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              {status && (
                <Badge variant="secondary" className="text-xs">
                  {status}
                </Badge>
              )}
            </div>
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
