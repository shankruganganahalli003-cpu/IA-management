const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({

  uucmsNo:{
    type:String,
    // required:true
  },

  department:{
    type:String
  },

  semester:Number,

  name:String,

  IA1: { type: Number, default: 0 },
  IA2: { type: Number, default: 0 },
  IA3: { type: Number, default: 0 },

  // total: Number

}, { timestamps: true });

module.exports = mongoose.model("marksmodel", marksSchema);
