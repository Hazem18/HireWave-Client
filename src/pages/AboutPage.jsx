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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About HireWave</h1>
          <p className="text-blue-100 text-xl leading-relaxed">
            We're on a mission to make hiring human again — connecting great companies with talented people through a platform built on transparency, speed, and simplicity.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why we built HireWave</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Job hunting is stressful. You apply to dozens of positions and hear nothing back. Companies spend weeks reviewing hundreds of applications manually. Both sides lose time, energy, and hope.
              </p>
              <p className="text-gray-500 leading-relaxed">
                HireWave was built to fix that. A clean, fast platform where candidates can track every application in real time, and companies can find the right people without the noise.
              </p>
            </div>
            <div className="bg-blue-50 rounded-3xl p-8">
              <div className="space-y-6">
                {[
                  { icon: "🎯", title: "Focused", desc: "No distractions. Just jobs that match what you're looking for." },
                  { icon: "⚡", title: "Fast", desc: "Apply in seconds. Companies respond faster." },
                  { icon: "💙", title: "Human", desc: "Real status updates. No black holes." },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">HireWave by the numbers</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              ["500+", "Companies hiring"],
              ["2,000+", "Jobs posted"],
              ["10,000+", "Candidates placed"],
            ].map(([num, label]) => (
              <div key={label} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <p className="text-4xl font-bold text-blue-600 mb-2">{num}</p>
                <p className="text-gray-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with modern technology</h2>
          <p className="text-gray-500 mb-12">HireWave is built on a production-grade stack designed for performance and scalability.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "ASP.NET Core 9", desc: "Backend API" },
              { name: "Clean Architecture", desc: "4-layer structure" },
              { name: "ASP.NET Identity", desc: "Authentication" },
              { name: "EF Core", desc: "Data access" },
              { name: "JWT", desc: "Secure tokens" },
              { name: "React", desc: "Frontend" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "SQL Server", desc: "Database" },
            ].map(tech => (
              <div key={tech.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <p className="font-bold text-gray-900 text-sm">{tech.name}</p>
                <p className="text-gray-400 text-xs mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-blue-100 text-lg mb-8">Join HireWave today — it's free for candidates.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Create Account
            </Link>
            <Link to="/jobs" className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold border-2 border-blue-400 hover:bg-blue-400 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2026 HireWave. Built with ASP.NET Core & React.</p>
        </div>
      </footer>
    </div>
  )
}