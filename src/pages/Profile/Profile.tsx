import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Typography } from "@mui/material";
import {
  Bottom,
  Container,
  CoverPicture,
  ProfileInfo,
  ProfilePicture,
  Top,
} from "./Profile.style";
import cover_1 from "./SampleImg/cover_1.jpg";

const Profile = () => {
  return (
    <>
      <Topbar />
      <Container>
        <Top>
          <CoverPicture src={cover_1} />
          <ProfilePicture />
        </Top>
        <ProfileInfo>
          <Typography mb={1} fontWeight="500">
            Prince Sharma
          </Typography>
          <Typography>Description for Prince</Typography>
        </ProfileInfo>
        <Bottom>
          <Feed />
          <Rightbar />
        </Bottom>
      </Container>
    </>
  );
};

export default Profile;
