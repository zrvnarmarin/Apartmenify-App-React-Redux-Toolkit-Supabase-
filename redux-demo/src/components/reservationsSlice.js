import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apartmentsSlice from "./apartmentsSlice";

export const addReservation = createAsyncThunk('reservations/addReservation', async newReservation => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([
                { 
                    apartmentId: newReservation.apartmentId,
                    userId: newReservation.userId,
                    reservationDate: newReservation.reservationDate
                }
            ])
            .single()

            return newReservation
    } 
    catch (error) { 
        console.log(error.message)
        return error.message 
    }
})

const initialState = {
    reservations: [],
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    extraReducers(builder) {
        builder
        addCase(addReservation.fulfilled, (state, action) => {
            state.reservations.push(action.payload)
            console.log(action.payload)
        })
    }
})

// Exports
export const selectName = (state) => state.reservations.name
export const selectSurname = (state) => state.reservations.surname
export const selectStartDate = (state) => state.reservations.startDate
export const selectEndDate = (state) => state.reservations.endDate
export const selectReservation = (state) => state.reservations.reservation

export const { setName, setSurname, setStartDate, setEndDate } = reservationsSlice.actions


export default apartmentsSlice.reducer