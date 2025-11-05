'use client'
import { useConfig } from './context/ConfigContext'

export default function ConfigPage() {
  const config = useConfig()

  if (!config) {
    return <div>Loading config...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Page 1: View Config</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-800">
        <div className="mb-4">
          <strong className="block text-gray-700 dark:text-gray-300">Drone ID:</strong>
          <span className="dark:text-white">{config.drone_id}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 dark:text-gray-300">Drone Name:</strong>
          <span className="dark:text-white">{config.drone_name}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 dark:text-gray-300">Light:</strong>
          <span className="dark:text-white">{config.light}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 dark:text-gray-300">Country:</strong>
          <span className="dark:text-white">{config.country}</span>
        </div>
      </div>
    </div>
  )
}