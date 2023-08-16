import { GetServerSideProps } from 'next'

export default function Sections() {
  return <h1>Todas as seções de editar currículo.</h1>
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('Eu sou as seções.')
  return {
    props: {},
  }
}
