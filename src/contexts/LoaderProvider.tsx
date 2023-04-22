import { createContext, useState } from "react";
import Loader from "../components/Loader/Loader";

type LoaderProviderProps = {
  children: React.ReactNode;
};

type LoaderProviderType = React.Dispatch<React.SetStateAction<boolean>>;

const LoaderContext = createContext<LoaderProviderType | null>(null);

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [open, showLoader] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={showLoader}>
      {children}
      <Loader open={open} />
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
