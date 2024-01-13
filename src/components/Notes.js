import React, { useContext, useEffect, useRef, useState} from 'react'
import Notcontext from "../context/notes/NoteContext"
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate} from 'react-router-dom';
const Notes = (props) => {
  const navtoHome = useNavigate()
  const context = useContext(Notcontext)
  const { usernotes,  getnote, editnote,deletenote } = context
  const [, setLoading] = useState(true);
  
// fetching notes
  useEffect(() => {
   const fetchNotes = async ()=>{
     try {
       if(localStorage.getItem('token')){
         await getnote()
         setLoading(false)
       }else{
           navtoHome('/login')
       }
     
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false)
    }
  }
 
  fetchNotes()
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ navtoHome]);

// update notes in a model
  const ref = useRef(null)
  const refclose = useRef(null)

  const [note, setNote] = useState({ keynoteId: "", eTitle: "", eDescription: "", eTag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()

    setNote({
      keynoteId: currentNote.keynoteId || '', 
      eTitle: currentNote.Title || '',
      eDescription: currentNote.Description || '',
      eTag: currentNote.Tag || ''
    });
    
  }
  // Check if usernotes is an array before using map
  if (!Array.isArray(usernotes)) {
 
    return <div>No notes available.</div>; // or any other appropriate message
  }
  const handleclick = (e) => {
    e.preventDefault();
  
    editnote(note.keynoteId, note.eTitle, note.eDescription, note.eTag)
    refclose.current.click()
    setNote({
      Title: '',
      Description: '',
      Tag: ''
    });
    props.showAlert("note updated successfully", "success")
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setNote({
      ...note,
      [name]: value,
    });
  }

  return (
    <>
      <Addnote showAlert= {props.showAlert} />

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3 ">
                <div className="mb-3 ">
                  <label htmlFor="eTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" onChange={onChange} id="eTitle" value={note.eTitle} name='eTitle' aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text" ></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">Description</label>
                  <input type="text" className="form-control" minLength={5} required value={note.eDescription} onChange={onChange} id="eDescription " name='eDescription' />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">Tag</label>
                  <input type="text" className="form-control" minLength={5} required value={note.eTag} onChange={onChange} id="eTag " name='eTag' />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleclick} type="button" className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">

        <h2>your notes</h2>
        <div className = " container ">
        {usernotes.length === 0 && ' No notes to display'}
        </div>
        {usernotes.map((note) => {
          return <Noteitem key={note.keynoteId} updateNote={updateNote} usernotes={note} deletenote={deletenote} showAlert= {props.showAlert} />

        })}
      </div>
    </>
  )
}

export default Notes
