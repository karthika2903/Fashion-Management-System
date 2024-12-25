const express = require('express');
const router= express.Router();
const Dress= require('../models/dress' );

//  get all dresses how they mentioned in dresses.js
router.get('/',async(req,res) =>{
    try{
    const allDresses= await Dress.find();
    res.render('dressList',{allDresses})
    }
    catch(error){
        res.send('Error in fetching dress')
    }
})
router.get('/add',(req,res)=>{
    res.render('addDress');
})
// for post creating new one
router.post('/create',async(req,res)=>{
    try{
      const newDress= new Dress({
        name:req.body.name,
        type:req.body.type,
        complimentary:req.body.complimentary,
     });
     await newDress.save();
     res.redirect('/');
    }
    catch(error){
        res.send('Error in creating new dress');
    }
});
// update dress
router.post('/update',async(req,res)=>{
    try{
        const dressId= req.body.id;
        await Dress.findByIdAndUpdate(dressId,{
            name:req.body.name,
            type:req.body.type,
            complimentary:req.body.complimentary,
            pickCount: 0,
        });
        res.redirect('/');    
    }
    catch(error){
        res.send('error in updating dress');
    }
});
// delete dress
router.post('/delete',async(req,res)=>{
    try{
        const dressId= req.body.id;
        await Dress.findByIdAndDelete(dressId);
        res.redirect('/');
    }catch(error){
        res.send("error in deleting");
    };
});


// post increment pickcount
router.post('/pick', async(req,res)=>{
    try{
        const dressId= req.body.id;
        const dress= await Dress.findById(dressId);
        dress.pickCount+=1;    
    
    await dress.save();
    res.redirect('/');
    }
    catch(error){
        res.send('Error in pick dress ')
    }
});
module.exports= router;