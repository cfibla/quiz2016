
var models = require('../models/models.js');


//Función AutoLoad: factoriza el código
//si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function (quiz){
			if (quiz) {
			req.quiz = quiz;
			next();
		} else { next (new Error('No existe quizId = ' + quizId))}
	}
	).catch(function(error) { next (error)});
};

//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(
		function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: []});
	}
	).catch(function(error) { next (error)})
};

//GET /quizes/:id
exports.show = function(req, res){
//	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
//	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
//	models.Quiz.find(req.params.quizId).then(function(quiz){
	var resultado ='Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';	
	}
		res.render('quizes/answer',
					{quiz: req.quiz, respuesta: resultado, errors: []});

};
//GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build (
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);

	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create //función validate -- si hay algún error renderiza 'quizes/new' con los errores
exports.create = function(req, res) {
	var quiz = models.Quiz.build ( req.body.quiz );

//	quiz.validate().then(
//		function(err) {
//			if (err) {
//				res.render ('quizes/new', {quiz: quiz, errors: err.errors});
//			} else {
				//guarda en la DB los campos pregunta y respuesta de quiz
				quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then( function(){ res.redirect('/quizes')})// redirección a la lista de preguntas
//			}
//		}
//	);

};

//GET /quizes/:id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz; //autoload de la instancia de quiz

	res.render('quizes/edit.ejs', {quiz: quiz, errors: []});
};

//PUT /quizes/:id
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(
		function(err) {
			if (err) {
				res.render ('quizes/edit', {quiz: quiz, errors: err.errors});
			} else {
				req.quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function (){res.redirect('/quizes');}); //REDIRECCIóN HTTP a lista de preguntas
			}
		}
	);
};