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

  @media (min-width: 768px) {
    gap: 20px;

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
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 20px auto 10px;
    padding-bottom: 10px;
  }

  @media (min-width: 1728px) {
    gap: 30px;
    max-width: 1290px;

    .curriculum-container {
      gap: 30px;
    }
  }
`
