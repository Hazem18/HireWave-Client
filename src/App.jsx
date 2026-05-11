import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import CandidateDashboard from './pages/CandidateDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import AboutPage from './pages/AboutPage'
import ForCompaniesPage from './pages/ForCompaniesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'
import CandidateProfilePage from './pages/CandidateProfilePage'
import CompanyProfilePage from './pages/Companyprofilepage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/for-companies" element={<ForCompaniesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/candidates/:id" element={<CandidateProfilePage />} />
        <Route path="/candidates/me" element={<CandidateProfilePage />} />
        <Route path="/companies/:id" element={<CompanyProfilePage />} />
        <Route path="/companies/me" element={<CompanyProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App