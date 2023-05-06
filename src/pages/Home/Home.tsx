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
  const [refetch, setRefetch] = useState(false);

  const fetchData = async () => {
    try {
      showLoader(true);

      //Obtain user timeline and followings
      const response = await axios({
        url: serviceUrls.posts.getTimeline.path,
        method: serviceUrls.posts.getTimeline.method,
      });

      const postsResp: Array<PostPropsType> = response.data.responseData.posts;
      const followingsResp: Array<FollowingType> =
        response.data.responseData.followings;

      //Feth the user's and the user's followings' profile pictures
      const uniqueUsers = new Map<string, string>();

      postsResp?.forEach((post) => {
        if (
          post.profilePicture &&
          post.profilePicture.trim() !== "" &&
          !uniqueUsers.has(post.user)
        ) {
          uniqueUsers.set(post.user, post.profilePicture);
        }
      });

      followingsResp?.forEach((following) => {
        if (
          following.profilePicture &&
          following.profilePicture.trim() !== "" &&
          !uniqueUsers.has(following.user)
        ) {
          uniqueUsers.set(following.user, following.profilePicture);
        }
      });

      Promise.allSettled(
        Array.from(uniqueUsers).map((val) => {
          return getPic(val[0], "profile", val[1]);
        })
      );

      setPosts(postsResp);
      setFollowings(followingsResp);
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

  useEffect(() => {
    fetchData();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refetch) {
      fetchData();
      setRefetch(false);
    }

    //eslint-disable-next-line
  }, [refetch]);

  return (
    <Container>
      <Feed posts={posts} setRefetch={setRefetch} />
      {followings && followings.length > 0 && (
        <Rightbar profile={false} followings={followings} />
      )}
    </Container>
  );
};

export default Home;
