const express=require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs=require('fs');
require('dotenv').config({path:'relative/path/to/your/.env'})
const photoController=require('./controller/photoControllers');
const pageController=require('./controller/pageController');

mongoose.connect(`mongodb+srv://heroku_admin:heroku123@yasaremre.swwep.mongodb.net/pcat-db?retryWrites=true&w=majority`,{
    useNewUrlParser: true
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload()); 
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

app.use(express.static('public'));
const uploadDir = 'public/uploads';


app.set('view engine','ejs');

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda başlatıldı...`)
});

app.get('/',photoController.getAllPhotos);
app.put('/photos/:id', photoController.updatePhoto);
app.get('/add',pageController.getAddPage)
app.get('/about',pageController.getAboutPage)
app.post('/posts',photoController.createPhoto)
app.get('/posts/:id',photoController.getPhoto)
app.get('/photos/edit/:id',pageController.getEditPage);
app.delete('/photos/:id', photoController.deletePhoto);