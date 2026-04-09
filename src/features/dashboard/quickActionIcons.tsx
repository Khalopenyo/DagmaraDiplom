import type { DemoQuickAction } from '../../demo'

interface QuickActionIconProps {
  iconKey: DemoQuickAction['iconKey']
  accent: boolean
  bare?: boolean
}

const baseIconClassName = 'h-[28px] w-[30px] shrink-0'
const accountIconClassName = 'h-[42px] w-[46px] shrink-0'
const reportIconClassName = 'h-[28px] w-[25px] shrink-0'

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
      viewBox="0 0 30 28"
    >
      <g clipPath="url(#transfer-icon-clip)">
        <path
          d="M22.05 6.93V8.085H24.5V6.93C24.5 3.1081 21.2035 0 17.15 0H15.925V2.31H17.15C19.8524 2.31 22.05 4.38207 22.05 6.93Z"
          fill="#FF4267"
        />
        <path
          d="M7.34999 20.79V19.635H4.89999V20.79C4.89999 24.6119 8.19647 27.72 12.25 27.72H13.475V25.41H12.25C9.54764 25.41 7.34999 23.3379 7.34999 20.79Z"
          fill="#FF4267"
        />
        <path
          d="M11.025 0H2.45C1.09637 0 0 1.03372 0 2.31V15.015C0 16.2913 1.09637 17.325 2.45 17.325H11.025C12.3786 17.325 13.475 16.2913 13.475 15.015V2.31C13.475 1.03372 12.3786 0 11.025 0ZM11.025 13.86H2.45V3.465H11.025V13.86Z"
          fill="#FF4267"
        />
        <path
          d="M26.95 10.395H18.375C17.0214 10.395 15.925 11.4287 15.925 12.705V25.41C15.925 26.6863 17.0214 27.72 18.375 27.72H26.95C28.3036 27.72 29.4 26.6863 29.4 25.41V12.705C29.4 11.4287 28.3036 10.395 26.95 10.395ZM26.95 24.255H18.375V13.86H26.95V24.255Z"
          fill="#FF4267"
        />
      </g>
      <defs>
        <clipPath id="transfer-icon-clip">
          <rect fill="white" height="27.72" width="29.4" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CashIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      viewBox="0 0 31 28"
    >
      <path
        d="M13.86 27.72H22.68C24.0723 27.72 25.2 26.6863 25.2 25.41V4.62H13.86V27.72ZM20.16 16.17V23.1H17.64V16.17H20.16Z"
        fill="#0890FE"
      />
      <path
        d="M5.04126 4.62V25.41C5.04126 26.6863 6.16896 27.72 7.56126 27.72H11.34V4.62H5.04126Z"
        fill="#0890FE"
      />
      <path
        d="M30.24 8.085H27.72V2.31H2.52V8.085H0V1.155C0 0.516285 0.56448 0 1.26 0H28.98C29.6755 0 30.24 0.516285 30.24 1.155V8.085Z"
        fill="#0890FE"
      />
    </svg>
  )
}

function BillIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      viewBox="0 0 30 28"
    >
      <g clipPath="url(#bill-icon-clip)">
        <path
          d="M25.725 0H3.675C2.9988 0 2.45 0.516285 2.45 1.155V27.72L7.35 24.255L11.025 27.72L14.7 24.255L18.375 27.72L22.05 24.255L26.95 27.72V1.155C26.95 0.516285 26.4012 0 25.725 0ZM15.925 18.48H7.35V16.17H15.925V18.48ZM15.925 13.86H7.35V11.55H15.925V13.86ZM15.925 9.24H7.35V6.93H15.925V9.24ZM22.05 18.48H18.375V16.17H22.05V18.48ZM22.05 13.86H18.375V11.55H22.05V13.86ZM22.05 9.24H18.375V6.93H22.05V9.24Z"
          fill="#52D5BA"
        />
      </g>
      <defs>
        <clipPath id="bill-icon-clip">
          <rect fill="white" height="27.72" width="29.4" />
        </clipPath>
      </defs>
    </svg>
  )
}

function SavingsIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      viewBox="0 0 31 28"
    >
      <g clipPath="url(#savings-icon-clip)">
        <path
          d="M20.79 8.08499H10.8574C9.50796 5.97596 7.23114 5.6491 6.12108 5.78654L4.68468 5.97481L5.97996 10.0508C5.0085 10.7819 4.20714 11.6805 3.61872 12.705H0V20.79H3.61116C5.13954 23.45 8.0577 25.1709 11.34 25.3707V27.72H13.86V25.41H18.9V27.72H21.42V25.3811C26.3365 25.082 30.24 21.3294 30.24 16.7475C30.24 11.9704 26.0014 8.08499 20.79 8.08499ZM21.42 15.015H12.6V12.705H21.42V15.015Z"
          fill="#5655B9"
        />
        <path
          d="M17.01 5.775C18.7497 5.775 20.16 4.48222 20.16 2.8875C20.16 1.29278 18.7497 0 17.01 0C15.2703 0 13.86 1.29278 13.86 2.8875C13.86 4.48222 15.2703 5.775 17.01 5.775Z"
          fill="#5655B9"
        />
      </g>
      <defs>
        <clipPath id="savings-icon-clip">
          <rect fill="white" height="27.72" width="30.24" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CardIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      viewBox="0 0 31 28"
    >
      <g clipPath="url(#card-icon-clip)">
        <path
          d="M30.24 9.33218V4.66668C30.24 3.37751 29.1123 2.33334 27.72 2.33334H2.52C1.1277 2.33334 0 3.37751 0 4.66668V9.33218H30.24V9.33218Z"
          fill="#FB6B18"
        />
        <path
          d="M0 12.8333V23.3333C0 24.6225 1.1277 25.6667 2.52 25.6667H27.72C29.1123 25.6667 30.24 24.6225 30.24 23.3333V12.8333H0ZM13.86 19.8333H5.04V17.5H13.86V19.8333ZM25.2 19.8333H20.16V17.5H25.2V19.8333Z"
          fill="#FB6B18"
        />
      </g>
      <defs>
        <clipPath id="card-icon-clip">
          <rect fill="white" height="28" width="30.24" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ReportIcon() {
  return (
    <svg
      aria-hidden="true"
      className={reportIconClassName}
      fill="none"
      viewBox="0 0 25 28"
    >
      <path
        d="M0 1.16667V26.8333C0 27.1428 0.129062 27.4395 0.358794 27.6583C0.588526 27.8771 0.90011 28 1.225 28H23.275C23.5999 28 23.9115 27.8771 24.1412 27.6583C24.3709 27.4395 24.5 27.1428 24.5 26.8333V1.16667C24.5 0.857247 24.3709 0.560501 24.1412 0.341709C23.9115 0.122916 23.5999 0 23.275 0L1.225 0C0.90011 0 0.588526 0.122916 0.358794 0.341709C0.129062 0.560501 0 0.857247 0 1.16667V1.16667ZM3.675 5.83333H11.025V12.8333H3.675V5.83333ZM20.825 22.1667H3.675V19.8333H20.825V22.1667ZM20.825 17.5H3.675V15.1667H20.825V17.5ZM20.825 12.8333H13.475V10.5H20.825V12.8333ZM20.825 8.16667H13.475V5.83333H20.825V8.16667Z"
        fill="#3629B7"
      />
    </svg>
  )
}

function ContactsIcon() {
  return (
    <svg
      aria-hidden="true"
      className={baseIconClassName}
      fill="none"
      viewBox="0 0 31 28"
    >
      <g clipPath="url(#contacts-icon-clip)">
        <path d="M30.24 4.66666H26.46V10.5H30.24V4.66666Z" fill="#FF4267" />
        <path d="M30.24 12.8333H26.46V18.6667H30.24V12.8333Z" fill="#FF4267" />
        <path
          d="M21.42 0H1.26V28H21.42C23.504 28 25.2 26.4297 25.2 24.5V3.5C25.2 1.57033 23.504 0 21.42 0ZM13.23 7C14.9701 7 16.38 8.3055 16.38 9.91667C16.38 11.5278 14.9701 12.8333 13.23 12.8333C11.4899 12.8333 10.08 11.5278 10.08 9.91667C10.08 8.3055 11.4899 7 13.23 7ZM18.9 19.8333H7.56V17.9422C7.56 16.9027 8.2971 15.9938 9.3744 15.6998C10.3761 15.4257 11.7218 15.1667 13.23 15.1667C14.7382 15.1667 16.0839 15.4257 17.0856 15.6998C18.1629 15.9938 18.9 16.9027 18.9 17.9422V19.8333Z"
          fill="#FF4267"
        />
      </g>
      <defs>
        <clipPath id="contacts-icon-clip">
          <rect fill="white" height="28" width="30.24" />
        </clipPath>
      </defs>
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
