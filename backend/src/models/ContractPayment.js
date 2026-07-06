import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/sequelize.js'

class ContractPayment extends Model {}

ContractPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'contract_id',
    },
    installmentLabel: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: 'installment_label',
    },
    amountCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount_cents',
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pending',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_date',
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'paid_at',
    },
    method: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ContractPayment',
    tableName: 'contract_payments',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
)

export default ContractPayment