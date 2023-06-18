import { FieldErrors } from 'react-hook-form'
import styled from 'styled-components'

interface ResetPasswordContainerProps {
  errors1: FieldErrors<{
    email: string
    token: string
    password: string
    passwordConfirmation: string
  }>
  errors2: FieldErrors<{
    email: string
    token: string
    password: string
    passwordConfirmation: string
  }>
}

export const ResetPasswordContainer = styled.main<ResetPasswordContainerProps>`
  min-height: calc(100vh - 45px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.25rem;
  color: ${(props) => props.theme['gray-300']};

  h3 {
    align-self: center;
    font-size: 2rem;
  }

  p {
    font-weight: 300;
    font-size: 1.25rem;
    text-align: justify;
  }

  img {
    width: 150px;
    height: 150px;
  }

  form {
    font-weight: 300;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

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
      }
    }

    small {
      color: ${(props) => props.theme['red-400']} !important;
    }

    button {
      background-color: ${(props) => props.theme['gray-100']};
      color: ${(props) => props.theme['red-400']};
      font-size: 1.4rem;
      font-weight: 400;
      padding: 0.5rem 1rem;
      border: 2px solid ${(props) => props.theme['red-400']};
      border-radius: 7px;
      transition: all 300ms ease-out;
      margin: 1rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: ${({ errors1 }) =>
        errors1.email || errors1.password || errors1.passwordConfirmation
          ? 'not-allowed'
          : 'pointer'};

      &:hover {
        color: ${({ errors1, theme }) =>
          errors1.email || errors1.password || errors1.passwordConfirmation
            ? theme['red-400']
            : theme['gray-100']};
        background-color: ${({ errors1, theme }) =>
          errors1.email || errors1.password || errors1.passwordConfirmation
            ? theme['gray-100']
            : theme['red-400']};
      }
    }
  }

  & > div {
    display: none;
  }

  @media (min-width: 768px) {
    justify-content: center;
    align-items: center;
    padding: 1.5rem 6rem;

    h3 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.5rem;
    }

    img {
    }
  }

  @media (min-width: 1024px) {
    align-items: center;
    justify-content: center;
    padding: 4rem 6rem;

    & > h3 {
      display: none;
    }

    & > p {
      display: none;
    }

    & > img {
      width: 300px;
      height: 300px;
      display: none;
    }

    & > form {
      display: none;

      label {
        input {
          font-size: 1.25rem;
        }
      }
    }

    & > div {
      display: flex;
      width: 100%;
      align-items: center;
      transform: translateY(-40px);

      form {
        width: 50%;
        gap: 1rem;

        h3 {
          font-size: 3rem;
        }

        p {
          font-size: 1.5rem;
          text-align: justify;
          margin-bottom: 1rem;
        }

        button {
          cursor: ${({ errors2 }) =>
            errors2.email || errors2.password || errors2.passwordConfirmation
              ? 'not-allowed'
              : 'pointer'};

          &:hover {
            color: ${({ errors2, theme }) =>
              errors2.email || errors2.password || errors2.passwordConfirmation
                ? theme['red-400']
                : theme['gray-100']};
            background-color: ${({ errors2, theme }) =>
              errors2.email || errors2.password || errors2.passwordConfirmation
                ? theme['gray-100']
                : theme['red-400']};
          }
        }
      }

      img {
        width: 50%;
        height: 100%;
        transform: scale(0.8);
        object-fit: contain;
      }
    }
  }

  @media (min-width: 1280px) {
    & > div {
      form {
        label {
          span {
            font-size: 1.25rem;
          }

          input {
            font-size: 1.5rem;
          }
        }
      }

      img {
        transform: scale(0.7);
      }
    }
  }

  @media (min-width: 1718px) {
    & > div {
      max-width: 1500px;

      form {
        p {
          font-size: 1.75rem;
        }

        small {
          font-size: 1rem;
        }
      }

      img {
        transform: scale(0.6);
      }
    }
  }
`
