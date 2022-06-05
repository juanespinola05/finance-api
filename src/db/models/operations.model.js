const { Sequelize, Model, DataTypes } = require('sequelize')
const { CATEGORY_TABLE } = require('./category.model')
const { USER_TABLE } = require('./user.model')

const OPERATIONS_TABLE = 'operations'

const OperationSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  concept: {
    allowNull: false,
    type: DataTypes.STRING
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
    isIn: [['income', 'outflow']]
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
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
}

class Operation extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
      as: 'user'
    })
    this.belongsTo(models.Category, {
      as: 'category'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: OPERATIONS_TABLE,
      modelName: 'Operation',
      timestamps: false
    }
  }
}

module.exports = { OPERATIONS_TABLE, OperationSchema, Operation }
