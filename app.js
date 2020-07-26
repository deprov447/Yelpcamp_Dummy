var express   =    require("express"),
bodyParser    =    require("body-parser"),
mongoose      =    require("mongoose"),
campground    =    require("./models/campgrounds"),
comment      =    require("./models/comments"),
// var users =require("./models/users.js");

app         =    express();

var seedDB = require("./seeds");        //seeding the database with dummy data
seedDB();                               //same

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("YelpCamp Online");
});

app.get("/", function (req, res) {
  res.render("./landing.ejs");
});

app.get("/campgrounds", function (req, res) {
  campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log("******Squeusy thing******");
    } else {
      res.render("./campgrounds/camps.ejs", { campgrounds: campgrounds });
    }
  });
});
app.post("/campgrounds", function (req, res) {
  res.render("./landing.ejs");
  var name = req.body.name;
  var place = req.body.place;
  var desc = req.body.desc;

  campground.create(
    {
      name: name,
      imageURL: place,
      description: desc,
    },
    function (err, campground) {
      if (err) {
        console.log("********Error***********");
        console.log(err);
      } else {
        console.log("********NewLy Created Something***********");
        console.log(campground);
      }
    }
  );
});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", function (req, res) {
  campground.findById(req.params.id).populate("comments").exec( function (err, foundcamp) {
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(foundcamp);
      res.render("./campgrounds/show.ejs", { campp: foundcamp });
    }
  });
});

//=============================
app.get("/campgrounds/:id/comments/new",function(req,res){
  campground.findById(req.params.id,function(err, campground){
    if(err){
      console.log(err);
    }
    else{
      res.render("comments/new.ejs",{campground: campground})
    }
  })
})

app.post("/campgrounds/:id/comments",function(req,res){
  campground.findById(req.params.id,function(err,campground){
    if(err)
    {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else
    {
      comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err)
        }
        else{
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      });
    }
  })
})
//=============================
