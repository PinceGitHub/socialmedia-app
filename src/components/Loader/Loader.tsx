import { Backdrop, CircularProgress } from "@mui/material";

type LoaderPropsType = {
  open: boolean;
};

const Loader = ({ open }: LoaderPropsType) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.tooltip + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
