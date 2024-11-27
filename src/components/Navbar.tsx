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
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentUser, setDrawer, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { FaShoppingBasket } from 'react-icons/fa';
import { Badge } from '@mui/material';
import { RootState } from '../redux/store';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector((state: RootState) => state.basket)

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate('/login');
        toast.success('Basariyla cikis yapildi')
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value))
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Filtrelerken hata")
        }
    }

    const openDrawer = () => {
        dispatch(setDrawer(true))
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
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                    id='searchInput'
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                            </InputAdornment>
                        )
                    }}
                    variant='standard' />
                <Badge badgeContent={basket.length} color="secondary" style={{ margin: '0 8px 0 12px', cursor: 'pointer' }} >
                    <FaShoppingBasket onClick={openDrawer} style={{ fontSize: '18px', cursor: 'pointer' }} />
                </Badge>
                <Button sx={{ textTransform: 'none' }} color="inherit" onClick={logout} >Cikis Yap</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar