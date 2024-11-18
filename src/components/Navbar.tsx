import React from 'react'
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EagleLogo from '../assets/eagle.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/appSlice';
import { toast } from 'react-toastify';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate('/login');
        toast.success('Basariyla cikis yapildi')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/')}
                >
                    <img src={EagleLogo} alt='brand' width={50} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                    EAGLE SHOP
                </Typography>
                <TextField id='searchInput'
                    placeholder='Search'

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                            </InputAdornment>
                        )
                    }}
                    variant='standard' />
                <Button sx={{ textTransform: 'none' }} color="inherit" onClick={logout} >Cikis Yap</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar