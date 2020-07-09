var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("YelpCamp Online");
});

app.get("/",function(req,res){
    res.render("./landing.ejs");
})

app.get("/campgrounds",function(req,res){
    res.render("./camps.ejs")
})
app.post("/campgrounds",function(req,res){
    res.send("You hit the postroute");
    var name =req.body.name;
    var place =req.body.place;


})

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs")

})