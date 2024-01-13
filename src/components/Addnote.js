import React, { useState } from 'react'
import { useContext } from 'react'
import Notcontext from "../context/notes/NoteContext"
const Addnote = (props) => {
    const context = useContext(Notcontext)
    const { addnote } = context
    const [note, setNote] = useState({Title:"" , Description: "" , Tag:""})
    const handleclick = (e)=>{
        e.preventDefault()
        addnote(note.Title,note.Description,note.Tag)
setNote({ Title: '', Description: '', Tag: '' }); 
props.showAlert("note added successfully", "success")
    }
    const onChange = (e)=>{  
setNote({...note, [e.target.name]: e.target.value});
    }
  return (
    <div>
      <div className="container my-3">
     <h2>add a note</h2>
     <form  className="my-3 ">
  <div className="mb-3 ">
    <label htmlFor="Title" className="form-label">Title</label>
    <input type="text" className="form-control"  minLength={5} required value={note.Title}  onChange={onChange} id="Title" name='Title' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text" ></div>
  </div>
  <div className="mb-3">
    <label htmlFor="Description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.Description} minLength={5} required onChange={onChange} id="Description " name='Description'/>
  </div>
  <div className="mb-3">
    <label htmlFor="Tag" className="form-label">Tag</label>
    <input type="text" className="form-control"  minLength={5} required value={note.Tag}  onChange={onChange} id="Tag " name='Tag'/>
  </div>
  
  <button disabled= {note.Title.length <5 || note.Description.length <5 } type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
</form>
</div>
    </div>
  )
}

export default Addnote
