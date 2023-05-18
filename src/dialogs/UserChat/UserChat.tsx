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
import useSnackbar from "../../hooks/useSnackbar";
import useLoader from "../../hooks/useLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { serviceUrls } from "../../utils/app-utils";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

type UserChatPropsType = {
  openUserChatDialog: boolean;
  setOpenUserChatDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
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
  user,
  profilePic,
  fullName,
}: UserChatPropsType) => {
  const scrollRef = useRef(null);
  const snackbar = useSnackbar();
  const showLoader = useLoader();
  const axios = useAxiosPrivate();
  const { auth } = useAuth();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: string;
  }> | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        showLoader(true);

        const members = [user, auth?.userId];
        const resp = await axios({
          url: serviceUrls.chat.getMessages.path,
          method: serviceUrls.chat.getMessages.method,
          data: { members },
        });

        setConversationId(resp.data.responseData?._id);
        setMessages(resp.data.responseData?.messages);
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

    fetchMessages();

    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (messages?.length) {
      const dummyDiv: any = scrollRef.current;
      dummyDiv && dummyDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleCreateConversation = async () => {
    try {
      showLoader(true);

      const members = [user, auth?.userId];
      const resp = await axios({
        url: serviceUrls.chat.createConversation.path,
        method: serviceUrls.chat.createConversation.method,
        data: { members },
      });

      setConversationId(resp.data.responseData._id);
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

  const [text, setText] = useState("");

  const handleSendMessage = async () => {
    try {
      if (text.trim() !== "") {
        const resp = await axios({
          url: serviceUrls.chat.createMessage.path,
          method: serviceUrls.chat.createMessage.method,
          data: { conversationId, text },
        });
        const newMessage = {
          _id: resp.data.responseData?._id,
          conversationId: resp.data.responseData?.conversationId,
          sender: resp.data.responseData?.sender,
          text,
          createdAt: resp.data.responseData?.createdAt,
        };
        setMessages(messages ? messages.concat(newMessage) : [newMessage]);
        setText("");
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.response?.data?.message || error.message,
      });
    }
  };

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
            {messages &&
              messages.map((message) => {
                return (
                  <Message
                    key={message._id}
                    own={message.sender === auth?.userId}
                    text={message.text}
                    time={moment(new Date(message.createdAt)).fromNow()}
                  />
                );
              })}
            <div style={{ float: "left", clear: "both" }} ref={scrollRef} />
          </ChatBoxTop>
          <ChatBoxBottom>
            <TextField
              rows="4"
              multiline
              sx={{ width: "80%", mr: "8px", mb: "3px" }}
              placeholder="Enter your message here..."
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              sx={{ mb: "3px" }}
              size="small"
              variant="contained"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </ChatBoxBottom>
        </ChatBoxWrapper>
      ) : (
        <ConversationWrapper>
          <Button variant="contained" onClick={handleCreateConversation}>
            To begin the conversation, please click here.
          </Button>
        </ConversationWrapper>
      )}
    </Dialog>
  );
};

export default UserChat;
