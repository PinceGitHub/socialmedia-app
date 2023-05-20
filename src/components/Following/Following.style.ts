import { styled } from "@mui/material/styles";
import { Stack, Badge } from "@mui/material";

export const Container = styled(Stack)(() => ({
  flexDirection: "column",
  justifyContent: "center",
}));

export const FollowingList = styled("ul")(() => ({
  listStyle: "none",
  marginTop: "16px",
}));

export const FollowingListItem = styled("li")(({ theme }) => ({
  display: "flex",
  marginBottom: "16px",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "8px",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "8px",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "0",
  },
}));

type OnlineBadgeProps = {
  badgecolor: "limegreen" | "lightgray";
};

export const OnlineBadge = styled(Badge)<OnlineBadgeProps>(
  ({ theme, badgecolor }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: badgecolor,
      color: badgecolor,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        content: '""',
      },
    },
  })
);
