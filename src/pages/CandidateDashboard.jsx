import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
}

export default function CandidateDashboard() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")

  useEffect(() => {
    if (!token) { navigate("/login"); return }
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobapplications/mine`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setApplications(res.data)
      } catch {
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "Pending").length,
    reviewed: applications.filter(a => a.status === "Reviewed").length,
    accepted: applications.filter(a => a.status === "Accepted").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Candidate Navbar */}
<nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-10">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-3 transition-all">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <span className="text-xl font-extrabold text-gray-900 tracking-tight">HireWave</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/jobs" className="text-blue-600 font-bold text-sm hover:underline decoration-2 underline-offset-4">
          Browse Jobs
        </Link>
        <Link to="/candidates/me" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors">
          My Profile
        </Link>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-bold text-gray-700">{fullName}</span>
      </div>
      <button 
        onClick={handleLogout} 
        className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors px-2"
      >
        Logout
      </button>
    </div>
  </div>
</nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">My Dashboard</h1>
          <p className="text-gray-500">Track all your job applications in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Applied", value: stats.total, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
            { label: "Pending", value: stats.pending, color: "bg-yellow-50 text-yellow-600", border: "border-yellow-100" },
            { label: "Reviewed", value: stats.reviewed, color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" },
            { label: "Accepted", value: stats.accepted, color: "bg-green-50 text-green-600", border: "border-green-100" },
          ].map(stat => (
            <div key={stat.label} className={`bg-white rounded-2xl border ${stat.border} p-6`}>
              <p className={`text-3xl font-bold mb-1 ${stat.color.split(" ")[1]}`}>{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              + Browse More Jobs
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📋</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500 mb-6">Start applying to jobs and track them here</p>
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {applications.map(app => (
                <div key={app.id} className="px-8 py-5 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">
                        {app.companyName?.charAt(0) || "C"}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{app.jobTitle}</p>
                      <p className="text-gray-500 text-sm">{app.companyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-400 text-sm hidden md:block">
                      Applied {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${STATUS_COLORS[app.status] || "bg-gray-100 text-gray-600"}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}