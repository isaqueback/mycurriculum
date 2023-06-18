import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 84px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme['gray-200']};
`

export const TemplateEditor = styled.div``

export const Template = styled.article`
  width: 21cm;
  height: 29.7cm;
  background-color: #e7d1e4;
  display: flex;
  color: #3360ad;

  h1 {
    color: ${(props) => props.theme['gray-100']};
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
  }

  h2 {
    text-transform: uppercase;
    text-align: center;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  h4 {
    font-size: 0.9rem;
    text-transform: capitalize;
  }

  h5 {
    font-size: 0.85rem;
    font-weight: 400;
    text-transform: capitalize;
  }

  p {
    font-size: 0.85rem;
    font-weight: 300;
  }

  .left-part {
    display: flex;
    flex-direction: column;
    width: 35%;
    border-right: 2px solid #3360ad;
    overflow: hidden;

    section:first-child {
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: #3360ad;
      position: relative;
      padding: 40px 0 0;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        border-left: 278px solid #3360ad;
        border-bottom: 80px solid #e7d1e4;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;

        strong {
          color: ${(props) => props.theme['gray-100']};
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 300;
        }
      }

      img {
        width: 110px;
        height: 110px;
        border-radius: 100%;
        border: 5px solid ${(props) => props.theme['gray-100']};
        object-fit: cover;
        z-index: 1;
        transform: translateY(12px);
      }
    }

    section:nth-child(2) {
      padding: 40px 20px 40px;

      address {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;

        h3 {
          padding-bottom: 13px;
        }

        div {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.25rem;
          border-bottom: 1px solid #3360ad;
          padding-bottom: 0.5rem;

          p {
            & > a {
              color: #3360ad;
            }
          }
        }
      }
    }

    section:nth-child(3),
    section:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 30px 40px;
      gap: 0.75rem;

      h3 {
        margin: 0 auto;
      }

      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;

        li {
          font-size: 0.9rem;
          font-weight: 300;
          position: relative;
          display: flex;

          &::before {
            position: absolute;
            content: '';
            width: 10px;
            height: 10px;
            background-color: #3360ad;
            border-radius: 2px;
            top: calc(50% - 5px);
            transform: translateX(-20px);
          }
        }
      }
    }
  }

  .right-part {
    width: 65%;

    section:first-child {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 20px 40px 20px;
      border-bottom: 2px solid #3360ad;

      p {
        text-align: justify;
      }
    }

    section:nth-child(2) {
      border-bottom: 2px solid #3360ad;
      padding: 20px 40px 10px;

      h3 {
        padding-bottom: 15px;
      }

      & > div {
        padding: 10px 0;

        h5 {
          display: flex;

          address {
            font-weight: 300;
          }
        }

        & > div {
          display: flex;
          gap: 1rem;
          padding: 10px 0 0;

          time {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;

            span {
              padding: 3px 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;

              &:first-child {
                border: 1px solid #3360ad;
                background-color: #3360ad;
                color: ${(props) => props.theme['gray-100']};
              }

              &:last-child {
                border: 1px solid #3360ad;
                color: #3360ad;
              }
            }
          }

          p {
            text-align: justify;
          }
        }
      }
    }

    section:nth-child(3) {
      padding: 20px 40px 20px;
      border-bottom: 2px solid #3360ad;

      h3 {
        padding-bottom: 15px;
      }

      & > div {
        display: flex;
        gap: 0.75rem;
        padding: 10px 0;

        time {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;

          span {
            padding: 3px 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            &:first-child {
              border: 1px solid #3360ad;
              background-color: #3360ad;
              color: ${(props) => props.theme['gray-100']};
            }

            &:last-child {
              border: 1px solid #3360ad;
              color: #3360ad;
            }
          }
        }

        & > div {
          address {
            font-weight: 300;
          }
        }
      }
    }

    section:last-child {
      padding: 20px 40px 20px;

      h3 {
        padding-bottom: 15px;
      }

      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
          display: flex;
          flex-direction: column;
          position: relative;
          font-size: 0.85rem;

          &::before {
            position: absolute;
            content: '';
            width: 15px;
            height: 15px;
            background-color: #3360ad;
            border-radius: 2px;
            top: calc(50% - 7.5px);
            transform: translateX(-25px);
          }

          span {
            font-weight: 400;
          }

          a {
            padding-left: 5px;
            color: #3360ad;
            font-weight: 300;
            text-decoration: none;
          }
        }
      }
    }
  }
`
