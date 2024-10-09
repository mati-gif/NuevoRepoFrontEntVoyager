import React from 'react'
import { Loader2 } from "lucide-react"

function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff31]">
      <div className="p-8 bg-yellow-500  rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 font-bold text-blue-500 animate-spin" />
          <p className="text-xl font-semibold text-black">Cargando...</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingAnimation