import { FieldError } from 'react-hook-form'
import styled from 'styled-components'

interface BoxProps {
  email: FieldError | undefined
}

export const ForgotPasswordContainer = styled.div`
  span {
    font-size: 1.1rem;
    font-weight: 300;
    text-decoration: underline;
    color: ${(props) => props.theme['gray-300']};
    cursor: pointer;

    &:hover {
      filter: contrast(500%);
    }
  }

  @media (min-width: 1718px) {
    & > span {
      font-size: 1.25rem;
    }
  }
`

export const Box = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme['gray-100']};
  overflow: hidden auto;
  position: absolute;
  padding: 1.5rem 1rem;
  bottom: 0;
  outline: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: ${(props) => props.theme['gray-300']};
  overflow: hidden;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    padding-top: 3rem;

    h3 {
      font-size: 2rem;
    }

    p {
      font-size: 1.25rem;
      font-weight: 300;
      text-align: center;
    }

    img {
      width: 200px;
      height: 200px;
    }

    label {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: ${(props) => props.theme['gray-300']};
      font-weight: 300;
      align-self: flex-start;

      input {
        width: 100%;
        color: ${(props) => props.theme['gray-300']};
        background-color: ${(props) => props.theme['yellow-100']};
        border: none;
        outline: none;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        border: 1px solid transparent;
        transition: all 300ms ease-out;
        font-weight: 400;
        font-size: 1.25rem;

        &[type='email'],
        &[type='email']:focus {
          outline: 1px solid
            ${(props) => (props.email ? props.theme['red-400'] : '')};
        }

        &[type='email']:focus {
          border-color: ${(props) =>
            props.email ? 'transparent' : props.theme['gray-200']};
        }
      }
    }

    small {
      color: ${(props) => props.theme['red-400']};
      font-weight: 300;
    }

    button {
      width: 100%;
      background-color: ${(props) => props.theme['gray-100']};
      color: ${(props) => props.theme['red-400']};
      font-size: 1.4rem;
      font-weight: 400;
      padding: 0.5rem 1rem;
      border: 2px solid ${(props) => props.theme['red-400']};
      border-radius: 7px;
      cursor: ${(props) => (props.email ? 'not-allowed' : 'pointer')};
      transition: all 300ms ease-out;
      margin: 1rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: ${(props) =>
          props.email ? props.theme['red-400'] : props.theme['gray-100']};
        background-color: ${(props) =>
          props.email ? props.theme['gray-100'] : props.theme['red-400']};
      }
      border: 2px solid ${(props) => props.theme['red-400']};
    }
  }

  .submitted-email-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: ${(props) => props.theme['yellow-100']};

    div:first-child {
      padding: 1.5rem 1rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
      gap: 1rem;

      h3 {
        font-size: 2rem;
        color: ${(props) => props.theme['gray-300']};
        margin-top: 1rem;
      }

      p {
        font-size: 1.5rem;
        font-weight: 300;
        text-align: center;
        margin-top: 1rem;
      }
    }

    div:last-child {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      overflow: hidden;
      position: relative;
      padding-top: 40px;

      button {
        padding: 1.25rem 1.5rem;
        background-color: ${(props) => props.theme['yellow-100']};
        border: 1px solid ${(props) => props.theme['gray-400']};
        border-radius: 6px;
        cursor: pointer;
        transition: all 400ms ease-out;
        position: absolute;

        &:hover {
          background-color: ${(props) => props.theme['gray-400']};
          color: ${(props) => props.theme['yellow-100']};
        }

        a {
          color: ${(props) => props.theme['gray-400']};
          font-weight: 300;
          text-decoration: none;
        }
      }

      small {
        color: #00c1a2;
        font-weight: 300;
        justify-self: flex-end;
        transform: translateY(70px);
      }
    }
  }

  @media (min-width: 768px) {
    width: 60%;
    max-height: 730px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    form {
      h3 {
        font-size: 2.5rem;
      }

      p {
        margin: 1.5rem 0 1.5rem;
      }

      label {
        input {
          /* width: 100%; */
        }

        small {
          margin-bottom: 1rem; // Verificar os erros depois
        }
      }

      & > small {
        /* margin-top: 1.5rem; Verificar os erros depois*/
      }
    }

    .submitted-email-container {
      display: flex;
      flex-direction: column;

      div {
        justify-content: center;
      }
    }
  }

  @media (min-width: 1024px) {
    overflow: hidden auto;

    form {
      h3 {
        font-size: 3rem;
      }
      p {
        font-size: 1.5rem;
      }

      label {
        input {
          font-size: 1.25rem;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    max-height: 750px;

    form {
      p {
        font-size: 1.5rem;
      }

      label {
        span {
          font-size: 1.25rem;
        }
        input {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (min-width: 1718px) {
    max-width: 700px;
    max-height: 950px;
    padding: 1.5rem 4rem;
    border-radius: 10px;

    form {
      gap: 1.5rem;

      h3 {
        font-size: 3rem;
        display: block;
      }

      p {
        font-size: 1.75rem;
        text-align: center;
        margin: 0;
      }

      img {
        margin-top: 40px;
      }

      label {
        span {
          font-size: 1.3rem;
        }

        input {
          font-size: 2rem;
        }

        small {
          font-size: 1rem;
        }
      }

      button {
        font-size: 2rem;
      }

      & > small {
        font-size: 1rem;
      }
    }

    .submitted-email-container {
      div {
        transform: translateY(-40px);

        p {
          padding: 0 3rem 0;
        }
      }
    }
  }
`
