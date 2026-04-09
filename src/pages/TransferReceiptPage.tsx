import { Link, Navigate } from 'react-router'

import { loadTransferReceipt } from '../features/transfers/transferReceiptStorage'

function ReceiptRow({
  label,
  value,
  emphasized = false,
}: {
  label: string
  value: string
  emphasized?: boolean
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <dt className="text-[15px] font-medium text-[rgba(73,78,101,0.72)]">
        {label}
      </dt>
      <dd
        className={`text-right text-[15px] font-semibold ${
          emphasized
            ? 'text-[var(--color-text-strong)]'
            : 'text-[rgba(24,38,58,0.82)]'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

function ReceiptAmountRow({
  label,
  value,
  accentClassName,
}: {
  label: string
  value: string
  accentClassName: string
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <dt className="text-[17px] font-semibold text-[rgba(73,78,101,0.74)]">
        {label}
      </dt>
      <dd className={`text-right text-[30px] font-semibold leading-none ${accentClassName}`}>
        {value}
      </dd>
    </div>
  )
}

export function TransferReceiptPage() {
  const receipt = loadTransferReceipt()

  if (!receipt) {
    return <Navigate replace to="/transfers" />
  }

  return (
    <section className="mx-auto flex w-full max-w-[760px] flex-col gap-5 pb-6">
      <div className="flex items-center gap-3">
        <Link
          aria-label="Назад к переводам"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none text-[var(--color-text-strong)] transition-colors duration-150 hover:bg-[rgba(66,54,198,0.08)]"
          to="/transfers"
        >
          <span aria-hidden="true">‹</span>
        </Link>

        <h1 className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-[var(--color-text-strong)]">
          Электронный чек
        </h1>
      </div>

      <section className="rounded-[28px] border border-[rgba(24,38,58,0.06)] bg-white px-5 py-6 shadow-[0_22px_46px_rgba(24,38,58,0.06)] sm:px-6">
        <dl className="flex flex-col gap-4">
          <ReceiptRow emphasized label="Отправитель" value={receipt.senderName} />
          <ReceiptRow emphasized label="Получатель" value={receipt.recipientName} />

          <div className="my-1 border-t border-dashed border-[rgba(24,38,58,0.12)]" />

          <ReceiptRow label={receipt.contactLabel} value={receipt.contactValue} />
          <ReceiptRow label="Код транзакции" value={receipt.transactionCode} />
          <ReceiptRow
            label="Дата формирования перевода"
            value={receipt.transferCreatedDate}
          />
          <ReceiptRow
            label="Дата начисления средств получателю"
            value={receipt.recipientSettlementDate}
          />

          <div className="my-1 border-t border-dashed border-[rgba(24,38,58,0.12)]" />

          <ReceiptAmountRow
            accentClassName="text-[#3E38C7]"
            label="Всего"
            value={receipt.debitAmountDisplay}
          />

          <div className="my-1 border-t border-dashed border-[rgba(24,38,58,0.12)]" />

          <ReceiptAmountRow
            accentClassName="text-[#3E38C7]"
            label="Комиссия"
            value={receipt.feeAmountDisplay}
          />

          <div className="my-1 border-t border-dashed border-[rgba(24,38,58,0.12)]" />

          <ReceiptAmountRow
            accentClassName="text-[#FF5A72]"
            label="Итого"
            value={receipt.totalAmountDisplay}
          />
        </dl>
      </section>
    </section>
  )
}
