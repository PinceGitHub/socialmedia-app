import Post from "../Post/Post";
import Share from "../Share/Share";
import { Container, Wrapper } from "./Feed.style";

const Feed = () => {
  return (
    <Container>
      <Wrapper>
        <Share />
        <Post />
      </Wrapper>
    </Container>
  );
};

export default Feed;
