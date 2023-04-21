import { useState } from "react";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Typography, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  Bottom,
  Container,
  CoverPicture,
  ProfileInfo,
  ProfilePicture,
  Top,
} from "./Profile.style";
import cover_1 from "./SampleImg/cover_1.jpg";
import EditProfile from "../../dialogs/EditProfile/EditProfile";

const Profile = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <>
      <Container>
        <Top>
          <CoverPicture src={cover_1} />
          <ProfilePicture />
        </Top>
        <ProfileInfo>
          <Typography mb={1} fontWeight="500">
            Prince Sharma
          </Typography>
          <Typography mb={1}>Description for Prince</Typography>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setOpenEditDialog(true)}
          >
            Edit Profile
          </Button>
        </ProfileInfo>
        <Bottom>
          <Feed />
          <Rightbar />
        </Bottom>
      </Container>
      {openEditDialog && (
        <EditProfile
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
        />
      )}
    </>
  );
};

export default Profile;
