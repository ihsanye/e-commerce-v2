import React, { useEffect } from 'react'
import { Button, Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setDrawer, updateBalance } from '../redux/appSlice';
import { ProductType, UserType } from '../types/Types';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';

function BasketDetails() {

    const dispatch = useDispatch();
    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);

    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])

    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }

    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId))
    }

    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn('Bakiye yetersiz');
            return;
        }
        if (currentUser?.balance) {
            const remainingTotal = currentUser.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remainingTotal
            }
            dispatch(updateBalance(payload));
            dispatch(setBasket([]));
            localStorage.removeItemItem('basket');
            toast.success('Urun basariyla satin alindi');
        }
    }

    return (
        <div>
            <Drawer open={drawer} anchor='right' onClose={closeDrawer} >
                {basket && basket.map((product: ProductType) => (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex', margin: '10px' }}>
                            <div style={{ marginRight: '5px' }}><img src={product.image} width={50} alt="" /></div>
                            <div style={{ width: '240px' }}>
                                <div>{product.title.substring(0, 30)}...</div>
                            </div>
                            <div style={{ marginRight: '15px' }}>{product.count} adet </div>
                            <div style={{ fontWeight: 'bold', width: '60px' }}>$ {Number(product.price) * Number(product.count)}</div>
                            <div><Button onClick={() => removeProduct(product.id)} size='medium' sx={{ textTransform: 'none' }} >Sil</Button> </div>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex', margin: '0 16px 8px 0' }}>
                    Toplam Tutar: $ {totalAmount.toFixed(2)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex' }}><Button onClick={buy} size='small' sx={{ textTransform: 'none' }} variant='contained' color='success'>Satin Al</Button></div>
            </Drawer>
        </div>
    )
}

export default BasketDetails