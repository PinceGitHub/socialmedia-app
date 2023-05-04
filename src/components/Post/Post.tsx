import { Typography } from "@mui/material";
import { ThumbUpAlt, Favorite, Delete } from "@mui/icons-material";
import {
  Container,
  Wrapper,
  Top,
  TopLeft,
  Profile,
  TopRight,
  Center,
  PostImage,
  Bottom,
} from "./Post.style";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";
import { appUrls, serviceUrls } from "../../utils/app-utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import useLoader from "../../hooks/useLoader";
import { Link } from "react-router-dom";
import usePics from "../../hooks/usePics";
import useDownloadImg from "../../hooks/useDownloadImg";

export type PostPropsType = {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  description: string;
  image: string;
  likes: Array<string>;
  createdAt: string;
  updatedAt: string;
};

const Post = (props: PostPropsType) => {
  const { auth } = useAuth();
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();
  const { pics } = usePics();
  const getPic = useDownloadImg();

  const [postImg, setPostImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostImg = async () => {
      const resp = await getPic(props.user, "post", props.image);
      setPostImg(resp.imgUrl);
    };

    if (props.image !== "") {
      fetchPostImg();
    }

    //eslint-disable-next-line
  }, []);

  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (props.profilePicture && pics.has(`${props.user}_profile`)) {
      const imageUrl = pics.get(`${props.user}_profile`);
      setProfilePic(imageUrl as string);
    }

    //eslint-disable-next-line
  }, [pics]);

  const [likes, setLikes] = useState({
    count: props.likes.length,
    isLiked: auth?.userId ? props.likes.includes(auth.userId) : false,
  });

  const onLikeSuccess = () => {
    setLikes((prev) => {
      if (prev.isLiked) {
        props.likes.splice(props.likes.indexOf(props.user));

        return {
          count: prev.count - 1,
          isLiked: false,
        };
      } else {
        props.likes.push(props.user);

        return {
          count: prev.count + 1,
          isLiked: true,
        };
      }
    });
  };

  const handleOnLike = async () => {
    try {
      if (props.user === auth?.userId) {
        return;
      }

      showLoader(true);

      await axios({
        url: `${serviceUrls.posts.like.path}${props._id}`,
        method: serviceUrls.posts.like.method,
      });

      onLikeSuccess();
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

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            <Link
              to={appUrls.profile.replace(":id", props.user)}
              style={{ textDecoration: "none" }}
            >
              <Profile src={profilePic || ""} />
            </Link>
            <Typography>{`${props.firstName} ${props.lastName}`}</Typography>
          </TopLeft>
          <TopRight>
            <Typography mr={1} fontSize="12px">
              {moment(new Date(props.createdAt)).fromNow()}
            </Typography>
            <Delete sx={{ color: "red", fontSize: "15px" }} />
          </TopRight>
        </Top>
        <Center>
          <Typography>{props.description}</Typography>
          <PostImage src={postImg || ""} />
        </Center>
        <Bottom>
          <ThumbUpAlt
            sx={{ mr: 1, color: "blue", cursor: "pointer" }}
            onClick={handleOnLike}
          />
          <Favorite
            sx={{ mr: 1, color: "red", cursor: "pointer" }}
            onClick={handleOnLike}
          />
          <Typography>{`${likes.count} people like it`}</Typography>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Post;
