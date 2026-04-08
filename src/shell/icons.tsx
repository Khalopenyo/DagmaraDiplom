import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      {...props}
    />
  )
}

export function DashboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4.5 5.5h6v6h-6z" />
      <path d="M13.5 5.5h6v4h-6z" />
      <path d="M13.5 12.5h6v6h-6z" />
      <path d="M4.5 14.5h6v4h-6z" />
    </BaseIcon>
  )
}

export function TransfersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 8h12" />
      <path d="m13 4 4 4-4 4" />
      <path d="M19 16H7" />
      <path d="m11 12-4 4 4 4" />
    </BaseIcon>
  )
}

export function RatesIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 18V9" />
      <path d="M12 18V6" />
      <path d="M18 18v-4" />
      <path d="M4.5 18.5h15" />
    </BaseIcon>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5z" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7.1 7.1 0 0 0-2-.9L14.2 3h-4.4l-.4 2.9c-.7.2-1.4.5-2 .9l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.4 1.3.7 2 .9l.4 2.9h4.4l.4-2.9c.7-.2 1.4-.5 2-.9l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
    </BaseIcon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M10.5 5.5A5 5 0 1 0 10.5 15.5A5 5 0 1 0 10.5 5.5z" />
      <path d="m14 14 4.5 4.5" />
    </BaseIcon>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 18.5h8" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
      <path d="M18 16.5H6l1.2-1.8V10a4.8 4.8 0 1 1 9.6 0v4.7L18 16.5Z" />
    </BaseIcon>
  )
}
