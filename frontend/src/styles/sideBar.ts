import styled from 'styled-components'

interface SideBarProps {
  isOpen: boolean
  isFirefox: boolean
}

export const BurgerMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 20px;

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

export const SideBar = styled.nav<SideBarProps>`
  background-color: ${(props) => props.theme['gray-300']};
  height: 40vh;
  display: flex !important;
  flex-direction: column;
  border-radius: 10px;
  border: none;
  justify-content: flex-start !important;
  align-items: flex-start;
  position: relative;
  right: ${({ isFirefox, isOpen }) =>
    isFirefox ? (isOpen ? '0' : '-400px') : '-500px'};
  transition: right 500ms ease-in-out;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;

    li {
      padding: 10px 15px;
      border-radius: 6px;
      background-color: ${(props) => props.theme['gray-300']};
      transition: all 300ms ease-in-out;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme['gray-250']};
      }

      a {
        color: ${(props) => props.theme['gray-100']} !important;
        font-weight: 400;
        text-decoration: none;

        &:active,
        &:focus,
        &:visited,
        &:hover {
          color: default;
        }
      }
    }
  }

  @media (min-width: 768px) {
    height: calc(100vh - 200px);
    height: 50vh;
  }
`

export const SideBarNavigationContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 100%;
  overflow: hidden;

  ${SideBar} {
    /* right: -10px; */
  }

  :has(input#burger-menu:checked) {
    ${SideBar} {
      right: 0;
    }
  }

  @media (min-width: 768px) {
    right: 20px;
    width: 400px;
  }
`
