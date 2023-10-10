import styled from 'styled-components'

export const AbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      position: relative;

      span {
        font-size: 1.22rem;
        font-weight: 400;
        color: ${(props) => props.theme['gray-450-50%']};
        padding: 0 7px;
      }

      div {
        input {
          background-color: ${(props) => props.theme.white};
          outline: none;
          padding: 10px 50px 10px 15px;
          font-size: 1.5rem;
          font-weight: 400;
          color: ${(props) => props.theme['gray-300']};
          border: 0;
          border-bottom: 3px solid transparent;
          border-radius: 20px;
          width: 100%;

          &:not(:placeholder-shown) {
            border-bottom: 2px solid ${(props) => props.theme['purple-300']};
          }

          &::placeholder {
            font-size: 1.22rem;
            font-weight: 300;
          }

          &[type='date'] {
            padding-right: 15px;
          }
        }
        svg {
          position: absolute;
          right: 0;
          top: 48%;
          right: 10px;
          width: 28px;
          height: 28px;
          color: ${(props) => props.theme['gray-450-50%']};
        }
      }

      &:focus-within {
        span {
          color: ${(props) => props.theme['gray-450-80%']};
        }

        div {
          input {
            border-bottom: 3px solid ${(props) => props.theme['purple-300']};
          }
        }
      }
    }

    button {
      padding: 10px;
      background-color: ${(props) => props.theme['gray-300']};
      border-radius: 5px;
      cursor: pointer;
      border: 0;
      font-size: 1.5rem;
      font-weight: 400;
      color: ${(props) => props.theme['gray-100']};
    }
  }

  .warnings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    font-weight: 400;
    font-size: 1rem;
    color: ${(props) => props.theme['orange-400']};

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      gap: 5px;

      svg {
        width: 25px;
        height: 25px;
        gap: 5px;
      }
    }
  }

  @media (min-width: 1024px) {
    & > div:first-child {
      flex-direction: row;
      align-items: flex-end;
      gap: 0;

      label {
        flex-grow: 1;

        div {
          input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }

      button {
        width: 200px;
        height: 3.25rem;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        background-color: ${(props) => props.theme.white};
        color: ${(props) => props.theme['gray-300']};
        border: 3px solid ${(props) => props.theme['purple-300']};

        &:active {
          background-color: ${(props) => props.theme['gray-150']};
        }
      }
    }
  }
`
