import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import { requestForm } from '../data/team'

export default function Request() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', jobTitle: '', company: '',
    industry: '', companySize: '', existingTools: '',
    primaryGoal: '', currentChallenges: [],
    timeline: '', budget: '', howDidYouHear: '', additionalInfo: '',
  })

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))
  const toggleChallenge = (c) => setForm((f) => ({
    ...f,
    currentChallenges: f.currentChallenges.includes(c)
      ? f.currentChallenges.filter((x) => x !== c)
      : [...f.currentChallenges, c],
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="card max-w-md w-full text-center py-12">
          <h1 className="font-heading font-bold text-2xl">Thank You!</h1>
          <p className="mt-4 text-white/50">
            We&apos;ve received your request. Our team will review your information and reach out within 1-2 business days.
          </p>
          <Button to="/" variant="primary" className="mt-8">Back to Home</Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero title={requestForm.heading} subtitle={requestForm.subheading} />
      <section className="section-alt section-padding">
        <div className="container-wide max-w-2xl mx-auto">
          <div className="flex gap-2 mb-8">
            {requestForm.steps.map((label, i) => (
              <div
                key={label}
                className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-blue' : 'bg-white/10'}`}
                title={label}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="card space-y-4">
            {step === 0 && (
              <>
                <Field label="Full Name" required>
                  <input className="form-input" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="John Smith" />
                </Field>
                <Field label="Work Email" required>
                  <input type="email" className="form-input" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="john@company.com" />
                </Field>
                <Field label="Phone Number" required>
                  <input className="form-input" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
                </Field>
                <Field label="Job Title">
                  <input className="form-input" value={form.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} placeholder="Director of Operations" />
                </Field>
                <Field label="Company Name" required>
                  <input className="form-input" required value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Acme Corporation" />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <Field label="Industry" required>
                  <select className="form-input" required value={form.industry} onChange={(e) => update('industry', e.target.value)}>
                    <option value="">Select your industry</option>
                    {requestForm.industries.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Company Size">
                  <select className="form-input" value={form.companySize} onChange={(e) => update('companySize', e.target.value)}>
                    <option value="">Select company size</option>
                    {requestForm.companySizes.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="What tools do you currently use? (CRM, ERP, etc.)">
                  <input className="form-input" value={form.existingTools} onChange={(e) => update('existingTools', e.target.value)} placeholder="e.g., Salesforce, QuickBooks, Monday.com" />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label="What is your primary goal with PR1SM?" required>
                  <select className="form-input" required value={form.primaryGoal} onChange={(e) => update('primaryGoal', e.target.value)}>
                    <option value="">Select your primary goal</option>
                    {requestForm.primaryGoals.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="What challenges are you currently facing?">
                  <div className="space-y-2 mt-2">
                    {requestForm.challenges.map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
                        <input type="checkbox" checked={form.currentChallenges.includes(c)} onChange={() => toggleChallenge(c)} />
                        {c}
                      </label>
                    ))}
                  </div>
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label="Implementation Timeline">
                  <select className="form-input" value={form.timeline} onChange={(e) => update('timeline', e.target.value)}>
                    <option value="">When do you need this?</option>
                    {requestForm.timelines.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Estimated Budget Range">
                  <select className="form-input" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                    <option value="">Select budget range</option>
                    {requestForm.budgets.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="How did you hear about PR1SM?">
                  <select className="form-input" value={form.howDidYouHear} onChange={(e) => update('howDidYouHear', e.target.value)}>
                    <option value="">Select an option</option>
                    {requestForm.hearAbout.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Anything else you'd like us to know?">
                  <textarea className="form-input resize-none" rows={4} value={form.additionalInfo} onChange={(e) => update('additionalInfo', e.target.value)} placeholder="Tell us about your specific use case..." />
                </Field>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-secondary flex-1">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={() => setStep((s) => s + 1)} className="btn-primary flex-1">
                  Next Step
                </button>
              ) : (
                <button type="submit" className="btn-primary flex-1">Submit Request</button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-1.5">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}
