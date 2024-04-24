'use client'

import { createContext } from 'react'
import {
  MusicState,
  MusicStore,
  MusicStoreProps,
  createMusicStore
} from './store'

export const MusicPlayerContext = createContext<MusicStore | null>(null)

import { useRef } from 'react'

type MusicPlayerProviderProps = React.PropsWithChildren<MusicStoreProps>

export function MusicPlayerProvider({
  children,
  ...props
}: MusicPlayerProviderProps) {
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

import { useContext } from 'react'
import { useStore } from 'zustand'

export function useMusicPlayerContext<T>(
  selector: (state: MusicState) => T
): T {
  const store = useContext(MusicPlayerContext)
  if (!store) throw new Error('Missing MusicPlayerContext in the tree')
  return useStore(store, selector)
}
