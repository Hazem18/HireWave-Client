import { Link } from "react-router-dom"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HireWave</span>
          </Link>
          <Link to="/" className="text-blue-600 font-medium hover:text-blue-700">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: May 2026</p>

        {[
          {
            title: "Acceptance of terms",
            content: "By using HireWave, you agree to these terms of service. If you do not agree, please do not use the platform."
          },
          {
            title: "User accounts",
            content: "You are responsible for maintaining the security of your account. You must not share your credentials with others. HireWave reserves the right to terminate accounts that violate these terms."
          },
          {
            title: "Company responsibilities",
            content: "Companies posting jobs on HireWave are responsible for the accuracy of their job listings. Misleading or fraudulent listings will result in immediate account suspension."
          },
          {
            title: "Candidate responsibilities",
            content: "Candidates are responsible for the accuracy of their profile information. Submitting false information in applications may result in account termination."
          },
          {
            title: "Intellectual property",
            content: "All content on HireWave, including the platform design, code, and branding, is the property of HireWave. You may not reproduce or redistribute any part of the platform without permission."
          },
          {
            title: "Limitation of liability",
            content: "HireWave is provided as-is. We are not responsible for the outcome of any hiring decisions made through the platform. We do not guarantee employment for any candidate."
          },
          {
            title: "Contact",
            content: "For questions about these terms, contact us at legal@hirewave.io."
          },
        ].map(section => (
          <div key={section.title} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-500 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2026 HireWave. Built with ASP.NET Core & React.</p>
        </div>
      </footer>
    </div>
  )
}