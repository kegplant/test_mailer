var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
// use it!
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'jinalpatel'}));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));


mailer.extend(app, {
 from: 'no-reply@lovefool.com',
 host: 'smtp.gmail.com', // hostname 
 secureConnection: true, // use SSL 
 port: 465, // port for secure SMTP 
 transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
 auth: {
   user: 'lovefoolteam@gmail.com',
   pass: 'codingdojo'
 }
});

app.get('/', function(req, res){
    res.render('index', {title: "Survey Form"});
})


app.post('/email', function (req, res, next) {
    console.log(req.body);
    app.mailer.send('email', {
      to:  req.body.email,//'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
      subject: 'Lovefool Invite Email', // REQUIRED. 
      otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
    }, function (err) {
      if (err) {
        // handle error 
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
      res.redirect('/');
    });
  });

// app.get('/', function(req, res){
//     res.render('index', {title: "Survey Form"});
// })

// app.post('/survey', function(req, res){
//     name = req.body.name;
//     location = req.body.location;
//     lang = req.body.lang;
//     comment = req.body.comment;
//     res.redirect('/result');
// })

// app.get('/result', function(req, res){
//     context = {
//         name: name,
//         location: location,
//         lang: lang,
//         comment: comment
//     }
//     res.render('result', {title: "Result Form", context});
// })

app.listen(8000, function(){
});