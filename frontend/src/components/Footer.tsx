import Link from 'next/link'
import Image from 'next/image'
import { FooterContainer } from '../styles/footer'
import logotype from '../assets/icons/scroll-solid 1.svg'
import heart from '../assets/icons/heart.svg'

export function Footer() {
  return (
    <FooterContainer>
      <Link href="/">
        <Image src={logotype} alt="Logotipo no rodapé." />
        <h5>MyCurriculum</h5>
      </Link>
      <nav>
        <Link href="/">Currículos</Link>
        <Link href="/">Preços</Link>
        <Link href="/">FAQ</Link>
        <Link href="/">Sobre nós</Link>
      </nav>
      <div>
        <small>Este site foi desenvolvido com </small>
        <Image src={heart} alt="Coração" />
        <small>
          {' '}
          por <strong>Isaque Delfino</strong>
        </small>
      </div>
    </FooterContainer>
  )
}
