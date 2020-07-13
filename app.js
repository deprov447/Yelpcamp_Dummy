var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));

//SCHEMA
var campgroundSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  description: String,
});

//Model
var campground = mongoose.model("Campground", campgroundSchema);

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
      description: desc
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
  campground.findById(req.params.id,function(err,campp){
    res.render("./show.ejs",{campp:campp});
  })

});
