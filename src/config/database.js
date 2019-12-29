require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  // development: {
  user: process.env.USER,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  }
  // }
}