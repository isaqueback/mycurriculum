import { DashboardContainer } from '@/src/styles/pages/dashboard'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { parseCookies, destroyCookie } from 'nookies'
import jwt from 'jsonwebtoken'
import magnifyingGlassIllustration from '@/src/assets/illustrations/magnifying-glass.svg'
import { useState } from 'react'
import Curriculum from './Curriculum'

export default function Dashboard() {
  const [searchHovered, setSearchHovered] = useState(false)

  const handleSearchHoverEnter = () => {
    setSearchHovered(true)
  }
  const handleSearchHoverLeave = () => {
    setSearchHovered(false)
  }
  return (
    <DashboardContainer searchHovered={searchHovered}>
      <form>
        <label htmlFor="search">
          <svg
            onMouseEnter={handleSearchHoverEnter}
            onMouseLeave={handleSearchHoverLeave}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </label>
        <Image
          src={magnifyingGlassIllustration}
          alt="Ilustração de uma lupa"
          onMouseEnter={handleSearchHoverEnter}
        />
        <input
          id="search"
          type="text"
          placeholder="Procurar currículo"
          onMouseEnter={handleSearchHoverEnter}
          onMouseLeave={handleSearchHoverLeave}
        />
      </form>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
        </svg>
        <span>Criar Currículo</span>
      </button>
      <div className="curriculum-container">
        <Curriculum
          name="Isaque da Costa Delfino"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Naruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
        <Curriculum
          name="Boruto Uzumaki"
          createdAt={new Date()}
          updatedAt={new Date()}
        />
      </div>
      <button>Mostrar mais (5)</button>
    </DashboardContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'mycurriculum.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  try {
    const secret = process.env.CONFIG_AUTH_SECRET as string
    jwt.verify(token, secret)
  } catch (err) {
    destroyCookie(ctx, 'mycurriculum.token')

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
