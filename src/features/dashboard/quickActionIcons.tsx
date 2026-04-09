import type { DemoQuickAction } from '../../demo'

interface QuickActionIconProps {
  iconKey: DemoQuickAction['iconKey']
  accent: boolean
  bare?: boolean
}

const baseIconClassName = 'h-[18px] w-[18px] shrink-0'
const accountIconClassName = 'h-[42px] w-[46px] shrink-0'

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      className={accountIconClassName}
      fill="none"
      viewBox="0 0 31 28"
    >
      <g clipPath="url(#account-card-body)">
        <path
          d="M28.98 4.62H5.04H3.78C3.08574 4.62 2.52 4.1014 2.52 3.465C2.52 2.82859 3.08574 2.31 3.78 2.31H22.68V3.465H25.2V1.155C25.2 0.51744 24.6355 0 23.94 0H3.78C1.69218 0 0 1.55117 0 3.465V23.1C0 25.6514 2.25666 27.72 5.04 27.72H28.98C29.6755 27.72 30.24 27.2026 30.24 26.565V5.775C30.24 5.13744 29.6755 4.62 28.98 4.62ZM22.68 18.48C21.2877 18.48 20.16 17.4463 20.16 16.17C20.16 14.8937 21.2877 13.86 22.68 13.86C24.0723 13.86 25.2 14.8937 25.2 16.17C25.2 17.4463 24.0723 18.48 22.68 18.48Z"
          fill="#3629B7"
        />
      </g>
      <defs>
        <clipPath id="account-card-body">
          <rect fill="white" height="27.72" width="30.24" />
        </clipPath>
      </defs>
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

export function QuickActionIcon({
  iconKey,
  accent,
  bare = false,
}: QuickActionIconProps) {
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

  if (bare) {
    return (
      <span aria-hidden="true" className="inline-flex items-center justify-center">
        {icon}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border ${toneClassName}`}
    >
      {icon}
    </span>
  )
}
