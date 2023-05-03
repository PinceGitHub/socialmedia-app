import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Container } from "./Home.style";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import useDownloadImg from "../../hooks/useDownloadImg";
import { PostPropsType } from "../../components/Post/Post";
import { FollowingType } from "../../components/Following/Following";
import { serviceUrls } from "../../utils/app-utils";

const Home = () => {
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();
  const getPic = useDownloadImg();

  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);
  const [followings, setFollowings] = useState<Array<FollowingType> | null>(
    null
  );

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        showLoader(true);

        const response = await axios({
          url: serviceUrls.posts.getTimeline.path,
          method: serviceUrls.posts.getTimeline.method,
        });

        setPosts(response.data.responseData.posts);
        setFollowings(response.data.responseData.followings);
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

    fetchTimeline();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchProfilePics = () => {
      const uniqueUsers = new Map<string, string>();

      posts?.forEach((post) => {
        if (post.profilePicture && !uniqueUsers.has(post.user)) {
          uniqueUsers.set(post.user, post.profilePicture);
        }
      });

      followings?.forEach((following) => {
        if (following.profilePicture && !uniqueUsers.has(following.user)) {
          uniqueUsers.set(following.user, following.profilePicture);
        }
      });

      Promise.allSettled(
        Array.from(uniqueUsers).map((val) => {
          return getPic(val[0], "profile", val[1]);
        })
      );
    };

    if (posts && followings) {
      fetchProfilePics();
    }

    //eslint-disable-next-line
  }, [posts, followings]);

  return (
    <Container>
      <Feed posts={posts} />
      {followings && <Rightbar profile={false} followings={followings} />}
    </Container>
  );
};

export default Home;
