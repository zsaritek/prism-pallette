import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar.jsx'
import { ComponentsPage } from '../features/components/ComponentsPage.jsx'
import { TokensPage } from '../features/tokens/TokensPage.jsx'
import { GeneratorPage } from '../features/generator/GeneratorPage.jsx'

export function AppShell() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/components" replace />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="*" element={<Navigate to="/components" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}


