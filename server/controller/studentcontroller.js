const studentmodel = require("../models/studentmodel");

module.exports.create = async(req,res)=>{
    try {
        
        const {uucmsNo,department,semester,name} = req.body;

        if(!uucmsNo || !department || !semester || !name){
            return res.status(400).json({message:"All fields are required"});
        }

        const exist = await studentmodel.findOne({ uucmsNo });
if (exist) {
    return res.status(409).json({ message: "UUCMS No already exists" });
}

        const create = await studentmodel.create({uucmsNo,department,semester,name});

        return res.status(200).json({message:"student created",success:true,create});

    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports.getallstudents = async (req,res) => {
    try {

        const getall = await studentmodel.find();
        
        return res.status(200).json({message:"fetched students ",success:true,getall});
        
    } catch (error) {
        console.log(error.message);
        
    }
    
}

module.exports.updatestudent = async (req,res) => {
    try{

        const {id} = req.params;
        const{uucmsNo,department,semester,name} = req.body;

        const updatestudent = await studentmodel.findByIdAndUpdate(id,{uucmsNo,department,semester,name},{new:true});

        return res.status(200).json({message:"updated student",success:true,updatestudent});


    }catch(err){
        console.log(err.message);
    }
    
}


module.exports.deletestudent = async (req,res) => {
    try{

        const {id} = req.params;
        const deletestudent = await studentmodel.findByIdAndDelete(id);
    
        return res.status(200).json({message:"student deleted",success:true,deletestudent});

    }catch(err){
        console.log(err.message);
    }
    
}


module.exports.getme = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentmodel.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


