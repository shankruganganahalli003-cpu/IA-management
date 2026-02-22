const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authmodel"
  },

  name:{
    type:String,
    required:true
  },

  uucmsNo: {
    type: String,
    required: true,
    unique: true
  },

  department: String,
  semester: Number,


});

module.exports = mongoose.model("studentmodel", studentSchema);
