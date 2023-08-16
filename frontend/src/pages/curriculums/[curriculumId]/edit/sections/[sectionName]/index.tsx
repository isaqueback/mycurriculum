import { GetServerSideProps } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { useContext } from 'react'
import { AuthContext } from '@/src/contexts/AuthContext'

interface SectionProps {
  tokenUserId: number
  token: string
}

export default function Section({ tokenUserId, token }: SectionProps) {
  const { user } = useContext(AuthContext)

  return (
    <>
      <h1>Eu sou uma seção do editar currículo do usuário {user?.id}.</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'mycurriculum.token': token } = parseCookies(ctx)

  if (token) {
    try {
      const secret = process.env.CONFIG_AUTH_SECRET as string
      const { id: tokenUserId } = jwt.verify(token, secret) as JwtPayload

      return {
        props: {
          tokenUserId,
          token,
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
