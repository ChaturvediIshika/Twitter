const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middleware');
const User=require('../model/user');
const Journal=require('../model/journalModel');


router.get('/user',isLoggedIn,(req,res)=>{
    res.render('user/userInfo');
})

router.post('/journal/saved/:pid/add',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    user.saved.splice(0,0,pid);
    await user.save();
    req.flash('msg','post successfully added to saved');
    res.redirect('/journal');
})

router.get('/saved',isLoggedIn,async(req,res)=>{
    const user=req.user;
    await user.populate('saved');
    for(let p of user.saved){
        await p.populate('creator');
    }
    const posts=user.saved;
    res.render('user/saved',{posts});
})  

router.delete('/journal/saved/:pid',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    user.saved=user.saved.filter((p)=>p!=pid);
    await user.save();
    req.flash('err','post removed from saved');
    res.redirect('/saved');
})




module.exports=router;
