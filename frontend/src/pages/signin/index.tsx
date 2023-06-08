import { SignInContainer } from '@/src/styles/pages/signin'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import authenticationIllustration from '../../assets/illustrations/authentication.gif'
import waveIllustration from '../../assets/illustrations/wave-haikei.svg'
import blobIllustration from '../../assets/illustrations/blob-haikei.svg'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'
import SignUp from './SignUp'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormType = z.infer<typeof loginFormSchema>

export default function SignIn() {
  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })
  const { signIn } = useContext(AuthContext)

  async function onSubmit(data: LoginFormType) {
    signIn(data)
  }

  return (
    <SignInContainer>
      <div>
        <Image src={waveIllustration} alt="" />
        <h1>QUE BOM TÊ-LO DE VOLTA!</h1>
        <p>sua presença nos alegra muito</p>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register('email')} type="email" placeholder="E-mail" />
              <input
                {...register('password')}
                type="password"
                placeholder="Senha"
              />
            </div>
            <button type="submit">ENTRAR</button>
          </form>
          <nav>
            <span>
              <Link href="/">Esqueceu a senha?</Link>
            </span>
            <SignUp />
          </nav>
        </div>
        <Image
          src={authenticationIllustration}
          width={804}
          alt="Uma ilustração de uma pessoa se autenticando"
        />
      </div>
      <div>
        <Image src={blobIllustration} alt="" />
      </div>
    </SignInContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'mycurriculum.token': token } = parseCookies(ctx)

  if (token) {
    try {
      const secret = process.env.CONFIG_AUTH_SECRET as string
      jwt.verify(token, secret)

      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    } catch (err) {
      destroyCookie(ctx, 'mycurriculum.token')
    }
  }

  return {
    props: {},
  }
}
