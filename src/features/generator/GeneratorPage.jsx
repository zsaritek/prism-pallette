import { PageCard } from '../../components/layout/PageCard.jsx'
import { useMemo, useState } from 'react'
import { Button } from '../../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Select } from '../../components/ui/select.jsx'
import { Separator } from '../../components/ui/separator.jsx'
import { getSeedComponents } from '../components/componentsSeed.js'
import { generateSnippet } from './generateSnippet.js'

export function GeneratorPage() {
  const components = useMemo(() => getSeedComponents(), [])
  const [copied, setCopied] = useState(false)

  const [componentId, setComponentId] = useState(components[0]?.id || 'button')

  const component = components.find((c) => c.id === componentId) || components[0]
  const variants = component?.variants || []
  const sizes = component?.sizes || []

  const [variantId, setVariantId] = useState(component?.defaults?.variant || variants[0]?.id || 'default')

  // Reset variant/options when component changes
  function onChangeComponent(nextId) {
    const next = components.find((c) => c.id === nextId) || components[0]
    setComponentId(nextId)
    setVariantId(next?.defaults?.variant || next?.variants?.[0]?.id || 'default')
    setCopied(false)
  }

  const [buttonLabel, setButtonLabel] = useState('Button')
  const [buttonSize, setButtonSize] = useState('default')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [badgeLabel, setBadgeLabel] = useState('Badge')

  const [cardTitle, setCardTitle] = useState('Card title')
  const [cardDescription, setCardDescription] = useState('A short description.')
  const [cardBody, setCardBody] = useState('Card content goes here.')

  const options = useMemo(() => {
    if (componentId === 'button') return { label: buttonLabel, size: buttonSize, disabled: buttonDisabled }
    if (componentId === 'badge') return { label: badgeLabel }
    if (componentId === 'card') return { title: cardTitle, description: cardDescription, body: cardBody }
    return {}
  }, [badgeLabel, buttonDisabled, buttonLabel, buttonSize, cardBody, cardDescription, cardTitle, componentId])

  const snippet = useMemo(() => {
    return generateSnippet({ componentId, variantId, options })
  }, [componentId, options, variantId])

  async function copy() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <PageCard title="Generator" subtitle="Select a component + variant, then copy a JSX snippet.">
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>Basic props only (MVP).</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              <Field label="Component">
                <Select value={componentId} onChange={(e) => onChangeComponent(e.target.value)}>
                  {components.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Variant">
                <Select value={variantId} onChange={(e) => setVariantId(e.target.value)}>
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </Select>
              </Field>

              {componentId === 'button' ? (
                <>
                  <Separator />
                  <Field label="Label">
                    <Input value={buttonLabel} onChange={(e) => setButtonLabel(e.target.value)} />
                  </Field>
                  <Field label="Size">
                    <Select value={buttonSize} onChange={(e) => setButtonSize(e.target.value)}>
                      {sizes.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium text-zinc-600">Disabled</div>
                      <div className="mt-1 text-xs text-zinc-500">Toggles the disabled prop.</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setButtonDisabled(!buttonDisabled)}
                      className={[
                        'inline-flex h-10 items-center rounded-[var(--clm-radius,16px)] border px-3 text-sm font-medium transition',
                        buttonDisabled
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-200 bg-white hover:bg-zinc-100',
                      ].join(' ')}
                    >
                      {buttonDisabled ? 'On' : 'Off'}
                    </button>
                  </div>
                </>
              ) : null}

              {componentId === 'badge' ? (
                <>
                  <Separator />
                  <Field label="Label">
                    <Input value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)} />
                  </Field>
                </>
              ) : null}

              {componentId === 'card' ? (
                <>
                  <Separator />
                  <Field label="Title">
                    <Input value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} />
                  </Field>
                  <Field label="Description">
                    <Input value={cardDescription} onChange={(e) => setCardDescription(e.target.value)} />
                  </Field>
                  <Field label="Body">
                    <Input value={cardBody} onChange={(e) => setCardBody(e.target.value)} />
                  </Field>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Snippet</CardTitle>
                <CardDescription>Copy-paste ready JSX using the shadcn-style API.</CardDescription>
              </div>
              <Button onClick={copy} disabled={!snippet}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <pre className="overflow-auto rounded-[var(--clm-radius,16px)] bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-50">
              <code>{snippet}</code>
            </pre>
          </CardContent>
        </Card>
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


