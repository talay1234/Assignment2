'use client' // ต้องเป็น Client Component เพราะใช้ Link
import Link from 'next/link'

export default function NavMenu() {
  return (
    <nav className="bg-[#17506A] p-4">
      <div className="container mx-auto flex gap-6 text-white">
        <Link href="/" className="hover:text-white">Page 1: Config</Link>
        <Link href="/form" className="hover:text-white">Page 2: Log Form</Link>
        <Link href="/logs" className="hover:text-white">Page 3: View Logs</Link>
      </div>
    </nav>
  )
}