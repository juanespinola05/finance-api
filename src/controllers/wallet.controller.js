const walletRouter = require('express').Router()
const { getUserFromToken } = require('../middlewares/getUserFromToken')
const { validateUserInToken } = require('../middlewares/validateUserInToken')
const { handleValidation } = require('../middlewares/validation.handler')
const { getOperationsSchema } = require('../schemas/operations.schema')
const { WalletService } = require('../services/wallet.service')

const service = new WalletService()

walletRouter.get('/all/:year/:month',
  handleValidation(getOperationsSchema, 'params'),
  getUserFromToken,
  validateUserInToken,
  async (req, res, next) => {
    const user = req.user
    const { year, month } = req.params
    try {
      const data = await service.getData(user.id, user.email, year, month)
      res.status(200).json({ ...data })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = { walletRouter }
