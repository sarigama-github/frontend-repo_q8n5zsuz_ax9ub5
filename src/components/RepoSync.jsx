import { useState } from 'react'

function RepoSync() {
  const [url, setUrl] = useState('https://github.com/lightmantrust/LTD')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSync = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const resp = await fetch(`${backend}/api/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: url, token: token || undefined })
      })
      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(text || 'Sync failed')
      }
      const data = await resp.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-white text-xl font-semibold mb-4">Sync a GitHub Repository</h2>
      <form onSubmit={handleSync} className="space-y-3">
        <div>
          <label className="block text-blue-200/80 text-sm mb-1">Repository URL (owner/name or full URL)</label>
          <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="owner/name" className="w-full px-3 py-2 rounded bg-slate-900/70 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-blue-200/80 text-sm mb-1">GitHub Token (optional, increases rate limits)</label>
          <input value={token} onChange={(e)=>setToken(e.target.value)} placeholder="ghp_..." className="w-full px-3 py-2 rounded bg-slate-900/70 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 rounded transition-colors">
          {loading ? 'Syncing…' : 'Start Sync'}
        </button>
      </form>
      {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
      {result && (
        <div className="mt-4 text-blue-100 text-sm">
          <p>Saved: <span className="font-semibold">{result.saved}</span></p>
          <p>Repository: <span className="font-semibold">{result.repo}</span></p>
        </div>
      )}
    </div>
  )
}

export default RepoSync
