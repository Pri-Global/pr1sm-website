import { forwardRef } from 'react'

function svgProps({ color = 'currentColor', size = 24, strokeWidth = 1.75, className, ...rest }, ref) {
  return {
    ref,
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    ...rest,
  }
}

export const ConstructionIcon = forwardRef(function ConstructionIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M4 15h16" />
      <path d="M6 15V11.5a6 6 0 0 1 12 0V15" />
      <path d="M12 8.5V5" />
      <path d="M9 15v2.5" />
      <path d="M15 15v2.5" />
      <path d="M3 17.5h18" />
    </svg>
  )
})
ConstructionIcon.displayName = 'Construction'

export const ManufacturingIcon = forwardRef(function ManufacturingIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M3 20h18" />
      <path d="M6 20V10l4-3v13" />
      <path d="M10 20V7l4-3v16" />
      <path d="M14 20V10l4 3v7" />
      <path d="M18 8V5l2 1v14" />
      <circle cx="17" cy="6" r="2" />
    </svg>
  )
})
ManufacturingIcon.displayName = 'Manufacturing'

export const RealEstateIcon = forwardRef(function RealEstateIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M3 20h18" />
      <path d="M5 20V9l7-5 7 5v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M12 4v3" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M16.5 8.5h2" />
      <path d="M17.5 7.5v2" />
    </svg>
  )
})
RealEstateIcon.displayName = 'RealEstate'

export const FinancialServicesIcon = forwardRef(function FinancialServicesIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M3 20V10" />
      <path d="M7 20V14" />
      <path d="M11 20V8" />
      <path d="M15 20V12" />
      <path d="M19 20V6" />
      <path d="M3 20h16" />
      <path d="M16 4h4v4" />
      <path d="M20 4l-5 5" />
    </svg>
  )
})
FinancialServicesIcon.displayName = 'FinancialServices'

export const HealthcareIcon = forwardRef(function HealthcareIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M12 20c4-2.5 6-5.5 6-9a6 6 0 0 0-12 0c0 3.5 2 6.5 6 9Z" />
      <path d="M12 11v4" />
      <path d="M10 13h4" />
      <path d="M3 13h2" />
      <path d="M19 13h2" />
    </svg>
  )
})
HealthcareIcon.displayName = 'Healthcare'

export const GovernmentIcon = forwardRef(function GovernmentIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <path d="M3 20h18" />
      <path d="M5 20V10h3v10" />
      <path d="M9.5 20V10h3v10" />
      <path d="M14 20V10h3v10" />
      <path d="M4 10h16" />
      <path d="M12 3l8 5H4l8-5Z" />
      <path d="M12 3v2" />
    </svg>
  )
})
GovernmentIcon.displayName = 'Government'

export const AnyBusinessIcon = forwardRef(function AnyBusinessIcon(props, ref) {
  return (
    <svg {...svgProps(props, ref)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
})
AnyBusinessIcon.displayName = 'AnyBusiness'

export const industryIconMap = {
  Construction: ConstructionIcon,
  Manufacturing: ManufacturingIcon,
  RealEstate: RealEstateIcon,
  FinancialServices: FinancialServicesIcon,
  Healthcare: HealthcareIcon,
  Government: GovernmentIcon,
  AnyBusiness: AnyBusinessIcon,
}
