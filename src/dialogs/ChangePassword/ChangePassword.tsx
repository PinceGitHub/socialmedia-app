import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormText } from "./ChangePassword.style";

import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { serviceUrls } from "../../utils/app-utils";

type ChangePasswordPropsType = {
  openChangePwdDialog: boolean;
  setOpenChangePwdDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword = ({
  openChangePwdDialog,
  setOpenChangePwdDialog,
}: ChangePasswordPropsType) => {
  const showLoader = useLoader();
  const snackbar = useSnackbar();
  const axios = useAxiosPrivate();

  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (state.oldPassword.trim() === state.newPassword.trim()) {
        const newPwdInputElem: any =
          e.currentTarget.elements.namedItem("newPassword");

        if (newPwdInputElem) {
          newPwdInputElem.focus();
        }

        snackbar({
          show: true,
          messageType: "error",
          message: "The new password is the same as the previous one.",
        });
      } else if (state.newPassword.trim() !== state.confirmPassword.trim()) {
        const confirmPwdInputElem: any =
          e.currentTarget.elements.namedItem("confirmPassword");

        if (confirmPwdInputElem) {
          confirmPwdInputElem.focus();
        }

        snackbar({
          show: true,
          messageType: "error",
          message: "The new and confirmed passwords do not match.",
        });
      } else {
        showLoader(true);

        await axios({
          url: serviceUrls.auth.changePassword.path,
          method: serviceUrls.auth.changePassword.method,
          data: {
            oldPassword: state.oldPassword,
            newPassword: state.newPassword,
          },
        });

        setOpenChangePwdDialog(false);
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.response?.data?.message || error.message,
      });
    } finally {
      showLoader(false);
    }
  };

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
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <FormText
            type="password"
            value={state.oldPassword}
            onChange={(e) =>
              setState((prev) => ({ ...prev, oldPassword: e.target.value }))
            }
            id="oldPassword"
            label="Old Password"
            variant="outlined"
            required
            autoFocus
            autoComplete="password"
            inputProps={{ minLength: 6, maxLength: 20 }}
            sx={{ mt: "8px" }}
          />
          <FormText
            type="password"
            value={state.newPassword}
            onChange={(e) =>
              setState((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            id="newPassword"
            label="New Password"
            variant="outlined"
            required
            inputProps={{ minLength: 6, maxLength: 20 }}
          />
          <FormText
            type="password"
            value={state.confirmPassword}
            onChange={(e) =>
              setState((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            required
            inputProps={{ minLength: 6, maxLength: 20 }}
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
