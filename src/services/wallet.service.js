const { models } = require('../lib/sequelize')
const { OperationsService } = require('./operations.service')

class WalletService {
  static async create (user) {
    const wallet = await models.Wallet.create({
      userId: user.id,
      amount: 0
    })
    return wallet
  }

  async getData (userId, email, year, month) {
    // TODO:  change limit: 200 lol
    const lastMonthOperations = await OperationsService.findByMonth({ email, year, month, limit: 200 })
    const { dataValues: { amount } } = await models.Wallet.findOne({
      where: {
        userId
      }
    })
    console.log(lastMonthOperations)
    const incomeTotal =
      lastMonthOperations
        .filter(op => op.dataValues.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0)
    const outflowTotal =
      lastMonthOperations
        .filter(op => op.dataValues.type === 'outflow')
        .reduce((acc, curr) => acc + curr.amount, 0)

    const res = {
      total_income: incomeTotal,
      total_outflow: outflowTotal,
      total_balance: incomeTotal - outflowTotal,
      wallet_amount: amount
    }
    return res
  }
}

module.exports = { WalletService }
