import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import { SnackbarProvider } from "./contexts/SnackbarProvider";
import { PicsProvider } from "./contexts/PicsProvider";
import PersistLogin from "./components/PersistLogin/PersistLogin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <SnackbarProvider>
          <PicsProvider>
            <Routes>
              <Route
                path="/*"
                element={
                  <PersistLogin>
                    <App />
                  </PersistLogin>
                }
              />
            </Routes>
          </PicsProvider>
        </SnackbarProvider>
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>
);
