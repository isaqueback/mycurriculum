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
        padding-top: 10px;

        @media (min-width: 1728px) {
            padding-top: 20px;
        }
    }
    
    body, input, textarea, button {
        font-family: 'Signika Negative', sans-serif;
        font-weight: 900;
    }

`
