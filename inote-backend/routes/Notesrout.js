const express = require('express');
const router =  new express.Router();
const fetchallnotes = require ("../notescontroller/Fetchallnotes")
const Createnotes = require("../notescontroller/Createnotes")
const Updatenotes = require("../notescontroller/Updatenotes")
const Deletenote = require("../notescontroller/Deletenote")
var fetchuser = require("../middleware/Fetchuser")
const { body } = require('express-validator');


// Route: 1 Get all the notes using: get "/api/auth/fetchnotes" . login required

router.get('/api/notes/fetchnotes',fetchuser,fetchallnotes.fetchNotes)

// Route: 2 Add  notes using: get "/api/auth/fetchnotes" . login required

router.post('/api/notes/insertnote',[
    body('Title', 'enter a valid Title').isLength({ min: 3 }),
    body('Description', 'Description must be atleast 5 character').isLength({ min: 5 })
],
fetchuser,Createnotes.createnote)
// Route: 3 Update notes using: get "/api/auth/Updatenotes" . login required

router.put('/api/notes/updatenote/:id',
fetchuser,Updatenotes.updatenote)
// Route: 3 delete notes using: get "/api/auth/Updatenotes" . login required

router.delete('/api/notes/deletenote/:id',
fetchuser,Deletenote.deletenote)




module.exports=router
