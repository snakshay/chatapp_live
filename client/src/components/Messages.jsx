import { Store } from "../Store.context";
import Message from "./Message";

import { useContext, useEffect, useRef, useState } from "react";

const Messages = ({socket}) => {

    const messagesEndRef = useRef(null);
    const {store} = useContext(Store);
    const [typing,setTyping] =useState({});
    useEffect(() =>{
        setTimeout(()=>{
            setTyping("");
        },2000)
    },[typing])

    socket.off("typing").on("typing", (data) => {
        setTyping(data);
      });

    useEffect(()=>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [typing]);
    
    return ( 
        <div className="messages-container" >
            {store && store.map((e,id) =><Message userName={e.username} align={e.align} message={e.text} key={id}/>)}
            {typing && <Message userName={typing.username} align={typing.align} message={typing.text} />}
            <div ref={messagesEndRef} />
        </div>
     );
}
 
export default Messages;