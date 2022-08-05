 const express = require('express');
 const path = require('path');
 const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 8000;

const public = path.join(__dirname,"../Public");
const templates_path = path.join(__dirname,"../Templates/views");
const partial_path = path.join(__dirname,"../Templates/Partials");


app.set('view engine','hbs');
app.set('views',templates_path);
hbs.registerPartials(partial_path);
app.use(express.static(public));

app.get("/",(req,res)=>{
    //res.sendFile(path.join(public, 'home.html'));
    // res.send("this home page ");
    res.render('home');
})

app.get("/help",(req,res)=>{

    //res.sendFile(path.join(public,"help.html"))
    res.render('help');
})

app.get("/about",(req,res)=>{
    //res.sendFile(path.join(public,"about.html"))
    res.render('about');
})

app.get("/contact",(req,res)=>{
    //res.sendFile(path.join(public,"contact.html"))
    res.render('contact');
})
app.get("/covidTracker",(req,res)=>{
    //res.sendFile(path.join(public,"contact.html"))
    res.render('covidTracker');
})

app.get("/vaccine",(req,res)=>{
    //res.sendFile(path.join(public,"contact.html"))
    res.render('vaccine');
})

app.get("*",(req,res)=>{
    //res.sendFile(path.join(public,"404.html"))
    res.render('404');
})

app.listen(port,()=>{
    console.log('server running at http://localhost:${port}')
    
})
