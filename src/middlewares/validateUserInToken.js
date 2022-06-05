const boom = require('@hapi/boom')
const { models } = require('../lib/sequelize')

const validateUserInToken = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.user.email,
        id: req.user.id
      }
    })

    if (!user) {
      throw boom.unauthorized('Missing or invalid token')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateUserInToken }
