import React, { useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:1800"
  const initialstate = []

  const [usernotes, setUsernotes] = useState(initialstate)

  // get all notes
  const getnote = async () => {
    console.log("Fetching notes...");
    // api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      const dataArray = Array.isArray(json.data) ? json.data : [json.data];
      setUsernotes(dataArray);
     

    } else {
      console.error('Invalid or unexpected response:', json);
      // Handle unexpected responses, such as an error or setting a default value
      setUsernotes([]); // Setting an empty array as the default value
    }
    
  }
  

  // add a note
  const addnote = async (Title, Description, Tag) => {
    // api call
    try {


      
      const response = await fetch(`${host}/api/notes/insertnote`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ Title, Description, Tag }),
      });
      if (!response.ok) {

        if (response.status === 401) {
          throw new Error("Unauthorized: Please check your authentication token.");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);

        }
      } else {
        const responseData = await response.json();
        if (Array.isArray(responseData.data) && responseData.success) {
          setUsernotes(responseData.data);
         
        } 
      
      }

    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
  // delete a note
  const deletenote = async (keynoteId) => {
    // todo : api call
    try {
      
   
    const response = await fetch(`${host}/api/notes/deletenote/${keynoteId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please check your authentication token.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }



    // const newNote = usernotes.filter((note) => {
    //   return note.keynoteId !== keynoteId
    // })
    // setUsernotes(newNote)
    setUsernotes(usernotes =>usernotes.filter(note => note.keynoteId !== keynoteId));
 
  
  } catch (error) {
    console.error('Error deleting the note:', error);
  }
  }
 
  // edit a note
  const editnote = async (keynoteId, Title, Description, Tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${keynoteId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });
    if (response.ok) {
      const updatedNote = await response.json(); // Check the response structure here
      console.log(updatedNote);
      const updatedNotes = usernotes.map(note => {
        if (note.keynoteId === keynoteId) {
          return { ...note, Title, Description, Tag };
        }
        return note;
      });
      setUsernotes(updatedNotes);
    } else {

      console.error("Failed to update note. HTTP error!", response.status);

    }

    // const json = await response.json();
   
    let newNote = JSON.parse(JSON.stringify(usernotes))
    //logic to edit in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element.keynoteId === keynoteId) {
        newNote[index].Title = Title;
        newNote[index].Description = Description;
        newNote[index].Tag = Tag;
        break
      }
    }
   
  }

  return (
    <NoteContext.Provider value={{ usernotes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
