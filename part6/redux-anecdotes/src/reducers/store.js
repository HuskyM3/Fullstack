import { configureStore } from '@reduxjs/toolkit'



import reducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const store = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer
    }
  })



export default store