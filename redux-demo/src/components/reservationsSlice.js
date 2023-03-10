import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apartmentsSlice from "./apartmentsSlice";
import supabase from "../supabaseClient";

export const addReservation = createAsyncThunk('reservations/addReservation', async newReservation => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([
                { 
                    apartmentId: newReservation.apartmentId,
                    userId: newReservation.userId,
                    userEmail: newReservation.userEmail,
                    name: newReservation.name,
                    surname: newReservation.surname,
                    startDate: newReservation.startDate,
                    endDate: newReservation.startDate,
                }
            ])

            console.log('data', data)
            console.log('error', error)

            return newReservation
    } 
    catch (error) { 
        console.log(error.message)
        return error.message 
    }
})

export const getAllReservations = createAsyncThunk('reservations/getAllReservations', async () => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .select('*')

        console.log('all reservations', data)

        return data
    } catch (error) {
        return error.message
    }
})

export const getReservation = createAsyncThunk('reservations/getAllReservations', async id => {
    try {
        const { data, error } = await supabase
        .from('reservations')
        .select()
        .eq('id', id)

        console.log(data)

        return data[0]
    } 
    catch (error) { return error.message }
})

const initialState = {
    reservations: [],
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(addReservation.fulfilled, (state, action) => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            state.reservations.push(action.payload)
        })
    }
})

// Exports
export const selectName = (state) => state.reservations.name
export const selectSurname = (state) => state.reservations.surname
export const selectStartDate = (state) => state.reservations.startDate
export const selectEndDate = (state) => state.reservations.endDate
export const selectAllReservations = (state) => state.reservations.reservations

export const { setName, setSurname, setStartDate, setEndDate } = reservationsSlice.actions


export default apartmentsSlice.reducer