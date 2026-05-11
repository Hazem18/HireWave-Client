import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export default function JobDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [userProfile, setUserProfile] = useState(null) // Added for AI context
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [error, setError] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false) // Added for button state
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Job
        const jobRes = await axios.get(`${API_URL}/jobs/${id}`)
        setJob(jobRes.data)

        // Fetch User Profile (Safely, so page doesn't crash if it fails)
        if (token && role === "Candidate") {
          try {
            const profileRes = await axios.get(`${API_URL}/profile`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            setUserProfile(profileRes.data)
          } catch (pErr) {
            console.error("Profile not loaded", pErr)
          }
        }
      } catch {
        navigate("/jobs")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, token, role, navigate])

  // New function to call your AIController/cover-letter endpoint
  const handleGenerateAI = async () => {
    setGeneratingAI(true)
    setError("")
    try {
      const res = await axios.post(
        `${API_URL}/ai/cover-letter`,
        { 
          jobTitle: job.title, 
          jobDescription: job.description,
          candidateSkills: userProfile?.skills || "", 
          candidateBio: userProfile?.bio || ""
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCoverLetter(res.data.coverLetter)
    } catch (err) {
      setError("AI generation failed. Please check your connection.")
    } finally {
      setGeneratingAI(false)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    if (!token) { navigate("/login"); return }
    setApplying(true)
    setError("")
    try {
      await axios.post(
        `${API_URL}/jobapplications/${id}`,
        { coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setApplied(true)
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to apply. You may have already applied.")
    } finally {
      setApplying(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!job) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HireWave</span>
          </Link>
          <Link to="/jobs" className="text-blue-600 font-medium hover:text-blue-700">
            ← Back to Jobs
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Job Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {job.companyName?.charAt(0) || "C"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <Link to={`/companies/${job.companyId}`} className="text-gray-500 font-medium hover:text-blue-600">
                  {job.companyName}
                </Link>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 font-semibold px-4 py-1.5 rounded-full text-sm">
              {job.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-xl text-sm">
              {job.jobType}
            </span>
            <span className="bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded-xl text-sm">
              📍 {job.location}
            </span>
            <span className="bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded-xl text-sm">
              💰 ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
            </span>
            <span className="bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded-xl text-sm">
              📅 Posted {new Date(job.postedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded-xl text-sm">
              👥 {job.applicationCount} applicant{job.applicationCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Apply Button */}
          {role === "Candidate" && (
            <>
              {applied ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl font-semibold text-center">
                  ✅ Application submitted successfully!
                </div>
              ) : showForm ? (
                <form onSubmit={handleApply} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Cover Letter
                      </label>
                      {/* NEW AI GENERATE BUTTON */}
                      <button
                        type="button"
                        onClick={handleGenerateAI}
                        disabled={generatingAI}
                        className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-60"
                      >
                        {generatingAI ? "Drafting..." : "✨ Generate with AI"}
                      </button>
                    </div>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell the company why you're the right fit..."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={applying}
                      className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                    >
                      {applying ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Apply Now
                </button>
              )}
            </>
          )}

          {!token && (
            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md text-center"
            >
              Sign in to Apply
            </Link>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>
    </div>
  )
}