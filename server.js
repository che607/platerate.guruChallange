const express = require("express");
const app = express();
const fetch = require('node-fetch');

app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const aboutMe = {
  descriptionQuestion:  "Tell me a little bit about yourself?",
  descriptionAnswer:  "My name is Che and I live in Baltimore.  I have a passion for programming languages and developing the architecture for software programs.",
  techQuestion:  "What excites you about technology?",
  techAnswer:  "I love being able to construct full stack web applications out of nothing, being able to add my part to an already established code, and being able to look at someone else's code to get different perspectives towards a solution.  Everytime I develop a new skill or learn a new technology is the best feeling, I love exceling in programming languages.",
  techstackQuestion:  "What is your preferred technology stack?",
  techstackAnswer:  "Since I have such a love for Javascript, I would say the MEAN stack is my favorite.  I love being able to use Javascript all around the board with the MEAN stack.",
  hobbiesQuestion:  "What are your favorite hobbies?",
  hobbiesAnswer:  "My hobbies include reading books that promote positive changes in life.  They can be about new industry technologies, financial solutions, good health, etc."
};

app.get('/posts', function(request, response) {
  fetch('https://jsonplaceholder.typicode.com/posts')
    	.then(function(res) {
    		return res.text();
    	}).then(function(body) {
        var posts_array = JSON.parse(body);
        response.render('templates/posts', {posts: posts_array});
    	});
});

app.get('/aboutme', function(request, response) {
  response.render('templates/aboutMe', {aboutMe: aboutMe});
});

app.get('/:info', function(request, response) {
  response.render('templates/notFound');
});

app.get('/aboutMe/:info', function(request, response) {
  console.log("RIGHT HERE: ", request.params.info, "TYPE: ", typeof(request.params.info));
  if(request.params.info === "description"){
      response.render('templates/description', {aboutMe: aboutMe});
  } else if(request.params.info === "tech"){
      response.render('templates/tech', {aboutMe: aboutMe});
  } else if(request.params.info === "techstack"){
      response.render('templates/techstack', {aboutMe: aboutMe});
  } else if(request.params.info === "hobbies"){
      response.render('templates/hobbies', {aboutMe: aboutMe});
  } else {
      response.render('templates/notFound');
  };
});


app.listen(8000, function() {
  console.log("listening on port 8000");
});
