import type { DemoCountryBadgeToken } from '../../demo'

interface CountryFlagBadgeProps {
  badgeToken: DemoCountryBadgeToken
  primary: boolean
}

function VietnamFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#DA4336" height="18" rx="2.5" width="30" />
      <path
        d="M15 4.3L16.25 7.2H19.25L16.82 9L17.78 11.9L15 10.1L12.22 11.9L13.18 9L10.75 7.2H13.75L15 4.3Z"
        fill="#F4D35E"
      />
    </svg>
  )
}

function ChinaFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#E24B43" height="18" rx="2.5" width="30" />
      <path
        d="M8 3.2L8.8 5.15H10.85L9.2 6.35L9.85 8.3L8 7.1L6.15 8.3L6.8 6.35L5.15 5.15H7.2L8 3.2Z"
        fill="#F4D35E"
      />
      <circle cx="12.6" cy="3.8" fill="#F4D35E" r="0.9" />
      <circle cx="14.6" cy="5.9" fill="#F4D35E" r="0.8" />
      <circle cx="14.2" cy="8.7" fill="#F4D35E" r="0.8" />
      <circle cx="12" cy="10.6" fill="#F4D35E" r="0.75" />
    </svg>
  )
}

function SouthKoreaFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="white" height="18" rx="2.5" width="30" />
      <g transform="translate(15 9)">
        <path
          d="M0-3.6A3.6 3.6 0 0 1 3.6 0H0A1.8 1.8 0 0 0 0-3.6Z"
          fill="#E24B43"
        />
        <path
          d="M0 3.6A3.6 3.6 0 0 1-3.6 0H0A1.8 1.8 0 0 0 0 3.6Z"
          fill="#2563EB"
        />
        <path d="M0-3.6A3.6 3.6 0 0 0-3.6 0H0A1.8 1.8 0 0 1 0-3.6Z" fill="#2563EB" />
        <path d="M0 3.6A3.6 3.6 0 0 0 3.6 0H0A1.8 1.8 0 0 1 0 3.6Z" fill="#E24B43" />
      </g>
      <g fill="#1F2937">
        <rect height="1" rx="0.5" width="4" x="4.2" y="4" />
        <rect height="1" rx="0.5" width="4" x="4.7" y="5.6" />
        <rect height="1" rx="0.5" width="4" x="21.8" y="11.9" />
        <rect height="1" rx="0.5" width="4" x="21.3" y="13.5" />
      </g>
    </svg>
  )
}

function NicaraguaFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#2F74D0" height="18" rx="2.5" width="30" />
      <rect fill="white" height="8" width="30" x="0" y="5" />
      <circle cx="15" cy="9" fill="#9CC56B" r="1.2" />
    </svg>
  )
}

function IndiaFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#F28C3A" height="18" rx="2.5" width="30" />
      <rect fill="white" height="6" width="30" x="0" y="6" />
      <rect fill="#2F8B57" height="6" width="30" x="0" y="12" />
      <circle cx="15" cy="9" fill="none" r="1.8" stroke="#2F5FB3" strokeWidth="1" />
    </svg>
  )
}

function PortugalFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#E24B43" height="18" rx="2.5" width="30" />
      <path d="M2.5 0H12V18H2.5A2.5 2.5 0 0 1 0 15.5v-13A2.5 2.5 0 0 1 2.5 0Z" fill="#2F8B57" />
      <circle cx="12.5" cy="9" fill="none" r="2.2" stroke="#F4D35E" strokeWidth="1.2" />
    </svg>
  )
}

function FranceFlag() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[30px]" fill="none" viewBox="0 0 30 18">
      <rect fill="#F5F5F5" height="18" rx="2.5" width="30" />
      <path d="M2.5 0H10V18H2.5A2.5 2.5 0 0 1 0 15.5v-13A2.5 2.5 0 0 1 2.5 0Z" fill="#2848C5" />
      <path d="M20 0h7.5A2.5 2.5 0 0 1 30 2.5v13a2.5 2.5 0 0 1-2.5 2.5H20V0Z" fill="#E24B43" />
    </svg>
  )
}

export function CountryFlagBadge({
  badgeToken,
  primary,
}: CountryFlagBadgeProps) {
  const ringClassName = primary
    ? 'shadow-[0_0_0_2px_rgba(226,75,67,0.15)]'
    : 'shadow-[0_0_0_1px_rgba(24,38,58,0.06)]'

  const flag = {
    china: <ChinaFlag />,
    vietnam: <VietnamFlag />,
    'south-korea': <SouthKoreaFlag />,
    nicaragua: <NicaraguaFlag />,
    india: <IndiaFlag />,
    portugal: <PortugalFlag />,
    france: <FranceFlag />,
  }[badgeToken]

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[24px] w-[40px] items-center justify-center overflow-hidden rounded-[6px] bg-white ${ringClassName}`}
    >
      {flag}
    </span>
  )
}
