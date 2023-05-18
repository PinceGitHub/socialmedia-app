import {
  Container,
  FollowingList,
  FollowingListItem,
  // OnlineBadge,
} from "./Following.style";
import { Typography, Avatar, Fade, Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { appUrls } from "../../utils/app-utils";
import { useEffect, useState } from "react";
import usePics from "../../hooks/usePics";
import UserChat from "../../dialogs/UserChat/UserChat";

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
    if (profilePicName && profilePicName.trim() !== "") {
      const profilePicUrl = pics.get(`${user}_profile_${profilePicName}`);
      profilePicUrl && setProfilePic(profilePicUrl);
    }
  }, [user, profilePicName, pics]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openUserChatDialog, setOpenUserChatDialog] = useState(false);

  const handleOpenOptions = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleSelectMenuItem = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(null);
    const selectedOption = e.currentTarget.innerText;

    if (selectedOption.toLowerCase() === "profile") {
      navigate(appUrls.profile.replace(":id", user));
    } else {
      setOpenUserChatDialog(true);
    }
  };

  return (
    <>
      <FollowingListItem>
        {/* <OnlineBadge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="dot"
      > */}
        <Avatar
          alt={fullName}
          src={profilePic || ""}
          sx={{ mr: "10px", cursor: "pointer" }}
          onClick={(e) => handleOpenOptions(e)}
        />
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseOptions}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={(e) => handleSelectMenuItem(e)}>Profile</MenuItem>
          <MenuItem onClick={(e) => handleSelectMenuItem(e)}>Chat</MenuItem>
        </Menu>
        {/* </OnlineBadge> */}
        <Typography>{fullName}</Typography>
      </FollowingListItem>
      {openUserChatDialog && (
        <UserChat
          openUserChatDialog={openUserChatDialog}
          setOpenUserChatDialog={setOpenUserChatDialog}
          profilePic={profilePic}
          fullName={fullName}
        />
      )}
    </>
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
