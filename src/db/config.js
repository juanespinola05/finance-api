const { dbUrl } = require('../config/config')

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres'
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
