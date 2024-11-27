import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../types/Types"

export interface BasketSliceType {
    basket: ProductType[]
    totalAmount: number
}

const initialState: BasketSliceType = {
    basket: [],
    totalAmount: 0
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProductToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            if (state.basket.length == 0) {
                state.basket = [action.payload]
            } else {
                const findProduct = state.basket.find((product: ProductType) => product.id === action.payload.id);
                if (findProduct) {
                    if (findProduct.count && action.payload.count)
                        findProduct.count += action.payload.count;
                    state.basket = [...state.basket.map((product: ProductType) => product.id === findProduct.id ? findProduct : product)]
                } else {
                    state.basket = [...state.basket, action.payload]
                }
            }
            localStorage.setItem("basket", JSON.stringify(state.basket))
        },
        setBasket: (state: BasketSliceType, action: PayloadAction<ProductType[]>) => {
            state.basket = [...action.payload];
        },
        calculateBasket: (state: BasketSliceType) => {
            let totalAmount: number = 0;
            state.basket && state.basket.map((product: ProductType) => {
                if (product.count) {
                    totalAmount += Number(product.price) * product.count;
                }
            })
            state.totalAmount = totalAmount;
        }
    }
})

export const { addProductToBasket, setBasket, calculateBasket } = basketSlice.actions
export default basketSlice.reducer