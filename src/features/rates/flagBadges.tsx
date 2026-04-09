import type { DemoCountryBadgeToken } from '../../demo'

interface CountryFlagBadgeProps {
  badgeToken: DemoCountryBadgeToken
  primary: boolean
}

const flagSvgClassName = 'h-full w-full'
const flagImageClassName = 'block h-full w-full object-fill'

function VietnamFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect fill="white" height="29" rx="2" width="46" />
      <mask
        height="29"
        id="flag-vietnam-mask"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="46"
        x="0"
        y="0"
      >
        <rect fill="white" height="29" rx="2" width="46" />
      </mask>
      <g mask="url(#flag-vietnam-mask)">
        <rect fill="#EA403F" height="29" width="46" />
        <path
          clipRule="evenodd"
          d="M23 17.893L17.2061 21.5385L19.3439 15.5485L13.6253 11.8116L20.7404 11.755L23 5.80001L25.2596 11.755L32.3747 11.8116L26.6561 15.5485L28.7939 21.5385L23 17.893Z"
          fill="#FFFE4E"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}

function NicaraguaFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect
        fill="white"
        height="28.5"
        rx="1.75"
        stroke="#F5F5F5"
        strokeWidth="0.5"
        width="45.5"
        x="0.25"
        y="0.25"
      />
      <mask
        height="29"
        id="flag-nicaragua-mask"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="46"
        x="0"
        y="0"
      >
        <rect
          fill="white"
          height="28.5"
          rx="1.75"
          stroke="white"
          strokeWidth="0.5"
          width="45.5"
          x="0.25"
          y="0.25"
        />
      </mask>
      <g mask="url(#flag-nicaragua-mask)">
        <path clipRule="evenodd" d="M0 9.66667H46V0H0V9.66667Z" fill="#1A78D6" fillRule="evenodd" />
        <path clipRule="evenodd" d="M0 29H46V19.3333H0V29Z" fill="#1A78D6" fillRule="evenodd" />
        <path
          d="M23.0004 11.267C24.9586 11.2672 26.6186 12.6769 26.6186 14.5004C26.6183 16.3237 24.9585 17.7336 23.0004 17.7338C21.0421 17.7338 19.3815 16.3238 19.3813 14.5004C19.3813 12.6768 21.042 11.267 23.0004 11.267Z"
          stroke="#DBCD92"
          strokeWidth="0.666667"
        />
        <path
          clipRule="evenodd"
          d="M23 12.5667L25.1905 16.4334H20.8095L23 12.5667Z"
          fill="#9CDDEE"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}

function SouthKoreaFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect
        fill="white"
        height="28.5"
        rx="1.75"
        stroke="#F5F5F5"
        strokeWidth="0.5"
        width="45.5"
        x="0.25"
        y="0.25"
      />
      <mask
        height="29"
        id="flag-south-korea-mask"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="46"
        x="0"
        y="0"
      >
        <rect
          fill="white"
          height="28.5"
          rx="1.75"
          stroke="white"
          strokeWidth="0.5"
          width="45.5"
          x="0.25"
          y="0.25"
        />
      </mask>
      <g mask="url(#flag-south-korea-mask)">
        <path
          clipRule="evenodd"
          d="M23 21.2666C27.2342 21.2666 30.6667 18.2371 30.6667 14.5C30.6667 10.7628 27.2342 7.73331 23 7.73331C18.7658 7.73331 15.3333 10.7628 15.3333 14.5C15.3333 18.2371 18.7658 21.2666 23 21.2666Z"
          fill="#E01B41"
          fillRule="evenodd"
        />
        <mask
          height="15"
          id="flag-south-korea-inner-mask"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
          width="16"
          x="15"
          y="7"
        >
          <path
            clipRule="evenodd"
            d="M23 21.2666C27.2342 21.2666 30.6667 18.2371 30.6667 14.5C30.6667 10.7628 27.2342 7.73331 23 7.73331C18.7658 7.73331 15.3333 10.7628 15.3333 14.5C15.3333 18.2371 18.7658 21.2666 23 21.2666Z"
            fill="white"
            fillRule="evenodd"
          />
        </mask>
        <g mask="url(#flag-south-korea-inner-mask)">
          <path
            clipRule="evenodd"
            d="M15.3333 15.4666C17.5238 17.2791 20.8095 18.3666 23 15.4666C25.1905 12.5666 29.5714 12.5666 30.6667 15.4666C31.7619 18.3666 30.6667 21.2666 30.6667 21.2666H15.3333C15.3333 21.2666 13.1429 13.6541 15.3333 15.4666Z"
            fill="#0E4B9C"
            fillRule="evenodd"
          />
        </g>
        <path
          d="M8.72956 18.4231C8.89358 18.3395 9.10828 18.397 9.20905 18.551L12.1299 23.0159C12.2307 23.1699 12.1796 23.3629 12.0157 23.4465L10.712 24.1106C10.548 24.1939 10.3332 24.1366 10.2325 23.9827L7.31159 19.5178C7.21082 19.3637 7.2628 19.1707 7.42682 19.0871L8.72956 18.4231ZM36.7911 18.551C36.8919 18.397 37.1065 18.3395 37.2706 18.4231L38.5733 19.0871C38.7373 19.1707 38.7883 19.3637 38.6876 19.5178L35.7676 23.9827C35.667 24.1365 35.4521 24.1938 35.2882 24.1106L33.9844 23.4465C33.8205 23.3629 33.7694 23.1699 33.8702 23.0159L36.7911 18.551ZM11.5753 16.9729C11.7393 16.8895 11.954 16.9468 12.0548 17.1008L14.9757 21.5657C15.0764 21.7197 15.0244 21.9127 14.8604 21.9963L13.5577 22.6604C13.3937 22.7438 13.1789 22.6865 13.0782 22.5325L10.1573 18.0676C10.0566 17.9136 10.1085 17.7205 10.2725 17.6369L11.5753 16.9729ZM33.9454 17.1008C34.0461 16.9468 34.2609 16.8894 34.4249 16.9729L35.7276 17.6369C35.8916 17.7205 35.9435 17.9136 35.8428 18.0676L32.9219 22.5325C32.8212 22.6864 32.6064 22.7438 32.4424 22.6604L31.1387 21.9963C30.9749 21.9127 30.9238 21.7196 31.0245 21.5657L33.9454 17.1008ZM13.0782 6.468C13.179 6.31396 13.3937 6.25652 13.5577 6.34007L14.8604 7.00414C15.0243 7.08765 15.0761 7.27983 14.9757 7.43382L12.0548 11.8996C11.9539 12.0535 11.7392 12.1101 11.5753 12.0266L10.2725 11.3625C10.1086 11.279 10.0568 11.0869 10.1573 10.9328L13.0782 6.468ZM32.4424 6.34007C32.6065 6.2566 32.8212 6.31399 32.9219 6.468L35.8428 10.9328C35.9433 11.0868 35.8915 11.279 35.7276 11.3625L34.4249 12.0266C34.2609 12.1101 34.0462 12.0535 33.9454 11.8996L31.0245 7.43382C30.9241 7.27996 30.9752 7.08778 31.1387 7.00414L32.4424 6.34007ZM10.2325 5.01781C10.3332 4.86383 10.548 4.80649 10.712 4.88988L12.0157 5.55394C12.1795 5.63761 12.2307 5.83065 12.1299 5.98461L9.20905 10.4494C9.10823 10.6034 8.89353 10.66 8.72956 10.5764L7.42682 9.91332C7.2629 9.82978 7.21106 9.63667 7.31159 9.48265L10.2325 5.01781ZM35.2882 4.88988C35.4521 4.80657 35.6669 4.86386 35.7676 5.01781L38.6876 9.48265C38.7883 9.63671 38.7373 9.82973 38.5733 9.91332L37.2706 10.5764C37.1066 10.6599 36.8919 10.6034 36.7911 10.4494L33.8702 5.98461C33.7695 5.83061 33.8206 5.63758 33.9844 5.55394L35.2882 4.88988Z"
          fill="#262626"
          opacity="0.75"
        />
      </g>
    </svg>
  )
}

