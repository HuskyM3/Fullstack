import { createSlice } from '@reduxjs/toolkit'


let initialState = ['moi']


  const notificationSlice = createSlice({
    name: 'notificaiton',
    initialState,
    reducers: {
      notificationChange(state, action) {
        console.log(state)
        console.log(action)
        const content = action.payload
        state = action.payload
        console.log(content)
        return state
      },
    },
  
  })

  export const { notificationChange } = notificationSlice.actions
  export default notificationSlice.reducer

  