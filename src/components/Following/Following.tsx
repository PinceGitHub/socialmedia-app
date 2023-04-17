import {
  Container,
  FollowingList,
  FollowingListItem,
  OnlineBadge,
} from "./Following.style";
import { Typography, Avatar } from "@mui/material";

const sampleFollowings = [
  { userId: "1", fullName: "Manisha Kumari", profilePic: "" },
  { userId: "2", fullName: "Krushna Jena", profilePic: "" },
];

type FriendsPropsType = {
  userId: string;
  fullName: string;
  profilePic: string;
};

const Friends = ({ userId, fullName, profilePic }: FriendsPropsType) => {
  return (
    <FollowingListItem>
      <OnlineBadge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt={fullName} src="" sx={{ mr: "10px" }} />
      </OnlineBadge>
      <Typography>{fullName}</Typography>
    </FollowingListItem>
  );
};

const Following = () => {
  return (
    <Container>
      <Typography variant="h4" fontSize="15px" fontWeight="500">
        Followings
      </Typography>
      <FollowingList>
        {sampleFollowings.map((f) => {
          return (
            <Friends
              key={f.userId}
              userId={f.userId}
              fullName={f.fullName}
              profilePic={f.profilePic}
            />
          );
        })}
      </FollowingList>
    </Container>
  );
};

export default Following;
