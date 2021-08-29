const homePage = require('../controllers/homePage');
const register = require('../controllers/register');
const login = require('../controllers/login');
const logout = require('../controllers/logout');

module.exports = (app) => {
    app.get('/', homePage);
    app.get('/register', register.pageRender);
    app.get('/login', login.pageRender);
    app.get('/logout', logout.pageRender);
    app.post('/registerPost', register.pagePost);
    app.post('/loginPost', login.pagePost);
}