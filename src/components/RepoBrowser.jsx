import { useEffect, useState } from 'react'

function RepoBrowser() {
  const [repos, setRepos] = useState([])
  const [selected, setSelected] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadRepos = async () => {
    const resp = await fetch(`${backend}/api/repos`)
    const data = await resp.json()
    setRepos(data.items || [])
  }

  const loadFiles = async (repo) => {
    setLoading(true)
    const resp = await fetch(`${backend}/api/files?repo=${encodeURIComponent(repo)}`)
    const data = await resp.json()
    setFiles(data.items || [])
    setLoading(false)
  }

  useEffect(() => { loadRepos() }, [])

  useEffect(() => {
    if (selected) loadFiles(selected)
  }, [selected])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-white text-xl font-semibold mb-4">Browse Synced Files</h2>
      <div className="mb-3">
        <select value={selected} onChange={(e)=>setSelected(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-blue-500/30 text-white">
          <option value="">Select a repository</option>
          {repos.map(r => (
            <option key={r._id} value={r.full_name}>{r.full_name}</option>
          ))}
        </select>
      </div>
      {loading && <p className="text-blue-200">Loading files…</p>}
      {!loading && selected && (
        <div className="max-h-80 overflow-auto divide-y divide-slate-700/50">
          {files.map(f => (
            <div key={f._id} className="py-2">
              <p className="text-blue-100 text-sm font-mono">{f.path}</p>
              <p className="text-xs text-blue-300/70">{f.language || f.encoding}</p>
            </div>
          ))}
          {files.length === 0 && <p className="text-blue-300/70">No files found.</p>}
        </div>
      )}
    </div>
  )
}

export default RepoBrowser
