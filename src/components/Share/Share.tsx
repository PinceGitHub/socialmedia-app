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
import { useState } from "react";

const Share = () => {
  const [file, setFile] = useState<null | undefined | File>(null);

  return (
    <Container>
      <Wrapper>
        <TextField
          placeholder="Write something here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Profile alt="Remy Sharp" src="" />
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
