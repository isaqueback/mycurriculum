import { GlobalStyle } from '@/src/styles/global'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'
import { CurriculumProvider } from '../contexts/CurriculumContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <CurriculumProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <GlobalStyle />
        </CurriculumProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
