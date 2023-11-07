import Image from 'next/image'
import { Inter } from 'next/font/google'
import Todos from '@/components/Todos'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <Todos/> */}
      <Post/>
    </main>
  )
}
