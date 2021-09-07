const express=require('express');
const app = express();
const mongoose = require('mongoose');
const photo=require('./model/photo');
const path=require('path');
require('dotenv').config({path:'relative/path/to/your/.env'})

mongoose.connect(`mongodb+srv://yasaremre:159357qM**@yasaremre.swwep.mongodb.net/cleanblog-test-db?retryWrites=true&w=majority`,{
    useNewUrlParser: true
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(3000);

app.get('/',async function(req,res){
    const photos = await photo.find({});
    res.render('index',{
        photos
    })
});

app.get('/add',function(req,res){
    res.render('add_post')
})
app.post('/posts',async function(req,res){
    console.log(req.body)
    await photo.create(req.body);
    res.redirect('/add')
})

app.get('/posts/:id',async function(req,res){
    const photos=await photo.findById(req.params.id)
    console.log(photos)
    res.render('photo',{
        photos
    })
})