const homePage = require('../controllers/homePage');
const register = require('../controllers/register');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const article = require('../controllers/articles');

module.exports = (app) => {
    app.get('/', homePage);
    app.get('/register', register.pageRender);
    app.get('/login', login.pageRender);
    app.get('/logout', logout.pageRender);
    app.get('/article/:id', article.renderPageById);
    app.get('/create', article.createArticlePageRender);
    app.get('/all-articles', article.renderArticleLinks);
    app.get('/edit/:id', article.renderEditPage);
    app.put('/editArticle/:id', article.editArticle)
    app.post('/registerPost', register.pagePost);
    app.post('/loginPost', login.pagePost);
    app.post('/createArticle', article.createArticlePost);
}