import { Typography } from "@mui/material";
import { Container } from "./PageNotFound.style";
import { Link } from "react-router-dom";
import { appUrls } from "../../utils/app-utils";

const PageNotFound = () => {
  return (
    <Container sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
      <Typography variant="h1" fontWeight="700" color="white">
        404
      </Typography>
      <Typography variant="h5" fontWeight="500" color="white">
        You appear to be lost
      </Typography>
      <Typography
        component="span"
        textAlign="center"
        fontWeight="400"
        color="white"
        mb={2}
      >
        The page you are searching for does not exist
      </Typography>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={appUrls.home}
        replace
      >
        To return home, please click here
      </Link>
    </Container>
  );
};

export default PageNotFound;
