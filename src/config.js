module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NODE_ENV === 'production' ? 'https://stormy-hollows-73700.herokuapp.com' : 'http://localhost:8002'
}