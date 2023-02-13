import { createSlice } from '@reduxjs/toolkit'

/*
const filterReducer = (state = '', action) => {
  console.log(action)
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }
  
  export const filterChange = filter => {

    console.log(filter)
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }

*/
//export default filterReducer

const initialState = ''


  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      filterChange(state, action) {
        const content = action.payload
        //state.push({
          //  content
        //})
        return content
      },
      filterReducer(state, action) {
      
        return action.payload
        
      }
    },
  
  })

  export const { filterChange } = filterSlice.actions
  export default filterSlice.reducer

  