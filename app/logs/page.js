import { Suspense } from 'react'
import LogsPageClient from './LogsPageClient'

export default function LogsPage() {
  return (
    <Suspense fallback={<div className="text-2xl text-[#17506A] font-bold">Loading page...</div>}>
      <LogsPageClient />
    </Suspense>
  )
}