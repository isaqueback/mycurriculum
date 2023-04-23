import { SigninContainer } from '@/src/styles/pages/signin'
import Link from 'next/link'
import Image from 'next/image'
import authenticationIllustration from '../../assets/illustrations/authentication.gif'
import waveIllustration from '../../assets/illustrations/wave-haikei.svg'
import blobIllustration from '../../assets/illustrations/blob-haikei.svg'

export default function Signin() {
  return (
    <SigninContainer>
      <div>
        <Image src={waveIllustration} alt="" />
        <h1>QUE BOM TÊ-LO DE VOLTA!</h1>
        <p>sua presença nos alegra muito</p>
      </div>
      <div>
        <div>
          <form>
            <div>
              <input type="email" placeholder="E-mail" />
              <input type="password" placeholder="Senha" />
            </div>
            <button type="submit">ENTRAR</button>
          </form>
          <nav>
            <span>
              <Link href="/">Esqueceu a senha?</Link>
            </span>
            <span>
              <Link href="/">Não tem conta?</Link>
            </span>
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
    </SigninContainer>
  )
}
