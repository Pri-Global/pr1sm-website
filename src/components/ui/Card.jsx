export default function Card({ children, dark = false, className = '' }) {
  return (
    <div className={`${dark ? 'card-dark' : 'card'} ${className}`}>
      {children}
    </div>
  )
}
