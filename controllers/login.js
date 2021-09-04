const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/user');

require('dotenv').config();

function pageRender(req, res) {
    if(req.cookies.token) {
        res.render('login', {validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET)});
    } else {
        res.render('login');
    }
    
}

async function pagePost(req, res) {
    await User.findOne({username: req.body.username}, function (err, user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if(response) {
                var payload = {_id: user._id, username: user.username};
                var options = {expiresIn: process.env.JWT_TIMER};
                const secret = process.env.JWT_SECRET;
                var token = jwt.sign(payload, secret, options);
                // console.log(token);
                res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 1000 });
                res.redirect("/");
            }
        })
    })
}

module.exports = {
    pageRender,
    pagePost
}