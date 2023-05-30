import { render, screen, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";
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

describe("Signup", () => {
  test("should render the controls properly", () => {
    render(<Signup />);

    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /email address/i })
    ).toBeInTheDocument();

    const passwordElements = screen.getAllByLabelText(/password/i);
    const passwordInpEl = passwordElements[0];
    const confirmPasswordInpEl = passwordElements[1];

    expect(passwordInpEl).toBeInTheDocument();
    expect(confirmPasswordInpEl).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("field values must be properly set", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const firstNameInpEl = screen.getByRole("textbox", { name: /first name/i });
    const testFName = "testfname";

    const lastNameInpEl = screen.getByRole("textbox", { name: /last name/i });
    const testLName = "testlname";

    const emailAddressInpEl = screen.getByRole("textbox", {
      name: /email address/i,
    });
    const testEmail = "email@test.com";

    const passwordElements = screen.getAllByLabelText(/password/i);
    const passwordInpEl = passwordElements[0];
    const confirmPasswordInpEl = passwordElements[1];
    const testPassword = "testpassword";

    await user.type(firstNameInpEl, testFName);
    await user.type(lastNameInpEl, testLName);
    await user.type(emailAddressInpEl, testEmail);
    await user.type(passwordInpEl, testPassword);
    await user.type(confirmPasswordInpEl, testPassword);

    await waitFor(() => {
      expect(firstNameInpEl).toHaveValue(testFName);
    });

    await waitFor(() => {
      expect(lastNameInpEl).toHaveValue(testLName);
    });

    await waitFor(() => {
      expect(emailAddressInpEl).toHaveValue(testEmail);
    });

    await waitFor(() => {
      expect(passwordInpEl).toHaveValue(testPassword);
    });

    await waitFor(() => {
      expect(confirmPasswordInpEl).toHaveValue(testPassword);
    });
  });

  test("if the password and confirm password are different, display an error message", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const passwordElements = screen.getAllByLabelText(/password/i);
    const passwordInpEl = passwordElements[0];
    const confirmPasswordInpEl = passwordElements[1];
    const signupBtnEl = screen.getByRole("button", { name: /sign up/i });

    const testPassword = "testpassword";
    const testCPassword = "testcpassword";

    await user.type(passwordInpEl, testPassword);
    await user.type(confirmPasswordInpEl, testCPassword);
    await user.click(signupBtnEl);

    await waitFor(async () => {
      expect(
        screen.getByText(/the password and confirmed passwords do not match/i)
      ).toBeInTheDocument();
    });
  });

  test("after a successful signup, navigate", async () => {
    const mockedAxiosPrivate = axiosPrivate as jest.Mocked<any>;

    const user = userEvent.setup();
    render(<Signup />);

    const signupBtnEl = screen.getByRole("button", { name: /sign up/i });

    mockedAxiosPrivate.mockResolvedValue({
      data: {
        messageType: "S",
        message: "test sign up was successful",
      },
    });
    await user.click(signupBtnEl);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  test("display the error message if a call to the sign-up service is unsuccessful", async () => {
    const mockedAxiosPrivate = axiosPrivate as jest.Mocked<any>;

    const user = userEvent.setup();
    render(<Signup />);

    const signupBtnEl = screen.getByRole("button", { name: /sign up/i });

    mockedAxiosPrivate.mockRejectedValue({ message: "Network Error" });
    await user.click(signupBtnEl);
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