function IndiaFlag() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={flagImageClassName}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAYAAAAxU7r0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABE6ADAAQAAAABAAAAtwAAAABKmt8RAAAZs0lEQVR4Ae2dCXRVRZ7G/0kgYZFdcUHZJNgIqOhMs4iggukOQgsiq0p0VHDAE6e7QcWWVZxRQFszwFFW9wSUlh4CtNHWNjIE7RGQtSERw6K2sgUUQkLCm/qqUi/3LQF6KMfcx1fnkHvfvVX/qvrduh+137jAgy0DQkcCJEACZ0kg/izDMzgJkAAJaAIUExYEEiABJwQoJk4w0ggJkADFhGWABEjACQGKiROMNEICJEAxYRkgARJwQoBi4gQjjZAACVBMWAZIgAScEKCYOMFIIyRAAhQTlgESIAEnBCgmTjDSCAmQAMWEZYAESMAJAYqJE4w0QgIkQDFhGSABEnBCgGLiBCONkAAJUExYBkiABJwQoJg4wUgjJEACFBOWARIgAScEKCZOMNIICZAAxYRlgARIwAkBiokTjDRCAiRAMWEZIAEScEKAYuIEI42QAAlQTFgGSIAEnBCgmDjBSCMkQAIUE5YBEiABJwQoJk4w0ggJkADFhGWABEjACQGKiROMNEICJEAxYRkgARJwQoBi4gQjjZAACVBMWAZIgAScEKCYOMFIIyRAAhQTlgESIAEnBCgmTjDSCAmQAMWEZYAESMAJAYqJE4w0QgIkQDFhGSABEnBCgGLiBCONkAAJUExYBkiABJwQoJg4wUgjJEACFBOWARIgAScEKCZOMNIICZAAxYRlgARIwAkBiokTjDRCAiRAMWEZIAEScEKAYuIEI42QAAlQTFgGSIAEnBCgmDjBSCMkQAIUE5YBEiABJwQoJk4w0ggJkADFhGWABEjACQGKiROMNEICJEAxYRkgARJwQoBi4gQjjZAACVBMWAZIgAScEKCYOMFIIyRAAhQTlgESIAEnBCgmTjDSCAmQAMWEZYAESMAJAYqJE4w0QgIkQDFhGSABEnBCgGLiBCONkAAJUExYBkiABJwQoJg4wUgjJEACFBOWARIgAScEKCZOMNIICZAAxYRlgARIwAkBiokTjDRCAiRAMWEZIAEScEKAYuIEI42QAAlQTFgGSIAEnBCgmDjBSCMkQAIUE5YBEiABJwQoJk4w0ggJkADFhGWABEjACQGKiROMNEICJEAxYRkgARJwQuB/AS3OxJFQ9FxKAAAAAElFTkSuQmCC"
    />
  )
}

function ChinaFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect fill="white" height="29" rx="2" width="46" />
      <mask
        height="29"
        id="flag-china-mask"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="46"
        x="0"
        y="0"
      >
        <rect fill="white" height="29" rx="2" width="46" />
      </mask>
      <g mask="url(#flag-china-mask)">
        <rect fill="#F1361D" height="29" width="46" />
        <path
          d="M19.6661 16.1509L20.5528 17.3413L18.9395 17.3579L17.5909 18.1401L17.5714 16.7163L16.6846 15.5259L18.2989 15.5093L19.6475 14.7261L19.6661 16.1509ZM22.0948 11.6147L23.6993 11.4575L22.9835 12.7349L23.1612 14.1499L21.7149 13.519L20.1104 13.6753L20.8262 12.3989L20.6485 10.9829L22.0948 11.6147ZM22.963 7.48291L23.8018 8.69971L22.1886 8.66748L20.8096 9.40771L20.8468 7.98389L20.0079 6.76709L21.6212 6.79932L23.0001 6.05908L22.963 7.48291ZM19.0987 2.99756L20.6905 3.23682L19.6036 4.29053L19.3321 5.69482L18.1387 4.73584L16.5479 4.49561L17.6348 3.44287L17.9063 2.03857L19.0987 2.99756Z"
          fill="#FFDC42"
        />
        <path
          clipRule="evenodd"
          d="M10.9524 11.9287L7.08978 14.359L8.51494 10.3657L4.70256 7.87442L9.44595 7.83672L10.9524 3.86671L12.4588 7.83672L17.2022 7.87442L13.3898 10.3657L14.815 14.359L10.9524 11.9287Z"
          fill="#FFDC42"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}

function PortugalFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect fill="#FF2936" height="29" width="46" />
    </svg>
  )
}

function FranceFlag() {
  return (
    <svg aria-hidden="true" className={flagSvgClassName} fill="none" viewBox="0 0 46 29">
      <rect
        fill="white"
        height="28.5"
        rx="1.75"
        stroke="#F5F5F5"
        strokeWidth="0.5"
        width="45.5"
        x="0.25"
        y="0.25"
      />
      <mask
        height="29"
        id="flag-france-mask"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="46"
        x="0"
        y="0"
      >
        <rect
          fill="white"
          height="28.5"
          rx="1.75"
          stroke="white"
          strokeWidth="0.5"
          width="45.5"
          x="0.25"
          y="0.25"
        />
      </mask>
      <g mask="url(#flag-france-mask)">
        <rect fill="#F44653" height="29" width="15.3333" x="30.6667" />
        <path clipRule="evenodd" d="M0 29H15.3333V0H0V29Z" fill="#1035BB" fillRule="evenodd" />
      </g>
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
    vietnam: <VietnamFlag />,
    nicaragua: <NicaraguaFlag />,
    'south-korea': <SouthKoreaFlag />,
    india: <IndiaFlag />,
    china: <ChinaFlag />,
    portugal: <PortugalFlag />,
    france: <FranceFlag />,
  }[badgeToken]

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[26px] w-[42px] items-center justify-center overflow-hidden rounded-[4px] bg-white ${ringClassName}`}
    >
      {flag}
    </span>
  )
}
