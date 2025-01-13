const verifyTokenController = require("../api").verifyToken;
const apiDepanController = require("../api").apiDepan;
const apiPostController = require("../api").apiPost;


module.exports = function (app) {
    // app.get('/api/text',
		// verifyTokenController.verifyToken, apiDepanController.getText);
    app.get('/api/text',
		apiDepanController.getText);
    app.get('/api/pi',
		apiDepanController.getPI);
    app.get('/api/getportfolio', apiDepanController.getAllProject);

    app.post('/api/portfolio/insertProject',
      verifyTokenController.verifyToken, apiPostController.insertProject
    );
}