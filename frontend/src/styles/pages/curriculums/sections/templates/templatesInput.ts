import styled from 'styled-components'

export const TemplatesInputContainer = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 35px;

  .templates {
    display: flex;
    flex-direction: column;
    gap: 35px;

    .template {
      width: inherit;
      height: 450px;
      transition: all 300ms ease-out;

      input[type='radio'] {
        display: none;
      }

      label {
        width: inherit;
        height: inherit;
        display: block;
        cursor: pointer;

        img {
          border: 2px solid ${(props) => props.theme['purple-300']};
          border-bottom-width: 10px;
          border-radius: 25px;
          width: 100%;
          height: inherit;
          object-fit: fill;
          transform-origin: top;
        }
      }

      input[type='radio']:checked ~ label {
        img {
          border-color: ${(props) => props.theme['blue-400']};
        }
      }

      &:hover {
        transform: scale(1.01);
      }
    }

    .skeleton {
      width: inherit;
      height: 450px;
      border-radius: 25px;
    }
  }

  .progress-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme['gray-150']};
      border: none;
      border-radius: 10px;
      gap: 5px;
      padding: 10px;
      cursor: pointer;

      span {
        font-size: 1.2rem;
        color: ${(props) => props.theme['gray-450-50%']};
        font-weight: 300;
      }

      svg {
        fill: ${(props) => props.theme['gray-450-50%']};
        width: 20px;
        height: 20px;
      }

      &:last-child {
        margin-left: auto;

        span {
          color: ${(props) => props.theme['gray-300']};
        }

        svg {
          fill: ${(props) => props.theme['gray-300']};
        }
      }
    }
  }

  @media (min-width: 768px) {
    .templates {
      display: flex;
      align-items: center;

      .template {
        width: 450px;
      }

      .skeleton {
        width: 450px;
      }
    }

    .progress-buttons {
      button {
        span {
          font-size: 1.3rem;
        }

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .templates {
      justify-content: space-evenly;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 45px 0;
    }
  }
`
