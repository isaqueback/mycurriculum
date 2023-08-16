import { parseCookies, setCookie, destroyCookie } from 'nookies'
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

interface SignUpProps {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

interface ForgotPasswordProps {
  email: string
}

interface ResetPasswordProps {
  email: string
  token: string
  password: string
  passwordConfirmation: string
}

interface User {
  id: number
}

interface AuthContextType {
  isAuthenticated: boolean
  signIn: (props: SignInProps) => void
  signOut: (tokenName: string) => void
  signUp: (data: SignUpProps) => Promise<void>
  user: User | null
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  isNotSuccessfulySubmitted: boolean
  setIsNotSuccessfullySubmitted: Dispatch<SetStateAction<boolean>>
  forgotPassword: (data: ForgotPasswordProps) => Promise<void>
  resetPassword: (data: ResetPasswordProps) => Promise<void>
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

      Router.push('/curriculums')
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

  function signOut(tokenName: string) {
    destroyCookie(undefined, tokenName)
  }

  async function signUp(data: SignUpProps) {
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

  async function forgotPassword(data: ForgotPasswordProps) {
    try {
      await api.post('users/forgot-password', data)
    } catch (err) {}
  }

  async function resetPassword(data: ResetPasswordProps) {
    await api.post('users/reset-password', data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        user,
        error,
        setError,
        isNotSuccessfulySubmitted,
        setIsNotSuccessfullySubmitted,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
