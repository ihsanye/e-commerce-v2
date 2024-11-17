import React from 'react'
import "../css/RegisterPage.css"
import TextField from '@mui/material/Textfield'
import InputAdornment from '@mui/material/InputAdornment'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import { registerPageSchema } from '../schemas/RegisterPageSchema'
import loginPageService from '../services/LoginPageService'
import '../css/LoginPage.css'
import { useDispatch } from 'react-redux'
import { setLoading } from '../redux/appSlice'
import { UserType } from '../types/Types'
import { toast } from 'react-toastify'

function LoginPage() {

    const dispatch = useDispatch();

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true));
            const response: UserType[] = await loginPageService.login();
            if (response) {

            }
        } catch (error) {
            toast.error("Giris yapilirken hata olustu: " + error)
        }
        finally {
            dispatch(setLoading(false))
        }

    }

    const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
    }
    return (
        <div className='login'>
            <div className='main-div'>
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField id='username' placeholder='Username'
                            value={values.username}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IoPersonCircleSharp />
                                    </InputAdornment>
                                )
                            }}
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                            variant='standard' />

                        <TextField id='password' type='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FaLock />
                                    </InputAdornment>
                                )
                            }}
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                            variant='standard' />
                        <div>
                            <Button type='submit' >Giris Yap</Button>
                            <Button onClick={clear} >Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage