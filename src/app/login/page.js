'use client'
import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../index';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('user:', userCredential.user);
            redirect('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError("Invalid email or password");

        });
    };

    return (

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={"10%"}
                
            >
                 {error && <Typography variant="h6" color="error">{error}</Typography>}
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
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
                    <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
    );
};

export default LoginPage;
