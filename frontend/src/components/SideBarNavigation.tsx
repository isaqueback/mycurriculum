import { useContext, useEffect, useState } from 'react'
import {
  SideBarNavigationContainer,
  SideBar,
  BurgerMenu,
} from '../styles/sideBar'
import Animate from '@researchgate/react-intersection-observer'
import { AnimationContext } from '../contexts/AnimationContext'
import Link from 'next/link'

export function SideBarNavigation() {
  const { handleChangeAnimation } = useContext(AnimationContext)

  const [isBurgerMenuChecked, setIsBurgerMenuChecked] = useState(false)
  const [isFirefox, setIsFirefox] = useState(false)

  useEffect(() => {
    const { userAgent } = window.navigator

    if (userAgent.includes('Firefox')) setIsFirefox(true)
  }, [])

  return (
    <Animate
      onChange={(entry) => {
        handleChangeAnimation({
          entry,
          entryAnimationName: 'animate__fadeInDown',
          exitAnimationName: 'animate__fadeOutUp',
          animationDelayName: 'animate__faster',
        })
      }}
    >
      <SideBarNavigationContainer className="side-bar-navigation">
        <BurgerMenu>
          <input
            type="checkbox"
            id="burger-menu"
            onClick={() =>
              isFirefox && setIsBurgerMenuChecked((state) => !state)
            }
          />
          <label htmlFor="burger-menu">
            <span></span>
          </label>
        </BurgerMenu>
        <SideBar isOpen={isBurgerMenuChecked} isFirefox={isFirefox}>
          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#f7f7f7"
                viewBox="0 0 256 256"
              >
                <path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"></path>
              </svg>
              <Link href="">Minha Conta</Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#f7f7f7"
                viewBox="0 0 256 256"
              >
                <path d="M177.08,114.46A48,48,0,0,0,152,37.52V24a12,12,0,0,0-24,0V36H112V24a12,12,0,0,0-24,0V36H64a12,12,0,0,0,0,24h4V188H64a12,12,0,0,0,0,24H88v12a12,12,0,0,0,24,0V212h16v12a12,12,0,0,0,24,0V212a52,52,0,0,0,25.08-97.54ZM164,84a24,24,0,0,1-24,24H92V60h48A24,24,0,0,1,164,84ZM152,188H92V132h60a28,28,0,0,1,0,56Z"></path>
              </svg>
              <Link href="">Preços</Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#f7f7f7"
                viewBox="0 0 256 256"
              >
                <path d="M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"></path>
              </svg>
              <Link href="">FAQ</Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#f7f7f7"
                viewBox="0 0 256 256"
              >
                <path d="M240,204H228V96a20,20,0,0,0-20-20H172V32a20,20,0,0,0-28.45-18.12l-104,48.54A20.06,20.06,0,0,0,28,80.55V204H16a12,12,0,0,0,0,24H240a12,12,0,0,0,0-24ZM204,100V204H172V100ZM52,83.09,148,38.3V204H52ZM132,112v12a12,12,0,0,1-24,0V112a12,12,0,0,1,24,0Zm-40,0v12a12,12,0,0,1-24,0V112a12,12,0,0,1,24,0Zm0,52v12a12,12,0,0,1-24,0V164a12,12,0,0,1,24,0Zm40,0v12a12,12,0,0,1-24,0V164a12,12,0,0,1,24,0Z"></path>
              </svg>
              <Link href="">Sobre nós</Link>
            </li>
          </ul>
        </SideBar>
      </SideBarNavigationContainer>
    </Animate>
  )
}
