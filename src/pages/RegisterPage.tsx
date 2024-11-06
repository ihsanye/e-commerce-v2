import React from 'react'
import "../css/RegisterPage.css"
import TextField from '@mui/material/Textfield'
import InputAdornment from '@mui/material/InputAdornment'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa'
import { Button } from '@mui/material'

function RegisterPage() {
    return (
        <div className='register'>
            <div className='main-div'>
                <form action="">
                    <div className='form-div'>
                        <TextField id='username' placeholder='Username' InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IoPersonCircleSharp />
                                </InputAdornment>
                            )
                        }}
                            variant='standard' />

                        <TextField id='password' type='password'
                            placeholder='Password' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FaLock />
                                    </InputAdornment>
                                )
                            }}
                            variant='standard' />
                        <div>
                            <Button>Kaydol</Button>
                            <Button>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage