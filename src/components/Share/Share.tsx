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

const Share = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { auth } = useAuth();
  const { pics } = usePics();

  useEffect(() => {
    const user = auth?.userId;

    if (user && pics.has(`${user}_profile`)) {
      const imageUrl = pics.get(`${user}_profile`);
      setProfilePic(imageUrl as string);
    }
  }, [auth, pics]);

  const [file, setFile] = useState<null | undefined | File>(null);

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
            <ShareText>Photo or Video</ShareText>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              multiple={false}
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </ShareOption>
          <Button variant="contained" color="success" size="small">
            Share
          </Button>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Share;
