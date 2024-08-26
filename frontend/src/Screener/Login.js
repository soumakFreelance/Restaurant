import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material'; // Importing Material-UI icons
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

export default function Login() {
    const { login } = useAuth(); // Get the login function from the AuthContext
    let navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            // "http://localhost:5000/api/loginuser"
            `${window.location.origin}/api/loginuser`
            , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password,
            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid Credentials");
        } else {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userEmail", state.email);
            console.log(localStorage.getItem("authToken"));

            // Call the login function to set the user as authenticated
            login();

            // Navigate to the home page after successful login
            navigate("/Home");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <Container maxWidth="sm">
                    <form className='formLogin' onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom>
                            LogIn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="inputWithIcon">
                                <Email className="icon" />
                                <TextField
                                    type="email"
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    required
                                    name='email'
                                    value={state.email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="inputWithIcon">
                                <Lock className="icon" />
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    variant="standard"
                                    fullWidth
                                    required
                                    name='password'
                                    value={state.password}
                                    onChange={onChange}
                                />
                                <IconButton
                                    className="eyeIcon"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} className='btnSignup'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    Login
                                </Button>
                                <Button variant='contained' color='secondary'>
                                    <Link to="/Signup" className='alreadyUser'>
                                        Sign Up
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
