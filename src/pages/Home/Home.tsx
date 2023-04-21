import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Container } from "./Home.style";

const Home = () => {
  return (
    <Container>
      <Feed />
      <Rightbar />
    </Container>
  );
};

export default Home;
