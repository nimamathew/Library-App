const express = require('express');
const BookData = require('./src/model/Bookdata');
const User = require('./src/model/user');
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken');
// const Userdata = require('./src/model/user');
var app = new express();
app.use(cors());
app.use(bodyparser.json());
// username='admin';
// password='1234';


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

//to insert new user details
  app.post('/insertuser',function(req,res){
   
    console.log(req.body);
   
    var user = {       
        firstName   : req.body.user.firstName,
        lastName    : req.body.user.lastName,
        userName    : req.body.user.userName,
       password     : req.body.user.password,
   }  
     
   var user = new User(user);
   user.save();
});


//to insert new book details
// app.post('/insert',verifyToken,function(req,res){
   
app.post('/insert',function(req,res){
    console.log(req.body);
   
    var bookitem = {       
        bookName   : req.body.book.bookName,
        bookAuthor : req.body.book.bookAuthor,
        description: req.body.book.description,
        imageUrl   : req.body.book.imageUrl,
   }       
   var book = new BookData(bookitem);
   book.save();
});


  
//RETEIVING ALL THE BOOK DETAILS

app.get('/books',function(req,res){
    
  BookData.find()
              .then(function(book){
                  res.send(book);
              });
});

//retrieving particular book data for edit

app.get('/:id',(req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

app.get('/getuser',  (req, res) => {
   const userName = req.body.userName;
  console.log(userName);
    User.findOne({"userName:any":userName})
    .then((user)=>{
      res.send(user);
    });
  
})

app.get('/login', (req, res) => {
  console.log("inside backend");
  let UserData = req.body
                console.log(UserData);
                User.findOne({"username":userName})
                   .then((data)=>{
                      if (!data.username) {
                         res.status(401).send('Invalid Username')
                         } else 
                         {
                         res.status(401).send('Valid Username')
                          }
                                  });
   
      if ( data.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: username+password}
        let token = jwt.sign(payload, 'secretKey')
        console.log(token);
        res.status(200).send({token})
      }
    
  })

    app.put('/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      bookName = req.body.bookName,
      bookAuthor = req.body.bookAuthor,
      description = req.body.description,
      imageUrl = req.body.imageUrl
      BookData.findByIdAndUpdate({"_id":id},
                                  {$set:{
                                  "booktName":bookName,
                                  "bookAuthor":bookAuthor,
                                  "description":description,
                                  "imageUrl":imageUrl}})
     .then(function(){
         res.send();
     })
   })
   
   app.delete('/remove/:id',(req,res)=>{
   console.log(req.params.id);
    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
     

app.listen(3000, function(){
    console.log('listening to port 3000');
});

