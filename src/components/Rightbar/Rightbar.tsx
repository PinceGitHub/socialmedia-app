import Following, { FollowingType } from "../Following/Following";
import UserInfo, { UserInfoPropsType } from "../UserInfo/UserInfo";
import { Container, Wrapper } from "./Rightbar.style";

type RightbarPropsType = RightbarHomeType | RightbarProfileType;

type RightbarHomeType = {
  profile: false;
  userInfo?: never;
  followings: Array<FollowingType> | null | undefined;
};

type RightbarProfileType = {
  profile: true;
  userInfo?: UserInfoPropsType;
  followings: Array<FollowingType> | null | undefined;
};

const Rightbar = ({ profile, userInfo, followings }: RightbarPropsType) => {
  return (
    <Container>
      <Wrapper>
        {profile && (
          <UserInfo
            city={userInfo?.city}
            from={userInfo?.from}
            relationship={userInfo?.relationship}
          />
        )}
        {followings && followings.length > 0 && (
          <Following followings={followings} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Rightbar;
