import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { Typography, Button } from "@mui/material";
import { Edit, FollowTheSigns } from "@mui/icons-material";
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
  const [followed, setFollowed] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const fetchData = async () => {
    try {
      showLoader(true);

      //Obtain user information and posts.
      const response = await axios({
        url: `${serviceUrls.profile.getProfileByUserId.path}${id}`,
        method: serviceUrls.profile.getProfileByUserId.method,
      });

      const postsResp: Array<PostPropsType> = response.data.responseData.posts;
      const userInfoResp: UserInfoType = response.data.responseData;

      //Fetch the user's cover picture
      if (
        id &&
        userInfoResp.coverPicture &&
        userInfoResp.coverPicture.trim() !== ""
      ) {
        getPic(id, "cover", userInfoResp.coverPicture);
      }

      //Feth the user's and the user's followings' profile pictures
      const uniqueUsers = new Map<string, string>();

      if (
        id &&
        userInfoResp.profilePicture &&
        userInfoResp.profilePicture.trim() !== ""
      ) {
        uniqueUsers.set(id, userInfoResp.profilePicture);
      }

      postsResp?.forEach((post) => {
        if (
          post.profilePicture &&
          post.profilePicture.trim() !== "" &&
          !uniqueUsers.has(post.user)
        ) {
          uniqueUsers.set(post.user, post.profilePicture);
        }
      });

      userInfoResp?.followings?.forEach((following) => {
        if (
          following.profilePicture &&
          following.profilePicture.trim() !== "" &&
          !uniqueUsers.has(following.user)
        ) {
          uniqueUsers.set(following.user, following.profilePicture);
        }
      });

      Promise.allSettled(
        Array.from(uniqueUsers).map((val) => {
          return getPic(val[0], "profile", val[1]);
        })
      );

      setPosts(postsResp);
      setUserInfo(userInfoResp);

      if (
        auth &&
        userInfoResp.followers?.find(
          (follower: any) => follower.user === auth.userId
        )
      ) {
        setFollowed(true);
      }
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

  useEffect(() => {
    fetchData();

    //eslint-disable-next-line
  }, [id]);

  const [coverPic, setCoverPic] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    //allocating the cover photo
    if (userInfo?.coverPicture && userInfo?.coverPicture !== "") {
      const coverPicUrl = pics.get(`${id}_cover_${userInfo.coverPicture}`);
      coverPicUrl && setCoverPic(coverPicUrl);
    }

    //putting a profile photo in
    if (userInfo?.profilePicture && userInfo.profilePicture.trim() !== "") {
      const profilePicUrl = pics.get(
        `${id}_profile_${userInfo.profilePicture}`
      );
      profilePicUrl && setProfilePic(profilePicUrl);
    }
  }, [id, userInfo?.coverPicture, userInfo?.profilePicture, pics]);

  useEffect(() => {
    if (refetch) {
      fetchData();
      setRefetch(false);
    }

    //eslint-disable-next-line
  }, [refetch]);

  const handleFollowUnfollowUser = async () => {
    try {
      showLoader(true);

      if (followed) {
        await axios({
          url: `${serviceUrls.profile.unfollow.path}${id}`,
          method: serviceUrls.profile.unfollow.method,
        });

        const newUserInfo: UserInfoType = JSON.parse(JSON.stringify(userInfo));
        newUserInfo.followers = userInfo?.followers?.filter(
          (follower: any) => follower.user !== auth?.userId
        );

        setUserInfo(newUserInfo);
        setFollowed(false);
      } else {
        await axios({
          url: `${serviceUrls.profile.follow.path}${id}`,
          method: serviceUrls.profile.follow.method,
        });

        setRefetch(true);
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
            {auth && auth.userId === id ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setOpenEditDialog(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<FollowTheSigns />}
                onClick={handleFollowUnfollowUser}
              >
                {followed ? "Unfollow" : "Follow"}
              </Button>
            )}
          </ProfileInfo>
          <Bottom>
            <Feed userId={id} posts={posts} setRefetch={setRefetch} />
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
          setRefetch={setRefetch}
          user={id as string}
          coverPicture={coverPic}
          profilePicture={profilePic}
          description={userInfo?.description}
          city={userInfo?.city}
          from={userInfo?.from}
          relationship={userInfo?.relationship}
          profilePicName={userInfo?.profilePicture || ""}
          coverPicName={userInfo?.coverPicture || ""}
        />
      )}
    </>
  );
};

export default Profile;
