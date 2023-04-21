import { useContext } from "react";
import LoaderContext from "../contexts/LoaderProvider";

const useLoader = () => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error("useLoader has to be used within <LoaderContext.Provider>");
  }

  return loaderContext;
};

export default useLoader;
