import { cn } from '../../lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white'

const variants = {
  default: 'bg-zinc-900 text-white hover:bg-zinc-800',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
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


