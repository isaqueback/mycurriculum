import styled from 'styled-components'

interface CurriculumContainerProps {
  curriculumImageHovered: boolean
}

export const CurriculumContainer = styled.div<CurriculumContainerProps>`
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 2px ${(props) => props.theme['purple-300']};
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  padding: 0 10px;
  transition: all 300ms ease-out;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    object-position: top;
    border-radius: inherit;
    position: absolute;
    transition: all 300ms ease-out;
    filter: ${({ curriculumImageHovered }) =>
      curriculumImageHovered ? 'blur(2px)' : 'blur(0)'};
    cursor: ${({ curriculumImageHovered }) =>
      curriculumImageHovered ? 'pointer' : 'auto'};
  }

  .curriculum-info-container {
    position: absolute;
    width: calc(100% - 20px);
    border-radius: inherit;
    background-color: ${(props) => props.theme['purple-300']};
    box-shadow: inherit;
    bottom: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 1px;

    h2 {
      color: ${(props) => props.theme['gray-100']};
      font-size: 1.2rem;
      font-weight: 400;
    }

    .curriculum-dates-container {
      display: flex;
      justify-content: space-between;

      time {
        color: ${(props) => props.theme['gray-200']};
        font-size: 0.75rem;
        font-weight: 300;
      }
    }

    .curriculum-buttons-container {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;

      & > button {
        display: flex;
        background-color: transparent;
        border: none;
        gap: 5px;
        cursor: pointer;

        img {
          width: 20px;
          height: 20px;
          position: relative;
          filter: blur(0);
          cursor: pointer;

          &:nth-child(2) {
            display: none;
          }
        }

        span {
          font-size: 1rem;
          font-weight: 400;
          color: ${(props) => props.theme['gray-100']};
        }

        &:hover {
          span {
            color: ${(props) => props.theme['orange-400']};
          }

          img {
            display: block;

            &:first-child {
              display: none;
            }
          }
        }
      }
    }
  }

  & > button {
    display: ${({ curriculumImageHovered }) =>
      curriculumImageHovered ? 'flex' : 'none'} !important;
    position: absolute;
    top: calc(51.8px - 15px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme['orange-400']};
    border: 1px solid ${(props) => props.theme['gray-100']};
    gap: 5px;
    cursor: pointer;

    img {
      position: relative;
      width: 20px;
      height: 20px;
      fill: ${(props) => props.theme['gray-100']};
      filter: blur(0);

      &:nth-child(2) {
        display: none;
      }
    }

    span {
      color: ${(props) => props.theme['gray-100']};
      font-weight: 400;
      font-size: 1rem;
    }

    &:hover {
      border-width: 2px;

      img {
        &:first-child {
          display: none;
        }

        &:nth-child(2) {
          display: block;
        }
      }

      span {
        font-weight: 700;
      }
    }
  }

  &:hover {
    transform: scale(1.025);
  }

  @media (min-width: 768px) {
    height: 210px;
    max-width: 768px;

    .curriculum-info-container {
      h2 {
        font-size: 1.3rem;
      }

      .curriculum-dates-container {
        time {
          font-size: 0.85rem;
        }
      }

      .curriculum-buttons-container {
        padding-top: 15px;

        & > button {
          img {
            width: 21.6px;
            height: 21.6px;
          }

          span {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    height: 225px;
    width: 400px;

    .curriculum-info-container {
      h2 {
        font-size: 1.4rem;
      }

      .curriculum-dates-container {
        time {
          font-size: 0.95rem;
        }
      }

      .curriculum-buttons-container {
        padding-top: 15px;

        & > button {
          img {
            width: 23.2px;
            height: 23.2px;
          }

          span {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  @media (min-width: 1280px) {
    height: 250px;
  }
`
