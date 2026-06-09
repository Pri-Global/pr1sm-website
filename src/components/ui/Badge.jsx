export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'badge-blue',
    blue: 'badge-blue',
    purple: 'badge-purple',
    gold: 'badge-gold',
    teal: 'badge-teal',
  }

  return <span className={`${variants[variant] || variants.default} ${className}`}>{children}</span>
}
