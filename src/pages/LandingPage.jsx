import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { label: "Find Jobs", to: "/jobs" },
  { label: "For Companies", to: "/for-companies" },
  { label: "About", to: "/about" },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")
  const role = localStorage.getItem("role")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
    window.location.reload()
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HireWave</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.to} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-gray-600 text-sm">Hi, {fullName}</span>
              
              {/* Mission: My Profile Link */}
              <Link
                to={role === "Company" ? "/companies/me" : "/candidates/me"}
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                My Profile
              </Link>

              <Link
                to={role === "Company" ? "/company/dashboard" : "/candidate/dashboard"}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              New jobs added daily
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Your Next
              <span className="text-blue-600 block">Dream Job</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Connect with top companies hiring right now. Your next opportunity is one application away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-center">
                Browse Jobs
              </Link>
              <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-center">
                Post a Job
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12">
              {[["500+", "Companies"], ["2,000+", "Jobs Posted"], ["10,000+", "Candidates"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-gray-900">{num}</p>
                  <p className="text-gray-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Senior .NET Developer</p>
                    <p className="text-gray-500 text-sm">NovaTech — Cairo, Egypt</p>
                  </div>
                  <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">Open</span>
                </div>
                <div className="flex gap-2 mb-6">
                  {["Full-time", "Remote", "$5k-$8k"].map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">{tag}</span>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Application Sent!</p>
                    <p className="text-gray-400 text-xs">Just now</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-blue-50">
                <p className="text-sm font-semibold text-gray-900">🎉 Interview Scheduled</p>
                <p className="text-xs text-gray-400 mt-1">Tomorrow at 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "Smart Job Matching",
      description: "Filter by location, salary, job type, and keywords to find exactly what you're looking for."
    },
    {
      icon: "⚡",
      title: "Apply in Seconds",
      description: "One-click applications with your profile. Track every application status in real time."
    },
    {
      icon: "🏢",
      title: "Top Companies",
      description: "Connect directly with hiring managers at companies that are actively looking for talent."
    },
    {
      icon: "📊",
      title: "Application Tracking",
      description: "Never lose track of where you applied. See Pending, Reviewed, Accepted, or Rejected at a glance."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is protected with JWT authentication and role-based access control."
    },
    {
      icon: "🌍",
      title: "Remote Friendly",
      description: "Find remote, hybrid, or on-site roles. Work from anywhere or find local opportunities."
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to
            <span className="text-blue-600"> land your next role</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            HireWave gives candidates and companies the tools to connect faster and smarter.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const candidateSteps = [
    { step: "01", title: "Create your profile", desc: "Sign up as a candidate in under a minute." },
    { step: "02", title: "Browse & filter jobs", desc: "Search by location, salary, type, or keyword." },
    { step: "03", title: "Apply with one click", desc: "Submit your cover letter and track your status." },
  ]

  const companySteps = [
    { step: "01", title: "Register your company", desc: "Create a company account in seconds." },
    { step: "02", title: "Post a job listing", desc: "Describe the role, salary range, and requirements." },
    { step: "03", title: "Review & hire", desc: "See all applicants and update their status instantly." },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-500 text-lg">Simple steps to get started — whether you're hiring or job hunting.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">👤</span>
              <h3 className="text-2xl font-bold text-gray-900">For Candidates</h3>
            </div>
            <div className="space-y-6">
              {candidateSteps.map((s) => (
                <div key={s.step} className="flex gap-5">
                  <span className="text-3xl font-bold text-blue-200 w-12 flex-shrink-0">{s.step}</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{s.title}</p>
                    <p className="text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/register" className="mt-8 block text-center bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Start Job Hunting
            </Link>
          </div>
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🏢</span>
              <h3 className="text-2xl font-bold text-gray-900">For Companies</h3>
            </div>
            <div className="space-y-6">
              {companySteps.map((s) => (
                <div key={s.step} className="flex gap-5">
                  <span className="text-3xl font-bold text-blue-200 w-12 flex-shrink-0">{s.step}</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{s.title}</p>
                    <p className="text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/register" className="mt-8 block text-center bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Start Hiring
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Your next opportunity is waiting
        </h2>
        <p className="text-blue-100 text-xl mb-10 leading-relaxed">
          Join thousands of candidates who found their dream job through HireWave. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/jobs" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Browse Jobs
          </Link>
          <Link to="/register" className="bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-blue-400 hover:bg-blue-400 transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-white font-bold text-lg">HireWave</span>
          </div>
          <p className="text-sm">© 2026 HireWave. Built with ASP.NET Core & React.</p>
         <div className="flex gap-6 text-sm">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
