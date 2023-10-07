import { GetServerSideProps } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SectionContainer } from '@/src/styles/pages/curriculums/section'
import InputsForm from './InputsForm'
import { useContext, useEffect } from 'react'
import { CurriculumContext } from '@/src/contexts/CurriculumContext'
import { useRouter } from 'next/router'

interface SectionProps {
  tokenUserId: number | Number
  token: string
  curriculumId: number
}

export default function Section({
  tokenUserId,
  token,
  curriculumId,
}: SectionProps) {
  const { getCurriculum } = useContext(CurriculumContext)
  const router = useRouter()

  useEffect(() => {
    async function hasThisCurriculum(curriculumId: number) {
      const curriculum = await getCurriculum({
        userId: tokenUserId,
        token,
        curriculumId,
      })

      if (curriculum.length === 0) router.push('/curriculums')
    }

    hasThisCurriculum(curriculumId)
  }, [getCurriculum, router, token, tokenUserId, curriculumId])
  return (
    <SectionContainer>
      <button className="preview-curriculum-button">
        <span>Pré-visualizar currículo</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
        </svg>
      </button>
      <InputsForm
        tokenUserId={tokenUserId}
        token={token}
        curriculumId={curriculumId}
      />
    </SectionContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sectionNames = [
    'templates',
    'personal-data',
    'abilities',
    'languages',
    'about-me',
    'professional-experiences',
    'educations',
    'custom-topics',
  ]

  const sectionName =
    typeof ctx.query.sectionName === 'string' ? ctx.query.sectionName : ''

  const isSectionNameValid = sectionNames.includes(sectionName)

  const curriculumId =
    typeof ctx.query.curriculumId === 'string' ? ctx.query.curriculumId : ''

  const regex = /^[0-9]+$/

  const isCurriculumIdValid = regex.test(curriculumId)

  if (!isCurriculumIdValid || !isSectionNameValid) {
    return {
      redirect: {
        destination: '/curriculums',
        permanent: false,
      },
    }
  }

  const { 'mycurriculum.token': token } = parseCookies(ctx)

  if (token) {
    try {
      const secret = process.env.CONFIG_AUTH_SECRET as string
      const { id: tokenUserId } = jwt.verify(token, secret) as JwtPayload

      return {
        props: {
          tokenUserId,
          token,
          curriculumId: parseInt(curriculumId),
        },
      }
    } catch (err) {
      destroyCookie(ctx, token)

      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      }
    }
  }

  return {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  }
}
