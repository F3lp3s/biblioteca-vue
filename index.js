const mysql = require('serverless-mysql')();

mysql.config({
  host: 'localhost',
  database: 'livros',
  user: 'aluno',
  password: 'icarodog123'
})

exports.dados = async() => {
  let result = await mysql.query('SELECT * FROM usuarios')
  console.log(result)
  return result
}