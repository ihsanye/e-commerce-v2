import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    drawer: boolean,
    products: ProductType[]
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    drawer: false,
    products: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setDrawer: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.drawer = action.payload
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload
        },
        updateBalance: (state: AppSliceType, action: PayloadAction<UserType>) => {
            const user: UserType = {
                ...action.payload
            }
            state.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        },
        setProducts: (state: AppSliceType, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload
        },
        filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {
            const tempList: ProductType[] = [];
            state.products.map((product: ProductType) => {
                if (product.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())) {
                    tempList.push(product);
                }
            })
            state.products = [...tempList];
        }
    },
})

export const { setLoading, setDrawer, setCurrentUser, updateBalance, setProducts, filterProducts } = appSlice.actions

export default appSlice.reducer