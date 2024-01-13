import React, { useContext } from 'react'
import Notcontext from "../context/notes/NoteContext"
const Noteitem = (props) => {
  const context = useContext(Notcontext)
  const  {deletenote} = context
  const  {usernotes, updateNote} = props
  const handleDelete = () => {
    deletenote(usernotes.keynoteId);
    props.showAlert("note deleted successfully", "success")
  };
  const updation = ()=>{
    updateNote(usernotes)
   
  }
  return (
    <div className='col-md-3'>
      <div className="card my-3" >

                 
  <div className="card-body ">
        <div className="d- align-item-center">

    <h5 className="card-title">  {usernotes.Title}&nbsp;
    
    <svg xmlns="http://www.w3.org/2000/svg" className='dltsvg mx-2' height="0.9em" onClick={handleDelete} style={{fill:"red"}} viewBox="0 0 448 512"> <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" height="0.9em" onClick={updation} style={{fill:"blue"}} viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>
                </h5>
        </div>
    <p className="card-text"> {usernotes.Description}</p>
    <p className="card-text"> {usernotes.Tag}</p>
    </div>
</div>
    </div>
  )
}

export default Noteitem
