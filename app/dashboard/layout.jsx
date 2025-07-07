import React from 'react'
import Header from './_componenets/Header'

function DashboardLayout({children}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout