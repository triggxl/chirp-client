module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NODE_ENV === 'production' ? 'https://ancient-chamber-86595.herokuapp.com/' : 'http://localhost:8002'
}