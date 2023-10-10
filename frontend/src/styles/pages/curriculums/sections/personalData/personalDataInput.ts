import styled from 'styled-components'

interface PersonalDataContainerProps {
  isDateOfBirth: boolean
}

export const PersonalDataContainer = styled.div<PersonalDataContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 30px;

  input[type='checkbox'] {
    display: none;
  }

  details {
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme['gray-150']};
    transition: all 300ms ease;
    max-height: 5rem;
    overflow: hidden;

    summary {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: ${(props) => props.theme['gray-300']};

      label {
        display: block;
        padding: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        &::before {
          font-size: 1.5rem;
          content: '➤';
          transition: all 300ms ease;
        }
      }
    }

    p {
      font-size: 1.25rem;
      font-weight: 300;
      margin: 10px 0 15px;
      text-align: center;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0 15px 30px;

      .date-of-birth {
        display: flex;
        flex-direction: column;
        font-size: 1.22rem;
        font-weight: 400;
        color: ${(props) => props.theme['gray-450-50%']};
        gap: 2px;

        .react-date-picker__wrapper {
          border: 0;
          border-bottom: 2px solid
            ${({ theme, isDateOfBirth }) =>
              isDateOfBirth ? theme['purple-400'] : 'transparent'};
          border-radius: 20px;
          background-color: ${(props) => props.theme.white};
          padding: 10px 15px;
          font-weight: 400;
          color: ${(props) => props.theme['gray-300']};
          font-size: 1.5rem;

          input.react-date-picker__inputGroup__month {
            width: 26px !important;
          }

          input.react-date-picker__inputGroup__year {
            width: 51px !important;
          }

          button {
            svg {
              stroke: ${(props) => props.theme['gray-450-80%']};

              &:hover {
                stroke: ${(props) => props.theme['purple-300']};
              }
            }
          }
        }

        .react-calendar {
          font-size: 1.22rem;
        }
      }

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
    }
  }

  input:checked + details {
    transition: all 300ms ease;
    max-height: 60rem !important;

    summary {
      label {
        &::before {
          rotate: 90deg;
        }
      }
    }
  }

  @media (max-width: 467px) {
    #detail-two + details {
      max-height: 9.5rem;
    }
  }

  @media ((min-width: 467px) and (max-width: 1024px)) {
    #detail-two + details {
      max-height: 7rem;
    }
  }

  @media (min-width: 1024px) {
    #detail-two + details {
      max-height: 5rem;
    }
  }
`
