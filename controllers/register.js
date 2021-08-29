const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const User = require('../models/user');

require('dotenv').config()

function pageRender(req, res) {
    if(req.cookies.token) {
        res.render('register', {validUser: jwt.verify(req.cookies.token, process.env.JWT_SECRET)});
    } else {
        res.render('register');
    }
}

async function pagePost(req, res) {
    var body = req.body;
    
    if(body.password === body.repeatPassword) {
        await bcrypt.genSalt(Number(process.env.BCYRPT_SALT), async function(err, salt) {
            await bcrypt.hash(body.password, salt, (err, hash) => {
                let newUser = {
                    username: body.username,
                    password: hash
                }
        
                let tempUser = new User(newUser);

                tempUser.save(function(err, tempCube) {
                    if(err) return console.error(err);
                    console.log(tempCube);
                })
            
            res.redirect('/login');
            })
        })
    }
}

module.exports = {
    pageRender,
    pagePost
}