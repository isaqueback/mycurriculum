import styled from 'styled-components'

interface CurriculumsContainerProps {
  searchHovered: boolean
}

export const CurriculumsContainer = styled.main<CurriculumsContainerProps>`
  min-height: calc(100vh - 44.8px);
  margin: 20px 5px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

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
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
      background-color: ${(props) => props.theme['gray-200']};
    }
  }

  @media (min-width: 768px) {
    gap: 20px;

    & > button:last-child {
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

    & > button:last-child {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 1728px) {
    gap: 30px;
    max-width: 1290px;

    .curriculum-container {
      gap: 30px;
    }
  }
`
