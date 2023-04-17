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
import post_1 from "./SampleImg/post_1.jpg";

const Post = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            <Profile alt="Remy Sharp" src="" />
            <Typography>Manisha Kumari</Typography>
          </TopLeft>
          <TopRight>
            <Typography mr={1} fontSize="12px">
              2 mins ago
            </Typography>
            <Delete sx={{ color: "red", fontSize: "15px" }} />
          </TopRight>
        </Top>
        <Center>
          <Typography>
            Manisha's first post on the social media platform
          </Typography>
          <PostImage src={post_1} />
        </Center>
        <Bottom>
          <ThumbUpAlt sx={{ mr: 1, color: "blue" }} />
          <Favorite sx={{ mr: 1, color: "red" }} />
          <Typography>1 people like it</Typography>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Post;
