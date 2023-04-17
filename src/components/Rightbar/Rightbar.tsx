import { Typography } from "@mui/material";
import { Container, Wrapper } from "./Rightbar.style";

const Rightbar = () => {
  return (
    <Container>
      <Wrapper>
        <Typography variant="h4" fontSize="16px" fontWeight="500">
          Followings
        </Typography>
      </Wrapper>
    </Container>
  );
};

export default Rightbar;
