var path = require('path');

//CARGAR MODELO ORM
var Sequelize = require ('sequelize');

//USAR DB SQLite
var sequelize = new Sequelize (null, null, null,{
	dialect:'sqlite', storage:'quiz.sqlite'
});

//IMPORTAR LA DEFINICIÓN DE LA TABLA QUIZ EN quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//EXPORTA LA DEFINICIÓN DE TABLA DE Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas en la DB
sequelize.sync().success(function(){

	//SUCCESS(...) EJECUTA ESTE MANEJADOR UNA VEZ CREADA LA TABLA
	//LA TABLA SOLO SE CREA SI ESTÁ VACÍA
	Quiz.count().success(function(count){
		if (count === 0) {
			Quiz.create({
				pregunta: 	'Capital de Italia',
				respuesta: 	'Roma' 
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});