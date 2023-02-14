import { createSlice } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
//const dispatch = useDispatch()


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
          content, 
          votes: 0,
          id: getId(),
      })
    },
    vote(state, action) {
      //console.log(action)
      console.log(action)
      const id = action.payload
      //console.log(state)
      const noteToChange = state.find(n => n.id === id)
      //console.log(noteToChange)
      const changedNote = { 
        ...noteToChange, 
        votes: noteToChange.votes+1 
      }
      //console.log(changedNote)
      //dispatch(notificaitonChange)
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    }, 
     appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },

})

/*
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'VOTE':
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
    console.log(noteToChange)
      const changedNote = { 
        ...noteToChange, 
        votes: noteToChange.votes+1 
      }
      console.log(changedNote)
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    default: return state
  }
}
*/
/*
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      id: getId(),
      votes: 0,
    }
  }
}


export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}
*/
export const { createNote, vote, appendNote, setNotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
