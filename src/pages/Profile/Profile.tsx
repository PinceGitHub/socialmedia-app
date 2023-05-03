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
import useAuth from "../../hooks/useAuth";
import useDownloadImg from "../../hooks/useDownloadImg";
import usePics from "../../hooks/usePics";
import { useState, useEffect } from "react";
import { PostPropsType } from "../../components/Post/Post";
import { FollowingType } from "../../components/Following/Following";
import { serviceUrls } from "../../utils/app-utils";

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
  const { auth } = useAuth();
  const getPic = useDownloadImg();
  const { pics } = usePics();

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

    const resetState = () => {
      setPosts(null);
      setUserInfo(null);
    };

    fetchPosts();

    return resetState();

    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const fetchProfilePics = () => {
      const uniqueUsers = new Map<string, string>();

      posts?.forEach((post) => {
        if (post.profilePicture && !uniqueUsers.has(post.user)) {
          uniqueUsers.set(post.user, post.profilePicture);
        }
      });

      userInfo?.followings?.forEach((following) => {
        if (following.profilePicture && !uniqueUsers.has(following.user)) {
          uniqueUsers.set(following.user, following.profilePicture);
        }
      });

      Promise.allSettled(
        Array.from(uniqueUsers).map((val) => {
          return getPic(val[0], "profile", val[1]);
        })
      );
    };

    if (posts && userInfo?.followings) {
      fetchProfilePics();
    }

    //eslint-disable-next-line
  }, [posts, userInfo?.followings]);

  const [coverPic, setCoverPic] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverPic = async (user: string, imgName: string) => {
      const resp = await getPic(user, "cover", imgName);
      setCoverPic(resp.imgUrl);
    };

    if (id && userInfo?.coverPicture) {
      fetchCoverPic(id, userInfo.coverPicture);
    }

    //eslint-disable-next-line
  }, [id, userInfo?.coverPicture]);

  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (pics.has(`${id}_profile`)) {
      const imageUrl = pics.get(`${id}_profile`);
      setProfilePic(imageUrl as string);
    }
  }, [id, pics]);

  return (
    <>
      {userInfo && (
        <Container>
          <Top>
            <CoverPicture src={coverPic || noImage} />
            <ProfilePicture src={profilePic || ""} />
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
