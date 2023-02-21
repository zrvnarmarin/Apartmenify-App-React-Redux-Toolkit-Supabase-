import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CART_ITEMS_URL = 'https://course-api.com/react-useReducer-cart-project'

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (name, thunk) => {
    try {
        const response = await fetch(CART_ITEMS_URL)
        const responseData = await response.json()

        return responseData
    } catch (error) {
        return error.message
    }
})

const initialState = {
    cartItems: [],
    amount: 0,
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
        [fetchCartItems.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
            console.log(action.payload)
        },
        [fetchCartItems.rejected]: (state, action) => {
            state.isLoading = false
        }
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

// cart reducer export
export default cartSlice.reducer
