const loginRouter = require('express').Router()
const { loginSchema } = require('../schemas/login.schema')
const { handleValidation } = require('../middlewares/validation.handler')
const { LoginService } = require('../services/login.service')

const service = new LoginService()

loginRouter.post('/',
  handleValidation(loginSchema, 'body'),
  async (req, res, next) => {
    try {
      const loginData = await service.login(req.body)
      res.json(loginData)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = { loginRouter }
