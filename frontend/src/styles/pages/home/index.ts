import styled from 'styled-components'

export const HomeContainer = styled.main``

export const Presentation1 = styled.section`
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  bottom: 100%;
  left: 0;
  right: 100%;
  overflow: hidden;

  background-color: ${(props) => props.theme['gray-100']};

  & > div {
    flex-direction: column;

    h2 {
      color: ${(props) => props.theme['gray-300']};
      font-weight: 700;
    }

    p {
      color: ${(props) => props.theme['gray-300']};
      font-weight: 300;
    }
  }

  & > div:first-child {
    display: none;
  }

  & > div:nth-child(2) {
    display: flex;

    h2 {
      font-size: 1.5rem;
      text-align: center;
    }

    p {
      margin-top: 15px;
      font-size: 1rem;
      text-align: center;
    }
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 200px;
  }

  button {
    background-color: ${(props) => props.theme['red-400']};
    border: none;
    border-radius: 8px;
    padding: 0.9375rem 1.6875rem;
    font-weight: 700;
    font-size: 1.25rem;
    color: ${(props) => props.theme['gray-100']};
    cursor: pointer;
    transition: all ease-out 300ms;

    &:hover {
      background-color: ${(props) => props.theme['purple-400']};
      color: ${(props) => props.theme['gray-100']};
    }
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 462px;

      h2 {
        font-size: 2.5rem;
      }

      p {
        font-size: 1.25rem;
      }

      a {
        margin-top: 30px;
        button {
          transition: all ease-out 300ms;
        }
      }
    }

    & > div:nth-child(2) {
      display: none;
    }

    & > a {
      display: none;
    }

    & > img {
      width: 266px;
      height: 100%;
      object-fit: contain;
      transform: translateY(25px);
    }
  }

  @media (min-width: 1024px) {
    & > div:first-child {
      width: 581px;
      gap: 20px;

      h2 {
        font-size: 3rem;
      }

      p {
        font-size: 1.5rem;
      }

      a {
        margin-top: 20px;
      }
    }

    & > img {
      width: 286px;
      height: 100%;
    }
  }

  @media (min-width: 1728px) {
    gap: 100px;
    height: calc(100vh - 64px);

    & > div:first-child {
      gap: 20px;
      width: 700px;

      h2 {
        font-size: 4rem;
        width: 100%;
      }

      p {
        font-size: 1.75rem;
      }

      a {
        margin-top: 50px;

        button {
          font-size: 1.5rem;
        }
      }
    }

    & > img {
      width: 286px;
      height: 100%;
      transform: translateY(95px);
    }
  }
`

export const Presentation2 = styled.article`
  width: 100%;
  height: 100vh;
  min-height: 790px;
  background-color: ${(props) => props.theme['gray-300']};
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  overflow: hidden;

  & > img:first-child {
    display: none;
  }

  & > img:nth-child(2) {
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 15px;

    section {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 15px 10px;
      box-shadow: 0px 0px 11px 0px ${(props) => props.theme['gray-450-50%']};
      border-radius: 15px;

      & > img {
        display: none;
      }

      div {
        display: flex;
        gap: 15px;

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${(props) => props.theme['green-300']};
        }

        p {
          display: none;
        }
      }

      p {
        font-size: 1.25rem;
        font-weight: 400;
        color: ${(props) => props.theme['gray-100']};
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    min-height: 625px;
    height: 100vh;
    border-bottom-right-radius: 95px;

    & > img:first-child {
      display: block;
      flex-grow: 1;
      object-fit: contain;
      height: 356px;
      width: 247px;
      max-width: 350px;
    }

    & > img:nth-child(2) {
      display: none;
    }

    article {
      width: 505px;
      gap: 50px;

      section {
        width: 100%;
        flex-direction: row;
        align-items: center;

        & > img {
          display: block;
        }

        div {
          display: flex;
          flex-direction: column;

          img {
            display: none;
          }

          p {
            display: block;
          }
        }

        & > p {
          display: none;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    justify-content: center;
    gap: 60px;
  }

  @media (min-width: 1280px) {
    gap: 60px;

    article {
      justify-content: center;
      width: 700px;

      section {
        padding: 15px 30px;

        & > img {
          width: 70px;
          height: 70px;
        }

        div {
          h3 {
            font-size: 2rem;
          }
        }

        p {
          font-size: 1.25rem;
        }
      }
    }
  }

  @media (min-width: 1728px) {
    gap: 70px;

    & > img:first-child {
      height: 100%;
      max-width: 525px;
    }

    article {
      justify-content: center;
      width: 820px;
      gap: 50px;

      section {
        padding: 40px 50px;

        & > img {
          width: 90px;
          height: 90px;
        }

        div {
          h3 {
            font-size: 2.5rem;
          }
        }

        p {
          font-size: 1.5rem;
        }
      }
    }
  }
`

