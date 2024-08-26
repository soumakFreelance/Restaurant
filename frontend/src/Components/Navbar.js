import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, MenuList, Toolbar, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import Modal from '../Modal';
import Cart from '../Screener/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    const [anchorNav, setAnchorNav] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // Manage logged-in state
    let data = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setLoggedIn(!!authToken); // Set loggedIn based on presence of authToken
    }, []);

    const pages = loggedIn ? ['Home', 'MyOrder'] : ['Home', 'Signup', 'Login'];

    const openMenu = (event) => {
        setAnchorNav(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorNav(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove authToken
        setLoggedIn(false);
        closeMenu();
        navigate('/'); // Navigate to home page
    };

    return (
        <AppBar position='static' color='secondary'>
            <Toolbar>
                <IconButton size='large' color='inherit' aria-label='logo' edge="start" className='iconButton'>
                    <RestaurantIcon />
                </IconButton>
                <Typography variant='h6' component='div' className='typographyNavHeading'>
                    BHOJON
                </Typography>
                <Box className="boxForLargeScreen">
                    {pages.map((page, index) => (
                        <Button key={index} color='inherit' component={Link} to={`/${page.toLowerCase()}`}>
                            {page}
                        </Button>
                    ))}
                    {loggedIn && <Button className='btnLogout' onClick={handleLogout}>Logout</Button>}
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                    {loggedIn && <Button className='btnLogout' onClick={() => { setCartView(true) }}>Mykart
                        <Badge color="error" overlap="circular" badgeContent={data.length}>
                            <FmdBadIcon />
                        </Badge>
                    </Button>}
                </Box>
                <Box className='boxForSmallScreen'>
                    <IconButton size="large" color='inherit' onClick={openMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu open={Boolean(anchorNav)} className='menuSmall' onClose={closeMenu}>
                        <MenuList>
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    color='inherit'
                                    component={Link}
                                    onClick={page === 'Logout' ? handleLogout : closeMenu}
                                    to={`/${page.toLowerCase()}`}
                                >
                                    {page}
                                </MenuItem>
                            ))}
                        </MenuList>
                        <div className='btnSmallKart'>
                            {loggedIn && <Button onClick={handleLogout} className='btnLogoutSmall'>Logout</Button>}
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            {/* {loggedIn && <Button onClick={handleLogout} className='btnLogoutSmall'>Mykart</Button>} */}
                            {loggedIn && <Button className='btnLogoutSmall' onClick={() => { setCartView(true) }}>Mykart
                                <Badge color="error" overlap="circular" badgeContent={data.length}>
                                    <FmdBadIcon />
                                </Badge>
                            </Button>}
                        </div>
                    </Menu>
                </Box>

                <Typography variant='h6' component='div' className='typographyNavHeadingSmall'>
                    BHOJON
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
