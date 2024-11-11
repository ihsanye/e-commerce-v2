import React from 'react'
import "../css/RegisterPage.css"
import TextField from '@mui/material/Textfield'
import InputAdornment from '@mui/material/InputAdornment'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import { registerPageSchema } from '../schemas/RegisterPageSchema'

function RegisterPage() {

    const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
    }

    return (
        <div className='register'>
            <div className='main-div'>
                <form action="">
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
                            <Button>Kaydol</Button>
                            <Button onClick={clear} >Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage