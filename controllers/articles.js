const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const Article = require('../models/article');

require('dotenv').config();

async function renderPageById (req, res) {
    var theId = req.params.id;

    await Article.findById(theId, function (err, article) {
        if(req.cookies.token) {
            res.render('article', 
            {
                validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET),
                theArticle: article,
            });
        } else {
            res.render('article', 
            {
                theArticle: article,
            });
        }
    }).lean();
}

function createArticlePageRender (req, res) {
    res.render('create');
}

function createArticlePost (req, res) {
    let body = req.body;
    let user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    let newArticle = {
        title: body.title,
        description: body.description,
        author: user._id,
        createdAt: Date(),
    }

    let tempArticle = new Article(newArticle);

    tempArticle.save(function(err, tempArticle) {
        if(err) return console.error(err);
        console.log(tempArticle);
    })

    res.redirect('/')
}

async function renderArticleLinks (req, res) {
    await Article.find(function(err, articles) {
        res.render('all-articles', {articles});
    }).lean()
}

async function renderEditPage (req, res) {
    var theId = req.params.id;

    await Article.findById(theId, function (err, article) {
        if(req.cookies.token) {
            res.render('edit', 
            {
                validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET),
                theArticle: article,
            });
        } else {
            res.render('article', 
            {
                theArticle: article,
            });
        }
    }).lean();
}

async function editArticle (req, res) {
    var body = req.body;
    var user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    
    var updatedArticle = {
        title: body.title,
        description: body.description,
        author: user._id,
        createdAt: Date(),
    }

    console.log(await Article.findByIdAndUpdate(req.params.id, updatedArticle).lean());
    res.redirect('/');
}

module.exports = {
    renderPageById,
    renderArticleLinks,
    createArticlePageRender,
    renderEditPage,
    createArticlePost,
    editArticle,
}