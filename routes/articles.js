const express = require('express')
const Article = require('./../models/articles')
const router = express.Router()


router.get('/new',(req,res) => {
    res.render('articles/new',{article: new Article()})
})

router.get('/edit/:id',async(req,res) =>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article:article})
})

router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', { article:article})
    
})

router.post('/', async (req,res,next) =>{
    req.article = new Article ()
    next()
},saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
            req.article = await Article.findById(req.params.id)
            next()
          }, saveArticleAndRedirect('edit'))

// we will use id to delete and to use delete method we will have to override
router.delete('/id',async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req,res) =>{
        let article = req.article
        article.title= req.body.title
        article.description= req.body.description
        article.markdown= req.body.markdown

    try{

    article =  await article.save()
    res.redirect(`/articles/${article.slug}`)
// res.redirect(`/articles/${article.id}`);
// String Interpolation: Backticks allow you to embed expressions within a string using ${expression}. This makes it easy to include variable values within strings.
    }catch (e){

    res.render(`articles/${path}`,{article:article})
    }
}
}
module.exports = router  
