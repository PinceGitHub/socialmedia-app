import {
  Container,
  Wrapper,
  Profile,
  Bottom,
  ShareOption,
  MediaIcon,
  ShareText,
  Center,
  ShareImg,
  ShareImgCancel,
} from "./Share.style";
import { TextField, InputAdornment, Button } from "@mui/material";

import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import usePics from "../../hooks/usePics";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import useUploadImg from "../../hooks/useUploadImg";
import { serviceUrls } from "../../utils/app-utils";

type SharePropsType = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const Share = ({ setRefetch }: SharePropsType) => {
  const { auth } = useAuth();
  const { pics } = usePics();
  const axios = useAxiosPrivate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();
  const upload = useUploadImg();

  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const authUser = auth?.userId;
    const authUserProfilePic = auth?.profilePicture;

    if (authUser && authUserProfilePic?.trim() !== "") {
      const profilePicUrl = pics.get(
        `${authUser}_profile_${authUserProfilePic}`
      );
      profilePicUrl && setProfilePic(profilePicUrl);
    }
  }, [auth, pics]);

  const [file, setFile] = useState<null | undefined | File>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedFile = e.target.files?.[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

      if (uploadedFile) {
        if (allowedExtensions.exec(uploadedFile.name)) {
          setFile(uploadedFile);
        } else {
          setFile(null);
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

  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState({
    error: false,
    helperText: "",
  });

  const handleSubmitPost = async () => {
    try {
      showLoader(true);

      if (description === "") {
        setDescError({
          error: true,
          helperText: "There must be a description.",
        });
      } else {
        setDescError({
          error: false,
          helperText: "",
        });

        let image = null;

        if (file) {
          const uploadResp = await upload(auth?.userId as string, "post", file);

          if (uploadResp.isSuccess) {
            image = uploadResp.imgName;

            await axios({
              url: serviceUrls.posts.create.path,
              method: serviceUrls.posts.create.method,
              data: { description: description.trim(), image },
            });

            setDescription("");
            setFile(null);
            setRefetch(true);
          } else {
            snackbar({
              show: true,
              messageType: "error",
              message: uploadResp.error.message,
            });
          }
        } else {
          await axios({
            url: serviceUrls.posts.create.path,
            method: serviceUrls.posts.create.method,
            data: { description },
          });

          setDescription("");
          setRefetch(true);
        }
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
    <Container>
      <Wrapper>
        <TextField
          placeholder="Write something here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Profile
                  alt={`${auth?.firstName} ${auth?.lastName}`}
                  src={profilePic || ""}
                />
              </InputAdornment>
            ),
          }}
          variant="standard"
          id="txtShare"
          margin="normal"
          fullWidth
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={descError.error}
          helperText={descError.helperText}
        />
        {file && (
          <Center>
            <ShareImg src={URL.createObjectURL(file)} />
            <ShareImgCancel onClick={() => setFile(null)} />
          </Center>
        )}
        <Bottom>
          <ShareOption htmlFor="file">
            <MediaIcon />
            <ShareText>Photo</ShareText>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              multiple={false}
              accept=".png,.jpeg,.jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </ShareOption>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleSubmitPost}
          >
            Share
          </Button>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Share;
