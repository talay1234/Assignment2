# Drone UI (Assignment #2)

project Frontend สำหรับ Assignment#2 ที่สร้างขึ้นด้วย **Next.js (App Router)** และ **Tailwind CSS**

projectนี้ทำหน้าที่เป็น User Interface (UI) สำหรับผู้ใช้งาน เพื่อโต้ตอบกับ API Server ที่สร้างขึ้นใน **Assignment #1** โดยข้อมูลทั้งหมดจะถูกดึงและส่งผ่าน API ที่ได้ Deploy ไว้ (บน Render)

## Live Demo

**https://your-vercel-app-url.vercel.app**

## Features

projectนี้มี 3 หน้าหลัก:

1.  **Page 1: View Config (`/`)**
    * เป็นหน้าแรกที่แสดงข้อมูล Config หลักของ Drone
    * ข้อมูล เช่น `drone_id`, `drone_name` จะถูกดึงมาครั้งเดียวตอนเปิดเว็บ และถูกเก็บไว้ใน Context เพื่อส่งต่อให้ Page 2 และ 3 ใช้งาน
    * แสดงผล: Drone ID, Drone Name, Light, และ Country

2.  **Page 2: Log Form (`/form`)**
    * หน้าสำหรับกรอกฟอร์มเพื่อส่งข้อมูลอุณหภูมิ (Celsius)
    * เมื่อกด "Submit Data" ฟอร์มจะดึงข้อมูล `drone_id`, `drone_name`, `country` จาก Context (ที่ Page 1 โหลดมา) มารวมกับค่า `celsius` ที่กรอก แล้วส่ง `POST` ไปยัง API (Assignment#1)

3.  **Page 3: View Logs (`/logs`)**
    * แสดงผล Log ในรูปแบบ `<table>`
    * ข้อมูลจะถูกเรียงลำดับตาม `created` ล่าสุดก่อน โดยอัตโนมัติ

เพิ่มเติม  **คะแนนพิเศษ: Pagination**
    * ใน Page 3 (View Logs) ได้ทำระบบ Pagination (แบ่งหน้า) ไว้
    * ผู้ใช้สามารถกดปุ่ม "Next" และ "Previous" เพื่อโหลดข้อมูล Log ในหน้าอื่นๆ ได้ (จำกัด 12 รายการต่อหน้า)

## Tech Stack (เทคโนโลยีที่ใช้)

* **Next.js** (App Router)
* **React.js** (useState, useContext)
* **Tailwind CSS** (สำหรับ UI)
* **Axios** (สำหรับเรียกใช้ API)
* **Vercel** (สำหรับ Deploy)

## Install and Run project (Locally)

### 1. Clone Repository

```bash
git clone <your-github-repository-url>
cd drone2-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. สร้างไฟล์ .env
ใช้ Environment Variables เพื่อระบุ DRONE_ID และ URL ของ API (Assignment #1)

```env
# .env

DRONE_ID=66011456

# ใส่ URL ของ API (Assignment #1) ที่ Deploy บน Render (สำหรับใช้ฝั่ง Server-Side เช่น Layout, Page 3)
API_URL=https://assignment1-ui1l.onrender.com

# ใส่ URL เดียวกันอีกครั้ง (ต้องมี NEXT_PUBLIC_ นำหน้า) (สำหรับใช้ฝั่ง Client-Side เช่น Form ใน Page 2)
NEXT_PUBLIC_API_URL=https://assignment1-ui1l.onrender.com
```

### 4. Run Server

```bash
npm run dev
```
เปิด Browser แล้วไปที่ http://localhost:3000