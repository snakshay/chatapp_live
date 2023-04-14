import { Store } from '../Store.context';

import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Login({socket}) {

  sessionStorage.setItem("refresh","false");

  const navigate = useNavigate();
  const { store, setStore } = useContext(Store);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get('userName');
    const roomName = data.get('roomName');
    socket.emit("joinRoom",{userName, roomName});
    const allMessages =[...store];
    allMessages.push({
      userId:"",
      userName:userName,
      text:`Welcome ${userName}`,
      align:"center"
    });
    setStore(allMessages);
    navigate(`/chat/${roomName}/${userName}`);
  };

  return (
    <Container component="main" maxWidth="sm" color="">
        <CssBaseline />
        <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        border:'1px solid',
        padding:'40px',
        borderRadius:'1em',
        backgroundColor : '#1F1F1F',
        borderColor:'#586171'
        }}
        >

            <Typography component="h1" variant="h5">
            Welcome to Chat App
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
                sx={{
                my: 3
                }}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="roomName"
                label="Room name"
                type="text"
                id="roomName"
                autoComplete="roomName"
                sx={{
                my: 3
                }}
                />
                <Box
                 sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',   
                    }}>

                </Box>
                    <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ my: 4}}
                    >
                    Join Room
                    </Button>
            </Box>
        </Box>
    </Container>
  );
}