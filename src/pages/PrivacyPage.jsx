import { Link } from "react-router-dom"

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: May 2026</p>

        {[
          {
            title: "Information we collect",
            content: "When you register on HireWave, we collect your name, email address, and role-specific information such as skills, bio, or company details. We use this information solely to provide you with the HireWave service."
          },
          {
            title: "How we use your information",
            content: "Your information is used to create and manage your account, display your profile to relevant parties (e.g. companies viewing candidate applications), and improve the HireWave platform. We do not sell your data to third parties."
          },
          {
            title: "Authentication & security",
            content: "HireWave uses JWT-based authentication with role-based access control. Your password is never stored in plain text — it is hashed using industry-standard algorithms. Access to your data is strictly controlled by your role."
          },
          {
            title: "Data retention",
            content: "Your data is retained for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us."
          },
          {
            title: "Contact",
            content: "If you have any questions about this privacy policy or how we handle your data, please contact us at privacy@hirewave.io."
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