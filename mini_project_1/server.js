const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
let app =require('./index.js');

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.status(400).send({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.status(403).send({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.status(422).send({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  testFunction (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port =4000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.use('/api',require('./routes/app'));
//   app.use(function(err,req,res,next){

//     res.status(422).send({error:err.message});
//     res.status(403).send({error:err.message});
//     res.status(400).send({error:err.message});
// });


  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/', middleware.checkToken, handlers.testFunction);


  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();