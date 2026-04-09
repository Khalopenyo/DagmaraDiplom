import type { DemoTransferReceipt } from '../../demo'

const TRANSFER_RECEIPT_STORAGE_KEY = 'dagmara.transfer-receipt'

export function saveTransferReceipt(receipt: DemoTransferReceipt) {
  window.sessionStorage.setItem(
    TRANSFER_RECEIPT_STORAGE_KEY,
    JSON.stringify(receipt),
  )
}

export function loadTransferReceipt() {
  const rawValue = window.sessionStorage.getItem(TRANSFER_RECEIPT_STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as DemoTransferReceipt
  } catch {
    return null
  }
}

export function clearTransferReceipt() {
  window.sessionStorage.removeItem(TRANSFER_RECEIPT_STORAGE_KEY)
}
