'use strict'

const { WALLET_TABLE } = require('../models/wallet.model')
const { USER_TABLE } = require('../models/user.model')
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(WALLET_TABLE, {
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
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(WALLET_TABLE)
  }
}
