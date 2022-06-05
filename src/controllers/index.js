const router = require('express').Router()

const { usersRouter } = require('./users.controller')
const { loginRouter } = require('./login.controller')
const { operationsRouter } = require('./operations.controller')
const { walletRouter } = require('./wallet.controller')
const { categoryRouter } = require('./category.controller')

function setupRoutes (app) {
  app.use('/api', router)
  router.use('/users', usersRouter)
  router.use('/login', loginRouter)
  router.use('/operations', operationsRouter)
  router.use('/wallet', walletRouter)
  router.use('/categories', categoryRouter)
}

module.exports = { setupRoutes }
