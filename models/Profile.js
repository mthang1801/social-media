const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : "user"},
  company : { type :String},
  website : { type : String},
  location : { type: String},
  status : { type: String, required : true},
  skills : { type : [String], required : true},
  bio : { type : String},
  githubusername : { type :String},
  experience : [
    {
      title : { type : String, required : true},
      company : { type : String,  required : true},
      location : { type : String },
      from : { type : Date, required : true},
      to : { type : Date},
      current : { type : Boolean, default : false},
      description : { type : String }
    }
  ],
  education : [
    {
      school : { type : String , required : true},
      fieldtostudy : { type : String},
      degree : { type : String},
      location : { type : String},
      from : { type : Date, require : true},
      to : { type : Date},
      current : { type : Boolean, default : false},
    },
  ],
  social : {
    youtube : { type : String},
    twitter : { type : String},
    facebook : { type : String},
    instagram : { type : String},
    linkedin : { type : String}
  },
  createdAt : { type : Date, default : Date.now },
  updatedAt : { type : Date, default : null}
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);
