const { UserSchema, User } = require('./user.model')
const { OperationSchema, Operation } = require('./operations.model')
const { CategorySchema, Category } = require('./category.model')
const { WalletSchema, Wallet } = require('./wallet.model')

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Operation.init(OperationSchema, Operation.config(sequelize))
  Wallet.init(WalletSchema, Wallet.config(sequelize))

  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Operation.associate(sequelize.models)
  Wallet.associate(sequelize.models)
}

module.exports = { setupModels }
