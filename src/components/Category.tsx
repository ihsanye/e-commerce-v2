import { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import categoryService from '../services/CategoryService';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';

function Category() {

    const [categories, setCategories] = useState<string[]>();
    const dispatch = useDispatch();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories)
        } catch (error) {
            toast.error("Kategori hatasi")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true))
            if (e.target.checked) {
                const products: ProductType[] = await categoryService.getProductsByCategory(categoryName)
                dispatch(setProducts(products))
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error('Kategori hatasi')
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div style={{ margin: '24px 0 0 8px' }}>
            <FormGroup>
                {
                    categories && categories.map((category: string, index: number) => (
                        <FormControlLabel key={index} control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)} />} label={category.charAt(0).toUpperCase() + category.slice(1)} />
                    ))
                }
            </FormGroup>
        </div>
    )
}

export default Category