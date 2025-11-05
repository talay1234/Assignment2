'use client'
import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import axios from 'axios'

export default function FormPage() {
  const config = useConfig()
  const [celsius, setCelsius] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!celsius || !config) return

    setIsLoading(true)
    setMessage('')
    
    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius)
    }

    try {
      // ใช้ API URL ฝั่ง Client (NEXT_PUBLIC_)
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      await axios.post(`${API_URL}/logs`, payload)
      
      setMessage('Log submitted successfully!')
      setCelsius('') // เคลียร์ฟอร์ม
    } catch (error) {
      console.error(error)
      setMessage(`Error submitting log: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Temperature Log Form</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="celsius">
            Input: Temperature in Celsius
          </label>
          <input
            id="celsius"
            type="number"
            step="0.1"
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Data'}
          </button>
        </div>
      </form>

      {message && <p className={message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
    </div>
  )
}