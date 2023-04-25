import Post, { PostPropsType } from "../Post/Post";
import Share from "../Share/Share";
import { Container, Wrapper } from "./Feed.style";

import useAuth from "../../hooks/useAuth";

type FeedPropsType = {
  userId?: string;
  posts: Array<PostPropsType> | null;
};

const Feed = ({ userId, posts }: FeedPropsType) => {
  const { auth } = useAuth();

  return (
    <Container>
      <Wrapper>
        {(!userId || userId === auth?.userId) && <Share />}
        {posts &&
          posts
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((post) => {
              return (
                <Post
                  key={post._id}
                  _id={post._id}
                  user={post.user}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  profilePicture={post.profilePicture}
                  description={post.description}
                  image={post.image}
                  likes={post.likes}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                />
              );
            })}
      </Wrapper>
    </Container>
  );
};

export default Feed;
