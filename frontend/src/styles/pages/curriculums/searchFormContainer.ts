import styled from 'styled-components'

interface SearchFormContainerProps {
  searchHovered: boolean
}

export const SearchFormContainer = styled.form<SearchFormContainerProps>`
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

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 768px;
    margin: 0 auto 5px;
  }

  @media (min-width: 1280px) {
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

  @media (min-width: 1728px) {
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
`
