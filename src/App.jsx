import { Component } from 'react'
import { BrowserRouter, useLocation, useRoutes, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import SEO from './components/SEO'
import SiteBackground from './components/animations/SiteBackground'
import PrismCursor from './components/ui/PrismCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CookieConsent from './components/ui/CookieConsent'
import PageWrapper from './components/animations/PageWrapper'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import OurPlatform from './pages/OurPlatform'
import ResultsThatMatter from './pages/ResultsThatMatter'
import SecurityAndTrust from './pages/SecurityAndTrust'
import UseCases from './pages/UseCases'
import UseByRole from './pages/UseByRole'
import UseByOutcome from './pages/UseByOutcome'
import Leadership from './pages/Leadership'
import Testimonials from './pages/Testimonials'
import Request from './pages/Request'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-navy text-white flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="font-heading font-bold text-2xl mb-3">Something went wrong</h1>
            <p className="text-white/60 text-sm mb-6">{this.state.error.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/how-it-works', element: <HowItWorks /> },
  { path: '/our-platform', element: <OurPlatform /> },
  { path: '/results-that-matter', element: <ResultsThatMatter /> },
  { path: '/security-and-trust', element: <SecurityAndTrust /> },
  { path: '/use-cases', element: <UseCases /> },
  { path: '/use-by-role', element: <UseByRole /> },
  { path: '/use-by-outcome', element: <UseByOutcome /> },
  { path: '/leadership', element: <Leadership /> },
  { path: '/testimonials', element: <Testimonials /> },
  { path: '/request', element: <Request /> },
  { path: '/legal', element: <LegalPage type="legal" /> },
  { path: '/privacy', element: <LegalPage type="privacy" /> },
  { path: '/cookies', element: <LegalPage type="cookies" /> },
  { path: '/impressum', element: <Navigate to="/legal" replace /> },
  { path: '/datenschutz', element: <Navigate to="/privacy" replace /> },
  { path: '/platform', element: <Navigate to="/our-platform" replace /> },
  { path: '/solutions', element: <Navigate to="/use-cases" replace /> },
  { path: '/industries', element: <Navigate to="/use-cases" replace /> },
  { path: '/resources', element: <Navigate to="/about" replace /> },
  { path: '/contact', element: <Navigate to="/request" replace /> },
  { path: '*', element: <NotFound /> },
]

function AnimatedRoutes() {
  const location = useLocation()
  const element = useRoutes(routes, location)

  return (
    <AnimatePresence mode="wait">
      <PageWrapper key={location.pathname}>
        {element}
      </PageWrapper>
    </AnimatePresence>
  )
}

function Layout() {
  return (
    <ErrorBoundary>
      <SiteBackground />
      <PrismCursor />
      <SEO />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10" id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
      <CookieConsent />
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
