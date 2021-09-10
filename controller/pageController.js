const photo=require('../model/photo');

exports.getAboutPage=(req,res)=>{
    res.render('about');
}
exports.getAddPage=(req,res)=>{
    res.render('add_post');
}
exports.getEditPage=async function(req,res){
    const photos=await photo.findOne({_id:req.params.id});
    res.render('edit',{
        photos
    });
}