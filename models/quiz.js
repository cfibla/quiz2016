//DEFINICIÓN DEL MODELO DE QUIZ (+ validación)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Quiz',
	{
		pregunta: 	{
			type: DataTypes.STRING,
			validate: { notEmpty: {message: "Falta pregunta"}}
		},
		respuesta: 	{
			type: DataTypes.STRING,
			validate: { notEmpty: {message: "Falta respuesta"}}
		}
	});
}