// Web Service Requirements:
//
// 1) Capable of responding to HTTP GET requests*.
//
// 2) Should have an endpoint(/posts) that dynamically makes a request to (https://jsonplaceholder.typicode.com/posts) and renders
// an EJS view using the data returned. Only the title and body of all the posts should be displayed in an centered and ordered HTML
// list on the DOM. The titles should have a font size of 16px and color: #3cb371. The body should have a font size of 12px color:
// #4A4A4A.
//
// 3) Should have an individual endpoint(/aboutme) that respond data in JSON format for the questions below. The endpoint should
 // respond the appropriate data based on query parameter q given from below. If no parameter is given it should return all questions
 // and answers. The JSON response should have question and answer.
//
// - Parameter: description. Returns response for question: Tell me a little bit about yourself?
// - Parameter: tech. Returns response for question: What excites you about technology?
// - Parameter: techstack . Returns response for question: What is your preferred technology stack?
// - Parameter: hobbies. Returns response for question: What are your favorite hobbies?
//
// * Any request to an endpoint that is not defined should ‘Not Found’ as plain text


const express = require("express");
const app = express();
const fetch = require('node-fetch');

app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
  response.json({
    descriptionQuestion:  "Tell me a little bit about yourself?",
    descriptionAnswer:  "My name is Che and I live in Baltimore.  I have a passion for programming languages and developing the architecture for software programs.",
    techQuestion:  "What excites you about technology?",
    techAnswer:  "I love being able to construct full stack web applications out of nothing, being able to add my part to an already established code, and being able to look at someone else's code to get different perspectives towards a solution.  Everytime I develop a new skill or learn a new technology is the best feeling, I love exceling in programming languages.",
    techstackQuestion:  "What is your preferred technology stack?",
    techstackAnswer:  "Since I have such a love for Javascript, I would say the MEAN stack is my favorite.  I love being able to use Javascript all around the board with the MEAN stack.",
    hobbiesQuestion:  "What are your favorite hobbies?",
    hobbiesAnswer:  "My hobbies include reading books that promote positive changes in life.  They can be about new industry technologies, financial solutions, good health, etc."
  });
});

app.get('/aboutMe/:info', function(request, response) {
  if(request.params.info === "description"){
    response.json({
      descriptionQuestion: "Tell me a little bit about yourself?",
      descriptionAnswer: "My name is Che and I live in Baltimore.  I have a passion for programming languages and developing the architecture for software programs."
    });
  } else if(request.params.info === "tech"){
    response.json({
      techQuestion:  "What excites you about technology?",
      techAnswer:  "I love being able to construct full stack web applications out of nothing, being able to add my part to an already established code, and being able to look at someone else's code to get different perspectives towards a solution.  Everytime I develop a new skill or learn a new technology is the best feeling, I love exceling in programming languages."
    });
  } else if(request.params.info === "techstack"){
    response.json({
      techstackQuestion:  "What is your preferred technology stack?",
      techstackAnswer:  "Since I have such a love for Javascript, I would say the MEAN stack is my favorite.  I love being able to use Javascript all around the board with the MEAN stack."
    });
  } else if(request.params.info === "hobbies"){
    response.json({
      hobbiesQuestion:  "What are your favorite hobbies?",
      hobbiesAnswer:  "My hobbies include reading books that promote positive changes in life.  They can be about new industry technologies, financial solutions, good health, etc."
    });
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain' })
    response.end("Not Found")
  }
});

app.get('/', function(request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain' })
  response.end("Not Found")
});

app.get('/:info', function(request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain' })
  response.end("Not Found")
});

app.listen(8000, function() {
  console.log("listening on port 8000");
});
