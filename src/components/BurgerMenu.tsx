import { BurgerMenuContainer } from '../styles/burgerMenu'

export function BurgerMenu() {
  return (
    <BurgerMenuContainer>
      <input type="checkbox" id="burger-menu" />
      <label htmlFor="burger-menu">
        <span></span>
      </label>
    </BurgerMenuContainer>
  )
}
