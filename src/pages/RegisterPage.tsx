import React from 'react'
import "../css/RegisterPage.css"
import TextField from '@mui/material/Textfield'
import InputAdornment from '@mui/material/InputAdornment'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import { registerPageSchema } from '../schemas/RegisterPageSchema'
import { UserType } from '../types/Types'
import RegisterPageService from '../services/RegisterPageService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 99999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await RegisterPageService.register(payload)
            if (response) {
                clear()
                toast.success("Kaydedildi")
                navigate("/login")
            }
        } catch (error) {
            toast.error("Hata Olustu")
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
        <div className='register'>
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
                            <Button type='submit' >Kaydol</Button>
                            <Button onClick={clear} >Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage