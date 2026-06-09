import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="text-center">
        <h1 className="font-heading font-extrabold text-6xl sm:text-8xl text-gradient">404</h1>
        <h2 className="font-heading font-bold text-2xl mt-4">Page Not Found</h2>
        <p className="mt-2 text-white/60">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button to="/" variant="primary" className="mt-8">Back to Home</Button>
      </div>
    </section>
  )
}
