function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

export function createSimplePdfBuffer(title: string, lines: string[]) {
  const contentLines = [
    'BT',
    '/F1 18 Tf',
    '72 760 Td',
    `(${escapePdfText(title)}) Tj`,
    '/F1 11 Tf',
    ...lines.flatMap((line) => ['0 -18 Td', `(${escapePdfText(line)}) Tj`]),
    'ET',
  ].join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${contentLines.length} >>\nstream\n${contentLines}\nendstream`,
  ]

  const parts = ['%PDF-1.4\n']
  const offsets: number[] = [0]

  objects.forEach((object, index) => {
    offsets.push(parts.join('').length)
    parts.push(`${index + 1} 0 obj\n${object}\nendobj\n`)
  })

  const xrefStart = parts.join('').length
  const xref = [
    'xref',
    `0 ${objects.length + 1}`,
    '0000000000 65535 f ',
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `),
    'trailer',
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    'startxref',
    String(xrefStart),
    '%%EOF',
  ].join('\n')

  return Buffer.from(parts.join('') + xref, 'utf8')
}
