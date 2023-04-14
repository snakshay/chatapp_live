import ChatAvatar from "./ChatAvatar";

import { Typography } from "@mui/material";

const Message = ({userName, message, align}) => {
    return ( 
        <div style={{justifyContent:align}} className="message-container">
            <ChatAvatar userName={userName}/>
            <div className="message-body">
                <Typography component="div"  className='name' >
                    {userName}
                </Typography>
                <Typography component="div"  className='message'>
                    {message}
                </Typography>
            </div>
        </div>
     );
}
 
export default Message;