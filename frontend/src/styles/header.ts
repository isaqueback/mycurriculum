import styled from 'styled-components'

interface HeaderContainerProps {
  isSignin: boolean
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  background-color: ${(props) =>
    props.isSignin ? props.theme['yellow-100'] : 'transparent'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  overflow: hidden;
  position: relative;
  z-index: 1;

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
    transition: all 300ms ease-out;
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
          filter: contrast(500%);
        }
        
        &:visited {
          color: ${(props) => props.theme['gray-300']};
          
          &:hover {
            filter: contrast(500%);
          }
        }
      }
    }
  }

  @media (min-width: 1728px) {
    padding: 20px 30px;
    
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
