import { parseCookies, setCookie } from 'nookies'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import axios, { AxiosError } from 'axios'
import { api } from '../lib/axios'
import Router from 'next/router'

interface SignInProps {
  email: string
  password: string
}

interface SignUpData {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

interface User {
  id: number
}

interface AuthContextType {
  isAuthenticated: boolean
  signIn: (props: SignInProps) => void
  signUp: (data: SignUpData) => Promise<void>
  user: User | null
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  isNotSuccessfulySubmitted: boolean
  setIsNotSuccessfullySubmitted: Dispatch<SetStateAction<boolean>>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isNotSuccessfulySubmitted, setIsNotSuccessfullySubmitted] =
    useState(true)
  const isAuthenticated = !!user

  async function getUser() {
    const { 'mycurriculum.token': token } = parseCookies()

    try {
      if (token) {
        const decoded = await api.get(`sessions/${token}`)
        const { data } = decoded
        const { id } = data

        setUser({ id })
      }
    } catch (err) {
      setUser(null)
    }
  }

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('sessions', { email, password })
      const { user, token } = response.data

      setCookie(undefined, 'mycurriculum.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      setUser(user)

      Router.push('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert('User password not match.')
      } else if (axios.isAxiosError(err) && err.response?.status === 404) {
        alert('User not found.')
      } else {
        alert('Something went wrong.')
      }
    }
  }

  async function signUp(data: SignUpData) {
    try {
      await api.post('users', data)

      if (isNotSuccessfulySubmitted) {
        setIsNotSuccessfullySubmitted((state) => !state)
      }
    } catch (err) {
      const axiosError = err as AxiosError

      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          setError('Este usuário já está em uso')
        } else {
          setError(
            'Não foi possível criar uma conta. Atualize a página e tente novamente mais tarde',
          )
        }
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde')
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signUp,
        user,
        error,
        setError,
        isNotSuccessfulySubmitted,
        setIsNotSuccessfullySubmitted,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
