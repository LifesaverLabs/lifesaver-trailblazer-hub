import { useDialect } from "@/contexts/DialectContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

const DialectToggle = () => {
  const { dialect, setDialect } = useDialect();

  return (
    <div className="flex items-center gap-3 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20">
      <Languages size={18} className="text-primary-foreground" />
      <Label
        htmlFor="dialect-toggle"
        className={`text-sm font-medium transition-colors cursor-pointer ${
          dialect === "standard"
            ? "text-primary-foreground"
            : "text-primary-foreground/60"
        }`}
      >
        American Standard
      </Label>
      <Switch
        id="dialect-toggle"
        checked={dialect === "blessed"}
        onCheckedChange={(checked) =>
          setDialect(checked ? "blessed" : "standard")
        }
        className="data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-primary-foreground/30"
      />
      <Label
        htmlFor="dialect-toggle"
        className={`text-sm font-medium transition-colors cursor-pointer ${
          dialect === "blessed"
            ? "text-primary-foreground"
            : "text-primary-foreground/60"
        }`}
      >
        Blesséd Dialekt
      </Label>
    </div>
  );
};

export default DialectToggle;
