import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${(props) => props.theme['gray-100']};
    }
    
    body, input, textarea, button {
        font-family: 'Signika Negative', sans-serif;
        font-weight: 900;
    }

`
