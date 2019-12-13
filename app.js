const app = require('express')();
const express = require('express');
app.set('view engine','hbs');
const nodemailer = require('nodemailer');
var mysql      = require('mysql');
const expressValidator = require('express-validator');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'demo',
  multipleStatements:true
});
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jai9399@gmail.com',
      pass: '290100mybday'
    }
  });
  var mailOptions = {
    from: 'jai9399@gmail.com',
    to: '',
    subject: 'Sending Email',
    text: 'Thanks For Logging In'
  };
connection.connect();
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.static('C:/Users/Jai Kathuria/Desktop/sms_app/static'));
app.get('/',function(req,res){
      res.sendFile('C:/Users/Jai Kathuria/Desktop/sms_app/static/index.html')
})
app.get('/forgot',function(req,res){
                     
});
var errors;
var checker=0;
app.get('/logout',function(req,res){
    console.log('Logout')
    user='';
    res.sendFile('C:/Users/Jai Kathuria/Desktop/sms_app/static/index.html');
})
app.post('/register',function(req,response){
    var email = req.body.email;
    var sendmail=email;
    var user = req.body.username;
    var password = req.body.password;
    email="\'"+email+"\'";
    password="\'"+password+"\'";
    user ="\'"+user+"\'";
    req.check('email','Invalid email Address').isEmail();
    req.check('password','Minimum Password Length is 8').isLength({min:8});
    errors = req.validationErrors();
    console.log(errors);
    if(errors){
        response.redirect('/make');
        }
    else{
            let sql = "Insert into users values("+user+","+email+","+password+");"
            connection. query(sql,function (error, results, fields) {
            if (error) {
                            checker=1;
                            console.log('Duplicate Entry');
                            console.log(error);
                            } 
                                               
                     else{
                          console.log('Inserted Record');
                          mailOptions.to=sendmail;
                          transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                          console.log(error);
                            } else {
                        console.log('Email sent: ' + info.response);
                            }
      });
                          }
                       });
            response.redirect('/make');
            response.end();
    }});
app.get('/make',function(req,res){
    var p =''
    console.log(checker);
    if(checker==0){
    for(k in errors)
    p=p+errors[k].msg;
    res.render('index.hbs',{err:p})
}
    else{
        checker=0;
        res.render('index.hbs',{err:"Duplicate Entry"})
        
    }
    
})
var user;
var check=0;
app.post('/run',function(req,res){
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    username = "\'"+username +"\'";
    let sql = "Select  password from Users Where username ="+username+";";
   connection.query(sql,function(error ,result , field){
           if(error){
                   check=1;
                   res.redirect('/login');
                   res.end();
           }
           else{
                let pass =result[0].password;
                if(pass==password){
                  user=username;
                  res.redirect('/home');
                  res.end();
                } 
                else{
                        check=1;                    
                        res.redirect('/login');
                        res.end();

                }  }
                
           }
   );
});
app.get('/login',function(req,res){
    if(check==1){
        res.render('index.hbs',{erro:"Incorrect Credentials"});
    }

});
app.get('/home',function(req,res){
    //email sending code goes here
    console.log('user')
    res.render('index.hbs',{name:user});
})
app.listen(5000,function(){
    console.log('hi');
})
