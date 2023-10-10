import styled from 'styled-components'

export const DragDropAbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    list-style-type: none;
    margin-top: 10px;

    li {
      padding: 5px 10px;
      border: 1px solid ${(props) => props.theme['gray-300']};
      font-size: 1.25rem;
      font-weight: 400;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      user-select: none;

      &:hover {
        background-color: ${(props) => props.theme['gray-150']};
      }

      svg {
        cursor: pointer;
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
`
