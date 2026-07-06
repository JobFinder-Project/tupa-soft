const API_BASE_URL = '/api'
const STORAGE_KEY = 'tupaSoftContracts'

const CONTRACT_STAGES = ['recebimento', 'analise', 'proposta', 'negociacao', 'contrato', 'acesso', 'suporte']

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${path}: ${response.status}`)
  }

  return response.json()
}

function readStoredContracts() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredContracts(contracts) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts))
}

function centsToDisplayValue(cents) {
  return Number(cents || 0) / 100
}

function splitPaymentPlan(totalCents) {
  const firstInstallment = Math.round(totalCents * 0.3)
  const secondInstallment = Math.round(totalCents * 0.35)
  const thirdInstallment = totalCents - firstInstallment - secondInstallment
  const now = new Date()

  return [
    {
      id: 'entrada',
      installmentLabel: 'Entrada',
      amountCents: firstInstallment,
      status: 'paid',
      paidAt: now.toISOString(),
      dueDate: now.toISOString(),
      method: 'PIX',
      reference: 'GERADO-LOCAL-001',
    },
    {
      id: 'mensalidade-1',
      installmentLabel: '1ª mensalidade',
      amountCents: secondInstallment,
      status: 'pending',
      dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paidAt: null,
      method: null,
      reference: null,
    },
    {
      id: 'mensalidade-2',
      installmentLabel: '2ª mensalidade',
      amountCents: thirdInstallment,
      status: 'pending',
      dueDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      paidAt: null,
      method: null,
      reference: null,
    },
  ]
}

function normalizePayment(payment) {
  return {
    id: payment.id,
    installmentLabel: payment.installmentLabel,
    amountCents: Number(payment.amountCents ?? 0),
    status: payment.status,
    dueDate: payment.dueDate,
    paidAt: payment.paidAt,
    method: payment.method,
    reference: payment.reference,
  }
}

function normalizeContract(contract) {
  return {
    id: contract.id,
    contractNumber: contract.contractNumber,
    customerName: contract.customerName,
    email: contract.email,
    phone: contract.phone,
    productName: contract.productName,
    status: contract.status,
    progress: Number(contract.progress ?? 0),
    currentStage: contract.currentStage,
    nextStep: contract.nextStep,
    accessUrl: contract.accessUrl,
    startedAt: contract.startedAt,
    createdAt: contract.createdAt,
    updatedAt: contract.updatedAt,
    payments: Array.isArray(contract.payments) ? contract.payments.map(normalizePayment) : [],
    source: contract.source ?? 'backend',
  }
}

function buildContractFromInquiry(inquiryResponse, product) {
  const inquiry = inquiryResponse?.data ?? inquiryResponse
  const contractNumber = `TS-${new Date().getFullYear()}-${String(inquiry.id ?? Date.now()).padStart(4, '0')}`
  const totalCents = Math.round(Number(product.price ?? 0) * 100)

  return {
    id: inquiry.id,
    contractNumber,
    customerName: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone ?? null,
    productName: product.name,
    status: 'recebido',
    progress: 12,
    currentStage: 'recebimento',
    nextStep: 'Nossa equipe comercial vai analisar o escopo e retornar com a proposta.',
    accessUrl: '',
    startedAt: inquiry.created_at ?? new Date().toISOString(),
    createdAt: inquiry.created_at ?? new Date().toISOString(),
    updatedAt: inquiry.created_at ?? new Date().toISOString(),
    payments: splitPaymentPlan(totalCents),
    source: inquiry.source ?? 'site',
  }
}

function upsertStoredContract(contract) {
  const contracts = readStoredContracts()
  const nextContracts = [contract, ...contracts.filter((current) => current.contractNumber !== contract.contractNumber)]

  writeStoredContracts(nextContracts)
}

function mergeContracts(primaryContracts, fallbackContracts) {
  const map = new Map()

  for (const contract of fallbackContracts) {
    if (contract?.contractNumber) {
      map.set(contract.contractNumber, contract)
    }
  }

  for (const contract of primaryContracts) {
    if (contract?.contractNumber) {
      map.set(contract.contractNumber, contract)
    }
  }

  return [...map.values()].sort((left, right) => new Date(right.startedAt || 0) - new Date(left.startedAt || 0))
}

export function getLocalContracts() {
  return readStoredContracts().map(normalizeContract)
}

export function storeInquiryContract(inquiryResponse, product) {
  const contract = buildContractFromInquiry(inquiryResponse, product)
  upsertStoredContract(contract)
  return normalizeContract(contract)
}

export function getStageIndex(stage) {
  const index = CONTRACT_STAGES.indexOf(stage)
  return index >= 0 ? index : 0
}

export function getContractStages() {
  return CONTRACT_STAGES.slice()
}

export async function getDashboardContracts(email) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()

  const remoteContracts = normalizedEmail
    ? await fetchJson(`/contracts?email=${encodeURIComponent(normalizedEmail)}`)
        .then((response) => (response.data ?? []).map(normalizeContract))
        .catch(() => [])
    : []

  const localContracts = getLocalContracts().filter((contract) => contract.email?.toLowerCase() === normalizedEmail)

  return mergeContracts(remoteContracts, localContracts)
}

export function formatCents(value) {
  return centsToDisplayValue(value)
}