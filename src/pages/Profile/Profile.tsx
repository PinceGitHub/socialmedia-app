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
import noImage from "./image/no-image.png";
import EditProfile from "../../dialogs/EditProfile/EditProfile";

import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import { useState, useEffect } from "react";
import { PostPropsType } from "../../components/Post/Post";
import { serviceUrls } from "../../utils/app-utils";

const Profile = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        showLoader(true);

        const response = await axios({
          url: `${serviceUrls.profile.getProfileByUserId.path}${id}`,
          method: serviceUrls.profile.getProfileByUserId.method,
        });

        if (response.data.messageType === "S") {
          setPosts(response.data.responseData.userPosts);
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

    fetchPosts();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <Top>
          <CoverPicture src={noImage} />
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
          <Feed userId={id} posts={posts} />
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
