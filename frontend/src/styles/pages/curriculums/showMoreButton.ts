import styled from 'styled-components'

export const ShowMoreButtonContainer = styled.button`
  font-size: 1rem;
  color: ${(props) => props.theme['purple-300']};
  padding: 2rem 0;
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
    background-color: ${(props) => props.theme['gray-200']};
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    margin: 0;
    max-width: 100%;
    border-radius: 10px;
  }

  @media (min-width: 1718px) {
    font-size: 1.2rem;
  }
`
