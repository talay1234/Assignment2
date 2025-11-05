import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from './context/ConfigContext';
import NavMenu from './components/NavMenu';
import axios from 'axios';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Drone UI - Assignment 2",
  description: "UI for Drone API (Assignment #2)",
};

async function getDroneConfig() {
  const DRONE_ID = process.env.DRONE_ID;
  const API_URL = process.env.API_URL;

  // ป้องกัน Error ตอน Build
  if (!DRONE_ID || !API_URL) {
    console.error("Missing DRONE_ID or API_URL in .env");
    return null;
  }
  
  console.log(`Fetching config for DRONE_ID: ${DRONE_ID} from ${API_URL}`);

  try {
    const res = await axios.get(`${API_URL}/configs/${DRONE_ID}`);
    return res.data; // คืนค่า config ที่ได้
  } catch (error) {
    console.error("CRITICAL: Failed to fetch drone config!", error.message);
    return null; // คืนค่า null
  }
}

export default async function RootLayout({ children }) {
  const config = await getDroneConfig();

  return (
    <html lang="en" className="bg-[#AFDCCD]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider config={config}>
          
          <NavMenu /> {/* แสดงเมนู */}
          
          <main className="container mx-auto p-4">
            {config ? (
              children 
            ) : (
              <div className="text-red-500 font-bold">
                <h2>Error: Could not load drone config.</h2>
                <p>Please check if Assignment #1 API is running and .env.local is correct.</p>
              </div>
            )}
          </main>

        </ConfigProvider>
      </body>
    </html>
  );
}
