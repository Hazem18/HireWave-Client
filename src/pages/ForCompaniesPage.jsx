import { Link } from "react-router-dom"

function Navbar() {
  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")
  const role = localStorage.getItem("role")

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900">HireWave</span>
        </Link>
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-gray-600 text-sm">Hi, {fullName}</span>
              <Link to={role === "Company" ? "/company/dashboard" : "/candidate/dashboard"} className="text-blue-600 font-medium hover:text-blue-700">Dashboard</Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 font-medium text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function ForCompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🏢 For Companies
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Hire faster.<br />Hire smarter.
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Post jobs, review applications, and manage your entire hiring pipeline from one clean dashboard. No complexity. No noise.
          </p>
          <Link to="/register" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors shadow-xl">
            Start Hiring Free
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How it works for companies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "📝", title: "Create your account", desc: "Register as a company in under 2 minutes. No credit card required." },
              { step: "02", icon: "📢", title: "Post a job listing", desc: "Describe the role, set the salary range, location, and job type." },
              { step: "03", icon: "✅", title: "Review & hire", desc: "See all applicants in your dashboard. Update status with one click." },
            ].map(item => (
              <div key={item.step} className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <span className="text-sm font-bold text-blue-600 mb-2 block">Step {item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Everything you need to hire</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🎯", title: "Targeted listings", desc: "Reach candidates searching for exactly what you offer — filtered by location, job type, and salary." },
              { icon: "📊", title: "Application dashboard", desc: "All your applicants in one place. No spreadsheets, no email threads." },
              { icon: "🔄", title: "Status tracking", desc: "Move candidates through Pending → Reviewed → Accepted → Rejected with one click." },
              { icon: "🔒", title: "Secure & private", desc: "Only your company can see applications to your listings. Role-based access control built in." },
              { icon: "⚡", title: "Instant posting", desc: "Your job goes live immediately after posting. Start receiving applications right away." },
              { icon: "🌍", title: "Remote & local", desc: "Post remote, hybrid, or on-site roles. Reach candidates anywhere in Egypt and beyond." },
            ].map(f => (
              <div key={f.title} className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to find your next hire?</h2>
          <p className="text-blue-100 text-lg mb-8">Join hundreds of companies already hiring on HireWave.</p>
          <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Create Company Account
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2026 HireWave. Built with ASP.NET Core & React.</p>
        </div>
      </footer>
    </div>
  )
}