const cookieParser = require('cookie-parser');

function pageRender(req, res) {
    res.clearCookie('token');
    res.clearCookie('loggedIn')
    res.redirect('/');
}

module.exports = {pageRender}