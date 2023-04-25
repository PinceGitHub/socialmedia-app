import { LinearProgress, Typography } from "@mui/material";
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

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";
import { appUrls, serviceUrls } from "../../utils/app-utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import useLoader from "../../hooks/useLoader";
import { useNavigate, useParams } from "react-router-dom";

export type PostPropsType = {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
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
  const { id } = useParams();
  const navigate = useNavigate();

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

      const response = await axios({
        url: `${serviceUrls.posts.like.path}${props._id}`,
        method: serviceUrls.posts.like.method,
      });

      if (response.data.messageType === "S") {
        onLikeSuccess();
      } else {
        snackbar({
          show: true,
          messageType: "error",
          message: response.data.message,
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

  const handleClickUserProfile = () => {
    if (id && id === props.user) return;

    const url = appUrls.profile.replace(":id", props.user);
    navigate(url);
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            <Profile
              src={props.profilePicture}
              sx={{ cursor: "pointer" }}
              onClick={handleClickUserProfile}
            />
            {props.firstName === "" ? (
              <LinearProgress sx={{ width: "40px" }} />
            ) : (
              <Typography>{`${props.firstName} ${props.lastName}`}</Typography>
            )}
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
          <PostImage src={props.image} />
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
