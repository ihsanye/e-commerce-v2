import { ProductType } from '../types/Types'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ProductCardProps {
    product: ProductType
}

function ProductCard(props: ProductCardProps) {

    const { id, title, price, description, category, image, rating } = props.product;

    return (
        <Card sx={{ width: 300, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '24px 3px' }}>
            <img src={image} style={{ maxWidth: '100px', maxHeight: '150px', cursor: 'pointer' }} />
            <CardContent sx={{ height: '250px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title.substring(0, 50)}...
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description.substring(0, 150)}...
                </Typography>
            </CardContent>
            <div>
                <h2>$ {price}</h2>
            </div>
            <CardActions>
                <Button size="small" variant='outlined' color='info' >Detay</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard