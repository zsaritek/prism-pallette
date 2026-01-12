import { cn } from '../../lib/utils'

const base =
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors'

const variants = {
  default: 'border-transparent bg-zinc-900 text-white',
  secondary: 'border-transparent bg-zinc-100 text-zinc-900',
  outline: 'border-zinc-200 bg-white text-zinc-900',
  destructive: 'border-transparent bg-red-600 text-white',
}

export function Badge({ className, variant = 'default', ...props }) {
  return <span className={cn(base, variants[variant], className)} {...props} />
}


