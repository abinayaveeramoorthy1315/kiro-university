// Application shell — full implementation comes in later tasks
// per the spec design.md component hierarchy:
//   App → HeroSection, SearchAndFilter, TempleCollection, TempleDetailModal

function App() {
  return (
    <div className="min-h-screen bg-ivory text-stone font-body">
      {/* Placeholder shell — components added in Phase 5 tasks */}
      <header className="flex items-center justify-center py-8 bg-stone">
        <h1 className="font-display text-2xl text-gold-primary tracking-widest">
          Pride Temples of Tamil Nadu
        </h1>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-12">
        <p className="font-body text-base text-stone-light text-center">
          Project initialised — temple collection coming soon.
        </p>
      </main>
    </div>
  )
}

export default App
