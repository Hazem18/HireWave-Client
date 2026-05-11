import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Navbar() {
  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")
  const role = localStorage.getItem("role")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
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

export default function CandidateProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const myId = localStorage.getItem("userId")
  const isOwnProfile = !id || id === myId

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = isOwnProfile
          ? `${API_URL}/candidates/me`
          : `${API_URL}/candidates/${id}`
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(res.data)
      } catch {
        navigate("/")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!profile) return null

  const skills = profile.skills ? profile.skills.split(",").map(s => s.trim()).filter(Boolean) : []
  const initials = profile.fullName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors">
          ← Go back
        </button>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4">

            {/* Avatar Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-white font-bold text-3xl">{initials}</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">{profile.fullName}</h1>
              <p className="text-gray-500 text-sm mb-4">{profile.email}</p>
              {isOwnProfile && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                  ✓ Your Profile
                </span>
              )}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 font-medium">Member since</p>
                <p className="text-gray-700 font-semibold text-sm mt-1">{memberSince}</p>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white text-center shadow-sm">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">✅</span>
              </div>
              <p className="font-bold text-lg">Open to Work</p>
              <p className="text-green-100 text-sm mt-1">Actively looking for opportunities</p>
            </div>

            {/* Resume Card */}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all group block"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm">View Resume</p>
                  <p className="text-blue-500 text-xs truncate">{profile.resumeUrl}</p>
                </div>
                <span className="ml-auto text-blue-500 text-sm font-bold flex-shrink-0">→</span>
              </a>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-4">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Skills", value: skills.length || 0, icon: "🎯" },
                { label: "Year Joined", value: new Date(profile.createdAt).getFullYear(), icon: "📅" },
                { label: "Profile", value: "Public", icon: "🌐" },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                  <p className="text-2xl mb-2">{stat.icon}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                  About
                </h2>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                Contact
              </h2>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email address</p>
                  <p className="text-gray-900 font-semibold">{profile.email}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}