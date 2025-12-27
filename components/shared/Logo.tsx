import { Car } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div className="hidden sm:block">
          <span className="text-xl font-bold text-gray-900">Afrozon</span>
          <span className="text-xl font-light text-emerald-600"> AutoGlobal</span>
        </div>
      </Link>
    </div>
  )
}
