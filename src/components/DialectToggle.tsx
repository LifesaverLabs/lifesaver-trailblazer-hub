import { useDialect } from "@/contexts/DialectContext";
import { Languages } from "lucide-react";

const DialectToggle = () => {
  const { dialect, setDialect } = useDialect();

  const toggleDialect = () => {
    setDialect(dialect === "blessed" ? "standard" : "blessed");
  };

  return (
    <button
      onClick={toggleDialect}
      className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 font-medium text-sm"
    >
      <Languages size={18} className="text-primary" />
      <span>{dialect === "blessed" ? "Blesséd" : "Standard"}</span>
    </button>
  );
};

export default DialectToggle;
