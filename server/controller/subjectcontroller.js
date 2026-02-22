const subjectmodel = require("../models/subjectmodel");

module.exports.create = async (req,res) => {
    try {

        const{subjectName,semester,department,teacher} = req.body;

        if(!subjectName || !semester || !department || !teacher){
            return res.status(400).json({message:"All fields are required"});
        }

        const create = await subjectmodel.create({subjectName,semester,department,teacher});

        return res.status(200).json({message:"Assigned subject",success:true,create});


        
    } catch (error) {
        console.log(error.message);
        
    }
    
}

module.exports.getall = async (req,res) => {
    try{

        const getall = await subjectmodel.find();
        return res.status(200).json({message:"fetched",success:true,getall});

    }catch(err){
        console.log(err.message);
    }
    
}

module.exports.updatesubject = async (req,res) => {
    try {

        const{id} = req.params;
        const {subjectName,semester,department,teacher} = req.body;

        const updatesubject = await subjectmodel.findByIdAndUpdate(id,{subjectName,semester,department,teacher},{new:true});
        return res.status(200).json({message:"updated",success:true,updatesubject});
        
    } catch (error) {
        console.log(error.message);

        
    }
    
}

module.exports.deletesubject = async (req,res) => {
    try{

        const {id}= req.params;
        const deletesubject = await subjectmodel.findByIdAndDelete(id);
    
        return res.status(200).json({message:"deleted",success:true,deletesubject});


    }catch(err){
        console.log(err.message);
    }
    
}