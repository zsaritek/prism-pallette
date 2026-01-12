import { PageCard } from '../../components/layout/PageCard.jsx'

export function ComponentsPage() {
  return (
    <PageCard
      title="Components"
      subtitle="Browse your local component catalog and preview variants. (Variant preview lands in the next commit.)"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { name: 'Button', desc: 'Primary action button.' },
          { name: 'Badge', desc: 'Small status + label.' },
          { name: 'Card', desc: 'Container with header/content.' },
        ].map((c) => (
          <div key={c.name} className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="mt-1 text-sm text-zinc-600">{c.desc}</div>
          </div>
        ))}
      </div>
    </PageCard>
  )
}


