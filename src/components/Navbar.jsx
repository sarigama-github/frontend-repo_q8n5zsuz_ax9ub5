import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-500/20 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/flame-icon.svg" className="h-8 w-8" alt="Logo" />
          <span className="text-white font-semibold tracking-tight">LTD Repo Ingestor</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-blue-200/80">
          <a href="/test" className="hover:text-white transition-colors">System Test</a>
          <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
        </nav>
        <button className="sm:hidden text-blue-200" onClick={() => setOpen(!open)}>
          <span className="sr-only">Toggle Menu</span>
          ☰
        </button>
      </div>
      {open && (
        <div className="sm:hidden border-t border-blue-500/20">
          <div className="px-4 py-3 space-y-2 text-blue-200/80">
            <a href="/test" className="block">System Test</a>
            <a href="https://github.com" target="_blank" className="block">GitHub</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
