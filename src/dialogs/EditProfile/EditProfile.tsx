import { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {
  Container,
  CoverPicture,
  CoverSection,
  InfoCombo,
  InfoSection,
  InfoText,
  ProfileSection,
} from "./EditProfile.style";
import { Upload } from "@mui/icons-material";
import ChangePassword from "../ChangePassword/ChangePassword";

type EditProfilePropsType = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfile = ({
  openEditDialog,
  setOpenEditDialog,
}: EditProfilePropsType) => {
  const [openChangePwdDialog, setOpenChangePwdDialog] = useState(false);

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={openEditDialog}
        onClose={(e, r) => {
          if (r && r === "backdropClick") {
            return;
          } else {
            setOpenEditDialog(false);
          }
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Container>
            <ProfileSection>
              <Typography mb={2} fontWeight="500">
                Profile Picture
              </Typography>
              <Avatar sx={{ height: "150px", width: "150px", mb: "16px" }} />
              <Button variant="outlined" startIcon={<Upload />}>
                Upload photo
              </Button>
            </ProfileSection>
            <CoverSection>
              <Typography mb={2} fontWeight="500">
                Cover Picture
              </Typography>
              <CoverPicture />
              <Button variant="outlined" startIcon={<Upload />}>
                Upload photo
              </Button>
            </CoverSection>
            <InfoSection>
              <InfoText
                id="description"
                label="Description"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
              <InfoText
                id="city"
                label="City"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
              <InfoText
                id="from"
                label="From"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
              <InfoCombo
                disablePortal
                id="relationshipStatus"
                options={[
                  { id: "-1", label: "Unknown" },
                  { id: "0", label: "Single" },
                  { id: "1", label: "Married" },
                  { id: "2", label: "Complicated" },
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="Relationship Status" />
                )}
              />
            </InfoSection>
            <Button variant="text" onClick={() => setOpenChangePwdDialog(true)}>
              Change Password
            </Button>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button type="button">Update</Button>
        </DialogActions>
      </Dialog>
      {openChangePwdDialog && (
        <ChangePassword
          openChangePwdDialog={openChangePwdDialog}
          setOpenChangePwdDialog={setOpenChangePwdDialog}
        />
      )}
    </>
  );
};

export default EditProfile;
