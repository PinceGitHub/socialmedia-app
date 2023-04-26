import { Container, InfoItem } from "./UserInfo.style";
import { Typography } from "@mui/material";

export type UserInfoPropsType = {
  city: string | undefined;
  from: string | undefined;
  relationship: number | undefined;
};

const UserInfo = ({ city, from, relationship }: UserInfoPropsType) => {
  return (
    <Container>
      <Typography variant="h4" fontSize="15px" fontWeight="500" mb={2}>
        User Information
      </Typography>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          City
        </Typography>
        <Typography>{city || "Not Available"}</Typography>
      </InfoItem>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          From
        </Typography>
        <Typography>{from || "Not Available"}</Typography>
      </InfoItem>
      <InfoItem>
        <Typography mr={1} fontWeight="500">
          Relationship
        </Typography>
        <Typography>
          {relationship
            ? relationship === -1
              ? "Unknown"
              : relationship === 1
              ? "Single"
              : relationship === 2
              ? "Married"
              : "Complicated"
            : "Unknown"}
        </Typography>
      </InfoItem>
    </Container>
  );
};

export default UserInfo;
