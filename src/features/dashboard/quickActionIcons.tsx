import type { DemoQuickAction } from '../../demo'

interface QuickActionIconProps {
  iconKey: DemoQuickAction['iconKey']
  accent: boolean
}

const baseIconClassName = 'h-[18px] w-[18px] shrink-0'

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M4.5 6.5h15v11h-15z" />
      <path d="M4.5 10.5h15" />
      <path d="M8 15.5h3.5" />
    </svg>
  )
}

function TransferIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M5 8h12" />
      <path d="m13 4 4 4-4 4" />
      <path d="M19 16H7" />
      <path d="m11 12-4 4 4 4" />
    </svg>
  )
}

function CashIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <rect height="11" rx="2" width="15" x="4.5" y="6.5" />
      <path d="M12 10v4" />
      <path d="M10 12h4" />
    </svg>
  )
}

function BillIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M7 4.5h8l3 3v12H7z" />
      <path d="M15 4.5v3h3" />
      <path d="M9.5 12h6" />
      <path d="M9.5 15.5h6" />
    </svg>
  )
}

function SavingsIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M6.5 9.5h11v8h-11z" />
      <path d="M8.5 9.5V7a3.5 3.5 0 1 1 7 0v2.5" />
      <path d="M12 12.5v2" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <rect height="12" rx="2.5" width="15" x="4.5" y="6" />
      <path d="M4.5 10h15" />
      <path d="M8 14h3" />
    </svg>
  )
}

function ReportIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M7 18.5V10" />
      <path d="M12 18.5V6.5" />
      <path d="M17 18.5V13" />
      <path d="M5 18.5h14" />
    </svg>
  )
}

function ContactsIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M12 12.5A3 3 0 1 0 12 6.5A3 3 0 1 0 12 12.5z" />
      <path d="M6 18.5a6 6 0 0 1 12 0" />
    </svg>
  )
}

export function QuickActionIcon({ iconKey, accent }: QuickActionIconProps) {
  const baseToneClassName = {
    account:
      'border-[rgba(83,77,201,0.12)] bg-[rgba(83,77,201,0.1)] text-[#534dc9]',
    transfer:
      'border-[rgba(239,77,122,0.14)] bg-[rgba(239,77,122,0.1)] text-[#ef4d7a]',
    cash:
      'border-[rgba(91,151,255,0.14)] bg-[rgba(91,151,255,0.1)] text-[#5b97ff]',
    bill: 'border-[rgba(95,198,170,0.16)] bg-[rgba(95,198,170,0.1)] text-[#5fc6aa]',
    savings:
      'border-[rgba(96,95,214,0.14)] bg-[rgba(96,95,214,0.1)] text-[#605fd6]',
    card:
      'border-[rgba(245,147,67,0.16)] bg-[rgba(245,147,67,0.1)] text-[#f59343]',
    report:
      'border-[rgba(67,86,208,0.16)] bg-[rgba(67,86,208,0.1)] text-[#4356d0]',
    contacts:
      'border-[rgba(241,99,132,0.16)] bg-[rgba(241,99,132,0.1)] text-[#f16384]',
  }[iconKey]

  const toneClassName = accent
    ? `${baseToneClassName} shadow-[0_12px_24px_rgba(83,77,201,0.16)]`
    : baseToneClassName

  const icon = {
    account: <AccountIcon />,
    transfer: <TransferIcon />,
    cash: <CashIcon />,
    bill: <BillIcon />,
    savings: <SavingsIcon />,
    card: <CardIcon />,
    report: <ReportIcon />,
    contacts: <ContactsIcon />,
  }[iconKey]

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border ${toneClassName}`}
    >
      {icon}
    </span>
  )
}
