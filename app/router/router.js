const verifyTokenController = require("../api").verifyToken;
const apiDepanController = require("../api").apiDepan;
const apiPostController = require("../api").apiPost;
const apiSatriaController = require("../api").apiSatria;
const apiWAController = require("../api").apiWA;


module.exports = function (app) {
    // app.get('/api/text',
		// verifyTokenController.verifyToken, apiDepanController.getText);
    app.get('/api/text',
		apiDepanController.getText);
    app.get('/api/pi',
		apiDepanController.getPI);
    app.get('/api/getportfolio', apiDepanController.getAllProject);
    app.get('/api/getskills', apiDepanController.getAllSkills);

    app.post('/api/portfolio/insertProject',
      verifyTokenController.verifyToken, apiPostController.insertProject
    );
    app.post(
      '/api/portfolio/insertPicture',
      verifyTokenController.verifyToken, apiPostController.insertProfilePicture
    );

    const URL_WA = "/api/apiWA"
    app.post(
      `${URL_WA}/getPP`,
      verifyTokenController.verifyToken,
      apiWAController.getPP
    );
    app.post(
      `${URL_WA}/getText`,
      verifyTokenController.verifyToken,
      apiWAController.getText
    );
    app.post(
      `${URL_WA}/changebyid`,
      verifyTokenController.verifyToken,
      apiWAController.changeById
    );
    app.post(
      `${URL_WA}/deletebyid`,
      verifyTokenController.verifyToken,
      apiWAController.deleteById
    );
    app.post(
      `${URL_WA}/addtext`,
      verifyTokenController.verifyToken,
      apiWAController.addText
    );

    

    const URL_AUTH = "/api/auth"
    app.post(
      `${URL_AUTH}/login`,apiSatriaController.login
    );
    app.post(
      `${URL_AUTH}/logout`,verifyTokenController.verifyToken, apiSatriaController.logout
    );
}