const express = require('express');
const conn = require("../db/conn")
const router = new express.Router();
exports.deletenote = async (req,res) => {
    const obj = {}
    const keynoteId = req.params.id
    const userId = res.userdetail.Id;
    if(!keynoteId){
        return  res.status(404).send('not found any  note')
      }
     
      let query = `  DELETE from usernotes  WHERE   keynoteId = ? AND Id = ?`
      conn.query(query ,[keynoteId,userId],  (err,result)=>{
  if(err){
      obj.message = 'database query error'
      obj.success = false
      res.json(obj)
  
  }else{
     
      
     
      obj.message = 'Data deleted successfully'
      obj.success =true
      obj.data = result
      res.json(obj)
  }
      })
}