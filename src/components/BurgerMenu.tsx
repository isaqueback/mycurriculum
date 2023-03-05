import { MutableRefObject, useContext } from 'react'
import { BurgerMenuContainer } from '../styles/burgerMenu'

interface BurgerMenuProps {
  headerBurgerMenu: MutableRefObject<null>
  isHeaderBurgerMenuVisible: boolean
}

export function BurgerMenu({headerBurgerMenu, isHeaderBurgerMenuVisible}: BurgerMenuProps) {
  return (
    <BurgerMenuContainer isHeaderBurgerMenuVisible={isHeaderBurgerMenuVisible} ref={headerBurgerMenu}>
      <input type="checkbox" id="burger-menu" />
      <label htmlFor="burger-menu">
        <span></span>
      </label>
    </BurgerMenuContainer>
  )
}
