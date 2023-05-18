import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Avatar,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import {
  ToolbarWrapper,
  ChatBoxWrapper,
  ChatBoxBottom,
  ChatBoxTop,
  MessageWrapper,
  MessageText,
  ConversationWrapper,
} from "./UserChat.style";

import { forwardRef, useRef, useEffect, useState } from "react";

type UserChatPropsType = {
  openUserChatDialog: boolean;
  setOpenUserChatDialog: React.Dispatch<React.SetStateAction<boolean>>;
  profilePic: string | null;
  fullName: string;
};

type MessagePropsType = {
  own?: boolean;
  text: string;
  time: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Message = ({ own, text, time }: MessagePropsType) => {
  return (
    <MessageWrapper alignItems={own ? "flex-end" : "flex-start"}>
      <MessageText sx={{ backgroundColor: `${own ? "#3c753c" : "#564f4f"}` }}>
        {text}
      </MessageText>
      <Typography padding="5px">{time}</Typography>
    </MessageWrapper>
  );
};

const UserChat = ({
  openUserChatDialog,
  setOpenUserChatDialog,
  profilePic,
  fullName,
}: UserChatPropsType) => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const currentScroll: any = scrollRef.current;
    currentScroll && currentScroll.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Dialog
      fullScreen
      open={openUserChatDialog}
      onClose={(e, r) => {
        if (r && r === "backdropClick") {
          return;
        } else {
          setOpenUserChatDialog(false);
        }
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <ToolbarWrapper>
            <Stack flexDirection="row" alignItems="center">
              <Avatar alt={fullName} src={profilePic || ""} />
              <Typography ml={1}>{fullName}</Typography>
            </Stack>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenUserChatDialog(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </ToolbarWrapper>
        </Toolbar>
      </AppBar>
      {conversationId ? (
        <ChatBoxWrapper>
          <ChatBoxTop>
            <div ref={scrollRef}>
              <Message own={true} text="Hi, I am Superman" time="2 min ago" />
              <Message own={true} text="How are you?" time="2 min ago" />
              <Message text="Hi, Superman, I am Batman" time="1 min ago" />
              <Message text="I am fine, thank you" time="just now" />
            </div>
          </ChatBoxTop>
          <ChatBoxBottom>
            <TextField
              rows="4"
              multiline
              sx={{ width: "80%", mr: "8px", mb: "3px" }}
              placeholder="Enter your message here..."
              autoFocus
            />
            <Button sx={{ mb: "3px" }} size="small" variant="contained">
              Send
            </Button>
          </ChatBoxBottom>
        </ChatBoxWrapper>
      ) : (
        <ConversationWrapper>
          <Button variant="contained" onClick={() => setConversationId("1")}>
            To begin the conversation, please click here.
          </Button>
        </ConversationWrapper>
      )}
    </Dialog>
  );
};

export default UserChat;
