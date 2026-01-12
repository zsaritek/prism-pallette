import './App.css'

function App() {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-zinc-500">Component Library Manager</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">MVP bootstrapped</h1>
              <p className="mt-3 max-w-2xl text-zinc-600">
                Next commits add navigation, component previews, token editing, and snippet generation.
              </p>
            </div>
            <div className="hidden rounded-xl bg-zinc-50 px-3 py-2 text-xs text-zinc-600 ring-1 ring-zinc-200 sm:block">
              React + Vite + Tailwind
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Components', desc: 'Browse components + variants.' },
              { title: 'Tokens', desc: 'Edit colors, radius, spacing.' },
              { title: 'Generator', desc: 'Copy-paste ready JSX.' },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
                <div className="text-sm font-semibold">{x.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{x.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
