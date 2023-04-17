import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Topbar from "../../components/Topbar/Topbar";
import { Container } from "./Home.style";

const Home = () => {
  return (
    <>
      <Topbar />
      <Container>
        <Feed />
        <Rightbar />
      </Container>
    </>
  );
};

export default Home;
