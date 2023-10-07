import Link from 'next/link'
import { HeaderContainer } from '../styles/header'
import { SideBarNavigation } from './SideBarNavigation'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function Header() {
  const { isAuthenticated } = useContext(AuthContext)

  const router = useRouter()
  const route = router.route

  const isHome = route === '/'
  const isSignin = route.substring(1) === 'signin'
  const isCurriculums = route.substring(1) === 'curriculums'
  const isSection = !!router.query.sectionName
  const isSections = route.substring(1).includes('/sections') && !isSection

  const isInsideAccount =
    isAuthenticated && route !== '/' && route !== '/signin'

  return (
    <HeaderContainer isSignin={isSignin} isInsideAccount={isInsideAccount}>
      <Link href="/">
        {(isHome || isSignin) && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            {/* Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
            <path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z" />
          </svg>
        )}
        <h1>
          {(isHome || isSignin) && 'MyCurriculum'}
          {isCurriculums && 'Meus Currículos'}
          {isSections && 'Editar Currículo'}
          {isSection && 'Editar Currículo'}
        </h1>
      </Link>
      <nav>
        <Link href={isAuthenticated ? '/curriculums' : '/signin'}>
          Fazer meu currículo
        </Link>
        <Link href="/">Modelos</Link>
        {!isSignin && <Link href="/signin"> Sign-in/Sign-up</Link>}
      </nav>
      <SideBarNavigation />
    </HeaderContainer>
  )
}
