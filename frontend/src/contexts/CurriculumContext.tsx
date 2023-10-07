import { ReactNode, createContext, useContext } from 'react'
import { api } from '../lib/axios'
import { AuthContext } from './AuthContext'
import Router from 'next/router'
import { parseCookies } from 'nookies'

interface GetCurriculumProps {
  userId: number | Number
  curriculumId?: number
  search?: string
  amount?: number
  page?: number
  token: string
}

interface CountCurriculumsProps {
  userId: number | Number
  search?: string
  token: string
}

// Preciso tipar direito os objetos do CurriculumType
export interface CurriculumType {
  about_me: String
  address: string
  cell_phone: string
  createdAt: string
  custom_personal_datum_1: object
  custom_personal_datum_2: object
  custom_topic_1: object
  custom_topic_2: object
  dribbble: string
  drivers_license: string
  educations: object[]
  email: string
  facebook: string
  github: string
  id: number
  languages: object[]
  linkedin: string
  name: string
  professional_experiences: object[]
  role: string
  skills: string[]
  telephone: string
  twitter: string
  updatedAt: string
  user_id: number
  youtube: string
}

interface GetTemplateProps {
  tokenUserId: number | Number
  templateId?: number
  amount?: number
  page?: number
  token: string
}

interface CountTemplatesProps {
  userId: number | Number
  token: string
}

export interface TemplateType {
  id: number
  name: string
  size: number
  key: string
  url: string
  folder_name: string
  createdAt: string
  updatedAt: string
  user_id: number
}

interface CurriculumContextType {
  createCurriculum: () => Promise<void>
  getCurriculum: (info: GetCurriculumProps) => Promise<CurriculumType[] | []>
  countCurriculums: (info: CountCurriculumsProps) => Promise<number>
  getTemplate: (info: GetTemplateProps) => Promise<TemplateType[] | []>
  countTemplates: (info: CountTemplatesProps) => Promise<number>
}

interface CurriculumProviderProps {
  children: ReactNode
}

export const CurriculumContext = createContext({} as CurriculumContextType)

export function CurriculumProvider({ children }: CurriculumProviderProps) {
  const { user, signOut } = useContext(AuthContext)

  async function createCurriculum() {
    try {
      const { 'mycurriculum.token': token } = parseCookies()

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const response = await api.post(
        `/users/${user?.id}/curriculums`,
        {
          name: 'Novo Currículo',
        },
        config,
      )

      const { curriculum_id: curriculumId } = response.data

      Router.push(`/curriculums/${curriculumId}/edit/sections/templates`)
    } catch (err: any) {
      const errDetails = err.response.data.details
      if (errDetails === 'Not allowed creating curriculum for free users.') {
        Router.push('/curriculums')
      } else {
        signOut('mycurriculum.token')

        Router.push('/signin')
      }
    }
  }

  async function getCurriculum({
    userId,
    curriculumId,
    search,
    amount,
    page,
    token,
  }: GetCurriculumProps): Promise<CurriculumType[] | []> {
    try {
      let queryString = `/users/${userId}/curriculums`
      let curriculum

      if (curriculumId) {
        queryString += `/${curriculumId}`

        curriculum = await api.get(queryString, {
          headers: { Authorization: `Bearer ${token}` },
        })

        return curriculum.data
      } else if (search) {
        queryString += `?search=${encodeURIComponent(search)}`
      }

      queryString += queryString.includes('?') ? '&' : '?'

      amount ? (queryString += `amount=${amount}`) : (queryString += `amount=2`)
      page ? (queryString += `&page=${page}`) : (queryString += `&page=1`)

      curriculum = await api.get(queryString, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return curriculum.data
    } catch (err) {
      return []
    }
  }

  async function countCurriculums({
    userId,
    search,
    token,
  }: CountCurriculumsProps) {
    let length = 0
    let routeName = `/users/${userId}/curriculums/count`

    if (search) routeName += `?search=${encodeURIComponent(search)}`

    try {
      const response = await api.get(routeName, {
        headers: { Authorization: `Bearer ${token}` },
      })

      length = response.data.count
    } catch (err) {}

    return length
  }

  async function getTemplate({
    tokenUserId,
    templateId,
    amount,
    page,
    token,
  }: GetTemplateProps): Promise<TemplateType[] | []> {
    try {
      let url = `/users/${tokenUserId}/files?folderName=templates`

      if (templateId) {
        url += `&id=${templateId}`

        const template = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        return template.data
      } else {
        if (amount) url += `&amount=${amount}`

        url += `&page=${page || 1}`

        const templates = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        return templates.data
      }
    } catch (err) {
      return []
    }
  }

  async function countTemplates({ userId, token }: CountTemplatesProps) {
    let length = 0
    const url = `/users/${userId}/files/count?folderName=templates`

    try {
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      length = response.data.count
    } catch (err) {}

    return length
  }

  return (
    <CurriculumContext.Provider
      value={{
        createCurriculum,
        getCurriculum,
        countCurriculums,
        getTemplate,
        countTemplates,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  )
}
