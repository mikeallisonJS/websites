'use client'

import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  MusicState,
  MusicStore,
  MusicStoreProps,
  createMusicStore
} from './store'

export const MusicPlayerContext = createContext<MusicStore | null>(null)

type MusicPlayerProviderProps = React.PropsWithChildren<MusicStoreProps>

export function MusicPlayerProvider({
  children,
  ...props
}: Partial<MusicPlayerProviderProps>) {
  const storeRef = useRef<MusicStore>()
  if (!storeRef.current) {
    storeRef.current = createMusicStore(props)
  }
  return (
    <MusicPlayerContext.Provider value={storeRef.current}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayerContext<T>(
  selector: (state: MusicState) => T
): T {
  const store = useContext(MusicPlayerContext)
  if (!store) throw new Error('Missing MusicPlayerContext in the tree')
  return useStore(store, selector)
}
