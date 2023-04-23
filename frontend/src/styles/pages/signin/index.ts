import styled from 'styled-components'

export const SigninContainer = styled.main`
  height: calc(100vh - 50px);
  background-color: ${(props) => props.theme['gray-100']};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 120px;
  position: relative;

  & > div:first-child {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 20px;

    & > img {
      position: absolute;
      width: 100%;
      height: 280px;
      object-fit: cover;
      top: 0;
      z-index: 1;
    }

    h1 {
      font-weight: 700;
      font-size: 1.5rem;
      color: ${(props) => props.theme['gray-300']};
      text-align: center;
      z-index: 2;
    }

    p {
      font-weight: 300;
      font-size: 1.25rem;
      color: ${(props) => props.theme['gray-300']};
      z-index: 2;
    }
  }

  & > div:nth-child(2) {
    & > div {
      display: flex;
      flex-direction: column;

      form {
        display: flex;
        flex-direction: column;
        gap: 40px;
        margin: 0 20px;

        div {
          display: flex;
          flex-direction: column;
          gap: 20px;

          input {
            font-size: 1rem;
            font-weight: 400;
            color: ${(props) => props.theme['gray-300']};
            background-color: ${(props) => props.theme['yellow-100']};
            border-radius: 7px;
            outline: none;
            border: 2px solid transparent;
            padding: 10px;
            text-align: center;
            transition: all 300ms ease-out;
            z-index: 1;

            &:focus {
              border: 2px solid ${(props) => props.theme['red-400']};
            }

            &::placeholder {
              color: ${(props) => props.theme['gray-200']};
            }
          }
        }

        button {
          font-size: 1.25rem;
          font-weight: 700;
          padding: 10px;
          text-align: center;
          color: ${(props) => props.theme['red-400']};
          background-color: transparent;
          border: 2px solid ${(props) => props.theme['red-400']};
          border-radius: 7px;
          transition: all 300ms ease-out;
          z-index: 1;
          cursor: pointer;

          &:hover {
            background-color: ${(props) => props.theme['red-400']};
            color: ${(props) => props.theme['gray-100']};
          }
        }
      }

      nav {
        margin: 20px 20px 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 5;

        span {
          a {
            font-size: 1rem;
            font-weight: 300;
            color: ${(props) => props.theme['gray-300']};
            transition: all 300ms ease-out;

            &:hover {
              filter: contrast(500%);
            }
          }
        }
      }
    }

    & > img {
      display: none;
    }
  }

  & > div:last-child {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      position: absolute;
      bottom: 0;
    }
  }

  @media (min-width: 768px) {
    gap: 160px;

    & > div:first-child {
      & > img {
        height: 360px;
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 700;
      }
    }

    & > div:nth-child(2) {
      & > div {
        form {
          flex-direction: column;

          div {
            flex-direction: row;
            gap: 30px;

            input {
              font-size: 1.25rem;
              flex-grow: 1;
            }
          }
        }

        nav {
          flex-direction: row;
          gap: 10px;
          margin: 50px 20px 0;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    gap: 100px;

    & > div:first-child {
      & > img {
        height: 300px;
      }
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
      height: 300px;
      justify-content: center;
      align-items: center;
      gap: 50px;

      & > div {
        width: 500px;
        justify-content: center;

        form {
          flex-direction: column;
          gap: 40px;

          div {
            flex-direction: column;
            gap: 20px;

            input {
              font-size: 1.25rem;
              flex-grow: 1;
            }
          }
        }

        nav {
          flex-direction: row;
          gap: 10px;
          margin: 35px 20px 0;
        }
      }

      & > img {
        display: inline-block;
        width: 300px;
        height: 200px;
        max-height: 300px;
        object-fit: contain;
        transform: scale(1.5);
      }
    }
  }

  @media (min-width: 1280px) {
    gap: 160px;

    & > div:first-child {
      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 1.5rem;
      }

      & > img {
        height: 430px;
      }
    }

    & > div:nth-child(2) {
      gap: 100px;

      & > div {
        width: 550px;

        form {
          div {
            input {
              font-size: 1.5rem;
            }
          }
        }
      }

      & > img {
        transform: scale(2);
      }
    }

    & > div:last-child {
      img {
        bottom: -60px;
      }
    }
  }

  @media (min-width: 1718px) {
    gap: 200px;
    height: calc(100vh - 84px);

    & > div:first-child {
      h1 {
        position: relative;
        bottom: 100px;
        font-size: 4rem;
      }

      p {
        font-size: 1.75rem;
        position: relative;
        bottom: 100px;
      }

      & > img {
        height: 600px;
      }
    }

    & > div:nth-child(2) {
      gap: 150px;

      & > div {
        width: 800px;

        form {
          div {
            input {
              font-size: 1.75rem;
              padding: 20px;
            }
          }

          button {
            font-size: 1.5rem;
            padding: 20px;
          }
        }

        nav {
          span {
            a {
              font-size: 1.25rem;
            }
          }
        }
      }

      & > img {
        transform: scale(2.5);
      }
    }

    & > div:last-child {
      img {
        bottom: -60px;
      }
    }
  }
`
