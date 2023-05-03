import { createContext, useState } from "react";

type PicsProviderProps = {
  children: React.ReactNode;
};

type PicsProviderType = {
  pics: Map<string, string>;
  setPics: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};

const PicsContext = createContext<PicsProviderType | null>(null);

export const PicsProvider = ({ children }: PicsProviderProps) => {
  const [pics, setPics] = useState(new Map<string, string>());

  return (
    <PicsContext.Provider value={{ pics, setPics }}>
      {children}
    </PicsContext.Provider>
  );
};

export default PicsContext;
