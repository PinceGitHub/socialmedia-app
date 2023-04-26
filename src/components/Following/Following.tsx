import {
  Container,
  FollowingList,
  FollowingListItem,
  OnlineBadge,
} from "./Following.style";
import { Typography, Avatar } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { appUrls } from "../../utils/app-utils";

type FollowingPropsType = {
  followings: Array<FollowingType>;
};

export type FollowingType = {
  user: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
};

type FriendPropsType = {
  user: string;
  fullName: string;
  profilePic: string;
};

const Friend = ({ user, fullName, profilePic }: FriendPropsType) => {
  const navigate = useNavigate();

  const handleOnClickUser = () => {
    const url = appUrls.profile.replace(":id", user);
    navigate(url);
  };

  return (
    <FollowingListItem>
      <OnlineBadge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt={fullName}
          src={profilePic}
          sx={{ mr: "10px", cursor: "pointer" }}
          onClick={handleOnClickUser}
        />
      </OnlineBadge>
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
              profilePic={f.profilePic || ""}
            />
          );
        })}
      </FollowingList>
    </Container>
  );
};

export default Following;
