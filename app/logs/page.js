import axios from 'axios'
import Link from 'next/link'

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
      <h1 className="text-2xl font-bold mb-4">Page 3: View Logs (Extra Credit: Pagination)</h1>
      <div className="shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap">Drone ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap">Drone Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap">Celsius (°C)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-900">
            {logs && logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.created}>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{new Date(log.created).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{log.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{log.drone_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{log.drone_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{log.celsius}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">No logs found for this page.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-medium text-gray-900 dark:text-white">{totalPages}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {/* ปุ่ม Previous */}
          {currentPage > 1 ? (
            <Link 
              href={`/logs?page=${currentPage - 1}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              &larr; Previous
            </Link>
          ) : (
            <span className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
              &larr; Previous
            </span>
          )}

          {/* ปุ่ม Next */}
          {currentPage < totalPages ? (
            <Link 
              href={`/logs?page=${currentPage + 1}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next &rarr;
            </Link>
          ) : (
            <span className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
              Next &rarr;
            </span>
          )}
        </div>
      </div>
    </div>
  )
}