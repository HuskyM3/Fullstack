const Notification = ({message, type}) => {
    if (message===null){
      return (<div></div>)
    }else if (message.startsWith('Wrong') || message.startsWith( 'invalid')) return(<div className='error'>{message}</div>)
    else return(<div className='working'>{message}</div>)
  
}



export default Notification