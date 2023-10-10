import styled from 'styled-components'

interface ProgressButtonsProps {
  currentStep: number
}

export const ProgressButtonsContainer = styled.div<ProgressButtonsProps>`
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

    &:first-child {
      cursor: ${({ currentStep }) =>
        currentStep === 1 ? 'not-allowed' : 'pointer'};

      span {
        color: ${({ theme, currentStep }) =>
          currentStep === 1 ? theme['gray-450-50%'] : theme['gray-300']};
      }

      svg {
        fill: ${({ theme, currentStep }) =>
          currentStep === 1 ? theme['gray-450-50%'] : theme['gray-300']};
      }
    }

    &:last-child {
      cursor: ${({ currentStep }) =>
        currentStep === 8 ? 'not-allowed' : 'pointer'};
      margin-left: auto;

      span {
        color: ${({ theme, currentStep }) =>
          currentStep === 8 ? theme['gray-450-50%'] : theme['gray-300']};
      }

      svg {
        fill: ${({ theme, currentStep }) =>
          currentStep === 8 ? theme['gray-450-50%'] : theme['gray-300']};
      }
    }
  }
`
