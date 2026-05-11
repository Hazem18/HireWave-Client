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

export default function CompanyDashboard() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState("")
  const [toast, setToast] = useState({ show: false, message: "", type: "error" })
  const [closeConfirmId, setCloseConfirmId] = useState(null)
  const [matchScores, setMatchScores] = useState({})

  const token = localStorage.getItem("token")
  const fullName = localStorage.getItem("fullName")

  const [form, setForm] = useState({
    title: "", description: "", location: "",
    salaryMin: "", salaryMax: "", jobType: "FullTime"
  })

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000)
  }

  useEffect(() => {
    if (!token) { navigate("/login"); return }
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJobs(res.data)
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login")
      } else {
        showToast(err.response?.data?.error || "Failed to load jobs")
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async (jobId) => {
    try {
      const res = await axios.get(`${API_URL}/jobapplications/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplications(res.data)
      setSelectedJob(jobId)
      generateMatchScores(jobId, res.data)
    } catch (err) {
      showToast(err.response?.data?.error || "Could not load applications")
    }
  }

 const generateMatchScores = async (jobId, apps) => {
  const job = jobs.find(j => j.id === jobId)
  if (!job || apps.length === 0) return

  for (const app of apps) {
    setMatchScores(prev => ({
      ...prev,
      [app.id]: { loading: true, score: null, reason: null }
    }))

    try {
      const res = await axios.post(`${API_URL}/ai/match-score`, {
        jobTitle: job.title,
        jobDescription: job.description || job.title,
        candidateName: app.candidateName,
        coverLetter: app.coverLetter || ""
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Use ?. to handle potential casing differences from .NET (Score vs score)
      const score = res.data.score ?? res.data.Score;
      const reason = res.data.reason ?? res.data.Reason;

      setMatchScores(prev => ({
        ...prev,
        [app.id]: { loading: false, score: score, reason: reason }
      }))
    } catch (err) {
      console.error("AI Match Error for app " + app.id, err.response?.data || err.message);
      setMatchScores(prev => ({
        ...prev,
        [app.id]: { loading: false, score: null, reason: "Error: Could not calculate score." }
      }))
    }
  }
}

  const updateStatus = async (appId, status) => {
    try {
      await axios.patch(
        `${API_URL}/jobapplications/${appId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setApplications(prev =>
        prev.map(a => a.id === appId ? { ...a, status } : a)
      )
      showToast("Status updated successfully", "success")
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to update status")
    }
  }

  const handleCloseJob = async (e, jobId) => {
    e.stopPropagation()
    if (closeConfirmId !== jobId) {
      setCloseConfirmId(jobId)
      showToast("Click again to confirm closing this job", "error")
      setTimeout(() => setCloseConfirmId(null), 4000)
      return
    }
    try {
      await axios.patch(`${API_URL}/jobs/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showToast("Job closed successfully", "success")
      setCloseConfirmId(null)
      fetchJobs()
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to close job")
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    setPosting(true)
    setPostError("")
    try {
      await axios.post(`${API_URL}/jobs`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setShowPostForm(false)
      setForm({ title: "", description: "", location: "", salaryMin: "", salaryMax: "", jobType: "FullTime" })
      fetchJobs()
      showToast("Job posted successfully!", "success")
    } catch (err) {
      setPostError(err.response?.data?.error || "Failed to post job")
    } finally {
      setPosting(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl font-semibold text-white transition-all ${
          toast.type === "error" ? "bg-red-500" : "bg-green-500"
        }`}>
          {toast.type === "error" ? "❌ " : "✅ "}{toast.message}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-all">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">HireWave</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/companies/me" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors">
                My Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-1">Company Account</p>
              <p className="text-sm font-semibold text-gray-900">{fullName}</p>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Company Dashboard</h1>
            <p className="text-gray-500">Manage your job listings and applications</p>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            {showPostForm ? "Cancel" : "+ Post a Job"}
          </button>
        </div>

        {/* Post Job Form */}
        {showPostForm && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Post a New Job</h2>
            {postError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                {postError}
              </div>
            )}
            <form onSubmit={handlePost} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior .NET Developer" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the role, requirements, and responsibilities..." required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Cairo, Egypt or Remote" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white">
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Salary ($)</label>
                <input type="number" value={form.salaryMin} onChange={e => setForm({ ...form, salaryMin: e.target.value })} placeholder="5000" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Salary ($)</label>
                <input type="number" value={form.salaryMax} onChange={e => setForm({ ...form, salaryMax: e.target.value })} placeholder="10000" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
              <div className="col-span-2">
                <button type="submit" disabled={posting} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
                  {posting ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job Listings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Job Listings</h2>
              <p className="text-gray-500 text-sm mt-1">Click a job to see its applications</p>
            </div>
            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-gray-500">No jobs posted yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {jobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => fetchApplications(job.id)}
                    className={`px-8 py-5 cursor-pointer hover:bg-blue-50 transition-colors ${selectedJob === job.id ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{job.title}</p>
                        <p className="text-gray-500 text-sm mb-2">{job.location} · {job.jobType}</p>
                        {job.status === "Open" && (
                          <button
                            onClick={(e) => handleCloseJob(e, job.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${closeConfirmId === job.id ? "bg-orange-500 text-white border-orange-500 animate-pulse" : "text-gray-500 border-gray-200 hover:bg-gray-100"}`}
                          >
                            {closeConfirmId === job.id ? "Confirm?" : "Close Listing"}
                          </button>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {job.status}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">{job.applicationCount} applicants</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Applications Panel */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Applications</h2>
              <p className="text-gray-500 text-sm mt-1">
                {selectedJob ? `${applications.length} application(s)` : "Select a job to see applications"}
              </p>
            </div>
            {!selectedJob ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">👈</p>
                <p className="text-gray-500">Select a job listing</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-500">No applications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {applications.map(app => (
                  <div key={app.id} className="px-8 py-5">

                    {/* Name + Status */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link to={`/candidates/${app.candidateId}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {app.candidateName}
                        </Link>
                        <p className="text-gray-500 text-sm">
                          Applied {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[app.status] || "bg-gray-100 text-gray-600"}`}>
                        {app.status}
                      </span>
                    </div>

                    {/* AI Match Score */}
                    {matchScores[app.id] && (
                      <div className="mb-3">
                        {matchScores[app.id].loading ? (
                          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3">
                            <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            ✨ AI is analyzing this candidate...
                          </div>
                        ) : matchScores[app.id].score !== null ? (
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                            <div className={`text-2xl font-black w-14 text-center flex-shrink-0 ${
                              matchScores[app.id].score >= 75 ? "text-green-600" :
                              matchScores[app.id].score >= 50 ? "text-yellow-600" :
                              "text-red-500"
                            }`}>
                              {matchScores[app.id].score}%
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">AI Match Score</p>
                                <span className="text-xs">✨</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{matchScores[app.id].reason}</p>
                              <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    matchScores[app.id].score >= 75 ? "bg-green-500" :
                                    matchScores[app.id].score >= 50 ? "bg-yellow-500" :
                                    "bg-red-400"
                                  }`}
                                  style={{ width: `${matchScores[app.id].score}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Cover Letter */}
                    {app.coverLetter && (
                      <div className="mb-3 bg-gray-50 rounded-xl px-4 py-3 border-l-4 border-blue-200">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Letter</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{app.coverLetter}</p>
                      </div>
                    )}

                    {/* Status Buttons */}
                    <div className="flex gap-2">
                      {["Reviewed", "Accepted", "Rejected"].map(status => (
                        <button
                          key={status}
                          onClick={() => updateStatus(app.id, status)}
                          disabled={app.status === status}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                            ${status === "Accepted" ? "bg-green-100 text-green-700 hover:bg-green-200" :
                              status === "Rejected" ? "bg-red-100 text-red-700 hover:bg-red-200" :
                              "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}