var mongoose=require("mongoose");

var commentSchema= mongoose.Schema({
    text:String,
    author: String
})

comment=mongoose.model("comment",commentSchema);

module.exports=comment;