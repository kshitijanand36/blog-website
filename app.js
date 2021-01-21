//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
var _ = require('lodash');
// Load the core build.
// var _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// var fp = require('lodash/fp');
//
// // Load method categories.
// var array = require('lodash/array');
// var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// const obj1 = {
//   post_title : "lorem-ipsum",
//   post_body : homeStartingContent
// }

const app = express();

posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req , res){

  // posts.push(homeStartingContent);
  res.render("home" , {content : posts , starting_content : homeStartingContent });
});

app.get("/blogs/:topic" , function(req , res){

  // console.log(req.params.topic);

  var reqd = _.lowerCase( req.params.topic);

  console.log(reqd);
  for(let i = 0 ;  i< posts.length ; i++){
    // console.log(posts[i].post_title);
    console.log(_.lowerCase(posts[i].post_title));
    if(_.lowerCase(posts[i].post_title) == reqd){
      // console.log("Match found!");
      res.render("post" , {post_title :posts[i].post_title , post_content : posts[i].post_body })
    }
  }

  // res.send("Page not found!");

  res.render("error");
})

app.get("/home" , function(req , res){

  res.redirect("/");
})

app.get("/about" , function(req , res){

  res.render("about" , {content : aboutContent});
});

app.get("/contact" , function(req , res){

  res.render("about" , {content : contactContent});
});

app.get("/compose" , function(req , res){

  res.render("compose");
});

app.post("/compose" , function(req , res){
  const post = {
    post_title : req.body.post_title,
    post_body : req.body.post_body
  }

  // console.log(post);

  posts.push(post);

  res.redirect("/");
})

app.listen(3000 || process.env.PORT, function() {
  console.log("Server started on port 3000");
});
