import { ProgressLine } from '@/src/pages/curriculums/[curriculumId]/edit/sections/[sectionName]/InputsForm'
import styled from 'styled-components'

interface InputsFormContainerProps {
  progress: ProgressLine
  isTouchDevice: boolean
}

export const InputsFormContainer = styled.form<InputsFormContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  .progress {
    display: flex;
    justify-content: center;
    width: inherit;
    overflow: hidden;
    background-color: ${(props) => props.theme['gray-150']};
    border-radius: 30px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme['purple-300']};

    ul {
      width: calc(100% - 30px);
      height: 100%;
      padding: 15px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: nowrap;
      list-style-type: none;
      overflow: ${(props) => (props.isTouchDevice ? 'scroll' : 'hidden')};
      user-select: none;
      cursor: grab;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        z-index: 999999;

        a {
          text-decoration: none;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;

          span {
            font-weight: 400;

            &.step {
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border-radius: 100%;
              font-size: 1rem;
            }

            &:last-child {
              font-size: 1.22rem;
            }
          }
        }

        hr {
          width: 25px;
          height: 0;
          background-color: ${(props) => props.theme['gray-200']};
          border-radius: 1px;
        }

        ${({ theme, progress }) =>
          progress
            .map(
              (item, index) => `
            &.progress-${index + 1} {
              a {
                svg {
                  display: ${item.hasClickedNext ? 'inline-block' : 'none'};
                  fill: ${theme['gray-100']};
                  background-color: ${theme['blue-400']};
                  border-radius: 100%;
                  width: 20px;
                  height: 20px;
                }
                span {
                  &.step {
                    display: ${item.hasClickedNext ? 'none' : 'flex'};
                    color: ${
                      item.isOpen ? theme['gray-100'] : theme['gray-200']
                    };
                    background-color: ${
                      item.isOpen ? theme['gray-300'] : theme['gray-450-80%']
                    };
                  }
                  &:last-child {
                    color: ${
                      item.hasClickedNext
                        ? theme['blue-400']
                        : item.isOpen
                        ? theme['gray-300']
                        : theme['gray-450-50%']
                    };
                  }
                }
              }
            }
          `,
            )
            .join('\n')}
      }
    }
  }

  .inputs {
    width: inherit;
    padding: 0 5px 20px;
  }
`
