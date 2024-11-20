import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material';
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
            {productId}
        </Container>
    )
}

export default ProductDetail