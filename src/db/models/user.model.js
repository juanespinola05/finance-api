const { Model, Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  }
}

class User extends Model {
  static associate (models) {
    this.hasMany(models.Operation, {
      as: 'operations',
      foreignKey: 'userId'
    })
    this.hasOne(models.Wallet, {
      as: 'wallet',
      foreignKey: 'userId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: USER_TABLE,
      timestamps: false,
      hooks: {
        beforeCreate: async (data) => {
          const password = await bcrypt.hash(data.password, 10)
          data.password = password
        }
      }
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
