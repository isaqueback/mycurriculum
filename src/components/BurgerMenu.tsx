import { useContext } from 'react';
import { BurgerMenuContainer } from '../styles/burgerMenu'
import Animate from '@researchgate/react-intersection-observer';
import { AnimationContext } from '../contexts/AnimationContext';

export function BurgerMenu() {
  const {handleChangeAnimation} = useContext(AnimationContext)

  return (
    <Animate onChange={entry => {handleChangeAnimation({entry, entryAnimationName: 'animate__fadeInRight', exitAnimationName: 'animate__fadeOutRight', animationDelayName: 'animate__faster'})}}>
      <BurgerMenuContainer>
        <input type="checkbox" id="burger-menu" />
        <label htmlFor="burger-menu">
          <span></span>
        </label>
      </BurgerMenuContainer>
    </Animate>
  )
}
