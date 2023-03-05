import styled, { css } from 'styled-components'

interface BurgerMenuContainerProps {
  isHeaderBurgerMenuVisible: boolean
}

export const BurgerMenuContainer = styled.div<BurgerMenuContainerProps>`
  opacity: ${({ isHeaderBurgerMenuVisible }) => {
    return (
      isHeaderBurgerMenuVisible ? 1 : 0
    )
  }};
  transform: ${({ isHeaderBurgerMenuVisible }) => {
    return (
      isHeaderBurgerMenuVisible ? css`translateX(0px)` : css`translateX(30px)`
    )
  }};
  transition: opacity 400ms ease-out, transform 400ms cubic-bezier(0,1.06,.21,1.44);
  
  input[type='checkbox'] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme['gray-300']};
      border-radius: 5px;
      position: relative;
      transition: all 500ms ease-in-out;

      &::before,
      &::after {
        content: '';
        display: inherit;
        position: absolute;
        width: inherit;
        height: inherit;
        background-color: inherit;
        border-radius: inherit;
        transition: all 300ms ease-in-out;
      }
    }
  }

  input[type='checkbox'] + label {
    span {
      &::before {
        top: 8.8px;
      }

      &::after {
        bottom: 8.8px;
      }
    }
  }

  input[type='checkbox']:checked + label {
    span {
      transform: rotate(135deg);

      &::before {
        transform: translateY(-9px) rotate(90deg);
      }

      &::after {
        transform: translateY(9px) rotate(90deg);
      }
    }
  }
`
