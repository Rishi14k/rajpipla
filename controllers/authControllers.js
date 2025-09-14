const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({msg:"Please fill all the fields"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(201).json({message:"User registered successfully",user,token});
    } catch (error) {
        console.log("Error in register controller",error);
        res.status(500).json({error:error.message});
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg:"Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json({message:"User logged in successfully",user,token});
    } catch (error) {
        console.log("Error in login controller",error);
        res.status(500).json({error:error.message});
    }
}

module.exports = {register,login};