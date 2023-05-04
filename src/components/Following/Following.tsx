import {
  Container,
  FollowingList,
  FollowingListItem,
  OnlineBadge,
} from "./Following.style";
import { Typography, Avatar } from "@mui/material";

import { Link } from "react-router-dom";
import { appUrls } from "../../utils/app-utils";
import { useEffect, useState } from "react";
import usePics from "../../hooks/usePics";

type FollowingPropsType = {
  followings: Array<FollowingType>;
};

export type FollowingType = {
  user: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
};

type FriendPropsType = {
  user: string;
  fullName: string;
  profilePicName?: string;
};

const Friend = ({ user, fullName, profilePicName }: FriendPropsType) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { pics } = usePics();

  useEffect(() => {
    if (profilePicName && pics.has(`${user}_profile`)) {
      const imageUrl = pics.get(`${user}_profile`);
      setProfilePic(imageUrl as string);
    }

    //eslint-disable-next-line
  }, [pics]);

  return (
    <FollowingListItem>
      {/* <OnlineBadge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="dot"
      > */}
      <Link
        to={appUrls.profile.replace(":id", user)}
        style={{ textDecoration: "none" }}
      >
        <Avatar alt={fullName} src={profilePic || ""} sx={{ mr: "10px" }} />
      </Link>
      {/* </OnlineBadge> */}
      <Typography>{fullName}</Typography>
    </FollowingListItem>
  );
};

const Following = ({ followings }: FollowingPropsType) => {
  return (
    <Container>
      <Typography variant="h4" fontSize="15px" fontWeight="500">
        Followings
      </Typography>
      <FollowingList>
        {followings.map((f) => {
          return (
            <Friend
              key={f.user}
              user={f.user}
              fullName={`${f.firstName} ${f.lastName}`}
              profilePicName={f.profilePicture}
            />
          );
        })}
      </FollowingList>
    </Container>
  );
};

export default Following;
