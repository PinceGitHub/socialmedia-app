import { useContext } from "react";
import PicsContext from "../contexts/PicsProvider";

const usePics = () => {
  const picsContext = useContext(PicsContext);

  if (!picsContext) {
    throw new Error("usePics has to be used within <PicsContext.Provider>");
  }

  return picsContext;
};

export default usePics;
