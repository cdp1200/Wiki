const homePage = require('../controllers/homePage');


module.exports = (app) => {
    app.get('/', homePage)
}