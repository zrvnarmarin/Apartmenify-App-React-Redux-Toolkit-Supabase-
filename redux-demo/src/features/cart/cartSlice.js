import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartItems } from './cartItems';

const initialState = {
    cartItems: cartItems,
    amount: 30,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
            // console.log(action)
        },
        increase: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0

            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })

            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {

    }
})

// console.log(cartSlice)

// state exports
export const getCartItems = (state) => state.cart.cartItems
export const getAmount = (state) => state.cart.amount
export const getTotal = (state) => state.cart.total
export const getIsLoading = (state) => state.cart.isLoading

// actions exports
export const { clearCart, removeItem, decrease, increase, calculateTotals } = cartSlice.actions


export default cartSlice.reducer
