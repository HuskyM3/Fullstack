const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        const newState = {...state, good: state.good+1}

        return newState
      case 'OK':
        const okState = {...state, ok: state.ok+1}
        return okState
      case 'BAD':
        const badState = {...state, bad: state.bad+1}
        return badState
      case 'RESET':
        return {...state, bad: 0, good:0, ok:0}
      default: return state
    }
  
  }
  
  export default counterReducer