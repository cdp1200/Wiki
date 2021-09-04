const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Article = require('../models/article');

require('dotenv').config();

module.exports = homePage = async (req, res) => {
    Article.find(await function(err, articles) {
        if(req.cookies.token) {
            res.render('index', 
            {
                validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET),
                theArticles: articles,
            });
        } else {
            res.render('index', 
            {
                theArticles: articles,
            });
        }
    }).lean();
}

