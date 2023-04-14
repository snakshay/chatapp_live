import ChatAvatar from "./ChatAvatar";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { Store } from "../Store.context";

import { useContext } from "react";

import { Box, Container } from "@mui/material";

const Chat = ({ userName, roomName, socket }) => {

  const {store} = useContext(Store)


    return (
      <Container  maxWidth="100%"  sx={{my:0}}>
        <Box
          sx={{
          my: 1,
          p:3,
          border:'1px solid',
          borderRadius:'1em',
          borderColor:'#586171',
          height:'97vh',
          backgroundColor:'#1F1F1F',
          }}
          >
          <div className="chat-container">
            <div className="chat-header">
                {roomName}
                <ChatAvatar userName={userName}/>
            </div>

            <Messages messages={store} socket={socket}/>

            <SendMessage userName={userName} socket={socket} roomName={roomName} />
          </div>
        </Box>
      </Container>
    );
}
 
export default Chat;