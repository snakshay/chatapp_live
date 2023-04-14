
import { Store } from '../Store.context';
import ChatAvatar from './ChatAvatar';

import { useContext, useState } from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';

export default function SendMessage({userName, socket}) {
  const [text, setText] = useState("");
  const {store, setStore} = useContext(Store);

  const sendData = () => {
    if (text) {
      socket.emit("chat", text);
      const allMessages =[...store];
      allMessages.push({
        userId:"",
        userName:userName,
        text:text,
        align:"right"
      });
      setStore(allMessages);
      setText("");
    }
  };

  const userTyping = (e) =>{
    setText(e.target.value)
    socket.emit("typing");
  }

  return (
    <div className="send-message-container">
        <ChatAvatar userName={userName}/>

        <TextareaAutosize
          maxRows={7}
          minRows={3}
          placeholder="Type a message"
          className='text-area'
          value={text}
          onChange={(e) => userTyping(e)}
        />
        
        <SendIcon sx={{cursor:'pointer'}}
          onClick={sendData}
        />
    </div>
  );
}