import { Container, InfoItem } from "./UserInfo.style";
import { Typography } from "@mui/material";

const UserInfo = () => {
  return (
    <Container>
      <Typography variant="h4" fontSize="15px" fontWeight="500" mb={2}>
        User Information
      </Typography>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          City
        </Typography>
        <Typography>Bengaluru</Typography>
      </InfoItem>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          From
        </Typography>
        <Typography>Jamshedpur</Typography>
      </InfoItem>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          Relationship
        </Typography>
        <Typography>Married</Typography>
      </InfoItem>
    </Container>
  );
};

export default UserInfo;
