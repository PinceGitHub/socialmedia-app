import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

type ShowSnackbarType = {
  show: true;
  messageType: "success" | "error";
  message: string;
};

type HideSnackbarType = {
  show: false;
  messageType?: never;
  message?: never;
};

type SnackbarProviderType = ShowSnackbarType | HideSnackbarType;

type SnackbarProviderProps = {
  children: React.ReactNode;
};

type SnackbarContextType = React.Dispatch<
  React.SetStateAction<SnackbarProviderType>
>;

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackBarState, setSnackBarState] = useState<SnackbarProviderType>({
    show: false,
  });

  return (
    <SnackbarContext.Provider value={setSnackBarState}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={snackBarState.show}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBarState({ show: false });
        }}
      >
        {snackBarState.messageType && (
          <Alert
            onClose={() => {
              setSnackBarState({ show: false });
            }}
            severity={snackBarState.messageType}
            sx={{ width: "100%" }}
          >
            {snackBarState.message}
          </Alert>
        )}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
