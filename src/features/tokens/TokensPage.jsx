import { PageCard } from '../../components/layout/PageCard.jsx'
import { Button } from '../../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Select } from '../../components/ui/select.jsx'
import { Separator } from '../../components/ui/separator.jsx'
import { useTokens } from './TokensContext.jsx'

export function TokensPage() {
  const { tokens, updateToken, resetTokens } = useTokens()

  return (
    <PageCard
      title="Tokens"
      subtitle="Edit a few core design tokens. Changes persist in localStorage (clm_tokens) and update the UI instantly."
      right={
        <Button variant="outline" onClick={resetTokens}>
          Reset
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>Primary/secondary colors, radius, and spacing.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              <Field label="Primary">
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={tokens.primary}
                    onChange={(e) => updateToken('primary', e.target.value)}
                    className="h-10 w-12 p-1"
                  />
                  <Input value={tokens.primary} onChange={(e) => updateToken('primary', e.target.value)} />
                </div>
              </Field>

              <Field label="Secondary">
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={tokens.secondary}
                    onChange={(e) => updateToken('secondary', e.target.value)}
                    className="h-10 w-12 p-1"
                  />
                  <Input value={tokens.secondary} onChange={(e) => updateToken('secondary', e.target.value)} />
                </div>
              </Field>

              <Field label="Radius">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Select value={tokens.radius} onChange={(e) => updateToken('radius', e.target.value)}>
                    {['12px', '16px', '20px', '24px'].map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </Select>
                  <Input
                    value={tokens.radius}
                    onChange={(e) => updateToken('radius', e.target.value)}
                    placeholder="e.g. 16px"
                  />
                </div>
              </Field>

              <Field label="Spacing (card padding)">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Select value={tokens.space} onChange={(e) => updateToken('space', e.target.value)}>
                    {['16px', '20px', '24px', '28px', '32px'].map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </Select>
                  <Input
                    value={tokens.space}
                    onChange={(e) => updateToken('space', e.target.value)}
                    placeholder="e.g. 24px"
                  />
                </div>
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>Button + Card update from tokens.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rounded-[var(--clm-radius,16px)] bg-zinc-50 p-5 ring-1 ring-zinc-200">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button disabled>Disabled</Button>
              </div>

              <Separator className="my-5" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>Radius + spacing come from tokens.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 text-sm text-zinc-700">
                    Try changing <span className="font-mono">radius</span> or <span className="font-mono">space</span>.
                  </CardContent>
                </Card>

                <div className="rounded-[var(--clm-radius,16px)] bg-white p-[var(--clm-space,24px)] shadow-sm ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold">Raw token values</div>
                  <pre className="mt-3 overflow-auto rounded-xl bg-zinc-50 p-3 text-xs text-zinc-700 ring-1 ring-zinc-200">
{JSON.stringify(tokens, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
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


