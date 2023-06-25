import styled from 'styled-components'

interface DashboardContainerProps {
  searchHovered: boolean
}

export const DashboardContainer = styled.main<DashboardContainerProps>`
  min-height: calc(100vh - 44.8px);
  margin: 20px 5px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 5px;
    position: relative;

    img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }

    label {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 0;
      cursor: text;
    }

    svg {
      width: inherit;
      height: inherit;
      display: ${({ searchHovered }) => (searchHovered ? 'block' : 'none')};
      border: none;
      fill: ${(props) => props.theme['gray-300']};
      margin-left: 5px;
    }

    img {
      display: ${({ searchHovered }) => (searchHovered ? 'none' : 'block')};
    }

    input {
      display: block;
      width: ${({ searchHovered }) => (searchHovered ? '100%' : '0px')};
      height: 25px;
      padding: ${({ searchHovered }) =>
        searchHovered ? '20px 5px 20px 35px' : '20px 0'};
      font-size: 1.25rem;
      font-weight: 300;
      outline: none;
      border: 2px solid ${(props) => props.theme['purple-300']};
      border-radius: 5px;
      transition: all 300ms ease-out;
    }
  }

  & > button {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.theme['gray-300']};
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 300ms ease-out;
    box-shadow: 0px 0px 5px ${(props) => props.theme['gray-200']};

    span {
      color: ${(props) => props.theme['gray-300']};
      font-weight: 300;
      font-size: 1rem;
    }

    svg {
      width: 20px;
      height: 20px;
      fill: ${(props) => props.theme['gray-300']};
    }

    &:hover {
      background-color: ${(props) => props.theme['purple-300']};
      border: 1px solid ${(props) => props.theme['purple-300']};
      box-shadow: 0px 0px 5px ${(props) => props.theme['purple-300']};

      span {
        color: ${(props) => props.theme['orange-400']};
        font-weight: 400;
      }

      svg {
        fill: ${(props) => props.theme['orange-400']};
      }
    }
  }

  .curriculum-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  & > button:last-child {
    font-size: 1rem;
    color: ${(props) => props.theme['purple-300']};
    padding: 2rem 0;
    margin-bottom: 10px;
    background-color: transparent;
    border: none;
    box-shadow: none;

    &:hover {
      filter: brightness(1.2);
      background-color: ${(props) => props.theme['gray-200']};
    }
  }

  @media (min-width: 768px) {
    gap: 20px;

    & > button {
      width: 100%;
      max-width: 768px;
      margin: 0 auto;
    }

    .curriculum-container {
      gap: 20px;
    }
  }

  @media (min-width: 1024px) {
    gap: 25px;
    align-items: center;
    margin: 20px 0px;
    padding: 0 15px;

    form {
      width: 100%;
      max-width: 768px;
      margin: 0 auto 5px;
    }

    & > button {
      span {
        font-size: 1.1rem;
      }

      svg {
        width: 21.6px;
        height: 21.6px;
      }
    }

    .curriculum-container {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 25px;
    }

    & > button:last-child {
      margin: 0;
      max-width: 100%;
      border-radius: 10px;
    }
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 20px auto 10px;
    padding-bottom: 10px;

    form {
      img {
        width: 26.6px;
        height: 26.6px;
      }

      label {
        width: 26.6px;
        height: 26.6px;
      }

      input {
        font-size: 1.35rem;
        padding: ${({ searchHovered }) =>
          searchHovered ? '25px 10px 25px 40px' : '20px 0'};
      }
    }

    & > button {
      svg {
        width: 23.2px;
        height: 23.2px;
      }
      span {
        font-size: 1.2rem;
      }
    }

    & > button:last-child {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 1728px) {
    gap: 30px;
    max-width: 1290px;

    form {
      img {
        width: 28.2px;
        height: 28.2px;
      }

      label {
        width: 28.2px;
        height: 28.2px;
      }

      input {
        font-size: 1.45rem;
      }
    }

    & > button {
      svg {
        width: 24.8px;
        height: 24.8px;
      }

      span {
        font-size: 1.3rem;
      }
    }

    .curriculum-container {
      gap: 30px;
    }
  }
`
