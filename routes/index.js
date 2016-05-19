var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});


//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definición de las rutas de /quizes
router.get('/quizes',							quizController.index);
router.get('/quizes/:quizId(\\d+)',				quizController.show); // muestra la pregunta y espera la respuesta
router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer); // respuesta correcta-incorrecta
router.get('/quizes/new',						quizController.new); //formulario de nueva pregunta-respuesta
router.post('/quizes/create',					quizController.create); //incluir nueva pregunta-respuesta en la DB
router.get('/quizes/:quizId(\\d+)/edit',		quizController.edit);
router.put('/quizes/:quizId(\\d+)',				quizController.update);

module.exports = router;
