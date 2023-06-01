import useAuth from "../hooks/useAuth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "./AuthProvider";

const mockedOnce = jest.fn();
jest.mock("socket.io-client", () => ({
  __esModule: true,
  ...jest.requireActual("socket.io-client"),
  default: () => ({
    once: mockedOnce,
  }),
}));

describe("AuthProvider", () => {
  test("should properly set state variables", async () => {
    const TestComponent = () => {
      const authProvider = useAuth();
      const handleLogin = () => {
        authProvider.setAuth({
          userId: "1",
          firstName: "testfname",
          lastName: "testlname",
          profilePicture: "testppic.png",
          email: "test@email.com",
          accessToken: "testtoken",
        });
        authProvider.setPersist(false);
        authProvider.setFetchTokenResp({ fetched: true, isSuccessful: true });
      };

      return <button onClick={handleLogin}>Login</button>;
    };

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtnEl = screen.getByRole("button");
    await user.click(loginBtnEl);

    await waitFor(() => {
      expect(mockedOnce).toBeCalled();
    });
  });
});
