import { createSlice } from '@reduxjs/toolkit'


let initialState = ''


  const notificationSlice = createSlice({
    name: 'notificaiton',
    initialState,
    reducers: {
      notificationChange(state, action) {
        console.log(state)
        console.log(action)
        const content = action.payload
        state = content
        console.log(content)
        return (
         state
         )
      },
      notificationRemove (state, action){
        //setTimeout(()=> state,5000)

        
        state = null
        
        return state
      }
    },
  
  })
  export const { notificationChange, notificationRemove } = notificationSlice.actions
  export default notificationSlice.reducer

  const setNotification = (content, action) => {
    return async dispatch => {
        setTimeout(()=> dispatch(notificationRemove()), 1000*action)
        dispatch(notificationChange(content))
    }
  }

export {setNotification}

  