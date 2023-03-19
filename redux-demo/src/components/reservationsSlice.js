import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
                    endDate: newReservation.endDate,
                }
            ])

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

export const getReservationById = createAsyncThunk('reservations/getReservationById', async id => {
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

export const getReservationsByApartmentId = createAsyncThunk('reservations/getReservationsByApartmentId', async apartmentId => {
    try {
        let { data, error } = await supabase
        .from('reservations')
        .select()
        .eq('apartmentId', apartmentId)

        // console.log(`All reservations on apartment with ID of ${apartmentId}: `, data)

        // TO DO: extract start and end dates for each reservation and disable those dates on date picker

        return data

    } catch (error) {
        return error.message
    }
})

const initialState = {
    reservations: [],
    reservation: {}, 
    isLoading: false,
    error: null
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(addReservation.fulfilled, (state, action) => {
            state.reservations.push(action.payload)
        })
        .addCase(getAllReservations.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.isLoading = false
            console.log(action.payload)
        })
        .addCase(getAllReservations.pending, (state, action) => {
            state.isLoading = true
            console.log(action.payload)
        })
        .addCase(getReservationById.fulfilled, (state, action) => {
            state.reservation = action.payload
            console.log(action.payload)
        })
        .addCase(getReservationsByApartmentId.fulfilled, (state, action) => {
            state.reservations = action.payload
        })
    }
})

// States
export const selectName = (state) => state.reservations.name
export const selectSurname = (state) => state.reservations.surname
export const selectStartDate = (state) => state.reservations.startDate
export const selectEndDate = (state) => state.reservations.endDate
export const selectAllReservations = (state) => state.reservations.reservations
export const selectIsLoading = (state) => state.reservations.isLoading

// Reducers
export const { setName, setSurname, setStartDate, setEndDate } = reservationsSlice.actions

// Slice
export default reservationsSlice.reducer