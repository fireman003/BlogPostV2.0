'use client'
import {useState, useEffect} from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../index';
import { redirect } from 'next/navigation'

const RegisterPage = () => {
    const [uuid, setUuid] = useState(''); 
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            console.log('password too short');
        
        } else {
            if (password === repeatPassword) {
                createUserWithEmailAndPassword(auth, email, password).then( async (userCredential) => {
                    const user = userCredential.user;
                    setUuid(user.uid);
                    console.log('user:', user); 
                }).catch((error) => {
                    console.log(error);
                    setError("this email is already in use");
                });
            } else {
                setError("Passwords do not match");
            }
        }
    };

    useEffect(() => {
        console.log('uuid:', uuid);
        if(uuid !== '') {
            redirect('/');
        }
    }, [uuid]);

    return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={"10%"}
                width={"50%"}
            >
                {error && <Typography variant="h6" color="error">{error}</Typography>}

                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Surname"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Repeat Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                    <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
    );
};

export default RegisterPage;