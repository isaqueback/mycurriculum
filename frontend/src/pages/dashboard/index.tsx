import { DashboardContainer } from '@/src/styles/pages/dashboard'
import { GetServerSideProps } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import jwt from 'jsonwebtoken'

export default function Dashboard() {
  return (
    <DashboardContainer>
      <h1>Eu sou um dashboard. Somente usuários logados poderão ver isso.</h1>
    </DashboardContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'mycurriculum.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const secret = process.env.CONFIG_AUTH_SECRET as string
    jwt.verify(token, secret)
  } catch (err) {
    console.log('oi')
    destroyCookie(ctx, 'mycurriculum.token')

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
