import Link from 'next/link'
import { HeaderContainer } from '../styles/header'
import { BurgerMenu } from './BurgerMenu'
import { useContext } from 'react'
import { AnimationContext } from '../contexts/AnimationContext'

export function Header() {
  const { toggleElementsAnimation } = useContext(AnimationContext)
  const { areElementsAnimated, animatedElements } = toggleElementsAnimation()

  return (
    <HeaderContainer isHeaderLogoVisible={areElementsAnimated[11].isHeaderLogoVisible} isHeaderNavVisible={areElementsAnimated[12].isHeaderNavVisible}>
      <Link href="/" ref={animatedElements[11].headerLogo}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          {/* Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
          <path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z" />
        </svg>
        <h1>MyCurriculum</h1>
      </Link>
      <nav ref={animatedElements[12].headerNav}>
        <Link href="/">Fazer meu currículo</Link>
        <Link href="/">Modelos</Link>
        <Link href="/">Sign-in/Sign-up</Link>
      </nav>
      <BurgerMenu headerBurgerMenu={animatedElements[13].headerBurgerMenu} isHeaderBurgerMenuVisible={areElementsAnimated[13].isHeaderBurgerMenuVisible} />
    </HeaderContainer>
  )
}
