import Following from "../Following/Following";
import UserInfo from "../UserInfo/UserInfo";
import { Container, Wrapper } from "./Rightbar.style";

const Rightbar = () => {
  return (
    <Container>
      <Wrapper>
        <UserInfo />
        <Following />
      </Wrapper>
    </Container>
  );
};

export default Rightbar;
