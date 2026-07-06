import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

class Contract extends Model {}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contractNumber: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      field: 'contract_number',
    },
    customerName: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: 'customer_name',
    },
    email: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    productName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'product_name',
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'recebido',
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        min: 0,
        max: 100,
      },
    },
    currentStage: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'recebimento',
      field: 'current_stage',
    },
    nextStep: {
      type: DataTypes.STRING(160),
      allowNull: true,
      field: 'next_step',
    },
    accessUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'access_url',
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'started_at',
    },
  },
  {
    sequelize,
    modelName: 'Contract',
    tableName: 'contracts',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

export default Contract