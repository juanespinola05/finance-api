const usersRouter = require('express').Router()
const { handleValidation } = require('../middlewares/validation.handler')
const { getUserFromToken } = require('../middlewares/getUserFromToken')
const { validateUserInToken } = require('../middlewares/validateUserInToken')
const { registerUserSchema, checkEmailSchema } = require('../schemas/users.schema')
const { UserService } = require('../services/users.service')

const service = new UserService()

usersRouter.get('/info',
  getUserFromToken,
  validateUserInToken,
  async (req, res, next) => {
    const email = req.user.email
    try {
      const user = await service.findOne(email)
      res.status(200).json({ name: user.name })
    } catch (error) {
      next(error)
    }
  })

usersRouter.post('/register',
  handleValidation(registerUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const token = await service.create(req.body)
      res.status(201).json(token)
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.get('/check/email/:email',
  handleValidation(checkEmailSchema, 'params'),
  async (req, res, next) => {
    const { email } = req.params
    try {
      const available = await service.findEmail(email)
      res.status(200).json(available)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = { usersRouter }
