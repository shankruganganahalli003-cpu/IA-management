const authmodel = require("../models/authmodel");
const teachermodel = require("../models/teachermodel");

module.exports.Assgign = async (req,res) => {
    try {
       
        const{department,semester,subject,name} = req.body;

        if(!department  || !semester || !subject || !name){
            return res.status(400).json({message:"All fieds are required"});
        }

        const teacher = await teachermodel.create({department,semester,subject,name});

        return res.status(200).json({message:"Teacher created ",success:true,teacher});


    } catch (error) {
        console.log(error.message);
        
    }
    
}

module.exports.getteachername = async (req,res) => {
    try {

       const teachers = await authmodel.find({role:"teacher"},{name:1}).populate("name");

       return res.status(200).json({message:"teacher fetced",success:true,teachers});

        
    } catch (error) {
        console.log(error.message);        
    }
    
}

    module.exports.getallteachers = async(req,res)=> {
        try {

            const getall = await teachermodel.find();
            return res.status(200).json({message:"fetched ",success:true,getall});

        } catch (err) {
            console.log(err.message);
        
            
        }
        
    }

module.exports.updateteacher = async (req,res) => {
    try{

        const {department,designation,semester} = req.body;
        const {id} = req.params;

        const teacher = await teachermodel.findByIdAndUpdate(id,{department,designation,semester},{new:true});

        return res.status(200).json({message:"updated",success:true,teacher});


    }catch(err){
        console.log(err.message);


    }
    
}


module.exports.deleteteacher = async (req,res) => {
    try{

        const {id} = req.params;

        const deleteteacher = await teachermodel.findByIdAndDelete(id);

        return res.status(200).json({message:"deleted",success:true,deleteteacher});


    }catch(err){
        console.log(err.message);


    }
    
}

module.exports.getme = async (req,res) => {
    try {

        const {id} = req.params;

      const finddata = await teachermodel.findById(id);
        
        return res.status(200).json({message:"fetced",success:true,finddata});
        
    } catch (error) {
        console.log(error.message);
        
    }
    
}

