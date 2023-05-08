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
import useLoader from "../../hooks/useLoader";
import useDeleteImg from "../../hooks/useDeleteImg";
import useUploadImg from "../../hooks/useUploadImg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { serviceUrls } from "../../utils/app-utils";
import useAuth from "../../hooks/useAuth";

type EditProfilePropsType = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
  profilePicture: string | null;
  coverPicture: string | null;
  description?: string;
  city?: string;
  from?: string;
  relationship?: number;
  profilePicName: string;
  coverPicName: string;
};

const relationshipOptions = [
  { id: "-1", label: "Unknown" },
  { id: "1", label: "Single" },
  { id: "2", label: "Married" },
  { id: "3", label: "Complicated" },
];

const EditProfile = (props: EditProfilePropsType) => {
  const snackbar = useSnackbar();
  const showLoader = useLoader();
  const deletePic = useDeleteImg();
  const uploadPic = useUploadImg();
  const axios = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const [openChangePwdDialog, setOpenChangePwdDialog] = useState(false);
  const [profile, setProfile] = useState({
    user: props.user,
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

  const handleUpdateProfile = async () => {
    const payload: any = {};

    try {
      showLoader(true);

      let errorCount = 0;

      //If you have a changed profile photo, upload it.
      if (profilePicFile) {
        const resp = await uploadPic(profile.user, "profile", profilePicFile);

        if (resp.isSuccess) {
          payload.profilePicture = resp.imgName;
        } else {
          errorCount += 1;
          snackbar({
            show: true,
            messageType: "error",
            message: resp.error.message,
          });
        }
      }

      //if you have a changed cover photo, upload it.
      if (errorCount === 0 && coverPicFile) {
        const resp = await uploadPic(profile.user, "cover", coverPicFile);

        if (resp.isSuccess) {
          payload.coverPicture = resp.imgName;
        } else {
          errorCount += 1;
          snackbar({
            show: true,
            messageType: "error",
            message: resp.error.message,
          });
        }
      }

      if (errorCount === 0) {
        if (props.description !== profile.description.trim()) {
          payload.description = profile.description.trim().replace(/"/g, "'");
        }

        if (props.city !== profile.city.trim()) {
          payload.city = profile.city.trim().replace(/"/g, "'");
        }

        if (props.from !== profile.from.trim()) {
          payload.from = profile.from.trim().replace(/"/g, "'");
        }

        if (props.relationship !== profile.relationship) {
          payload.relationship = profile.relationship;
        }
      }

      if (Object.keys(payload).length) {
        await axios({
          url: serviceUrls.profile.upsertProfile.path,
          method: serviceUrls.profile.upsertProfile.method,
          data: payload,
        });

        const deletePrevPicsArr = [];

        if (payload.profilePicture) {
          props.profilePicName !== "" &&
            deletePrevPicsArr.push({
              user: props.user,
              imgType: "profile",
              imgName: props.profilePicName,
            });

          if (auth) {
            setAuth({
              userId: auth.userId,
              email: auth.email,
              firstName: auth.firstName,
              lastName: auth.lastName,
              profilePicture: payload.profilePicture,
              accessToken: auth.accessToken,
            });
          }
        }

        if (payload.coverPicture && props.coverPicName !== "") {
          deletePrevPicsArr.push({
            user: props.user,
            imgType: "cover",
            imgName: props.coverPicName,
          });
        }

        deletePrevPicsArr.length &&
          (await Promise.allSettled(
            deletePrevPicsArr.map((p) => {
              return deletePic(
                p.user,
                p.imgType === "profile" ? "profile" : "cover",
                p.imgName
              );
            })
          ));

        props.setOpenEditDialog(false);
        props.setRefetch(true);
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
                    description: e.target.value,
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
                    city: e.target.value,
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
                    from: e.target.value,
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
                    (op) => op.id === String(profile.relationship || -1)
                  )[0]
                }
                disablePortal
                disableClearable
                id="relationshipStatus"
                options={relationshipOptions}
                onChange={(e, v: any) =>
                  setProfile((prev) => ({
                    ...prev,
                    relationship: Number(v.id),
                  }))
                }
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
          <Button type="button" onClick={handleUpdateProfile}>
            Update
          </Button>
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
