const marksmodel = require("../models/marksmodel");

module.exports.create = async (req, res) => {
  try {

    const students = req.body;

    // ✅ custom department order
    const departmentOrder = {
      BCA: 1,
      BBA: 2,
      BCOM: 3
    };

    // ✅ sort students
    const sortedStudents = students.sort(
      (a, b) => departmentOrder[a.department] - departmentOrder[b.department]
    );

    // ✅ format data
    const formatted = sortedStudents.map(s => ({
      uucmsNo: s.uucmsNo,
      semester: s.semester,
      department: s.department,
      name:s.name,
      IA1: Number(s.IA1) || 0,
      IA2: Number(s.IA2) || 0,
      IA3: Number(s.IA3) || 0
    }));

    // ✅ insert after sorting
    const create = await marksmodel.insertMany(formatted);

    res.status(201).json({
      success: true,
      message: "Marks Uploaded Successfully",
      create
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports.getbyparams = async (req,res) => {
  try {

    const {uucmsNo,department,semester} = req.params;

    const getmymarks = await marksmodel.find({uucmsNo,department,semester});

    return res.status(200).json({message:"fetched",getmymarks});

    
  } catch (err) {
    console.log(err.message);
  }
  
}

module.exports.getall = async (req,res) => {
  try{

    const getall = await marksmodel.find();
    return res.json({message:"fetched",success:true,getall})

  }catch(err){
    console.log(err.message);
  }
  
}

module.exports.updateIA = async (req, res) => {
  try {
    const { id } = req.params;

    const { IA1, IA2, IA3 } = req.body;

    const updated = await marksmodel.findByIdAndUpdate(
      id,
      {
        IA1: Number(IA1) || 0,
        IA2: Number(IA2) || 0,
        IA3: Number(IA3) || 0,
      },
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "IA record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "IA Marks Updated Successfully",
      updated,
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success:false, message: err.message });
  }
};

module.exports.deleteIA = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await marksmodel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "IA record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "IA Marks Deleted Successfully",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success:false, message: err.message });
  }
};


module.exports.getme = async (req,res) => {
  const { id } = req.params;

  const finddata = await marksmodel.findById(id);

  return res.status(200).json({
    message: "fetched",
    success: true,
    finddata
  });
}
  
