import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import { SnackbarProvider } from "./contexts/SnackbarProvider";
import { PicsProvider } from "./contexts/PicsProvider";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoaderProvider>
          <SnackbarProvider>
            <PicsProvider>{children}</PicsProvider>
          </SnackbarProvider>
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
