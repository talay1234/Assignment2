'use client' 

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useConfig } from '../context/ConfigContext'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function LogsPageClient() {
  const router = useRouter()       
  const pathname = usePathname()   
  const searchParams = useSearchParams() 

  const initialPage = parseInt(searchParams.get('page') || '1', 10)

  const [logs, setLogs] = useState([])
  const [currentPage, setCurrentPage] = useState(initialPage) 
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const config = useConfig()

  useEffect(() => {
    if (!config) return

    async function fetchLogs() {
      setLoading(true)
      setError(null)
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        
        const res = await axios.get(`${API_URL}/logs/${config.drone_id}`, {
          params: { page: currentPage, perPage: 12 }
        })

        setLogs(res.data.items || [])
        setTotalPages(res.data.totalPages || 1)

      } catch (err) {
        console.error("Failed to fetch logs:", err.message)
        setError("Failed to load logs. Please try refreshing.")
      } finally {
        setLoading(false) 
      }
    }

    fetchLogs()
  }, [currentPage, config]) 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`) 
  }

  if (error) {
    return <div className="text-[#DC493F] font-bold">{error}</div>
  }

  if (loading && logs.length === 0) { 
    return <div className="text-2xl text-[#17506A] font-bold">Loading logs...</div>
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-[#17506A] font-bold mb-4">View Logs</h1>

      <div className="shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#17506A]">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Drone ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Drone Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Temp (°C)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {logs.length > 0 ? (
                logs.map((log) => (
                    <tr 
                    key={log.created} 
                    className="odd:bg-[#BCE2D3] even:bg-[#76BBBF]"
                    >
                    <td className="px-6 py-4 whitespace-nowrap text-[#17506A]">{new Date(log.created).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#17506A]">{log.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#17506A]">{log.drone_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#17506A]">{log.drone_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#17506A]">{log.celsius}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No logs found for this page.</td>
                </tr>
                )}
            </tbody>
        </table>
      </div>

      {/* (ปุ่ม... เหมือนเดิม) */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm text-[#267C9D]">
            Page <span className="font-medium text-[#267C9D]">{currentPage}</span> of <span className="font-medium text-[#267C9D]">{totalPages}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {/* ปุ่ม Previous */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="bg-[#2B6A6D] hover:bg-[#024D60] text-[#D8C59B] font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &larr; Previous
          </button>

          {/* ปุ่ม Next */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="bg-[#2B6A6D] hover:bg-[#024D60] text-[#D8C59B] font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}