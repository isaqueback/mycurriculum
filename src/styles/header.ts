import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  & > a {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    text-decoration: none;

    svg {
      fill: ${(props) => props.theme['red-400']};
      width: 27.97px;
      height: 25px;
    }

    h1 {
      color: ${(props) => props.theme['red-400']};
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  nav {
    display: none;
  }

  @media (min-width: 768px) {
    nav {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      gap: 40px;

      a {
        color: ${(props) => props.theme['gray-300']};
        text-decoration: none;
        font-weight: 300;
        font-size: 1rem;

        &:hover {
          color: ${(props) => props.theme.black};
        }

        &:visited {
          color: ${(props) => props.theme['gray-300']};

          &:hover {
            color: ${(props) => props.theme.black};
          }
        }
      }
    }
  }

  @media (min-width: 1728px) {
    padding: 0 30px;
    
    & > a {
      svg {
        width: 49.22px
        height: 44px;
      }

      h1 {
        font-size: 2.25rem;
      }
    }

    nav {
      a {
        font-size: 1.25rem;
      }
    }
  }
`
