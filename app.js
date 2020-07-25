var express   =    require("express"),
bodyParser    =    require("body-parser"),
mongoose      =    require("mongoose"),
campground    =    require("./models/campgrounds"),
comments      =    require("./models/comments"),
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
      res.render("./camps.ejs", { campgrounds: campgrounds });
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
  res.render("new.ejs");
});

app.get("/campgrounds/:id", function (req, res) {
  campground.findById(req.params.id).populate("comments").exec( function (err, foundcamp) {
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(foundcamp);
      res.render("./show.ejs", { campp: foundcamp });
    }
  });
});
