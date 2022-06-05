const { DataTypes, Sequelize, Model } = require('sequelize')
const { USER_TABLE } = require('./user.model')

const WALLET_TABLE = 'wallets'

const WalletSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class Wallet extends Model {
  static associate (models) {
    this.belongsTo(models.User, { as: 'user' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: WALLET_TABLE,
      modelName: 'Wallet',
      timestamps: false
    }
  }
}

module.exports = { WALLET_TABLE, WalletSchema, Wallet }
