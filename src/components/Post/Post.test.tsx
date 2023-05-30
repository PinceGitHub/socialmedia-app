import { render, screen } from "../../test-utils";
import Post from "./Post";

const postProps = {
  _id: "1",
  user: "testuser",
  firstName: "testfname",
  lastName: "testlname",
  profilePicture: "testprofilepic.png",
  description: "test description",
  image: "testpostpic.png",
  likes: ["2"],
  createdAt: "2023-05-30 16:08",
  updatedAt: "2023-05-30 16:08",
  setRefetch: jest.fn(),
};

const mockedAuth = {
  auth: {
    userId: "1",
  },
};
jest.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  default: () => mockedAuth,
}));

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
jest.mock("../../hooks/useAxiosPrivate", () => ({
  __esModule: true,
  default: () => mockedAxiosCreate,
}));

const picsMap = new Map<string, string>();
picsMap.set(
  `${postProps.user}_profile_${postProps.profilePicture}`,
  postProps.profilePicture
);
picsMap.set(`${postProps.user}_post_${postProps.image}`, postProps.image);
const mockedPics = { pics: picsMap };
jest.mock("../../hooks/usePics", () => ({
  __esModule: true,
  default: () => mockedPics,
}));

const mockedGetImgUrl = jest.fn(() =>
  Promise.resolve({
    isSuccess: true,
    imgUrl: "",
  })
);

jest.mock("../../hooks/useDownloadImg", () => ({
  __esModule: true,
  default: () => mockedGetImgUrl,
}));

afterEach(() => jest.resetAllMocks());

describe.only("Post", () => {
  test("should be rendered properly", () => {
    render(
      <Post
        _id={postProps._id}
        user={postProps.user}
        firstName={postProps.firstName}
        lastName={postProps.lastName}
        profilePicture={postProps.profilePicture}
        description={postProps.description}
        image={postProps.image}
        likes={postProps.likes}
        createdAt={postProps.createdAt}
        updatedAt={postProps.updatedAt}
        setRefetch={postProps.setRefetch}
      />
    );

    const userFullNameEl = screen.getByText(
      `${postProps.firstName} ${postProps.lastName}`
    );
    expect(userFullNameEl).toBeInTheDocument();
  });
});
