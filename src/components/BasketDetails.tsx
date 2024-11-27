import React, { useEffect } from 'react'
import { Button, Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setDrawer } from '../redux/appSlice';
import { ProductType } from '../types/Types';
import { calculateBasket } from '../redux/basketSlice';

function BasketDetails() {

    const dispatch = useDispatch();
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);

    useEffect(() => {
        dispatch(calculateBasket())
    }, [])

    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }

    const { drawer } = useSelector((state: RootState) => state.app)

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
                            <div><Button size='medium' sx={{ textTransform: 'none' }} >Sil</Button> </div>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex', margin: '0 16px 8px 0' }}>
                    Toplam Tutar: $ {totalAmount}
                </div>
            </Drawer>
        </div>
    )
}

export default BasketDetails