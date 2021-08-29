const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config()

module.exports = homePage = (req, res) => {
    if(req.cookies.token) {
        res.render('index', {validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET)});
    } else {
        res.render('index');
    }
}

