export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`eyebrow-badge ${className}`}>
      <span className="eyebrow-dot" />
      {children}
    </p>
  )
}
