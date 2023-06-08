import styled from 'styled-components'
import { FieldError } from 'react-hook-form'

interface BoxProps {
  fullname: FieldError | undefined
  email: FieldError | undefined
  password: FieldError | undefined
  passwordConfirmation: FieldError | undefined
  isError: boolean
  isCreatingAccount: boolean
}

export const SignUpContainer = styled.div`
  cursor: pointer;

  span {
    font-size: 1.1rem;
    font-weight: 300;
    color: ${(props) => props.theme['gray-300']};
    transition: all 300ms ease-out;
    text-decoration: underline;

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
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  padding: 1.5rem 1rem;
  bottom: 0;
  outline: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    & > div:first-child {
      width: 100%;
      align-self: flex-end;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: relative;
    }

    h3 {
      font-size: 2rem;
      color: ${(props) => props.theme['gray-300']};
    }

    p {
      color: ${(props) => props.theme['gray-300']};
      font-size: 1.25rem;
      font-weight: 300;
      margin: 5px 0 10px;
      text-align: center;
    }

    label {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: ${(props) => props.theme['gray-300']};
      font-weight: 300;

      input {
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

        &[type='text'],
        &[type='text']:focus {
          outline: 1px solid
            ${(props) => (props.fullname ? props.theme['red-400'] : '')};
        }

        &[type='text']:focus {
          border-color: ${(props) =>
            props.fullname ? 'transparent' : props.theme['gray-200']};
        }

        &[type='email'],
        &[type='email']:focus {
          outline: 1px solid
            ${(props) => (props.email ? props.theme['red-400'] : '')};
        }

        &[type='email']:focus {
          border-color: ${(props) =>
            props.email ? 'transparent' : props.theme['gray-200']};
        }

        &#password,
        &#password:focus {
          outline: 1px solid
            ${(props) => (props.password ? props.theme['red-400'] : '')};
        }

        &#password:focus {
          border-color: ${(props) =>
            props.password ? 'transparent' : props.theme['gray-200']};
        }

        &#password-confirmation,
        &#password-confirmation:focus {
          outline: 1px solid
            ${(props) =>
              props.passwordConfirmation ? props.theme['red-400'] : ''};
        }

        &#password-confirmation:focus {
          border-color: ${(props) =>
            props.passwordConfirmation
              ? 'transparent'
              : props.theme['gray-200']};
        }
      }

      small {
        color: ${(props) => props.theme['red-400']} !important;
      }
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
      cursor: ${(props) =>
        props.isError || props.isCreatingAccount ? 'not-allowed' : 'pointer'};
      transition: all 300ms ease-out;
      margin: 1rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        display: ${(props) => (props.isCreatingAccount ? 'block' : 'none')};
        color: ${(props) => props.theme['red-400']};
        width: 25px !important;
        height: 25px !important;
      }

      &:hover {
        color: ${(props) =>
          props.isError || props.isCreatingAccount
            ? props.theme['red-400']
            : props.theme['gray-100']};
        background-color: ${(props) =>
          props.isError || props.isCreatingAccount
            ? props.theme['gray-100']
            : props.theme['red-400']};
        border: 2px solid
          ${(props) =>
            props.isError || props.isCreatingAccount
              ? props.theme['red-400']
              : props.theme['gray-100']};
      }
    }

    & > small {
      color: ${(props) => props.theme['red-400']};
      font-weight: 300;
      margin-bottom: 2rem;
      text-align: center;
    }
  }

  .submitted-email-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
      justify-content: center;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      position: relative;

      button {
        padding: 1.25rem 1.5rem;
        background-color: ${(props) => props.theme['yellow-100']};
        border: 1px solid ${(props) => props.theme['gray-400']};
        border-radius: 6px;
        cursor: pointer;
        transition: all 400ms ease-out;
        position: absolute;
        top: 0;

        &:hover {
          background-color: ${(props) => props.theme['gray-400']};

          a {
            color: ${(props) => props.theme['yellow-100']};
          }
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
          width: 100%;
        }

        small {
          margin-bottom: 1rem;
        }
      }

      & > small {
        margin-top: 1.5rem;
      }
    }
  }

  @media (min-width: 1024px) {
    h3 {
      font-size: 3rem;
      margin-top: ${(props) => (props.isError ? '0' : '1rem')};
    }
    form {
      p {
        font-size: 1.5rem;
        margin: 2rem 0;
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

    .submitted-email-container {
      div {
        justify-content: center;
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

export const CloseButton = styled.div`
  width: 30px;
  height: 28px;
  margin-left: auto;
  border-radius: 100%;
  cursor: pointer;
  position: fixed;
  right: 20px;
  z-index: 1;

  span {
    position: relative;
    z-index: 0;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 1.5px;
      border-radius: 6px;
      background-color: ${(props) => props.theme['gray-450-80%']};
      transition: all 300ms ease-in;
    }

    &::before {
      transform: rotate(135deg) translate(11px, -13px);
    }

    &::after {
      transform: rotate(45deg) translate(14px, 10px);
    }
  }

  &:hover {
    span {
      &::before {
        background-color: ${(props) => props.theme['gray-450']};
        transform: rotate(225deg) translate(-13px, -10px);
      }

      &::after {
        background-color: ${(props) => props.theme['gray-450']};
        transform: rotate(-45deg) translate(-11px, 13px);
      }
    }
  }
`
