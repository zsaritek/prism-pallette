import { cn } from '../../lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--clm-radius,16px)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white'

const variants = {
  default: 'bg-[var(--clm-accent)] text-white hover:bg-[var(--clm-accent-hover)]',
  secondary: 'bg-zinc-100 text-[var(--clm-neutral)] hover:bg-zinc-200',
  outline: 'border border-zinc-200 bg-white hover:bg-zinc-50',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
}

const sizes = {
  sm: 'h-9 px-3',
  default: 'h-10 px-4',
  lg: 'h-11 px-6',
}

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}


