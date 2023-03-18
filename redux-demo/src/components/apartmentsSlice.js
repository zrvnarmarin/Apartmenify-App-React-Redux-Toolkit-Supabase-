import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../supabaseClient';
import { storage } from '../supabaseClient';

//Supabase 
export const getAllApartments = createAsyncThunk('apartments/getAllApartments', async () => {
    try {
    const { data, error } = await supabase
    .from('apartments')
    .select()

    return data
    } catch (error) {
        return error.message
    }
})

export const getApartment = createAsyncThunk('apartments/getApartment', async id => {
    try {
        const { data, error } = await supabase
        .from('apartments')
        .select()
        .eq('id', id)

        return data[0]
    } 
    catch (error) { return error.message }
})

export const addApartment = createAsyncThunk('apartments/addApartment', async newApartment => {
    try {
        const { data, error } = await supabase
            .from('apartments')
            .insert([
                { 
                    title: newApartment.title, 
                    description: newApartment.description, 
                    rooms: newApartment.rooms, 
                    facilities: newApartment.facilities,
                    city: newApartment.city,
                    address: newApartment.address,
                    singleBeds: newApartment.singleBeds,
                    doubleBeds: newApartment.doubleBeds,
                    distanceFromTheSea: newApartment.distanceFromTheSea,
                    price: newApartment.price
                }
            ])
            .single()

            return newApartment
    } 
    catch (error) { 
        console.log(error.message)
        return error.message 
    }
})

export const deleteTestApartment = createAsyncThunk('apartments/deleteApartment', async id => {
    try {
        const { data, error } = await supabase
        .from('apartments')
        .delete()
        .eq('id', id)

        return id
    } 
    catch (error) { return error.message }
})

export const getAllFacilities = createAsyncThunk('apartments/getAllFacilities', async () => {
    try {
        const { data, error } = await supabase
        .from('facilities')
        .select()

        const allFacilities = data.map(facility => ({ value: facility.name, label: facility.name }))
    
        return allFacilities
    } catch (error) {
        return error.message
    }
})

export const addFacility = createAsyncThunk('apartments/addFacility', async facility => {
    try {
        const { data, error } = await supabase
            .from('facilities')
            .insert({name: facility})
            .single()

            console.log(facility)

    return facility

    } catch (error) {
        return error.message
    }
})

export const deleteFacility = createAsyncThunk('apartments/deleteFacility', async id => {
    try {
        const { data, error } = await supabase
            .from('facilities')
            .delete()
            .eq('id', id)

            return id
    } catch (error) {
        return error.message
    }
})

const initialState = {
    apartments: [],
    apartment: {},
    isLoading: false,
    status: 'idle',
    error: null,
    filter: '',
    filterQuery: '',
    sort: 'price',
    sortOrder: 'ascending',
    facility: '',
    facilities: []
}

const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
            console.log('filter option je: ', action.payload)
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload
            console.log('filter query je: ', action.payload)
        },
        setSort: (state, action) => {
            state.sort = action.payload
            console.log('sort option je: ', action.payload)
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
            console.log('sort order je: ', action.payload)
        },
        setNewFacility: (state, action) => {
            state.facility = action.payload
        },
    },
    extraReducers(builder) {
        builder
        // SUPABASE: 
        .addCase(getAllApartments.fulfilled, (state, action) => {
            state.apartments = action.payload;
            state.status = 'successed';
            state.isLoading = false
        })
        .addCase(getAllApartments.pending, (state, action) => {
            // state.status = 'successed';
            state.isLoading = true
        })
        .addCase(getApartment.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.apartment = action.payload
        })
        // .addCase(getApartment.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        .addCase(addApartment.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.apartments.push(action.payload)
            state.status = 'idle'
            state.error = null
        })
        .addCase(deleteTestApartment.fulfilled, (state, action) => {
            state.apartments = state.apartments.filter(apartment => apartment.id !== action.payload)
        })
        .addCase(getAllFacilities.fulfilled, (state, action) => {
            state.facilities = action.payload
        })
        .addCase(addFacility.fulfilled, (state, action) => {
            console.log(action.payload)
            state.facility = action.payload
        })
    }
})

// State exports 
export const selectAllApartments = (state) => state.apartments.apartments
export const selectApartment = (state) => state.apartments.apartment
export const getApartmentsStatus = (state) => state.apartments.status
export const getApartmentsError = (state) => state.apartments.error

export const selectIsLoading = (state) => state.apartments.isLoading

export const getFilter = (state) => state.apartments.filter
export const getFilterQuery = (state) => state.apartments.filterQuery
export const getSort = (state) => state.apartments.sort
export const getSortOrder = (state) => state.apartments.sortOrder

export const selectFacilities = (state) => state.apartments.facilities // povlači sa supabse-a

export const getFacility = (state) => state.apartments.facility

// Reducer exports
export const { setFilter, setFilterQuery, setSort, setSortOrder, setNewFacility } = apartmentsSlice.actions

// Memoized selectors exports
export const selectFilteredApartments = createSelector(
    [selectAllApartments, getFilter, getFilterQuery],
    (apartments, filter, filterQuery) => apartments.filter(apartment => {
        if (filter === 'all') {
            return apartments;
        }
        else if (filter === 'title') {
            return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
        }
        else if (filter === 'address') {
            return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
        } 
        else if (filter === 'city') {
            return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
        } 
        else {
            return apartments;
        }
    })
)

export const selectSortedApartments = createSelector(
    [selectAllApartments, getSort, getSortOrder],
    (apartments, sort, sortOrder) => {
      let sortedApartments = [...apartments];
  
      if (sort === 'price') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'ascending') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sort === 'rooms') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'ascending') {
            return a.rooms - b.rooms;
          } else {
            return b.rooms - a.rooms;
          }
        });
      } else if (sort === 'distanceFromTheSea') {
        sortedApartments.sort((a, b) => {
            if (sortOrder === 'ascending') {
              return a.distanceFromTheSea - b.distanceFromTheSea;
            } else {
              return b.distanceFromTheSea - a.distanceFromTheSea;
            }
          });
      }
  
      return sortedApartments;
    }
);

export const selectFilteredAndSortedApartments = createSelector(
    [selectFilteredApartments, getSort, getSortOrder],
    (filteredApartments, sort, sortOrder) => {
        let sortedApartments = [...filteredApartments];
  
      if (sort === 'price') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'ascending') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sort === 'rooms') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'ascending') {
            return a.rooms - b.rooms;
          } else {
            return b.rooms - a.rooms;
          }
        });
      } else if (sort === 'distanceFromTheSea') {
        sortedApartments.sort((a, b) => {
            if (sortOrder === 'ascending') {
              return a.distanceFromTheSea - b.distanceFromTheSea;
            } else {
              return b.distanceFromTheSea - a.distanceFromTheSea;
            }
          });
      }
  
      return sortedApartments;
    }
)

// Slice export
export default apartmentsSlice.reducer