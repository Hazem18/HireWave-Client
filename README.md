# HireWave — Frontend

The React frontend for HireWave, a full-stack job board platform connecting companies with candidates.

🔗 **Live Demo:** [hirewave-client.vercel.app](https://hire-wave-client-zwag-dgpdvib31-hazem-emad-s-projects.vercel.app/)
🔗 **Backend API:** [hirewave.somee.com](http://hirewave.somee.com/swagger/index.html)
🔗 **Backend Repo:** [github.com/Hazem18/JobBoardAPI](https://github.com/Hazem18/JobBoardAPI)

---

## Features

- 🏠 **Landing page** — hero section, features, how it works, CTA
- 🔐 **Authentication** — register as company or candidate, login with JWT
- 💼 **Browse Jobs** — filter by location, salary, job type, keyword
- 📄 **Job Detail** — full job description with apply button
- ✨ **AI Cover Letter** — generate a personalized cover letter with one click
- 📊 **Candidate Dashboard** — track all applications and their status
- 🏢 **Company Dashboard** — post jobs, view applicants, AI match scores, update status
- 👤 **Profile Pages** — candidate and company public profiles
- 📱 **Fully responsive** — works on desktop and mobile

---

## Pages

| Route | Description | Auth |
|---|---|---|
| `/` | Landing page | Public |
| `/jobs` | Browse all open jobs with filters | Public |
| `/jobs/:id` | Job detail + apply | Public |
| `/login` | Login page | Public |
| `/register` | Register as company or candidate | Public |
| `/candidate/dashboard` | Candidate applications tracker | Candidate |
| `/company/dashboard` | Company job and applicant manager | Company |
| `/candidates/:id` | Candidate public profile | Authorized |
| `/candidates/me` | My candidate profile | Candidate |
| `/companies/:id` | Company public profile | Public |
| `/companies/me` | My company profile | Company |
| `/about` | About HireWave | Public |
| `/for-companies` | For companies landing page | Public |
| `/privacy` | Privacy policy | Public |
| `/terms` | Terms of service | Public |
| `/contact` | Contact page | Public |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework and build tool |
| Tailwind CSS v3 | Utility-first styling |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to the backend API |

---

## Getting Started

### Prerequisites
- Node.js 18+
- The backend API running (see [JobBoardAPI](https://github.com/Hazem18/JobBoardAPI))

### Setup

1. Clone the repository
```bash
git clone https://github.com/Hazem18/HireWave-Client.git
cd HireWave-Client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your API URL
```
VITE_API_URL=http://localhost:7076/api
```

5. Start the development server
```bash
npm run dev
```

Open `http://localhost:5173`

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://hirewave.somee.com/api` |

---

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── JobsPage.jsx
│   ├── JobDetailPage.jsx
│   ├── CandidateDashboard.jsx
│   ├── CompanyDashboard.jsx
│   ├── CandidateProfilePage.jsx
│   ├── CompanyProfilePage.jsx
│   ├── AboutPage.jsx
│   ├── ForCompaniesPage.jsx
│   ├── PrivacyPage.jsx
│   ├── TermsPage.jsx
│   └── ContactPage.jsx
├── App.jsx
└── main.jsx
```

---

## AI Features

### Cover Letter Generator
Candidates can generate a personalized cover letter on the job detail page. The AI reads the job description and the candidate's skills and bio to write a tailored cover letter that the candidate can edit before submitting.

### Match Score
When a company views applications for a job listing, each applicant automatically receives an AI-generated match score (0–100%) with a one-line explanation of why they are or aren't a good fit. Scores are color coded — green for strong matches, yellow for partial, red for weak.

Both features are powered by the backend AI endpoint — the API key is never exposed to the browser.

---

## Deployment

This project is deployed on **Vercel**.

To deploy your own instance:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variable `VITE_API_URL` pointing to your backend
4. Deploy

Vercel auto-detects Vite and configures the build automatically.

---

## Related

- 🔗 [HireWave Backend API](https://github.com/Hazem18/JobBoardAPI) — ASP.NET Core 9, Clean Architecture, EF Core, Identity, JWT, AI integration

---

## Author

**Hazem Emad**
- GitHub: [@Hazem18](https://github.com/Hazem18)
- LinkedIn: [hazem-emad-hussien](https://linkedin.com/in/hazem-emad-hussien)
- Email: eng.hazemm.emad@gmail.com

---

*Built with React, Tailwind CSS, and a lot of coffee — 2026*
