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
  Center,
  Container,
  CoverPicture,
  CoverSection,
  ImgCancel,
  InfoCombo,
  InfoSection,
  InfoText,
  ProfileSection,
  UploadOption,
} from "./EditProfile.style";
import { Collections } from "@mui/icons-material";
import ChangePassword from "../ChangePassword/ChangePassword";

import { useState } from "react";
import useSnackbar from "../../hooks/useSnackbar";

type EditProfilePropsType = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  profilePicture: string | null;
  coverPicture: string | null;
  description?: string;
  city?: string;
  from?: string;
  relationship?: number;
};

const relationshipOptions = [
  { id: "-1", label: "Unknown" },
  { id: "1", label: "Single" },
  { id: "2", label: "Married" },
  { id: "3", label: "Complicated" },
];

const EditProfile = (props: EditProfilePropsType) => {
  const snackbar = useSnackbar();

  const [openChangePwdDialog, setOpenChangePwdDialog] = useState(false);
  const [profile, setProfile] = useState({
    profilePicture: props.profilePicture || "",
    coverPicture: props.coverPicture || "",
    description: props.description || "",
    city: props.city || "",
    from: props.from || "",
    relationship: props.relationship || -1,
  });
  const [profilePicFile, setProfilePicFile] = useState<null | undefined | File>(
    null
  );
  const [coverPicFile, setCoverPicFile] = useState<null | undefined | File>(
    null
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedFile = e.target.files?.[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

      if (uploadedFile) {
        if (allowedExtensions.exec(uploadedFile.name)) {
          e.target.id === "file_profilePic"
            ? setProfilePicFile(uploadedFile)
            : setCoverPicFile(uploadedFile);
        } else {
          e.target.id === "file_profilePic"
            ? setProfilePicFile(null)
            : setCoverPicFile(null);
          snackbar({
            show: true,
            messageType: "error",
            message: "File type is incorrect",
          });
        }
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.message,
      });
    }
  };

  const handleUpdateProfile = () => {
    try {
      if (profilePicFile) {
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.openEditDialog}
        onClose={(e, r) => {
          if (r && r === "backdropClick") {
            return;
          } else {
            props.setOpenEditDialog(false);
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
              <Center>
                <Avatar
                  src={
                    profilePicFile
                      ? URL.createObjectURL(profilePicFile)
                      : profile.profilePicture
                  }
                  sx={{ height: "150px", width: "150px", mb: "16px" }}
                />
                {profilePicFile && (
                  <ImgCancel onClick={() => setProfilePicFile(null)} />
                )}
              </Center>
              <UploadOption htmlFor="file_profilePic">
                <Collections
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                Select a photo
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file_profilePic"
                  multiple={false}
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </UploadOption>
            </ProfileSection>
            <CoverSection>
              <Typography mb={2} fontWeight="500">
                Cover Picture
              </Typography>
              <Center>
                <CoverPicture
                  src={
                    coverPicFile
                      ? URL.createObjectURL(coverPicFile)
                      : profile.coverPicture
                  }
                />
                {coverPicFile && (
                  <ImgCancel onClick={() => setCoverPicFile(null)} />
                )}
              </Center>
              <UploadOption htmlFor="file_coverPic">
                <Collections
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                Select a photo
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file_coverPic"
                  multiple={false}
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </UploadOption>
            </CoverSection>
            <InfoSection>
              <InfoText
                value={profile.description}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    description: e.target.value.replace(/"/g, "'"),
                  }))
                }
                id="description"
                label="Description"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
              <InfoText
                value={profile.city}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    city: e.target.value.replace(/"/g, "'"),
                  }))
                }
                id="city"
                label="City"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
              <InfoText
                value={profile.from}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    from: e.target.value.replace(/"/g, "'"),
                  }))
                }
                id="from"
                label="From"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
              <InfoCombo
                defaultValue={
                  relationshipOptions.filter(
                    (op) => op.id === String(profile.relationship)
                  )[0]
                }
                disablePortal
                disableClearable
                id="relationshipStatus"
                options={relationshipOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Relationship Status" />
                )}
              />
              <Button
                variant="text"
                onClick={() => setOpenChangePwdDialog(true)}
              >
                Change Password
              </Button>
            </InfoSection>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpenEditDialog(false)}>Cancel</Button>
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
