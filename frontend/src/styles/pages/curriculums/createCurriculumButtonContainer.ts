import styled from 'styled-components'

export const CreateCurriculumButtonContainer = styled.button`
  border: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 0px 5px ${(props) => props.theme['gray-200']};
  transition: all 300ms ease-out;
  padding: 10px;

  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;

  span {
    color: ${(props) => props.theme['gray-300']};
    font-size: 1.1rem;
  }

  svg {
    width: 21.6px;
    height: 21.6px;
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

  @media (min-width: 768px) {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;

    svg {
      width: 23.2px;
      height: 23.2px;
    }

    span {
      font-size: 1.2rem;
    }
  }

  @media (min-width: 1728px) {
    svg {
      width: 24.8px;
      height: 24.8px;
    }

    span {
      font-size: 1.3rem;
    }
  }
`
