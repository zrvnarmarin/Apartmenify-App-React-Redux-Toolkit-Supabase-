import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../supabaseClient';

// Apartments:
export const getAllApartments = createAsyncThunk('apartments/getAllApartments', async () => {
  try {
    const { data, error } = await supabase
    .from('apartments')
    .select()

    return data
  } catch (error) { return error.message }
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
          price: newApartment.price,
          availability: newApartment.availability
        }
      ])
      .single()

    return newApartment
  } 
  catch (error) { 
    return error.message 
  }
})

export const deleteApartment = createAsyncThunk('apartments/deleteApartment', async id => {
  try {
    // const { data, error } = await supabase
    // .from('apartments')
    // .delete()
    // .eq('id', id)

    console.log(id)
    return id
  } 
  catch (error) { return error.message }
})

export const updateApartment = createAsyncThunk('apartments/updateApartment', async updatedApartment => {
  const { data, error } = await supabase
  .from('apartments')
  .update({ 
    title: updatedApartment.title, 
    description: updatedApartment.description,
    city: updatedApartment.city,
    rooms: updatedApartment.rooms,
    address: updatedApartment.address,
    distanceFromTheSea: updatedApartment.distanceFromTheSea,
    price: updatedApartment.price,
    singleBeds: updatedApartment.singleBeds,
    doubleBeds: updatedApartment.doubleBeds,
    availability: updatedApartment.availability,
    facilities: updatedApartment.facilities
  })
  .eq('id', updatedApartment.id)

  return updatedApartment
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

export const updateApartmentAvailability = createAsyncThunk('apartments/updateApartmentAvailability', async ({ apartmentId, availability }) => {
  
  try {
    const { data, error } = await supabase
    .from('apartments')
    .update({ availability: availability })
    .eq('id', apartmentId)

    // console.log('thunk apartment id', apartmentId, availability)
    
    return data
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
  filter: 'All',
  filterQuery: '',
  sort: 'Price',
  sortOrder: 'Ascending',
  facilities: []
}

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    }
  },
  extraReducers(builder) {
    builder
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
      state.apartment = action.payload
    })
    .addCase(addApartment.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.apartments.push(action.payload)
      state.status = 'idle'
      state.error = null
    })
    .addCase(deleteApartment.fulfilled, (state, action) => {
      // state.apartments = state.apartments.filter(apartment => apartment.id !== action.payload)
      console.log(action.payload)
    })
    .addCase(getAllFacilities.fulfilled, (state, action) => {
      state.facilities = action.payload
    })
    .addCase(addFacility.fulfilled, (state, action) => {
      console.log(action.payload)
      state.facility = action.payload
    })
    .addCase(updateApartmentAvailability.fulfilled, (state, action) => {
      // console.log(state.apartments)
    })
    .addCase(updateApartment.fulfilled, (state, action) => {
      const updatedApartment = action.payload
      state.apartments = state.apartments.map(apartment => apartment.id === updatedApartment.id ? updatedApartment : apartment)
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

export const selectFacilities = (state) => state.apartments.facilities

// Reducer exports
export const { setFilter, setFilterQuery, setSort, setSortOrder, setNewFacility } = apartmentsSlice.actions

// Memoized selectors exports
export const selectFilteredApartments = createSelector(
  [selectAllApartments, getFilter, getFilterQuery],
  (apartments, filter, filterQuery) => apartments.filter(apartment => {
    if (filter === 'All') {
      return apartments;
    }
    else if (filter === 'Title') {
      return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
    }
    else if (filter === 'Address') {
      return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
    } 
    else if (filter === 'City') {
      return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
    } 
    else if (filter === 'Number Of Rooms') {
      return apartment.rooms.toString().toLowerCase().includes(filterQuery.toLowerCase())
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
  
      if (sort === 'Price') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'Ascending') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sort === 'Rooms') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'Ascending') {
            return a.rooms - b.rooms;
          } else {
            return b.rooms - a.rooms;
          }
        });
      } else if (sort === 'Distance From The Sea') {
          sortedApartments.sort((a, b) => {
            if (sortOrder === 'Ascending') {
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
  
      if (sort === 'Price') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'Ascending') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sort === 'Rooms') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'Ascending') {
            return a.rooms - b.rooms;
          } else {
            return b.rooms - a.rooms;
          }
        });
      } else if (sort === 'Distance From The Sea') {
        sortedApartments.sort((a, b) => {
          if (sortOrder === 'Ascending') {
            return a.distanceFromTheSea - b.distanceFromTheSea;
          } else {
            return b.distanceFromTheSea - a.distanceFromTheSea;
          }
        });
      }
  
      return sortedApartments;
    }
)

export const selectApartmentsByFacility = (facility) =>
  createSelector(
    [selectAllApartments],
    (apartments) => {
      const apartmentsByFacility = apartments.filter((apartment) =>
        apartment.facilities.includes(facility)
      );

      return apartmentsByFacility;
    }
);

export const selectCountOfApartmentsByFacility = createSelector(
  [selectAllApartments],
  (apartments) => {
    const facilities = apartments.reduce((count, apartment) => {
      apartment.facilities.forEach(facility => {
        count[facility] = (count[facility] || 0) + 1;
      });
      
      return count;
    }, {});

    return facilities;
  }
)

// Slice export
export default apartmentsSlice.reducer