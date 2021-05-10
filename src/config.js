module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NODE_ENV === 'production' ? 'heroku url' : 'http://localhost:8002'
}