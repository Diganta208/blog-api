const mongoose= require('mongoose')

const blogSchema= mongoose.Schema({
    title : String,
    blogBody : String,
    publishedDate : {type : Date, default : Date.now()},
    author : String,
    likeCount : Number
})

const Blog= mongoose.model('blog', blogSchema)


//module.exports=blogSchema
module.exports=Blog

