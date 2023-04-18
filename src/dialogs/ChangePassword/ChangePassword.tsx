import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormText } from "./ChangePassword.style";

type ChangePasswordPropsType = {
  openChangePwdDialog: boolean;
  setOpenChangePwdDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword = ({
  openChangePwdDialog,
  setOpenChangePwdDialog,
}: ChangePasswordPropsType) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={openChangePwdDialog}
      onClose={(e, r) => {
        if (r && r === "backdropClick") {
          return;
        } else {
          setOpenChangePwdDialog(false);
        }
      }}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Stack
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
          margin="normal"
          width="100%"
        >
          <FormText
            id="oldPassword"
            label="Old Password"
            variant="outlined"
            required
            autoFocus
            autoComplete="password"
            inputProps={{ minLength: 6, maxLength: 100 }}
            sx={{ mt: "8px" }}
          />
          <FormText
            id="newPassword"
            label="New Password"
            variant="outlined"
            required
            inputProps={{ minLength: 6, maxLength: 50 }}
          />
          <FormText
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            required
            inputProps={{ minLength: 6, maxLength: 50 }}
          />
          <Stack flexDirection="row" flexWrap="wrap">
            <Button
              variant="text"
              type="button"
              onClick={() => setOpenChangePwdDialog(false)}
              sx={{ mr: "8px" }}
            >
              Cancel
            </Button>
            <Button variant="text" type="submit">
              Update
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
