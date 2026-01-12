function indent(lines, spaces = 2) {
  const pad = ' '.repeat(spaces)
  return lines
    .split('\n')
    .map((l) => (l.length ? pad + l : l))
    .join('\n')
}

function jsxProp(name, value) {
  if (value == null) return ''
  if (typeof value === 'boolean') return value ? ` ${name}` : ''
  if (typeof value === 'number') return ` ${name}={${value}}`
  return ` ${name}="${String(value).replaceAll('"', '&quot;')}"`
}

export function generateSnippet({ componentId, variantId, options }) {
  const o = options || {}

  if (componentId === 'button') {
    const imports = `import { Button } from "./components/ui/button"`
    const props =
      jsxProp('variant', variantId && variantId !== 'default' ? variantId : null) +
      jsxProp('size', o.size && o.size !== 'default' ? o.size : null) +
      jsxProp('disabled', Boolean(o.disabled))

    const jsx = `<Button${props}>\n${indent(String(o.label || 'Button'), 2)}\n</Button>`
    return `${imports}\n\nexport function Example() {\n${indent(`return (\n${indent(jsx, 2)}\n)`, 2)}\n}\n`
  }

  if (componentId === 'badge') {
    const imports = `import { Badge } from "./components/ui/badge"`
    const props = jsxProp('variant', variantId && variantId !== 'default' ? variantId : null)
    const jsx = `<Badge${props}>${String(o.label || 'Badge')}</Badge>`
    return `${imports}\n\nexport function Example() {\n${indent(`return (\n${indent(jsx, 2)}\n)`, 2)}\n}\n`
  }

  if (componentId === 'card') {
    const imports = `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card"`
    const className = variantId === 'muted' ? 'bg-zinc-50' : null
    const open = className ? `<Card className="${className}">` : '<Card>'

    const jsx = [
      open,
      indent(
        [
          '<CardHeader>',
          indent(`<CardTitle>${String(o.title || 'Card title')}</CardTitle>`, 2),
          indent(`<CardDescription>${String(o.description || 'A short description.')}</CardDescription>`, 2),
          '</CardHeader>',
          `<CardContent className="pt-4">${String(o.body || 'Card content goes here.')}</CardContent>`,
        ].join('\n'),
        2,
      ),
      '</Card>',
    ].join('\n')

    return `${imports}\n\nexport function Example() {\n${indent(`return (\n${indent(jsx, 2)}\n)`, 2)}\n}\n`
  }

  return ''
}


