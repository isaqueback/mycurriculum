import { GlobalStyle } from '@/src/styles/global'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <GlobalStyle />
      </AuthProvider>
    </ThemeProvider>
  )
}
