"use client"

import { useState } from 'react'
import { Download, FileText, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReportExportDialog({ reportId }: { reportId: string }) {
  const [open, setOpen] = useState(false)

  const exportReport = (format: 'pdf' | 'json' | 'txt') => {
    window.open(`/api/reports/${reportId}/export?format=${format}`, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  return (
    <div className="relative inline-flex">
      <Button variant="outline" onClick={() => setOpen((current) => !current)}>
        <Download className="mr-2 h-4 w-4" />
        Export Report
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-border/60 bg-background p-2 shadow-2xl shadow-black/20">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-muted/50" onClick={() => exportReport('pdf')}>
            <FileText className="h-4 w-4 text-cyan-500" />
            PDF board export
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-muted/50" onClick={() => exportReport('json')}>
            <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
            JSON snapshot
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-muted/50" onClick={() => exportReport('txt')}>
            <FileText className="h-4 w-4 text-orange-500" />
            Text summary
          </button>
        </div>
      ) : null}
    </div>
  )
}
