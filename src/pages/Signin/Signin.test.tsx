import { render, screen, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import Signin from "./Signin";
import { axiosPrivate } from "../../utils/axios-utils";

jest.mock("../../utils/axios-utils", () => {
  const mockedAxiosCreate = jest.fn(function () {
    return {
      interceptors: {
        request: {
          use: jest.fn(() => Promise.resolve({ data: {} })),
        },
      },

      defaults: {
        headers: {
          common: {
            "Content-Type": "",
            Authorization: "",
          },
        },
      },
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
    };
  });

  return {
    __esModule: true,
    default: mockedAxiosCreate,
    axiosPrivate: mockedAxiosCreate,
  };
});

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

afterEach(() => jest.resetAllMocks());

describe("Signin", () => {
  test("should display a dialogue window containing a disclaimer message", () => {
    render(<Signin />);

    expect(
      screen.getByRole("dialog", { name: /disclaimer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Welcome to Socialmedia App, which has been created solely for proof of concept purposes. The app is not intended to be a full-fledged product that will be released to the public."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "You can explore the application using the existing user credentials shown below."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("1. email: superman@jloa.com; password: superman")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. email: wonderwoman@jloa.com; password: wonderwoman")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. email: flash@jloa.com; password: flash6")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "4. email: greenlantern@jloa.com; password: greenlantern"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("5. email: aquaman@jloa.com; password: aquaman")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. email: batman@jloa.com; password: batman")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Thank you for taking the time to explore this app.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test("the disclaimer dialogue box should not remain visible after being dismissed", async () => {
    const user = userEvent.setup();
    render(<Signin />);
    const disclaimerOkBtnEl = screen.getByRole("button", { name: /ok/i });

    await user.click(disclaimerOkBtnEl);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: /disclaimer/i })
      ).not.toBeInTheDocument();
    });
  });

  test("after dismissing the disclaimer dialogue box, a login form should be displayed", async () => {
    render(<Signin />);

    expect(
      screen.getByRole("textbox", { name: /email address/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /email address/i })
    ).toHaveFocus();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /remember me/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("the email address, password and remember me should be set", async () => {
    const user = userEvent.setup();
    render(<Signin />);

    const emailAddrInpEl = screen.getByRole("textbox", {
      name: /email address/i,
    });
    const testEmail = "email@test.com";
    await user.type(emailAddrInpEl, testEmail);
    await waitFor(() => {
      expect(emailAddrInpEl).toHaveValue(testEmail);
    });

    const passwordInpEl = screen.getByLabelText(/password/i);
    const testPassword = "testpassword";
    await user.type(passwordInpEl, testPassword);
    await waitFor(() => {
      expect(passwordInpEl).toHaveValue(testPassword);
    });

    const remembermeChkBoxEl = screen.getByRole("checkbox", {
      name: /remember me/i,
    });
    await user.click(remembermeChkBoxEl);
    await waitFor(() => {
      expect(remembermeChkBoxEl).toBeChecked();
    });
  });

  test("after a successful login, navigate", async () => {
    const mockedAxiosPrivate = axiosPrivate as jest.Mocked<any>;

    const user = userEvent.setup();
    render(<Signin />);

    const signinBtnEl = screen.getByRole("button", { name: /sign in/i });

    mockedAxiosPrivate.mockResolvedValue({
      data: {
        messageType: "S",
        message: "test sign in was successful",
        responseData: {
          id: "1",
          firstName: "testfname",
          lastName: "testlname",
          profilePicture: "testppic.png",
          accessToken: "testtoken",
        },
      },
    });
    await user.click(signinBtnEl);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  test("display the error message if a call to the sign-in service is unsuccessful", async () => {
    const mockedAxiosPrivate = axiosPrivate as jest.Mocked<any>;

    const user = userEvent.setup();
    render(<Signin />);

    const signinBtnEl = screen.getByRole("button", { name: /sign in/i });

    mockedAxiosPrivate.mockRejectedValue({ message: "Network Error" });
    await user.click(signinBtnEl);
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
