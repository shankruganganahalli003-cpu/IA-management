const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authmodel = require("../models/authmodel");


module.exports.register = async (req,res) => {
    try{

        const {name,email,password,role} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"ALL fields  are required"});
        }

        const user = await authmodel.findOne({email});

        if(user){
            return res.status(409).json({message:"user already exist"});
        }

        const hash = await bcrypt.hash(password,10);

        const newuser = await authmodel.create({name,email,password:hash,role});

        return res.status(201).json({message:"user created successfully",success:true,newuser});


    }catch(err){
        console.log(err.message);
    }
    
}


module.exports.login = async (req,res)=> {
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await authmodel.findOne({email});

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = jwt.sign({id:user._id},"secret");
        res.cookie("token",token);

        return res.status(201).json({message:"user logged in",success:true,token,role:user.role})



    }catch(err){
            console.log(err.message);
        }
    
}

module.exports.logout = async (req,res) => {
    
    res.clearCookie("token");
    return res.status(200).json({message:"logged out"});
}