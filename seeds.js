var mongoose = require("mongoose"),
  Campgrounds = require("./models/campgrounds"),
  Comment     = require("./models/comments");

var data = [
  {
    name: "one dummy name",
    description: "lorem ipsum desc 1",
  },

  {
    name: "two dummy name",
    description: "lorem isum  desc 2",
  },

  {
    name: "three dummy name",
    description: "lorem ipum  desc 3",
  },
];

function seedDB() {
  Campgrounds.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed camps!!");

      data.forEach(function (seed) {
        Campgrounds.create(seed, function (err, campground) {
          if (err) {
            console.log(err);
          } else {
            console.log("added a camp");
            Comment.create(
              {
                text: "this is an awesome page",
                author: "deprX"
              },function(err,comment){
                if(err){
                  console.log(err)
                }
                else{
                  campground.comments.push(comment);
                  campground.save()
                  console.log("created a comment");
                }

              })
          }
        });
      });
    }
  });
}

module.exports = seedDB;
