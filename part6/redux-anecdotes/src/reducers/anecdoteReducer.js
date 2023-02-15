import { createSlice } from '@reduxjs/toolkit'

import service from '../services/anecdotes'
/*
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

//const initialState = anecdotesAtStart.map(asObject)
*/


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {

     appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    },
    updateAnecdote(state,action){
      return state.map(note =>
        note.id !== action.id ? note : action 
      )
    }
  },

})


export const createNote = content => {
  return async dispatch => {
    const newNote = await service.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const vote = content => {
  return async dispatch => {
    await service.vote(content)
    const anecdotes = await service.getAll()
    dispatch(setNotes(anecdotes))
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await service.getAll()
    dispatch(setNotes(notes))
  }
}

export const { appendNote, setNotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


/*    createNote(state, action) {
      const content = action.payload
      state.push({
          content, 
          votes: 0,
          id: getId(),
      })



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
    },*/