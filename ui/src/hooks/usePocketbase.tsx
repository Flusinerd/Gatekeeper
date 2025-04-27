import React, { useContext } from 'react'
import Pocketbase from 'pocketbase'

const PocketbaseContext = React.createContext<Pocketbase | null>(null)

export const usePocketbase = () => {
  const context = useContext(PocketbaseContext)
  if (!context) {
    throw new Error('usePocketbase must be used within a PocketbaseProvider')
  }
  return context
}

export const PocketbaseProvider: React.FC<{
  children: React.ReactNode
  client: Pocketbase
}> = ({ children, client: pb }) => {
  return (
    <PocketbaseContext.Provider value={pb}>
      {children}
    </PocketbaseContext.Provider>
  )
}
