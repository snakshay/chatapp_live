import Login from "./components/Login";
import Chat from './components/Chat';
import { Store } from "./Store.context";
import { theme } from "./dartTheme";


import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const socket = io.connect('https://chatapp-server-lw0p.onrender.com/');

const darkTheme = createTheme(theme);

function AppMain() {
  const params  = useParams(); 
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem('refresh')==='true'){
      navigate('/')
    }
    sessionStorage.setItem("refresh","true");
  },[navigate])
  return (
    <Chat userName={params.userName} roomName={params.roomName} socket={socket}/>
  );
}


function App() {

  const [store, setStore] = useState([]);
  socket.off("message").on("message", (data) => {
    setStore(store => [...store, data]);
  });
  
  return (
   <Store.Provider value={{store, setStore}} >

         <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes> 
              <Route path="/" element={<Login socket={socket}/>}></Route>
              <Route path="/chat/:roomName/:userName" element={<AppMain />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </Store.Provider>
  );
}

export default App;
