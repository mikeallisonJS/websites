'use client'

import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

import {
  type MusicState,
  type MusicStore,
  type MusicStoreProps,
  createMusicStore
} from './store'

export const MusicPlayerContext = createContext<MusicStore | null>(null)

type MusicPlayerProviderProps = React.PropsWithChildren<MusicStoreProps>

export function MusicPlayerProvider({
  children,
  ...props
}: Partial<MusicPlayerProviderProps>) {
  const storeRef = useRef<MusicStore>(null)
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
