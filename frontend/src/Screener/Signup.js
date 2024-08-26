import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { Person, Email, Lock, Home, Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        geoLocation: "",
        showPassword: false, // Add state to handle password visibility
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setState((prevState) => ({
            ...prevState,
            showPassword: !prevState.showPassword,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            // "http://localhost:5000/api/createuser"
            `${window.location.origin}/api/createuser`            
            , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password,
                location: state.geoLocation
            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid Credentials");
        } else {
            setState({
                name: "",
                email: "",
                password: "",
                geoLocation: "",
                showPassword: false,
            })
            navigate("/")
        }
    };

    return (
        <>
            <Navbar />
            <div className="background">
                <Container maxWidth="sm" className="transparent-form">
                    <form>
                        <Typography variant="h4" align="center" gutterBottom>
                            Sign Up
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="input-with-icon">
                                    <Person />
                                    <TextField
                                        label="Name"
                                        variant="standard"
                                        fullWidth
                                        required
                                        name='name'
                                        value={state.name}
                                        onChange={onChange}
                                        id='inputSignupName'
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="input-with-icon">
                                    <Email />
                                    <TextField
                                        type="email"
                                        label="Email"
                                        variant="standard"
                                        fullWidth
                                        required
                                        name='email'
                                        value={state.email}
                                        onChange={onChange}
                                        id='inputSignupEmail'
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="input-with-icon">
                                    <Lock />
                                    <TextField
                                        type={state.showPassword ? "text" : "password"}
                                        label="Password"
                                        variant="standard"
                                        fullWidth
                                        required
                                        name='password'
                                        value={state.password}
                                        onChange={onChange}
                                        id='inputSignupPassword'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                        className="visibility-icon-Signup"
                                                    >
                                                        {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="input-with-icon">
                                    <Home />
                                    <TextField
                                        type="text"
                                        label="Address"
                                        variant="standard"
                                        fullWidth
                                        required
                                        name='geoLocation'
                                        value={state.geoLocation}
                                        onChange={onChange}
                                        id='inputSignupLocation'
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} className='btnSignup'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant='contained' color='secondary'>
                                    <Link to="/login" className='alreadyUser'>
                                        Already a user
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
            <Footer />
        </>
    );
}
