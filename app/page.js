'use client'
import { useConfig } from './context/ConfigContext'

export default function ConfigPage() {
  const config = useConfig()

  if (!config) {
    return <div>Loading config...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl text-[#17506A] font-bold mb-4">View Config</h1>
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-[#76BBBF]">
        <div className="mb-4">
          <strong className="text-[#267C9D]">Drone ID: </strong>
          <span className="text-gray-100">{config.drone_id}</span>
        </div>
        <div className="mb-4">
          <strong className="text-[#267C9D]">Drone Name: </strong>
          <span className="text-gray-100">{config.drone_name}</span>
        </div>
        <div className="mb-4">
          <strong className="text-[#267C9D]">Light: </strong>
          <span className="text-gray-100">{config.light}</span>
        </div>
        <div className="mb-4">
          <strong className="text-[#267C9D]">Country: </strong>
          <span className="text-gray-100">{config.country}</span>
        </div>
      </div>
    </div>
  )
}