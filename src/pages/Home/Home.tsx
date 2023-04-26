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
    const fetchTimeline = async () => {
      try {
        showLoader(true);

        const response = await axios({
          url: serviceUrls.posts.getTimeline.path,
          method: serviceUrls.posts.getTimeline.method,
        });

        setPosts(response.data.responseData.posts);
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

  return (
    <Container>
      <Feed posts={posts} />
      <Rightbar />
    </Container>
  );
};

export default Home;
