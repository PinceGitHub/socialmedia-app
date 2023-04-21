import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useState } from "react";

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.tooltip + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
