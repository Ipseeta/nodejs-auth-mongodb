const { verifySignUp } = require('../middlewares');
const AuthController = require('../controllers/auth.controller');
module.exports = function (app) {
    app.post("/auth/signup", [verifySignUp.checkDuplicateUsername], AuthController.signup);
    app.post("/auth/signin", AuthController.signin);
}