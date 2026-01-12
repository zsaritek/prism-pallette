import { PageCard } from '../../components/layout/PageCard.jsx'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSeedComponents } from './componentsSeed.js'
import { cn } from '../../lib/utils.js'
import { Button } from '../../components/ui/button.jsx'
import { Badge } from '../../components/ui/badge.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Select } from '../../components/ui/select.jsx'
import { Separator } from '../../components/ui/separator.jsx'

export function ComponentsPage() {
  const components = useMemo(() => getSeedComponents(), [])
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedComponentId = searchParams.get('c') || components[0]?.id
  const selectedComponent = components.find((c) => c.id === selectedComponentId) || components[0]

  const selectedVariantId =
    searchParams.get('v') || selectedComponent?.defaults?.variant || selectedComponent?.variants?.[0]?.id

  const selectedVariant =
    selectedComponent?.variants?.find((v) => v.id === selectedVariantId) || selectedComponent?.variants?.[0]

  function setSelection(next) {
    const nextParams = new URLSearchParams(searchParams)
    Object.entries(next).forEach(([k, v]) => {
      if (v == null) nextParams.delete(k)
      else nextParams.set(k, String(v))
    })
    setSearchParams(nextParams, { replace: true })
  }

  const preview = useMemo(() => {
    if (!selectedComponent) return null

    if (selectedComponent.id === 'button') {
      return <ButtonPreview component={selectedComponent} variantId={selectedVariant?.id} />
    }

    if (selectedComponent.id === 'badge') {
      return <BadgePreview component={selectedComponent} variantId={selectedVariant?.id} />
    }

    if (selectedComponent.id === 'card') {
      return <CardPreview component={selectedComponent} variantId={selectedVariant?.id} />
    }

    return null
  }, [selectedComponent, selectedVariant?.id])

  return (
    <PageCard
      title="Components"
      subtitle="Browse your local component catalog, inspect variants, and preview a few basic props."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Catalog</CardTitle>
            <CardDescription>Select a component.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">
              {components.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelection({ c: c.id, v: c.defaults?.variant || c.variants?.[0]?.id })}
                  className={cn(
                    'w-full rounded-xl px-3 py-2 text-left transition',
                    c.id === selectedComponent?.id ? 'bg-[#6366F1]/10 text-[var(--clm-neutral)]' : 'hover:bg-zinc-50',
                  )}
                >
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div
                    className={cn(
                      'mt-1 text-xs',
                      c.id === selectedComponent?.id ? 'text-zinc-600' : 'text-zinc-500',
                    )}
                  >
                    {c.description}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>{selectedComponent?.name || '—'}</CardTitle>
                  <CardDescription>{selectedComponent?.description || ''}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-2">
                {(selectedComponent?.variants || []).map((v) => {
                  const active = v.id === selectedVariant?.id
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelection({ v: v.id })}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition',
                        active
                          ? 'border-[#6366F1] bg-[#6366F1] text-white'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50',
                      )}
                    >
                      {v.label}
                    </button>
                  )
                })}
              </div>

              <Separator className="my-5" />

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold">Preview</div>
                  <div className="mt-4 flex min-h-[140px] items-center justify-center">{preview}</div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold">Props</div>
                  <div className="mt-4">
                    <PropsPanel component={selectedComponent} variantId={selectedVariant?.id} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageCard>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-zinc-600">{label}</div>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

function PropsPanel({ component, variantId }) {
  if (!component) return null

  if (component.id === 'button') return <ButtonProps component={component} variantId={variantId} />
  if (component.id === 'badge') return <BadgeProps component={component} variantId={variantId} />
  if (component.id === 'card') return <CardProps component={component} variantId={variantId} />

  return null
}

function ButtonPreview({ component, variantId }) {
  const defaults = component.defaults || {}
  const [label, setLabel] = useSearchState('label', defaults.label || 'Button')
  const [size] = useSearchState('size', defaults.size || 'default')
  const [disabled] = useSearchBoolState('disabled', Boolean(defaults.disabled))

  return (
    <Button variant={variantId || 'default'} size={size} disabled={disabled}>
      {label}
    </Button>
  )
}

function ButtonProps({ component, variantId }) {
  const defaults = component.defaults || {}
  const [label, setLabel] = useSearchState('label', defaults.label || 'Button')
  const [size, setSize] = useSearchState('size', defaults.size || 'default')
  const [disabled, setDisabled] = useSearchBoolState('disabled', Boolean(defaults.disabled))

  return (
    <div className="space-y-4">
      <Field label="Label">
        <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Button label" />
      </Field>

      <Field label="Size">
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          {(component.sizes || []).map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-zinc-600">Disabled</div>
          <div className="mt-1 text-xs text-zinc-500">Preview uses the same variant.</div>
        </div>
        <button
          type="button"
          onClick={() => setDisabled(!disabled)}
          className={cn(
            'inline-flex h-10 items-center rounded-xl border px-3 text-sm font-medium transition',
            disabled
              ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]'
              : 'border-zinc-200 bg-white hover:bg-zinc-100',
          )}
        >
          {disabled ? 'On' : 'Off'}
        </button>
      </div>

      <div className="pt-1">
        <div className="text-xs font-medium text-zinc-600">Current</div>
        <div className="mt-1 text-xs text-zinc-500">
          variant: <span className="font-mono">{variantId}</span> · size: <span className="font-mono">{size}</span>
        </div>
      </div>
    </div>
  )
}

function BadgePreview({ component, variantId }) {
  const defaults = component.defaults || {}
  const [label] = useSearchState('label', defaults.label || 'Badge')
  return <Badge variant={variantId || defaults.variant || 'default'}>{label}</Badge>
}

function BadgeProps({ component }) {
  const defaults = component.defaults || {}
  const [label, setLabel] = useSearchState('label', defaults.label || 'Badge')
  return (
    <div className="space-y-4">
      <Field label="Label">
        <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Badge label" />
      </Field>
      <div className="text-xs text-zinc-500">Variants are selected above.</div>
    </div>
  )
}

function CardPreview({ component, variantId }) {
  const defaults = component.defaults || {}
  const [title] = useSearchState('title', defaults.title || 'Card title')
  const [description] = useSearchState('description', defaults.description || 'A short description.')
  const [body] = useSearchState('body', defaults.body || 'Card content goes here.')

  const variantClass = variantId === 'muted' ? 'bg-zinc-50' : 'bg-white'

  return (
    <Card className={cn('w-full max-w-sm', variantClass)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 text-sm text-zinc-700">{body}</CardContent>
    </Card>
  )
}

function CardProps({ component }) {
  const defaults = component.defaults || {}
  const [title, setTitle] = useSearchState('title', defaults.title || 'Card title')
  const [description, setDescription] = useSearchState('description', defaults.description || 'A short description.')
  const [body, setBody] = useSearchState('body', defaults.body || 'Card content goes here.')

  return (
    <div className="space-y-4">
      <Field label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Description">
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <Field label="Body">
        <Input value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
    </div>
  )
}

function useSearchState(key, initialValue) {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get(key) ?? initialValue

  function setValue(nextValue) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set(key, nextValue)
    setSearchParams(nextParams, { replace: true })
  }

  return [value, setValue]
}

function useSearchBoolState(key, initialValue) {
  const [searchParams, setSearchParams] = useSearchParams()
  const raw = searchParams.get(key)
  const value = raw == null ? initialValue : raw === 'true'

  function setValue(nextValue) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set(key, nextValue ? 'true' : 'false')
    setSearchParams(nextParams, { replace: true })
  }

  return [value, setValue]
}


