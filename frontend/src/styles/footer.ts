import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme['gray-300']};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding-top: 115px;
  width: 100%;
  position: relative;

  & > a:first-child {
    display: flex;
    align-items: center;
    gap: 11px;
    font-weight: 700;
    text-decoration: none;
    color: ${(props) => props.theme['gray-100']};

    &:visited: {
      color: ${(props) => props.theme['gray-100']};
    }

    h5 {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: center;

    a {
      font-weight: 300;
      font-size: 1rem;
      color: ${(props) => props.theme['gray-200']};
      text-decoration: none;
      transition: all 200ms ease-in-out;

      &:hover {
        color: ${(props) => props.theme['gray-100']};
      }

      &:visited: {
        font-weight: 300;
        font-size: 1.25rem;
        color: ${(props) => props.theme['gray-200']};
      }
    }
  }

  & > div:last-child {
    font-size: 1rem;
    color: ${(props) => props.theme['gray-100']};
    font-weight: 300;
    display: flex;
    align-items: flex-start;

    img {
      width: 19px;
      height: 17px;
    }

    small {
      font-size: 0.83rem;

      strong {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (min-width: 768px) {
    display: grid;
    padding: 175px 30px 15px;
    gap: 35px;

    nav {
      flex-direction: row;
      justify-content: center;
      gap: 60px;
    }

    div {
      margin-top: 10px;
      justify-self: center;
    }
  }

  @media (min-width: 1024px) {
    & > a:first-child {
      h5 {
        font-size: 1.5rem;
      }
    }

    nav {
      a {
        font-size: 1.25rem;
      }
    }
  }
`
