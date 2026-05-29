"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

type DemoUser = {
  name: string
  email: string
  password: string
  workspaces: { id: string; name: string }[]
  currentWorkspaceId?: string | null
}

type DemoAuthContext = {
  user: DemoUser | null
  loading: boolean
  error?: string | null
  signup: (payload: { name: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>
  login: (payload: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  createWorkspace: (name: string) => { id: string; name: string } | null
  switchWorkspace: (id: string) => void
}

const DemoAuthContext = React.createContext<DemoAuthContext | undefined>(undefined)

const USERS_KEY = 'demo_users_v1'
const SESSION_KEY = 'demo_session_v1'

function readUsers(): Record<string, DemoUser> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeUsers(users: Record<string, DemoUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession(): { email?: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSession(session: { email?: string } | null) {
  if (!session) return localStorage.removeItem(SESSION_KEY)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = React.useState<DemoUser | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setLoading(true)
    try {
      const session = readSession()
      const users = readUsers()
      if (session?.email && users[session.email]) {
        setUser(users[session.email])
      }
    } catch (err) {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 300))
    try {
      const users = readUsers()
      if (users[email]) {
        setError('Account already exists for this email')
        return { success: false, error: 'exists' }
      }
      const workspace = { id: `ws_${Date.now()}`, name: `${name}'s Workspace` }
      const newUser: DemoUser = { name, email, password, workspaces: [workspace], currentWorkspaceId: workspace.id }
      users[email] = newUser
      writeUsers(users)
      writeSession({ email })
      setUser(newUser)
      router.push('/dashboard')
      return { success: true }
    } catch (err) {
      setError('Unable to create account')
      return { success: false, error: 'failed' }
    } finally {
      setLoading(false)
    }
  }

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 200))
    try {
      const users = readUsers()
      const existing = users[email]
      if (!existing || existing.password !== password) {
        setError('Invalid credentials')
        return { success: false, error: 'invalid' }
      }
      writeSession({ email })
      setUser(existing)
      router.push('/dashboard')
      return { success: true }
    } catch {
      setError('Unable to sign in')
      return { success: false, error: 'failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    writeSession(null)
    setUser(null)
    router.push('/auth/login')
  }

  const createWorkspace = (name: string) => {
    if (!user) return null
    const users = readUsers()
    const me = users[user.email]
    if (!me) return null
    const ws = { id: `ws_${Date.now()}`, name }
    me.workspaces = [...me.workspaces, ws]
    me.currentWorkspaceId = ws.id
    users[user.email] = me
    writeUsers(users)
    setUser(me)
    return ws
  }

  const switchWorkspace = (id: string) => {
    if (!user) return
    const users = readUsers()
    const me = users[user.email]
    if (!me) return
    me.currentWorkspaceId = id
    users[user.email] = me
    writeUsers(users)
    setUser(me)
  }

  return (
    <DemoAuthContext.Provider value={{ user, loading, error, signup, login, logout, createWorkspace, switchWorkspace }}>
      {children}
    </DemoAuthContext.Provider>
  )
}

export function useDemoAuth() {
  const ctx = React.useContext(DemoAuthContext)
  if (!ctx) throw new Error('useDemoAuth must be used within DemoAuthProvider')
  return ctx
}
