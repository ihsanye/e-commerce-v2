import { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import categoryService from '../services/CategoryService';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';

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

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div style={{ margin: '24px 0 0 12px' }}>
            <FormGroup>
                {
                    categories && categories.map((category: string, index: number) => (
                        <FormControlLabel key={index} control={<Checkbox />} label={category.charAt(0).toUpperCase() + category.slice(1)} />
                    ))
                }
            </FormGroup>
        </div>
    )
}

export default Category