var mongoose=require("mongoose");
//SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String,
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
      }
    ]
  });
  
  //Model
  var campground = mongoose.model("Campground", campgroundSchema);
  module.exports= campground;