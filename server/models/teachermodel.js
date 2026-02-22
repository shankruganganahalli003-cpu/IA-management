const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authmodel"
  },

  name:String,

  department: String,
  
  subject:String,

  semester:{
    type:Number,
    required:true
  }

});

module.exports = mongoose.model("teachermodel", teacherSchema);
