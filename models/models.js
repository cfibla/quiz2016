var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite 	DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var host		= (url[4]||null);
var port		= (url[5]||null);
var DB_name		= (url[6]||null);

var storage = process.env.DATABASE_STORAGE;

//CARGAR MODELO ORM
var Sequelize = require ('sequelize');

//USAR DB SQLite o Postgres
var sequelize = new Sequelize (DB_name, user, pwd,
{
	dialect: protocol,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage, //solo SQLite (.env)
	omitNull: true	//solo Postgres
}
);

//IMPORTAR LA DEFINICIÓN DE LA TABLA QUIZ EN quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//EXPORTA LA DEFINICIÓN DE TABLA DE Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas en la DB
sequelize.sync().then(function(){

	//THEN(...) EJECUTA ESTE MANEJADOR UNA VEZ CREADA LA TABLA
	//LA TABLA SOLO SE CREA SI ESTÁ VACÍA
	Quiz.count().then(function(count){
		if (count != 0) {
			Quiz.create({
				pregunta: 	'Capital de Italia',
				respuesta: 	'Roma' 
			});
			Quiz.create({
				pregunta: 	'Capital de Portugal',
				respuesta: 	'Lisboa' 
			})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});