const { DataTypes, Sequelize, Model } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Category extends Model {
  static associate (models) {
    this.hasMany(models.Operation, {
      as: 'operations',
      foreignKey: 'categoryId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      modelName: 'Category',
      tableName: CATEGORY_TABLE,
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }
