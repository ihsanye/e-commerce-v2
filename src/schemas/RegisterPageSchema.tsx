import * as yup from 'yup'

export const registerPageSchema = yup.object().shape({
    username: yup.string().required('Kullanici adi bos birakilamaz'),
    password: yup.string().required('Sifre bos birakilamaz')
})