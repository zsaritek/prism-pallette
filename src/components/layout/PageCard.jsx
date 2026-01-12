export function PageCard({ title, subtitle, children, right }) {
  return (
    <div className="rounded-[var(--clm-radius,16px)] bg-white p-[var(--clm-space,24px)] shadow-sm ring-1 ring-zinc-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-zinc-600">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  )
}


