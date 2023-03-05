import styled, { css } from 'styled-components'

interface HeaderContainerProps {
  isHeaderLogoVisible: boolean
  isHeaderNavVisible: boolean
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
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
    opacity: ${({ isHeaderLogoVisible }) => {
    return (
      isHeaderLogoVisible ? css`1` : css`0`
    )
  }};
    transform: ${({ isHeaderLogoVisible }) => {
    return (
      isHeaderLogoVisible ? css`translateX(0px)` : css`translateX(-50px)`
    )
  }};
    transition: all 400ms ease-out, transform 400ms cubic-bezier(0,1.06,.21,1.44);

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
    opacity: ${({ isHeaderNavVisible }) => {
    return (
      isHeaderNavVisible ? css`1` : css`0`
    )
  }};
    transform: ${({ isHeaderNavVisible }) => {
    return (
      isHeaderNavVisible ? css`translateY(0px)` : css`translateY(-30px)`
    )
  }};
    transition: all 400ms ease-out, transform 400ms cubic-bezier(0,1.06,.21,1.44);
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
