import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Container } from "./Home.style";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import { PostPropsType } from "../../components/Post/Post";
import { serviceUrls } from "../../utils/app-utils";

const Home = () => {
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();

  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        showLoader(true);

        const postsResp = await axios({
          url: serviceUrls.posts.getTimeline.path,
          method: serviceUrls.posts.getTimeline.method,
        });

        if (postsResp.data.messageType === "S") {
          const usersPosts = postsResp.data.responseData;
          const users = [
            ...new Set(usersPosts.map((userPost: any) => userPost.user)),
          ];

          const usersProfileResp = await Promise.allSettled(
            users.map((user: any) => {
              return axios({
                url: `${serviceUrls.profile.getProfileByUserId.path}${user}`,
                method: serviceUrls.profile.getProfileByUserId.method,
              });
            })
          );

          const postsData: Array<PostPropsType> = [];

          usersProfileResp.forEach((resp: any) => {
            const status = resp.status;
            const value = resp.value;

            if (status === "fulfilled" && value.data.messageType === "S") {
              usersPosts
                .filter((userPost: any) => {
                  return userPost.user === value.data.responseData.user;
                })
                .forEach((userPost: any) => {
                  postsData.push({
                    ...userPost,
                    firstName: value.data.responseData.firstName,
                    lastName: value.data.responseData.lastName,
                    profilePicture: value.data.responseData.profilePicture,
                  });
                });
            } else {
              const failedUserId = value.config.url?.split("/")[2];

              usersPosts
                .filter((userPost: any) => {
                  return userPost.user === failedUserId;
                })
                .forEach((userPost: any) => {
                  postsData.push({
                    ...userPost,
                    firstName: "",
                    lastName: "",
                    profilePicture: "",
                  });
                });

              snackbar({
                show: true,
                messageType: "error",
                message:
                  value?.data?.message ||
                  "There was a problem retrieving the record",
              });
            }
          });

          setPosts(postsData);
        } else {
          snackbar({
            show: true,
            messageType: "error",
            message: postsResp.data.message,
          });
        }
      } catch (error: any) {
        snackbar({
          show: true,
          messageType: "error",
          message: error.response?.data?.message || error.message,
        });
      } finally {
        showLoader(false);
      }
    };

    fetch();

    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Feed posts={posts} />
      <Rightbar />
    </Container>
  );
};

export default Home;
