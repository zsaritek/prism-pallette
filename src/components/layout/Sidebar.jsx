import { NavLink } from 'react-router-dom'

const links = [
  { to: '/components', label: 'Components' },
  { to: '/tokens', label: 'Tokens' },
  { to: '/generator', label: 'Generator' },
]

function SidebarNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition',
          isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100',
        ].join(' ')
      }
    >
      <span>{children}</span>
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <aside className="w-[280px] shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">Component Library</div>
          <div className="mt-1 text-base font-semibold leading-tight">Manager</div>
          <div className="mt-3 h-px bg-zinc-100" />
          <nav className="mt-3 space-y-1">
            {links.map((l) => (
              <SidebarNavLink key={l.to} to={l.to}>
                {l.label}
              </SidebarNavLink>
            ))}
          </nav>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
          <div className="text-sm font-semibold">Local-first</div>
          <div className="mt-1 text-sm text-zinc-600">
            Data will be stored in local JSON + localStorage. No backend.
          </div>
        </div>
      </div>
    </aside>
  )
}


