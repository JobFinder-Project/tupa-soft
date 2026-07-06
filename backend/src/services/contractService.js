import { Contract, ContractPayment } from '../models/index.js'

function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

function mapContract(contract) {
  const data = contract.toJSON()

  return {
    id: data.id,
    contractNumber: data.contractNumber,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,
    productName: data.productName,
    status: data.status,
    progress: Number(data.progress ?? 0),
    currentStage: data.currentStage,
    nextStep: data.nextStep,
    accessUrl: data.accessUrl,
    startedAt: data.startedAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    payments: Array.isArray(data.payments)
      ? data.payments.map((payment) => ({
          id: payment.id,
          installmentLabel: payment.installmentLabel,
          amountCents: Number(payment.amountCents ?? 0),
          status: payment.status,
          dueDate: payment.dueDate,
          paidAt: payment.paidAt,
          method: payment.method,
          reference: payment.reference,
        }))
      : [],
  }
}

export async function listContractsByEmail(email) {
  const normalizedEmail = normalizeEmail(email)

  const contracts = await Contract.findAll({
    where: {
      email: normalizedEmail,
    },
    include: [
      {
        model: ContractPayment,
        as: 'payments',
      },
    ],
    order: [
      ['startedAt', 'DESC'],
      [{ model: ContractPayment, as: 'payments' }, 'dueDate', 'ASC'],
    ],
  })

  return contracts.map(mapContract)
}