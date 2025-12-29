import { createContext, useContext, useState, ReactNode } from "react";

export type Dialect = "blessed" | "standard";

interface DialectContextType {
  dialect: Dialect;
  setDialect: (dialect: Dialect) => void;
  t: (blessed: string, standard: string) => string;
}

const DialectContext = createContext<DialectContextType | undefined>(undefined);

export const DialectProvider = ({ children }: { children: ReactNode }) => {
  const [dialect, setDialect] = useState<Dialect>("blessed");

  const t = (blessed: string, standard: string): string => {
    return dialect === "blessed" ? blessed : standard;
  };

  return (
    <DialectContext.Provider value={{ dialect, setDialect, t }}>
      {children}
    </DialectContext.Provider>
  );
};

export const useDialect = () => {
  const context = useContext(DialectContext);
  if (context === undefined) {
    throw new Error("useDialect must be used within a DialectProvider");
  }
  return context;
};
