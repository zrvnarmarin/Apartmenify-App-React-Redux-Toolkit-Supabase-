import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
        },
        closeModal: (state, action) => {
            state.isOpen = false
        }
    }
})

// state exports
export const getIsOpen = (state) => state.modal.isOpen

// actions exports
export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer