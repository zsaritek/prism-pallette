import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-[var(--clm-radius,16px)] bg-white shadow-sm ring-1 ring-zinc-200',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-[var(--clm-space,24px)] pb-0', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-semibold leading-none tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('mt-1 text-sm text-zinc-600', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-[var(--clm-space,24px)]', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center p-[var(--clm-space,24px)] pt-0', className)} {...props} />
}


