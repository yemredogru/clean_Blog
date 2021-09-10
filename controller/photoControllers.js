const photo=require('../model/photo');
const fs=require('fs');

exports.getAllPhotos = async function (req, res) {
  const page=req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos= await photo.find().countDocuments();


  const photos = await photo.find({})
  .sort('-dateCreated')
  .skip((page-1)* photosPerPage)
  .limit(photosPerPage);

  res.render("index", {
    photos:photos,
    current:page,
    pages:Math.ceil(totalPhotos/photosPerPage)
  });
};


exports.getPhoto= async (req, res) => {
    const photos= await photo.findById(req.params.id);
    res.render('photo',{photos});
};

exports.updatePhoto=async (req, res) => {
    const Photo = await photo.findOne({ _id: req.params.id });
    Photo.title = req.body.title
    Photo.description = req.body.description
    Photo.save()
  
    res.redirect(`/photos/${req.params.id}`)
  }
exports.createPhoto=async function(req,res){
    // console.log(req.body)
    // await photo.create(req.body);
    // res.redirect('/add')
    let uploadImage = req.files.image || "default.jpg";
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath,async()=>{
        await photo.create({
            ...req.body,
            image:'/uploads/'+uploadImage.name
        })
    })
    res.redirect('/')
};

exports.deletePhoto=async (req, res) => {
    const Photo = await photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + Photo.image;
    fs.unlinkSync(deletedImage);
    await photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
}