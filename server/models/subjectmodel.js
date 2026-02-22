const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({

  subjectName: {
    type: String,
    required: true
  },

  semester: Number,

  department: String,

  teacher:String

});

module.exports = mongoose.model("subjectmodel", subjectSchema);
