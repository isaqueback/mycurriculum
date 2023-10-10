import styled from 'styled-components'

export const SectionContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px 5px;
  margin: 0 auto;
  max-width: 768px;

  .preview-curriculum-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme['gray-150']};
    padding: 10px;
    gap: 5px;
    border-radius: 30px;
    border: 0;
    border-top-width: 3px;
    border-top-style: solid;
    border-top-color: ${(props) => props.theme['purple-300']};
    cursor: pointer;
    transition: all 300ms ease-out;

    span {
      font-size: 1.1rem;
      color: ${(props) => props.theme['gray-300']};
      font-weight: 400;
    }

    svg {
      fill: black;
      width: 15px;
      height: 15px;

      &:last-child {
        display: none;
      }
    }

    &:hover {
      background-color: ${(props) => props.theme['purple-400-25%']};
    }
  }

  @media (min-width: 1024px) {
    max-width: 1120px;
    margin-top: 20px;
    gap: 30px;
  }

  @media (min-width: 1718px) {
    .preview-curriculum-button {
      span {
        font-size: 1.2rem;
      }
    }
  }
`
