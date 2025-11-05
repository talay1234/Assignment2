import axios from 'axios'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

async function getLogs(page = 1) {
  const DRONE_ID = process.env.DRONE_ID
  const API_URL = process.env.API_URL
  
  try {
    // ส่ง page และ perPage (จำกัด 12 ตามโจทย์) ไปหา API
    const res = await axios.get(`${API_URL}/logs/${DRONE_ID}`, {
      params: {
        page: page,
        perPage: 12 
      }
    })
    // API (Assignment #1) คืนค่า object { items, totalPages, ... }
    return res.data 
  } catch (error) {
    console.error("Failed to fetch logs:", error.message)
    return { items: [], page: 1, totalPages: 1 } 
  }
}

// Page Component ได้รับ searchParams (เช่น ?page=2) จาก Next.js อัตโนมัติ
export default async function LogsPage({ searchParams }) {
  
  //อ่านค่า page จาก URL (ถ้าไม่มี ให้เป็น 1)
  const currentPage = parseInt(searchParams.page || '1', 10)

  //ดึงข้อมูล Log "เฉพาะหน้า" ที่กำหนด
  const logData = await getLogs(currentPage) 
  
  const logs = logData.items || []
  const totalPages = logData.totalPages || 1

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
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase whitespace-nowrap">Celsius (°C)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs && logs.length > 0 ? (
              logs.map((log) => (
                <tr 
                  key={log.created}
                  className="odd:bg-[#BCE2D3] even:bg-[#76BBBF]"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[#267C9D]">{new Date(log.created).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#267C9D]">{log.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#267C9D]">{log.drone_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#267C9D]">{log.drone_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#267C9D]">{log.celsius}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-[#267C9D]">No logs found for this page.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm text-[#267C9D]">
            Page <span className="font-medium text-[#267C9D]">{currentPage}</span> of <span className="font-medium text-[#267C9D]">{totalPages}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {/* ปุ่ม Previous */}
          {currentPage > 1 ? (
            <Link 
              href={`/logs?page=${currentPage - 1}`}
              className="bg-[#2B6A6D] hover:bg-[#024D60] text-[#D8C59B] font-bold py-2 px-4 rounded"
            >
              &larr; Previous
            </Link>
          ) : (
            <span className="bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed">
              &larr; Previous
            </span>
          )}

          {/* ปุ่ม Next */}
          {currentPage < totalPages ? (
            <Link 
              href={`/logs?page=${currentPage + 1}`}
              className="bg-[#2B6A6D] hover:bg-[#024D60] text-[#D8C59B] font-bold py-2 px-4 rounded"
            >
              Next &rarr;
            </Link>
          ) : (
            <span className="bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed">
              Next &rarr;
            </span>
          )}
        </div>
      </div>
    </div>
  )
}