export const Presentation3 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 566.4px;
  height: 100vh;
  padding: 40px 0;
  align-items: center;
  justify-content: center;
  gap: 70px;
  overflow: hidden;

  h2 {
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    color: ${(props) => props.theme['gray-300']};
  }

  a {
    button {
      font-size: 1.25rem;
      font-weight: 300;
      text-decoration: uppercase;
      padding: 15px 26px;
      border-radius: 47px;
      border: 1px solid ${(props) => props.theme['gray-300']};
      color: ${(props) => props.theme['gray-300']};
      text-transform: uppercase;
      transition: all 300ms ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme['gray-300']};
        color: ${(props) => props.theme['gray-100']};
      }
    }
  }

  @media (min-width: 768px) {
    min-height: 616.4px;
  }

  @media (min-width: 1280px) {
    h2 {
      font-size: 3rem;
    }
  }

  @media (min-width: 1728px) {
    padding: 30px 0;
    min-height: 785px;
    height: 100vh;

    h2 {
      font-size: 4rem;
    }

    a {
      button {
        font-size: 1.5rem;
      }
    }
  }
`

export const Prices = styled.article`
  width: 100%;
  padding-left: 10px;
  padding-right: 7px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: linear-gradient(
    to top,
    #2b2b2b,
    #2b2b2b 10.697%,
    transparent 10.697%,
    transparent 100%
  );
  overflow: hidden;

  & > img {
    display: none;
  }

  h3 {
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme['purple-400']};
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    section {
      position: relative;
      border: none;
      border-radius: 30px;
      box-shadow: 0 0 11px 0 ${(props) => props.theme['purple-400-25%']};
      background-color: ${(props) => props.theme['gray-100']};
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: 35px;
      max-width: 560px;
      min-height: 485px;
      max-height: 581.2px;
      padding: 0 12px;

      & > img {
        border-radius: 30px;
        opacity: 0.3;
      }

      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 2;

        div:first-child {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 3px;

          h4 {
            font-size: 1.5rem;
            font-weight: 300;
            color: ${(props) => props.theme['gray-400']};
          }

          small {
            img {
              width: 15px;
              height: 15px;
              opacity: 0.8;
            }
          }
        }

        div:last-child {
          display: flex;
          justify-content: center;
          align-items: center;

          strong {
            font-size: 2rem;
            font-weight: 700;
            color: ${(props) => props.theme['gray-400']};
          }

          small {
            transform: translateY(4px);
            font-size: 1.25rem;
            font-weight: 400;
            color: ${(props) => props.theme['gray-450-80%']};
          }
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        align-items: stretch;
        z-index: 2;
        gap: 20px;

        li {
          display: flex;
          gap: 13px;
          align-items: center;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
          }

          p {
            font-size: 1.25rem;
            font-weight: 400;
            color: ${(props) => props.theme['gray-400']};
          }
        }
      }

      a {
        z-index: 2;

        button {
          width: 100%;
          border: 1px solid ${(props) => props.theme['purple-400']};
          font-weight: 700;
          font-size: 1.25rem;
          color: ${(props) => props.theme['purple-400']};
          padding: 15px 0;
          border-radius: 8px;
          transition: all 300ms ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${(props) => props.theme['purple-400']};
            color: ${(props) => props.theme['gray-100']};
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    position: relative;
    padding: 0 5.5px;

    & > img {
      display: block;
      width: 100%;
      height: 100%;
    }

    & > div {
      flex-direction: row;

      section {
        min-height: 793px;
        max-width: 425px;
        gap: 60px;

        & > div {
          div:first-child {
            h4 {
              font-size: 2.25rem;
            }
          }

          div:last-child {
            strong {
              font-size: 3.75rem;
            }

            small {
              font-size: 2rem;
            }
          }
        }

        ul {
          li {
            span {
              width: 40px;
              height: 40px;

              img {
                width: 40px;
                height: 40px;
              }
            }

            p {
              font-size: 1.625rem;
            }
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    & > div {
      gap: 50px;
    }
  }

  @media (min-width: 1280px) {
    h3 {
      font-size: 3rem;
    }
  }

  @media (min-width: 1728px) {
    padding-top: 20px;
    min-height: 100vh;

    h3 {
      font-size: 4rem;
    }

    & > div {
      gap: 100px;

      section {
        padding: 100px 20px 190px;
        min-height: 900px;
        max-width: 595px;

        & > div {
          div:first-child {
            h4 {
              font-size: 3rem;
            }

            small {
              img {
                width: 25px;
                height: 25px;
              }
            }
          }

          div:last-child {
            strong {
              font-size: 4.25rem;
            }

            small {
              font-size: 2.5rem;
            }
          }
        }

        ul {
          li {
            span {
              width: 60px;
              height: 60px;

              img {
                height: 100%;
                height: 40px;
              }
            }

            p {
              font-size: 2.25rem;
            }
          }
        }
      }
    }
  }

  @media (min-width: 1728px) {
    & > div {
      section {
        a {
          button {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`
