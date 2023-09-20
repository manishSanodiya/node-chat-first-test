const http = require("http");

const express = require("express");



//import body parser after (npm install --save body-parser)
const bodyParser = require("body-parser");

const fs = require('fs');

const app = express();

//body-parser is used before any routing middlewares
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/login',(req,res,next)=>{
    res.send(
        `<body><form action="/" onSubmit=" localStorage.setItem('username',document.getElementById('title').value)" method="POST"><input type="text" id="title" name="message"/><button type="submit">send</button></form></body>`
        )
      
  })
  app.post("/", (req, res, next) => {
    console.log(req.body);
    // fs.writeFileSync('user.txt',`${req.body.username} : ${req.body.title} `,{flag:'a'},(err)=>
    //  err? console.log(err):res.redirect("/message")
    // )
    res.redirect("/message")
    // )
  });
  

app.get("/message", (req, res, next) => {
    fs.readFile('user.txt',(err,data)=>{
        if(err){
            console.log(err)
            data= 'no data available'
        }
        res.send(
            ` ${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')" ><input type="text" name="title"/><input type="hidden" name="username" id="username"/><button type="submit">Add Products</button></form>`
          );
    })
  
  });
  
  app.post("/", (req, res, next) => {
    console.log(req.body.title, req.body.username);
    // fs.writeFile('users.txt',`${req.body.username} : ${req.body.title} `,{flag:'a'},(err)=>
    //  err? console.log(err):res.redirect("/message")
    // )

    fs.writeFile('users.txt',`${req.body.username} : ${req.body.title} `,{flag:'a'}, (err)=>
        err? console.log(err): res.redirect("/message")
    )
    
  });


  const servers = http.createServer(app);

servers.listen(4000);