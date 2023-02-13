import { createSlice } from '@reduxjs/toolkit'


const initialState = 'moi'


  const notificationSlice = createSlice({
    name: 'notificaiton',
    initialState,
    reducers: {
      notificationChange(state, action) {
        const content = action.payload
        state.push({
            content
        })
        console.log(content)
        return content
      },
      notificationReducer(state, action) {
      
        return action.payload
        
      }
    },
  
  })

  export const { notificaitonChange } = notificationSlice.actions
  export default notificationSlice.reducer

  