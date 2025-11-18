import Navbar from './components/Navbar'
import RepoSync from './components/RepoSync'
import RepoBrowser from './components/RepoBrowser'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="relative py-12 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="relative container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-white mb-6">
              <h1 className="text-3xl font-bold tracking-tight">SaaS: GitHub Repo Ingestor</h1>
              <p className="text-blue-200/80 mt-1">Sync a repository and browse collected files with persistent storage.</p>
            </div>
            <RepoSync />
          </div>
          <div>
            <RepoBrowser />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-blue-300/60 text-sm">
        Built with Flames Blue • Connects to your backend automatically
      </footer>
    </div>
  )
}

export default App
