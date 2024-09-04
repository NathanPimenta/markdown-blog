const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog')

    
app.set('view engine','ejs')//set to ejs because we will be writing our views in ejs and view engine will make into html

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/',async (req,res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'})
    
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)  //every route created in article router will be at /articles. Will be able to see it in the url localhost:5000/articles
app.listen(5000) //set port 5000 server