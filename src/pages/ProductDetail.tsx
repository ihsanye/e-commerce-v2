import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';

function ProductDetail() {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>();

    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await productService.getProductById(productId);
            setProduct(product);
        } catch (error) {
            toast.error('Urun detayi goruntulenirken hata')
        } finally { dispatch(setLoading(false)) }
    }

    useEffect(() => {
        getProductById(Number(productId));
    }, [])


    return (
        <Container maxWidth='lg'>
            {product &&
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ margin: '30px 15px' }}>
                        <img src={product.image} width={200}></img>
                    </div>
                    <div>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h2>$ {product.price}</h2>
                            <span style={{ fontSize: '36px', fontWeight: 'bold', cursor: 'pointer', margin: '0 10px 0 20px' }}>+</span>
                            <span style={{ fontSize: '18px' }}>0</span>
                            <span style={{ fontSize: '36px', fontWeight: 'bold', cursor: 'pointer', margin: '0 20px 0 10px' }}>-</span>
                            <Button color='success' variant='outlined' >Sepete Ekle</Button>
                        </div>
                    </div>
                </div>
            }
        </Container>
    )
}

export default ProductDetail