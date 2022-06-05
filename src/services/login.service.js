const { models } = require('../lib/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')
const boom = require('@hapi/boom')

class LoginService {
  async login (data) {
    const { email, password } = data
    const user = await models.User.findOne({
      where: {
        email
      }
    })

    const passwordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!user || !passwordMatch) {
      throw boom.unauthorized('Invalid email or password')
    }

    const tokenPayload = {
      email: user.email,
      id: user.id
    }

    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30
      }
    )

    return {
      email: user.email,
      token
    }
  }
}

module.exports = { LoginService }
