import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Navbar() {
  const navigate = useNavigate()
  const role = localStorage.getItem("role")
  const fullName = localStorage.getItem("fullName")
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
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
              <Link
                to={role === "Company" ? "/company/dashboard" : "/candidate/dashboard"}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 font-medium hover:text-blue-600">Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function JobCard({ job }) {
  const navigate = useNavigate()
  
  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {job.companyName?.charAt(0) || "C"}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-500 text-sm">{job.companyName}</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          {job.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">
          {job.jobType}
        </span>
        <span className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
          📍 {job.location}
        </span>
        <span className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
          💰 ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-xs">
          {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <span className="text-blue-600 text-sm font-semibold group-hover:underline">
          View Details →
        </span>
      </div>
    </div>
  )
}

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    keyword: "", location: "", jobType: "", minSalary: "", maxSalary: ""
  })

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.keyword) params.keyword = filters.keyword
      if (filters.location) params.location = filters.location
      if (filters.jobType) params.jobType = filters.jobType
      if (filters.minSalary) params.minSalary = filters.minSalary
      if (filters.maxSalary) params.maxSalary = filters.maxSalary

      const res = await axios.get(`${API_URL}/jobs`, { params })
      setJobs(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Next Job</h1>
          <p className="text-blue-100 mb-8">Browse {jobs.length} open positions</p>

          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 flex flex-wrap gap-3">
            <input
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Job title or keyword..."
              className="flex-1 min-w-48 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <input
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location..."
              className="w-40 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="w-40 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">All Types</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
            <input
              name="minSalary"
              value={filters.minSalary}
              onChange={handleFilterChange}
              placeholder="Min salary"
              type="number"
              className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <input
              name="maxSalary"
              value={filters.maxSalary}
              onChange={handleFilterChange}
              placeholder="Max salary"
              type="number"
              className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  )
}