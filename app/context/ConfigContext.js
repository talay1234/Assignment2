'use client'
// ไฟล์นี้ทำหน้าที่สร้าง "กล่องเก็บของ" (Context)
// และ "ตัวส่งของ" (Provider) ให้แอป

import { createContext, useContext } from 'react'

// 1. สร้างกล่องเปล่าๆ
const ConfigContext = createContext(null)

// 2. สร้าง "ตัวส่งของ" (Provider)
// มันจะรับ config (ของ) และ children (แอปของเรา)
export function ConfigProvider({ children, config }) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}

// 3. สร้าง "ทางลัด" ให้หน้าอื่นๆ มาหยิบของในกล่อง
export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}