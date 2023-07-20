const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const user = require("../models/User");
const { json } = require('express');

//Routes 1: Get all the notes using GET
router.get('/fetchallnotes',fetchuser, async (req,res)=>{

    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Routes 2: Add notes to the user login required
router.post('/addnotes',fetchuser,[
body('title','Enter valid title').isLength({ min: 3 }),
body('description','Enter atleast 5 characters').isLength({ min: 5 })], async (req,res)=>
{
    try {
    const {title,description,tag} = req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }; 

    const notes = new Notes({
        title,description,tag,user : req.user.id,
    })

    const savednotes = await notes.save();
    
     res.json(savednotes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
 })

//Routes 3: Update notes to the user login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>
    {
        //destructure
        const {title, description, tag} = req.body;

        //new node
        const newnote ={}

        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};
        
        try {
            let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("NOT FOUND")}

        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newnote} , {new : true} )
        res.json({note});
        } catch (error) {
            console.error(error.message);
        res.status(500).send("Some error occured");
        }
        //find note to update
        
    })

    //Routes 4: Delete notes to the user login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>
{
    try {
        let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("NOT FOUND")}

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json("NOTE DELETED");
    } 
    
    catch (error) {
        console.error(error.message);
    res.status(500).send("Some error occured");
    }
   
    
})
module.exports = router