import { useContext } from "react";
import SnackbarContext from "../contexts/SnackbarProvider";

const useSnackbar = () => {
  const snackbarContext = useContext(SnackbarContext);

  if (!snackbarContext) {
    throw new Error(
      "useSnackbar has to be used within <SnackbarContext.Provider>"
    );
  }

  return snackbarContext;
};

export default useSnackbar;
