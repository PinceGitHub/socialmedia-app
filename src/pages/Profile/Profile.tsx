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

import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import { useState, useEffect } from "react";
import { PostPropsType } from "../../components/Post/Post";
import { serviceUrls } from "../../utils/app-utils";
import { FollowingType } from "../../components/Following/Following";

type UserInfoType = {
  coverPicture?: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  description?: string;
  city?: string;
  from?: string;
  relationship?: number;
  followers?: Array<{}>;
  followings?: Array<FollowingType>;
};

const Profile = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [posts, setPosts] = useState<Array<PostPropsType> | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        showLoader(true);

        const response = await axios({
          url: `${serviceUrls.profile.getProfileByUserId.path}${id}`,
          method: serviceUrls.profile.getProfileByUserId.method,
        });

        setPosts(response.data.responseData.posts);
        setUserInfo(response.data.responseData);
      } catch (error: any) {
        navigate("/notfound", { replace: true });
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
  }, [id]);

  return (
    <>
      {userInfo && (
        <Container>
          <Top>
            <CoverPicture src={userInfo.coverPicture || noImage} />
            <ProfilePicture />
          </Top>
          <ProfileInfo>
            <Typography mb={1} fontWeight="500">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Typography>
            <Typography mb={1}>{userInfo.description || ""}</Typography>
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
            <Rightbar
              profile={true}
              userInfo={{
                city: userInfo.city,
                from: userInfo.from,
                relationship: userInfo.relationship,
              }}
              followings={userInfo.followings}
            />
          </Bottom>
        </Container>
      )}
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
